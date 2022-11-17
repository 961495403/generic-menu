export interface IAsLoginParams {
  username: string;
  password: string;
}

export interface IFoundationTree {
  id: string;
  name: string;
  parentId: string;
  type: number;
  children: IFoundationTree[]
}