import { useAction } from "./hooks";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Menu, Layout } from 'antd';
import React, { memo, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import style from "../layout/index.module.scss"

const { Header, Sider, Content } = Layout;


const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    userMenu
  } = useAction();
  return (

    <Layout>
      <Header className={style.header}>这个是头部标题</Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} className={style.sider} onCollapse={value => setCollapsed(value)} trigger={null}>
          <Menu
            onClick={(value: any) => {navigate(value.key)}}
            style={{ height: "100%", borderRight: 0 }}
            items={userMenu}
            mode="inline"
          />
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: style.collapsed,
              onClick: () => { setCollapsed(!collapsed) },                                                                                                                                                                                                                                                             
            }
          )}
        </Sider>

        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>

      </Layout>
    </Layout>
  )
}
export default memo(MainLayout)

