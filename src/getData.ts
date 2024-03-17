"use server";
import cache from "./inMemoryCache";
import { ApiResponseType, ResponseType, SHASOptionType, TimestampFieldValue } from "./types";

function timeStampToDate(fieldValue: TimestampFieldValue | Date): Date {
    if (fieldValue instanceof Date) return fieldValue;
    const { _seconds, _nanoseconds } = fieldValue;
    const milliseconds = _seconds * 1000 + _nanoseconds / 1000000;
    return new Date(milliseconds);
};


async function getData(options?: SHASOptionType): Promise<ResponseType> {

    if (options) cache.setValue(options);
    else options = cache.getValue() as SHASOptionType;

    if (!options.appId || !options.appSecret) return {
        title: "Insufficient or invalid data has been provided.",
        description: "App id or secret is not found or invalid"
    };

    const apiEndPoint = "https://sh-authentication-system.vercel.app/api/get-info";

    const response = await fetch(apiEndPoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${options.appId}:${options.appSecret}`).toString('base64')}`
        },
        cache: options.cache,
    });


    const recieved = await response.json() as ApiResponseType;

    if (recieved.status == "error") return {
        title: "Server returned with error",
        description: recieved.message
    }

    if (!recieved.data) return {
        title: "Failed to fetch data",
        description: "Server returned with success but data is null",
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
        description: `Your application has been suspended by the ${recieved.data.brandInfo.name || "CloudBurst Lab"} control panel due to the detection of unusual activities or violations of our rules.`,
        appData: recieved.data.appInfo,
        brandData: recieved.data.brandInfo,
    }

    return {
        appData: recieved.data.appInfo,
        brandData: recieved.data.brandInfo,
    }
};

export default getData;