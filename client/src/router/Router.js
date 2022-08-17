import React from "react";
import { Route, Routes } from "react-router-dom";
import Notfound from "../pages/Notfound";
import Section1 from "../pages/home/Section1";

export default function Router() {
    return (
        <Routes>
            <Route path="*" element={<Notfound />} />
            <Route path="/" element={[<Section1 />]} />
        </Routes>
    );
}
