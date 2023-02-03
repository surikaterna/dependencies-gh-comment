import { Dependency } from './assertDependencies';

export const createMarkdown = (dependencies: Array<Dependency>): string =>
  ['|Name|Version|License|', '|---|---|---|'].concat(dependencies.map((d) => `|${d.name}|${d.version}|${d.license}|`)).join('\n');
