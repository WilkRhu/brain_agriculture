import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

ValidatorConstraint({ name: 'isAreaValid', async: false });
export class IsAreaValidConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    const { totalAreaHectares, arableAreaHectares, vegetationAreaHectares } =
      value;

    if (
      totalAreaHectares !== undefined &&
      arableAreaHectares !== undefined &&
      vegetationAreaHectares !== undefined
    ) {
      return arableAreaHectares + vegetationAreaHectares <= totalAreaHectares;
    }

    return false;
  }

  defaultMessage() {
    return "The sum of the arable area and the vegetation area cannot be greater than the farm's total area.";
  }
}

export function IsAreaValid() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message:
          'The sum of arable area and vegetation area cannot exceed the total farm area.',
      },
      constraints: [],
      validator: IsAreaValidConstraint,
    });
  };
}
