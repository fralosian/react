import { useState, useEffect } from 'react'

function Message({ type, msg }) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!msg) {
            setVisible(false)
            return
        }
        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000);

        return () => clearTimeout(timer)
    }, [msg])

    return (
        <>
            {visible &&
                <div className={`w-full p-4 border mx-auto text-center mb-8 rounded ${type === 'success' ? 'text-green-800 bg-green-100 border-green-200' : 'text-red-800 bg-red-100 border-red-200'}`}>
                    {msg}
                </div>
            }
        </>
    )
}

export default Message
