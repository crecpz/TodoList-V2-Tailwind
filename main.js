let btn = document.querySelector('#btn')
let searchBar = document.querySelector('#search-bar')

btn.addEventListener('click',()=>{
    btn.classList.toggle('min-w-full')
    searchBar.classList.toggle('opacity-0')
})
