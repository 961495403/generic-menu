import { Alert, Button, Checkbox, Form, Input, Modal } from "antd";
import { LockOutlined, UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import styles from "./index.module.scss";
import { useAction } from "./hooks";
const {confirm} = Modal;
const Login = () => {
  const {
    isError,
    isLoading,
    loginWay,
    formData,
    isSystemPage,
    onFinish,
    onErrorClose,
    onLoginWay,
    onSystemOrDepartment,
  } = useAction();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [form, formData]);

  const onConfirm = () => {
    confirm({
      title: <span style={{fontWeight: 600}}>操作确认</span>,
      content: "是否进入系统管理页面?",
      className: styles.confirm,
      icon: <ExclamationCircleOutlined />,
      onOk() {onSystemOrDepartment(true)},
      onCancel() {onSystemOrDepartment(false)}
    });
  };

  return (
    <div className={styles.container}>
      <div style={{ width: "60%" }}></div>
      <div className={styles["login-box"]}>
        <div className={styles.title}>
          <label>招聘管理系统</label>
          <span>Recruitment management system</span>
        </div>
        <div className={styles["login-way"]}>
          <div
            className={`${!loginWay && styles.select}`}
            onClick={() => onLoginWay(0)}
          >
            账号密码登录
          </div>
          <div
            className={`${loginWay && styles.select}`}
            onClick={() => onLoginWay(1)}
          >
            体验者登录
          </div>
        </div>
        {isError && (
          <Alert
            className={styles["error-msg"]}
            message="账户或密码错误"
            type="error"
            showIcon
            closable
            afterClose={onErrorClose}
          />
        )}
        <Form
          name="normal_login"
          form={form}
          className={styles.form}
          initialValues={formData}
          onFinish={onFinish}
        >
          {loginWay ? (
            <Form.Item
              name="code"
              rules={[{ required: true, message: "请输入Code" }]}
            >
              <Input
                className={styles["login-form-input"]}
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入Code"
              />
            </Form.Item>
          ) : (
            <>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "请输入用户名" }]}
              >
                <Input
                  className={styles["login-form-input"]}
                  prefix={<UserOutlined />}
                  placeholder="账号"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input
                  className={styles["login-form-input"]}
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles["login-form-button"]}
              loading={isLoading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.footer}>
        ©2018-2022 Operation Management Enterprise, Inc. All Rights Reserved.
      </div>
      <>{isSystemPage && onConfirm()}</>
    </div>
  );
};
export default Login;
