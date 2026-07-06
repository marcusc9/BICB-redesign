# BICB Redesign Codex Handoff

Read this first when resuming BICB redesign work. Keep changes small, inspect the selected section before editing, and avoid reintroducing the large Wix image archive into this repo.

## Project Shape

- Next.js App Router site for `marcusc9/BICB-redesign`.
- Main content data lives in `src/data/site.ts`.
- Shared visual system lives in `src/app/globals.css`.
- Images used by the live site live in `public/images/`.
- Old Wix routes are handled in `next.config.mjs`.

## Visual Direction

- Cormorant Garamond for brand, headings and quotation-led moments.
- Current sans body pairing for navigation, buttons and practical copy.
- Editorial, community-led, warm and restrained.
- Avoid making the redesign feel like a clone of the old Wix hero.

## GitHub Flow

Pull latest:

```bash
git pull --rebase origin main
```

Save and push:

```bash
git status
git add -A
git commit -m "Describe the change"
git push origin main
```

This repo should stay lean for GitHub and Vercel. Do not commit `node_modules`, `.next`, `local-preview`, crawl exports, or the full Wix image archive.
