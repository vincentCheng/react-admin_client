import React, {Component} from 'react';
import {Card, Icon, List} from "antd";
import {LinkButton} from "../../components/link-button";
import {BASE_IMG_URL} from "../../config";

const Item = List.Item;

class ProductDetail extends Component {
    render() {

        // 读取携带过来的state数据
        let {name, desc, price, imgs, detail} = this.props.location.state;

        let title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left'
                          style={{color: 'green', marginRight: 15, fontSize: 20}}/>
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>商品名称：</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述：</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格：</span>
                        <span>￥{price}</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类：</span>
                        <span>电脑 ---> 笔记本</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片：</span>
                        <span className='product-img'>
                            {imgs.map(img => (img ? <img key={img} src={BASE_IMG_URL + img} alt='img'/> : '无'))}
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html: detail}}/>
                    </Item>
                </List>
            </Card>
        );
    }
}

export default ProductDetail;