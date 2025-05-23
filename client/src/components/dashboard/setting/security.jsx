import React, { useState } from "react";
import ToggleSwitch from "../../common/ToggleSwitch";
function Security() {
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-gray-500">
              Add an extra layer of security to your account
            </p>
          </div>
          <ToggleSwitch enabled={twoFactorAuth} setEnabled={setTwoFactorAuth} />
        </div>

        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-900">Change Password</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="current-password"
                className="block text-sm text-gray-700 mb-1"
              >
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm text-gray-700 mb-1"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Security;
