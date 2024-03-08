"use server";
import { ApiResponseType, AppDataType, BrandDataType, SHASOptionType, TimestampFieldValue } from "./types";

interface ResponseType {
    title?: string;
    description?: string;
    appData?: AppDataType;
    brandData?: BrandDataType;
}

function timeStampToDate(fieldValue: TimestampFieldValue | Date): Date {
    if (fieldValue instanceof Date) return fieldValue;
    const { _seconds, _nanoseconds } = fieldValue;
    const milliseconds = _seconds * 1000 + _nanoseconds / 1000000;
    return new Date(milliseconds);
};

export default async function getData(options: SHASOptionType): Promise<ResponseType> {

    if (!options.appId || !options.appSecret) return {
        title: "Insufficient or invalid data has been provided.",
        description: "App id or secret is not found or invalid"
    };

    const apiEndPoint = "https://sh-authentication-system.vercel.app/api/get-info";

    const response = await fetch(apiEndPoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: options.appId,
            client_secret: options.appSecret
        }),
        cache: "no-cache"
    });


    const recieved = await response.json() as ApiResponseType;

    if (recieved.status == "error") return {
        title: "Server returned error",
        description: recieved.message
    }

    if (!recieved.data) return {
        title: "Unknown error",
        description: "",
    }

    recieved.data.appInfo.createdOn = timeStampToDate(recieved.data.appInfo.createdOn);
    if (recieved.data.appInfo.inactiveUntil) recieved.data.appInfo.inactiveUntil = timeStampToDate(recieved.data.appInfo.inactiveUntil);


    if (
        recieved.data.appInfo.status === "inactive" &&
        (!recieved.data.appInfo.inactiveUntil || recieved.data.appInfo.inactiveUntil > new Date())
    ) {
        return {
            title: "Application Deactivated by Administrator",
            description: recieved.data.appInfo.inactiveMessage,
            appData: recieved.data.appInfo,
            brandData: recieved.data.brandInfo,
        };
    }

    if (recieved.data.appInfo.status === "suspended") return {
        title: "Application Suspended",
        description: `Your application has been suspended by the ${recieved.data.brandInfo.name} control panel due to the detection of unusual activities or violations of our rules.`,
        appData: recieved.data.appInfo,
        brandData: recieved.data.brandInfo,
    }



    return {
        appData: recieved.data.appInfo,
        brandData: recieved.data.brandInfo,
    }

}