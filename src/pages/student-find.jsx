import React, { Component } from 'react'

export default class StudentFind extends Component {
    render() {
        const { studentCanTim } = this.props;
        return (
            <table className='table'>
                <thead className='bg-dark text-white'>
                    <tr>
                        <th>MaSinhVien</th>
                        <th>Ten</th>
                        <th>SoDienThoai</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{studentCanTim.MaSinhVien}</td>
                        <td>{studentCanTim.Ten}</td>
                        <td>{studentCanTim.SoDienThoai}</td>
                        <td>{studentCanTim.email}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}