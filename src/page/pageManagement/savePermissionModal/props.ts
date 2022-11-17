import { IPagePermissionProps } from "types/page";

export interface SavePermissionModalProps {
    formData: IPagePermissionProps|undefined;
    open: boolean;
    onCancel: () => void;
    onFinish: (value: IPagePermissionProps) => void;
    children:[]
}