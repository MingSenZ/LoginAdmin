import React from 'react'
import { Upload, Icon, Modal } from 'antd'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends React.Component {
    state = {
        previewVisible: false,  //是否显示大图预览
        previewImage: '',
        fileList: [
            { //文件信息对象    //file对象
                uid: '-1',  //唯一标识
                name: 'xxx.png', //文件名
                status: 'done', //图片上传时的状态  unloading(正在)   done(已完成)  error(错误)  removed (已删除)
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
        ],
    };

    handleCancel = () => this.setState({ previewVisible: false });


    //让大图预览的回调函数
    //file:当前选择的图片的file对象
    handlePreview = async file => {
        if (!file.url && !file.preview) {  //当文件对象没有url地址, 而且没有通过64编码过
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    //在file对象状态时改变时调用
    //file指的是当前操作的file对象
    //filelist 指的是每一个上传的图片的信息的对象的数组
    handleChange = ({ file, fileList }) => {
       /*  file和fileList的最后一个元素,表示的都是正在编辑的对象  但是两个不同的对象 */
        console.log(file, 'file')
        console.log(fileList, 'fileList')
        if (file.status === 'done') {
            const { url, name } = file.response.data
            file = fileList[fileList.length - 1]
            file.name = name
            file.url = url
        }
        this.setState({ fileList });
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action='/manage/img/upload' //想要将图片上传的地址
                    name='image'   //发送到后台的文件名   //参数名
                    listType="picture-card"
                    fileList={fileList}   //已经上传的所有图片文件信息对象的数组,  一个图片一个对象,存在一个数组中
                    //当预览图片时,显示
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 6 ? null : uploadButton}
                </Upload>

                {/* //预览图片的对话框  */}
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}