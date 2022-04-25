import React, { useState } from "react";
import axios from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

function BasicLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChangeForm = (event) => {
    // console.log("User sedang mengetik");
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // console.log("Submit Login");
      // console.log(form)

      // JALANKAN HTTP REQUEST DENGAN AXIOS
      const resultLogin = await axios.post("auth/login", form);
      // console.log(resultLogin);

      // PROSES GET USER DATA BY ID
      // const resultUser = axios.get(`user/${resultLogin.data.data.id}`)
      const resultUser = [
        {
          id: 1,
          name: "Bagus"
        }
      ];
      setIsError(false);
      setMessage(resultLogin.data.msg);
      localStorage.setItem("token", resultLogin.data.data.token);
      localStorage.setItem("refreshToken", resultLogin.data.data.refreshToken);

      // MASUKKAN DATA USER KE LOCAL STORAGE (NANTI DISIMPANNYA DI REDUX)
      localStorage.setItem("dataUser", JSON.stringify(resultUser[0]));

      navigate("/basic/home");

      // UNTUK GET DATA USER
      // const dataUser = JSON.parse(localStorage.getItem(dataUser));
    } catch (error) {
      console.log(error.response);
      setIsError(true);
      setMessage(error.response.data.msg);
      setForm({
        email: "",
        password: ""
      });
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    console.log("Reset Form");
  };

  return (
    <>
      <div className="text-center container">
        <h1>Login Page</h1>
        {!message ? null : isError ? (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        ) : (
          <div className="alert alert-primary" role="alert">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <input
            type="email"
            placeholder="Input email"
            name="email"
            value={form.email}
            onChange={handleChangeForm}
          />
          <br />
          <input
            type="password"
            placeholder="Input Password"
            name="password"
            value={form.password}
            onChange={handleChangeForm}
          />
          <br />
          <button className="btn btn-outline-primary" type="reset">
            Reset
          </button>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
      ;
    </>
  );
}

export default BasicLogin;
