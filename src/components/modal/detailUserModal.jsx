import React from "react";
import ModalWindow from ".";

function DetailUserModal(props) {
  const createdAt = props.userDetails.created_at;
  const updatedAt = props.userDetails.updated_at;

  const valueStyle = "font-bold text-lg";

  return (
    <ModalWindow
      title="Detalhes"
      setUserDetails={props.setUserDetails}
      toggleModal={props.toggleModal}
    >
      <ul className="my-4">
        <li>
          Nome: <span className={valueStyle}>{props.userDetails.name}</span>
        </li>
        <li>
          E-mail: <span className={valueStyle}>{props.userDetails.email}</span>
        </li>
        <li>
          Usuario criado em:{" "}
          <span className={valueStyle}>
            {createdAt ? createdAt.slice(0, 10) : ""}
          </span>
        </li>
        <li>
          Ultima atualização:{" "}
          <span className={valueStyle}>
            {updatedAt ? updatedAt.slice(0, 10) : ""}
          </span>
        </li>
      </ul>
    </ModalWindow>
  );
}

export default DetailUserModal;
