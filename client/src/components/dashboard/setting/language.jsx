import React,{useState} from "react";
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
];
function Language() {
    const [selectedLanguage, setSelectedLanguage] = useState("en");
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Language & Region</h2>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Language
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="timezone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Timezone
          </label>
          <select
            id="timezone"
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option>UTC-12:00</option>
            <option>UTC-08:00 (Pacific Time)</option>
            <option>UTC-05:00 (Eastern Time)</option>
            <option>UTC+00:00 (GMT)</option>
            <option>UTC+01:00 (Central European Time)</option>
          </select>
        </div>

        <div className="pt-4">
          <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

export default Language;
