import { Link } from "react-router-dom"
import {
  Users,
  Stethoscope,
  Calendar,
  CreditCard,
  DollarSign,
  IndianRupeeIcon as CurrencyRupee,
  Activity,
  User,
} from "lucide-react"

const StatCard = ({ title, value, icon, color, link }) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-200",
      icon: "text-blue-500",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-200",
      icon: "text-green-500",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      border: "border-purple-200",
      icon: "text-purple-500",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-200",
      icon: "text-red-500",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-200",
      icon: "text-yellow-500",
    },
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      border: "border-emerald-200",
      icon: "text-emerald-500",
    },
  }

  const classes = colorClasses[color] || colorClasses.blue

  const getIcon = () => {
    switch (icon) {
      case "users":
        return <Users size={24} />
      case "stethoscope":
        return <Stethoscope size={24} />
      case "calendar":
        return <Calendar size={24} />
      case "credit-card":
        return <CreditCard size={24} />
      case "dollar-sign":
        return <DollarSign size={24} />
      case "currency-rupee":
        return <CurrencyRupee size={24} />
      case "activity":
        return <Activity size={24} />
      case "user":
        return <User size={24} />
      default:
        return <Activity size={24} />
    }
  }

  const cardContent = (
    <>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${classes.bg} ${classes.icon}`}>{getIcon()}</div>
      </div>
      {link && <div className="mt-4 text-sm">View Details →</div>}
    </>
  )

  if (link) {
    return (
      <Link
        to={link}
        className={`p-6 rounded-lg border ${classes.border} ${classes.text} hover:shadow-md transition-shadow`}
      >
        {cardContent}
      </Link>
    )
  }

  return <div className={`p-6 rounded-lg border ${classes.border} ${classes.text}`}>{cardContent}</div>
}

export default StatCard