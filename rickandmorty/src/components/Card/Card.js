import React from 'react';
import './style.css';

function Card({ character }) {
    return (
        <div className="item col-md-4 mb-5 d-flex align-items-stretch flex-column">
            <div className="card-header p-0">
                <img src={character.image} alt=""/>
            </div>
            <div className="card-body">
                <h5 className=" card-title pt-1">{character.name}</h5>
                <hr></hr>
                <p>Location: {character.location.name}</p>
                <p>Origin: {character.origin.name}</p>
                <p>Gender: {character.gender}</p>
                <p>Type: {character.type}</p>
                <p>Species: {character.species}</p>
                <p>Status: {character.status}</p>
            </div>
            <div className="card-footer d-flex justify-content-between">
                <small>id: {character.id}</small>
                <small>Created: {character.created}</small>
            </div>
        </div>
    )
}

export default Card;
