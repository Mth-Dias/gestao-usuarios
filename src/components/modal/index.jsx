import React from "react";
import { ImCross } from "react-icons/im";

function ModalWindow(props) {
  return (
    <div className="flex flex-col px-4 md:px-0 items-center justify-center fixed inset-0 bg-black bg-opacity-60 ">
      <div className="bg-white rounded px-4 max-w-md w-full">
        <span className="flex my-4 justify-between items-center">
          <h1 className="text-2xl font-semibold">{props.title}</h1>
          <ImCross
            style={{ fontSize: "20px" }}
            className="cursor-pointer"
            onClick={() => {
              props.toggleModal("", false);
              if (props.setEditModalErrorMsg) {
                props.setEditModalErrorMsg();
              }
              if (props.setUserDetails) {
                props.setUserDetails([]);
              }
              if (props.setNewModalErrorMsg) {
                props.setNewModalErrorMsg();
              }
            }}
          />
        </span>
        <hr className="" />
        {props.children}
      </div>
    </div>
  );
}

export default ModalWindow;
