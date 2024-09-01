import { Link } from "react-router-dom";
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import { useColors } from '../layout/ColorContext';

function ProjectCard({ id, name, budget, category, handleRemove }) {
    const remove = (e) => {
        e.preventDefault();
        handleRemove(id);
    };

    const colors = useColors();
    const categoryClass = colors[`category-${category.toLowerCase()}`] || '';

    return (
        <div className="p-4 border border-gray-400 rounded w-full md:w-1/4 mx-2 mb-4">
            <h4 className="bg-gray-800 text-yellow-400 p-2 mb-4 text-xl">{name}</h4>
            <p className="text-gray-600 mb-4">
                <span className="font-bold">Orçamento:</span> R$ {budget}
            </p>
            <p className="flex items-center mb-4">
                <span className={`w-3 h-3 rounded-full mr-2 ${categoryClass}`}></span> {category}
            </p>
            <div className="flex space-x-4">
                <Link to={`/project/${id}`} className="text-gray-800 border border-gray-800 p-2 flex items-center hover:bg-gray-800 hover:text-yellow-400">
                    <BsPencil className="mr-1" /> Editar
                </Link>
                <button onClick={remove} className="text-gray-800 border border-gray-800 p-2 flex items-center hover:bg-gray-800 hover:text-yellow-400">
                    <BsFillTrashFill className="mr-1" /> Excluir
                </button>
            </div>
        </div>
    );
}

export default ProjectCard;
