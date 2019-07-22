import React, { Component } from 'react'
import { reqProducts, reqSearchProducts } from '../../api/index'
import {
    Button,
    Select,
    Card,
    Icon,
    Table,
    Input
} from 'antd'
import LinkButton from '../../components/link-button/link-button'
const Option = Select.Option

export default class Product extends Component {
    state = {
        loading: false,
        products: [],
        total: 0,
        searchType: 'productName',  //
        searchName: ''
    }
    getProducts = async (pageNum) => {
        const { searchName, searchType } = this.state
        let result
        if (!searchName) {
            //获取到从后台请求到的商品的数据
            result = await reqProducts(pageNum,2)
        } else {
            // reqSearchProducts
        }


        if (result.status === 0) {
            const { total, list } = result.data
            // console.log(list)
            this.setState({
                total,
                products: list
            })
        }
    }
    initClomuns = () => {
        this.columns = [
            { //
                title: '商品名称',
                dataIndex: 'name',
                render: text => <a href="javascript:;">{text}</a>,
                width: '30%'
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                width: '30%'
            },
            {
                title: '价格',
                dataIndex: 'price',
                width: ' 20 %',
                render: price => '$' + price
            },
            {
                title: '状态',
                dataIndex: 'status',  //status ==1表示在售  ==2 表示已经下架  
                render: (status) => {
                    let btnText =''
                    let text = ''
                       if(status===1){
                            btnText= '下架'
                            text ='在售'
                       }else{
                           btnText='上架'
                           text='已售完'
                       }
                    return (
                        <span>
                            <button onClick={()=>{  } } >{btnText} </button> <br/>
                            <span>{ text}</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                render: (product) => (<span>
                    <LinkButton>详情</LinkButton><br/>
                    <LinkButton>修改</LinkButton>
                </span>)
            }];
    }
    componentWillMount() {
        this.initClomuns()
    }
    componentDidMount() {
       this.getProducts(1)
    }
    render() {
        const { loading, products,total } = this.state
        const extra = (
            <Button onClick={() => { this.props.history.push('/product/addupdate') }} type='primary'>
                <Icon type="plus"></Icon>
                添加商品
            </Button>
        )
        const title = (
            <span>
                <Select value="productName">
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productType">按描述搜索</Option>
                </Select>
                <Input onChange={() => { this.setState({}) }} style={{ width: '200px', margin: 10 }} placeholder="关键字" />
                <Button onClick={() => { this.getProducts(1) }} type="primary">搜索</Button>
            </span>
        )
        return (
            <div>
                < Card
                    bordered={false}
                    style={{ width: '100%' }}
                    extra={extra}
                    title={title}
                    pagination={{
                        pageSize: 2,

                    }}
                >
                    <Table
                        bordered
                        rowKey="_id"
                        loading={loading}
                        columns={this.columns}
                        dataSource={products}
                        pagination={{ 
                         //告诉分页器一共有多少条数据, 还有每页的个数, 这样才能够得知一共有多少页 
                            total,   
                            defaultPageSize: 2,
                            showQuickJumper: true,
                            onChange: this.getProducts   //当页码改变时,则就请求当页的数据 会自动把当前页的页码传给这个参数
                        }}
                    />
                </Card>
            </div>
        )
    }
}
