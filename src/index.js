import {homeHeader, homeContent} from './homepage';
import { boardHeader, boardContent } from './boardpage';
import './styles.css';
import { MasterBoardHeader, masterBoardContent } from './masterboardpage';
import { dragIt } from './draggables';
// import { boardContent } from './boardpage';



// HTML Structure
const header = document.querySelector(".header")
const main = document.querySelector(".main")


// use index to load the html structure depending on the user's input. Load from modules only.


// Board Arrays filled with Task Objects - Export
// HomePage


function updateHomePage() {
    header.innerHTML = ""
    main.innerHTML = ""
    header.appendChild(homeHeader())
    main.appendChild(homeContent())
}

updateHomePage()

function updateBoardPage(boardName) {
    header.innerHTML = ""
    main.innerHTML = ""
    header.appendChild(boardHeader(boardName))
    main.appendChild(boardContent(boardName))
    dragIt()
}

function updateMasterBoardPage() {
    header.innerHTML = ""
    main.innerHTML = ""
    header.appendChild(MasterBoardHeader())
    main.appendChild(masterBoardContent())
}






export {updateHomePage, updateBoardPage, updateMasterBoardPage}