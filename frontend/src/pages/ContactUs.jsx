import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setFormStatus({ success: true, message: "Thank you! Your message has been sent successfully." })
      setFormData({ name: "", email: "", subject: "", message: "" })
      setIsSubmitting(false)
    }, 1500)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pt-18">
        <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 py-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute left-0 top-0 h-full w-1/2 transform -translate-x-1/3 text-white opacity-20"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <polygon points="0,0 100,0 0,100" />
            </svg>
          </div>
          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Contact Us</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                We're here to help. Reach out to us with any questions or concerns.
              </p>
            </motion.div>
          </div>
        </div>

        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

                {formStatus && (
                  <div
                    className={`mb-6 p-4 rounded-lg ${formStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {formStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Please provide details about your inquiry..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white h-full">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                <motion.div variants={fadeIn} className="flex items-start mb-8">
                  <div className="bg-blue-500 rounded-full p-3 mr-4">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Our Location</h3>
                    <p>12414, Kablana, Jhajjar, Haryana</p>
                    <p>New Delhi, 110001, India</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="flex items-start mb-8">
                  <div className="bg-blue-500 rounded-full p-3 mr-4">
                    <FaPhoneAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone Number</h3>
                    <p>+91 87 8914 8605</p>
                    <p>+91 95 7636 1266</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="flex items-start mb-8">
                  <div className="bg-blue-500 rounded-full p-3 mr-4">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email Address</h3>
                    <p>medibook@Medibook.com</p>
                    <p>mvikramkr0065@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="flex items-start mb-10">
                  <div className="bg-blue-500 rounded-full p-3 mr-4">
                    <FaClock className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Working Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    <Link to="#"
                      className="bg-blue-500 hover:bg-blue-400 transition-colors duration-300 rounded-full p-3"
                    >
                      <FaFacebookF className="text-xl" />
                    </Link>
                    <Link to="#"
                      className="bg-blue-500 hover:bg-blue-400 transition-colors duration-300 rounded-full p-3"
                    >
                      <FaTwitter className="text-xl" />
                    </Link>
                    <Link to="#"
                      className="bg-blue-500 hover:bg-blue-400 transition-colors duration-300 rounded-full p-3"
                    >
                      <FaInstagram className="text-xl" />
                    </Link>
                    <Link to="#"
                      className="bg-blue-500 hover:bg-blue-400 transition-colors duration-300 rounded-full p-3"
                    >
                      <FaLinkedinIn className="text-xl" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Us on the Map</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Visit our office or one of our partner hospitals
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="rounded-2xl overflow-hidden shadow-xl h-96"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9290456223716!2d77.20651841508096!3d28.632733782418818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1625147280974!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Medibook Location"
              ></iframe>
            </motion.div>
          </div>
        </section>
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about contacting us? Find quick answers below.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              {
                question: "What is the typical response time for inquiries?",
                answer:
                  "We strive to respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line directly.",
              },
              {
                question: "Can I schedule an appointment through the contact form?",
                answer:
                  "The contact form is for general inquiries only. To schedule an appointment, please use our appointment booking system after logging in to your account.",
              },
              {
                question: "How can I provide feedback about your service?",
                answer:
                  "We welcome your feedback! You can use the contact form on this page or email us directly at feedback@Medibook.com.",
              },
              {
                question: "Do you offer emergency support?",
                answer:
                  "For medical emergencies, please call emergency services (102/108/112) immediately. Our platform is not designed for emergency medical situations.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default ContactUs

