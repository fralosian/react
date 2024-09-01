import { useState, useEffect } from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';

function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all'); // Estado para o filtro
    const [sortOrder, setSortOrder] = useState('desc'); // Estado para a ordem de classificação

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = () => {
        setLoading(true);
        fetch('http://localhost:5000/messages')
            .then((response) => response.json())
            .then((data) => {
                setMessages(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/messages/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setMessages(messages.filter(message => message.id !== id));
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleMarkAsRead = (id) => {
        fetch(`http://localhost:5000/messages/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'read' }),
        })
            .then(() => {
                setMessages(messages.map(message =>
                    message.id === id ? { ...message, status: 'read' } : message
                ));
            })
            .catch((error) => console.error('Error:', error));
    };

    const filteredMessages = messages.filter(message => {
        if (filter === 'all') return true;
        return filter === 'read' ? message.status === 'read' : message.status === 'unread';
    });

    const sortedMessages = filteredMessages.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return (
        <div className="p-8 w-full">
            <h1 className="text-4xl font-bold mb-8">Mensagens Enviadas</h1>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2"
                >
                    <option value="all">Todos</option>
                    <option value="unread">Não Lidas</option>
                    <option value="read">Lidas</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2"
                >
                    <option value="desc">Mais Recentes</option>
                    <option value="asc">Mais Antigas</option>
                </select>

                <button
                    onClick={fetchMessages}
                    className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-md shadow hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                    Atualizar
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="flex flex-col gap-8">
                    {sortedMessages.length > 0 ? (
                        sortedMessages.map((message) => (
                            <div key={message.id} className={`bg-white p-6 rounded-lg shadow-lg flex flex-col ${message.status === 'read' ? 'opacity-50' : ''}`}>
                                <h2 className="text-2xl font-semibold mb-2">{message.name}</h2>
                                <p className="text-gray-700 mb-2"><strong>Email:</strong> {message.email}</p>
                                <p className="text-gray-700 mb-2"><strong>Mensagem:</strong> {message.message}</p>
                                <p className="text-gray-500 mb-4"><strong>Data:</strong> {new Date(message.date).toLocaleString()}</p>
                                <div className="flex gap-4">
                                    {message.status === 'unread' && (
                                        <button onClick={() => handleMarkAsRead(message.id)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
                                            <FaEye className="mr-2" /> Marcar como lida
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(message.id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center"
                                    >
                                        <FaTrash className="mr-2" /> Excluir
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-700">Nenhuma mensagem encontrada.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Messages;
