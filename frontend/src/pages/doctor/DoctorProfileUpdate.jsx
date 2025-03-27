import { useState, useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { useDoctorAuth } from "../../hooks/useDoctorAuth"
import { updateDoctorProfile } from "../../services/doctorAuthService"
import {
  UserCircle,
  Camera,
  User,
  Briefcase,
  Phone,
  Calendar,
  IndianRupee,
  Mail,
  FileText,
  FileBadge,
  Loader2,
  Save,
} from "lucide-react";

const DoctorProfileUpdate = () => {
  const { doctor, updateProfile } = useDoctorAuth()
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    phone: "",
    bio: "",
    experience: 0,
    consultationFee: 500,
  })
  const [profileImage, setProfileImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || "",
        specialization: doctor.specialization || "",
        phone: doctor.phone || "",
        bio: doctor.bio || "",
        experience: doctor.experience || 0,
        consultationFee: doctor.consultationFee || 500,
      })

      if (doctor.profileImage) {
        setPreviewUrl(`${doctor.profileImage}`)
      }
    }
  }, [doctor])

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
      submitData.append("specialization", formData.specialization)
      submitData.append("phone", formData.phone)
      submitData.append("bio", formData.bio)
      submitData.append("experience", formData.experience)
      submitData.append("consultationFee", formData.consultationFee)

      if (profileImage) {
        submitData.append("profileImage", profileImage)
      }

      await updateDoctorProfile(submitData)
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <UserCircle className="w-8 h-8 text-gray-700" />
        Update Profile
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-8 mb-6">
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
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
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
                  <label htmlFor="specialization" className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Phone className="w-4 h-4 text-gray-500" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="experience" className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    min="0"
                  />
                </div>
                <div>
                  <label htmlFor="consultationFee" className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <IndianRupee className="w-4 h-4 text-gray-500" />
                    Consultation Fee (₹)
                  </label>
                  <input
                    type="number"
                    id="consultationFee"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    min="0"
                  />
                </div>
                <div>
                  <label htmlFor="email" className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Mail className="w-4 h-4 text-gray-500" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={doctor?.email || ""}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-100"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="bio" className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <FileText className="w-4 h-4 text-gray-500" />
                  Professional Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]"
                  placeholder="Tell patients about your professional background, education, and approach to care..."
                ></textarea>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <h3 className="text-blue-800 font-medium mb-2 flex items-center gap-2">
              <FileBadge className="w-5 h-5 text-blue-800" />
              License Information
            </h3>
            <p className="text-blue-700 mb-2">License Number: {doctor?.licenseNumber}</p>
            <p className="text-sm text-blue-600">
              License information cannot be changed. Please contact support if you need to update your license details.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="cursor-pointer justify-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DoctorProfileUpdate

