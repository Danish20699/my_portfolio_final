#!/usr/bin/env bash
#
# Rewrites the author and committer identity on every commit in this repo to
# the address registered on the GitHub account, so the history attributes
# correctly on the profile.
#
# History currently carries four identities, only one of which is right:
#
#     13  danish        <danish20699@gmal.com.com>   <- typo, gmal.com.com
#     10  Danish Nazir  <danishnazir20699@gmail.com> <- the GitHub account
#      9  Danish Nazir  <danishpersonal6@gmail.com>  <- contact address, not GitHub
#      5  danish        <danishpersonal6@gmail.com>
#
# Nothing about the file contents changes; only the metadata. The script
# verifies that by comparing the tree hash before and after, and refuses to
# continue if they differ.
#
# Usage:
#     bash scripts/fix-authorship.sh          # rewrite locally, do not push
#     bash scripts/fix-authorship.sh --push   # rewrite, verify, then force-push
#
# To undo at any point before or after pushing:
#     git reset --hard pre-authorship-fix
#     git push --force-with-lease origin main     # only if you already pushed

set -euo pipefail

NAME="Danish Nazir"
EMAIL="danishnazir20699@gmail.com"
BACKUP_TAG="pre-authorship-fix"

if [ -n "$(git status --porcelain)" ]; then
    echo "Working tree is not clean. Commit or stash first, then re-run." >&2
    exit 1
fi

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
TREE_BEFORE="$(git rev-parse "HEAD^{tree}")"
COUNT="$(git rev-list --count HEAD)"

echo "Branch          : $BRANCH"
echo "Commits         : $COUNT"
echo "Rewriting to    : $NAME <$EMAIL>"
echo

git tag -f "$BACKUP_TAG" HEAD >/dev/null
echo "Backup tag      : $BACKUP_TAG -> $(git rev-parse --short "$BACKUP_TAG")"

FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch -f --env-filter "
export GIT_AUTHOR_NAME='$NAME'
export GIT_AUTHOR_EMAIL='$EMAIL'
export GIT_COMMITTER_NAME='$NAME'
export GIT_COMMITTER_EMAIL='$EMAIL'
" -- --branches >/dev/null

TREE_AFTER="$(git rev-parse "HEAD^{tree}")"

echo
if [ "$TREE_BEFORE" != "$TREE_AFTER" ]; then
    echo "STOP: file contents changed, which should be impossible here." >&2
    echo "Restoring from the backup tag and aborting." >&2
    git reset --hard "$BACKUP_TAG"
    exit 1
fi

echo "Tree hash unchanged ($TREE_BEFORE) - only metadata was rewritten."
echo
echo "Identities now in history:"
git log --format='%an <%ae>' | sort | uniq -c

if [ "${1:-}" = "--push" ]; then
    echo
    echo "Force-pushing $BRANCH ..."
    git push --force-with-lease origin "$BRANCH"
    echo "Done. GitHub will re-attribute the commits within a few minutes."
else
    echo
    echo "Nothing has been pushed. When the list above looks right:"
    echo "    git push --force-with-lease origin $BRANCH"
fi
