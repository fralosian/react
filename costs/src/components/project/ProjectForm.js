import { useEffect, useState } from 'react';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((resp) => resp.json())
            .then((data) => setCategories(data))
            .catch(err => console.log(err));
    }, []);

    const validate = () => {
        let tempErrors = {};

        if (!project.name) tempErrors.name = "O nome do projeto é obrigatório.";
        if (!project.budget) tempErrors.budget = "O orçamento do projeto é obrigatório.";
        if (!project.category || !project.category.id) tempErrors.category = "A categoria do projeto é obrigatória.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const submit = (e) => {
        e.preventDefault();

        if (validate()) {
            handleSubmit(project);
        } else {
            console.log("Formulário contém erros.");
        }
    };

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value });
    }

    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        });
    }

    function handleCloseError(key) {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[key];
            return newErrors;
        });
    }

    useEffect(() => {
        const timer = setTimeout(() => setErrors({}), 3000);

        return () => clearTimeout(timer);
    }, [errors]);

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg mt-10 ">
            {Object.keys(errors).length > 0 && (
                <div className="mb-6">
                    {errors.name && (
                        <div className="flex justify-between items-center text-red-700 bg-red-100 border border-red-300 p-4 mb-4 rounded">
                            <p>{errors.name}</p>
                            <button
                                className="bg-transparent border-none text-2xl cursor-pointer ml-auto"
                                onClick={() => handleCloseError('name')}
                            >
                                &times;
                            </button>
                        </div>
                    )}
                    {errors.category && (
                        <div className="flex justify-between items-center text-red-700 bg-red-100 border border-red-300 p-4 mb-4 rounded">
                            <p>{errors.category}</p>
                            <button
                                className="bg-transparent border-none text-2xl cursor-pointer ml-auto"
                                onClick={() => handleCloseError('category')}
                            >
                                &times;
                            </button>
                        </div>
                    )}
                    {errors.budget && (
                        <div className="flex justify-between items-center text-red-700 bg-red-100 border border-red-300 p-4 mb-4 rounded">
                            <p>{errors.budget}</p>
                            <button
                                className="bg-transparent border-none text-2xl cursor-pointer ml-auto"
                                onClick={() => handleCloseError('budget')}
                            >
                                &times;
                            </button>
                        </div>
                    )}
                </div>
            )}
            <form onSubmit={submit} className="space-y-6">
                <Input
                    type="text"
                    text="Nome do projeto"
                    name="name"
                    placeholder="Insira o nome do projeto"
                    handleOnChange={handleChange}
                    value={project.name || ''}
                />
                <Input
                    type="number"
                    text="Orçamento do projeto"
                    name="budget"
                    placeholder="Insira o orçamento total"
                    handleOnChange={handleChange}
                    value={project.budget || ''}
                />
                <Select
                    name="category_id"
                    text="Selecione a categoria"
                    options={categories}
                    handleOnChange={handleCategory}
                    value={project.category ? project.category.id : ''}
                />
                <SubmitButton text={btnText} />
            </form>
        </div>
    );
}

export default ProjectForm;
