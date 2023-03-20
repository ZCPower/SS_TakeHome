import React from 'react'
import '../Styles/Pagination.css'

function Pagination({ currPage, setCurrPage, totalPages, finalQuery }) {
    async function nextPage() {
        setCurrPage(prevState => prevState + 1);
    }

    async function prevPage() {
        setCurrPage(currPage - 1);
    }

    return (
        <div className='pagination-container'>

            {currPage > 1 ? <button onClick={prevPage}>Prev</button> : <div className='placeholder'></div>}
            <h3>Page {currPage} of {totalPages} for {finalQuery ? finalQuery : "All Items"}</h3>
            {currPage < totalPages ? <button onClick={nextPage}>Next</button> : <div className='placeholder'></div>}</div>
    )
}

export default Pagination