import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import FifaRequests from '../../fetch/FifaRequests';
import ListarCardFifa from '../../components/CardFifa/CardFifa';
import styles from './FIFA.module.css';

function CardFifa() {
    const [playerCards, setPlayerCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listaCards = await FifaRequests.ListarCards();
                setPlayerCards(listaCards);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar os playercards: ', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const totalPages = Math.ceil(playerCards.length / cardsPerPage);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = playerCards.slice(indexOfFirstCard, indexOfLastCard);

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    
    return (
        <>
            <NavBar />
            <div className={styles.cardContainer}>
                <h1 className='titulo'>Card Fifa</h1>
                {loading ? (
                    <p>Carregando... Verifique se o servidor está funcionando</p>
                ) : (
                    <>
                        {currentCards.map((playerCard) => (
                            <ListarCardFifa key={playerCard.playerid} playerCard={playerCard} />
                        ))}
                        <div className={styles.pagination}>
                            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                                Anterior
                            </button>
                            <span>
                                Página {currentPage} de {totalPages}
                            </span>
                            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                                Próxima
                            </button>
                        </div>
                        <div className={styles.pagination}>
                            <span className={styles.pageLabel}>Ir para página:</span>
                            <input
                                type="number"
                                min="1"
                                max={totalPages}
                                value={currentPage}
                                onChange={(e) => {
                                    const pageNumber = parseInt(e.target.value);
                                    goToPage(pageNumber);
                                }}
                                className={styles.pageInput}
                            />
                            <span className={styles.pageCount}>de {totalPages}</span>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default CardFifa;
