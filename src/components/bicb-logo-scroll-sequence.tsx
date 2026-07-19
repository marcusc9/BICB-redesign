"use client";

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/base-path";

const FRAME_COUNT = 120;
const CACHE_LIMIT = 24;
const FRAME_DIRECTORY = "/animation/bicb-logo-scroll";

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function framePath(frameIndex: number) {
  return withBasePath(
    `${FRAME_DIRECTORY}/frame-${String(frameIndex).padStart(3, "0")}.webp`
  );
}

export function BicbLogoScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCacheRef = useRef(new Map<number, HTMLImageElement>());
  const pendingFramesRef = useRef(new Map<number, Promise<HTMLImageElement>>());
  const latestFrameRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const useStaticFallback = reducedMotion || saveData;

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(motionQuery.matches);
    const navigatorWithConnection = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };

    updateMotionPreference();
    setSaveData(Boolean(navigatorWithConnection.connection?.saveData));
    motionQuery.addEventListener("change", updateMotionPreference);

    return () => motionQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;

    if (!container || !stage || !canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });

    if (!context) {
      return;
    }

    let isActive = true;
    let isNearViewport = false;
    let currentProgress = useStaticFallback ? 1 : 0;

    const pruneCache = (targetFrame: number) => {
      const cache = frameCacheRef.current;

      if (cache.size <= CACHE_LIMIT) {
        return;
      }

      const framesByDistance = [...cache.keys()].sort(
        (first, second) => Math.abs(second - targetFrame) - Math.abs(first - targetFrame)
      );

      while (cache.size > CACHE_LIMIT && framesByDistance.length > 0) {
        const frameToRemove = framesByDistance.shift();
        if (frameToRemove !== undefined && frameToRemove !== targetFrame) {
          cache.delete(frameToRemove);
        }
      }
    };

    const loadFrame = (frameIndex: number) => {
      const boundedFrame = Math.round(clamp(frameIndex, 0, FRAME_COUNT - 1));
      const cachedFrame = frameCacheRef.current.get(boundedFrame);

      if (cachedFrame) {
        return Promise.resolve(cachedFrame);
      }

      const pendingFrame = pendingFramesRef.current.get(boundedFrame);

      if (pendingFrame) {
        return pendingFrame;
      }

      const framePromise = new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new window.Image();
        image.decoding = "async";
        image.onload = () => {
          frameCacheRef.current.set(boundedFrame, image);
          pendingFramesRef.current.delete(boundedFrame);
          pruneCache(latestFrameRef.current);
          resolve(image);
        };
        image.onerror = () => {
          pendingFramesRef.current.delete(boundedFrame);
          reject(new Error(`Unable to load BICB logo frame ${boundedFrame}.`));
        };
        image.src = framePath(boundedFrame);
      });

      pendingFramesRef.current.set(boundedFrame, framePromise);
      return framePromise;
    };

    const resizeCanvas = () => {
      const stageBounds = stage.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(stageBounds.width * pixelRatio));
      const height = Math.max(1, Math.round(stageBounds.height * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const drawFrame = (image: HTMLImageElement) => {
      resizeCanvas();

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      const stageWidth = canvas.width / pixelRatio;
      const stageHeight = canvas.height / pixelRatio;
      const mobileScale = stageWidth < 620 ? 0.88 : 0.72;
      const displaySize = Math.min(stageWidth * mobileScale, stageHeight * 0.82);
      const parallaxX = (currentProgress - 0.5) * (stageWidth < 620 ? 10 : 22);
      const parallaxY = Math.sin(currentProgress * Math.PI) * -12;
      const destinationX = (stageWidth - displaySize) / 2 + parallaxX;
      const destinationY = (stageHeight - displaySize) / 2 + parallaxY;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, stageWidth, stageHeight);
      context.drawImage(image, destinationX, destinationY, displaySize, displaySize);
      setIsReady(true);
    };

    const drawNearestLoadedFrame = (targetFrame: number) => {
      const cache = frameCacheRef.current;

      if (cache.size === 0) {
        return;
      }

      let nearestFrame = [...cache.keys()][0];

      for (const frameIndex of cache.keys()) {
        if (Math.abs(frameIndex - targetFrame) < Math.abs(nearestFrame - targetFrame)) {
          nearestFrame = frameIndex;
        }
      }

      drawFrame(cache.get(nearestFrame)!);
    };

    const primeFrameWindow = (targetFrame: number) => {
      const frameOffsets = [0, 1, -1, 2, -2, 4, -4, 7, -7];

      frameOffsets.forEach((offset) => {
        const frameIndex = Math.round(clamp(targetFrame + offset, 0, FRAME_COUNT - 1));
        loadFrame(frameIndex)
          .then(() => {
            if (isActive && Math.abs(frameIndex - latestFrameRef.current) <= 2) {
              drawNearestLoadedFrame(latestFrameRef.current);
            }
          })
          .catch(() => {
            // The static poster remains visible when a frame cannot be loaded.
          });
      });
    };

    const renderFromScroll = () => {
      animationFrameRef.current = null;

      if (!isNearViewport && !useStaticFallback) {
        return;
      }

      const containerBounds = container.getBoundingClientRect();
      const stageHeight = stage.getBoundingClientRect().height;
      const headerHeight = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--header-height")
      );
      const scrollDistance = Math.max(1, containerBounds.height - stageHeight);
      currentProgress = useStaticFallback
        ? 1
        : clamp((headerHeight - containerBounds.top) / scrollDistance);
      const targetFrame = useStaticFallback
        ? FRAME_COUNT - 1
        : Math.round(currentProgress * (FRAME_COUNT - 1));

      latestFrameRef.current = targetFrame;
      container.dataset.frame = String(targetFrame);
      container.dataset.progress = currentProgress.toFixed(3);
      stage.style.setProperty("--logo-parallax-x", `${(currentProgress - 0.5) * 26}px`);
      stage.style.setProperty(
        "--logo-parallax-y",
        `${Math.sin(currentProgress * Math.PI) * -18}px`
      );
      drawNearestLoadedFrame(targetFrame);
      primeFrameWindow(targetFrame);
    };

    const scheduleRender = () => {
      if (animationFrameRef.current === null) {
        animationFrameRef.current = window.requestAnimationFrame(renderFromScroll);
      }
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry.isIntersecting;
        if (isNearViewport) {
          scheduleRender();
        }
      },
      { rootMargin: "120% 0px" }
    );
    const resizeObserver = new ResizeObserver(scheduleRender);

    visibilityObserver.observe(container);
    resizeObserver.observe(stage);
    window.addEventListener("scroll", scheduleRender, { passive: true });
    window.addEventListener("resize", scheduleRender, { passive: true });

    loadFrame(useStaticFallback ? FRAME_COUNT - 1 : 0)
      .then((image) => {
        if (isActive) {
          drawFrame(image);
          scheduleRender();
        }
      })
      .catch(() => {
        // The poster image is a complete no-JavaScript and load-error fallback.
      });

    return () => {
      isActive = false;
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleRender);
      window.removeEventListener("resize", scheduleRender);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [useStaticFallback]);

  return (
    <div
      aria-hidden="true"
      className="bicb-logo-sequence"
      data-ready={isReady}
      data-reduced-motion={reducedMotion}
      data-save-data={saveData}
      data-static={useStaticFallback}
      ref={containerRef}
    >
      <div className="bicb-logo-sequence__stage" ref={stageRef}>
        <div className="bicb-logo-sequence__glow" />
        {/* A native image keeps the mark visible before JavaScript and under reduced data conditions. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="bicb-logo-sequence__poster"
          decoding="async"
          src={withBasePath(
            `${FRAME_DIRECTORY}/${useStaticFallback ? "poster.webp" : "frame-000.webp"}`
          )}
        />
        <canvas className="bicb-logo-sequence__canvas" ref={canvasRef} />
      </div>
    </div>
  );
}
