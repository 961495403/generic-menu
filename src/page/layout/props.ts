export interface IUserMenuProps {
  children?: IUserMenuProps[] | undefined;
  icon: string | null;
  key: string;
  url?: string;
  id: string;
  pagePath?: string;
  menuName: string;
  menuDesc: string;

}

export interface IRouteProps {
  children?: IRouteProps[] | undefined;
  path: string;
  pagePath: string;
  
}
