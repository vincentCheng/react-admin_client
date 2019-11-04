import React, {Component, createRef} from 'react';
import {Card, Form, Input, Cascader, Button, Icon, message} from "antd";
import {LinkButton} from "../../components/link-button";
import {reqCategorys, reqAddOrUpdateProduct} from "../../api";
import PicturesWall from "./pictures-wall";
import RichTextEditor from "./rich-text-editor";

const {Item} = Form;
const {TextArea} = Input;

class ProductAddUpdate extends Component {

    constructor(props) {
        super(props);

        this.isUpdate = false; // 是否是修改的标识。如果点击了“修改”按钮，就是true
        this.product = {};

        // 创建保存ref标识的标签对象的容器
        // 存储的是 PicturesWall 的对象
        // 使用 this.pw.current 访问 PicturesWall 中的 getImgs() 方法
        this.pw = createRef();
        this.richTextEditor = createRef();
    }

    state = {
        options: [],
    };

    /**
     * 验证价格的函数
     */
    validatorPrice = (rule, value, callback) => {
        if (value * 1 > 0) { // 将value变成数字
            callback();// 验证通过
        } else {
            callback('商品价格必须大于0'); // 验证不通过
        }
    };

    /**
     * 级联中的加载数据
     * @param selectedOptions this.state.options的其中一项
     */
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // 得到二级分类列表
        let subCategories = await this.getCategorys(targetOption.value);
        targetOption.loading = false;

        if (subCategories && subCategories.length > 0) {
            // this.initOptions(subCategories, targetOption);

            // 生成一个二级列表的options
            // 关联到当前option上
            targetOption.children = subCategories.map(item => ({value: item._id, label: item.name, isLeaf: true}));

        } else { // 当前页面中的分类不是二级分类
            targetOption.isLeaf = true;
        }

