import { Button, Form, Input, Modal, Select } from "antd";
import { memo, useEffect } from "react";
import { SavePermissionModalProps } from "./props";

const SavePermissionModal: React.FC<SavePermissionModalProps> = ({ formData, open, onCancel, onFinish }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.resetFields()
    }, [formData, form, open])

    const typeOption = [
        {
            value: "LIST",
            label: "LIST"
        },

        {
            value: "DETAIL",
            label: "DETAIL"
        },
        {
            value: "INSERT",
            label: "INSERT"
        },
        {
            value: "EDIT",
            label: "EDIT"
        },
        {
            value: "DELETE",
            label: "DELETE"
        }
    ]

    return (
        <>
            <Modal title={formData ? "编辑权限" : "新增权限"} forceRender open={open} footer={null} onCancel={onCancel} destroyOnClose>
                <Form
                    form={form}
                    initialValues={formData}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="权限"
                        name="permission">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="类别"
                        name="type">
                        <Select options={typeOption}>

                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}
export default memo(SavePermissionModal)