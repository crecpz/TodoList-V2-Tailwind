// hamberger menu
let menuBtn = document.querySelector('#menu-btn')
let menu = document.querySelector('#menu')
let title = document.querySelector('#title')
let hamburger = document.querySelector('#hamburger')


menuBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden')
    menu.classList.toggle('flex')
    menu.classList.toggle('item-center')
    menu.classList.toggle('justify-end')
    title.classList.toggle('hidden')
    
    if(!hamburger.classList.contains('hamburger-expand')){
        hamburger.classList.remove('hamburger-collapse')
        hamburger.classList.add('hamburger-expand')
    }else{
        hamburger.classList.remove('hamburger-expand')
        hamburger.classList.add('hamburger-collapse')
    }
})


let searchBtn = document.querySelector('#search-btn')
let searchWrapper = document.querySelector('#search-wrapper')
let completedBtn = document.querySelector('#completed-btn')

searchBtn.addEventListener('click', () => {
    searchBtn.classList.add('hidden')
    completedBtn.classList.add('hidden')
    searchWrapper.classList.remove('hidden')
})

// close search btn
let closeSearchBtn = document.querySelector('#search-close-btn')
let searchInput = document.querySelector('#search-input')


closeSearchBtn.addEventListener('click', () => {

})