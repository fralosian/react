import styles from './Company.module.css'

function Company() {
    return (
        <section className={styles.company_container}>
            <div className={styles.company_image}>
                <img src="https://picsum.photos/seed/picsum/400/400" alt="logo" />
            </div>
            <div className={styles.company_content}>
                <h1>Empresa</h1>
                <div className={styles.company_pages}>
                    <section id="mission" className={styles.company_page}>
                        <h2>Missão</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam quis risus nec lectus ultrices malesuada. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                    </section>
                    <section id="vision" className={styles.company_page}>
                        <h2>Visão</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam quis risus nec lectus ultrices malesuada. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                    </section>
                    <section id="values" className={styles.company_page}>
                        <h2>Valores</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam quis risus nec lectus ultrices malesuada. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                    </section>
                </div>
            </div>
        </section>
    )
}

export default Company
