import React, { Component } from 'react'
import logo from '../../assets/images/logo.png'
import './login.less'
import { Form, Icon, Input, Button } from 'antd';
import { reqLogin } from '../../api/index'
import { Redirect } from 'react-router-dom'
import { message } from 'antd'

import storageUtils from '../../utils/storageUtil'
import memoryUtil from '../../utils/memoryUtils'
class Login extends Component {
    handleSubmit = e => {
        //阻止表单的默认行为  (提交表单 )
        e.preventDefault();
        //对表单的所有字段进行统一验证
        this.props.form.validateFields(async (err, { username, password }) => {

            if (!err) {
                //登陆成功之后会将用户存放到缓存中
                let result = await reqLogin(username, password)
                if (result.status === 0) {
                    //user是一个从后台返回的用户对象
                    const user = result.data
                   // localStorage.setItem('user_key',JSON.stringify(user))
                   storageUtils.saveUser(user)

                    //将登陆成功之后的用户存放到内存中
                    memoryUtil.user = user

                    //跳转到admin页面
                    this.props.history.replace('/')
                    message.success('登陆成功')
                } else {

                }
            } else {
                alert('验证失败')
            }
        });
    }

    validatorPSW = (rule, value, callback) => {
        // 1).必须输入
        // 2).必须大于等于4位
        // 3).必须小于等于12位
        // 4).必须是英文、数字或下划线组成
        //value 为用户输入的密码
        value = value.trim()
        if (!value) {
            callback('密码必须输入')
        }
        else if (value.length < 4) {
            callback('密码必须大于等于4位')
        } else if (value.length > 12) {
            callback('密码必须小于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文,数字,或者下划线')
        } else {
            callback()  //验证通过
        }
    }
    render() {

        //当用户已经登录之后,则直接让用户跳转管理界面
        //const user = JSON.parse(localStorage.getItem('user_key') || '{}')
        
      //  const user = storageUtils.getUser('user_key');

        //从内存中读取用户是否登陆过        
       const user = memoryUtil.user
        if (user._id) {
            return <Redirect to="/" />
        }
        let { getFieldDecorator } = this.props.form
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
                            {getFieldDecorator('username', {
                                initialValue: '',
                                rules: [
                                    // 1).必须输入
                                    // 2). 必须大于等于4位
                                    // 3). 必须小于等于12位
                                    // 4). 必须是英文、数字或下划线组成
                                    { required: true, whitespace: true, message: '请输入您的用户名' },
                                    { min: 4, message: '用户名必须大于4位' },
                                    { max: 12, message: '用户名不得超过12位' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须为数字,字母或者下划线' }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                initialValue: '',
                                rules: [{ validator: this.validatorPSW }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
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

const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm

