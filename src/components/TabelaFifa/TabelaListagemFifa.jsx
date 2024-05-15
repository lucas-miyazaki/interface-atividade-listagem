import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListagemRequests from '../../fetch/AmazonRequests';
//import { FaTrash } from "react-icons/fa";
import "./TabelaListagemFifa.css"
function TabelaListagemFifa() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listaCards = await ListagemRequests.ListarCards();
                setCards(listaCards);
            } catch (error) {
                console.error('Erro ao buscar cards: ', error);
            }
        };

        fetchData();
    }, []);
    /* 
        const deletarAnimal = async (id) => {
            const confirmar = window.confirm(`Deseja deletar o animal com id ${id}?`);
            if (confirm) {
                if(await AnimalRequests.deletarAnimal(id)) {
                    window.alert('Animal deletado com sucesso');
                    window.location.reload();
                } else {
                    window.alert('Erro ao deletar animal');
                }
            }
        }
    */
    return (
        <>
            <div className='cnt-tb'>
                {cards.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th >Player ID</th>
                                <th >Nome Jogador</th>
                                <th >Pé Dominante</th>
                                <th >Posição</th>
                                <th >OVR</th>
                                {/* <th >Ação</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {cards.map(playercards => (
                                <tr key={playercards.playerId} playercards={playercards}>
                                    <td >{playercards.playerId}</td>
                                    <td >{playercards.playername}</td>
                                    <td > {playercards.foot}</td>
                                    <td >{playercards.playerPosition}</td>
                                    <td >{playercards.ovr}</td>
                                    {/* <td onClick={() => deletarAnimal(animal.idanimal)}><FaTrash</td>/> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </>
    );
}

export default TabelaListagemFifa;
