import "reflect-metadata";
import { Transform } from "class-transformer";
import { getManager } from "typeorm";
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { ClassConstructor } from "class-transformer";
import { stringToBase64 } from "@utils/utility";


interface OptionInterface {
  column: string;
  value?: string | number;
  dtoKey?: string;
}
interface ValidationOptionsCustom {
  each?: boolean;
}

export const ToUpperCase = (validationOptions?: ValidationOptionsCustom) => {
  if (validationOptions?.each)
    return Transform((params) =>
      params?.value?.map((param) => param?.toUpperCase().trim()),
    );
  return Transform((params) => params?.value?.toUpperCase().trim());
};

export const ToLowerCase = (validationOptions?: ValidationOptionsCustom) => {
  if (validationOptions?.each)
    return Transform((params) =>
      params?.value?.map((param) => param?.toLowerCase().trim()),
    );
  return Transform((params) => params?.value?.toLowerCase().trim());
};

export const Trim = () => {
  return Transform((params) => params?.value?.trim());
};

export const EscapeHtml = () => {
  return Transform((params) => {
    return stringToBase64(params.value);
  });
};

const constructQuery = (input: any, args: ValidationArguments) => {
  const { constraints, object } = args;

  if (!constraints.length) return { isValid: false };

  const body = constraints[0];

  const bodyParams: any = { ...object };

  if (!body.table || !body.column) return { isValid: false };

  let query = `select count(*) as ok from ${body.table} where is_active is true and ${body.column} = $1 `;

  const replacements: Array<any> = [];
  replacements.push(input);

  if (body.options) {
    const options: Array<OptionInterface> | OptionInterface = body.options;
    if (Array.isArray(options)) {
      for (let i = 0; i <= options.length - 1; i++) {
        if (options[i].value || bodyParams[options[i].dtoKey]) {
          query += `and ${options[i].column} = $${replacements.length + 1} `;
          replacements.push(options[i].value || bodyParams[options[i].dtoKey]);
        }
      }
    } else {
      if (!options.column || !options.value) return { isValid: false };
      else {
        query += ` and ${options.column} = $${replacements.length + 1} `;
        replacements.push(options.value || bodyParams[options.dtoKey] || null);
      }
    }
  }
  return { query, replacements, isValid: true };
};

export function IsExists(
  input: { table: string; column: string },
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,

      propertyName: propertyName,

      options: validationOptions,

      constraints: [input],

      validator: {
        async validate(input: any, args: ValidationArguments) {
          const entityManager = getManager();
          input = !Array.isArray(input) ? [input] : input;
          for (let i = 0; i <= input.length - 1; i++) {
            let isValidated = false;
            const { query, replacements, isValid } = constructQuery(
              input[i],
              args,
            );
            if (isValid) {
              console.log(query);
              const response = await entityManager.query(query, replacements);
              if (!response.length) isValidated = false;
              if (response[0].ok > 0) isValidated = true;
              if (!isValidated) return false;
              return isValidated;
            } else {
              return false;
            }
          }
        },

        defaultMessage(args: ValidationArguments) {
          return `The given value does not exists.`;
        },
      },
    });
  };
}

export function IsDuplicate(input: any, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,

      propertyName: propertyName,

      options: validationOptions,

      constraints: [input],

      validator: IsDuplicateConstraint,
    });
  };
}

