export interface IPageProps {
    id:string;
    name:string;
    parent:string;
    icon?:string;
    tabChildren?:boolean;
    description?:string;
    url:string;
    pagePath:string;
    children:IPageProps[]|undefined;
    permissions?: IPagePermissionProps[];
    pageType?:string;
}

export interface IPagePermissionProps {
    id:string;
    pageId:string;
    permission:string;
    type: string;
    children:[];
}