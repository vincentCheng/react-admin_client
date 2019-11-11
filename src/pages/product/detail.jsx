import React, {Component} from 'react';
import {Card, Icon, List} from "antd";
import {connect} from "react-redux";

import {LinkButton} from "../../components/link-button";
import {BASE_IMG_URL} from "../../config";
import {reqCategory} from "../../api";

const Item = List.Item;

class ProductDetail extends Component {

    state = {
        cName1: '', // 一级分类名称
        cName2: '', // 二级分类名称
    };

    async componentDidMount() {
        // let {pCategoryId, categoryId} = this.props.location.state;
        let {pCategoryId, categoryId} = this.props.product;
        if ('0' === pCategoryId + '') { // 一级分类下的商品，这里将id变成字符串再和'0'对比
            let result = await reqCategory(categoryId);
            // debugger;
            let {name} = result.data.data;
            this.setState({cName1: name});
        } else { // 二级分类下的商品
            /*
            * 这样无法一次性发送两个请求。
            * */
            // let result1 = await reqCategory(pCategoryId);
            // let result2 = await reqCategory(categoryId);
            // this.setState({cName1: result1.data.data.name, cName2: result2.data.data.name});

            let results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)]);

            this.setState({cName1: results[0].data.data.name, cName2: results[1].data.data.name});
        }
    }

    render() {
        // 读取携带过来的state数据
        const {name, desc, price, imgs, detail} = this.props.product;
        const {cName1, cName2} = this.state;

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
                        <span>{cName2 ? `${cName1} ---> ${cName2}` : cName1}</span>
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

// export default ProductDetail;

export default connect(
    state => ({product: state.hashRouteParams}),
    null
)(ProductDetail);