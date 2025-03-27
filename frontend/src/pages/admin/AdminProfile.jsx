import { useEffect, useRef, useState } from "react";
import { useAdminAuth } from "../../hooks/useAdminAuth.jsx";
import { Camera, User } from "lucide-react";
import { toast } from "react-toastify";

const AdminProfile = () => {
  const { admin = {}, updateProfile } = useAdminAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name || "",
        password: "",
        confirmPassword: "",
      });
      setPreviewUrl(admin.profileImage || "https://avatar.iran.liara.run/public/16");
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const updateData = new FormData();
      updateData.append("name", formData.name);
      updateData.append("password", formData.password);
      updateData.append("confirmPassword", formData.confirmPassword);

      if (profileImage) {
        updateData.append("profileImage", profileImage);
      }

      await updateProfile(updateData);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: admin?.name || "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Admin Information</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 border-2 border-gray-200">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <User className="w-20 h-20 text-gray-400" />
                  </div>
                )}
              </div>

              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />

              <button
                type="button"
                onClick={triggerFileInput}
                className="cursor-pointer flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
              >
                <Camera className="w-5 h-5" />
                Change Profile Picture
              </button>

            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={admin?.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
                <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Leave blank to keep current password"
                />
                {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Leave blank to keep current password"
                />
                {errors.confirmPassword && <p className="text-red-500 mt-1 text-sm">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium text-lg">{admin?.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium text-lg">{admin?.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Role</p>
              <p className="font-medium text-lg">
                {admin?.role === "superadmin" ? "Super Administrator" : "Administrator"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;