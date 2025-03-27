import { useEffect } from "react"
import { motion } from "framer-motion"
import { FaHospital, FaUserMd, FaCalendarCheck, FaAward } from "react-icons/fa"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const AboutUs = () => {
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
        staggerChildren: 0.3,
      },
    },
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-blue-50 to-white pt-18 min-h-screen">
        <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 py-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute right-0 top-0 h-full w-1/2 transform translate-x-1/3 text-white opacity-20"
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
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">About Medibook</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                Revolutionizing healthcare access through technology and compassion
              </p>
            </motion.div>
          </div>
        </div>
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex flex-col md:flex-row items-center gap-10"
          >
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Medibook, our mission is to bridge the gap between patients and healthcare providers, making quality
                healthcare accessible to everyone. We believe that technology can transform the healthcare experience,
                making it more efficient, transparent, and patient-centered.
              </p>
              <p className="text-lg text-gray-600">
                We're committed to creating a platform that empowers patients to take control of their health journey
                while providing doctors with the tools they need to deliver exceptional care.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/mission.jpg"
                  alt="Healthcare professionals in a meeting"
                  className="w-full h-auto"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex items-end">
                  <div className="p-6">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Established 2023
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide everything we do at Medibook
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  icon: <FaUserMd className="text-blue-500 text-4xl mb-4" />,
                  title: "Excellence",
                  description:
                    "We strive for excellence in every aspect of our service, from technical performance to customer support.",
                },
                {
                  icon: <FaHospital className="text-blue-500 text-4xl mb-4" />,
                  title: "Accessibility",
                  description:
                    "We believe quality healthcare should be accessible to everyone, regardless of location or circumstance.",
                },
                {
                  icon: <FaCalendarCheck className="text-blue-500 text-4xl mb-4" />,
                  title: "Innovation",
                  description: "We continuously innovate to improve healthcare delivery and patient experiences.",
                },
                {
                  icon: <FaAward className="text-blue-500 text-4xl mb-4" />,
                  title: "Integrity",
                  description:
                    "We uphold the highest standards of integrity, privacy, and ethical conduct in all our operations.",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    {value.icon}
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The visionaries behind Medibook's mission to transform healthcare
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Chief Medical Officer",
                image:
                  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                bio: "Dr. Johnson brings over 15 years of clinical experience and healthcare innovation to Medibook.",
              },
              {
                name: "Michael Chen",
                role: "Chief Executive Officer",
                image:
                  "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                bio: "With a background in both healthcare and technology, Michael leads our vision for the future of digital health.",
              },
              {
                name: "Priya Patel",
                role: "Chief Technology Officer",
                image:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                bio: "Priya oversees our engineering team, ensuring our platform remains secure, scalable, and innovative.",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-blue-600 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">From idea to innovation: The story of Medibook</p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 z-0"></div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="relative z-10"
              >
                {[
                  {
                    year: "2020",
                    title: "The Idea",
                    description:
                      "Medibook was born from a simple idea: to make healthcare more accessible through technology.",
                  },
                  {
                    year: "2021",
                    title: "Development Begins",
                    description:
                      "Our team of developers, designers, and healthcare professionals began building the platform.",
                  },
                  {
                    year: "2022",
                    title: "Beta Launch",
                    description: "We launched our beta version with a select group of doctors and patients.",
                  },
                  {
                    year: "2023",
                    title: "Full Launch",
                    description:
                      "Medibook officially launched nationwide, connecting thousands of patients with healthcare providers.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className={`flex items-center mb-12 ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
                  >
                    <div className="w-1/2 px-4"></div>
                    <div className="z-20">
                      <div className="bg-blue-500 rounded-full h-12 w-12 flex items-center justify-center text-white font-bold">
                        {item.year}
                      </div>
                    </div>
                    <div className={`w-1/2 px-4 ${index % 2 === 0 ? "text-right" : ""}`}>
                      <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Join Us in Transforming Healthcare</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Whether you're a patient seeking care or a doctor looking to expand your practice, Medibook is here to
                help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/register"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium text-lg transition-colors duration-300"
                >
                  Sign Up as Patient
                </a>
                <a
                  href="/doctor/register"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-medium text-lg transition-colors duration-300"
                >
                  Join as Doctor
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

export default AboutUs

