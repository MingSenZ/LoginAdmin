import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils.js'
import storageUtil from '../../utils/storageUtil'
import './index.less'
import { formateDate } from '../../utils/DateUtils'
import { Modal } from 'antd';
import menuList from '../../config/config'
import { clearInterval } from 'timers';
import { reqWeather } from '../../api/index'
import LinkButton  from '../link-button/link-button'
const { confirm } = Modal;

class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: ''
    }

    getWeather = async () => {
        
        const { dayPictureUrl, weather } = await reqWeather('北京')
        this.setState({
            dayPictureUrl,
            weather
        })
    }

    componentDidMount() {
        this.timeId = setInterval(() => {
            this.setState({ currentTime: formateDate(Date.now()) })
        }, 1000)
        this.getWeather()
    }
    componentWillUnmount() {
        clearInterval(this.timeId)
    }
    showConfirm = () => {
        confirm({
            title: '确定要腿粗吗?',
            onOk: () => {
                //内存中删除用户信息
                memoryUtils.user = {}
                //本地存储中删除用户的信息
                storageUtil.removeUser()
                //跳转到登陆界面
                this.props.history.replace('/login')
            },
        });
    }

    logout = () => {
        this.showConfirm()
    }

    getTitle = () => {
        let title = ''
        const pathName = this.props.location.pathname
        menuList.forEach((item) => {
            if (item.key === pathName) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find((cItem) => {
                    return cItem.key === pathName
                })
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }
    render() {
        let { dayPictureUrl, weather } = this.state
        return (
            <div className="header">
                <div className="header-top">
                    欢迎 {memoryUtils.user.username}
                    <LinkButton onClick={this.logout} >退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        <h1>{this.getTitle()}</h1>
                    </div>
                    <div className="header-bottom-right">
                        <span> {this.state.currentTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
