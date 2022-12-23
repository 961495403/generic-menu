import { Button, Form, Input, Modal, Radio, TreeSelect } from "antd";
import { FC, memo, useEffect } from "react";
import { SavePageModalProps } from "./props";

const SavePageModal: FC<SavePageModalProps> = ({ treeData, formdata, onFinish, onCancel, open }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.resetFields()
    }, [formdata, treeData, form, open])

    return (
        <>
            <Modal title={formdata?"编辑页面":"新增页面"} forceRender open={open} onCancel={onCancel} footer={null} destroyOnClose={true} >
                <Form 
                    form={form}
                    initialValues={formdata}
                    onFinish={onFinish}
                >

                    <Form.Item
                        label="页面名称"
                        name="name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="页面路由"
                        name="url"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="页面路径"
                        name="pagePath"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="页面描述"
                        name="description"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="图标"
                        name="icon"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="子项是否为tab"
                        name="tabChildren"
                    >
                        <Radio.Group defaultValue={false}>
                            <Radio value={false}>否</Radio>
                            <Radio value={true}>是</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="页面类型"
                        name="pageType"
                    >
                        <Radio.Group defaultValue={'STAFF'}>
                            <Radio value={'STAFF'}>各部门页面</Radio>
                            <Radio value={'SYSTEM_ADMIN'}>系统管理员页面</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="上级"
                        name="parent"
                    >
                        <TreeSelect
                            fieldNames={{ value: "key" }}
                            showSearch
                            style={{ width: '100%' }}
                            value={formdata?.id}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            treeData={treeData}
                        />
                    </Form.Item>

                    <Form.Item noStyle>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        </>

    );
}

export default memo(SavePageModal)