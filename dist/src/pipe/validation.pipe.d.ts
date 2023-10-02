import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { ValidatorOptions } from "@nestjs/common/interfaces/external/validator-options.interface";
export interface ValidationPipeOptions extends ValidatorOptions {
    transform?: boolean;
    disableErrorMessages?: boolean;
}
export declare class ViewValidationPipe implements PipeTransform<any> {
    protected isTransformEnabled: boolean;
    protected isDetailedOutputDisabled: boolean;
    protected validatorOptions: ValidatorOptions;
    constructor(options?: ValidationPipeOptions);
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
    private toValidate;
    toEmptyIfNil<T = any, R = any>(value: T): R | {};
}
