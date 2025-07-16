import { Navigate } from "react-router-dom";
import { getCookie } from "@/utils/cookie"; // Assuming this correctly retrieves the cookie value
import type { JSX } from "react/jsx-runtime";
import { hasGrantedAllScopesGoogle, type TokenResponse } from '@react-oauth/google'; // Import TokenResponse type
import  { useMemo } from "react";
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const hasAccess = useMemo(() => {
    const tokenString = getCookie("accessToken");
    console.log("PublicRoute: Raw tokenString from cookie:", tokenString);

    let token: TokenResponse | null = null;
    try {
      if (tokenString) {
        const parsed = JSON.parse(tokenString);
        if (typeof parsed === 'object' && parsed !== null && 'scope' in parsed && 'access_token' in parsed) {
          token = parsed as TokenResponse;
        } else {
          console.warn("PublicRoute: Parsed token is not a valid TokenResponse object (missing 'scope' or 'access_token').");
          token = null;
        }
      }
    } catch (e) {
      console.error("PublicRoute: Error parsing accessToken cookie as JSON. This likely means the cookie content is not valid JSON.", e);
      token = null;
    }

    const scopes = [
       
        'https://www.googleapis.com/auth/userinfo.profile',
        'openid'
    ];

    const hasGranted = token &&
        typeof token === "object" &&
        'scope' in token &&
        hasGrantedAllScopesGoogle(token, 'https://www.googleapis.com/auth/userinfo.email', ...scopes); // Use spread for scopes array

    console.log("PublicRoute: Parsed token object:", token);
    console.log("PublicRoute: hasAccess result:", hasGranted);
    return hasGranted;
  }, [/* No dependencies here, as getCookie is external and `token` is derived from it */]); // This memoizes based on whether dependencies change. If cookie state is managed by an external listener, it would trigger updates here.

  return hasAccess ? <Navigate to="/SelectionPage" /> : children;
};

export default PublicRoute;