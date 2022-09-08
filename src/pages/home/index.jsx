import React, { useEffect, useState } from "react";

import instance from "../../axios/global";

import Header from "../../components/header";
import DetailUserModal from "../../components/modal/detailUserModal";
import EditUserModal from "../../components/modal/editUserModal";
import NewUserModal from "../../components/modal/newUserModal";

import { AiOutlinePlus } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";
import { CgKey } from "react-icons/cg";
import { CgTrash } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

function HomePage() {
  const cellStyle =
    "whitespace-nowrap px-4 p-3 border-2 border-gray-300 text-sm text-gray-700";
  const actionStyle =
    "whitespace-nowrap px-4 p-3 cursor-pointer text-center border-2 border-gray-300 text-sm text-gray-700";
  const btnStyle =
    "relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-gray-600 to-blue-500 group-hover:from-gray-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800";
  const btnSpanStyle =
    "text-lg w-auto flex items-center relative px-2.5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0";

  const [toggleLoading, setToggleLoading] = useState(false);

  //Lista de usuários
  const [tableData, setTableData] = useState([]);

  //Dados para modal de detalhes
  const [userDetails, setUserDetails] = useState([]);

  //Controladores dos modais
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalSelected, setModalSelected] = useState();

  //Dados para criação de usuário
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [newModalErrorMsg, setNewModalErrorMsg] = useState();

  //Dados para alteração de senha
  const [userId, setUserId] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPasswordConfirm, setNewPasswordConfirm] = useState();
  const [editModalErrorMsg, setEditModalErrorMsg] = useState();

  //Dados para paginação
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadData(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = (e) => {
    instance.get(`/users/?page=${e}`).then((res) => {
      setTableData(res.data.payload.data);
      setTotalPages(res.data.payload.last_page);
    });
  };

  const toggleModal = (modal, value) => {
    setmodalOpen(value);
    setModalSelected(modal);
  };

  const handleNewUser = (e) => {
    e.preventDefault();

    setToggleLoading(true);

    const formData = new FormData();

    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirm);

    instance
      .post("/users", formData)
      .then((res) => {
        console.log(res.data);
        loadData(currentPage);
        setmodalOpen(false);
        setToggleLoading(false);
        setNewModalErrorMsg();
        window.alert("Usuário criado com sucesso!");
      })
      .catch((err) => {
        setNewModalErrorMsg(err.response.data.errors);
        setToggleLoading(false);
      });
  };

  const handleDetails = (value) => {
    instance.get(`/users/${value.id}`).then((res) => {
      setUserDetails(res.data.user);
    });
  };

  const handleEdit = (value) => {
    value.preventDefault();

    setToggleLoading(true);

    const editData = {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirm,
    };

    instance
      .patch(`/users/${userId}`, editData)
      .then((res) => {
        console.log(res.data);
        setToggleLoading(false);
        setmodalOpen(false);
        setEditModalErrorMsg();
        window.alert("Senha atualizada com sucesso!");
      })
      .catch((err) => {
        setEditModalErrorMsg(err.response.data);
        console.log(err.response.data);
        setToggleLoading(false);
      });
  };

  const handleDelete = (value) => {
    if (window.confirm(`Confirma remoção do usuário: ${value.name}?`)) {
      instance
        .delete(`/users/${value.id}`, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then(() => {
          loadData(currentPage);
        });
    }
  };

  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <div className="px-10">
        <span className="flex flex-col items-center justify-between mb-4 mt-10 md:flex-row">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Lista de usuários</h1>
          <button
            className={btnStyle}
            onClick={() => {
              toggleModal("new", true);
            }}
          >
            <span className={btnSpanStyle}>
              <AiOutlinePlus
                style={{ fontSize: "25px", paddingRight: "5px" }}
              />
              Adicionar Novo
            </span>
          </button>
        </span>
        <div className="w-full overflow-auto rounded shadow">
          <table className="border-2 border-gray-300 w-full">
            <thead className="align-center bg-gray-200 border-b-2 border-gray-300">
              <tr>
                <th className="w-80 text-start px-4 p-2 border-2 border-gray-300">Nome</th>
                <th className="text-start px-4 p-2 border-2 border-gray-300">E-mail</th>
                <th className="w-24"></th>
                <th className="w-24">Ações</th>
                <th className="w-24"></th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((value) => (
                <tr key={value.id} className="bg-white hover:bg-gray-100">
                  <td className={cellStyle}>{value.name}</td>
                  <td className={cellStyle}>{value.email}</td>
                  <td
                    className={actionStyle}
                    onClick={() => {
                      toggleModal("details", true);
                      handleDetails(value);
                    }}
                  >
                    <button className="inline-flex items-center">
                      <CgDetailsMore
                        style={{ marginRight: "4px", fontSize: "20px" }}
                      />
                      Detalhes
                    </button>
                  </td>
                  <td
                    className={actionStyle}
                    onClick={() => {
                      toggleModal("update", true);
                      handleDetails(value);
                      setUserId(value.id);
                    }}
                  >
                    <button className="inline-flex items-center">
                      <CgKey style={{ marginRight: "4px", fontSize: "20px" }} />
                      Alterar Senha
                    </button>
                  </td>
                  <td
                    className={actionStyle}
                    onClick={() => handleDelete(value)}
                  >
                    <button className="inline-flex items-center">
                      <CgTrash
                        style={{ marginRight: "4px", fontSize: "20px" }}
                      />
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <span className="flex justify-center items-center">
          {currentPage > 1 ? (
            <button
              className="m-2"
              onClick={() => {
                if (currentPage > 1) {
                  loadData(currentPage - 1);
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              <IoIosArrowBack style={{ fontSize: "35px" }} />
            </button>
          ) : (
            <IoIosArrowBack
              style={{ fontSize: "35px", color: "gray", margin: "8px" }}
            />
          )}

          <span className="text-xl">
            {currentPage > 1 ? "... " : ""}
            {currentPage}
            {currentPage < totalPages ? " ..." : ""}
          </span>

          {currentPage < totalPages ? (
            <button
              className="m-2"
              onClick={() => {
                if (currentPage < totalPages) {
                  loadData(currentPage + 1);
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              <IoIosArrowForward style={{ fontSize: "35px" }} />
            </button>
          ) : (
            <IoIosArrowForward
              style={{ fontSize: "35px", color: "gray", margin: "8px" }}
            />
          )}
        </span>
      </div>
      <div>
        {modalOpen ? (
          modalSelected === "update" ? (
            <EditUserModal
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              setEditModalErrorMsg={setEditModalErrorMsg}
              editModalErrorMsg={editModalErrorMsg}
              toggleLoading={toggleLoading}
              handleEdit={handleEdit}
              toggleModal={toggleModal}
              setCurrentPassword={setCurrentPassword}
              setNewPassword={setNewPassword}
              setNewPasswordConfirm={setNewPasswordConfirm}
            />
          ) : modalSelected === "details" ? (
            <DetailUserModal
              toggleModal={toggleModal}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
            />
          ) : modalSelected === "new" ? (
            <NewUserModal
              toggleLoading={toggleLoading}
              setNewModalErrorMsg={setNewModalErrorMsg}
              newModalErrorMsg={newModalErrorMsg}
              handleNewUser={handleNewUser}
              toggleModal={toggleModal}
              setEmail={setEmail}
              setPassword={setPassword}
              setPasswordConfirm={setPasswordConfirm}
              setName={setName}
            />
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default HomePage;
