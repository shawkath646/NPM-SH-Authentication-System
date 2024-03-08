"use server";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Profile } from "next-auth";
import type { OIDCConfig } from "@auth/core/providers";
import { SHASOptionType } from "./types";
import getData from "./getData";
import ShowToast from "./ShowToast";
import "./styles.css";

function formatDate(date: Date): string {
  const options = { day: '2-digit' as const, month: 'long' as const, year: 'numeric' as const };
  return date.toLocaleDateString('en-US', options);
};

export default async function SHAS(options: SHASOptionType = {}) {

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
}

