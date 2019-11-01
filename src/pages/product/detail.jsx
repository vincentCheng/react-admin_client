import React, {Component} from 'react';
import {Card, Icon, List} from "antd";

const Item = List.Item;

class ProductDetail extends Component {
    render() {
        let title = (<span><Icon type='arrow-left'/><span>商品详情</span></span>)
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>商品名称：</span>
                        <span>联想xxx</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述：</span>
                        <span>联想xxx</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格：</span>
                        <span>￥6000</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类：</span>
                        <span>电脑 ---> 笔记本</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片：</span>
                        <span>
                            <img src="" alt=""/>
                        </span>
                    </Item>
                </List>
            </Card>
        );
    }
}

export default ProductDetail;