import React, { useState,useContext } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { DataContext } from "@/Context/Auth";
const Auth: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setData } = useContext(DataContext);
  const navigate = useNavigate();

  const fetchUserInfo = async (accessToken: string) => {
    try {
      const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      return null;
    }
  };

  const login = useGoogleLogin({
    flow: 'implicit', // or 'auth-code' if you use a backend exchange
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      setIsLoading(true);
      const userInfo = await fetchUserInfo(accessToken);

      if (!userInfo) {
        setIsLoading(false);
        return;
      }

      try {
        const formData = new FormData();
        formData.append("email", userInfo.email);
        formData.append("EmailVerified", userInfo.email_verified.toString());
        formData.append("name", userInfo.name);
        formData.append("ProfilePicture", userInfo.picture);

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_PORT}/Authorize`, formData);

        // Save access token in cookie for auth checks
        console.log(response)
        document.cookie = `accessToken=${JSON.stringify(tokenResponse)}; path=/; secure; samesite=strict; expires=${new Date(Date.now() + tokenResponse.expires_in * 1000).toUTCString()}`;
        localStorage.setItem("userEmail", userInfo.email);
        localStorage.setItem("userName", userInfo.name);
        localStorage.setItem("userProfilePicture", userInfo.picture);
        localStorage.setItem("userId", response.data.data._id);
        localStorage.setItem("userRole", response.data.data.Role );
        setData({
          userEmail: userInfo.email,
          userName: userInfo.name,
          userProfilePicture: userInfo.picture,
          userId: response.data.data._id,
          userRole: response.data.data.Role || "user"
        });
        console.log("User Authorized:", response.data);
        navigate("/SelectionPage");
      } catch (error) {
        console.error("Authorization failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (err) => {
      console.error("Google login failed:", err);
      setIsLoading(false);
    },
  });

  const handleGoogleLogin = () => {
    setIsLoading(true);
    login();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative">
      <div className="absolute inset-0 z-0 opacity-5">
        <img
          src="https://readdy.ai/api/search-image?query=abstract%20modern%20technology%20background&width=1440&height=1024&seq=bg001&orientation=landscape"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full max-w-md z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <ShieldOutlinedIcon className="text-white text-3xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">SecureConnect</h1>
          <p className="text-gray-500 text-sm mt-1">Enterprise Authentication System</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>Continue with your Google account</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Secure Authentication</span>
              </div>
            </div>

            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-12 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 !rounded-button flex items-center justify-center space-x-3"
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <FcGoogle size={24} />
                  <span>Continue with Google</span>
                </>
              )}
            </Button>

            <div className="text-center mt-4 text-xs text-gray-400 flex items-center justify-center">
              <LockOutlinedIcon fontSize="inherit" className="mr-1" />
              Secure SSL encrypted connection
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-xs text-gray-500">
              By signing in, you agree to our
              <a href="#" className="text-blue-600 hover:underline ml-1">Terms</a> and
              <a href="#" className="text-blue-600 hover:underline ml-1">Privacy Policy</a>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-center space-x-4 text-gray-500">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="#"><HelpOutlineIcon /></a>
                  </TooltipTrigger>
                  <TooltipContent><p>Help & Support</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="#"><SecurityOutlinedIcon /></a>
                  </TooltipTrigger>
                  <TooltipContent><p>Security Info</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="#"><ArticleOutlinedIcon /></a>
                  </TooltipTrigger>
                  <TooltipContent><p>Legal</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
