import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FifaRequests from '../../fetch/FifaRequests';
import "./TabelaListagemFifa.css"

function TabelaListagemFifa() {
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listaCards = await FifaRequests.ListarCards();
                setCards(listaCards);
            } catch (error) {
                console.error('Erro ao buscar cards: ', error);
            }
        };

        fetchData();
    }, []);
    
    const totalPages = Math.ceil(cards.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            <div className='cnt-tb'>
                {cards.length > 0 ? (
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='tabelaHeader'>Player ID</th>
                                    <th className='tabelaHeader'>Nome Jogador</th>
                                    <th className='tabelaHeader'>Pé Dominante</th>
                                    <th className='tabelaHeader'>Posição</th>
                                    <th className='tabelaHeader'>OVR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(playercard => (
                                    <tr key={playercard.playerid}>
                                        <td className='tabelaCorpo'>{playercard.playerid}</td>
                                        <td className='tabelaCorpo'>{playercard.playername}</td>
                                        <td className='tabelaCorpo'>{playercard.foot}</td>
                                        <td className='tabelaCorpo'>{playercard.playerposition}</td>
                                        <td className='tabelaCorpo'>{playercard.ovr}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Controles de Paginação */}
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
                                    if (pageNumber >= 1 && pageNumber <= totalPages) {
                                        setCurrentPage(pageNumber);
                                    }
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

export default TabelaListagemFifa;
