import React, { useState } from "react";

function AuthForm({ type, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = type === "login";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-100 dark:tw-bg-black">
      <form
        onSubmit={handleSubmit}
        className="tw-bg-white dark:tw-bg-gray-900 tw-p-8 tw-rounded-xl tw-shadow-xl tw-w-full tw-max-w-md"
      >
        <h2 className="tw-text-2xl tw-font-bold tw-text-center tw-mb-6">
          {isLogin ? "Login to ExaMind" : "Create your ExaMind account"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="tw-w-full tw-mb-4 tw-p-3 tw-rounded tw-border tw-border-gray-300 dark:tw-border-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="tw-w-full tw-mb-6 tw-p-3 tw-rounded tw-border tw-border-gray-300 dark:tw-border-gray-700"
        />

        <button
          type="submit"
          className="tw-w-full tw-bg-blue-600 tw-text-white tw-p-3 tw-rounded hover:tw-bg-blue-700"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
