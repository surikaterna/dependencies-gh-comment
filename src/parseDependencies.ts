import { assertDependencies, Dependency } from './assertDependencies';

export const parseDependencies = (input: string): Array<Dependency> => {
  try {
    const dependencies = <unknown>JSON.parse(input);

    if (!assertDependencies(dependencies)) {
      throw new Error('Input does not contain a list of dependencies');
    }

    return dependencies;
  } catch (err) {
    return [];
  }
};
