import styles from './Input.module.css' // Importa os estilos específicos para o componente Input

// Define o componente funcional Input
function Input({ type, text, name, placeholder, handleOnChange, value }) {
    return (
        <div className={styles.form_control}> {/* Aplica a classe CSS form_control ao div que envolve o rótulo e o input */}
            <label htmlFor={name}>{text}</label> {/* Renderiza um rótulo para o input, associando-o ao id do input */}
            <input
                type={type} // Define o tipo do input (texto, número, etc.)
                name={name} // Define o nome do input, que também é usado para associar o rótulo ao input
                id={name} // Define o id do input para associá-lo ao rótulo
                placeholder={placeholder} // Define o texto de espaço reservado (placeholder) no input
                onChange={handleOnChange} // Define a função a ser chamada quando o valor do input mudar
                value={value} // Define o valor atual do input, controlado pelo componente pai
            />
        </div>
    )
}

export default Input // Exporta o componente para ser usado em outras partes do aplicativo
