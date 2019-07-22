import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './index.less'
import menuList from '../../config/config'
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu



class LeftNav extends Component {
    //第二种方法使用reduce来实现,动态的由嵌套的数据数组,生成标签数组
    // reduce+递归
    getMenuNodes2 = (menuList) => {
        //获取到当前访问的路由的地址
        const path = this.props.location.pathname
        return menuList.reduce((pre, item) => { //这个是遍历的回调函数 ,:统计,必须返回当次的统计结果
            if (!item.children) {
                pre.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                const result = item.children.find((cItem) => {
                    return cItem.key === path
                })
                if (result) {
                    this.openKey = item.key
                }

                pre.push(
                    <SubMenu key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }>
                        {
                            this.getMenuNodes2(item.children)
                        }
                    </SubMenu>
                )
            }
            return pre
        }, [])

    }




    getMenuNodes = (menuList) => {
        //根据menuList的数据数组 , 生成标签数组

        //获取到当前访问的路由的地址
        const path = this.props.location.pathname
        //需要根据每一项自身是否含有children属性,如果含有该属性,需要递归的方式,去遍历对象
        //map+递归的方法
        return menuList.map((item) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
            const result = item.children.find((cItem) => {
                return cItem.key === path
            })
            if (result) {
                this.openKey = item.key
            }
            return (
                <SubMenu key={item.key}
                    title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {
                        this.getMenuNodes(item.children)
                    }
                </SubMenu>
            )
        })
    }


    componentDidMount() {
        ///在第一次render执行之后 ,只执行一次  一般执行 进行异步任务的操作  
        //比如   ajax请求 , 启动定时器
    }
    componentWillMount() {
        //在第一次render之前 , 只执行一次
        // 为第一次render准备需要的数据

        //先获取到menunodes
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render() {

        let selectKey = this.props.location.pathname
        if (selectKey.indexOf('/product') === 0) {
            selectKey = '/product'
        }
        return (
            <div className="leftNav">
                <Link className="left-header" to="/home">
                    <img src={logo} alt="logo" />
                    <h1> 前端学院</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    //defaultSelectedKeys    指定默认的值,只根据第一次的默认值显示
                    //selectedKeys   根据指定的随时变化的selectKey  进行显示
                    //这两个都是指 默认选中的路由

                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openKey]}
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

//因为一般的组件身上没有  this.props.history / location/match属性  
//下面的包装之后就可以生成一个新组件,新组件与旧组件就父子关系,新组件为父组件,负责给子组件传递history / location/match参数
export default withRouter(LeftNav)