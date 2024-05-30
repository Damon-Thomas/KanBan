import {homeHeader, homeContent} from './homepage';
import './styles.css';



// HTML Structure
const header = document.querySelector(".header")
const main = document.querySelector(".main")


// use index to load the html structure depending on the user's input. Load from modules only.


// Board Arrays filled with Task Objects - Export
// HomePage


function updatePage() {
    header.innerHTML = ""
    main.innerHTML = ""
    header.appendChild(homeHeader())
    main.appendChild(homeContent())
}

updatePage()


export {updatePage}