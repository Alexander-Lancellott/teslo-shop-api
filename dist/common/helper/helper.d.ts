import { Logger } from '@nestjs/common';
export declare class Helper {
    logger: Logger;
    constructor(context?: string);
    handleDBExceptions(error: any): never;
}
