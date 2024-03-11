"use client";
import { useEffect, useState } from "react";
import { AppDataType, BrandDataType } from "./types";
import getData from "./getData";


function getAppData() {
    const [appData, setAppData] = useState<AppDataType | null>();
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        getData()
        .then((response )=> {
            if (response.title || response.description) {
                setStatus("error");
                setAppData(null);
                return;
            }
            setStatus("success")
            setAppData(response.appData);
        })
    }, []);

    return { appData, status };
};

function getBrandData() {
    const [brandData, setBrandData] = useState<BrandDataType | null>();
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        getData()
        .then((response )=> {
            if (response.title || response.description) {
                setStatus("error");
                setBrandData(null);
                return;
            }
            setStatus("success");
            setBrandData(response.brandData);
            
        })
    }, []);

    return { brandData, status };
};

export { getAppData, getBrandData };