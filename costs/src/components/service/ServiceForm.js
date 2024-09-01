import { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

function ServiceForm({ handleSubmit, btnText, projectData }) {
    const [service, setService] = useState({})
    const [errors, setErrors] = useState({})

    function validate() {
        const errors = {}
        if (!service.name) {
            errors.name = 'Nome do serviço é obrigatório'
        }
        if (!service.cost) {
            errors.cost = 'Custo do serviço é obrigatório'
        }
        return errors
    }

    function submit(e) {
        e.preventDefault()

        const errors = validate()
        if (Object.keys(errors).length > 0) {
            setErrors(errors)
            return
        }

        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    function handleCloseError(key) {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors }
            delete newErrors[key]
            return newErrors
        })
    }

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md mt-4">
            {/* Exibição de mensagens de erro */}
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
                    {errors.cost && (
                        <div className="flex justify-between items-center text-red-700 bg-red-100 border border-red-300 p-4 mb-4 rounded">
                            <p>{errors.cost}</p>
                            <button
                                className="bg-transparent border-none text-2xl cursor-pointer ml-auto"
                                onClick={() => handleCloseError('cost')}
                            >
                                &times;
                            </button>
                        </div>
                    )}
                </div>
            )}
            <form onSubmit={submit} className="flex flex-col gap-4">
                <div>
                    <Input
                        type="text"
                        text="Nome do Serviço"
                        name="name"
                        placeholder="Insira o nome do Serviço"
                        handleOnChange={handleChange}
                    />
                </div>
                <div>
                    <Input
                        type="number"
                        text="Custo do Serviço"
                        name="cost"
                        placeholder="Insira o custo do Serviço"
                        handleOnChange={handleChange}
                    />
                </div>
                <div>
                    <Input
                        type="text"
                        text="Descrição do Serviço"
                        name="description"
                        placeholder="Insira uma descrição do Serviço"
                        handleOnChange={handleChange}
                    />
                </div>
                <SubmitButton text={btnText} />
            </form>
        </div>
    )
}

export default ServiceForm
