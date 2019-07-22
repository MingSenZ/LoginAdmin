import React from 'react'
import './link-button.less'


//自己实现一个外形像链接的按钮
export default function LinkButton(props) {
    return <button className='button' {...props}></button>
}