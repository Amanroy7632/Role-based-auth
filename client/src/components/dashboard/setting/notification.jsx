import { useState } from "react";
import ToggleSwitch from "../../common/ToggleSwitch";
function Notification() {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              Email Notifications
            </h3>
            <p className="text-sm text-gray-500">Receive email notifications</p>
          </div>
          <ToggleSwitch enabled={emailUpdates} setEnabled={setEmailUpdates} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              Push Notifications
            </h3>
            <p className="text-sm text-gray-500">Receive push notifications</p>
          </div>
          <ToggleSwitch enabled={notifications} setEnabled={setNotifications} />
        </div>

        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-900">
            Notification Preferences
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input
                id="product-updates"
                name="product-updates"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="product-updates"
                className="ml-3 block text-sm text-gray-700"
              >
                Product updates
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="security-alerts"
                name="security-alerts"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="security-alerts"
                className="ml-3 block text-sm text-gray-700"
              >
                Security alerts
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="newsletter"
                name="newsletter"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="newsletter"
                className="ml-3 block text-sm text-gray-700"
              >
                Newsletter
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
