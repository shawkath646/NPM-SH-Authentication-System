"use server";
import Link from "next/link";
import Image from "next/image";
import React from "react";
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
  if (!options.cache) options.cache = "default";

  const { appData, brandData, title, description } = await getData(options);

  const ContentWrapper = async ({ children }: { children: React.ReactNode }) => (title || description) ? (
    <main className="main-shas">
      <div className="container-shas">
        <section className="flex-n-center-shas message-section-shas">
          <div className="message-box-shas">
            <h1 className="title-shas">{title}</h1>
            <p className="description-shas">{description}</p>
            {(appData?.status === "inactive" && appData.inactiveUntil) && (
              <p className="inactive-until-shas">Inactive until: {formatDate(appData.inactiveUntil)}</p>
            )}
            <Link href={`mailto:${appData?.contact || brandData?.email}`} className="button-shas">Contact admin</Link>
          </div>
        </section>
        <footer className="footer-shas">
          <section className="footer-logo-section-shas">
            {brandData?.iconTransparent && (
              <Link href={brandData?.website || "#"}>
                {options.imageOptimization ? (
                  <Image src={brandData.iconTransparent} alt={`${brandData?.name} logo`} height={50} width={100} style={{ width: "100px", height: "50px" }} />
                ) : (
                  <img src={brandData.iconTransparent} alt={`${brandData?.name} logo`} height={50} width={100} style={{ width: "100px", height: "50px" }} />
                )}
              </Link>
            )}
            <p>A product of {brandData?.name}</p>
          </section>
          <p className="footer-copyright-text-shas">{brandData?.copyrightText}</p>
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