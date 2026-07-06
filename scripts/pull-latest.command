#!/bin/zsh
set -euo pipefail

cd "$(dirname "$0")/.."

echo "BICB redesign"
echo "Pulling the latest version from GitHub..."
echo

git pull --rebase origin main

echo
echo "Done. This folder is now up to date."
echo "You can close this window."
read -r "?Press Return to close..."
