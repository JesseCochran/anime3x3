import './animeSquare.css';
// import React, { useState } from 'react';


function AnimeSquare({ index, selected, onSelect, selectedImage }) {

    return (
        <div
            className={`animeSquareContainer ${selected ? 'selected' : ''}`}
            onClick={() => onSelect(index)}
        >
            {/* <p>Anime</p> */}
            <img src={selectedImage || "/noImageV2.png"} alt="Anime 1" className="animeImage" />
            {/* <h3>{props.name}</h3>
        <p>{props.genre}</p> */}
        </div>
    );

}


export default AnimeSquare;