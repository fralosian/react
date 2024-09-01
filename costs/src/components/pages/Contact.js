import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Adiciona o status "unread" e a data atual
        const messageToSend = { 
            ...formData, 
            status: 'unread', 
            date: new Date().toISOString() // Adiciona a data atual no formato ISO
        };

        fetch('http://localhost:5000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageToSend)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao enviar a mensagem.');
                }
                return response.json();
            })
            .then(data => {
                setFormData({ name: '', email: '', message: '' });
                setStatusMessage('Mensagem enviada com sucesso!');
                setIsError(false);
            })
            .catch(error => {
                setStatusMessage(error.message);
                setIsError(true);
            });
    };

    return (
        <div className="flex flex-col items-center p-8 md:p-16 w-full">
            <h1 className="text-4xl font-bold mb-8">Entre em Contato</h1>
            <div className="flex flex-col md:flex-row w-full max-w-4xl gap-8">
                {/* Formulário de Contato */}
                <form onSubmit={handleSubmit} className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Nos envie sua solicitação</h2>
                    {statusMessage && (
                        <div
                            className={`mb-4 p-4 rounded-md ${isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
                        >
                            {statusMessage}
                        </div>
                    )}
                    <label className="block mb-4">
                        <span className="text-gray-700">Nome</span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Seu Nome"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">E-mail</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Seu E-mail"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">Mensagem</span>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            rows="4"
                            placeholder="Sua Mensagem"
                            required
                        ></textarea>
                    </label>
                    <button
                        type="submit"
                        className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-md shadow hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        Enviar
                    </button>
                </form>

                {/* Card de Contato */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Informações de Contato</h2>
                    <p className="mb-4 text-gray-700">Entre em contato conosco para obter mais informações sobre o seu projeto.</p>
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <FaPhoneAlt className="text-yellow-400" />
                            <p className="text-gray-700">Telefone: <span className="font-bold">(11) 94663-7999</span></p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaEnvelope className="text-yellow-400" />
                            <p className="text-gray-700">E-mail: <span className="font-bold">danielalvesdasilva1998@gmail.com</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
