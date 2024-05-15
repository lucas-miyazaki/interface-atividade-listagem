import styles from './PageNotFound.module.css';
import imgPageNotFound from '../../assets/nao_encontrada.png';
import NavBar from '../../components/NavBar';

function PageNotFound() {
    return (
        <>
            <NavBar />
            <div className={styles.ctnImagem}>
                <img src={imgPageNotFound} className={styles.imagem} />
            </div>

        </>
    );
}

export default PageNotFound;