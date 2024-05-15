import './CardNetflix.css';

const CardNetflix = ({ titulo }) => {
    return (
        <>
            <div className='card-Netflix' >
                    <p>Show ID: {titulo.show_id}</p>
                    <p>Tipo: {titulo.tipo}</p>
                    <p>Título: {titulo.titulo}</p>
                    <p>País: {titulo.pais}</p>
                    <p>Ano Lançamento: {titulo.ano_lancamento}</p>
                </div>
        </>
    );
};

export default CardNetflix;
