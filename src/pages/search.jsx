import React, { Component } from 'react'
import { Input } from 'antd'

export default class Search extends Component {
    render() {
        let { changeFindUser } = this.props
        return (
            <div>
                <Input onChange={changeFindUser} className="py-3" placeholder="Tìm kiếm sinh viên" />
            </div>
        )
    }
}
