import { useState, useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { useAuth } from "../hooks/useAuth"
import { updateUserProfile } from "../services/authService"
import { User, Mail, Phone, MapPin, Camera, Loader2 } from 'lucide-react';

const UserProfile = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  })
  const [profileImage, setProfileImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      })

      if (user.profileImage) {
        setPreviewUrl(`${user.profileImage}`)
      }
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const submitData = new FormData()
      submitData.append("name", formData.name)
      submitData.append("phone", formData.phone)
      submitData.append("address", formData.address)

      if (profileImage) {
        submitData.append("profileImage", profileImage)
      }

      await updateUserProfile(submitData)
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pt-20">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
        <User className="w-8 h-8 text-blue-600" />
        My Profile
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 border-2 border-gray-200">
                {previewUrl ? (
                  <img
                    src={previewUrl || "https://avatar.iran.liara.run/public/16"}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <img src="https://avatar.iran.liara.run/public/16" alt="user" />
                  </div>
                )}
              </div>

              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />

              <button
                type="button"
                onClick={triggerFileInput}
                className="btn-secondary cursor-pointer flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
              >
                <Camera className="w-5 h-5" />
                Change Profile Picture
              </button>
            </div>

            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={user?.email || ""}
                    className=" w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-2">Email cannot be changed</p>
                </div>

                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className=" w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className=" w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]"
                  placeholder="Enter your address..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserProfile

