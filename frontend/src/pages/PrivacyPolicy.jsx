import { useEffect } from "react"
import { motion } from "framer-motion"
import { FaShieldAlt, FaUserShield, FaDatabase, FaCookieBite, FaGlobe, FaChild } from "react-icons/fa"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 py-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute left-0 top-0 h-full w-1/2 transform -translate-x-1/3 text-white opacity-10"
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
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                How we collect, use, and protect your personal information
              </p>
            </motion.div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-gray-500 text-sm">Last Updated: February 10, 2023</p>
        </div>
        <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
              <p className="text-lg text-gray-600 mb-4">
                Medibook ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you visit our website and use our
                services.
              </p>
              <p className="text-lg text-gray-600">
                Please read this Privacy Policy carefully. By accessing or using our platform, you acknowledge that you
                have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy. If you do
                not agree with our policies and practices, please do not use our services.
              </p>
            </div>
          </motion.div>
        </section>
        <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <FaUserShield className="text-indigo-600 text-4xl mb-4" />,
                title: "Information We Collect",
                description: "Personal and non-personal information gathered through our services.",
              },
              {
                icon: <FaDatabase className="text-indigo-600 text-4xl mb-4" />,
                title: "How We Use Your Data",
                description: "Purposes for which we process your personal information.",
              },
              {
                icon: <FaShieldAlt className="text-indigo-600 text-4xl mb-4" />,
                title: "Data Protection",
                description: "Measures we take to secure your personal information.",
              },
              {
                icon: <FaCookieBite className="text-indigo-600 text-4xl mb-4" />,
                title: "Cookies & Tracking",
                description: "How we use cookies and similar technologies.",
              },
              {
                icon: <FaGlobe className="text-indigo-600 text-4xl mb-4" />,
                title: "Third-Party Sharing",
                description: "When and how we share information with others.",
              },
              {
                icon: <FaChild className="text-indigo-600 text-4xl mb-4" />,
                title: "Children's Privacy",
                description: "How we handle information from minors.",
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
              >
                {section.icon}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
                <p className="text-gray-600">{section.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
        <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">1. Information We Collect</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>1.1 Personal Information:</strong> We may collect personal information that you provide directly
                to us, including but not limited to:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Contact information (name, email address, phone number, postal address)</li>
                <li>Account credentials (username, password)</li>
                <li>Profile information (date of birth, gender, profile picture)</li>
                <li>Medical information (medical history, current medications, allergies, symptoms)</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Communications you send to us</li>
              </ul>
              <p>
                <strong>1.2 Non-Personal Information:</strong> We may also collect non-personal information
                automatically when you use our services, including:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Device information (device type, operating system, browser type)</li>
                <li>Usage data (pages visited, time spent on pages, links clicked)</li>
                <li>IP address and location information</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">2. How We Use Your Information</h2>
            <div className="space-y-4 text-gray-600">
              <p>We use the information we collect for various purposes, including:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Providing and maintaining our services</li>
                <li>Processing and completing transactions</li>
                <li>Facilitating communication between patients and healthcare providers</li>
                <li>Sending administrative information, such as appointment confirmations and reminders</li>
                <li>Personalizing your experience on our platform</li>
                <li>Improving our services and developing new features</li>
                <li>Analyzing usage patterns and trends</li>
                <li>Detecting, preventing, and addressing technical issues or fraudulent activities</li>
                <li>Complying with legal obligations</li>
              </ul>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">3. Data Sharing and Disclosure</h2>
            <div className="space-y-4 text-gray-600">
              <p>We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>
                  <strong>Healthcare Providers:</strong> We share your medical information with the healthcare providers
                  you choose to consult with through our platform.
                </li>
                <li>
                  <strong>Service Providers:</strong> We may share your information with third-party vendors,
                  consultants, and other service providers who need access to such information to carry out work on our
                  behalf.
                </li>
                <li>
                  <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a
                  portion of our assets, your information may be transferred as part of that transaction.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or
                  in response to valid requests by public authorities.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may share your information with third parties when we have your
                  consent to do so.
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">4. Data Security</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We implement appropriate technical and organizational measures to protect the security of your personal
                information. However, please be aware that no method of transmission over the Internet or method of
                electronic storage is 100% secure.
              </p>
              <p>Our security measures include:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication procedures</li>
                <li>Secure data storage practices</li>
                <li>Staff training on data protection</li>
              </ul>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">5. Cookies and Tracking Technologies</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We use cookies and similar tracking technologies to track activity on our platform and hold certain
                information. Cookies are files with a small amount of data that may include an anonymous unique
                identifier.
              </p>
              <p>Types of cookies we use:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Necessary for the operation of our platform.
                </li>
                <li>
                  <strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of
                  visitors and see how visitors move around our platform.
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> Enable us to personalize content and remember your
                  preferences.
                </li>
                <li>
                  <strong>Targeting/Advertising Cookies:</strong> Record your visit to our platform, the pages you have
                  visited, and the links you have followed.
                </li>
              </ul>
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
                if you do not accept cookies, you may not be able to use some portions of our platform.
              </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">6. Your Data Protection Rights</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>
                  <strong>Access:</strong> The right to request copies of your personal information.
                </li>
                <li>
                  <strong>Rectification:</strong> The right to request that we correct inaccurate information about you.
                </li>
                <li>
                  <strong>Erasure:</strong> The right to request that we delete your personal information in certain
                  circumstances.
                </li>
                <li>
                  <strong>Restriction:</strong> The right to request that we restrict the processing of your information
                  in certain circumstances.
                </li>
                <li>
                  <strong>Data Portability:</strong> The right to receive your personal information in a structured,
                  commonly used format.
                </li>
                <li>
                  <strong>Objection:</strong> The right to object to our processing of your personal information.
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the information provided in the "Contact Us"
                section.
              </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">7. Children's Privacy</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our services are not intended for children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you are a parent or guardian and you are aware that your child
                has provided us with personal information, please contact us so that we can take necessary actions.
              </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">8. Changes to This Privacy Policy</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                Policy are effective when they are posted on this page.
              </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">9. Contact Us</h2>
            <div className="space-y-4 text-gray-600">
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>By email: privacy@Medibook.com</li>
                <li>By phone: +91 98765 43210</li>
                <li>By mail: 123 Healthcare Avenue, Medical District, New Delhi, 110001, India</li>
              </ul>
            </div>
          </motion.div>
        </section>

        <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="bg-indigo-50 p-8 rounded-2xl shadow-lg border border-indigo-100 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Privacy Matters to Us</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              By using Medibook's services, you acknowledge that you have read and understood this Privacy Policy. If
              you have any concerns about your data, please don't hesitate to contact us.
            </p>
            <div className="flex justify-center">
              <a
                href="/contact-us"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Contact Our Privacy Team
              </a>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default PrivacyPolicy

