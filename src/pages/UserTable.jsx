import React, { Component } from 'react'

export default class UserTable extends Component {
    render() {
        const { data, handleDel, handleEit } = this.props
        return (
            <div>
                <>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>Number Phone</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(({ id, name, numberPhone, email }, index) => {
                                return <tr key={index}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{numberPhone}</td>
                                    <td>{email}</td>
                                    <td>
                                        <button onClick={() => {
                                            handleDel(id)
                                        }} className='btn btn-danger'>Xóa</button>
                                        <button onClick={() => {
                                            let user = { id, name, numberPhone, email }
                                            handleEit(user)
                                        }} className='btn btn-primary mx-2'>Chỉnh sửa</button>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                </>
            </div>
        )
    }
}
