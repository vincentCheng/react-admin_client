/*根组件*/

import React, {Component} from 'react';
import {BrowserRouter, HashRouter, Route, Switch} from "react-router-dom"; // 这个 BrowserRouter 和 HashRouter 的去别是路径没有“#”

import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";

/**
 * 容易出错的情况:
 * 1、path后面不写/
 * 2、加“.”
 *
 * 说明：
 * 1、Switch 表示只匹配其中一个
 *
 * 注意：
 * 1、这里的 <Route path='/login' component={Login}/> 一定要写在前面。
 * 2、但是每一次都会先匹配 <Route path='/' component={Admin}/>，因为所有的路径都会先匹配 '/'。
 */
class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/' component={Admin}/>
                </Switch>
            </HashRouter>
        )
    }
}

export default App;