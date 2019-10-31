import React, {Component} from 'react';
import {Switch, Route,Redirect} from "react-router-dom";

import ProductHome from "./home";
import ProductAddUpdate from "./add-update";
import ProductDetail from "./detail";

/**
 * 匹配顺序
 * 1、匹配“/”
 * 2、匹配“product”
 * 3、匹配“product/”
 * ...一次类推。
 * 这叫做逐层匹配。
 *
 * 使用exact，叫做路径完全匹配。
 */
class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={ProductHome} exact/>
                <Route path='/product/add-update' component={ProductAddUpdate} />
                <Route path='/product/detail' component={ProductDetail} />
                <Redirect to='/product'/>
            </Switch>
        );
    }
}

export default Product;