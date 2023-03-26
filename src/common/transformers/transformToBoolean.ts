import { Transform } from 'class-transformer';

const validationOptions = {
  true: ['true', '1'],
  false: ['false', '0'],
};

interface StringObject {
  [index: string]: string;
}

export type Options = typeof validationOptions;

export const TransformToBoolean = (validation = validationOptions) => {
  return Transform(({ obj, key }: { obj: StringObject; key: string }) => {
    const value = obj[key];
    if (typeof value === 'string') {
      if (validation.true.includes(obj[key].toLowerCase())) return true;
      else if (validation.false.includes(obj[key].toLowerCase())) return false;
      else return '';
    }
    return value;
  });
};
