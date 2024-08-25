import styles from './Contact.module.css'

function Contact() {
    return (
        <>
            <div className={styles.contact_container}>
                <div className={styles.contact_content}>
                    <h1>Contato</h1>
                    <p>
                        Entre em contato conosco para obter mais informações sobre o seu projeto.
                    </p>
                    <p> Nome: <span>Daniel Alves</span></p>
                    <p> Telefone: <span>(11) 94663-7999</span></p>
                    <p>  E-mail: <span>danielalvesdasilva1998@gmail.com</span></p>

                </div>
            </div >
        </>
    )
}

export default Contact