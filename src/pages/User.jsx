import React, { Component } from 'react'
import UserTable from './UserTable'

export default class User extends Component {
    state = {
        formValue: {
            MaSinhVien: '',
            SoDienThoai: '',
            Ten: '',
            email: '',
        },
        formErr: {
            MaSinhVien: '',
            SoDienThoai: '',
            Ten: '',
            email: '',
        },
        valid: false,
        data: [
            {
                MaSinhVien: 1, Ten: 'Nguyen Van B', SoDienThoai: '0921620996', email: 'nguyenvanB@gmail.com'
            },
            {
                MaSinhVien: 2, Ten: 'Nguyen Van A', SoDienThoai: '0972947812', email: 'nguyenvanA@gmail.com'

            }
        ]
    }
    handleUpdate = () => {
        // Tìm ra sản phẩm có mã tương đương formValue.id
        let { data, formValue } = this.state;
        let userUpdate = data.find(sp => sp.MaSinhVien === formValue.MaSinhVien)
        if (userUpdate) {
            for (let key in userUpdate) {
                userUpdate[key] = formValue[key];
            }
            alert("Sinh viên đã được cập nhật")
        }
        this.setState({
            data: data
        })
    }
    handleEdit = (uesrClick) => {
        this.setState({
            formValue: uesrClick
        }, () => {
            this.setState({
                valid: this.checkFormSubmit()
            })
        })
    }
    handleDelete = (uesrClick) => {
        let data = this.state.data.filter(user => user.MaSinhVien !== uesrClick)
        this.setState({
            data: data
        })
    }
    checkFormSubmit = () => {
        // form hợp lệ khi: Các trường form err = rỗng, và trường value tương ứng phải khác rỗng
        let { formErr, formValue } = this.state
        for (let key in formErr) {
            if (formErr[key] !== '' || formValue[key] === '') {
                return false;
            }
        }
        return true;
    }
    handleChangeInput = (e) => {
        let { value, name } = e.target;
        let dataType = e.target.getAttribute('data-type');
        let dataMaxLength = e.target.getAttribute('data-maxLength');
        let newFormValue = this.state.formValue;
        newFormValue[name] = value;
        //Xu ly loi
        let newFormErr = this.state.formErr;
        let message = ''
        if (value.trim() === '') {
            message = name + ' Chưa nhập'
        } else {
            if (dataType === 'number') {
                let regexNumber = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;
                if (!regexNumber.test(value)) {
                    message = name + ' Phải là số ';
                }
            }
            if (dataMaxLength !== null && value.length > dataMaxLength) {
                message = name + ` Không được quá ${dataMaxLength}`
            }
        }
        newFormErr[name] = message;
        this.setState({
            formValue: newFormValue,
            formErr: newFormErr,
        }, () => {
            //Goi sau khi moi lan cap nhat value
            this.setState({
                valid: this.checkFormSubmit()
            })
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.checkFormSubmit()) {
            alert('Chưa nhập liệu')
            return;
        }
        let { data } = this.state
        data.push({ ...this.state.formValue })
        this.setState({
            data: data
        })
    }
    render() {
        let { formValue } = this.state
        return (
            <>
                <form className='container' onSubmit={this.handleSubmit}>
                    <h3 className='py-2 text-center'>Thông tin sinh viên</h3>
                    <div className='card'>
                        <div className='card-header  bg-dark text-light p-4'>
                            Thông tin sinh viên
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <p>Mã SV</p>
                                        <input value={formValue.MaSinhVien} data-type='number' type="text" className='form-control' name="MaSinhVien" onInput={this.handleChangeInput} />
                                        {this.state.formErr.MaSinhVien && <div className='alert alert-danger mt-2 py-3'>{this.state.formErr.MaSinhVien}</div>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <p>Số Điện Thoại</p>
                                        <input value={formValue.SoDienThoai} type="text" data-type='number' data-maxLength='10' className='form-control' name="SoDienThoai" onInput={this.handleChangeInput} />
                                        {this.state.formErr.SoDienThoai && <div className='alert alert-danger mt-2 py-3'>{this.state.formErr.SoDienThoai}</div>}

                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <p>Họ tên</p>
                                        <input value={formValue.Ten} type="text" className='form-control' name="Ten" onInput={this.handleChangeInput} />
                                        {this.state.formErr.Ten && <div className='alert alert-danger mt-2 py-3'>{this.state.formErr.Ten}</div>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <p>Email</p>
                                        <input value={formValue.email} type='text' className='form-control' name="email" onInput={this.handleChangeInput} />
                                        {this.state.formErr.email && <div className='alert alert-danger mt-2 py-3'>{this.state.formErr.email}</div>}
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <button disabled={!this.state.valid} type='submit' className='btn btn-success m-2'>
                                        Thêm sinh viên
                                    </button>
                                    <button disabled={!this.state.valid} className='btn btn-dark' type='button' onClick={() => {
                                        this.handleUpdate()
                                    }}>Cập nhật</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className='container mt-2'>
                    <UserTable data={this.state.data} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
                </div>
            </>
        )
    }
}
