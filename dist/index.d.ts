import React from "react";
import { Profile } from "next-auth";
import type { OIDCConfig } from "@auth/core/providers";
import { SHASOptionType } from "./types";
import "./styles.css";
export default function SHAS(options?: SHASOptionType): Promise<{
    appData: import("./types").AppDataType | undefined;
    brandData: import("./types").BrandDataType | undefined;
    ContentWrapper: ({ children }: {
        children: React.ReactNode;
    }) => React.JSX.Element;
    CloudBurstLab: (params?: Partial<OIDCConfig<Profile>>) => OIDCConfig<Profile>;
}>;
