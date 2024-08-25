import { Link } from "react-router-dom" // Importa o componente Link para navegação interna
import Container from './Container' // Importa o componente Container para encapsular o conteúdo

import styles from './Navbar.module.css' // Importa os estilos específicos para o componente Navbar
import logo from '../../img/costs_logo.png' // Importa a imagem do logo

// Define o componente funcional Navbar
function Navbar() {
    return (
        <nav className={styles.navbar}> {/* Aplica a classe CSS navbar ao elemento <nav> */}
            <Container> {/* Usa o componente Container para centralizar o conteúdo da Navbar */}
                <Link to="/"> {/* Link para a página inicial */}
                    <img src={logo} alt="Costs" /> {/* Exibe o logo da aplicação com texto alternativo "Costs" */}
                </Link>
                <ul className={styles.list}> {/* Aplica a classe CSS list ao elemento <ul> */}
                    <li className={styles.item}> {/* Aplica a classe CSS item a cada <li> */}
                        <Link to="/">Home</Link> {/* Link para a página inicial */}
                    </li>
                    <li className={styles.item}>
                        <Link to="/projects">Projetos</Link> {/* Link para a página de projetos */}
                    </li>
                    <li className={styles.item}>
                        <Link to="/contact">Contato</Link> {/* Link para a página de contato */}
                    </li>
                    <li className={styles.item}>
                        <Link to="/company">Empresa</Link> {/* Link para a página da empresa */}
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar // Exporta o componente para ser usado em outras partes do aplicativo
