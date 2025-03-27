import { useEffect } from "react"
import { motion } from "framer-motion"
import { FaFileContract, FaUserCheck, FaExclamationTriangle, FaGavel, FaShieldAlt, FaHandshake } from "react-icons/fa"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const TermsOfService = () => {
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
        <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 py-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute right-0 top-0 h-full w-1/2 transform translate-x-1/3 text-white opacity-10"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
          </div>
          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Terms of Service</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                The rules and guidelines governing your use of Medibook
              </p>
            </motion.div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-gray-500 text-sm">Last Updated: January 25, 2023</p>
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
                Welcome to Medibook. These Terms of Service ("Terms") govern your access to and use of the Medibook
                website, mobile applications, and services (collectively, the "Services").
              </p>
              <p className="text-lg text-gray-600">
                Please read these Terms carefully before using our Services. By accessing or using our Services, you
                agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not
                access or use the Services.
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
                icon: <FaUserCheck className="text-gray-700 text-4xl mb-4" />,
                title: "User Accounts",
                description: "Requirements and responsibilities for account creation and maintenance.",
              },
              {
                icon: <FaFileContract className="text-gray-700 text-4xl mb-4" />,
                title: "Service Usage",
                description: "Guidelines for using our platform and services appropriately.",
              },
              {
                icon: <FaHandshake className="text-gray-700 text-4xl mb-4" />,
                title: "Payments & Refunds",
                description: "Policies regarding payments, cancellations, and refunds.",
              },
              {
                icon: <FaShieldAlt className="text-gray-700 text-4xl mb-4" />,
                title: "Intellectual Property",
                description: "Rights and restrictions related to our content and platform.",
              },
              {
                icon: <FaExclamationTriangle className="text-gray-700 text-4xl mb-4" />,
                title: "Limitations & Disclaimers",
                description: "Important legal disclaimers and liability limitations.",
              },
              {
                icon: <FaGavel className="text-gray-700 text-4xl mb-4" />,
                title: "Dispute Resolution",
                description: "How we handle disagreements and legal disputes.",
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">1. User Accounts</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>1.1 Account Creation:</strong> To use certain features of our Services, you must create an
                account. You agree to provide accurate, current, and complete information during the registration
                process and to update such information to keep it accurate, current, and complete.
              </p>
              <p>
                <strong>1.2 Account Security:</strong> You are responsible for safeguarding your password and for all
                activities that occur under your account. You agree to notify us immediately of any unauthorized use of
                your account.
              </p>
              <p>
                <strong>1.3 Account Types:</strong> Medibook offers different types of accounts for patients and
                healthcare providers. Each account type has specific features, requirements, and responsibilities as
                detailed in our platform.
              </p>
              <p>
                <strong>1.4 Account Termination:</strong> We reserve the right to suspend or terminate your account and
                access to the Services at our sole discretion, without notice, for conduct that we determine violates
                these Terms or is harmful to other users, us, or third parties, or for any other reason.
              </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">2. Service Usage</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>2.1 Permitted Use:</strong> You may use our Services only for lawful purposes and in accordance
                with these Terms. You agree not to use our Services:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>
                  In any way that violates any applicable federal, state, local, or international law or regulation
                </li>
                <li>
                  To transmit, or procure the sending of, any advertising or promotional material, including any "junk
                  mail," "chain letter," "spam," or any other similar solicitation
                </li>
                <li>
                  To impersonate or attempt to impersonate Medibook, a Medibook employee, another user, or any other
                  person or entity
                </li>
                <li>
                  To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Services
                </li>
              </ul>
              <p>
                <strong>2.2 Medical Information:</strong> Our Services provide general health information and facilitate
                connections between patients and healthcare providers. The information provided through our Services is
                not intended to be a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <p>
                <strong>2.3 Telehealth Services:</strong> If you use our platform to connect with healthcare providers
                for telehealth services, you acknowledge that:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Telehealth has limitations and is not appropriate for all medical conditions</li>
                <li>Technical failures may occur and interrupt service</li>
                <li>In some cases, information transmitted may be insufficient for medical decision-making</li>
              </ul>
              <p>
                <strong>2.4 User Content:</strong> You retain ownership of any content you submit through our Services.
                By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce,
                modify, adapt, publish, translate, and distribute such content in connection with providing our
                Services.
              </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">3. Payments & Refunds</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>3.1 Fees:</strong> Some of our Services require payment of fees. All fees are stated in Indian
                Rupees and are inclusive of all applicable taxes unless otherwise stated.
              </p>
              <p>
                <strong>3.2 Payment Methods:</strong> We accept various payment methods as specified on our platform.
                You agree to provide accurate and complete payment information.
              </p>
              <p>
                <strong>3.3 Appointment Cancellations:</strong> Our cancellation policy is as follows:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>
                  Cancellations made more than 24 hours before the scheduled appointment time will receive a full refund
                </li>
                <li>
                  Cancellations made between 12-24 hours before the scheduled appointment time will receive a 50% refund
                </li>
                <li>
                  Cancellations made less than 12 hours before the scheduled appointment time will not be refunded
                </li>
                <li>If a doctor cancels an appointment, you will receive a full refund or the option to reschedule</li>
              </ul>
              <p>
                <strong>3.4 Refund Processing:</strong> Refunds will be processed to the original payment method and may
                take 5-7 business days to appear in your account, depending on your payment provider.
              </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">4. Intellectual Property</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>4.1 Medibook Content:</strong> The Services and their entire contents, features, and
                functionality (including but not limited to all information, software, text, displays, images, video,
                and audio, and the design, selection, and arrangement thereof) are owned by Medibook, its licensors, or
                other providers of such material and are protected by copyright, trademark, patent, trade secret, and
                other intellectual property or proprietary rights laws.
              </p>
              <p>
                <strong>4.2 License to Use:</strong> Subject to your compliance with these Terms, Medibook grants you a
                limited, non-exclusive, non-transferable, revocable license to access and use the Services for your
                personal, non-commercial use.
              </p>
              <p>
                <strong>4.3 Restrictions:</strong> You may not:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>
                  Reproduce, distribute, modify, create derivative works of, publicly display, publicly perform,
                  republish, download, store, or transmit any of the material on our Services
                </li>
                <li>
                  Delete or alter any copyright, trademark, or other proprietary rights notices from copies of materials
                  from the Services
                </li>
                <li>
                  Access or use for any commercial purposes any part of the Services or any services or materials
                  available through the Services
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">5. Limitations & Disclaimers</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>5.1 Disclaimer of Warranties:</strong> YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. THE
                SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER
                EXPRESS OR IMPLIED.
              </p>
              <p>
                <strong>5.2 Healthcare Disclaimer:</strong> Medibook does not provide medical advice, diagnosis, or
                treatment. The content provided through our Services is for informational purposes only. Your reliance
                on any information provided by Medibook, Medibook employees, healthcare providers on our platform, or
                other visitors to our Services is solely at your own risk.
              </p>
              <p>
                <strong>5.3 Limitation of Liability:</strong> TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO
                EVENT WILL Medibook OR ITS AFFILIATES, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE
                LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE,
                OR INABILITY TO USE, THE SERVICES.
              </p>
              <p>
                <strong>5.4 Indemnification:</strong> You agree to defend, indemnify, and hold harmless Medibook and its
                affiliates, licensors, and service providers, and its and their respective officers, directors,
                employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any
                claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable
                attorneys' fees) arising out of or relating to your violation of these Terms or your use of the
                Services.
              </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">6. Dispute Resolution</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>6.1 Governing Law:</strong> These Terms and your use of the Services shall be governed by and
                construed in accordance with the laws of India, without giving effect to any choice or conflict of law
                provision or rule.
              </p>
              <p>
                <strong>6.2 Dispute Resolution:</strong> Any legal action or proceeding arising out of or related to
                these Terms or the Services shall be instituted exclusively in the courts located in New Delhi, India,
                and you waive any objection to jurisdiction or venue in such courts.
              </p>
              <p>
                <strong>6.3 Informal Resolution:</strong> Before filing a claim against Medibook, you agree to try to
                resolve the dispute informally by contacting us. We'll try to resolve the dispute informally by
                contacting you via email. If a dispute is not resolved within 30 days of submission, you or Medibook may
                bring a formal proceeding.
              </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">7. General Provisions</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>7.1 Changes to Terms:</strong> We may revise and update these Terms from time to time at our
                sole discretion. All changes are effective immediately when we post them. Your continued use of the
                Services following the posting of revised Terms means that you accept and agree to the changes.
              </p>
              <p>
                <strong>7.2 Entire Agreement:</strong> These Terms, our Privacy Policy, and any other agreements
                expressly incorporated by reference herein constitute the sole and entire agreement between you and
                Medibook regarding the Services and supersede all prior and contemporaneous understandings, agreements,
                representations, and warranties.
              </p>
              <p>
                <strong>7.3 Waiver:</strong> No waiver by Medibook of any term or condition set out in these Terms shall
                be deemed a further or continuing waiver of such term or condition or a waiver of any other term or
                condition, and any failure of Medibook to assert a right or provision under these Terms shall not
                constitute a waiver of such right or provision.
              </p>
              <p>
                <strong>7.4 Severability:</strong> If any provision of these Terms is held by a court or other tribunal
                of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall
                be eliminated or limited to the minimum extent such that the remaining provisions of the Terms will
                continue in full force and effect.
              </p>
            </div>
          </motion.div>
        </section>
        <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Questions About Our Terms?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              If you have any questions about these Terms of Service, please contact our support team.
            </p>
            <div className="flex justify-center">
              <a
                href="/contact-us"
                className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Contact Support
              </a>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default TermsOfService

