"use server";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import cache from "./inMemoryCache";
import ShowToast from "./ShowToast";
import getData from "./getData";
import { SHASOptionType } from "./types";
import "./styles.css";


function formatDate(date: Date): string {
  const options = { day: '2-digit' as const, month: 'long' as const, year: 'numeric' as const };
  return date.toLocaleDateString('en-US', options);
};


async function SHAS(options: SHASOptionType = {}) {

  if (!options.appId) options.appId = process.env.SHAS_APP_ID;
  if (!options.appSecret) options.appSecret = process.env.SHAS_APP_SECRET;
  if (!options.cache) options.cache = "no-cache";

  cache.setValue(options);

  const { appData, brandData, title, description } = await getData();

  const ContentWrapper = async ({ children }: { children: React.ReactNode }) => (title || description) ? (
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
                {options.imageOptimization ? (
                  <Image src={brandData.icon} alt={`${brandData?.name || "CloudBurst Lab"} logo`} height={150} width={200} />
                ) : (
                  <img src={brandData.icon} alt={`${brandData?.name || "CloudBurst Lab"} logo`} height={150} width={200} />
                )}
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
      {appData?.pageAlertMessage && <ShowToast toastReminder={options.toastReminder} toastAction={appData?.pageAlertAction} toastMessage={appData.pageAlertMessage} />}
    </>
  );

  return { appData, brandData, ContentWrapper };
};

export default SHAS;