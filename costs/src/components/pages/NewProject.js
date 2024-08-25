import ProjectForm from '../project/ProjectForm' // Importa o componente ProjectForm
import styles from './NewProject.module.css' // Importa os estilos específicos para o componente
import { useNavigate } from 'react-router-dom' // Importa o hook useNavigate para navegação programática

// Define o componente funcional NewProject
function NewProject() {
    const navigate = useNavigate() // Inicializa o hook useNavigate para permitir redirecionamentos

    // Função para criar um novo projeto
    function createPost(project) {
        // Inicializa o custo e os serviços do projeto
        project.cost = 0
        project.services = []

        // Faz uma requisição POST para adicionar o novo projeto ao banco de dados
        fetch('http://localhost:5000/projects', {
            method: 'POST', // Método POST para enviar dados
            headers: {
                'Content-type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(project), // Converte o objeto projeto para JSON antes de enviar
        })
            .then((resp) => resp.json()) // Converte a resposta para JSON
            .then((data) => {
                console.log(data) // Exibe os dados do projeto criado no console
                // Redireciona para a página de projetos com uma mensagem de sucesso
                const state = { message: "Projeto criado com sucesso!" };
                navigate("/projects", { state }); // Navega para "/projects" e passa a mensagem via state
            })
            .catch(err => console.log(err)) // Captura e exibe erros, se houver
    }

    // Renderiza o formulário de criação de novo projeto
    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" /> {/* Passa a função createPost como prop para o ProjectForm */}
        </div>
    )
}

export default NewProject // Exporta o componente para ser usado em outras partes do aplicativo
