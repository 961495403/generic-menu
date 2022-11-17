export interface IPageProps {
    id:string;
    name:string;
    parent:string;
    url:string;
    pagePath:string;
    children:IPageProps[]|undefined;
    permissions?: IPagePermissionProps[]
}

export interface IPagePermissionProps {
    id:string;
    pageId:string;
    permission:string;
    type: string;
    children:[];
}