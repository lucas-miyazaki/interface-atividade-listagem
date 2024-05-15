import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AmazonRequests from '../../fetch/AmazonRequests';
import "./TabelaListagemAmazon.css"

function TabelaListagemAmazon() {
    const [vendas, setVendas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listaVendas = await AmazonRequests.ListarVendas();
                setVendas(listaVendas);
            } catch (error) {
                console.error('Erro ao buscar vendas: ', error);
            }
        };

        fetchData();
    }, []);

    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-br')
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = vendas.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(vendas.length / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            <div className='cnt-tb'>
                {vendas.length > 0 ? (
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='tabelaHeader'>ID</th>
                                    <th className='tabelaHeader'>Data Venda</th>
                                    <th className='tabelaHeader'>Nome Produto</th>
                                    <th className='tabelaHeader'>Edição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(venda => (
                                    <tr key={venda.id_livro}>
                                        <td className='tabelaCorpo'>{venda.id_livro}</td>
                                        <td className='tabelaCorpo'>{formatarData(venda.data_venda)}</td>
                                        <td className='tabelaCorpo'>{venda.nome_produto}</td>
                                        <td className='tabelaCorpo'>{venda.edicao}</td>
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

export default TabelaListagemAmazon;
