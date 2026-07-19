# BICB logo scroll animation

## Storyboard

The sequence is four seconds long at 30fps (120 frames) and is controlled entirely by scroll position.

| Frames | Beat | Motion | Meaning |
| --- | --- | --- | --- |
| 000–023 | Emergence | The complete mark resolves from a quiet, slightly smaller form. | A shared pattern becomes visible. |
| 024–053 | Learning | The nine logo elements breathe apart with small differences in depth and rotation. | Individual paths and capacities begin to open. |
| 054–089 | Service | The elements reach their widest radial movement and flow gently into the surrounding space. | Learning moves outward into community service. |
| 090–119 | Unity | The elements return to a coherent whole, retaining a subtle sense of expanded scale. | Distinct contributions strengthen one community. |

The motion uses no particles, flashes, or abrupt cuts. All transforms begin and end with low velocity.

## Frame-generation approach

The checked-in 1080×1080 transparent PNG is used as the master because it preserves the linework better than a JPEG. The generator also accepts a replacement JPG or PNG path.

1. Decode the source to RGBA. For a JPG, sample and remove its flat corner background before segmentation.
2. Detect the nine disconnected logo elements with an alpha-based connected-component pass.
3. Preserve each element’s original pixels and anti-aliased edges.
4. Move each element radially with a small independent rotation, scale, and tangential drift.
5. Render 120 transparent 760×760 WebP frames using Sharp.
6. Export a poster, manifest, and six-frame storyboard contact sheet.

Regenerate from the current master:

```bash
pnpm generate:logo-frames
```

Regenerate from a future high-resolution JPG:

```bash
pnpm generate:logo-frames -- /absolute/path/to/bicb-logo.jpg
```

## Implementation architecture

- `BicbLogoScrollSequence` is a client component placed at the start of the Weekly Activities section.
- A sticky, warm off-white stage occupies 250 viewport heights, while the canvas remains pinned below the site header.
- Section scroll progress maps directly to frames 000–119. The sequence never autoplays.
- The canvas keeps only a 24-frame sliding cache and loads a small window around the requested frame.
- A WebP poster is visible before the first frame loads and remains the fallback if loading fails.
- The Weekly Activities introduction initially retains the sequence’s warm paper treatment, then crosses into the dark neighbourhood story after a scroll threshold; its eyebrow, heading, and supporting copy change colour with the background.

## Accessibility and performance

- `prefers-reduced-motion` collapses the scrub area to one viewport and renders the resolved final frame.
- `Save-Data` receives the same resolved static poster instead of 120 frame requests.
- The canvas is decorative and hidden from assistive technology; the site logo remains available in the header.
- Frames begin loading only when the sequence is within 120% of the viewport.
- Device pixel ratio is capped at 1.5 to control canvas memory and paint cost.
- WebP frames use transparency and a sparse line drawing, keeping encoded size low.
- The cache is intentionally bounded; returning to an earlier frame reuses the browser HTTP cache.
- For a future CDN deployment, serve frames with immutable caching and Brotli-compressed JSON metadata.
- If real-user monitoring shows frame request overhead on slow networks, retain these exported frames but package them into 10–12 frame WebP sprite strips or supply an MP4 fallback for `Save-Data` users.
