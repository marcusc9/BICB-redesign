#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const FRAME_COUNT = 120;
const FPS = 30;
const OUTPUT_SIZE = 760;
const LOGO_OCCUPANCY = 0.86;
const ALPHA_THRESHOLD = 4;
const MIN_COMPONENT_PIXELS = 300;
const CONCURRENCY = 4;

const projectRoot = path.resolve(__dirname, "..");
const sourcePath = path.resolve(
  process.argv[2] ?? path.join(projectRoot, "public/images/bicb-logo.png")
);
const outputDirectory = path.join(projectRoot, "public/animation/bicb-logo-scroll");

function clamp(value, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function smoothstep(edgeStart, edgeEnd, value) {
  const progress = clamp((value - edgeStart) / (edgeEnd - edgeStart));
  return progress * progress * (3 - 2 * progress);
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function removeFlatOpaqueBackground(data, width, height) {
  const sampleSize = Math.max(4, Math.min(20, Math.floor(Math.min(width, height) * 0.02)));
  const cornerOrigins = [
    [0, 0],
    [width - sampleSize, 0],
    [0, height - sampleSize],
    [width - sampleSize, height - sampleSize]
  ];
  const background = [0, 0, 0];
  let sampleCount = 0;
  let opaqueSampleCount = 0;

  for (const [originX, originY] of cornerOrigins) {
    for (let y = originY; y < originY + sampleSize; y += 1) {
      for (let x = originX; x < originX + sampleSize; x += 1) {
        const offset = (y * width + x) * 4;
        sampleCount += 1;
        if (data[offset + 3] >= 248) {
          background[0] += data[offset];
          background[1] += data[offset + 1];
          background[2] += data[offset + 2];
          opaqueSampleCount += 1;
        }
      }
    }
  }

  if (opaqueSampleCount / sampleCount < 0.96) {
    return false;
  }

  background[0] /= opaqueSampleCount;
  background[1] /= opaqueSampleCount;
  background[2] /= opaqueSampleCount;

  for (let offset = 0; offset < data.length; offset += 4) {
    const colourDistance = Math.sqrt(
      (data[offset] - background[0]) ** 2 +
        (data[offset + 1] - background[1]) ** 2 +
        (data[offset + 2] - background[2]) ** 2
    );
    const coverage = smoothstep(3, 25, colourDistance);
    data[offset + 3] = Math.round(data[offset + 3] * coverage);
  }

  return true;
}

function findComponents(data, width, height) {
  const labels = new Int16Array(width * height);
  const queue = new Int32Array(width * height);
  const components = [];
  let nextLabel = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const startIndex = y * width + x;

      if (labels[startIndex] !== 0 || data[startIndex * 4 + 3] <= ALPHA_THRESHOLD) {
        continue;
      }

      nextLabel += 1;
      labels[startIndex] = nextLabel;
      queue[0] = startIndex;

      let queueStart = 0;
      let queueEnd = 1;
      let pixelCount = 0;
      let minimumX = x;
      let maximumX = x;
      let minimumY = y;
      let maximumY = y;

      while (queueStart < queueEnd) {
        const pixelIndex = queue[queueStart];
        queueStart += 1;

        const pixelY = Math.floor(pixelIndex / width);
        const pixelX = pixelIndex - pixelY * width;
        pixelCount += 1;
        minimumX = Math.min(minimumX, pixelX);
        maximumX = Math.max(maximumX, pixelX);
        minimumY = Math.min(minimumY, pixelY);
        maximumY = Math.max(maximumY, pixelY);

        for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
          for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
            if (offsetX === 0 && offsetY === 0) {
              continue;
            }

            const neighbourX = pixelX + offsetX;
            const neighbourY = pixelY + offsetY;

            if (
              neighbourX < 0 ||
              neighbourX >= width ||
              neighbourY < 0 ||
              neighbourY >= height
            ) {
              continue;
            }

            const neighbourIndex = neighbourY * width + neighbourX;

            if (
              labels[neighbourIndex] === 0 &&
              data[neighbourIndex * 4 + 3] > ALPHA_THRESHOLD
            ) {
              labels[neighbourIndex] = nextLabel;
              queue[queueEnd] = neighbourIndex;
              queueEnd += 1;
            }
          }
        }
      }

      if (pixelCount >= MIN_COMPONENT_PIXELS) {
        components.push({
          id: nextLabel,
          pixelCount,
          minimumX,
          maximumX,
          minimumY,
          maximumY
        });
      }
    }
  }

  return { components, labels };
}

