import React, { Component } from 'react'

export default class UserTable extends Component {
    render() {
        let { data, handleDelete, handleEdit } = this.props
        return (
            <div>
                <>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Mã Sinh Viên</th>
                                <th>Tên Sinh Viên</th>
                                <th>Số Điện Thoại</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(({ MaSinhVien, Ten, SoDienThoai, email }, index) => {
                                return <tr key={index}>
                                    <td>{MaSinhVien}</td>
                                    <td>{SoDienThoai}</td>
                                    <td>{Ten}</td>
                                    <td>{email}</td>
                                    <td>
                                        <button className='btn btn-success me-3' onClick={() => {
                                            let user = { MaSinhVien, Ten, SoDienThoai, email }
                                            handleEdit(user)
                                        }}>Sửa</button>
                                        <button className='btn btn-success' onClick={() => {
                                            handleDelete(MaSinhVien)
                                        }}>Xóa</button>
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
