import { ValidationError } from "class-validator";
export declare function format(errors: ValidationError[]): Record<string, any>;
export declare function ErrorFormatter(errors: ValidationError[]): void;
