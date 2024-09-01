import { useLocation } from "react-router-dom"; // Hook para acessar a localização atual
import Message from "../layout/Message"; // Importa o componente Message
import Container from "../layout/Container"; // Importa o componente Container
import Loading from "../layout/Loading"; // Importa o componente Loading
import LinkButton from "../layout/LinkButton"; // Importa o componente LinkButton
import ProjectCard from "../project/ProjectCard"; // Importa o componente ProjectCard

import { useState, useEffect } from "react"; // Importa hooks do React

function Projects() {
    const [projects, setProjects] = useState([]); // State para armazenar a lista de projetos
    const [removeLoading, setRemoveLoading] = useState(false); // State para controlar o estado de carregamento
    const [projectMessage, setProjectMessage] = useState(''); // State para armazenar mensagens de remoção

    const location = useLocation(); // Usa o hook useLocation para acessar informações sobre a rota atual
    let message = '';
    if (location.state) {
        message = location.state.message; // Verifica se há uma mensagem passada pela navegação anterior
    }

    // Hook useEffect para buscar os projetos da API quando o componente é montado
    useEffect(() => {
        setTimeout(() => { // Simula um atraso na resposta da API
            fetch('http://localhost:5000/projects', {
                method: 'GET', // Método GET para buscar dados
                headers: {
                    'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
                },
            })
                .then(resp => resp.json()) // Converte a resposta para JSON
                .then(data => {
                    console.log(data);
                    setProjects(data); // Atualiza o state com a lista de projetos recebida da API
                    setRemoveLoading(true); // Indica que o carregamento terminou
                })
                .catch(err => console.log(err)); // Captura e exibe erros, se houver
        }, 1000); // Adiciona atraso de 1 segundo
    }, []); // O array vazio significa que esse efeito roda apenas uma vez após o componente montar

    // Função para remover um projeto pelo id
    function removeProject(id) {
        setProjectMessage('');

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Erro ao excluir o projeto.');
                }
                return resp.json();
            })
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id));
                setProjectMessage('Projeto removido com sucesso!'); // Define a mensagem de sucesso na remoção
            })
            .catch((err) => {
                console.log(err);
                setProjectMessage('Erro ao remover o projeto.'); // Define mensagem de erro, se necessário
            });
    }

    // Renderiza a página de projetos
    return (
        <div className="w-full p-8">
            <div className="flex justify-between mb-8">
                <h1 className="text-3xl font-bold">Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" /> {/* Botão para criar um novo projeto */}
            </div>
            {message && <Message type="success" msg={message} />} {/* Exibe mensagem de sucesso se houver */}
            {projectMessage && <Message type="success" msg={projectMessage} />} {/* Exibe mensagem de remoção se houver */}
            <Container customClass="flex flex-wrap gap-4"> {/* Ajuste para flex e gap para a exibição dos projetos */}
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id} // Define a chave única para cada ProjectCard
                            handleRemove={removeProject} // Passa a função de remoção para o ProjectCard
                        />
                    ))
                ) : (
                    <p>Nenhum projeto encontrado. Clique em "Criar" para adicionar um novo projeto.</p>
                )}
                {!removeLoading && <Loading />} {/* Exibe o componente de carregamento enquanto os dados não são carregados */}
            </Container>

        </div>
    );
}

export default Projects; // Exporta o componente para ser usado em outras partes do aplicativo
