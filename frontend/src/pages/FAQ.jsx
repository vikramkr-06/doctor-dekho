import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  FaChevronDown,
  FaChevronUp,
  FaUserMd,
  FaCalendarAlt,
  FaCreditCard,
  FaUserShield,
  FaQuestionCircle,
  FaHeartbeat,
} from "react-icons/fa"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [expandedItems, setExpandedItems] = useState({})

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
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
        staggerChildren: 0.1,
      },
    },
  }

  const faqData = {
    general: [
      {
        id: "general-1",
        question: "What is Medibook?",
        answer:
          "Medibook is a comprehensive healthcare platform that connects patients with qualified doctors for online consultations and in-person appointments. Our platform makes it easy to find the right healthcare provider, book appointments, and manage your healthcare journey.",
      },
      {
        id: "general-2",
        question: "How do I create an account?",
        answer:
          'Creating an account is simple. Click on the "Sign Up" button in the top right corner of the homepage. Fill in your basic information like name, email, and password. Verify your email address through the confirmation link we send you, and your account will be ready to use.',
      },
      {
        id: "general-3",
        question: "Is my personal information secure?",
        answer:
          "Yes, we take data security very seriously. Medibook uses industry-standard encryption and security measures to protect your personal and medical information. We are compliant with healthcare data protection regulations and never share your information without your consent. For more details, please review our Privacy Policy.",
      },
      {
        id: "general-4",
        question: "Can I use Medibook on my mobile device?",
        answer:
          "Yes, Medibook is fully responsive and works on all devices including smartphones, tablets, laptops, and desktop computers. You can access all features through your web browser without needing to download an app.",
      },
    ],
    doctors: [
      {
        id: "doctors-1",
        question: "How are doctors verified on Medibook?",
        answer:
          "All doctors on our platform undergo a rigorous verification process. We verify their medical degrees, practice licenses, and professional experience. We also check their registration with relevant medical councils. Only after successful verification are doctors allowed to offer services through our platform.",
      },
      {
        id: "doctors-2",
        question: "Can I choose which doctor to consult with?",
        answer:
          "You can browse through our directory of doctors, filter by specialization, experience, ratings, and availability. Each doctor has a detailed profile with their qualifications, experience, and patient reviews to help you make an informed decision.",
      },
      {
        id: "doctors-3",
        question: "What specialties do your doctors cover?",
        answer:
          "Medibook has doctors across a wide range of specialties including but not limited to General Medicine, Pediatrics, Dermatology, Orthopedics, Gynecology, Cardiology, Neurology, Psychiatry, Ophthalmology, ENT, and more. You can use our search filters to find specialists for your specific health concerns.",
      },
      {
        id: "doctors-4",
        question: "How do I become a doctor on Medibook?",
        answer:
          'If you are a qualified healthcare professional interested in joining our platform, click on the "Join as Doctor" link at the bottom of our homepage. You\'ll need to complete a registration form and submit your professional credentials for verification. Our team will review your application and get back to you within 5-7 business days.',
      },
    ],
    appointments: [
      {
        id: "appointments-1",
        question: "How do I book an appointment?",
        answer:
          "To book an appointment, first search for doctors based on specialty or health concern. Select a doctor from the results, view their profile and available time slots. Choose a convenient date and time, select your payment method, and confirm your booking. You'll receive a confirmation email with all the details.",
      },
      {
        id: "appointments-2",
        question: "Can I reschedule or cancel my appointment?",
        answer:
          'Yes, you can reschedule or cancel appointments through your account dashboard. Go to "My Appointments," find the appointment you wish to change, and click on "Reschedule" or "Cancel." Please note that our cancellation policy applies, which may affect refund eligibility depending on how close to the appointment time you cancel.',
      },
      {
        id: "appointments-3",
        question: "What happens if I miss my appointment?",
        answer:
          'If you miss your scheduled appointment without prior cancellation, it will be marked as a "no-show" in your account. No-shows are generally not eligible for refunds. If there were extenuating circumstances, please contact our customer support team within 24 hours of the missed appointment.',
      },
      {
        id: "appointments-4",
        question: "How long are the consultation sessions?",
        answer:
          "Standard consultation sessions are 15-30 minutes, depending on the doctor's schedule and the nature of the consultation. For more complex cases, some doctors offer extended consultation options of 45-60 minutes at a different rate. The duration is clearly indicated when you book the appointment.",
      },
    ],
    payments: [
      {
        id: "payments-1",
        question: "What payment methods do you accept?",
        answer:
          "We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), net banking, UPI, and popular digital wallets. All payments are processed securely through our payment gateway partner, Razorpay.",
      },
      {
        id: "payments-2",
        question: "How does your refund policy work?",
        answer:
          "Refunds are processed according to our cancellation policy: full refund for cancellations more than 24 hours before the appointment, 50% refund for cancellations between 12-24 hours, and no refund for cancellations less than 12 hours before the appointment. If a doctor cancels, you'll receive a full refund or the option to reschedule.",
      },
      {
        id: "payments-3",
        question: "Are there any hidden fees?",
        answer:
          "No, there are no hidden fees. The price you see when booking an appointment is the final amount you'll pay. This includes our platform fee and the doctor's consultation fee. Any applicable taxes are also included in the displayed price.",
      },
      {
        id: "payments-4",
        question: "How do I get an invoice for my consultation?",
        answer:
          'Invoices are automatically generated and sent to your registered email address after each successful payment. You can also download invoices for all your past consultations from the "Payment History" section in your account dashboard.',
      },
    ],
    technical: [
      {
        id: "technical-1",
        question: "What are the technical requirements for video consultations?",
        answer:
          "For video consultations, you need a device (computer, tablet, or smartphone) with a working camera and microphone, a stable internet connection (minimum 1 Mbps, recommended 3+ Mbps), and an updated browser (Chrome, Firefox, Safari, or Edge). We'll automatically test your setup before the consultation begins.",
      },
      {
        id: "technical-2",
        question: "What if I face technical issues during a consultation?",
        answer:
          "If you experience technical difficulties during a video consultation, first try refreshing your browser. If problems persist, you can switch to an audio-only mode which requires less bandwidth. Our system also provides a chat option as a backup. For major disruptions, contact our support team, and we may reschedule your appointment if needed.",
      },
      {
        id: "technical-3",
        question: "Is the video consultation platform secure?",
        answer:
          "Yes, our video consultation platform uses end-to-end encryption to ensure your conversation with the doctor remains private and secure. We do not record or store video consultations, and all data transmission complies with healthcare security standards.",
      },
      {
        id: "technical-4",
        question: "Can I access my medical records on Medibook?",
        answer:
          'Yes, all your consultation summaries, prescriptions, and medical advice provided through our platform are securely stored in your account. You can access them anytime from the "Medical Records" section in your dashboard. You can also upload previous medical records to share with doctors during consultations.',
      },
    ],
    medical: [
      {
        id: "medical-1",
        question: "Is online consultation as effective as in-person visits?",
        answer:
          "Online consultations are effective for many conditions, especially follow-ups, routine care, and initial assessments. However, they have limitations. Our doctors will honestly advise if your condition requires an in-person examination, laboratory tests, or emergency care. We prioritize patient safety and appropriate care above all.",
      },
      {
        id: "medical-2",
        question: "Can doctors prescribe medications through Medibook?",
        answer:
          "Yes, doctors can prescribe medications through our platform where legally permitted. However, there are restrictions on prescribing certain controlled substances and medications that require in-person evaluation. All prescriptions are digitally signed and can be downloaded from your account or sent directly to your preferred pharmacy.",
      },
      {
        id: "medical-3",
        question: "What happens if I need a specialist not available on Medibook?",
        answer:
          "If you need a specialist not currently available on our platform, our general practitioners can provide referrals to appropriate specialists in your area. We're continuously expanding our network of specialists to better serve our patients' needs.",
      },
      {
        id: "medical-4",
        question: "Is Medibook suitable for emergencies?",
        answer:
          "No, Medibook is NOT designed for emergency situations. If you're experiencing a medical emergency such as severe chest pain, difficulty breathing, severe bleeding, or loss of consciousness, please call emergency services (102/108/112) immediately or go to your nearest emergency room.",
      },
    ],
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pt-18">
        <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 py-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
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
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Frequently Asked Questions</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                Find answers to common questions about Medibook's services
              </p>
            </motion.div>
          </div>
        </div>

        <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="relative"
          >
            <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
              <div className="pl-5">
                <FaQuestionCircle className="text-blue-500 text-xl" />
              </div>
              <input
                type="text"
                placeholder="Search for questions..."
                className="w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 transition-colors duration-300">
                Search
              </button>
            </div>
          </motion.div>
        </section>
        <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {[
              {
                icon: <FaQuestionCircle className="text-blue-500 text-2xl mb-2" />,
                title: "General",
                target: "#general",
              },
              { icon: <FaUserMd className="text-blue-500 text-2xl mb-2" />, title: "Doctors", target: "#doctors" },
              {
                icon: <FaCalendarAlt className="text-blue-500 text-2xl mb-2" />,
                title: "Appointments",
                target: "#appointments",
              },
              {
                icon: <FaCreditCard className="text-blue-500 text-2xl mb-2" />,
                title: "Payments",
                target: "#payments",
              },
              {
                icon: <FaUserShield className="text-blue-500 text-2xl mb-2" />,
                title: "Technical",
                target: "#technical",
              },
              { icon: <FaHeartbeat className="text-blue-500 text-2xl mb-2" />, title: "Medical", target: "#medical" },
            ].map((category, index) => (
              <motion.a
                key={index}
                href={category.target}
                variants={fadeIn}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
              >
                {category.icon}
                <h3 className="font-medium text-gray-800">{category.title}</h3>
              </motion.a>
            ))}
          </motion.div>
        </section>
        <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            id="general"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <FaQuestionCircle className="text-blue-500 text-3xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">General Questions</h2>
            </div>

            <motion.div variants={staggerContainer} className="space-y-4">
              {faqData.general.map((item) => (
                <motion.div key={item.id} variants={fadeIn} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleItem(item.id)}
                  >
                    <span className="font-medium text-lg text-gray-800">{item.question}</span>
                    {expandedItems[item.id] ? (
                      <FaChevronUp className="text-blue-500" />
                    ) : (
                      <FaChevronDown className="text-blue-500" />
                    )}
                  </button>

                  {expandedItems[item.id] && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            id="doctors"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <FaUserMd className="text-blue-500 text-3xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Doctor-Related Questions</h2>
            </div>

            <motion.div variants={staggerContainer} className="space-y-4">
              {faqData.doctors.map((item) => (
                <motion.div key={item.id} variants={fadeIn} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleItem(item.id)}
                  >
                    <span className="font-medium text-lg text-gray-800">{item.question}</span>
                    {expandedItems[item.id] ? (
                      <FaChevronUp className="text-blue-500" />
                    ) : (
                      <FaChevronDown className="text-blue-500" />
                    )}
                  </button>

                  {expandedItems[item.id] && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            id="appointments"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <FaCalendarAlt className="text-blue-500 text-3xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Appointment Questions</h2>
            </div>

            <motion.div variants={staggerContainer} className="space-y-4">
              {faqData.appointments.map((item) => (
                <motion.div key={item.id} variants={fadeIn} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleItem(item.id)}
                  >
                    <span className="font-medium text-lg text-gray-800">{item.question}</span>
                    {expandedItems[item.id] ? (
                      <FaChevronUp className="text-blue-500" />
                    ) : (
                      <FaChevronDown className="text-blue-500" />
                    )}
                  </button>

                  {expandedItems[item.id] && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            id="payments"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <FaCreditCard className="text-blue-500 text-3xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Payment Questions</h2>
            </div>

            <motion.div variants={staggerContainer} className="space-y-4">
              {faqData.payments.map((item) => (
                <motion.div key={item.id} variants={fadeIn} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleItem(item.id)}
                  >
                    <span className="font-medium text-lg text-gray-800">{item.question}</span>
                    {expandedItems[item.id] ? (
                      <FaChevronUp className="text-blue-500" />
                    ) : (
                      <FaChevronDown className="text-blue-500" />
                    )}
                  </button>

                  {expandedItems[item.id] && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            id="technical"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <FaUserShield className="text-blue-500 text-3xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Technical Questions</h2>
            </div>

            <motion.div variants={staggerContainer} className="space-y-4">
              {faqData.technical.map((item) => (
                <motion.div key={item.id} variants={fadeIn} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleItem(item.id)}
                  >
                    <span className="font-medium text-lg text-gray-800">{item.question}</span>
                    {expandedItems[item.id] ? (
                      <FaChevronUp className="text-blue-500" />
                    ) : (
                      <FaChevronDown className="text-blue-500" />
                    )}
                  </button>

                  {expandedItems[item.id] && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            id="medical"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <FaHeartbeat className="text-blue-500 text-3xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Medical Questions</h2>
            </div>

            <motion.div variants={staggerContainer} className="space-y-4">
              {faqData.medical.map((item) => (
                <motion.div key={item.id} variants={fadeIn} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleItem(item.id)}
                  >
                    <span className="font-medium text-lg text-gray-800">{item.question}</span>
                    {expandedItems[item.id] ? (
                      <FaChevronUp className="text-blue-500" />
                    ) : (
                      <FaChevronDown className="text-blue-500" />
                    )}
                  </button>

                  {expandedItems[item.id] && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Still Have Questions?</h2>
              <p className="text-xl text-gray-600 mb-8">
                If you couldn't find the answer to your question, our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact-us"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
                >
                  Contact Support
                </a>
                <a
                  href="tel:+919876543210"
                  className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-colors duration-300"
                >
                  Call Helpline
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default FAQ

