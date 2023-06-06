import React, { useState } from "react";
import { RegisterBg } from "../../assets";
import { Button, Gap, Input, Link } from "../../components";
import "./resetpassword.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = (props) => {
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    const params = useParams()
    const [alert, setAlert] = useState('')


    const changePassword = (e) => {
        const value = (e.target.value)
        setPassword(value)
        if (!value) {
            setErrorPassword('Password Tidak Boleh Kosong')
        } else {
            setErrorPassword('')
        }
    }

    const changeConfirmPassword = (e) => {
        const value = e.target.value
        setConfirmPassword(value)
        if (!value) {
            setErrorConfirmPassword('Confirm Password Tidak Boleh Kosong')
        } else if (password !== value) {
            setErrorConfirmPassword('Confirm Password Tidak Cocok')
        } else {
            setErrorConfirmPassword('')
        }
    }

    const saveNewPassword = () => {
        const data = {

            password: password,
            token: params.token
        }

        axios.put('http://localhost:4000/v1/resetpassword', data)
            .then(res => {
                if (res) {
                    setPassword('');
                    setConfirmPassword('');
                    setAlert('Password Berhasil Diganti');
                    setTimeout(() => {
                        setAlert('')
                    }, 3000)
                }
            })
    }

    return (
        <div className="main-page">
            <div className="left">
                <img src={RegisterBg} className="bg-image" alt="imageBg" />
            </div>
            <div className="right">
                <p className="title">Reset Password</p>
                <div>
                    <p>{alert}</p>
                </div>
                <div className="alert alert-primary">
                    <Input label="New Password" placeholder="Masukkan Password" value={password} onChange={changePassword} />
                    <div>
                        <p>{errorPassword}</p>
                    </div>

                    <Gap height={10} />
                    <Input label="Confirm Password" placeholder="Ulangi Password" value={confirmPassword} onChange={changeConfirmPassword} />
                    <div>
                        <p>{errorConfirmPassword}</p>
                    </div>
                    <Gap height={18} />
                    <Button title="Save" onClick={saveNewPassword} />
                    <Gap height={100} />
                </div>
            </div>
        </div>
    );

};

export default ResetPassword;
