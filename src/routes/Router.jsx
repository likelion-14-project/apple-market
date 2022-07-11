import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Splash from "../pages/Splash";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Splash />} />
                {/* <Route path="/home" element={<Home/>} />
      <Route path="/postuploadpage" element={<PostUploadPage/>} />
      <Route path="/joinpage" element={<JoinPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/search' element={<Search />} />
      <Route path='/test' element={<Test />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
