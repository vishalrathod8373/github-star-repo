import * as React from "react";
import { Routes, Route, } from "react-router-dom";

const UserList = React.lazy(() => import("../pages/users"));
const CreateUser = React.lazy(() => import("../pages/createUser"));

const RouteComponent = () => {

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <React.Suspense fallback={<>....</>}>
                        <UserList />
                    </React.Suspense>
                }
            />
            <Route
                path="/createUser"
                element={
                    <React.Suspense fallback={<>....</>}>
                        <CreateUser />
                    </React.Suspense>
                }
            />
        </Routes>
    );
};

export default RouteComponent;
