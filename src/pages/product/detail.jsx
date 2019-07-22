import React, { Component } from 'react'
import { Card, Icon, Button, List } from 'antd'
import { Redirect } from 'react-router-dom'
import LinkButton from '../../components/link-button/link-button'
import memoryUtils from '../../utils/memoryUtils'
import { BASE_IMG } from '../../utils/Constants'
import { reqCategory } from '../../api/index'
const Item = List.Item
/* 
商品详情路由组件
*/
export default class ProductDetail extends Component {
  state = {
    categoryName: ''
  }
  getCategoryId = async (categoryId) => {
    const result = await reqCategory(categoryId)
    console.log(result)
    if (result.status === 0) {
      const categoryName = result.data.name
      this.setState({ categoryName })
    }
  }


  componentDidMount() {
    //在内存中获取product对象
    const product = memoryUtils.product
      //不一定有 ,所以判断当有值的时候再去获取categoryId的值
    if(product._id){
    this.getCategoryId(product.categoryId)
    }
  }
  render() {
    const { product } = memoryUtils
    const { categoryName } = this.state

    if (!product || !product._id) {
      return <Redirect to='/product' />
    }
    const title = (
      <span>
        <LinkButton onClick={() => { this.props.history.goBack() }}>
          <Icon type='arrow-left'></Icon>
        </LinkButton>
        <span style={{ margin: '0px 10px' }}>商品详情</span>
      </span>
    )
    return (
      <Card title={title}>
        <List>
          <Item>
            <span className='detail-left'>商品名称:</span>
            <span>{product.name}</span>
          </Item>
          <Item>
            <span className='detail-left'>商品描述:</span>
            <span>{product.desc}</span>
          </Item>
          <Item>
            <span className='detail-left'>商品价格:</span>
            <span>{product.price}</span>
          </Item>
          <Item>
            <span className='detail-left'>所属分类:</span>
            <span>{categoryName}</span>
          </Item>
          <Item>
            <span className='detail-left'>商品图片:</span>
            <span>
              {
                product.imgs.map((img) => {

                  return <img className='detail-img' key={img} src={BASE_IMG + img} alt="img" />
                })
              }
            </span>
          </Item>
          <Item>
            <span className='detail-left'>商品详情:</span>
            <div dangerouslySetInnerHTML={{ __html: product.detail}}></div>
          </Item>

        </List>
      </Card>
    )
  }
}
