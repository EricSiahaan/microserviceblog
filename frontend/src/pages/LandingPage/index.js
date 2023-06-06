import React, { useState } from "react";
import { RegisterBg } from "../../assets";
import { Button, Gap, Input, Link } from "../../components";
import "./landingPage.scss";
import { useHistory } from 'react-router-dom';


const LandingPage = () => {

  const history = useHistory()


  return (
    <div className="main-page">
      <div className="left">
        {/* <img src={RegisterBg} alt="imageBg" /> */}
      </div>
      <div className="right" >
        <Gap height={50} />
        <p className="title">Perspective. </p>
        <Gap height={30} />
        <Button className="btn-signIn" title="Sign in" onClick={() => history.push("/login")} />
        <Gap height={15} />
        <Button className="btn-signUp" title="Sign up" onClick={() => history.push("/register")} />
        <Gap height={5} />
        <center><p>OR</p></center>
        <Gap height={5} />
        <Button className="btn-signGmail" title="Sign Up With Google" />
        <Gap height={20} />
        {/* <Button title="Register" onClick={(clickRegister) => history.push("/login")} /> */}
        <Gap height={100} />
        <Link title="Kembali ke Login" onClick={() => history.push("/login")} />
      </div >
    </div >
  )
}

export default LandingPage;