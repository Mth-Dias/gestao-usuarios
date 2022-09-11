import { useEffect } from "react";
import instance from "./axios/global";
import AppRoutes from "./routes";
import { useDispatch } from "react-redux";
import { userData } from "./store/userData";
import { isLogged } from "./store/isLogged";

function App() {
  
  const dispatch = useDispatch();

  const authLoggin = (value) => {
    if (value) {
      dispatch(isLogged());
    }
  };

  useEffect(() => {
    instance
      .get("/session_details", {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((res) => {
        dispatch(userData(res.data));
        authLoggin(res.data);
      })
      .catch((err) => {
        console.log(err)
        localStorage.removeItem("Authorization")
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
