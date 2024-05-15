import './CardAmazon.css';

const CardAmazon = ({ venda }) => {

    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-br')
    }
    
    return (
        <>
            <div className='card-Amazon' >
                    <p>ID: {venda.id_livro}</p>
                    <p>Data Venda: {formatarData(venda.data_venda)}</p>
                    <p>Nome Produto: {venda.nome_produto}</p>
                    <p>Edição: {venda.edicao}</p>
                </div>
        </>
    );
};

export default CardAmazon;
