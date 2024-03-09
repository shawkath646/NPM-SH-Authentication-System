"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShowToast({ toastMessage, toastAction }: { toastMessage: string; toastAction?: string }) {

    const toastBox = (
        <div className="toast-body-shas">
            <p>{toastMessage}</p>
            {toastAction && (
                <Link href={toastAction} className="toast-action-button-shas">Details...</Link>
            )}
        </div>
    );

    useEffect(() => {
        toast(toastBox, {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            rtl: false,
            theme: "light",
            transition: Bounce,
            className: "toast-shas",
        });
    }, []);

    return (
        <ToastContainer className="toast-container-shas" />
    );

}