"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShowToast({ toastReminder = 86400, toastMessage, toastAction }: { toastReminder?: number; toastMessage: string; toastAction?: string }) {

    const toastBox = (
        <div className="toast-body-shas">
            <p>{toastMessage}</p>
            {toastAction && (
                <Link href={toastAction} className="toast-action-button-shas">Details...</Link>
            )}
        </div>
    );

    useEffect(() => {

        const now = new Date();

        const gettedItem = localStorage.getItem("shas-toast-message");
        const validate = localStorage.getItem("shas-toast-validate");

        const validateDate = validate ? new Date(validate) : now;
    
        if (gettedItem !== toastMessage || validateDate <= now) {
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
                onClose: () => {
                    const next24Hours = new Date(now.getTime() + (toastReminder * 1000)).toLocaleString();
                    localStorage.setItem("shas-toast-message", toastMessage)
                    localStorage.setItem("shas-toast-validate", next24Hours);
                }
            });
        }
    }, []);

    return (
        <ToastContainer className="toast-container-shas" />
    );

}