#!/bin/zsh
set -euo pipefail

cd "$(dirname "$0")/.."

echo "BICB redesign"
echo "Checking for changes..."
echo

if [[ -z "$(git status --porcelain)" ]]; then
  echo "Nothing to save. The repo is already clean."
  echo
  echo "Pulling the latest version from GitHub just in case..."
  git pull --rebase origin main
  echo
  echo "Done. You can close this window."
  read -r "?Press Return to close..."
  exit 0
fi

git status --short
echo

read -r "?Commit message [Update BICB redesign]: " commit_message
commit_message=${commit_message:-Update BICB redesign}

echo
echo "Saving changes..."
git add -A
git commit -m "$commit_message"

echo
echo "Pulling any newer GitHub changes..."
git pull --rebase origin main

echo
echo "Pushing to GitHub..."
git push origin main

echo
echo "Done. Your changes are on GitHub."
echo "You can close this window."
read -r "?Press Return to close..."
