"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ShowToast(_a) {
    var toastMessage = _a.toastMessage, toastAction = _a.toastAction;
    var router = useRouter();
    useEffect(function () {
        toast(toastMessage, {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }, []);
    return (React.createElement(ToastContainer, { position: "bottom-right", autoClose: false, newestOnTop: false, closeOnClick: false, rtl: false, pauseOnFocusLoss: true, draggable: false, theme: "light", onClick: function () {
            if (toastAction)
                router.push(toastAction);
        } }));
}
