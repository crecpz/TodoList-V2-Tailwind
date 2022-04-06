// hamburger menu
const menuBtn = document.querySelector('#menu-btn')
const menu = document.querySelector('#menu')
const title = document.querySelector('#title')
const hamburger = document.querySelector('#hamburger')
const searchBtn = document.querySelector('#search-btn')
const searchWrapper = document.querySelector('#search-wrapper')
const completedBtn = document.querySelector('#completed-btn')
const closeSearchBtn = document.querySelector('#search-close-btn')
const searchInput = document.querySelector('#search-input')


menuBtn.addEventListener('click', hamburger_expandSwitcher)
menuBtn.addEventListener('click', showMenu)
searchBtn.addEventListener('click', hamburger_arrowSwitcher)
searchBtn.addEventListener('click', openSearchInput)

// hamburger switcher(expand & collapse)
function hamburger_expandSwitcher() {
    if (!hamburger.classList.contains('hamburger-expand')) {
        hamburger.classList.remove('hamburger-collapse')
        hamburger.classList.add('hamburger-expand')
    } else {
        hamburger.classList.remove('hamburger-expand')
        hamburger.classList.add('hamburger-collapse')
    }
}

function hamburger_arrowSwitcher() {
    if (hamburger.classList.contains('hamburger-expand')) {
        hamburger.classList.add('hamburger-arrow')
        hamburger.classList.remove('hamburger-expand')
    } else {
        hamburger.classList.add('hamburger-expand')
        hamburger.classList.remove('hamburger-arrow')
    }

}


function showMenu() {
    title.classList.add('animation-fadeout')
    title.addEventListener('animationend', () => {
        style_showMenu();
        title.classList.add('hidden')
        menuBtn.removeEventListener('click', showMenu);
        menuBtn.addEventListener('click', backToHomepage);
    })
}

function backToHomepage() {
    style_hideMenu()
    title.classList.remove('hidden')
    menuBtn.removeEventListener('click', backToHomepage)
    menuBtn.addEventListener('click', showMenu)
}




function openSearchInput() {
    style_showSearchInput()

    // 移除無用監聽器:
    menuBtn.removeEventListener('click', backToHomepage)
    menuBtn.removeEventListener('click', hamburger_expandSwitcher)

    // 樣式調整:
    menuBtn.addEventListener('click', hamburger_arrowSwitcher)

    // 新增所需監聽器:
    menuBtn.addEventListener('click', closeSearchInput);
}

function closeSearchInput() {
    style_hideSearchInput()
    menuBtn.removeEventListener('click', closeSearchInput);
    menuBtn.removeEventListener('click', hamburger_arrowSwitcher);
    menuBtn.addEventListener('click', backToHomepage);
    menuBtn.addEventListener('click', hamburger_expandSwitcher);
}

/* style控制系列 */

function style_showMenu() {
    menu.classList.remove('hidden')
    menu.classList.add('flex')
    menu.classList.add('item-center')
    menu.classList.add('justify-end')
}

function style_hideMenu() {
    menu.classList.add('hidden')
    menu.classList.remove('flex')
    menu.classList.remove('item-center')
    menu.classList.remove('justify-end')
}

function style_hideSearchInput() {
    searchBtn.classList.remove('hidden')
    completedBtn.classList.remove('hidden')
    searchWrapper.classList.add('hidden')
}

function style_showSearchInput() {
    searchBtn.classList.add('hidden')
    completedBtn.classList.add('hidden')
    searchWrapper.classList.remove('hidden')
}