import React from 'react'
import { FaBeer } from "react-icons/fa"

/* 
** File Name: Header.js
** Written By: Joseph Hilferty 
** Last Modified: July 30th, 2022
*/

// Header function component
// - Header Bar
//   - Title
//   - Subtitle
function Header() {
    return(
        <div className="header">
            <h1 className="title">FIND A BREWERY</h1>
            <p className="subtitle">BEER INDUSTRY NEWS, EVENTS, & JOBS</p>
            <FaBeer className="beerIcon"/>
        </div>
    ); 
}

export default Header;