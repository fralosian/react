function Input({ type, text, name, placeholder, handleOnChange, value }) {
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={name} className="mb-2 font-bold">{text}</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
        </div>
    )
}

export default Input
