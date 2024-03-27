import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { IncomingMessage, ServerResponse } from "http";

export function getToken() {
  return getCookie("@media-reviews:accessToken");
}

export function getTokenSSR({
  req,
  res,
}: {
  res?: ServerResponse;
  req?: IncomingMessage & {
    cookies?:
    | {
      [key: string]: string;
    }
    | Partial<{
      [key: string]: string;
    }>;
  };
}) {

  return getCookie("@media-reviews:accessToken");
}

export function setToken(token: string) {
  return setCookie("@media-reviews:accessToken", token, {
    maxAge: 60 * 60 * 24 * 365,
  });
}

export function deleteToken() {
  return deleteCookie("@media-reviews:accessToken");
}

