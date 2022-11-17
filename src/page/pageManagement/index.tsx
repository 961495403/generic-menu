import { DownOutlined } from '@ant-design/icons';
import { Button, Layout, Tree } from 'antd';


import React, { memo } from 'react';
import style from "./index.module.scss"
import { useAction } from './hooks';
import SavePageModal from './savePageModal';
import PermissionTable from './permissionTable'
import SavePermissionModal from './savePermissionModal'
const { Header, Sider, Content } = Layout;

const PageConfig: React.FC = () => {
    const { page, openSavePageModal, openSavePermissionModal, pageFormdata, permissionFormdata, onSelectPage, onSavePage, setOpenSavePageModal, setOpenSavePermissionModal, setPageFormdata, setPermissionFormdata, onDeletePage, onDeletePermission, onSavePermission} = useAction()
    return (
        <Layout>
            <Sider className={style.sider}>
                <Tree
                    showLine
                    switcherIcon={<DownOutlined />}
                    onSelect={onSelectPage}
                    treeData={page}
                 
                />
            </Sider>

            <Layout>
                <Header className={style.header}>
                    <Button className={style.button} onClick={
                        () => {
                            setOpenSavePageModal(true)
                            setPageFormdata(undefined)
                      
                        }
                    } type="primary">
                        新建页面
                    </Button>
                    <Button className={style.button} hidden={!pageFormdata} onClick={() => { setOpenSavePageModal(true) }} >编辑页面</Button>
                    <Button className={style.button} type="primary" danger onClick={
                        () => {
                            onDeletePage()
                            setPageFormdata(undefined)
                        }
                    } hidden={!pageFormdata}>
                        删除页面
                    </Button>
                    <Button className={style.button} onClick={
                        () => {
                            setPermissionFormdata(undefined)
                            setOpenSavePermissionModal(true)
                        }
                    } type="primary" hidden={!pageFormdata}>
                        新增权限
                    </Button>
                </Header>
                <Content>
                    <SavePageModal
                        open={openSavePageModal}
                        onFinish={onSavePage}
                        onCancel={() => {
                            setOpenSavePageModal(false)
                            setPageFormdata(undefined)
                        }}
                        treeData={page}
                        formdata={pageFormdata}
                    >
                    </SavePageModal>

                    <SavePermissionModal 
                        onFinish={onSavePermission}
                        onCancel={() => {
                            setPermissionFormdata(undefined)
                            setOpenSavePermissionModal(false)
                        }}
                        formData={permissionFormdata}
                        open={openSavePermissionModal}>

                    </SavePermissionModal>

                    <PermissionTable 
                        onDelete={onDeletePermission}
                        permissions={pageFormdata?.permissions}
                        onEdit={(value) => {
                            setOpenSavePermissionModal(true)
                            setPermissionFormdata(value)
                   
                        }}>
                    </PermissionTable>
                </Content>
            </Layout>
        </Layout>


    );
};

export default memo(PageConfig);