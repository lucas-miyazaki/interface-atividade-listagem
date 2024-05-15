import styles from './FIFA.module.css';
import NavBar from "../../components/NavBar";
import TabelaListagemFifa from '../../components/TabelaListagemFifa/TabelaListagemFifa';

function TabelaFifa() {
    return (
        <>
            <NavBar />
            <h1 className='titulo'>Tabela FIFA</h1>
            <TabelaListagemFifa />
        </>
    );
}

export default TabelaFifa;