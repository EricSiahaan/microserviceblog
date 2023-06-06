import React, { useState } from "react";
import { RegisterBg } from "../../assets";
import { Button, Gap, Input, Link } from "../../components";
import "./register.scss";
import { useHistory } from "react-router";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const [error, setError] = useState('')

  const changeUsername = (e) => {
    const value = e.target.value
    setUsername(value)
    setError('')
  }

  const changeEmail = (e) => {
    const value = e.target.value
    setEmail(value)
    setError('')
  }

  const changePassword = (e) => {
    const value = e.target.value
    setPassword(value)
    setError('')
  }

  const history = useHistory()

  const clickRegister = () => {
    const data = {
      username: username,
      email: email,
      password: password
    }

    axios.post('http://localhost:4000/v1/register', data)
      .then(result => {
        if (result) {
          if (result.data) {
            setUsername('')
            setEmail('')
            setPassword('')
            setAlert(result.data.message)
            setTimeout(() => {
              setAlert('')
            }, 5000)
          }
        }
      })
      .catch(e => {
        setError(e.response.data.message)
      })

  }

  return (
    <div className="main-page">
      <div className="left">
        <img src={RegisterBg} className="bg-image" alt="imageBg" />
      </div>
      <div className="right">
        <p className="title">Register</p>
        <div className="alert alert-primary">
          <p>{alert}</p>
        </div>
        <div className="alert alert-primary">
          <p>{error}</p>
        </div>
        <Input label="username" placeholder="Full Name" value={username} onChange={changeUsername} />
        <Gap height={18} />
        <Input label="Email" placeholder="Email" value={email} onChange={changeEmail} />
        <Gap height={18} />
        <Input label="Password" placeholder="Password" value={password} type="password" onChange={changePassword} />
        <Gap height={200} />
        <Button title="Register" onClick={(clickRegister)} />
        <Gap height={18} />
        <Link title="Kembali ke Login" onClick={() => history.push("/login")} />
      </div>
    </div>
  );
};

export default Register;
