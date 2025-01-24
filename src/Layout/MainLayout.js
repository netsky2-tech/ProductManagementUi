import React from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";


const MainLayout = ({ children }) => {
    return (
    <div>
                    <Navbar />
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    {children}
                </main>
            </div>
        </div>
    </div>
    )
}

export { MainLayout }