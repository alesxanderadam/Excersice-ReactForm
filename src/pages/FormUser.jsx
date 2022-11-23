import React, { Component } from 'react'
import UserTable from './UserTable'

export default class FormUser extends Component {
    state = {
        formValue: {
            id: '',
            name: '',
            numberPhone: '',
            email: '',
        },
        formErr: {
            id: '',
            name: '',
            numberPhone: '',
            email: '',
        },
        valid: false,
        data: [
            {
                id: 1, name: 'Nguyen Van B', numberPhone: '0921620996', email: 'nguyenvanB@gmail.com'
            },
            {
                id: 2, name: 'Nguyen Van A', numberPhone: '0972947812', email: 'nguyenvanA@gmail.com'

            }
        ]
    }
    handUpdateInput = () => {
        let { arrProduct, formValue } = this.state
        let proUpdate = arrProduct.find((pro) => pro.id === formValue.id)
        if (proUpdate) {
            for (let key in proUpdate) {
                if (key !== 'id') {
                    proUpdate[key] = formValue[key];
                }
            }
        }
        this.setState({
            arrProduct: arrProduct,
        })
    }
    handleEit = (user) => {
        this.setState({
            formValue: user
        }, () => {
            this.setState({
                valid: this.checkFormInput()
            })
        })
    }

    checkFormInput = () => {
        let { formValue, formErr } = this.state
        for (let key in formErr) {
            if (formErr[key] !== '' || formValue[key] === '') {
                return false;
            }
        }
        return true;
    }
    handleChangeInput = (e) => {
        let { value, name } = e.target
        console.log(value, name)
        let newFormValue = this.state.formValue
        let dataType = e.target.getAttribute('data-type')
        let dataMax = e.target.getAttribute('data-maxLength');
        newFormValue[name] = value;

        let newFormErr = this.state.formErr
        let message = ''
        if (value.trim() === '') {
            message = name + ' Không bỏ trống'
        } else {
            if (dataType === 'number') {
                let regexNumber = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;
                if (!regexNumber.test(value)) {
                    message = name + ' Phải là số ';
                }
            }
            if (dataMax !== null && value.length > dataMax) {
                message = name + `Không vượt quá ${dataMax}`
            }
        }
        newFormErr[name] = message
        this.setState({
            formValue: newFormValue,
            formErr: newFormErr,
        }, () => {
            this.setState({
                valid: this.checkFormInput()
            })
        })
    }
    handleDel = (msv) => {
        let arrUser = this.state.data.filter(user => user.id !== msv)
        this.setState({
            data: arrUser,
        })
    }
    render() {
        let { formValue } = this.state
        return (
            <>
                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    if (!this.checkFormInput()) {
                        return;
                    }
                    let arrUser = this.state.data
                    arrUser.push({ ...this.state.formValue })
                    this.setState({
                        data: arrUser
                    })
                }} className='container'>
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
                                        <input value={formValue.id} data-type='number' data-maxLength='6' type="text" className='form-control' name="id" onInput={this.handleChangeInput} />
                                        {this.state.formErr.id && <div className='alert alert-danger'>{this.state.formErr.id}</div>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <p>Số Điện Thoại</p>
                                        <input value={formValue.numberPhone} data-type='number' data-maxLength='11' type="text" className='form-control' name="numberPhone" onInput={this.handleChangeInput} />
                                        {this.state.formErr.numberPhone && <div className='alert alert-danger'>{this.state.formErr.numberPhone}</div>}
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <p>Họ tên</p>
                                        <input value={formValue.name} type="text" className='form-control' name="name" onInput={this.handleChangeInput} />
                                        {this.state.formErr.name && <div className='alert alert-danger'>{this.state.formErr.name}</div>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <p>Email</p>
                                        <input value={formValue.email} type='text' className='form-control' name="email" onInput={this.handleChangeInput} />
                                        {this.state.formErr.email && <div className='alert alert-danger'>{this.state.formErr.email}</div>}
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <button disabled={!this.state.valid} type='submit' className='btn btn-success m-2'>
                                        Thêm sinh viên
                                    </button>
                                    <button onClick={() => {
                                        this.handUpdateInput()
                                    }} className='btn btn-dark'>Cập nhật</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className='container mt-2'>
                    <UserTable handleEit={this.handleEit} data={this.state.data} handleDel={this.handleDel} />
                </div>
            </>
        )
    }
}
