import React from "react";
import ToggleSwitch from "../../common/ToggleSwitch";
import { useTheme } from "../../../context/themeContext";
function Appearance() {
  const { toggleTheme,themeMode } = useTheme();
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Appearance</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Dark Mode</h3>
            <p className="text-sm text-gray-500">
              Switch between light and dark theme
            </p>
          </div>
          <button
            type="button"
            className={`${
              themeMode==="dark" ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            onClick={toggleTheme}
          >
            <span
              className={`${
                themeMode==="dark" ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </button>
          {/* <ToggleSwitch enabled={darkMode} setEnabled={setDarkMode} /> */}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-900">Theme Color</h3>
          <div className="mt-4 flex space-x-3">
            {["blue", "green", "purple", "red", "pink"].map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full bg-${color}-500`}
                aria-label={`${color} theme`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appearance;
