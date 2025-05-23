import { useState } from "react";
import {
  FiUser,
  FiLock,
  FiBell,
  FiMail,
  FiMoon,
  FiGlobe,
  FiCreditCard,
  FiHelpCircle,
} from "react-icons/fi";
import Account from "../../components/dashboard/setting/account";
import Security from "../../components/dashboard/setting/security";
import Appearance from "../../components/dashboard/setting/appearance";
import Language from "../../components/dashboard/setting/language";
import Notification from "../../components/dashboard/setting/notification";

const buttons = [
  {
    name: "Account",
    id: "account",
    icon: <FiUser className="mr-3" />,
  },
  {
    name: "Security",
    id: "security",
    icon: <FiLock className="mr-3" />,
  },
  {
    name: "Notifications",
    id: "notifications",
    icon: <FiBell className="mr-3" />,
  },
  {
    name: "Appearance",
    id: "appearance",
    icon: <FiMoon className="mr-3" />,
  },
  {
    name: "Language",
    id: "language",
    icon: <FiGlobe className="mr-3" />,
  },
  {
    name: "Billing",
    id: "billing",
    icon: <FiCreditCard className="mr-3" />,
  },
  {
    name: "Help",
    id: "help",
    icon: <FiHelpCircle className="mr-3" />,
  },
];
const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);

 

  const [activeTab, setActiveTab] = useState("account");
  const getTabRender = (id) => {
    const tabs = {
      account: <Account />,
      security: <Security />,
      notifications: <Notification />,
      appearance: <Appearance />,
      language: <Language />,
    };
    return tabs[id] || <div>Component not found</div>;
  };
  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <nav className="space-y-1">
              {buttons.map((button) => (
                <button
                  key={button.id}
                  onClick={() => setActiveTab(button.id)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg ${
                    activeTab === button.id
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {" "}
                  {button.icon}
                  {button.name}{" "}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">{getTabRender(activeTab)}</div>
        </div>
      </div>
    </div>
  );
};

// Reusable Toggle Switch Component
const ToggleSwitch = ({ enabled, setEnabled }) => {
  return (
    <button
      type="button"
      className={`${
        enabled ? "bg-blue-600" : "bg-gray-200"
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      onClick={() => setEnabled(!enabled)}
    >
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  );
};

export default SettingsPage;
