import React, { useState } from 'react';
import './searchBar.css';

function SearchBar({ setSelectedImage }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [images, setImages] = useState([]);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    // const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const API_URL = "https://api.jikan.moe/v4";
    const loadLimit = 20;
    const imagesPerPage = 4;
    let numImagesFound = 0;
    const nextButton = document.getElementById('nextButton');
    const [searchTerm, setSearchTerm] = useState('');
    const [maxPages, setMaxPages] = useState(Math.ceil(loadLimit / imagesPerPage));

    function getAnimes() {
        setIsLoading(true);
        let animeToLookFor = document.getElementById("searchAnime").value;
        // console.log(animeToLookFor);


        fetch(`${API_URL}/anime?q=${animeToLookFor}&limit=${loadLimit}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                const images = data.data.map(anime => anime.images.jpg.image_url);
                // console.log(images);
                numImagesFound = images.length;
                if (numImagesFound < loadLimit) {
                    setMaxPages(Math.ceil(numImagesFound / imagesPerPage));
                }
                else {
                    setMaxPages(Math.ceil(loadLimit / imagesPerPage));
                }
                setImages(images);
                setCurrentPage(0); // Reset to the first page when a new search is made
                setIsLoading(false);
                setIsNextDisabled(false); // Enable the "Next" button
            })
            .catch(error => {
                if (numImagesFound < loadLimit) {
                    setMaxPages(Math.ceil(numImagesFound / imagesPerPage));
                }
                else {
                    setMaxPages(Math.ceil(loadLimit / imagesPerPage));
                }
            });
        setIsNextDisabled(false);
    }

    function nextPage() {
        if (currentPage < maxPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
            if (currentPage === maxPages - 2) {
                setIsNextDisabled(true); // Disable the "Next" button when the last page is reached
            }
        }
    }

    function prevPage() {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
        setIsNextDisabled(false); // Enable the "Next" button when going back
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            getAnimes();
        }
    }

    const imagesToShow = images.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage);

    return (
        <div>
            {/* <h1>Search Bar</h1> */}
            <input type="text" placeholder="Search..." id="searchAnime" value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress} />
            <button id="searchButton" onClick={getAnimes}>Search</button>
            {isLoading && <p>Loading...</p>}
            <div id="animeResults">
                {imagesToShow.map(image => (
                    <img src={image}
                        alt="anime"
                        key={image}
                        onClick={() => setSelectedImage(image)}
                        className="animeImage"
                    />))}
            </div>
            <button onClick={prevPage}>Previous</button>
            <button>{currentPage + 1}</button>
            <button id='nextButton' onClick={nextPage} disabled={isNextDisabled}>Next</button>
        </div>
    )
}

export default SearchBar;