import { useState, useEffect, useMemo } from 'react';
import { useColors } from '../layout/ColorContext';
import savings from '../../img/savings.svg';
import LinkButton from '../layout/LinkButton';

function Home() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const colors = useColors();

    useEffect(() => {
        fetch("http://localhost:5000/projects")
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const categories = useMemo(() => {
        const initialCategories = {
            infraestrutura: { color: colors['category-infra'], total: 0 },
            desenvolvimento: { color: colors['category-desenvolvimento'], total: 0 },
            design: { color: colors['category-design'], total: 0 },
            planejamento: { color: colors['category-planejamento'], total: 0 },
        };

        projects.forEach(project => {
            const category = project.category.name.toLowerCase();
            if (initialCategories[category]) {
                initialCategories[category].total += Number(project.budget) || 0;
            }
        });

        return initialCategories;
    }, [projects, colors]);

    return (
        <section className="w-full flex flex-col items-center justify-center p-8 md:p-16">
            <h1 className="text-4xl mb-2 ">
                Bem-vindo ao <span className="text-yellow-400 px-1 bg-gray-800">Costs.</span>
            </h1>
            <p className="mb-6 text-gray-600">Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newproject" text="Criar Projeto" />
            <img src={savings} alt="Ilustração de economia" className="w-3/4 md:w-2/5 my-8" loading="lazy" />

            {loading ? (
                <p className="text-gray-600 mt-8">Carregando projetos...</p>
            ) : (
                <Dashboard categories={categories} />
            )}
        </section>
    );
}

function Dashboard({ categories }) {
    return (
        <div className="w-full max-w-4xl mt-12">
            <h2 className="text-2xl mb-6">Dashboard de Projetos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(categories).map(([key, { color, total }]) => (
                    <CategoryCard key={key} color={color} category={key} total={total} />
                ))}
            </div>
        </div>
    );
}

function CategoryCard({ color, category, total }) {
    return (
        <div className="flex items-center bg-white border border-gray-300 shadow-md rounded-md p-4 transition hover:shadow-lg">
            <span className={`w-3 h-10 ${color} mr-2`}></span>
            <div>
                <h3 className="text-lg font-semibold capitalize">{category}</h3>
                <p className="text-gray-600">Total: R$ {total.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default Home;
