import React from "react";
import { Link, Form, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    const user = {
      email: email,
      password: password,
    };
    axios.post("http://localhost:8080/api/login", user).then((response) => {
      console.log(response);
      navigate("/", { state: response.data });
    });
    event.preventDefault();
  };

  return (
    <div className="bg-slate-800 h-screen w-full flex items-center justify-center">
      <Form
        action="/login"
        method="post"
        onSubmit={handleSubmit}
        className="h-1/2 w-1/3 bg-white rounded-2xl border-[0.5px] flex-col"
      >
        <span className="flex h-1/4 w-full justify-center items-center">
          <p className="text-3xl text-center">Login</p>
        </span>
        <div className="h-1/3 flex-col justify-center items-center pt-10">
          <span className="relative flex items-center justify-center mb-4">
            <label className="absolute text-[10px] bottom-12">
              {location.state}
            </label>
            <label className="absolute text-[10px] bottom-6">Email</label>
            <input className="border rounded" onChange={handleEmail} />
          </span>
          <span className="relative flex items-center justify-center">
            <label className="absolute text-[10px] bottom-6">Password</label>
            <input className="border rounded" onChange={handlePassword} />
          </span>
        </div>
        <span className="flex h-1/4 justify-center gap-8 mt-8">
          <button type="submit" className="w-1/4 h-1/3 border rounded">
            sign in
          </button>
          <Link
            to="/register"
            className="w-1/4 h-1/3 border rounded items-center justify-center flex"
          >
            register
          </Link>
        </span>
      </Form>
    </div>
  );
};

export default LoginPage;
