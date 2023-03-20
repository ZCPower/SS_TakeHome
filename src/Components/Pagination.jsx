import React from 'react'
import '../Styles/Pagination.css'
import { searchItem } from '../API';

function Pagination({ currPage, setCurrPage, searchQuery, setResults, totalPages, finalQuery }) {
    async function nextPage() {
        setCurrPage(prevState => prevState + 1);
        await searchItem(searchQuery, currPage)
            .then(async (result) => {
                setResults(result.results)
            })
    }

    async function prevPage() {

        setCurrPage(prevState => prevState - 1);
        if (currPage <= 1) setCurrPage(1)
        await searchItem(searchQuery, currPage)
            .then(async (result) => {
                setResults(result.results)
            })
    }

    return (
        <div className='pagination-container'>

            {currPage > 1 ? <button onClick={prevPage}>Prev</button> : <div className='placeholder'></div>}
            <h3>Page {currPage} of {totalPages} for {finalQuery ? finalQuery : "All Items"}</h3>
            {currPage < totalPages ? <button onClick={nextPage}>Next</button> : <div className='placeholder'></div>}</div>
    )
}

export default Pagination