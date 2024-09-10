import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidCNPJ, isValidCPF } from 'src/utils/cpfAndCnpjValidator';

@ValidatorConstraint({ async: false })
export class IsCpfOrCnpjConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (!value) return false;
    return isValidCPF(value) || isValidCNPJ(value);
  }

  defaultMessage() {
    return 'CPF or CNPJ is invalid!';
  }
}

export function IsCpfOrCnpj(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfOrCnpjConstraint,
    });
  };
}
