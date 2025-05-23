import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../../constant";
import {
  FiUser,
  FiMail,
  FiCamera,
  FiTrash2,
  FiSave,
  FiPhone,
} from "react-icons/fi";
import { useAuth } from "../../../context/authContext";
import { useQuery } from "@tanstack/react-query";

function Account() {
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      profileImage: "https://avatars.githubusercontent.com/u/123537410?v=4",
    },
  });
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-profile", currentUser?.id],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/users/${currentUser?.id}`);
      if (response.status === 200) {
        return response.data?.data;
      }
    },
  });
  const fileInputRef = useRef(null);
  const profileImage = watch("profileImage");
  const [previewImage, setPreviewImage] = useState(currentUser?.profileImg);

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

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setValue("profileImage", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("email", data.email);
      setValue("profileImage", data.profileImg);
      setValue("mobile", data.mobile);

      console.log(data);
    }
  }, [isLoading]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append all form data
    formData.append("name", data.name);
    formData.append("email", data.email);

    // Append the image file if a new one was selected
    if (fileInputRef.current?.files[0]) {
      formData.append("avatar", fileInputRef.current.files[0]);
    }

    try {
      const response = await axios.patch(
        `${BASE_URL}/users/${currentUser?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        // Update the profile image in form if it was changed
        const { data } = response.data;
        if (data.profileImg) {
          setValue("profileImage", data.profileImg);
        }
        setPreviewImage(null);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 relative">
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
        {/* Profile Picture */}
        <div className="">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture
          </label>
          <div className="flex items-center  ">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={triggerFileInput}
                className="flex items-center px-4 py-2 bg-gray-100 text-sm font-medium rounded-md hover:bg-gray-200"
              >
                <FiCamera className="mr-2" />
                {previewImage ? "Change" : "Upload"}
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
              >
                <FiTrash2 className="mr-2" />
                Remove
              </button>
            </div>
            <div className=" absolute right-2 top-1 ">
              <img
                src={
                  previewImage ||
                  profileImage ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className=" w-44 h-44 rounded-full duration-300  ease-in-out transition-opacity hover:rounded-none mr-4 object-cover border-2 border-gray-200"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
          {previewImage && (
            <p className="mt-2 text-sm text-gray-500">
              Preview of your new profile picture
            </p>
          )}
        </div>

        {/* Full Name */}
        <div>
          <div className="flex items-center mb-1">
            <FiUser className="text-gray-500 mr-2" />
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
          </div>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <div className="flex items-center mb-1">
            <FiMail className="text-gray-500 mr-2" />
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
          </div>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        {/* Email Address */}
        <div>
          <div className="flex items-center mb-1">
            <FiPhone className="text-gray-500 mr-2" />
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile
            </label>
          </div>
          <input
            type="number"
            id="mobile"
            {...register("mobile", {
              pattern: {
                value: /^\d{10}$/,
                message: "Invalid mobile number",
              },
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
          )}
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              "Saving..."
            ) : (
              <>
                <FiSave className="mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Account;
