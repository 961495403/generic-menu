import { IPagePermissionProps } from "types/page";

export interface IPermissionTableProps {
    permissions?: IPagePermissionProps[];
    children:[],
    onDelete: (id:string) => void;
    onEdit: (value:IPagePermissionProps) => void;
}