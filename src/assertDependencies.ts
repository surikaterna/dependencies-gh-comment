export interface Dependency {
  name: string;
  version: string;
  license: string;
}

export const assertDependencies = (input: unknown): input is Array<Dependency> => {
  if (!Array.isArray(input)) {
    return false;
  }

  return input.every(assertDependency);
};

const assertDependency = (value: unknown): value is Dependency => assertNonNullObject(value) && assertDependencyProperties(value);
const assertNonNullObject = (value: unknown): value is object => typeof value === 'object' && value !== null;
const assertDependencyProperties = (obj: object): boolean => {
  const keys = ['name', 'version', 'license'] as const;
  if (!('name' in obj && 'version' in obj && 'license' in obj)) {
    return false;
  }

  return keys.every((key) => typeof obj[key] === 'string');
};
