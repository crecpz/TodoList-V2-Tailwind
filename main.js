// hamberger menu
let menuBtn = document.querySelector('#menu-btn')
let menu = document.querySelector('#menu')
let title = document.querySelector('#title')
menuBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden')
    menu.classList.toggle('flex')
    menu.classList.toggle('item-center')
    menu.classList.toggle('justify-end')
    title.classList.toggle('hidden')
})


let searchBtn = document.querySelector('#search-btn')
let searchWrapper = document.querySelector('#search-wrapper')
let completedBtn = document.querySelector('#completed-btn')

searchBtn.addEventListener('click', () => {
    searchBtn.classList.add('hidden')
    completedBtn.classList.add('hidden')
    searchWrapper.classList.remove('hidden')

    // searchBtn.classList.add('opacity-0')
    // searchBtn.classList.add('invisible')
    // completedBtn.classList.add('opacity-0')
    // completedBtn.classList.add('invisible')

    // searchWrapper.classList.remove('invisible')
    // searchWrapper.classList.add('visible')
    // searchWrapper.classList.toggle('opacity-0')
    // searchWrapper.classList.toggle('-z-[1]')
})

// close search btn
let closeSearchBtn = document.querySelector('#search-close-btn')
let searchInput = document.querySelector('#search-input')


closeSearchBtn.addEventListener('click', () => {

    // if (searchInput.value === '') {
    //     searchBtn.classList.remove('opacity-0')
    //     searchBtn.classList.remove('invisible')
    //     completedBtn.classList.remove('opacity-0')
    //     completedBtn.classList.remove('invisible')

    //     searchWrapper.classList.add('invisible')
    //     searchWrapper.classList.remove('visible')
    //     searchWrapper.classList.toggle('opacity-0')
    //     searchWrapper.classList.toggle('-z-[1]')
    // } else {
    //     searchInput.value = '';
    // }
})