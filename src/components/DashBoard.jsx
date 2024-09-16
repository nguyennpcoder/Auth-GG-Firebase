import React, { useEffect, useState } from 'react';
import './DashBoard.css';
import logo from './img/logo-bao-moi.png';
import axios from 'axios';

import img from './img/img.jpg';
import img1 from './img/img1.jpg';
import img2 from './img/img2.jpg';
import img3 from  './img/img3.jpg';
import img4 from './img/img4.jpg';
import img6 from './img/img6.jpg';
import img7 from './img/img7.jpg';

import { fetchUserById } from './../features/apiSave/recallApiLoading';
import { useSelector, useDispatch } from 'react-redux';

export const DashBoard = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.value);
  const name = useSelector(state => state.counter.name);
  const [test, setTest] = useState(false);

  useEffect(() => {
    if (test) {
      dispatch(fetchUserById());
    }
  }, [test, dispatch]);

  // Define carouselData
  const carouselData = [img, img1, img2, img3, img4, img6, img7];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % carouselData.length);
    }, 1000); // Rotate every 1 second

    return () => clearInterval(interval);
  }, [carouselData.length]); // Update when carouselData.length changes

  // Remainder of your component code...

  //api news
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('News');
  const [searchResults, setSearchResults] = useState([]);
  const [menuArticles, setMenuArticles] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    dispatch(fetchUserById());
  }, [dispatch]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=apple&from=2024-03-18&to=2024-03-18&sortBy=popularity&apiKey=242da07b4b7e4b7c8a7ea048be11cf3e`);
        if (response.status === 200) {
          setArticles(response.data.articles);
        } else {
          console.error('Failed to fetch news');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  //search
  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setSearchResults([]); // Reset search results if search term is empty
      setSelectedMenu('News'); // Reset selected menu to 'News'
      return;
    }
  
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?qInTitle=${encodeURIComponent(searchTerm)}&from=2024-03-18&to=2024-03-18&sortBy=popularity&apiKey=242da07b4b7e4b7c8a7ea048be11cf3e`);
      if (response.status === 200) {
        setSearchResults(response.data.articles);
      } else {
        console.error('Failed to fetch news');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };
  

  //menu
  useEffect(() => {
    const fetchMenuArticles = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${selectedMenu}&from=2024-03-18&to=2024-03-18&sortBy=popularity&apiKey=242da07b4b7e4b7c8a7ea048be11cf3e`);
        if (response.status === 200) {
          setMenuArticles(response.data.articles);
        } else {
          console.error('Failed to fetch menu articles');
        }
      } catch (error) {
        console.error('Error fetching menu articles:', error);
      }
    };

    fetchMenuArticles();
  }, [selectedMenu]);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu); // Update selected menu
  };

  // img
  const images = [img, img1, img2, img3, img4, img6, img7];
  const [currentIndexImg, setCurrentIndexImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexImg(prevIndex => (prevIndex + 1) % images.length);
    }, 1300); // set 1.3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className='header'>
        <img src={logo} alt="Logo" className="logo" />
        <h1>Welcome to my Website</h1>
      </div>

      <div className='image-container'>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={index === currentIndexImg ? 'active' : ''}
            style={{ transform: `translateX(${(index - currentIndexImg) * 100}%)` }}
          />
        ))}
      </div>
      <b>
      <div className="container">
        <div className="search">
          <div className="search-input">
            <input type="text" placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="search-button">
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className="menu">
          <ul>
            <li><a href="#" onClick={() => handleMenuClick('News')}>News</a></li>
            <li><a href="#" onClick={() => handleMenuClick('Worlds')}>Worlds</a></li>
            <li><a href="#" onClick={() => handleMenuClick('Kdramas')}>Kdramas</a></li>
            <li><a href="#" onClick={() => handleMenuClick('Healths')}>Healths</a></li>
            <li><a href="#" onClick={() => handleMenuClick('Educations')}>Educations</a></li>
          </ul>
        </div>
      </div>
      </b>
      <div className='last'> 
        <p>
          Last News
        </p>
      </div>
      <div className="content">
        <div className="articles">
          {searchResults.length > 0 ? (
            searchResults.map((article, index) => (
              <div key={index} className="article">
                <h2>{article.title}</h2>
                <p>{article.description}</p>{article.urlToImage && <img src={article.urlToImage} alt={article.title} className="article-image" />}
                  <button className="read-more-button">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">See more</a>
                  </button>
                </div>
              ))
            ) : (
              menuArticles.map((article, index) => (
                <div key={index} className="article">
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="article-image" />}
                  <button className="read-more-button">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">See more</a>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </>
    );
};
