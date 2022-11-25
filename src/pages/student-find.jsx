import React, { Component } from 'react'

export default class StudentFind extends Component {
    render() {
        const { studentCanTim } = this.props;
        return (
            <table className='table'>
                <thead className='bg-dark text-white'>
                    <tr>
                        <th>Ma SV</th>
                        <th>So dien thoai</th>
                        <th>Ho ten</th>
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