import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import memoryUtil from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav/index.jsx'
import Header from '../../components/header/index'


import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'


const { Footer, Sider, Content } = Layout

export default class Admin extends Component {
    render() {

        //const user = JSON.parse(localStorage.getItem('user_key')|| '{}')
        //从本地文件中读取用户信息
        // const user= storageUtils.getUser()
        //从内存中读取用户信息
        const user = memoryUtil.user
        if (!user._id) {
            return <Redirect to="/login" />
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider >
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{ backgroundColor: "white", color: 'rgba(0,0,0,0.5)' ,margin:'40px'}}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect  to="home"/>
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>使用谷歌浏览器,可以获得更加页面操作效果</Footer>
                </Layout>
            </Layout>
        )
    }
}
