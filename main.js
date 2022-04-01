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

// Homepage ---> menu
const showMenu = () => {
    menu.classList.remove('hidden');
    menu.classList.add('flex')
    menu.classList.add('item-center')
    menu.classList.add('justify-end')
    title.classList.add('hidden')

    if(hamburger.classList.contains('hamburger-expand')){
        menuBtn.removeEventListener('click', showMenu)
        menuBtn.addEventListener('click', backToHomepage)
    }else if(hamburger.classList.contains('hamburger-expand')){
        // 填入關於箭頭的功能
    }
}

// menu ---> Homepage
const backToHomepage = () => {
    menu.classList.add('hidden');
    menu.classList.remove('flex')
    menu.classList.remove('item-center')
    menu.classList.remove('justify-end')
    title.classList.remove('hidden')
    menuBtn.removeEventListener('click', backToHomepage)
    menuBtn.addEventListener('click', showMenu)
}

// hamburger switcher(expand & collapse)
const hamburgerSwitcher = () => {
    if (!hamburger.classList.contains('hamburger-expand')) {
        hamburger.classList.remove('hamburger-collapse')
        hamburger.classList.add('hamburger-expand')
    } else {
        hamburger.classList.remove('hamburger-expand')
        hamburger.classList.add('hamburger-collapse')
    }
}

// hamburger switcher(arrow)
const hamburgerArrowChanger = () => {}

// open search input
const openSearchInput = () => {
    searchBtn.classList.add('hidden')
    completedBtn.classList.add('hidden')
    searchWrapper.classList.remove('hidden')

    menuBtn.removeEventListener('click', showMenu)
    menuBtn.removeEventListener('click', backToHomepage)
    menuBtn.removeEventListener('click', hamburgerSwitcher)

    // ↓ 這行原本有問題，但我有在showMenu加判斷式了，如果到時候如果有把
    // ↓  hamburger-expand替換成hamburger-arrow的話，就不會有自刪自己event的問題了。
    menuBtn.addEventListener('click', showMenu)
}

menuBtn.addEventListener('click', hamburgerSwitcher)
menuBtn.addEventListener('click', showMenu)
searchBtn.addEventListener('click', hamburgerArrowChanger)
searchBtn.addEventListener('click', openSearchInput)


closeSearchBtn.addEventListener('click', () => {

})