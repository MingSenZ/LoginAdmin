import React, { Component } from 'react'
import { Input, Form, } from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item
//添加分类的Form组件
class AddUpdateForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
        categoryName: PropTypes.string
    }


    componentWillMount() {
        this.props.setForm(this.props.form)
    }
    render() {
        //通过Form包装之后的组件,this.props会具有form属性 ,
        // 经 Form.create() 包装过的组件会自带 this.props.form 属性   
        //this.props.form 提供的 API 如下：
        //getFieldsValue  :获取一组输入控件的值，如不传入参数，则获取全部组件的值 Function([fieldNames: string[]])
        // getFieldValue  ;获取一个输入控件的值   Function(fieldName: string)
        // setFieldsValue :设置一组输入控件的值（注意：不要在 componentWillReceiveProps 内使用，否则会导致死循环，原因）


        const { getFieldDecorator } = this.props.form
        const { categoryName } = this.props
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName', {
                            //表单的初始值
                            initialValue: categoryName || '',
                            rules: [
                                { required: true, message: '分类名称必须输入' }
                            ]
                        })(
                            <Input type="text" placeholder="请输入分类名称"></Input>
                        )
                    }
                </Item>
            </Form>
        )
    }
}


export default Form.create()(AddUpdateForm)