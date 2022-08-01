/* 
** Name: FuncComponents.js
** Written By: Joseph Hilferty 
** Last Modified: July 28th, 2022
*/

// Function to display the information on the selected brewery
export function displayInfo(breweries, name) {

    document.getElementById("information").style.display = "inline-block";

    // Finding the brewery that was selected
    let found = breweries.find(function(element) {
        if (element.name === name) {
            return name;
        }
    });
    
    // Street
    if (found.street) { 
        if (null) {
            found.street = "";
        }
    }
    
    // Country
    if (found.country === null) {
            found.country = "";
    }

    // Phone Number
    if (found.phone === null) {
            found.phone = "<i>Unknown</i>";
    }
    
    // Website
    if (found.website_url === null) {
        found.website_url = "<i>Unknown</i>";
    } else {
        found.website_url = "<a href="+ found.website_url + " target='_blank'>" + found.website_url + "</a>"
    }
    
    // Printing out all the information
    document.getElementById("info-name").innerHTML = found.name;
    document.getElementById("info-type").innerHTML = found.brewery_type;
    document.getElementById("info-location-1").innerHTML = found.street;
    document.getElementById("info-location-2").innerHTML = found.city + ", " + found.state + " " + found.postal_code;
    document.getElementById("info-location-3").innerHTML = found.country;
    document.getElementById("info-phone").innerHTML = found.phone;
    document.getElementById("info-website").innerHTML = found.website_url;
}