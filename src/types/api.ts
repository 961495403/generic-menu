// 分页查询通用类型
export interface IPagination {
  pageIndex: number;
  pageSize: number;
  [key: string]: string | number;
}
