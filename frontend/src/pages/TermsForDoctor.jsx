import { useEffect } from "react"
import { motion } from "framer-motion"
import { FaCheckCircle, FaExclamationTriangle, FaUserMd, FaLock, FaFileContract, FaMoneyBillWave } from "react-icons/fa"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const TermsForDoctor = () => {
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
        <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 py-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
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
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Terms for Doctors</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                Guidelines and policies for healthcare professionals on our platform
              </p>
            </motion.div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-gray-500 text-sm">Last Updated: March 15, 2023</p>
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
                Welcome to Medibook's Terms for Doctors. This document outlines the terms and conditions that govern
                your participation as a healthcare provider on our platform. By registering as a doctor on Medibook, you
                agree to abide by these terms.
              </p>
              <p className="text-lg text-gray-600">
                Please read these terms carefully before registering. If you do not agree with any part of these terms,
                you should not proceed with registration or use of our platform as a healthcare provider.
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
                icon: <FaUserMd className="text-blue-600 text-4xl mb-4" />,
                title: "Eligibility & Registration",
                description: "Requirements for joining our platform as a healthcare provider.",
              },
              {
                icon: <FaFileContract className="text-blue-600 text-4xl mb-4" />,
                title: "Service Standards",
                description: "Expected quality of care and professional conduct.",
              },
              {
                icon: <FaMoneyBillWave className="text-blue-600 text-4xl mb-4" />,
                title: "Fees & Payments",
                description: "Commission structure and payment processing details.",
              },
              {
                icon: <FaLock className="text-blue-600 text-4xl mb-4" />,
                title: "Data Privacy",
                description: "Responsibilities regarding patient data and confidentiality.",
              },
              {
                icon: <FaExclamationTriangle className="text-blue-600 text-4xl mb-4" />,
                title: "Dispute Resolution",
                description: "Process for handling complaints and disagreements.",
              },
              {
                icon: <FaCheckCircle className="text-blue-600 text-4xl mb-4" />,
                title: "Compliance",
                description: "Legal and regulatory requirements for healthcare providers.",
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">1. Eligibility & Registration</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>1.1 Professional Qualifications:</strong> To register as a doctor on Medibook, you must hold
                valid medical qualifications from recognized institutions and be licensed to practice medicine in your
                jurisdiction.
              </p>
              <p>
                <strong>1.2 Verification Process:</strong> All doctors must complete our verification process, which
                includes submitting copies of medical degrees, practice licenses, and other relevant documentation.
                Medibook reserves the right to verify these documents with the appropriate authorities.
              </p>
              <p>
                <strong>1.3 Registration Approval:</strong> Registration is subject to approval by Medibook's
                administrative team. We reserve the right to reject applications that do not meet our criteria or
                standards.
              </p>
              <p>
                <strong>1.4 Profile Information:</strong> You are responsible for providing accurate and up-to-date
                information in your profile, including your specialization, experience, consultation fees, and
                availability. Misrepresentation may result in termination of your account.
              </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">2. Service Standards</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>2.1 Quality of Care:</strong> You agree to provide the same standard of care to patients on
                Medibook as you would in a traditional in-person setting, adhering to medical ethics and best practices.
              </p>
              <p>
                <strong>2.2 Availability:</strong> You are expected to be available for appointments during the time
                slots you have designated as available on the platform. Repeated cancellations or no-shows may result in
                penalties.
              </p>
              <p>
                <strong>2.3 Response Time:</strong> You should respond to patient messages and appointment requests
                within 24 hours during business days.
              </p>
              <p>
                <strong>2.4 Professional Conduct:</strong> You must maintain professional behavior in all interactions
                with patients and Medibook staff. Harassment, discrimination, or unprofessional conduct will not be
                tolerated.
              </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">3. Fees & Payments</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>3.1 Commission Structure:</strong> Medibook charges a commission of 15% on each consultation
                fee. This commission covers the use of our platform, payment processing, and administrative services.
              </p>
              <p>
                <strong>3.2 Setting Consultation Fees:</strong> You have the freedom to set your own consultation fees
                within the minimum and maximum limits established by Medibook.
              </p>
              <p>
                <strong>3.3 Payment Processing:</strong> All payments are processed through our secure payment gateway.
                Funds will be transferred to your designated bank account within 7 business days after the consultation.
              </p>
              <p>
                <strong>3.4 Taxes:</strong> You are responsible for reporting and paying all applicable taxes on income
                earned through Medibook. We will provide necessary documentation for tax purposes.
              </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">4. Data Privacy</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>4.1 Patient Confidentiality:</strong> You must maintain the confidentiality of all patient
                information in accordance with applicable laws and medical ethics.
              </p>
              <p>
                <strong>4.2 Data Security:</strong> You agree to take reasonable measures to ensure the security of
                patient data, including using secure devices and connections when accessing the Medibook platform.
              </p>
              <p>
                <strong>4.3 Data Usage:</strong> Patient data should only be used for the purpose of providing medical
                care and must not be shared with third parties without explicit consent.
              </p>
              <p>
                <strong>4.4 Record Keeping:</strong> You are responsible for maintaining appropriate medical records of
                consultations conducted through Medibook, in accordance with legal and professional requirements.
              </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">5. Dispute Resolution</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>5.1 Patient Complaints:</strong> Medibook has a structured process for handling patient
                complaints. You agree to cooperate with investigations and respond to complaints in a timely manner.
              </p>
              <p>
                <strong>5.2 Mediation:</strong> In case of disputes between doctors and Medibook, both parties agree to
                attempt resolution through mediation before pursuing legal action.
              </p>
              <p>
                <strong>5.3 Arbitration:</strong> If mediation fails, disputes will be resolved through binding
                arbitration in accordance with the laws of [Jurisdiction].
              </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">6. Compliance</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>6.1 Legal Compliance:</strong> You must comply with all applicable laws, regulations, and
                professional standards related to medical practice in your jurisdiction.
              </p>
              <p>
                <strong>6.2 Platform Policies:</strong> You agree to adhere to Medibook's policies and guidelines, which
                may be updated from time to time.
              </p>
              <p>
                <strong>6.3 Prescription Policies:</strong> When prescribing medications through Medibook, you must
                follow all applicable laws and regulations regarding electronic prescriptions.
              </p>
              <p>
                <strong>6.4 Continuing Education:</strong> You are responsible for maintaining your professional
                licenses and completing any required continuing education.
              </p>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">7. Termination</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>7.1 Voluntary Termination:</strong> You may terminate your participation on Medibook by
                providing 30 days' written notice. You will be responsible for completing any scheduled appointments
                during this period.
              </p>
              <p>
                <strong>7.2 Involuntary Termination:</strong> Medibook reserves the right to terminate your account for
                violations of these terms, professional misconduct, or other reasons as determined by our administrative
                team.
              </p>
              <p>
                <strong>7.3 Effects of Termination:</strong> Upon termination, you will no longer have access to the
                Medibook platform as a provider. Any outstanding payments will be processed according to our standard
                schedule.
              </p>
            </div>
          </motion.div>
        </section>
        <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="bg-blue-50 p-8 rounded-2xl shadow-lg border border-blue-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceptance of Terms</h2>
            <p className="text-lg text-gray-600 mb-6">
              By registering as a doctor on Medibook, you acknowledge that you have read, understood, and agree to be
              bound by these terms. Medibook reserves the right to modify these terms at any time, and it is your
              responsibility to review them periodically for changes.
            </p>
            <div className="flex justify-center">
              <a
                href="/doctor/register"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Register as a Doctor
              </a>
            </div>
          </motion.div>
        </section>
        <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Questions About These Terms?</h2>
            <p className="text-lg text-gray-600 mb-6">
              If you have any questions or concerns about these terms, please contact our support team.
            </p>
            <a
              href="/contact-us"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
            >
              Contact Support
            </a>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default TermsForDoctor

