import React, {Component} from 'react';
import {Upload, Icon, Modal, message} from 'antd';
import {reqImgDelete} from "../../api";
import PropTypes from "prop-types";
import {BASE_IMG_URL} from "../../config";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends Component {

    constructor(props) {
        super(props);

        let fileList = [];

        // 如果传入了imgs属性
        const {imgs} = this.props;

        if (imgs && imgs.length > 0) fileList = imgs.map((img, index) => ({
            uid: -index,
            name: img,
            status: 'done',
            url: BASE_IMG_URL + img
        }));

        this.state = {
            previewVisible: false, // 是否显示大图预览界面
            previewImage: '', // 大图的url
            // {
            //     uid: '-1',
            //     name: 'image.png',
            //     status: 'done',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // }
            fileList,
        };
    }

    /**
     * 获取所有已经上传图片文件名的数组
     */
    getImgs = () => (this.state.fileList.map(file => file.name));

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    /**
     * 上传中、完成、失败都会调用这个函数。
     * @param file 当前操作的文件对象
     * @param fileList 当前的文件列表
     * @param event 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持
     */
    handleChange = async ({file, fileList, event}) => {
        const {status} = file;

        // 这里有很多的很奇怪的bug
        // 视频中能够修改 file.name 但是我这里是无法修改的。
        switch (status) {
            case 'done':
                // console.log(file);
                // console.log(fileList);
                const {response} = file;
                if (response.status * 1 !== 0) {
                    message.error('上传图片失败');
                    break;
                }
                // 一旦上传成功，将当前上传的file信息修正。实际上这个修改没用。
                message.success('上传图片成功');
                // const {name, url} = response.data;
                // // console.log('成功', name);
                // file.name = name;
                // file.url = url;
                break;
            case 'removed':
                // 这里的删除是删除本地的，还需要删除服务器的。
                // 如果上传完成之后，立刻删除照片，那么当前照片的名字是读取不到上面修改后的名字的。
                // 如果重新进入当前界面，file.name 是能读取到服务器中的照片名字的。
                // 如果没有response，那么是重新进入当前界面
                // 如果有response，表示是上传完成，没有退出界面。
                let fileName = file.response ? file.response.data.name : file.name;
                const result = await reqImgDelete(fileName);
                // console.log(fileName, result);
                if (result.status*1 === 200 && result.data.status*1 === 0) {
                    message.success('删除图片成功');
                    break;
                }
                message.error('删除图片失败');
                break;
            default:
                break;
        }

        this.setState({fileList})
    };

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/manage/img/upload"
                    // accept=".jpg,.jpeg,.png"
                    accept="image/*" // 表示接收任意类型的图片
                    name='image' // 发送到后台的请求参数名
                    listType="picture-card" // 卡片样式
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}

PicturesWall.propTypes = {
    imgs: PropTypes.array
};

export default PicturesWall;