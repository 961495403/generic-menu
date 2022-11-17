import type { TableProps } from 'antd';
import { Button, Space, Table } from 'antd';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import React, { memo, useEffect, useState } from 'react';
import { IPagePermissionProps, IPageProps } from 'types/page';
import { IPermissionTableProps } from "./props"

const PermissionTable: React.FC<IPermissionTableProps> = ({ permissions, onDelete, onEdit }) => {
    
    const columns: ColumnsType<IPagePermissionProps> = [
        {
            title: "权限名",
            dataIndex: "permission",
            key: "permission"
        },
        {
            title: "类别",
            dataIndex: "type",
            key: "type"
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            render: (value: any, rowData: IPagePermissionProps, index) => (
                <div>
                    <Space size={8}>
                        <Button
                            type="primary"
                            ghost
                            onClick={() => onEdit(rowData)}
                        >
                            编辑
                        </Button>

                        <Button  
                            danger
                            onClick={() => onDelete(rowData.id)}>
                            删除
                        </Button>

                    </Space>
                </div>
            ),

        }
    ]

    return (
        <Table
            pagination={false}
            columns={columns}
            dataSource={permissions}
            
        />
    )
}


export default memo(PermissionTable)