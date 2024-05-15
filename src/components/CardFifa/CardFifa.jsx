import React from 'react';
import './CardFifa.css';

const CardFifa = ({ playerCard }) => {
    return (
        <div className='card-Fifa'>
            <p>Player ID: {playerCard.playerid}</p>
            <p>Nome Jogador: {playerCard.playername}</p>
            <p>Pé Dominante: {playerCard.foot}</p>
            <p>Posição: {playerCard.playerposition}</p>
            <p>OVR: {playerCard.ovr}</p>
        </div>
    );
};

export default CardFifa;
