import React, { Component } from 'react'
import logo from './logo.png'
import './login.less'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
export default class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
    render() {
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="" />
                    <h1> React项目</h1>
                </div>
                <div className='login-content'>
                    <h1>登陆账号</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

