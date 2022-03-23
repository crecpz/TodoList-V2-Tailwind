let btn = document.querySelector('#btn')
let searchBar = document.querySelector('#search-bar')
btn.addEventListener('click', () => {
    btn.classList.add('opacity-0')
    btn.classList.add('invisible')

    searchBar.classList.remove('invisible')
    searchBar.classList.add('visible')
    searchBar.classList.toggle('opacity-0')
    searchBar.classList.toggle('-z-[1]')
})

// close search btn
let closeSearchBtn = document.querySelector('#search-close-btn')
let searchInput = document.querySelector('#search-input')


closeSearchBtn.addEventListener('click', () => {
    if (searchInput.value === '') {
        btn.classList.remove('opacity-0')
        btn.classList.remove('invisible')
        searchBar.classList.add('invisible')
        searchBar.classList.remove('visible')
        searchBar.classList.toggle('opacity-0')
        searchBar.classList.toggle('-z-[1]')
    }else{
        searchInput.value = '';
    }
})