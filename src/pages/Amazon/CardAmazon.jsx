import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import AmazonRequests from '../../fetch/AmazonRequests';
import ListarCardAmazon from '../../components/CardAmazon/CardAmazon';
import styles from './Amazon.module.css';

function CardAmazon() {
    const [vendas, setVendas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listaVendas = await AmazonRequests.ListarVendas();
                setVendas(listaVendas);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar vendas: ', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const totalPages = Math.ceil(vendas.length / cardsPerPage);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = vendas.slice(indexOfFirstCard, indexOfLastCard);

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles.cardContainer}>
                <h1 className='titulo'>Card Amazon</h1>
                {loading ? (
                    <p>Carregando... Verifique se o servidor está funcionando</p>
                ) : (
                    <>
                        {currentCards.map((venda) => (
                            <ListarCardAmazon key={venda.id_livro} venda={venda} />
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
                            <span style={{ marginRight: '5px' }}>Ir para página:</span>
                            <input
                                type="number"
                                min="1"
                                max={totalPages}
                                value={currentPage}
                                onChange={(e) => {
                                    const pageNumber = parseInt(e.target.value);
                                    goToPage(pageNumber);
                                }}
                                style={{ width: '50px' }}
                            />
                            <span style={{ marginLeft: '5px' }}>de {totalPages}</span>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default CardAmazon;
