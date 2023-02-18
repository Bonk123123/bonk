import React from "react";
import { Form, useNavigate, Link } from "react-router-dom";
import InputMask from "react-input-mask";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  const mask = (number) => {};

  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [thname, setThname] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone_number, setPhone_number] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event) => {
    const user = {
      name: name,
      surname: surname,
      thname: thname,
      address: address,
      phone_number: phone_number,
      email: email,
      password: password,
    };

    axios
      .post(`http://localhost:8080/api/register`, user)
      .then((response) => navigate("/", { state: response.data }));

    event.preventDefault();
  };

  return (
    <div className="bg-slate-800 h-screen w-full flex items-center justify-center">
      <Form
        className="bg-white h-[80%] w-1/3 rounded flex-col items-center justify-center"
        action={`/user/director`}
        method="put"
        onSubmit={handleSubmit}
      >
        <span className="flex h-1/6 w-full justify-center items-center">
          <p className="text-3xl text-center">Register</p>
        </span>
        <div className="h-4/6 flex-col justify-center items-center pt-10">
          <span className="relative flex items-center justify-center mb-4">
            <label className="absolute text-[10px] bottom-6">Name</label>
            <input
              value={name}
              className="border rounded"
              onChange={(e) => setName(e.target.value)}
            />
          </span>
          <span className="relative flex items-center justify-center mb-4">
            <label className="absolute text-[10px] bottom-6">Surname</label>
            <input
              value={surname}
              className="border rounded"
              onChange={(e) => setSurname(e.target.value)}
            />
          </span>
          <span className="relative flex items-center justify-center mb-4">
            <label className="absolute text-[10px] bottom-6">Thname</label>
            <input
              value={thname}
              className="border rounded"
              onChange={(e) => setThname(e.target.value)}
            />
          </span>
          <span className="relative flex items-center justify-center mb-4">
            <label className="absolute text-[10px] bottom-6">Address</label>
            <input
              value={address}
              className="border rounded"
              onChange={(e) => setAddress(e.target.value)}
            />
          </span>
          <span className="relative flex items-center justify-center mb-4">
            <label className="absolute text-[10px] bottom-6">
              Phone number
            </label>

            <InputMask
              mask="+7999-999-99-99"
              maskChar={" "}
              value={phone_number}
              className="border rounded"
              onChange={(e) => setPhone_number(e.target.value)}
            ></InputMask>
          </span>
          <span className="relative flex items-center justify-center mb-4">
            <label className="absolute text-[10px] bottom-6">Email</label>
            <input
              value={email}
              className="border rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
          <span className="relative flex items-center justify-center mb-4">
            <label className="absolute text-[10px] bottom-6">Password</label>
            <input
              value={password}
              className="border rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </span>
        </div>
        <span className="flex justify-center gap-3">
          <button
            type="submit"
            className="w-1/3 h-1/6 whitespace-nowrap border rounded text-center"
          >
            Create User
          </button>
          <Link
            to={"/login"}
            className="w-1/3 h-1/6 border rounded text-center"
          >
            login
          </Link>
        </span>
      </Form>
    </div>
  );
};

export default RegisterPage;
