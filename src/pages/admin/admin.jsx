import React, {Component} from 'react';
import memoryUtils from "src/utils/memoryUtils.js";

/**
 * 后台管理的路由组件
 */
class Admin extends Component {
    render() {
        return (
            <div>
                Admin {memoryUtils.user}
            </div>
        );
    }
}

export default Admin;