import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./routes/ErrorPage"
import PackageDetails from './routes/PackageDetails';
import AddPackage from './routes/AddPackage';
import { AuthProvider } from './context/AuthProvider';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "details/:lockerId",
        element: <PackageDetails />
    },
    {
        path: "new/:lockerId",
        element: <AddPackage />
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);
