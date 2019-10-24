import React, {Component} from 'react';
import './index.less';

class Index extends Component {
    render() {
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎 admin</span>
                    <a href="javascript:">退出</a>
                </div>
                <div className='header-bottom'>
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>2019年10月24日16:29:41</span>
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气"/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;