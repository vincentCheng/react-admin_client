import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Modal} from "antd";
import './index.less';
import {formateDate} from "../../utils/dateUtils";
import {userOptions} from "../../utils/storageUtils";
import {menuConfig} from "../../config/menuConfig";
import {reqWeather} from "../../api";
import {LinkButton} from "../link-button";

const {confirm} = Modal;

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTime: formateDate(Date.now()),
            dayPictureUrl: "",
            weather: ""
        };

        this.time = null;
    }

    /**
     * 设置title
     */
    getTitle = (data) => {
        // 得到当前请求路径
        let path = this.props.location.pathname;
        let tempData = data || menuConfig;

        tempData.forEach(item => {
            if (item.key === path) this.title = item.title;
            else if (item.children) this.getTitle(item.children)
        })
    };

    /**
     * 每隔一秒 获取一次当前时间
     */
    getTime = () => {
        this.time = setInterval(() => {
            this.setState({currentTime: formateDate(Date.now())})
        }, 1000)
    };

    /**
     * 获取当前天气
     */
    getWeather = async () => {
        let {dayPictureUrl, weather} = await reqWeather();
        this.setState({dayPictureUrl, weather})
    };

    /**
     * 退出登录
     *
     * todo: 这里对内存的修改，可以在index.js中使用事件监听。
     */
    logout = () => {
        confirm({
            title: '退出登录',
            content: '您真的要退出登录吗',
            onOk: () => {
                userOptions.removeUser();
                this.props.history.replace('/login');
            },
            onCancel: () => {
                // console.log('取消');
            },
        });
    };

    UNSAFE_componentWillMount(){
        let user = userOptions.getUser();
        this.username = user.data.username;
    }

    /*
    * 第一次render之后执行一次
    * 一般执行异步操作
    * 发送ajax请求/jsonp请求/启动定时器。
    * */
    componentDidMount() {
        // 获取当前时间
        this.getTime();
        // 获取当前天气
        this.getWeather();
        // 获取title
        this.getTitle();
    }

    componentWillUnmount() {
        this.time = null;
    }

    render() {
        const {currentTime, dayPictureUrl, weather} = this.state;
        // let user = userOptions.getUser();
        // console.log('header', user);
        // const username = user.

        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎 {this.username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className="header-bottom-left">{this.title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="天气"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Index);