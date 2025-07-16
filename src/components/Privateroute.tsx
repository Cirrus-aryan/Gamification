import { Navigate } from "react-router-dom";
import { getCookie } from "@/utils/cookie"; // Assuming this correctly retrieves the cookie value
import { hasGrantedAllScopesGoogle, type TokenResponse } from '@react-oauth/google';
import type { JSX } from "react/jsx-runtime";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const tokenString = getCookie("accessToken");
  console.log("PrivateRoute: Raw tokenString from cookie:", tokenString);

  let token: TokenResponse | null = null;

  if (tokenString) {
    try {
      const parsed = JSON.parse(tokenString);

      // Validate if the parsed object has the expected properties of TokenResponse
      // A more robust check might involve validating specific types or values within the token,
      // but 'scope' and 'access_token' are fundamental for hasGrantedAllScopesGoogle.
      if (typeof parsed === 'object' && parsed !== null && 'scope' in parsed && 'access_token' in parsed) {
        token = parsed as TokenResponse;
      } else {
        console.warn("PrivateRoute: Parsed token is not a valid TokenResponse object (missing 'scope' or 'access_token').");
        // If it's not the expected format, treat it as invalid
        token = null;
      }
    } catch (e) {
      console.error("PrivateRoute: Error parsing accessToken cookie as JSON. This likely means the cookie content is not valid JSON.", e);
      // If parsing fails, the token is invalid
      token = null;
    }
  }

  // Define the required scopes. Ensure these match what your Google OAuth client requests.
  const requiredScopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid'
  ];

  // Determine if the user has access
  const hasAccess = token && hasGrantedAllScopesGoogle(token,    'https://www.googleapis.com/auth/userinfo.email', ...requiredScopes);

  console.log("PrivateRoute: Parsed token object:", token);
  console.log("PrivateRoute: Does token exist and has all required scopes?", hasAccess);

  // If hasAccess is true, render the children (the protected content).
  // Otherwise, redirect to the login page.
  return hasAccess ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;