export interface TimestampFieldValue {
    _seconds: number;
    _nanoseconds: number;
}

export interface SHASOptionType {
    appId?: string;
    appSecret?: string;
}

export interface AppDataType {
    appIcon: string;
    appName: string;
    author: string;
    createdOn: Date | TimestampFieldValue;
    id: string;
    version: string;
    website: string;
    privacyPolicy: string;
    contact: string;
    inactiveMessage: string;
    status: "active" | "suspended" | "inactive";
    inactiveUntil: Date | null;
    pageAlertMessage: string;
    pageAlertAction: string;
    description: string;
    appType: "web application"
    | "android application"
    | "ios application"
    | "native application";
}

export interface BrandDataType {
    name: string;
    email: string;
    website: string;
    privacyPolicy: string;
    icon: string;
    copyrightText: string;
    socialPlatform: string[];
    category: string;
    type: string;
    help: string;
}

export interface ApiResponseType {
    status: "success" | "error";
    message: string;
    data?: {
        appInfo: AppDataType;
        brandInfo: BrandDataType;
    };
}