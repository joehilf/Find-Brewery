import React from 'react';
import Header from './HeaderComponent';
import { displayInfo } from './functions.js';
import { FaSearch } from "react-icons/fa";

/* 
** File Name: MainComponent.js
** Written By: Joseph Hilferty 
** Last Modified: July 31st, 2022
** Notes: Changing the state of "currentPage" is one step behind
** - It starts incrementing/decrementing on the 2nd click. Thats why any code
     involving "page" is needed to keep things accurate.
   - The Search Bar correctly filters and prints out the correct data, but there is no
     connection to the next and prev buttons as of now.
*/

const PER_PAGE = 10;

// Main class component
// - Header Component
// - Middle Component
// - Footer Component
class Main extends React.Component {
    
    // Rendering everything on the page
    render() {
        return (
            <div className='main'>
                <Header id='header'/>
               
                    <div className="introduction">
                    <h2>Brewery Database:</h2>
                    <p>This database currently includes many craft beer, hard seltzer, cannabis, cider, alcoholic kombucha, 
                       and low- and no-alcohol beverage companies. To find a brewery and learn more about them, enter the brewery name 
                       into the box below. You can also browse by city, state and type.
                    </p>
                    </div>

                    <Middle />
 
            </div>
        );
    }
}

// Middle class component
// - Search Bar
// - Table of Information
// - Next and Previous Buttons
// - Information Dump Section via Table
class Middle extends React.Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            breweries: [],       // List of breweries
            isLoaded: false,     // If content from API is successfully loaded into breweries[] or not
            currentPage: 0       // The current page that is displayed on screen
        };
        this.changeTable = this.changeTable.bind(this);
    }

    // Function to fetch the brewery info from API
    componentDidMount() {
        fetch("https://api.openbrewerydb.org/breweries") 
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    breweries: json,
                })
            }
        );
    }

    // Function to change the page of the table displayed on screen
    changeTable = (breweries, sign, currentPage) => {

        // Changing state of currentPage
        this.setState({currentPage: currentPage + sign});
        let page = currentPage + sign;

        const tbody = document.getElementById("tbody");
            tbody.innerHTML = "";

        const offset = page * PER_PAGE;

        // Whether the next button should still be displayed or not
        if (offset + PER_PAGE === breweries.length) {
            document.getElementById("next").style.display = "none";
        } else {
            document.getElementById("next").style.display = "inline";
        }

        // Whether the previous button should still be displayed or not
        if (offset === 0) {
            document.getElementById("previous").style.display = "none";
        } else {
            document.getElementById("previous").style.display = "inline";
        }

        // Displaying the next or previous page of content 
        breweries.slice(offset, offset + PER_PAGE).map(brewery => {
            let row = document.createElement('tr');

            let colName = document.createElement('td');
            colName.className = "name";
            colName.innerHTML = '<a href="#information">' + brewery.name + '</a><p class="street">' + (brewery.street === null ? '' : brewery.street) + '</p>';
            colName.addEventListener('click', () => {displayInfo(breweries, brewery.name);});

            let colLocation = document.createElement('td');
            colLocation.className = "location";
            colLocation.innerHTML = brewery.city + ", " + brewery.state;

            let colType = document.createElement('td');
            colType.className = "type";
            colType.innerHTML = brewery.brewery_type;

            row.appendChild(colName);
            row.appendChild(colLocation);
            row.appendChild(colType);

            tbody.appendChild(row);
        });
    }

    // Function to display the content based on filter
    submit(breweries, currentPage) {
        const type = document.querySelector('#select').value;
        const text = document.querySelector('#text').value;

        let found = false;
    
        const results = breweries.filter(function(brewery) {
            if (type === "brewery") {
                found = true;
                return brewery.name === text;
            } else if (type === "type") {
                found = true;
                return brewery.brewery_type === text;
            } else if (type === "city") {
                found = true;
                return brewery.city === text;
            } else if (type === "state") {
                found = true;
                return brewery.state === text;
            }
        });

        if (found === true) {
            this.changeTable(results, 0, currentPage);
        }
    }

    // Rendering everything on the table
    render() {

        let { isLoaded, breweries, currentPage } = this.state;

        // If data from API is NOT loaded into breweries, else -> it is
        if (isLoaded === false) {
            return <div>Loading...</div>;
        } else {
            return (
                <>
                <div className="search-field parent row">
                    <form className="form">
                        <select id="select" className="filter child col">
                            <option value="brewery">BREWERY</option>
                            <option value="city">CITY</option>
                            <option value="state">STATE</option>
                            <option value="type">TYPE</option>
                        </select>
                        <input id="text" type="text" className="input child col" placeholder="Search..."/>
                        <FaSearch className="searchIcon"/>
                        <input id="submit" type="submit" className="search-button" value="Search" onClick={() => this.submit(breweries, currentPage)}/>
                    </form>
                </div>     

                <div className="wrapper">

                    <table className="breweries-table">
                        <thead>
                            <tr>
                                <th className="name">BREWERY</th>
                                <th className="location">LOCATION</th>
                                <th className="type">TYPE</th>
                            </tr>
                        </thead>
                        <tbody id="tbody" key="body">
                            {breweries.slice(0, 10).map((brewery, index) =>
                                <tr>
                                    <td className="name">
                                    <a href="#information" onClick={() => displayInfo(breweries, brewery.name)}>{brewery.name}</a>
                                    <p className="street">{brewery.street}</p>
                                </td>
                                    <td className="location">{brewery.city}, {brewery.state}</td>
                                    <td className="type">{brewery.brewery_type}</td>
                                </tr>  
                            )} 
                        </tbody>
                    </table>  

                    <div className="navigation parent row">
                        <div className="previous-button child col">
                            <button id="previous" onClick={() => this.changeTable(breweries, -1, currentPage)}>PREVIOUS</button>
                        </div>
                        <div className="page-tracker child col">
                            <p>Page {currentPage + 1} of {Math.ceil(breweries.length / PER_PAGE)}</p>
                        </div>
                        <div className="next-button child col">
                            <button id="next" onClick={() => this.changeTable(breweries, 1, currentPage)}>NEXT</button>
                        </div>
                    </div>

                </div>

                <div id="information">
                    <h1 id="info-name" className="info-name"></h1>
                    <hr />
                    <br />
                    <div><strong>TYPE</strong>
                        <p id="info-type" className="info-title"></p>
                    </div>
                    <div><strong>LOCATION</strong>
                        <p id="info-location-1" className="info-title"></p>
                        <p id="info-location-2" className="info-title"></p>
                        <p id="info-location-3" className="info-title"></p>
                    </div>
                    <div><strong>PHONE</strong>  
                        <p id="info-phone" className="info-title"></p>
                    </div>
                    <div><strong>WEBSITE</strong>    
                        <p id="info-website" className="info-title"></p>
                    </div>
                </div>
                </>
            
            );
        }
    }
}

export default Main;