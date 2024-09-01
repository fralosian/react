import { Link } from "react-router-dom"

function LinkButton({ to, text }) {
    return (
        <Link
            className="bg-gray-900 text-white py-2 px-4 no-underline transition-colors duration-500 hover:text-yellow-400"
            to={to}
        >
            {text}
        </Link>
    )
}

export default LinkButton
