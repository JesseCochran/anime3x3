import AnimeSquare from "./animeSquare.js";
import SearchBar from "./searchBar.js";
import './App.css';
import React, { useState } from 'react';
import domtoimage from 'dom-to-image';

function App() {

  const [selectedSquare, setSelectedSquare] = useState(null);
  const [selectedImages, setSelectedImages] = useState([null, null, null, null, null, null, null, null, null]); // Add more nulls if you have more AnimeSquare components

  const handleImageSelect = (image) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages[selectedSquare] = image;
    setSelectedImages(newSelectedImages);
  }
  function clearImages() {
    setSelectedImages([null, null, null, null, null, null, null, null, null]); // Add more nulls if you have more AnimeSquare components
  }
  function downloadImage() {
    const node = document.querySelector('.animeGrid');
    const selectedNode = document.querySelector('.animeSquareContainer.selected');

    if (selectedNode) {
      selectedNode.classList.add('no-selected-style');
    }

    domtoimage.toPng(node)
      .then((dataUrl) => {
        if (selectedNode) {
          selectedNode.classList.remove('no-selected-style');
        }

        const link = document.createElement('a');
        link.download = 'anime-grid.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Favourite Anime 3x3</h1>
        <img src="info.svg" alt="importantInfo" id="importantInfo" />

      </header>
      <SearchBar setSelectedImage={handleImageSelect} />
      <div className="animeGrid">
        {[...Array(9)].map((_, index) => (
          <AnimeSquare
            key={index}
            index={index}
            selected={index === selectedSquare}
            onSelect={setSelectedSquare}
            selectedImage={selectedImages[index]}
          // selectedImage={index === selectedSquare ? selectedImage : null}
          />
        ))}
      </div>
      <button onClick={clearImages}>Clear Images</button>
      <button onClick={downloadImage}>Download Image</button>
    </div>
  );
}

export default App;
