import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useColors } from '../layout/ColorContext'; // Certifique-se de que o caminho está correto

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

function Project() {
    const { id } = useParams();
    const colors = useColors(); // Use o hook para obter as cores

    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    const [editService, setEditService] = useState(null); // Novo estado para o serviço em edição
    const [editedServiceData, setEditedServiceData] = useState({ name: '', cost: '', description: '' }); // Dados do serviço em edição

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data);
                    setServices(data.services);
                })
                .catch((err) => console.log(err));
        }, 2000);
    }, [id]);

    function editPost(project) {
        setMessage('');

        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo');
            setType('error');
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setShowProjectForm(false);
                setMessage('Projeto atualizado com sucesso!');
                setType('success');
            })
            .catch((err) => {
                setMessage('Erro ao atualizar o projeto.');
                setType('error');
                console.log(err);
            });
    }

    function createService(project) {
        setMessage('');

        const lastService = project.services[project.services.length - 1];
        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if (newCost > parseFloat(project.budget)) {
            setMessage(null); // Reseta a mensagem temporariamente
            setTimeout(() => {
                setMessage('Orçamento ultrapassado, verifique o valor do serviço restante');
                setType('error');
            }, 0);

            project.services.pop(); // Remove o serviço adicionado
            return false;
        }

        project.cost = newCost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setServices(data.services); // Atualiza o estado dos serviços diretamente
                setShowServiceForm(false);
                setMessage(null); // Reseta a mensagem temporariamente
                setTimeout(() => {
                    setMessage('Serviço adicionado com sucesso!');
                    setType('success');
                }, 0);
            })
            .catch((err) => {
                console.log(err);
                setMessage('Erro ao atualizar o projeto.');
                setType('error');
            });
    }

    function removeService(id, cost) {
        setMessage('');

        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        );
        const projectUpdated = { ...project, services: servicesUpdated, cost: parseFloat(project.cost) - parseFloat(cost) };

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data); // Atualiza o estado com os dados retornados
                setServices(servicesUpdated); // Atualiza o estado dos serviços diretamente
                setMessage('Serviço removido com sucesso!');
                setType('success');
            })
            .catch((err) => console.log(err));
    }

    function startEditingService(service) {
        setEditService(service);
        setEditedServiceData({
            name: service.name,
            cost: service.cost,
            description: service.description,
        });
    }

    function cancelEditing() {
        setEditService(null);
    }

    function updateService(e) {
        e.preventDefault();
        setMessage('');

        const updatedService = {
            ...editService,
            name: editedServiceData.name,
            cost: editedServiceData.cost,
            description: editedServiceData.description,
        };

        const updatedServices = services.map(service =>
            service.id === updatedService.id ? updatedService : service
        );
        const updatedProject = { ...project, services: updatedServices, cost: updatedServices.reduce((acc, curr) => acc + parseFloat(curr.cost), 0) };

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProject),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setServices(updatedServices);
                setMessage('Serviço atualizado com sucesso!');
                setType('success');
                setEditService(null);
            })
            .catch((err) => {
                console.log(err);
                setMessage('Erro ao atualizar o serviço.');
                setType('error');
            });
    }

    function handleEditInputChange(e) {
        const { name, value } = e.target;
        setEditedServiceData({
            ...editedServiceData,
            [name]: value,
        });
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    // Obtenha a classe de cor baseada no nome da categoria
    const categoryColorClass = colors[`category-${project.category?.name.toLowerCase()}`] || 'bg-gray-300'; // Default color if category is not found

    return (
        <>
            {project.name ? (
                <div className="w-full p-8">
                    <h1 className="text-4xl font-bold mb-4 bg-gray-800 text-yellow-400 p-4 text-center rounded-md">
                        Projeto: {project.name}
                    </h1>
                    <div className="mb-4 p-4 bg-gray-800 text-yellow-400 rounded-md flex flex-col md:flex-row md:justify-between gap-4">
                        <p className="text-lg font-semibold text-left">Orçamento: R$ <span className="font-bold">{parseFloat(project.budget).toFixed(2)}</span></p>
                        <p className="text-lg font-semibold text-left">Gasto Atual: R$ <span className="font-bold">{parseFloat(project.cost).toFixed(2)}</span></p>
                        <p className="text-lg font-semibold text-left">Restante: R$ <span className="font-bold">{(parseFloat(project.budget) - parseFloat(project.cost)).toFixed(2)}</span></p>
                        <p className="text-lg font-semibold text-left">Categoria:
                            <span className="font-bold">
                                <span className={`w-4 h-4 rounded-full align-l inline-block mr-2 ${categoryColorClass}`}></span> {project.category?.name}
                            </span>
                        </p>
                    </div>

                    {message && <Message type={type} msg={message} />}
                    <div className="flex flex-col md:flex-row mb-8">
                        <div className="flex-1 mb-4 md:mb-0 md:mr-4">
                            <button className="bg-gray-800 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700 w-full" onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            </button>
                            {showProjectForm && (
                                <div className="mt-4">
                                    <ProjectForm handleSubmit={editPost} btnText={'Concluir edição'} projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <button className="bg-gray-800 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700 w-full" onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                            </button>
                            {showServiceForm && (
                                <div className="mt-4">
                                    <ServiceForm handleSubmit={createService} btnText='Adicionar Serviço' projectData={project} />
                                </div>
                            )}
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">Serviços</h2>
                    <Container customClass="start">
                        {services.length > 0 ? (
                            services.map(service => (
                                editService && editService.id === service.id ? (
                                    //form de edição
                                    <div key={service.id} className="mt-4">
                                        <form onSubmit={updateService} className="bg-white border border-gray-900 mb-4 p-4 rounded-md shadow-lg">
                                            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Editar Serviço</h3>
                                            <div className="mb-4">
                                                <label htmlFor="name" className="block ">Nome:</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={editedServiceData.name}
                                                    onChange={handleEditInputChange}
                                                    className="mt-1 block w-full border border-gray-800 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="cost" className="block ">Custo:</label>
                                                <input
                                                    type="number"
                                                    id="cost"
                                                    name="cost"
                                                    value={editedServiceData.cost}
                                                    onChange={handleEditInputChange}
                                                    className="mt-1 block w-full border border-gray-800 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="description" className="block ">Descrição:</label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    value={editedServiceData.description}
                                                    onChange={handleEditInputChange}
                                                    className="mt-1 block w-full border border-gray-800 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                                    required
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="flex items-center text-gray-800 border border-gray-800 p-2 hover:bg-gray-800 hover:text-yellow-400"
                                                >
                                                    Atualizar
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={cancelEditing}
                                                    className="flex items-center ml-4 text-red-600 border border-gray-800 p-2 hover:bg-gray-800 hover:text-red-200"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                ) : (
                                    <ServiceCard
                                        key={service.id}
                                        id={service.id} // Certifique-se de passar o id
                                        name={service.name} // Certifique-se de passar o name
                                        cost={service.cost} // Certifique-se de passar o cost
                                        description={service.description} // Certifique-se de passar a descrição
                                        handleRemove={() => removeService(service.id, service.cost)} // Função para remover o serviço
                                        handleEdit={() => startEditingService(service)} // Função para iniciar a edição do serviço
                                    />
                                )
                            ))
                        ) : (
                            <p>Nenhum serviço encontrado</p>
                        )}
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Project;
