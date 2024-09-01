import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

function Footer() {
    return (
        <footer className="bg-gray-900 text-white p-5 text-center">
            <ul className="flex justify-center list-none">
                <li className="mx-3 hover:text-yellow-400">
                    <FaFacebook className="text-2xl cursor-pointer" />
                </li>
                <li className="mx-3 hover:text-yellow-400">
                    <FaInstagram className="text-2xl cursor-pointer" />
                </li>
                <li className="mx-3 hover:text-yellow-400">
                    <a href="https://www.linkedin.com/in/danielalves-silva/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-2xl cursor-pointer" />
                    </a>
                </li>
            </ul>
            <p className="mt-5">
                <span className="font-bold text-yellow-400">Daniel Alves</span> &copy; 2024
            </p>
        </footer>
    )
}

export default Footer
