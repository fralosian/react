import { BsFillTrashFill, BsPencil } from 'react-icons/bs';

function ServiceCard({ id, name, cost, description, handleRemove, handleEdit }) {
    const remove = (e) => {
        e.preventDefault();
        handleRemove(id, cost);
    };

    const edit = (e) => {
        e.preventDefault();
        handleEdit({ id, name, cost, description });
    };

    return (
        <div className="w-full p-4 border border-black rounded mb-4 overflow-hidden shadow-lg">
            <h4 className="text-lg font-semibold break-words">{name}</h4>
            <p className="break-words">
                <span className="font-bold">Custo total:</span> R${cost}
            </p>
            <p className="break-words">
                <span className='font-bold'>Descrição: </span>{description}

            </p>
            <div className="flex justify-end mt-4">
                <button onClick={edit} className="flex text-gray-800 border border-gray-800 p-2 flex items-center hover:bg-gray-800 hover:text-yellow-400">
                    <BsPencil className="mr-2" /> Editar
                </button>
                <button onClick={remove} className="flex ml-4 text-red-600 border border-gray-800 p-2 flex items-center hover:bg-gray-800 hover:text-red-200">
                    <BsFillTrashFill className="mr-2" /> Excluir
                </button>
            </div>
        </div>
    );
}

export default ServiceCard;
