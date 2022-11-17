import { DataNode } from "antd/lib/tree";
import { IPageProps } from "types/page";



export interface SavePageModalProps {
    open: boolean;
    treeData: DataNode[];
    formdata: IPageProps|undefined;
    onFinish: (values: IPageProps) => void;
    onCancel: () => void;
    children:[]
}