import React, { useState } from 'react';
import {getAllData} from '../../services/data.js';
import plumbus from '../../img/plumbus.png'
import './style.css';

const Search = ({
    setSearchValue,
    searchValue,
    searchByLocation,
    setSearchByLocation,
    searchByOrigin,
    setSearchByOrigin,
  }) => { //Todo: 1 change handler instead of 3
    const handleName = e => { setSearchValue(e.target.value)};
    const handleLocation = e => { setSearchByLocation(e.target.value)};
    const handleOrigin = e => { setSearchByOrigin(e.target.value)};
    const [kanyeData, setKanyeData] = useState('')
    const kanyeUrl = 'https://api.kanye.rest';

    async function getQuote() {
      let response = await getAllData(kanyeUrl);
      setKanyeData(response.quote);
    };
  
    return (
        <section className="header">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                    <a onClick={getQuote}><img src={plumbus} className="plumbus py-5"/></a>
                    <h2 className="text-center title">Rick and Morty case</h2>
                    <p className="text-center ">Click the <a href="https://www.youtube.com/watch?v=eMJk4y9NGvE" target="_blank" >plumbus</a>  for Kanye Rest, Search on a name, location or origin 👇</p>
                    <input type="text" name="name" placeholder="Search by name" value={searchValue} onChange={handleName} className="text-center input-group mt-4 mx-auto"></input>
                    <input type="text" name="location" placeholder="Search by location" value={searchByLocation} onChange={handleLocation} className="text-center input-group mt-4 mx-auto"></input>
                    <input type="text" name="origin"placeholder="Search by origin" value={searchByOrigin} onChange={handleOrigin} className="text-center input-group mt-4 mx-auto"></input>
                    <blockquote className="blockquote text-center pt-4">
                        <p className="mb-0 font-italic">{kanyeData}</p>
                    </blockquote>                    
                    </div>
                </div>
            </div>
        </section>
    );
  };

  export default Search;