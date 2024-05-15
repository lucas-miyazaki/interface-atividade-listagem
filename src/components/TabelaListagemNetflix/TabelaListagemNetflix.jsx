import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NetflixRequests from '../../fetch/NetflixRequests';
import "./TabelaListagemNetflix.css"

function TabelaListagemNetflix() {
    const [titulos, setTitulos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listaTitulos = await NetflixRequests.ListarTitulos();
                setTitulos(listaTitulos);
            } catch (error) {
                console.error('Erro ao buscar titulos: ', error);
            }
        };

        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTitulos = titulos.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(titulos.length / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            <div className='cnt-tb'>
                {titulos.length > 0 ? (
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='tabelaHeader'>Show ID</th>
                                    <th className='tabelaHeader'>Tipo</th>
                                    <th className='tabelaHeader'>Título</th>
                                    <th className='tabelaHeader'>País</th>
                                    <th className='tabelaHeader'>Ano Lançamento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTitulos.map(titulo => (
                                    <tr key={titulo.show_id}>
                                        <td className='tabelaCorpo'>{titulo.show_id}</td>
                                        <td className='tabelaCorpo'>{titulo.tipo}</td>
                                        <td className='tabelaCorpo'>{titulo.titulo}</td>
                                        <td className='tabelaCorpo'>{titulo.pais}</td>
                                        <td className='tabelaCorpo'>{titulo.ano_lancamento}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                            <span>Página {currentPage} de {totalPages}</span>
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Próxima</button>
                            <span>Ir para a página:</span>
                            <input
                                type="number"
                                value={currentPage}
                                onChange={(e) => {
                                    const pageNumber = parseInt(e.target.value);
                                    paginate(pageNumber);
                                }}
                                min="1"
                                max={totalPages}
                            />
                        </div>
                    </>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </>
    );
}

export default TabelaListagemNetflix;
