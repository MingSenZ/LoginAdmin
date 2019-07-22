import React, { Component } from 'react'
import { Card, Table, Button, Icon, message, Modal } from 'antd';
import LinkButton from '../../components/link-button/link-button'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api/index'
import AddUpdateForm from './add-update-form'
export default class Category extends Component {

    state = {
        ifLoading: false,
        cateGory: [],
        showStatus: 0,   //0 表示隐藏,  1代表显示添加  2代表显示修改
    }
    initColumns = () => {
        this.columns = [
            {
                title: '分类的名称',  //某一个字段的标题
                dataIndex: 'name', //对应了data中的name所保存的值
                //这个next就是上面对应的name的值
                // render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: '操作',//某一个字段的标题
                width: 300,
                //将字段渲染成了一个自己设计的linkbutton标签
                render: (category) => <LinkButton onClick={() => {
                    this.category = category
                    this.setState({ showStatus: 2 }

                    )
                }}>修改分类 </LinkButton>
            },
        ];
    }
    getCategorys = async () => {
        this.setState({
            isLoading: true
        })
        //获取数据
        const result = await reqCategorys()
        this.setState({
            isLoading: false
        })
        if (result.status === 0) {
            //更新界面
            this.setState({
                cateGory: result.data
            })
        } else {
            message.error('获取数据错误')
        }
    }
    //点击确定的回调
    handleOk = () => {
        //进行表单验证
        this.form.validateFields(async (err, values) => {
            let result

            if (!err) {
                this.form.resetFields()

                //  console.log(values)
                const { categoryName } = values
                //通过设置在组件对象身上的category属性可以获取到当前category的信息{_id:' ', name:'' }
                if (this.state.showStatus === 1) {

                    //根据输入的值发送请求进行添加
                    result = await reqAddCategory(categoryName)
                    //重置一组输入控件的值（为 initialValue）与状态，如不传入参数，则重置所有组件
                    console.log(this.form)
                } else {
                    const categoryId = this.category._id
                    result = await reqUpdateCategory({ categoryName, categoryId })

                }
                this.form.resetFields()
                const { showStatus } = this.state
                let action = showStatus === 1 ? '添加' : '修改'
                if (result.status === 0) {
                    //重新更新最新的列表,这样可以更新显示页面
                    this.getCategorys()
                    message.success(action + '成功了')
                    this.setState({
                        showStatus: 0
                    })
                } else {
                    message.error(action + '失败')
                }
            }
        });
    }
    ///点击取消的回调
    handleCancel = () => {
        this.form.resetFields()
        this.setState({
            showStatus: 0,
        })

    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getCategorys()
    }
    render() {
        const { cateGory, isLoading, showStatus } = this.state
        //读取想要修改的那个分类名称
        const category = this.category || {}
        const extra = (
            <Button onClick={() => { this.setState({ showStatus: 1 }) }} type="primary" >
                <Icon type="plus"></Icon>
                添加
            </Button>
        )
        return (
            <div>
                <Card extra={extra} >
                    <Table
                        columns={this.columns}   //所有列的描述
                        dataSource={cateGory}  //存储所有数据的
                        bordered
                        loading={isLoading}
                        rowKey="_id"
                        pagination={{
                            defaultPageSize: 3,
                            showQuickJumper: true,
                        }}
                    />
                    <Modal
                        //弹框的显示仅仅是因为shouStatus的状态, 状态不同,则弹框的显示 不同,功能也不同
                        title={showStatus === 1 ? '添加数据' : '修改数据'}
                        visible={showStatus !== 0}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <AddUpdateForm setForm={form => this.form = form} categoryName={category.name} />
                    </Modal>
                </Card>
            </div>
        )
    }
}
