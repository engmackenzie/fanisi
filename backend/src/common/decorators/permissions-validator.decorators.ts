import { ValidatorConstraint, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsValidPermissionNameConstraint {
  defaultMessage(args: ValidationArguments) {
    return `Invalid permission name: ${args.value}`;
  }
}
