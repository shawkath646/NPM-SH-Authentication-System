"use server";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Link from "next/link";
import Image from "next/image";
import React from "react";
import getData from "./getData";
import ShowToast from "./ShowToast";
import "./styles.css";
function formatDate(date) {
    var options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
;
export default async function SHAS() {
    return __awaiter(this, arguments, void 0, function (options) {
        var _a, appData, brandData, title, description, CloudBurstLab, ContentWrapper;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!options.appId)
                        options.appId = process.env.STOCK_APP_ID;
                    if (!options.appSecret)
                        options.appSecret = process.env.STOCK_APP_SECRET;
                    return [4 /*yield*/, getData(options)];
                case 1:
                    _a = _b.sent(), appData = _a.appData, brandData = _a.brandData, title = _a.title, description = _a.description;
                    CloudBurstLab = function (params) {
                        if (params === void 0) { params = {}; }
                        var _a = params.id, id = _a === void 0 ? "cloudburst-lab" : _a, _b = params.name, name = _b === void 0 ? "CloudBurst Lab" : _b, _c = params.type, type = _c === void 0 ? "oidc" : _c, _d = params.issuer, issuer = _d === void 0 ? "https://sh-authentication-system.vercel.app/api/oauth" : _d, _e = params.clientId, clientId = _e === void 0 ? options.appId : _e, _f = params.clientSecret, clientSecret = _f === void 0 ? options.appSecret : _f, _g = params.checks, checks = _g === void 0 ? ["pkce", "state", "nonce"] : _g, _h = params.authorization, authorization = _h === void 0 ? { params: { scope: 'openid profile email' } } : _h;
                        return {
                            id: id,
                            name: name,
                            type: type,
                            issuer: issuer,
                            clientId: clientId,
                            clientSecret: clientSecret,
                            checks: checks,
                            authorization: authorization,
                            style: {
                                bg: "#fff",
                                logo: "./cloudburst_lab.png",
                                text: "#000",
                            }
                        };
                    };
                    ContentWrapper = function (_a) {
                        var children = _a.children;
                        return (title || description) ? (React.createElement("main", { className: "main-shas" },
                            React.createElement("div", null,
                                React.createElement("div", { className: "wave-shas" }),
                                React.createElement("div", { className: "wave-shas" }),
                                React.createElement("div", { className: "wave-shas" })),
                            React.createElement("div", { className: "container-shas" },
                                React.createElement("section", { className: "flex-n-center-shas message-section-shas" },
                                    React.createElement("div", { className: "message-box-shas" },
                                        React.createElement("h1", { className: "title-shas" }, title),
                                        React.createElement("p", { className: "description-shas" }, description),
                                        ((appData === null || appData === void 0 ? void 0 : appData.status) === "inactive" && appData.inactiveUntil) && (React.createElement("p", { className: "inactive-until-shas" },
                                            "Inactive until: ",
                                            formatDate(appData.inactiveUntil))),
                                        React.createElement(Link, { href: "mailto:".concat((appData === null || appData === void 0 ? void 0 : appData.contact) || (brandData === null || brandData === void 0 ? void 0 : brandData.email) || "shcloudburstlabs@gmail.com"), className: "button-shas" }, "Contact admin"))),
                                React.createElement("footer", { className: "footer-shas" },
                                    React.createElement("section", { className: "footer-logo-section-shas" },
                                        (brandData === null || brandData === void 0 ? void 0 : brandData.icon) && (React.createElement(Link, { href: (brandData === null || brandData === void 0 ? void 0 : brandData.website) || "https://cloudburstlab.vercel.app" },
                                            React.createElement(Image, { src: brandData.icon, alt: "".concat((brandData === null || brandData === void 0 ? void 0 : brandData.name) || "CloudBurst Lab", " logo"), height: 150, width: 200 }))),
                                        React.createElement("p", null,
                                            "A product of ",
                                            (brandData === null || brandData === void 0 ? void 0 : brandData.name) || "CloudBurst Lab")),
                                    React.createElement("p", { className: "footer-copyright-text-shas" }, (brandData === null || brandData === void 0 ? void 0 : brandData.copyrightText) || "© 2024 CloudBurst Lab, Inc. All rights reserved."))))) : (React.createElement(React.Fragment, null,
                            children,
                            (appData === null || appData === void 0 ? void 0 : appData.pageAlertMessage) && React.createElement(ShowToast, { toastAction: appData === null || appData === void 0 ? void 0 : appData.pageAlertAction, toastMessage: appData.pageAlertMessage })));
                    };
                    return [2 /*return*/, { appData: appData, brandData: brandData, ContentWrapper: ContentWrapper, CloudBurstLab: CloudBurstLab }];
            }
        });
    });
}
