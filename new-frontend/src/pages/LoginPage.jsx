import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = props => {
  const { isSignedIn } = props;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem('token') || isSignedIn) {
      props.setIsSignedIn(true);
      navigate('/');
    }
  }, [isSignedIn]);

  return (
    <div>
      Login Page
    </div>
  )
}

export default LoginPage;