import { useEffect, useState } from 'react'

import Input from '../form/Input.js'
import Select from '../form/Select.js'
import SubmitButton from '../form/SubmitButton.js'
import styles from './ProjectForm.module.css'

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
    const [errors, setErrors] = useState({})

    // request para a API
    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch(err => console.log(err))
    }, [])

    const validate = () => {
        let tempErrors = {}

        if (!project.name) tempErrors.name = "O nome do projeto é obrigatório."
        if (!project.budget) tempErrors.budget = "O orçamento do projeto é obrigatório."
        if (!project.category || !project.category.id) tempErrors.category = "A categoria do projeto é obrigatória."

        setErrors(tempErrors)
        return Object.keys(tempErrors).length === 0
    }

    const submit = (e) => {
        e.preventDefault()

        if (validate()) {
            handleSubmit(project)
        } else {
            console.log("Formulário contém erros.")
        }
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }

    function handleCloseError(key) {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors }
            delete newErrors[key]
            return newErrors
        })
    }
    //fecha mensagens de erro apos 3s
    useEffect(() => {
        const timer = setTimeout(() => {
            setErrors({})
        }, 3000);

        return () => clearTimeout(timer);
    }, [errors])

    return (
        <form onSubmit={submit} className={styles.form}>
            {Object.keys(errors).length > 0 && (
                <div className={styles.error_wrapper}>
                    {errors.name && <p className={styles.error}>{errors.name}<button className={styles.close_error} onClick={() => handleCloseError('name')}>&times;</button></p>}
                    {errors.category && <p className={styles.error}>{errors.category}<button className={styles.close_error} onClick={() => handleCloseError('category')}>&times;</button></p>}
                    {errors.budget && <p className={styles.error}>{errors.budget}<button className={styles.close_error} onClick={() => handleCloseError('budget')}>&times;</button></p>}
                </div>
            )
            }
            <Input
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText} />
        </form >
    )
}

export default ProjectForm

