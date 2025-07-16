import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { DataContext } from "@/Context/Auth"; // Assuming DataContext provides { data: { userRole: string } | null }

const Selection: React.FC = () => {
  // Access data from context. Ensure DataContext provides an object with userRole.
  // data might be null/undefined initially, so use optional chaining.
  const { data } = useContext(DataContext); 

  // Determine which card to render based on userRole
  const renderRoleCard = () => {
    switch (data?.userRole.toLowerCase()) {
      case "admin":
        return (<>
          <Link to="/admin" className="block"> {/* Add block to Link for full card clickability */}
            <Card
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=business%20analytics%20dashboard%20with%20multiple%20screens%20showing%20data%20visualization%2C%20charts%20and%20reports%20in%20a%20modern%20office%20setting%20with%20professional%20lighting&width=800&height=500&seq=super-admin&orientation=landscape"
                  alt="Super Admin Dashboard"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <CardContent className="p-6 text-center flex flex-col justify-between h-[calc(100%-16rem)]"> {/* Adjust height for content */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Super Admin Dashboard
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Manage system settings, user permissions and platform
                    analytics.
                  </p>
                </div>
                <Button className="!rounded-button whitespace-nowrap w-full mt-auto"> {/* mt-auto pushes button to bottom */}
                  <i className="fas fa-user-cog mr-2"></i> Enter as Super
                  Admin
                </Button>
              </CardContent>
            </Card>
          </Link>
          <Link to="/educator" className="block">
            <Card
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=content%20creator%20workspace%20with%20professional%20camera%2C%20editing%20software%20on%20computer%2C%20lighting%20equipment%2C%20and%20creative%20environment%20with%20modern%20design%20elements&width=800&height=500&seq=admin-view&orientation=landscape"
                  alt="Admin Dashboard"
                  className="w-full h-full object-cover object-top" />
              </div>
              <CardContent className="p-6 text-center flex flex-col justify-between h-[calc(100%-16rem)]">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Admin/Creator Dashboard
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Manage your content, track performance metrics, and optimize
                    your creative strategy.
                  </p>
                </div>
                <Button className="!rounded-button whitespace-nowrap w-full mt-auto">
                  <i className="fas fa-user-shield mr-2"></i> Enter as Creator
                </Button>
              </CardContent>
            </Card>
          </Link><Link to="/UserDashboard" className="block">
              <Card
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=user%20browsing%20content%20on%20tablet%20and%20smartphone%20in%20comfortable%20modern%20living%20room%20with%20stylish%20furniture%20and%20soft%20lighting&width=800&height=500&seq=user-view&orientation=landscape"
                    alt="User Dashboard"
                    className="w-full h-full object-cover object-top" />
                </div>
                <CardContent className="p-6 text-center flex flex-col justify-between h-[calc(100%-16rem)]">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      User Dashboard
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Discover content, engage with creators, and personalize your
                      content experience.
                    </p>
                  </div>
                  <Button className="!rounded-button whitespace-nowrap w-full mt-auto">
                    <i className="fas fa-user mr-2"></i> Enter as User
                  </Button>
                </CardContent>
              </Card>
            </Link></>
        );
      case "instructor":
        return (
          <><Link to="/educator" className="block">
            <Card
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=content%20creator%20workspace%20with%20professional%20camera%2C%20editing%20software%20on%20computer%2C%20lighting%20equipment%2C%20and%20creative%20environment%20with%20modern%20design%20elements&width=800&height=500&seq=admin-view&orientation=landscape"
                  alt="Admin Dashboard"
                  className="w-full h-full object-cover object-top" />
              </div>
              <CardContent className="p-6 text-center flex flex-col justify-between h-[calc(100%-16rem)]">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Admin/Creator Dashboard
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Manage your content, track performance metrics, and optimize
                    your creative strategy.
                  </p>
                </div>
                <Button className="!rounded-button whitespace-nowrap w-full mt-auto">
                  <i className="fas fa-user-shield mr-2"></i> Enter as Creator
                </Button>
              </CardContent>
            </Card>
          </Link><Link to="/UserDashboard" className="block">
              <Card
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=user%20browsing%20content%20on%20tablet%20and%20smartphone%20in%20comfortable%20modern%20living%20room%20with%20stylish%20furniture%20and%20soft%20lighting&width=800&height=500&seq=user-view&orientation=landscape"
                    alt="User Dashboard"
                    className="w-full h-full object-cover object-top" />
                </div>
                <CardContent className="p-6 text-center flex flex-col justify-between h-[calc(100%-16rem)]">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      User Dashboard
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Discover content, engage with creators, and personalize your
                      content experience.
                    </p>
                  </div>
                  <Button className="!rounded-button whitespace-nowrap w-full mt-auto">
                    <i className="fas fa-user mr-2"></i> Enter as User
                  </Button>
                </CardContent>
              </Card>
            </Link></>
        );
      case "user":
        return (
          <Link to="/UserDashboard" className="block">
            <Card
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=user%20browsing%20content%20on%20tablet%20and%20smartphone%20in%20comfortable%20modern%20living%20room%20with%20stylish%20furniture%20and%20soft%20lighting&width=800&height=500&seq=user-view&orientation=landscape"
                  alt="User Dashboard"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <CardContent className="p-6 text-center flex flex-col justify-between h-[calc(100%-16rem)]">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    User Dashboard
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Discover content, engage with creators, and personalize your
                    content experience.
                  </p>
                </div>
                <Button className="!rounded-button whitespace-nowrap w-full mt-auto">
                  <i className="fas fa-user mr-2"></i> Enter as User
                </Button>
              </CardContent>
            </Card>
          </Link>
        );
      default:
        // Render a placeholder or message if userRole is not recognized or not yet loaded
        return (
          <div className="col-span-full text-center text-gray-500 text-lg">
            Loading user role or no role assigned.
            {/* You might want to add a spinner or a login prompt here */}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to DualView Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience content from both creator and user perspectives.
              Select your view to get started.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"> {/* Changed to col-span-1 on small screens */}
            {renderRoleCard()} {/* Call the helper function to render the appropriate card */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selection;
