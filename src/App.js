import AnimeSquare from "./animeSquare.js";
import SearchBar from "./searchBar.js";
import './App.css';
import React, { useState } from 'react';
import domtoimage from 'dom-to-image';

function App() {

  const [selectedSquare, setSelectedSquare] = useState(null);
  const [selectedImages, setSelectedImages] = useState([null, null, null, null, null, null, null, null, null]); // Add more nulls if you have more AnimeSquare components
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
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

    domtoimage.toPng(node, {
      style: {
        transform: 'scale(' + window.devicePixelRatio + ')',
        transformOrigin: 'top left',
        width: node.offsetWidth + 'px',
        height: node.offsetHeight + 'px'
      }
    })
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
      </header>
      <img src="info.svg" alt="importantInfo" id="importantInfo" onClick={() => {
        if (isAnimating) return; // Don't do anything if the sidebar is currently animating

        setIsAnimating(true);

        if (isSidebarOpen) {
          setIsSidebarOpen(false);
          setTimeout(() => {
            setIsSidebarVisible(false);
            setIsAnimating(false); // The sidebar has finished animating
          }, 250); // 250ms is the duration of the slideOut animation
        } else {
          setIsSidebarOpen(true);
          setIsSidebarVisible(true);
          setTimeout(() => setIsAnimating(false), 250); // The sidebar has finished animating
        }
      }
      } />
      {isSidebarVisible && (
        <div id="sidebar" className={isSidebarOpen ? 'open' : ''}>
          <h2>What is a 3x3?</h2>
          {/* <p>A 3x3 is a grid of 9 images, each representing one of your favorite things in a given category, this website specifically is for making Anime 3x3. <br></br>
            It's a way to share your tastes with others.</p> */}
          <p>An anime 3x3 is a grid of 9 images, each representing one of your favorite anime. <br></br> It's a way to share your tastes with others.</p>
          <h2>How to use this website</h2>
          <p>Click on any of the 9 squares to select it, then use the search bar to find an image to fill that square by clicking on a show's image. <br></br>
            Once you have all 9 squares filled, you can download the image using the buttons below the grid.</p> <br></br>

          <p>Created By Jesse Cochran</p>
          <a href="https://github.com/JesseCochran" target="_blank" rel="noreferrer">Other Projects</a>

        </div>
      )}
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
