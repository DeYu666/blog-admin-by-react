import React from "react";
import {Form, Input, Button, Checkbox, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

import "./login.css"
import {LoginForm} from "../../api/login";
import cookie from 'react-cookies'
import {useNavigate} from "react-router-dom";


export default function Login() {
    let navigate = useNavigate();

    const onFinish = values => {
        // console.log(values)
        LoginForm(values.username,values.password).then(response => {
            // console.log(response)

            if(response.error_code === 0) {
                cookie.save('token', response.data.access_token)
                navigate("/backstage")
            }else {
                message.error("用户名或密码错误")
            }

            // this.props.history.push("/71510/home")
        }).catch(error => {
            alert(error)
        })
    }


    return (
        <div className={"login"} style={{backgroundColor: "#2d3a4b"}}>
            <div className={"login_box"}>
                <h1>后台管理系统</h1>
                <Form name="normal_login" className="login-form" initialValues={{remember: true}}
                      onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: '请输入用户名'}]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: '请输入密码'}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <div style={{display: "flex"}}>
                        <Form.Item name="remember" valuePropName="checked" style={{float: "left"}}>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
