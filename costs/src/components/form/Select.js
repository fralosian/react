import styles from './Select.module.css' // Importa os estilos específicos para o componente Select

// Define o componente funcional Select
function Select({ text, name, options, handleOnChange, value }) {
    return (
        <div className={styles.form_control}> {/* Aplica a classe CSS form_control ao div que envolve o rótulo e o select */}
            <label htmlFor={name}>{text}</label> {/* Renderiza um rótulo para o select, associando-o ao id do select */}
            <select
                name={name} // Define o nome do select, usado para associar o rótulo ao select e para identificação
                id={name} // Define o id do select para associá-lo ao rótulo
                onChange={handleOnChange} // Define a função a ser chamada quando a seleção mudar
                value={value || ''} // Define o valor selecionado, com fallback para uma string vazia se value não estiver definido
            >
                <option>Selecione uma opção</option> {/* Opção padrão que instrui o usuário a selecionar uma opção */}
                {options.map((option) => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))} {/* Mapeia a lista de opções fornecida para criar elementos <option> */}
            </select>
        </div>
    )
}

export default Select // Exporta o componente para ser usado em outras partes do aplicativo
