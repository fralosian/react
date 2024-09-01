function SubmitButton({ text }) {
    return (
        <div>
            <button className="bg-gray-800 text-white py-3 px-5 transition duration-500 cursor-pointer border-none hover:text-yellow-400">
                {text}
            </button>
        </div>
    )
}

export default SubmitButton
