import React from 'react';
import '../Styles/Header.css'

function Header({ cartItems }) {
    return (
        <header>
            <div className='logo'>
                <h1>Sunrise</h1><img src='https://cdn-icons-png.flaticon.com/128/733/733740.png'></img> <h1>Style</h1>

            </div>
            <div className='items-in-cart'>
                <img src='https://cdn-icons-png.flaticon.com/128/2838/2838838.png'></img>
                <p>{cartItems}</p>
            </div>
        </header>
    )
}

export default Header