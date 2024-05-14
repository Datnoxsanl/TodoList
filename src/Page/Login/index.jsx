import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { EmailRule, PasswordRule } from "../../common/rule";
import { login } from "../../services/auth";
import { useNavigate } from "react-router";
import useNotification from "../../customHook/useNotication";

const Login = () => {
  const { contextHolder, infoNotify, errorNotify } = useNotification();
  const nav = useNavigate();
  const onFinish = async (values) => {
    try {
      var data = await login(values);
      const user = data.user;
      const token = data.jwt;
      localStorage.getItem("token", token);
      localStorage.getItem("user", JSON.stringify(user));
      nav("/");
    } catch (error) {
        console.error('Lỗi:', error);
        const { response } = error;
        if (response) {
            const { error: { message } } = response.data;
            errorNotify('topRight', 'Lỗi đăng nhập', message);
        } else {
            errorNotify('topRight', 'Lỗi đăng nhập', 'Không thành công');
        }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    errorNotify("topRight", "Loi dang nhap", errorInfo.errorFields[0].errors[0]);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {contextHolder}
        <Form.Item label="Email" name="identifier" rules={EmailRule}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={PasswordRule}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Login;
