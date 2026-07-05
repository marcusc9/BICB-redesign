# BICB Manchester Redesign

Next.js prototype for moving the Bahá'í Institute for Community Building - Manchester site away from Wix and toward GitHub/Vercel.

## Local Development

```bash
pnpm install
pnpm dev
```

The local app runs at `http://127.0.0.1:3000` by default.

## Verification

```bash
pnpm lint
pnpm build
```

## Notes

- Core content lives in `src/data/site.ts`.
- Old Wix routes are handled in `next.config.mjs`.
- Public images currently come from the existing public Wix media library and should receive a final consent/asset ownership pass before launch.
- Full Wix image originals are archived in `assets/wix-archive/`; the archive is about 293 MB and no individual file currently exceeds GitHub's 100 MB file limit.
- Registration links currently point to the existing Google Forms rather than storing sensitive form data in the site.
