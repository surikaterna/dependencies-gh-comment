import * as core from '@actions/core';
import * as github from '@actions/github';

export const commentOnPullRequest = async (markdown: string): Promise<void> => {
  const token = core.getInput('token');
  const octokit = github.getOctokit(token);
  const { owner, repo } = github.context.repo;

  await octokit.rest.issues.createComment({
    issue_number: github.context.issue.number,
    owner,
    repo,
    body: markdown
  });
};
