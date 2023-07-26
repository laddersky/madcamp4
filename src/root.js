import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Main_page from "./Main_page";
import { UserDataProvider } from "./UserDataContext";

const Root = () => {
  return (
    <UserDataProvider>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/main_page" element={<Main_page />} />
        </Routes>
      </BrowserRouter>
    </UserDataProvider>
      
  );
};

export default Root;
