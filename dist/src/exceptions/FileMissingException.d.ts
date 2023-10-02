export default class FileMissingException {
    getMessage(): string;
    getStatus(): number;
    getCode(): number;
    getSource(): string | string[];
    getDescription(): string;
}
