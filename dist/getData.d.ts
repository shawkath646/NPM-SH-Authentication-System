import { AppDataType, BrandDataType, SHASOptionType } from "./types";
interface ResponseType {
    title?: string;
    description?: string;
    appData?: AppDataType;
    brandData?: BrandDataType;
}
export default function getData(options: SHASOptionType): Promise<ResponseType>;
export {};
