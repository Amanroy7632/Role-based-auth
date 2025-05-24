import axios from "axios";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../constant";

const AccountVerificationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();
  const [isSaving, setIsSaving] = useState(false);
  const onSubmit = async (data) => {
    try {
      setIsSaving(true);
      const response = await axios.post(
        `${BASE_URL}/auth/get-verification-link`,
        data
      );
      if (response.status === 200) {
        alert("Account verificatio link sent to your registered email.");
        reset();
      }
    } catch (error) {
      alert("Failed to send mail");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Verify Your Account
        </h2>

        <p className="text-gray-600 text-sm text-center mb-6">
          Enter your email and we’ll send you a verification link.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isSaving?"Sending..":"Send Verification Link"}
          </button>
        </form>

        {isSubmitSuccessful && (
          <p className="text-green-600 text-sm text-center mt-4">
            Verification link sent successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountVerificationPage;
