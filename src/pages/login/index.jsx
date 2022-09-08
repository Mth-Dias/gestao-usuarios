import React, { useState } from "react";
import instance from "../../axios/global";
import LoadingEffect from "../../components/loading";

import logoWhite from "../../images/logo_white.png";
import InputErrorMsg from "../../components/errorMsg";

function LoginPage() {
  const inputStyle =
    "w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const btnStyle =
    "my-4 w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 pt-1 pb-2";

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [errorMsg, setErrorMsg] = useState("");

  const [toggleLoading, setToggleLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setToggleLoading(true);

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    instance
      .post("/login", formData)
      .then((res) => {
        localStorage.setItem(
          "Authorization",
          `Bearer ${res.data.token.plainTextToken}`
        );
        window.location.reload();
        setToggleLoading(false);
      })

      .catch((err) => {
        setErrorMsg(err.response.data);
        console.log(err.response.data);
        setToggleLoading(false);
      });
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen bg-gray-800 p-10">
      <img src={logoWhite} width="100px" alt="Logo" />
      <div className="flex items-center flex-col border-2 rounded mt-8 border-gray-300 bg-white w-full max-w-sm">
        <h1 className="my-4 text-2xl">Entre com sua conta</h1>
        <form className="flex flex-col w-full px-7" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>E-mail</label>
            <input
              required
              className={inputStyle}
              type="email"
              name="email"
              placeholder="Insira seu e-mail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            {errorMsg.errors ? (
              errorMsg.errors.email ? (
                <InputErrorMsg>{errorMsg.errors.email}</InputErrorMsg>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <div className="mb-2">
            <label>Senha</label>
            <input
              required
              className={inputStyle}
              type="password"
              name="password"
              placeholder="Insira sua senha"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            {errorMsg.errors ? (
              errorMsg.errors.password ? (
                <InputErrorMsg>{errorMsg.errors.password[0]}</InputErrorMsg>
              ) : (
                ""
              )
            ) : errorMsg ? (
              errorMsg.message ? (
                <InputErrorMsg>{errorMsg.message}</InputErrorMsg>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <span className="flex justify-center mt-2">
            {toggleLoading ? <LoadingEffect /> : <></>}
          </span>
          <button className={btnStyle} type="submit">
            <span>Acessar</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
