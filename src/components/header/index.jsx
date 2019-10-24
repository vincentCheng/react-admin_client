import React, {Component} from 'react';
import './index.less';
import {formateDate} from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import {reqWeather} from "../../api";

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
     * 每隔一秒 获取一次当前时间
     */
    getTime = () => {
        this.time = setInterval(() => {
            this.setState({currentTime:formateDate(Date.now())})
        }, 1000)
    };

    /**
     * 获取当前天气
     */
    getWeather = async () => {
        let {dayPictureUrl, weather} = await  reqWeather();
        this.setState({dayPictureUrl, weather})
    };

    /*
    * 第一次render之后执行一次
    * 一般执行异步操作
    * 发送ajax请求/jsonp请求/启动定时器。
    * */
    componentDidMount(){
        // 获取当前时间
        this.getTime();
        // 获取当前天气
        this.getWeather();
    }

    componentWillUpdate(){
        this.time = null;
    }

    render() {
        const {currentTime, dayPictureUrl, weather} = this.state;
        const username = memoryUtils.user.username;

        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎 {username}</span>
                    <a href="javascript:">退出</a>
                </div>
                <div className='header-bottom'>
                    <div className="header-bottom-left">首页</div>
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

export default Index;