@ValidatorConstraint({ name: "IsDuplicate" })
export class IsDuplicateConstraint implements ValidatorConstraintInterface {
  async validate(input: any, args: ValidationArguments) {
    const { object } = args;

    const entityManager = getManager();

    input = !Array.isArray(input) ? [input] : input;
    for (let i = 0; i <= input.length - 1; i++) {
      let isValidated = true;
      const {
        query: baseQuery,
        replacements,
        isValid,
      } = constructQuery(input[i], args);

      let query = baseQuery;

      if (isValid) {
        const bodyParams: any = { ...object };

        if (bodyParams?.id) {
          query += `and id <> $${replacements.length + 1}`;
          replacements.push(bodyParams.id);
        }

        console.log(query);

        const response = await entityManager.query(query, replacements);
        if (response[0].ok > 0) isValidated = false;
        if (!response.length) isValidated = true;
        if (isValidated) return true;
        return isValidated;
      } else {
        return true;
      }
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `The given value already exists.`;
  }
}
// export const Test = <T>(
//   type: ClassConstructor<T>,
//   input: any,
//   validationOptions?: ValidationOptions,
// ) => {
//   return function (object: Record<string, any>, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,

//       propertyName: propertyName,

//       options: validationOptions,

//       constraints: [input],

//       validator: TestConstraint,
//     });
//   };
// };

// @ValidatorConstraint({ name: "Test" })
// export class TestConstraint implements ValidatorConstraintInterface {
//   async validate(input: any, args: ValidationArguments) {
//     const entityManager = getManager();

//     const { constraints, object } = args;

//     if (!constraints.length) return false;
//     const body = constraints[0];

//     const bodyParams: any = { ...object };

//     if (!body.table || !body.column) return false;

//     let query = `select count(*) as ok from ${body.table} where ${body.column} = $1 `;

//     const replacements: Array<any> = [];
//     replacements.push(input);

//     if (bodyParams?.id) {
//       query += `and id <> $${replacements.length + 1}`;
//       replacements.push(bodyParams.id);
//     }

//     if (body.options) {
//       const options: Array<OptionInterface> | OptionInterface = body.options;
//       if (Array.isArray(options)) {
//         for (let i = 0; i <= options.length - 1; i++) {
//           query += `and ${options[i].column} = $${replacements.length + 1} `;
//           replacements.push(
//             options[i].value || bodyParams[options[i].dtoKey] || null,
//           );
//         }
//       } else {
//         if (!options.column || (!options.dtoKey && !options.value))
//           return false;
//         else {
//           query += ` and ${options.column} = $${replacements.length + 1} `;
//           replacements.push(
//             options.value || bodyParams[options.dtoKey] || null,
//           );
//         }
//       }
//     }

//     console.log(query);
//     const response = await entityManager.query(query, replacements);
//     if (response[0].ok > 0) return false;
//     if (!response.length) return true;
//     return true;
//   }

//   defaultMessage(args: ValidationArguments) {
//     return `The given ${args.property} already exists.`;
//   }
// }

export const NotMatches = (
  pattern: RegExp,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [pattern],
      validator: NotMatchConstraint,
    });
  };
};

@ValidatorConstraint({ name: "NotMatches" })
export class NotMatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [fn] = args.constraints;
    const regex = RegExp(fn);
    const matches = regex.test(value);
    return !matches;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} consists of disallowed characters.`;
  }
}
export const Match = <T>(
  type: ClassConstructor<T>,
  property: (o: T) => any,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
};

@ValidatorConstraint({ name: "Match" })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [fn] = args.constraints;
    console.log(fn(args.object));
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const [constraintProperty]: (() => any)[] = args.constraints;
    return `${constraintProperty} and ${args.property} does not match`;
  }
}

export const ToBoolean = () => {
  const toPlain = Transform(
    ({ value }) => {
      return value;
    },
    {
      toPlainOnly: true,
    },
  );
  const toClass = (target: any, key: string) => {
    return Transform(
      ({ obj }) => {
        return valueToBoolean(obj[key]);
      },
      {
        toClassOnly: true,
      },
    )(target, key);
  };
  return function (target: any, key: string) {
    toPlain(target, key);
    toClass(target, key);
  };
};

const valueToBoolean = (value: any) => {
  if (value === null || value === undefined) {
    return undefined;
  }
  if (typeof value === "boolean") {
    return value;
  }
  if (["true", "on", "yes", "1"].includes(value.toLowerCase())) {
    return true;
  }
  if (["false", "off", "no", "0"].includes(value.toLowerCase())) {
    return false;
  }
  return undefined;
};
