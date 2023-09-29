import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'arrayStringNotEmpty', async: false })
export class NoEmptyString implements ValidatorConstraintInterface {
  validate(array: string[], args: ValidationArguments) {
    return array.some((item) => item.trim().length > 0);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must not contain empty strings`;
  }
}
