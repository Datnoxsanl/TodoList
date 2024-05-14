import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import {
  EmailRule,
  PasswordRule,
  Re_Password,
  useNamerule,
} from "../../common/rule";
import { register } from "../../services/auth";
import { useNavigate } from "react-router";
import useNotification from "../../customHook/useNotication";

// import 'Register.css'


const Register = () => {
  var nav = useNavigate();
  const {contextHolder, infoNotify ,errorNotify} = useNotification()

  const onFinish = async (values) => {
    try {

      await register(values);
      infoNotify('topRight', 'Thanh Cong', 'Ban da tao thanh cong')
      nav("/");
    } catch ({response}) {
      var {error} = response.data
      errorNotify('topRight', 'Loi dang ky', error.message)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    errorNotify('topRight', 'Loi dang ky', 'Khong thanh cong')
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
        <Form.Item label="Username" name="username" rules={useNamerule}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="Email" rules={EmailRule}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={PasswordRule}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="Re-Password" name="Re-password" rules={Re_Password}>
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
export default Register;