async function createComponentImages(sourceData, sourceInfo, components, labels) {
  return Promise.all(
    components.map(async (component) => {
      const width = component.maximumX - component.minimumX + 1;
      const height = component.maximumY - component.minimumY + 1;
      const croppedData = Buffer.alloc(width * height * 4);

      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const sourceX = component.minimumX + x;
          const sourceY = component.minimumY + y;
          const sourceIndex = sourceY * sourceInfo.width + sourceX;

          if (labels[sourceIndex] !== component.id) {
            continue;
          }

          const sourceOffset = sourceIndex * 4;
          const targetOffset = (y * width + x) * 4;
          sourceData.copy(croppedData, targetOffset, sourceOffset, sourceOffset + 4);
        }
      }

      const pngBuffer = await sharp(croppedData, {
        raw: { width, height, channels: 4 }
      })
        .png({ compressionLevel: 9 })
        .toBuffer();

      const centreX = (component.minimumX + component.maximumX) / 2;
      const centreY = (component.minimumY + component.maximumY) / 2;

      return {
        ...component,
        width,
        height,
        centreX,
        centreY,
        sourceWidth: sourceInfo.width,
        sourceHeight: sourceInfo.height,
        radialAngle: Math.atan2(centreY - sourceInfo.height / 2, centreX - sourceInfo.width / 2),
        dataUri: `data:image/png;base64,${pngBuffer.toString("base64")}`
      };
    })
  );
}

function componentMarkup(component, componentIndex, frameProgress, glow = false) {
  const reveal = smoothstep(0, 0.22, frameProgress);
  const bloomProgress = clamp((frameProgress - 0.08) / 0.92);
  const bloom = Math.sin(Math.PI * bloomProgress);
  const depth = 0.78 + (componentIndex % 3) * 0.13;
  const outwardDistance = 48 * bloom * depth;
  const tangentialDistance =
    Math.sin(frameProgress * Math.PI * 2 + componentIndex * 0.72) * 7 * bloom;
  const directionX = Math.cos(component.radialAngle);
  const directionY = Math.sin(component.radialAngle);
  const tangentX = -directionY;
  const tangentY = directionX;
  const offsetX = directionX * outwardDistance + tangentX * tangentialDistance;
  const offsetY = directionY * outwardDistance + tangentY * tangentialDistance - bloom * 3;
  const rotationDirection = componentIndex % 2 === 0 ? 1 : -1;
  const rotation =
    rotationDirection * (1.4 + (componentIndex % 4) * 0.65) * bloom +
    Math.sin(frameProgress * Math.PI * 2 + componentIndex) * 0.45 * bloom;
  const scale = (0.94 + reveal * 0.06) * (1 + bloom * depth * 0.022);
  const opacity = glow ? (0.04 + bloom * 0.12) * reveal : 0.42 + reveal * 0.58;
  const renderScale =
    (OUTPUT_SIZE * LOGO_OCCUPANCY) / Math.max(component.sourceWidth, component.sourceHeight);
  const canvasOffsetX = (OUTPUT_SIZE - component.sourceWidth * renderScale) / 2;
  const canvasOffsetY = (OUTPUT_SIZE - component.sourceHeight * renderScale) / 2;
  const x = canvasOffsetX + component.minimumX * renderScale;
  const y = canvasOffsetY + component.minimumY * renderScale;
  const width = component.width * renderScale;
  const height = component.height * renderScale;
  const centreX = x + width / 2;
  const centreY = y + height / 2;

  return `
    <g opacity="${opacity.toFixed(4)}"${glow ? ' filter="url(#softGlow)"' : ""}>
      <g transform="translate(${offsetX.toFixed(3)} ${offsetY.toFixed(3)})">
        <g transform="rotate(${rotation.toFixed(3)} ${centreX.toFixed(3)} ${centreY.toFixed(3)})">
          <g transform="translate(${centreX.toFixed(3)} ${centreY.toFixed(3)}) scale(${scale.toFixed(5)}) translate(${(-centreX).toFixed(3)} ${(-centreY).toFixed(3)})">
            <image href="${escapeAttribute(component.dataUri)}" x="${x.toFixed(3)}" y="${y.toFixed(3)}" width="${width.toFixed(3)}" height="${height.toFixed(3)}" />
          </g>
        </g>
      </g>
    </g>`;
}

