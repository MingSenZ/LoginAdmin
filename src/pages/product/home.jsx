import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message
} from 'antd'

import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import LinkButton from '../../components/link-button/link-button'
import memoryUtils from '../../utils/memoryUtils'

const Option = Select.Option
/* 
商品管理的首页组件
*/
export default class ProductHome extends Component {

  state = {
    loading: false,
    products: [], // 商品列表
    total: 0, // 商品的总数量
    searchName: '',
    searchType: 'productName'   //默认是按照商品名称搜索 
  }

  updateStatus = async (status, productId) => {
    console.log(status)

    //计算一下要修改的值  ,不然状态不会修改
    status = status === 1 ? 2 : 1
    console.log(status)
    const result = await reqUpdateStatus(productId, status)
    if (result.status === 0) {
      message.success('状态更新成功了')
      //获取当前页码显示
      this.getProducts(this.pageNum)
    }
  }

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '¥' + price
      },
      {
        title: '状态',
        width: 100,
        // dataIndex: 'status',  //这个标识着  状态 默认在哪个地方取值 
        // ,如果想要默认位置取不到,可以通过render( product)  render内部会自动将当前的这个对象传进去  
        render: ({ status, _id }) => {
          let btnText = '下架'
          let text = '在售'
          if (status === 2) {
            btnText = '上架'
            text = '已下架'
          }
          return (
            <span>
              <Button type="primary" onClick={() => {
                this.updateStatus(status, _id)
              }}>{btnText}</Button><br />
              <span>{text}</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        render: (product) => (
          <span>
            <LinkButton onClick={() => {
              this.props.history.push('/product/detail')
              memoryUtils.product = product   //将当前的porduct对象存储在内u你中
            }}> 详情</LinkButton><br />
            <LinkButton onClick={() => {
              memoryUtils.product = product
              this.props.history.push('/product/addupdate')
            }}>修改</LinkButton>
          </span>
        )
      },
    ]
  }

  /* 
  异步获取指定页码商品列表显示
  */
  getProducts = async (pageNum) => {
    this.pageNum = pageNum
    let result
    const { searchName, searchType } = this.state

    if (!this.issearch) {
      // 发请求获取数据
      result = await reqProducts(pageNum, 2)
    } else {
      console.log(searchName, searchType)
      result = await reqSearchProducts({ pageNum, pageSize: 2, searchName, searchType })
      console.log(result)
    }

    if (result.status === 0) {
      // 取出数据
      const { total, list } = result.data
      // 更新状态
      this.setState({
        products: list,
        total
      })
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    // 获取第一页显示
    this.getProducts(1)
  }

  render() {
    const { loading, products, total, searchType, searchName } = this.state

    const title = (
      <span>
        <Select onChange={(value) => { this.setState({ searchType: value }) }} style={{ width: 200 }} value={searchType}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        {/* <Input
          value={searchName}
          onChange={event => this.setState({searchName: event.target.value})}
          style={{ width: 200, margin: '0 10px' }}
          placeholder="关键字" /> */}
        <Input
          style={{ width: 200, margin: '0 10px' }}
          placeholder="关键字"
          value={searchName}
          onChange={event => this.setState({ searchName: event.target.value })}
        />
        <Button type="primary" onClick={
          () => {
            this.issearch = true
            this.getProducts(1)

          }

        }>搜索</Button>
      </span >
    )
    const extra = (
      <Button onClick={() => {
        memoryUtils.product = {}
        this.props.history.push('/product/addupdate')
      }} type="primary">
        <Icon type="plus" />
        添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered={true}
          rowKey="_id"
          loading={loading}
          columns={this.columns}
          dataSource={products}
          pagination={{
            total,
            defaultPageSize: 2,
            showQuickJumper: true,
            onChange: this.getProducts,
            current: this.pageNum
          }}
        />
      </Card>
    )
  }
}
