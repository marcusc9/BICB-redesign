# BICB Manchester Redesign

Next.js prototype for moving the Bahá'í Institute for Community Building - Manchester site away from Wix and toward GitHub/Vercel.

<details>
<summary><strong>Daily GitHub Flow</strong></summary>

Easiest option on macOS:

```bash
open scripts/pull-latest.command
open scripts/save-and-push.command
```

You can also double-click those two files in Finder.

Use these from the project folder:

```bash
cd "/Users/marcusc/Documents/codex/BICB redesign/BICB-redesign-staging"
```

Pull the latest work:

```bash
git pull --rebase origin main
```

Save and push your work:

```bash
git status
git add -A
git commit -m "Describe the change"
git push origin main
```

If this is a fresh clone, use:

```bash
git clone https://github.com/marcusc9/BICB-redesign.git
cd BICB-redesign
git remote set-url --push origin git@github.com-bicb:marcusc9/BICB-redesign.git
```

The SSH host alias should exist on each machine that pushes:

```sshconfig
Host github.com-bicb
  HostName github.com
  User git
  IdentityFile ~/.ssh/bicb_github_ed25519
  IdentitiesOnly yes
```

</details>

<details>
<summary><strong>Codex Environment Button</strong></summary>

Codex shows `Environment -> Changes -> Commit or push` only when the Codex project folder is the Git repo root.

Open this folder as the Codex project:

```bash
BICB-redesign
```

Do not open the older parent folder:

```bash
BICB redesign
```

That parent folder contains previews and archive material, so Codex will not treat the clean staging repo as the active Git environment.

</details>

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
- Full Wix image originals are deliberately not included in this staging repo. Keep the GitHub/Vercel repo lean and only commit the active web assets in `public/images/`.
- Registration links currently point to the existing Google Forms rather than storing sensitive form data in the site.

## Vercel

Import `marcusc9/BICB-redesign` into Vercel as a Next.js project. The standard settings should work:

```bash
pnpm install
pnpm build
```
