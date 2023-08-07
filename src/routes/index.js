import * as React from "react";
import { Routes, Route, } from "react-router-dom";
import Home from "../pages/Home";


const RouteComponent = () => {

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <React.Suspense fallback={<>....</>}>
                        <Home />
                    </React.Suspense>
                }
            />

        </Routes>
    );
};

export default RouteComponent;
