import { NextRequest, NextResponse } from "next/server";
import { AccessLevel } from "./types/user";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const accessTokenCookie = request.cookies.get('@media-reviews:accessToken');
  const accessLevelCookie = request.cookies.get('@media-reviews:accessLevel');

  const token = accessTokenCookie?.value;
  const accessLevel = accessLevelCookie?.value;

  const adminRoutes = [
    '/users',
    '/directors',
    '/artists',
    '/categories'
  ]

  if (adminRoutes.includes(pathname)) {
    if (token) {
      if (accessLevel === AccessLevel.USER) {
        url.pathname = '/unauthorized'

        return NextResponse.redirect(url);
      }
    } else {
      url.pathname = '/'

      return NextResponse.redirect(url);
    }
  }
}