        this.setState({options: [...this.state.options]});
    };

    /**
     * 提交的回调函数
     */
    submit = () => {
        // 表单验证通过才发送请求。
        this.props.form.validateFields(async (error, values) => {

            if (!error) {
                // 1 收集数据封装成product对象。结构中的数据来自于 getFieldDecorator('categoryIds', {}) 等。
                let _id;
                if (this.isUpdate) _id = this.product._id; // 表示更新商品

                const {name, desc, price, categoryIds} = values;
                let pCategoryId, categoryId;
                if (1 === categoryIds.length) {
                    pCategoryId = '0'
                    categoryId = categoryIds[0]
                } else {
                    pCategoryId = categoryIds[0]
                    categoryId = categoryIds[1]
                }
                const imgs = this.pw.current.getImgs();
                // console.log('获取上传之后的图片名字', imgs);
                const detail = this.richTextEditor.current.getDetail();

                let product = {
                    categoryId,
                    pCategoryId,
                    name,
                    desc,
                    price,
                    detail,
                    imgs
                };
                if (this.isUpdate) product._id = this.product._id;

                // 2 调用请求接口函数添加/更新
                const result = await reqAddOrUpdateProduct(product);

                // console.log('result', result);

                // 3 根据结果提示
                const tempMsg = this.isUpdate?'更新':'添加';
                if (result.status === 200 && result.data.status === 0) {
                    message.success(`${tempMsg}成功`);
                    this.props.history.goBack();
                } else {
                    message.error(`${tempMsg}失败`)
                };
            }
        })
    };

    /**
     * 根据categorys生成options数组
     * 更新状态
     * @param categorys 异步获取的数据
     */
    initOptions = async categorys => {
        let options = categorys.map(item => ({
            label: item.name,
            value: item._id,
            isLeaf: false
        }));

        let {pCategoryId} = this.product;
        // 如果更新二级分类列表中的数据
        if (this.isUpdate && pCategoryId !== '0') {
            // 获取二级列表
            let subCategorys = await this.getCategorys(pCategoryId);
            // 生成二级下拉菜单的options
            let childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }));
            // 找到当前商品对应的一级option对象
            let targetOption = options.find(option => option.value === pCategoryId);
            // 关联到对应的一级option上
            targetOption.children = childOptions;
        }

        this.setState({options});
    };

    /**
     * 异步获取一级/二级分类列表
     * 更新options
     */
    getCategorys = async (parentId = 0) => {
        let result = await reqCategorys(parentId);

        if (result.status === 0 || result.status === 200) {
            let tempResult = result.data.data;
            if (0 === parentId * 1) this.initOptions(tempResult); // 如果是一级分类列表
            else return tempResult; // 如果是二级列表
        }
    };

    async componentDidMount() {
        this.getCategorys();
    }

    UNSAFE_componentWillMount() {
        if (this.props.location.state) { // 说明是一级/二级分类列表的更新
            this.isUpdate = true;
            this.product = this.props.location.state || {};
        }
    }

    render() {

        const {pCategoryId, categoryId, imgs, detail} = this.product;
        // 显示商品的级联。这个用于初始化。这里的id会自动和this.state.options对应
        const categoryIds = [];
        if (this.isUpdate) {
            // 如果是二级分类
            if (pCategoryId !== '0') {
                categoryIds.push(pCategoryId);
                categoryIds.push(categoryId);
            } else {
                // 如果是一级分类
                categoryIds.push(categoryId);
            }
        }

        const title = (
            <span>
				<LinkButton onClick={() => this.props.history.goBack()}>
					{/*这里的icon大小，是使用fontsize控制的*/}
                    <Icon type='arrow-left' style={{fontSize: 20}}/>
				</LinkButton>
				<span>{this.isUpdate ? '修改' : '添加'}商品</span>
			</span>
        );
        // 指定item布局的宽度比例
        const formItemLayout = {
            labelCol: {span: 2}, // 左侧label的宽度
            wrapperCol: {span: 8}, // 右侧的宽度
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label='商品名称'>
                        {
                            getFieldDecorator('name', {
                                initialValue: this.product.name,
                                rules: [{required: true, message: '必须输入商品名称'}],
                            })(<Input placeholder='请输入商品名称'/>)
                        }
                    </Item>
                    <Item label='商品描述'>
                        {
                            getFieldDecorator('desc', {
                                initialValue: this.product.desc,
                                rules: [{required: true, message: '必须输入商品描述'}],
                            })(<TextArea placeholder="请输入商品描述" autoSize={{minRows: 3, maxRows: 5}}/>)
                        }
                    </Item>
                    <Item label='商品价格'>
                        {
                            getFieldDecorator('price', {
                                initialValue: this.product.price || '',
                                rules: [{required: true, message: '必须输入商品价格'}, {validator: this.validatorPrice}],
                            })(<Input type='number' placeholder="请输入商品价格" addonAfter='元'/>)
                        }
                    </Item>
                    <Item label='商品分类'>
                        {
                            getFieldDecorator('categoryIds', {
                                initialValue: categoryIds,
                                rules: [{required: true, message: '必须选择商品分类'}],
                            })(<Cascader
                                options={this.state.options}
                                loadData={this.loadData}
                                placeholder='请选择商品分类'
                                changeOnSelect
                            />)
                        }
                    </Item>
                    <Item label='商品图片'>
                        <PicturesWall ref={this.pw} imgs={imgs}/>
                    </Item>
                    {/*这里的指定很重要，总共默认分为24份。这里设定总共22份*/}
                    {/*{*/}
                    {/*labelCol: {span: 2}, // 左侧label的宽度*/}
                    {/*wrapperCol: {span: 8}, // 右侧的宽度*/}
                    {/*}*/}
                    <Item label='商品详情' labelCol={{span: 2}} wrapperCol={{span: 20}}>
                        <RichTextEditor ref={this.richTextEditor} detail={detail}/>
                    </Item>
                    <Item>
                        {/*这里不用onsubmit，那么就不会提交表单。如果使用onsubmit那么需要阻止默认行为。*/}
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create()(ProductAddUpdate);