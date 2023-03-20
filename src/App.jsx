import { useState, useEffect } from 'react'

import './App.css'
import './Styles/Results.css'
import Header from './Components/Header';
import { searchItem } from './API';
import Pagination from './Components/Pagination';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [finalQuery, setFinalQuery] = useState('')
  const [results, setResults] = useState([]);
  const [cartItems, setCartItems] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function searchForItem() {

      await searchItem(searchQuery, currPage)
        .then(async (result) => {
          setResults(result.results)
          setTotalPages(result.pagination.totalPages)

        })
    }
    searchForItem()
  }, [finalQuery, currPage])


  function handleSearchChange(e) {
    e.preventDefault();
    setSearchQuery(e.target.value);
  }

  function submitFinalQuery(e) {
    e.preventDefault();
    setFinalQuery(searchQuery);
    setCurrPage(1);
  }

  function addToCart() {
    setCartItems(prevState => prevState + 1);
  }

  let resultMap = results.map(x => {

    return (
      <div className='item-card'>
        <img className='item-card-img' src={x.imageUrl}></img>
        <h2 className='item-card-title'>{x.title}</h2>
        {x.price < x.msrp ? <div className='price-reduction-zone'><p className='item-card-price-reduction item-card-price'>${x.msrp}</p> <p className='item-card-price sale-price'>${x.price}</p></div> : <p className='item-card-price'>${x.price}</p>}
        <button onClick={addToCart} className='add-to-cart'>Add to Cart + </button>
      </div>
    )
  })


  return (
    <div className="App">
      <Header cartItems={cartItems} />
      <form  >
        <input placeholder='Search for Brand, Color, Size...' onChange={handleSearchChange}></input>
        <button onClick={submitFinalQuery}><img src='https://cdn-icons-png.flaticon.com/128/49/49116.png'></img></button>
      </form>
      {results.length ? <Pagination currPage={currPage} setCurrPage={setCurrPage} setResults={setResults} totalPages={totalPages} finalQuery={finalQuery} /> : null}
      <div id='result-container'>
        {results.length ? resultMap : <h2 className='no-search-heading'>No items found with that query. Try a different search!</h2>}
      </div>
      {results.length ? <Pagination currPage={currPage} setCurrPage={setCurrPage} setResults={setResults} totalPages={totalPages} finalQuery={finalQuery} /> : null}
    </div>
  )
}

export default App
