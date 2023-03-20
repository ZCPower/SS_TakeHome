import { useState } from 'react'

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


  function handleSearchChange(e) {
    e.preventDefault();
    setSearchQuery(e.target.value);
  }

  async function searchForItem(e) {
    e.preventDefault();
    setFinalQuery(searchQuery)

    await searchItem(searchQuery, currPage)
      .then(async (result) => {
        setResults(result.results)
        setTotalPages(result.pagination.totalPages)
        setCurrPage(1);
      })
  }


  function addToCart() {
    setCartItems(prevState => prevState + 1);
  }



  let resultMap = results.map(x => {

    return (
      <div className='itemCard'>
        <img className='itemCard__img' src={x.imageUrl}></img>
        <h2 className='itemCard__title'>{x.title}</h2>
        {x.price < x.msrp ? <div className='price-reduction-zone'><p className='itemCard__price__reduction itemCard__price'>${x.msrp}</p> <p className='itemCard__price sale-price'>${x.price}</p></div> : <p className='itemCard__price'>${x.price}</p>}
        <button onClick={addToCart} className='add-to-cart'>Add to Cart + </button>
      </div>
    )
  })


  return (
    <div className="App">
      <Header cartItems={cartItems} />
      <form  >
        <input placeholder='Search for Brand, Color, Size...' onChange={handleSearchChange}></input>
        <button onClick={searchForItem}><img src='https://cdn-icons-png.flaticon.com/128/49/49116.png'></img></button>
      </form>
      {results.length ? <Pagination currPage={currPage} searchQuery={searchQuery} setCurrPage={setCurrPage} setResults={setResults} totalPages={totalPages} finalQuery={finalQuery} /> : null}
      <div id='resultContainer'>
        {results.length ? resultMap : <h2 className='no-search-heading'>No items found with that query. Try a different search!</h2>}
      </div>
      {results.length ? <Pagination currPage={currPage} searchQuery={searchQuery} setCurrPage={setCurrPage} setResults={setResults} totalPages={totalPages} finalQuery={finalQuery} /> : null}
    </div>
  )
}

export default App
