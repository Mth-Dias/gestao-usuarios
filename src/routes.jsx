import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "./pages/login";
import HomePage from "./pages/home";

function AppRoutes () {

    const data = useSelector((state)=>{
        return state.authLogin.isAuth
    })

    return(
        <BrowserRouter>
        {data ? 
            <Routes>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/login" element={<Navigate to='/home'/>}/>
                <Route path="/" element={<Navigate to='/home'/>}/>
            </Routes>
            :
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<Navigate to='/login'/>}/>
                <Route path="/home" element={<Navigate to='/login'/>}/>
            </Routes>
            }
        </BrowserRouter>
    )
}


export default (AppRoutes)