// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React from "react";

// Material-UI Icon Imports
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import CreditCardIcon from '@mui/icons-material/CreditCard'; // Generic for all credit cards
import PaymentIcon from '@mui/icons-material/Payment'; // A general payment icon, suitable for PayPal if no specific icon exists

const Footer: React.FC = () => {

  return (
    <footer
      className={`py-8 px-6 border-t ${
        
          "bg-white border-gray-200 text-gray-600"
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ascendia Learning
            </h3>
            <p className="text-sm mb-4">
              Transform your content with AI-powered extraction and
              processing. Convert any format into structured, actionable
              information.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <TwitterIcon className="text-lg" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <LinkedInIcon className="text-lg" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FacebookIcon className="text-lg" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <InstagramIcon className="text-lg" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  What's New
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Webinars
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0">
            <p>© 2025 Transcoder. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {/* Using CreditCardIcon for Visa and Mastercard */}
              <CreditCardIcon className="text-xl mr-2" /> {/* Visa */}
              <CreditCardIcon className="text-xl mr-2" /> {/* Mastercard */}
              <PaymentIcon className="text-xl" /> {/* PayPal */}
            </div>
            <div>
              <a href="#" className="hover:underline">
                Privacy
              </a>{" "}
              •
              <a href="#" className="hover:underline ml-1">
                Terms
              </a>{" "}
              •
              <a href="#" className="hover:underline ml-1">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;