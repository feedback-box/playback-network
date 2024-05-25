import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Task } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TaskUpdateFormInputValues = {
    mediaId?: string;
    aiModelId?: string;
    ownersWallet?: string;
    name?: string;
    description?: string;
    difficulty?: number;
    app?: string;
    priceListed?: number;
    status?: string;
    published?: boolean;
    createdAt?: number;
};
export declare type TaskUpdateFormValidationValues = {
    mediaId?: ValidationFunction<string>;
    aiModelId?: ValidationFunction<string>;
    ownersWallet?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    difficulty?: ValidationFunction<number>;
    app?: ValidationFunction<string>;
    priceListed?: ValidationFunction<number>;
    status?: ValidationFunction<string>;
    published?: ValidationFunction<boolean>;
    createdAt?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TaskUpdateFormOverridesProps = {
    TaskUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    mediaId?: PrimitiveOverrideProps<TextFieldProps>;
    aiModelId?: PrimitiveOverrideProps<TextFieldProps>;
    ownersWallet?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    difficulty?: PrimitiveOverrideProps<TextFieldProps>;
    app?: PrimitiveOverrideProps<TextFieldProps>;
    priceListed?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    published?: PrimitiveOverrideProps<SwitchFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TaskUpdateFormProps = React.PropsWithChildren<{
    overrides?: TaskUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    task?: Task;
    onSubmit?: (fields: TaskUpdateFormInputValues) => TaskUpdateFormInputValues;
    onSuccess?: (fields: TaskUpdateFormInputValues) => void;
    onError?: (fields: TaskUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TaskUpdateFormInputValues) => TaskUpdateFormInputValues;
    onValidate?: TaskUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TaskUpdateForm(props: TaskUpdateFormProps): React.ReactElement;