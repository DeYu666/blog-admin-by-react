import React, {useState} from "react";

import {Route, Routes} from "react-router-dom";
import Login from "../login/login";
import Home from "../home/home";

import "./index.css"





export default function App() {

    return (

        <Routes>
            <Route exact={true} path={"/login"} element={<Login/>} />
            <Route path={"/backStage/*"} element={<Home/>} />
            <Route exact={true} path={"/"} element={<Login/>} />
        </Routes>
        //
        // <Switch>
        //     <Route path='/' component={Login}/>
        //     {token !== "" ? (
        //         <>
        //             <Route path="/71510/" component={Home}/>
        //         </>
        //
        //     ) : (
        //         <></>
        //     )}
        // </Switch>
    );
}



