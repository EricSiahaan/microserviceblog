import React, { useState } from 'react'
import { LoginBg } from '../../assets';
import { Button, Gap, Input, Link } from '../../components';
import { useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [alert, setAlert] = useState('')

  const changeEmail = (e) => {
    setEmail(e.target.value)
    setError('')
  }

  const send = () => {
    if (!email) {
      setError('Email Wajib Di Masukan')
    } else {
      axios.put('http://localhost:4000/v1/forgotpassword', { email: email })
        .then(res => {
          setEmail('')
          setAlert('Silahkan Cek Email Anda')
          setTimeout(() => {
            setAlert('')
          }, 3000)
        })
    }
  }

  const history = useHistory()
  return (
    <div className="main-page">
      <div className="left">
        <img src={LoginBg} className="bg-image" alt='imageBg' />
      </div>
      <div className="right">
        <p className='title'>Reset Password</p>

        <div>
          <p>{alert}</p>
        </div>
        <div>
          <p>{error}</p>
        </div>

        <Input label="Email" placeholder="Masukan Email" value={email} onChange={changeEmail} />
        <Gap height={15} />
        <Button title="Send" onClick={send} />
        <Gap height={18} />
        <Link title="kembali ke Home" onClick={() => history.push('/')} />

      </div>
    </div>
  )
}

export default ForgotPassword 