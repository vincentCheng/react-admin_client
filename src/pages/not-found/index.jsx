import React, {Component} from 'react';
import {connect} from "react-redux";
import {Result, Button} from 'antd';

import "./not-found.less";
import {setHeadTitle} from "../../redux/actions";
import {menuConfig} from '../../config/menuConfig';

class Index extends Component {
    render() {
        this.props.setHeadTitle('404');
        return (
            <Result
                status="404"
                title="404"
                subTitle="没有这个页面啊！"
                extra={<Button type="primary" onClick={() => {
                    this.props.setHeadTitle(menuConfig[0].title);
                    this.props.history.replace('/home');
                }}>打道回府</Button>}
            />
        );
    }
}

// export default NotFound;
export default connect(
    state => ({}),
    {setHeadTitle} // 这个是在 this.props.setHeadTitle 中读取。
)(Index);