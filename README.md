Dependencies GitHub Comment
===========================

Action to create and update a GitHub comment on a pull request with a table of dependencies.

# Workflow

* Read the dependencies input
* Generate GitHub Markdown from the dependencies
* Add a GitHub comment, or update if already made

# Usage

## Create Comment on Created Pull Request

Add the following workflow to GitHub Actions to trigger on created pull requests:

```yml
on:
  pull_request:
    types: [opened]
    branches:
      - develop

jobs:
  dependencies_github_comment:
    runs-on: ubuntu-latest
    name: Dependencies GitHub Comment
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - name: Setup Node
        uses: actions/setup-node@249970729cb0ef3589644e2896645e5dc5ba9c38 # v6
        with:
          node-version: '22.23.4'
          package-manager-cache: false
      - name: Check external dependencies
        id: check-external-dependencies
        uses: surikaterna/check-external-dependencies@main
        with:
          internal-dependency-pattern: 'surikat'
      - name: Dependencies GitHub comment
        uses: surikaterna/dependencies-gh-comment@main
        with:
          dependencies: ${{ steps.check-external-dependencies.outputs.external-dependencies }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

## Update Comment When Pull Request is Updated

Add the following workflow to GitHub Actions to trigger on updated pull requests:

```yml
on:
  pull_request:
    types: [edited, synchronize]
    branches:
      - develop

jobs:
  dependencies_github_comment:
    runs-on: ubuntu-latest
    name: Dependencies GitHub Comment
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - name: Setup Node
        uses: actions/setup-node@249970729cb0ef3589644e2896645e5dc5ba9c38 # v6
        with:
          node-version: '22.23.4'
          package-manager-cache: false
      - name: Check external dependencies
        id: check-external-dependencies
        uses: surikaterna/check-external-dependencies@main
        with:
          internal-dependency-pattern: 'surikat'
      - name: Dependencies GitHub comment
        uses: surikaterna/dependencies-gh-comment@main
        with:
          dependencies: ${{ steps.check-external-dependencies.outputs.external-dependencies }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

# Runtime security and compatibility

For CVE-2026-111497, this composite action installs **Node.js 22.23.4** with
commit-pinned `actions/setup-node` and runs the existing `lib/index.js` bundle.
All inputs and defaults (including `comment-id`) and the token environment are
forwarded unchanged. The existing bundle's comment behavior is unchanged.
HTTP decompression is not disabled; no application code or dependencies changed,
so no bundle rebuild is needed.

Use GitHub Actions runner **2.338.1 or newer with patched embedded Node.js**:
[runner 2.338.1](https://github.com/actions/runner/releases/tag/v2.338.1)
[ships Node.js 24.22.1](https://github.com/actions/runner/blob/v2.338.1/src/Misc/externals.sh)
for the setup-node bootstrap. `runs.using: node24` alone does not select a patch.
Linux, macOS and Windows remain supported where Node.js 22 and Bash are available
(Windows uses Git Bash); no Docker/Linux-only action was introduced.
The setup step adds Node.js 22.23.4 to the job's **PATH for subsequent steps**;
run setup-node again afterwards if another runtime is needed.

After merging, select commits/tags containing the fixes for both actions in the
examples; old release tags do not change. Examples use `main`; production workflows
should pin the fixed commits. Direct development requires
`^22.23.4 || ^24.22.1 || >=26.12.1`. Update self-hosted runners and rerun workflows
to activate the fix; no deployment was performed. See the
[Node.js security release](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases).

Targeted Linux smoke: the unchanged bundle ran through the manifest's Bash command
on Node.js 22.23.4 against a local Brotli-encoded GitHub API fixture. Dependency
Markdown, comment submission and token forwarding passed. Hosted Actions and
Windows/macOS were not exercised; no exploit payloads or full suite were run.
