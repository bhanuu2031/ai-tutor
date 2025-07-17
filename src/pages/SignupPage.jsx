import React from "react";
import AuthForm from "../components/AuthForm";

function SignupPage() {
  const handleSignup = (credentials) => {
    console.log("Signup:", credentials);
    // TODO: Call backend signup API
  };

  return <AuthForm type="signup" onSubmit={handleSignup} />;
}

export default SignupPage;
