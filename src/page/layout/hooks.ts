import { IRouteProps, IUserMenuProps } from "./props"
import { useMount, useRequest } from "ahooks"
import { useState } from "react"
import type { MenuProps } from 'antd';
import React from "react";
import * as Icon from "@ant-design/icons";
import { getUserMenuApi } from "services/api";
type MenuItem = Required<MenuProps>['items'][number];
export const useAction = () => {

  const [userMenu, setUserMenu] = useState<MenuItem[]>([]);


  function getItem(
    label: React.ReactNode,
    key: string|undefined,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const itemIcon = (name: string) => React.createElement((Icon as any)[name]);

  const generateMenuItem = (data: IUserMenuProps[]): MenuItem[] => {
    return data.map(item => getItem(item.menuName, item.url, item.icon ? itemIcon(item.icon) : null, item.children ? generateMenuItem(item.children) : undefined))
  }

  const getUserMenuRequest = useRequest(getUserMenuApi, {
    manual: true,
    onSuccess: (result: IUserMenuProps[]) => {
      setUserMenu(generateMenuItem(result))
    }
  })

  useMount(() => {
    getUserMenuRequest.run()
  })

  return {
    userMenu
  }
} 