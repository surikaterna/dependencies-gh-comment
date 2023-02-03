import * as core from '@actions/core';
import { commentOnPullRequest } from './commentOnPullRequest';
import { parseDependencies } from './parseDependencies';
import { createMarkdown } from './createMarkdown';

async function run(): Promise<void> {
  try {
    const input = core.getInput('dependencies');

    const dependencies = parseDependencies(input);
    const markdown = createMarkdown(dependencies);
    await commentOnPullRequest(markdown);
    // Create/update PR comment
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run().catch(() => {
  // Noop
});
