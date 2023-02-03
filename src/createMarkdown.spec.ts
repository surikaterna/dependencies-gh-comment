import { Dependency } from './assertDependencies';
import { createMarkdown } from './createMarkdown';

describe('#createMarkdown', () => {
  it('returns the input', () => {
    const dependencies: Array<Dependency> = [
      {
        name: 'autobus',
        version: '^1.0.0',
        license: 'MIT'
      },
      {
        name: 'saft',
        version: '^1.0.2',
        license: 'MIT'
      }
    ];

    const expected = '|Name|Version|License|\n|---|---|---|\n|autobus|^1.0.0|MIT|\n|saft|^1.0.2|MIT|';
    expect(createMarkdown(dependencies)).toBe(expected);
  });
});
