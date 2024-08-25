import { useState, useEffect } from 'react' // Importa hooks do React

import styles from './Message.module.css' // Importa os estilos específicos para o componente Message

// Define o componente funcional Message
function Message({ type, msg }) {

    const [visible, setVisible] = useState(false) // State para controlar a visibilidade da mensagem

    // Hook useEffect para monitorar mudanças na mensagem (msg)
    useEffect(() => {
        if (!msg) { // Se não houver mensagem, torna a mensagem invisível e sai da função
            setVisible(false)
            return
        }
        setVisible(true) // Se houver mensagem, torna-a visível

        // Define um timer para ocultar a mensagem após 3 segundos
        const timer = setTimeout(() => {
            setVisible(false) // Oculta a mensagem após o tempo definido
        }, 3000);

        return () => clearTimeout(timer) // Limpa o timer quando o componente é desmontado ou a mensagem muda

    }, [msg]) // O efeito depende de mudanças na mensagem (msg)

    // Renderiza a mensagem se estiver visível
    return (
        <>
            {visible &&
                <div className={`${styles.message} ${styles[type]}`}>{msg}</div> // Aplica classes CSS para estilizar a mensagem baseada no tipo e a exibe
            }
        </>
    )
}

export default Message // Exporta o componente para ser usado em outras partes do aplicativo
