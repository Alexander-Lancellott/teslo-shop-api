declare const validationOptions: {
    true: string[];
    false: string[];
};
export type Options = typeof validationOptions;
export declare const TransformToBoolean: (validation?: {
    true: string[];
    false: string[];
}) => PropertyDecorator;
export {};
