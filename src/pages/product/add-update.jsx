import React, { Component } from 'react'
import { Card, Icon, Form, Input, Select, Button, Upload, message } from 'antd'
import LinkButton from '../../components/link-button/link-button'
import { reqCategorys } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import  PicturesWalls from './picture-wall'
const Item = Form.Item
const Option = Select.Option
const { TextArea } = Input;

/* 
商品添加/更新的路由组件
*/


class ProductAddUpdate extends Component {
  state = {
    categorys: []
  }




  handleSubmit = (e) => {
    e.preventDefault()
    //进行表单的统一验证
    this.props.form.validateFields((err, value) => {
      //err 表示的是错误  
      // value 表示的是在表单内部用getFieldDecorator标识的表单的输入内容的对象集合 {key(标识): value (输入的值)}
      if (!err) {
        console.log(value)
      }
    })
  }
  //验证输入的价格是否合理
  validatorPrice = (rule, value, callback) => {
    if (value < 0) {
      //value为用户输入的值 
      callback('商品价格大于0')
    } else {
      callback()
    }
  }


  getCategory = async () => {
    const result = await reqCategorys()
    if (result.status === 0) {
      const { data } = result
      this.setState({ categorys: data })
    }
  }
  componentWillMount() {
    this.product = memoryUtils.product
    this.isUpdate = !!this.product._id

  }
  componentDidMount = () => {
    this.getCategory()
  }
  render() {
    const { categorys } = this.state
    const { isUpdate, product } = this
    //Item的布局样式
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
    }
    const { getFieldDecorator } = this.props.form
    const title = (
      <span>
        <LinkButton onClick={() => {
          this.props.history.replace('/product')
        }}>
          <Icon type='arrow-left'></Icon>
        </LinkButton>
        <span>
          {
            isUpdate ? '修改商品' : '添加商品'
          }
        </span>
      </span>
    )


    return (
      <Card title={title} style={{ width: '100%' }}>
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="商品名称">
            {getFieldDecorator('name', {
              initialValue: product.name,
              rules: [
                {
                  required: true,
                  message: 'Please input  productName',
                },
              ],
            })(<Input placeholder="Please input productName" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="商品描述">
            {getFieldDecorator('desc', {
              initialValue: product.desc,
              rules: [
                {
                  required: true,
                  message: 'Please input  productdesc',
                },
              ],
            })(
              <TextArea
                placeholder='Please input  productdesc'
                autosize={{ minRows: 2, maxRows: 6 }}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="商品价格">
            {getFieldDecorator('pricce', {
              initialValue: product.price,
              rules: [
                {
                  required: true,
                  message: 'Please input  productprice',
                }, { validator: this.validatorPrice }
              ],
            })(
              <Input type='number' placeholder='Please input  productprice' addonAfter="元" />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="商品分类">
            {getFieldDecorator('categoryId', {
              initialValue: product.categoryId || '',
              rules: [
                {
                  required: true,
                  message: 'Please input  productprice',
                },
              ],
            })(
              <Select>
                {
                  categorys.map((item) => {
                    return <Option key={item._id} value={item._id}>{item.name}</Option>
                  })
                }

              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="商品图片">
            <div>
              <PicturesWalls>

              </PicturesWalls>
            </div>
          </Form.Item>
          <Form.Item {...formItemLayout} label="商品详情">
            <div>
              商品详情组件
            </div>
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary'> 提交</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}


export default Form.create()(ProductAddUpdate)
