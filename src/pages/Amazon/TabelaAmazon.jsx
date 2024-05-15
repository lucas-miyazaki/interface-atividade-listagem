import NavBar from '../../components/NavBar';
import TabelaListagemAmazon from '../../components/TabelaListagemAmazon/TabelaListagemAmazon';
function TabelaAmazon() {
    return (
        <>
            <NavBar />
            <h1 className='titulo'>Tabela Amazon</h1>
            <TabelaListagemAmazon/>
        </>
    );
}

export default TabelaAmazon;