import React from "react";
import AuthForm from "../components/AuthForm";

function LoginPage() {
  const handleLogin = (credentials) => {
    console.log("Login:", credentials);
    // TODO: Call backend login API
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}

export default LoginPage;
