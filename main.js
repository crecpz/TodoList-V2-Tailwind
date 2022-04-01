// hamburger menu
let menuBtn = document.querySelector('#menu-btn')
let menu = document.querySelector('#menu')
let title = document.querySelector('#title')
let hamburger = document.querySelector('#hamburger')

// Homepage <---> menu
const backToHomepage = () => {
    menu.classList.add('hidden');
    menu.classList.remove('flex')
    menu.classList.remove('item-center')
    menu.classList.remove('justify-end')
    title.classList.remove('hidden')
    menuBtn.removeEventListener('click', backToHomepage)
    menuBtn.addEventListener('click', showMenu)
}
const showMenu = () => {
    menu.classList.remove('hidden');
    menu.classList.add('flex')
    menu.classList.add('item-center')
    menu.classList.add('justify-end')
    title.classList.add('hidden')
    menuBtn.removeEventListener('click', showMenu)
    menuBtn.addEventListener('click', backToHomepage)
}

// hamburger switcher
const hamburgerSwitcher = () => {
    if (!hamburger.classList.contains('hamburger-expand')) {
        hamburger.classList.remove('hamburger-collapse')
        hamburger.classList.add('hamburger-expand')
    } else {
        hamburger.classList.remove('hamburger-expand')
        hamburger.classList.add('hamburger-collapse')
    }
}

// open search input
const openSearchInput = () => {
    searchBtn.classList.add('hidden')
    completedBtn.classList.add('hidden')
    searchWrapper.classList.remove('hidden')

    menuBtn.removeEventListener('click', showMenu)
    menuBtn.removeEventListener('click', backToHomepage)
    menuBtn.removeEventListener('click', hamburgerSwitcher)
    // ↓ 這行有問題，因為showMenu自帶刪除己身之事件監聽，所以不能這樣用。
    menuBtn.addEventListener('click', showMenu)
}

menuBtn.addEventListener('click', hamburgerSwitcher)
menuBtn.addEventListener('click', showMenu)

let searchBtn = document.querySelector('#search-btn')
let searchWrapper = document.querySelector('#search-wrapper')
let completedBtn = document.querySelector('#completed-btn')

searchBtn.addEventListener('click', openSearchInput)

// close search btn
let closeSearchBtn = document.querySelector('#search-close-btn')
let searchInput = document.querySelector('#search-input')


closeSearchBtn.addEventListener('click', () => {

})