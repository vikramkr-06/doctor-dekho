import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Medibook.com</h3>
            <p className="text-gray-400 mb-4">
              Connecting patients with qualified healthcare professionals for a seamless healthcare experience.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaFacebook size={20} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaTwitter size={20} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaInstagram size={20} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-gray-400 hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">For Doctors</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/doctor/register" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Join as a Doctor
                </Link>
              </li>
              <li>
                <Link to="/doctor/login" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Doctor Login
                </Link>
              </li>
              <li>
                <Link to="/doctor/dashboard" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Doctor Dashboard
                </Link>
              </li>
              <li>
                <Link to="/terms-for-doctor" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Terms for Doctors
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3" />
                <span className="text-gray-400">
                  124104 Kablana, Jhajjar, Haryana, New Delhi, India - 110001
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-blue-500 mr-3" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-3" />
                <span className="text-gray-400">support@doctorapp.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400">&copy; {currentYear} Medibook. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Terms of Service
            </Link>
            <Link to="/faq" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