function createFrameSvg(components, frameIndex) {
  const frameProgress = frameIndex / (FRAME_COUNT - 1);
  const glowMarkup = components
    .map((component, index) => componentMarkup(component, index, frameProgress, true))
    .join("");
  const logoMarkup = components
    .map((component, index) => componentMarkup(component, index, frameProgress, false))
    .join("");

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${OUTPUT_SIZE}" height="${OUTPUT_SIZE}" viewBox="0 0 ${OUTPUT_SIZE} ${OUTPUT_SIZE}">
      <defs>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      ${glowMarkup}
      ${logoMarkup}
    </svg>`;
}

async function renderFrame(components, frameIndex) {
  const frameName = `frame-${String(frameIndex).padStart(3, "0")}.webp`;
  const framePath = path.join(outputDirectory, frameName);
  const frameSvg = createFrameSvg(components, frameIndex);

  await sharp(Buffer.from(frameSvg))
    .webp({ quality: 72, alphaQuality: 86, effort: 6, smartSubsample: true })
    .toFile(framePath);
}

async function renderFrames(components) {
  for (let batchStart = 0; batchStart < FRAME_COUNT; batchStart += CONCURRENCY) {
    const frameIndexes = Array.from(
      { length: Math.min(CONCURRENCY, FRAME_COUNT - batchStart) },
      (_, offset) => batchStart + offset
    );
    await Promise.all(frameIndexes.map((frameIndex) => renderFrame(components, frameIndex)));
    process.stdout.write(`\rRendered ${Math.min(batchStart + CONCURRENCY, FRAME_COUNT)}/${FRAME_COUNT} frames`);
  }
  process.stdout.write("\n");
}

async function createStoryboard() {
  const selectedFrames = [0, 23, 47, 71, 95, 119];
  const tileSize = 220;
  const labelHeight = 34;
  const canvasWidth = tileSize * 3;
  const canvasHeight = (tileSize + labelHeight) * 2;
  const composites = [];

  for (let index = 0; index < selectedFrames.length; index += 1) {
    const frameIndex = selectedFrames[index];
    const column = index % 3;
    const row = Math.floor(index / 3);
    const left = column * tileSize;
    const top = row * (tileSize + labelHeight);
    const resizedFrame = await sharp(
      path.join(outputDirectory, `frame-${String(frameIndex).padStart(3, "0")}.webp`)
    )
      .resize(tileSize, tileSize, { fit: "contain" })
      .png()
      .toBuffer();
    const label = Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${tileSize}" height="${labelHeight}">
        <text x="${tileSize / 2}" y="22" text-anchor="middle" fill="#596862" font-family="Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="1">FRAME ${String(frameIndex).padStart(3, "0")}</text>
      </svg>`);

    composites.push({ input: resizedFrame, left, top });
    composites.push({ input: label, left, top: top + tileSize });
  }

  await sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: { r: 247, g: 243, b: 233, alpha: 1 }
    }
  })
    .composite(composites)
    .webp({ quality: 86, effort: 5 })
    .toFile(path.join(outputDirectory, "storyboard.webp"));

  await fs.copyFile(
    path.join(outputDirectory, `frame-${String(FRAME_COUNT - 1).padStart(3, "0")}.webp`),
    path.join(outputDirectory, "poster.webp")
  );
}

async function writeManifest(componentCount) {
  const manifest = {
    source: path.relative(projectRoot, sourcePath),
    framePattern: "frame-{index}.webp",
    frameCount: FRAME_COUNT,
    fps: FPS,
    durationSeconds: FRAME_COUNT / FPS,
    width: OUTPUT_SIZE,
    height: OUTPUT_SIZE,
    componentCount,
    format: "webp",
    background: "transparent",
    storyboard: [
      { frames: [0, 23], beat: "Emergence", meaning: "The shared pattern becomes visible." },
      { frames: [24, 53], beat: "Learning", meaning: "Individual paths begin to open." },
      { frames: [54, 89], beat: "Service", meaning: "The elements flow outward into action." },
      { frames: [90, 119], beat: "Unity", meaning: "Distinct paths return to one coherent whole." }
    ]
  };

  await fs.writeFile(
    path.join(outputDirectory, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`
  );
}

async function main() {
  const { data: sourceData, info: sourceInfo } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const removedOpaqueBackground = removeFlatOpaqueBackground(
    sourceData,
    sourceInfo.width,
    sourceInfo.height
  );

  const { components, labels } = findComponents(sourceData, sourceInfo.width, sourceInfo.height);

  if (components.length < 2) {
    throw new Error(`Expected a multi-part logo but found ${components.length} connected component(s).`);
  }

  const componentImages = await createComponentImages(
    sourceData,
    sourceInfo,
    components,
    labels
  );
  componentImages.sort((first, second) => first.radialAngle - second.radialAngle);

  await fs.rm(outputDirectory, { recursive: true, force: true });
  await fs.mkdir(outputDirectory, { recursive: true });

  console.log(
    `Generating ${FRAME_COUNT} frames from ${path.basename(sourcePath)} using ${componentImages.length} logo elements${
      removedOpaqueBackground ? " after removing its flat background" : ""
    }.`
  );
  await renderFrames(componentImages);
  await createStoryboard();
  await writeManifest(componentImages.length);

  const outputFiles = await fs.readdir(outputDirectory);
  const outputSizes = await Promise.all(
    outputFiles.map(async (fileName) => (await fs.stat(path.join(outputDirectory, fileName))).size)
  );
  const totalBytes = outputSizes.reduce((total, size) => total + size, 0);

  console.log(`Wrote ${outputFiles.length} assets (${(totalBytes / 1024 / 1024).toFixed(2)} MB).`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
