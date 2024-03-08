"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShowToast({ toastMessage, toastAction }: { toastMessage: string; toastAction?: string }) {

    const router = useRouter();

    useEffect(() => {
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

    return (
        <ToastContainer
            position="bottom-right"
            autoClose={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            theme="light"
            onClick={() => {
                if (toastAction) router.push(toastAction);
            }}
        />
    );

}