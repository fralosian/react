import styles from './ProjectCard.module.css' // Importa os estilos específicos para o componente
import { Link } from "react-router-dom"; // Importa o componente Link para navegação entre páginas

import { BsPencil, BsFillTrashFill } from 'react-icons/bs' // Importa ícones de edição e exclusão

// Define o componente funcional ProjectCard
function ProjectCard({ id, name, budget, category, handleRemove }) {

    // Função chamada ao clicar no botão de exclusão, previne o comportamento padrão e chama a função handleRemove
    const remove = (e) => {
        e.preventDefault() // Previne o comportamento padrão do formulário
        handleRemove(id) // Chama a função de remoção passando o id do projeto
    }

    // Renderiza o layout do cartão de projeto
    return (
        <div className={styles.project_card}>
            {/* Exibe o nome do projeto */}
            <h4>{name}</h4>
            {/* Exibe o orçamento do projeto */}
            <p>
                <span>Orçamento:</span> R$ {budget}
            </p>
            {/* Exibe a categoria do projeto com um estilo específico */}
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.project_card_actions}>
                {/* Link para a página de edição do projeto */}
                <Link to={`/project/${id}`}>
                    <BsPencil /> Editar
                </Link>
                {/* Botão para excluir o projeto */}
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div >
    )
}

export default ProjectCard // Exporta o componente para ser usado em outras partes do aplicativo
