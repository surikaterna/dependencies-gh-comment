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
        uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: Check external dependencies
        id: check-external-dependencies
        uses: surikaterna/check-external-dependencies@v1.0.1
        with:
          internal-dependency-pattern: 'surikat'
      - name: Dependencies GitHub comment
        uses: surikaterna/dependencies_github_comment@v1.0.0
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
        uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: Check external dependencies
        id: check-external-dependencies
        uses: surikaterna/check-external-dependencies@v1.0.1
        with:
          internal-dependency-pattern: 'surikat'
      - name: Dependencies GitHub comment
        uses: surikaterna/dependencies_github_comment@v1.0.0
        with:
          dependencies: ${{ steps.check-external-dependencies.outputs.external-dependencies }}
          token: ${{ secrets.GITHUB_TOKEN }}
```
