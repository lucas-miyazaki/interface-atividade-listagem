import styles from './Netflix.module.css';
import NavBar from "../../components/NavBar";
import TabelaListagemNetflix from '../../components/TabelaListagemNetflix/TabelaListagemNetflix';

function TabelaNetflix() {
    return (
        <>
            <NavBar />
            <h1 className='titulo'>Tabela Netflix</h1>
            <TabelaListagemNetflix/>
        </>
    );
}

export default TabelaNetflix;