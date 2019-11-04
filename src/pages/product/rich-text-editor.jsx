import React, {Component} from 'react';
import {EditorState, convertToRaw, ContentState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; // 记得引入这个
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from "prop-types";

class RichTextEditor extends Component {

    constructor(props) {
        super(props);
        const html = this.props.detail;
        if (html){ // 如果有值
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.state = {
                    editorState,
                };
            }
        }else{
            this.state = {
                editorState: EditorState.createEmpty(), // 创建一个没内容的
            };
        }
    }

    /**
     * 获取带标签的信息
     */
    getDetail = () => (draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));

    /*
    * 实时传递输入信息
    * */
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const {editorState} = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    editorStyle={{border: '1px solid black', minHeight: 200, paddingLeft: 10}}
                    onEditorStateChange={this.onEditorStateChange}
                />
                {/*这里的textarea生成html标签，存入服务器*/}
                {/*<textarea*/}
                {/*disabled*/}
                {/*value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}*/}
                {/*/>*/}
            </div>
        );
    }
}

RichTextEditor.propTypes = {detail: PropTypes.string};

export default RichTextEditor;