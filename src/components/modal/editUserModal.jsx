import React from "react";
import ModalWindow from ".";
import LoadingEffect from "../loading";
import InputErrorMsg from "../errorMsg";

import ConfirmButton from "../buttons/confirmButton";

function EditUserModal(props) {
  const inputStyle =
    "w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const inputSpace = "my-2";

  const errorMsg = props.editModalErrorMsg;

  const name = props.userDetails.name;

  return (
    <ModalWindow
      title={`Atualizar senha de ${name ? name : ""}`}
      toggleModal={props.toggleModal}
      setEditModalErrorMsg={props.setEditModalErrorMsg}
      setUserDetails={props.setUserDetails}
    >
      <form className="flex flex-col" onSubmit={props.handleEdit}>
        <div className={inputSpace}>
          <label htmlFor="currentPassword">Senha atual:</label>
          <input
            required
            autoComplete="off"
            className={inputStyle}
            placeholder="Insira a senha atual..."
            id="currentPassword"
            type="password"
            onChange={(e) => props.setCurrentPassword(e.target.value)}
          ></input>
          {errorMsg?.message === "A senha atual do usuário não confere!" ? (
            <InputErrorMsg>{errorMsg.message}</InputErrorMsg>
          ) : (
            <></>
          )}
        </div>
        <div className={inputSpace}>
          <label htmlFor="newPassword">Nova senha:</label>
          <input
            required
            className={inputStyle}
            id="newPassword"
            placeholder="Insira a nova senha..."
            type="password"
            onChange={(e) => props.setNewPassword(e.target.value)}
          ></input>
        </div>
        <div className={inputSpace}>
          <label htmlFor="newPasswordConfirm">Confirme a nova senha:</label>
          <input
            required
            className={inputStyle}
            id="newPasswordConfirm"
            placeholder="Confirme a nova senha..."
            type="password"
            onChange={(e) => props.setNewPasswordConfirm(e.target.value)}
          ></input>
          {errorMsg?.errors ? (
            <InputErrorMsg>{errorMsg.errors.new_password[0]}</InputErrorMsg>
          ) : (
            <></>
          )}
        </div>
        <span className="flex justify-center">
          {props.toggleLoading ? <LoadingEffect /> : <></>}
        </span>
        <ConfirmButton type="submit" value="Enviar" />
      </form>
    </ModalWindow>
  );
}

export default EditUserModal;
