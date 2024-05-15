import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import NetflixRequests from '../../fetch/NetflixRequests';
import ListarCardNetflix from '../../components/CardNetflix/CardNetflix';
import styles from './Netflix.module.css';

function CardNetflix() {
    const [titulos, setTitulos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listaTitulos = await NetflixRequests.ListarTitulos();
                setTitulos(listaTitulos);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar os títulos: ', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const totalPages = Math.ceil(titulos.length / cardsPerPage);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = titulos.slice(indexOfFirstCard, indexOfLastCard);

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    
    return (
        <>
            <NavBar />
            <div className={styles.cardContainer}>
                <h1 className='titulo'>Card Netflix</h1>
                {loading ? (
                    <p>Carregando... Verifique se o servidor está funcionando</p>
                ) : (
                    <>
                        {currentCards.map((titulo) => (
                            <ListarCardNetflix key={titulo.show_id} titulo={titulo} />
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

export default CardNetflix;
