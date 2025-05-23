import axios from "axios";
import { useState, useRef } from "react";
import { BASE_URL } from "../../../constant";

function Account() {
  const [profileImage, setProfileImage] = useState(
    "https://avatars.githubusercontent.com/u/123537410?v=4"
  );
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage =async () => {
    if (previewImage) {
      setProfileImage(previewImage);
      setPreviewImage(null);
      try {
        const res = await axios.patch(`${BASE_URL}/users/${id}`,data);
      } catch (error) {
        alert("Failed to update")
      }
      // Here you would typically upload to your server
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture
          </label>
          <div className="flex items-center">
            <div className="relative">
              <img
                src={previewImage || profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-20 h-20 rounded-full mr-4 object-cover"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <button
                onClick={triggerFileInput}
                className="px-4 py-2 bg-gray-100 text-sm font-medium rounded-md hover:bg-gray-200"
              >
                {previewImage ? "Change New" : "Change"}
              </button>
              <button
                onClick={handleRemoveImage}
                className="ml-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
              >
                Remove
              </button>
              {previewImage && (
                <button
                  onClick={handleSaveImage}
                  className="ml-2 px-4 py-2 text-sm font-medium text-green-600 hover:text-green-800"
                >
                  Save Photo
                </button>
              )}
            </div>
          </div>
          {previewImage && (
            <p className="mt-2 text-sm text-gray-500">
              Preview of your new profile picture
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            defaultValue="John Doe"
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            defaultValue="john@example.com"
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="pt-4">
          <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;