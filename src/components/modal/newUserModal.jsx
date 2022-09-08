import React from "react";
import ModalWindow from ".";
import LoadingEffect from "../loading";
import InputErrorMsg from "../errorMsg";
import ConfirmButton from "../buttons/confirmButton";

function NewUserModal(props) {
  const inputStyle =
    "w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const inputSpace = "my-2";

  const errorMsg = props.newModalErrorMsg;

  return (
    <ModalWindow
      title="Criar novo usuário"
      toggleModal={props.toggleModal}
      setNewModalErrorMsg={props.setNewModalErrorMsg}
    >
      <form
        autoComplete="off"
        className="flex flex-col"
        onSubmit={props.handleNewUser}
      >
        <div className={inputSpace}>
          <label htmlFor="name">Nome:</label>
          <input
            required
            placeholder="Insira o nome..."
            className={inputStyle}
            id="name"
            type="text"
            onChange={(e) => props.setName(e.target.value)}
          ></input>
          <InputErrorMsg>{errorMsg ? errorMsg.name : ""}</InputErrorMsg>
        </div>
        <div className={inputSpace}>
          <label htmlFor="email">Email:</label>
          <input
            required
            placeholder="Insira o e-mail..."
            className={inputStyle}
            id="email"
            type="email"
            onChange={(e) => props.setEmail(e.target.value)}
          ></input>
          <InputErrorMsg>{errorMsg ? errorMsg.email : ""}</InputErrorMsg>
        </div>
        <div className={inputSpace}>
          <label htmlFor="Password">Digite a senha:</label>
          <input
            required
            placeholder="Insira a senha..."
            className={inputStyle}
            id="Password"
            type="password"
            onChange={(e) => props.setPassword(e.target.value)}
          ></input>
        </div>
        <div className={inputSpace}>
          <label htmlFor="PasswordConfirm">Confirme a senha:</label>
          <input
            required
            placeholder="Confirme a senha...S"
            className={inputStyle}
            id="PasswordConfirm"
            type="password"
            onChange={(e) => props.setPasswordConfirm(e.target.value)}
          ></input>
          <InputErrorMsg>{errorMsg ? errorMsg.password[0] : ""}</InputErrorMsg>
        </div>

        <span className="flex justify-center">
          {props.toggleLoading ? <LoadingEffect /> : <></>}
        </span>

        <ConfirmButton type="submit" value="Enviar" />
      </form>
    </ModalWindow>
  );
}

export default NewUserModal;
