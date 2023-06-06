import React, { useState, Fragment } from 'react'
import { LoginBg } from '../../assets';
import { Button, Gap, Input, Link } from '../../components';
import { useHistory, Redirect } from 'react-router-dom';
import './login.scss'
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('')

  const onChangeUsername = (e) => {
    const value = e.target.value
    setUsername(value)
    setError('')
  }

  const onChangePassword = (e) => {
    const value = e.target.value
    setPassword(value);
    setError('')
  }

  const submitLogin = () => {
    const data = {
      username: username,
      password: password
    }
    axios.post('http://localhost:4000/v1/login', data)
      .then(result => {
        if (result) {
          localStorage.setItem('token', result.data.token)
          setRedirect(true)
        }
      })
      .catch(e => {
        setError(e.response.data.message)
      })
  }

  const history = useHistory()
  return (
    <Fragment>
      {
        redirect && (
          <Redirect to="/dashboard" />
        )
      }
      <div className="main-page">
        <div className="left">
          <img src={LoginBg} className="bg-image" alt='imageBg' />
        </div>
        <div className="right">
          <p className='title'>Login</p>


          <div>
            <p>{error}</p>
          </div>


          <Input label="Username" placeholder="Username" value={username} onChange={onChangeUsername} />
          <Gap height={18} />
          <Input label="Password" placeholder="Password" type="password" value={password} onChange={onChangePassword} />
          <Gap height={200} />
          <Button title="Login" onClick={submitLogin} />
          <Link title="Lupa Password? Klik Disini" onClick={() => history.push('/forgotpassword')} />
          <Gap height={100} />

          <Link title="Belum Punya Akun, Silahkan Daftar" onClick={() => history.push('/register')} />

        </div>
      </div>
    </Fragment>
  )
}

export default Login 