"use server";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Profile } from "next-auth";
import type { OIDCConfig } from "@auth/core/providers";
import ShowToast from "./ShowToast";
import "./styles.css";

interface TimestampFieldValue {
  _seconds: number;
  _nanoseconds: number;
}

interface SHASOptionType {
  appId?: string;
  appSecret?: string;
}

interface AppDataType {
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

interface BrandDataType {
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

interface ApiResponseType {
  status: "success" | "error";
  message: string;
  data?: {
    appInfo: AppDataType;
    brandInfo: BrandDataType;
  };
}

interface ResponseType {
  title?: string;
  description?: string;
  appData?: AppDataType;
  brandData?: BrandDataType;
}

function formatDate(date: Date): string {
  const options = { day: '2-digit' as const, month: 'long' as const, year: 'numeric' as const };
  return date.toLocaleDateString('en-US', options);
};

function timeStampToDate(fieldValue: TimestampFieldValue | Date): Date {
  if (fieldValue instanceof Date) return fieldValue;
  const { _seconds, _nanoseconds } = fieldValue;
  const milliseconds = _seconds * 1000 + _nanoseconds / 1000000;
  return new Date(milliseconds);
};

async function getData(options: SHASOptionType): Promise<ResponseType> {

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
};

async function SHAS(options: SHASOptionType = {}) {

  if (!options.appId) options.appId = process.env.STOCK_APP_ID;
  if (!options.appSecret) options.appSecret = process.env.STOCK_APP_SECRET;

  const { appData, brandData, title, description } = await getData(options);

  const CloudBurstLab = (params: Partial<OIDCConfig<Profile>> = {}): OIDCConfig<Profile> => {
    const {
      id = "cloudburst-lab",
      name = "CloudBurst Lab",
      type = "oidc",
      issuer = "https://sh-authentication-system.vercel.app/api/oauth",
      clientId = options.appId,
      clientSecret = options.appSecret,
      checks = ["pkce", "state", "nonce"],
      authorization = { params: { scope: 'openid profile email' } }
    } = params;

    return {
      id,
      name,
      type,
      issuer,
      clientId,
      clientSecret,
      checks,
      authorization,
      style: {
        bg: "#fff",
        logo: "./cloudburst_lab.png",
        text: "#000",
      }
    };
  };

  const ContentWrapper = ({ children }: { children: React.ReactNode }) => (title || description) ? (
    <main className="main-shas">
      <div>
        <div className="wave-shas"></div>
        <div className="wave-shas"></div>
        <div className="wave-shas"></div>
      </div>
      <div className="container-shas">
        <section className="flex-n-center-shas message-section-shas">
          <div className="message-box-shas">
            <h1 className="title-shas">{title}</h1>
            <p className="description-shas">{description}</p>
            {(appData?.status === "inactive" && appData.inactiveUntil) && (
              <p className="inactive-until-shas">Inactive until: {formatDate(appData.inactiveUntil)}</p>
            )}
            <Link href={`mailto:${appData?.contact || brandData?.email || "shcloudburstlabs@gmail.com"}`} className="button-shas">Contact admin</Link>
          </div>
        </section>
        <footer className="footer-shas">
          <section className="footer-logo-section-shas">
            {brandData?.icon && (
              <Link href={brandData?.website || "https://cloudburstlab.vercel.app"}>
                <Image src={brandData.icon} alt={`${brandData?.name || "CloudBurst Lab"} logo`} height={150} width={200} />
              </Link>
            )}
            <p>A product of {brandData?.name || "CloudBurst Lab"}</p>
          </section>
          <p className="footer-copyright-text-shas">{brandData?.copyrightText || "© 2024 CloudBurst Lab, Inc. All rights reserved."}</p>
        </footer>
      </div>
    </main>
  ) : (
    <>
      {children}
      {appData?.pageAlertMessage && <ShowToast toastAction={appData?.pageAlertAction} toastMessage={appData.pageAlertMessage} />}
    </>
  );

  return { appData, brandData, ContentWrapper, CloudBurstLab };
};

export default SHAS;