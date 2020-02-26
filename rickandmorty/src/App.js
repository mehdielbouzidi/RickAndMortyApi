import React, { useState, useEffect } from 'react';
import { getAllData, getCharacter } from './services/data.js';
import Card from './components/Card';
import Search from './components/Search';
import './App.css';

function App() {
  const [characterData, setCharacterData] = useState([]);
  const [sortedCharacters, setSortedCharacters] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchByLocation, setSearchByLocation] = useState('');
  const [searchByOrigin, setSearchByOrigin] = useState('');
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://rickandmortyapi.com/api/character/';

  
  //Fetch data and set Urls
  useEffect(() => {
    async function fetchData() {
      let response = await getAllData(initialUrl);
      setNextUrl(response.info.next);
      setPrevUrl(response.info.prev);
      await loadingData(response.results);
      setLoading(false);
    }
    fetchData();
    },[])

  const next = async () => {
    if (nextUrl) { //Check whether there is a next url to prevent bug at last page
      setLoading(true);
      let data = await getAllData(nextUrl);
      await loadingData(data.results);
      setNextUrl(data.info.next);
      setPrevUrl(data.info.prev);
      setLoading(false);
    }
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllData(prevUrl);
    await loadingData(data.results);
    setNextUrl(data.info.next);
    setPrevUrl(data.info.prev);
    setLoading(false);
  }

  //Loader
  const loadingData = async (data) => {
    let _character = await Promise.all(data.map(async character => {
      let characterRecord = await getCharacter(character.url);
      return characterRecord;
    }))
    setCharacterData(_character);
  }

  //Search handler
  useEffect(() => {
    const result = characterData.filter(
      character =>
        character.name.toLowerCase().includes(searchValue) &&
        character.location.name.toLowerCase().includes(searchByLocation) &&
        character.origin.name.toLowerCase().includes(searchByOrigin)
    );
    setSortedCharacters(result);

  }, [searchValue, characterData, searchByLocation, searchByOrigin]);

  return (
    <>
      <Search 
            searchValue={searchValue} 
            setSearchValue={setSearchValue} 
            searchByLocation={searchByLocation} 
            setSearchByLocation={setSearchByLocation}
            searchByOrigin={searchByOrigin} 
            setSearchByOrigin={setSearchByOrigin}
        />
        {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
          <>
            <div className="container">
                <p className="pt-3">{sortedCharacters.length} results on this page.</p>
              <div className="row">
                {sortedCharacters.map((character, i) => {
                  return <Card key={i} character={character} />
                })}
              </div>
              <div className="pagination justify-content-center my-5">
                <button onClick={prev} className="btn btn-secondary btn-sm">Previous</button>
                <button onClick={next} className="btn btn-primary btn-sm ml-2">Next</button>
              </div>
            </div>
          </>
        )}
    </>
  );
}

export default App;
