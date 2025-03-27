import { Link } from "react-router-dom"

const ChartCard = ({ title, children, link }) => {
  const cardContent = (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {link && <span className="text-primary-600 text-sm">View All →</span>}
      </div>
      <div className="p-2">{children}</div>
    </>
  )

  if (link) {
    return (
      <Link to={link} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        {cardContent}
      </Link>
    )
  }

  return <div className="bg-white rounded-lg shadow-md p-6">{cardContent}</div>
}

export default ChartCard

