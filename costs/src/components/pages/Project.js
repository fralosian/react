import { v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css' // Importa os estilos específicos para o componente

import { useParams } from 'react-router-dom' // Importa o hook useParams para acessar parâmetros da rota
import { useState, useEffect } from 'react' // Importa hooks do React

import Loading from '../layout/Loading' // Importa o componente Loading para indicar carregamento
import Container from '../layout/Container' // Importa o componente Container para layout
import ProjectForm from '../project/ProjectForm' // Importa o componente ProjectForm para o formulário de edição
import Message from '../layout/Message' // Importa o componente Message para exibir mensagens ao usuário
import ServiceForm from '../service/ServiceForm' // Importa o componente ServiceForm para o formulário de adição de serviços
import ServiceCard from '../service/ServiceCard' // Importa o componente ServiceCard para o card de serviço


// Define o componente funcional Project
function Project() {

    const { id } = useParams() // Extrai o parâmetro 'id' da URL usando useParams

    const [project, setProject] = useState([]) // State para armazenar os dados do projeto
    const [services, setServices] = useState([]) // State para armazenar os dados dos serviços
    const [showProjectForm, setShowProjectForm] = useState(false) // State para controlar a visibilidade do formulário de edição do projeto
    const [showServiceForm, setShowServiceForm] = useState(false) // State para controlar a visibilidade do formulário de adição de serviços
    const [message, setMessage] = useState() // State para armazenar mensagens de sucesso ou erro
    const [type, setType] = useState() // State para armazenar o tipo de mensagem (sucesso ou erro)

    // Hook useEffect para buscar os dados do projeto da API quando o componente é montado ou quando o 'id' muda
    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, { // Faz uma requisição GET para buscar o projeto com o id específico
                method: 'GET', // Método GET para buscar dados
                headers: {
                    'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
                },
            })
                .then((resp) => resp.json()) // Converte a resposta para JSON
                .then((data) => {
                    setProject(data) // Atualiza o state com os dados do projeto recebidos da API
                    setServices(data.services) // Atualiza o state com os dados dos serviços do projeto
                })
                .catch((err) => console.log) // Captura e exibe erros, se houver
        }, 2000)
    }, [id]) // Dependência 'id' para refazer a busca sempre que o id mudar

    // Função para editar o projeto existente
    function editPost(project) {
        setMessage('') // Limpa qualquer mensagem existente

        // Valida se o orçamento do projeto é maior ou igual ao custo
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo') // Define mensagem de erro
            setType('error') // Define o tipo de mensagem como erro
            return false // Interrompe a função se a validação falhar
        }

        // Faz uma requisição PATCH para atualizar os dados do projeto
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH', // Método PATCH para atualizar parcialmente os dados
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project), // Converte o projeto para JSON
        })
            .then((resp) => resp.json()) // Converte a resposta para JSON
            .then((data) => {
                setProject(data) // Atualiza o state com os dados do projeto atualizados
                setShowProjectForm(false) // Oculta o formulário de edição
                setMessage('Projeto atualizado com sucesso!') // Define mensagem de sucesso
                setType('success') // Define o tipo de mensagem como sucesso
            })
            .catch((err) => {
                setMessage('Erro ao atualizar o projeto.') // Define mensagem de erro em caso de falha
                setType('error') // Define o tipo de mensagem como erro
                console.log(err) // Exibe o erro no console
            })
    }
    function createService(project) {
        // Reseta a mensagem antes de iniciar o processo
        setMessage('');

        // Último serviço
        const lastService = project.services[project.services.length - 1];

        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        // Validação: valor máximo do orçamento  
        if (newCost > parseFloat(project.budget)) {
            setMessage(null); // Reseta a mensagem temporariamente
            setTimeout(() => {
                setMessage('Orçamento ultrapassado, verifique o valor do serviço restante');
                setType('error');
            }, 0);

            project.services.pop(); // Remove o serviço adicionado
            return false;
        }

        // Adicionar service cost ao custo total
        project.cost = newCost;

        // Atualizar projeto
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
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
        setMessage('')

        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )
        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(projectUpdated)
                setServices(servicesUpdated)
                setMessage('Serviço removido com sucesso!')
                setType('success')
            }).catch((err) => console.log(err))
    }
    // Função para alternar a visibilidade do formulário de edição do projeto
    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm) // Inverte o estado de visibilidade do formulário
    }

    // Função para alternar a visibilidade do formulário de adição de serviços
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm) // Inverte o estado de visibilidade do formulário de serviços
    }

    // Retorna o JSX do componente
    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p><span>Categoria: </span>{project.category.name}</p>
                                    <p><span>Total de orçamento:</span> R${project.budget}</p>
                                    <p><span>Total Utilizado:</span> R${project.cost}</p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editPost} // Passa a função de edição como prop
                                        btnText={'Concluir edição'} // Texto do botão
                                        projectData={project} // Passa os dados do projeto como prop
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (<ServiceForm
                                    handleSubmit={createService}
                                    btnText='Adicionar Serviço'
                                    projectData={project}
                                />
                                )
                                }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {
                                services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            }
                            {
                                services.length === 0 &&
                                <p>Não há Serviços cadastrados</p>
                            }
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading /> // Exibe o componente de carregamento se os dados do projeto ainda não foram carregados
            )}
        </>
    )
}

export default Project // Exporta o componente para ser usado em outras partes do aplicativo
