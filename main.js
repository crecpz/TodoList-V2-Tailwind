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


menuBtn.addEventListener('click', hamburgerSwitcher)
menuBtn.addEventListener('click', showMenu)
searchBtn.addEventListener('click', hamburgerArrowChanger)
searchBtn.addEventListener('click', openSearchInput)

// hamburger switcher(expand & collapse)
function hamburgerSwitcher() {
    if (!hamburger.classList.contains('hamburger-expand')) {
        hamburger.classList.remove('hamburger-collapse')
        hamburger.classList.add('hamburger-expand')
    } else {
        hamburger.classList.remove('hamburger-expand')
        hamburger.classList.add('hamburger-collapse')
    }
}


function showMenu() {
    style_showMenu();
    title.classList.add('hidden')
    menuBtn.removeEventListener('click', showMenu);
    menuBtn.addEventListener('click', backToHomepage);
}

function backToHomepage() {
    style_hideMenu()
    title.classList.remove('hidden')
    menuBtn.removeEventListener('click', backToHomepage)
    menuBtn.addEventListener('click', showMenu)
}


function hamburgerArrowChanger() {
    hamburger.classList.add('hamburger-arrow')
    hamburger.classList.remove('hamburger-expand')
}

function openSearchInput() {
    searchBtn.classList.add('hidden')
    completedBtn.classList.add('hidden')
    searchWrapper.classList.remove('hidden')

    // 移除無用監聽器:
    menuBtn.removeEventListener('click', backToHomepage)
    menuBtn.removeEventListener('click', hamburgerSwitcher)

    // 樣式調整:
    // 尚需一個menuBtn.addEventListener('click', 作為箭頭轉為X的函數);

    // 新增所需監聽器:
    menuBtn.addEventListener('click', closeSearchInput);
}

function closeSearchInput() {
    searchBtn.classList.remove('hidden')
    completedBtn.classList.remove('hidden')
    searchWrapper.classList.add('hidden')


    menuBtn.removeEventListener('click', closeSearchInput);
    menuBtn.addEventListener('click', backToHomepage);
}

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
