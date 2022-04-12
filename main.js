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
const statusBar = document.querySelector('#status-bar')

menuBtn.addEventListener('click', hamburger_expandSwitcher)
searchBtn.addEventListener('click', hamburger_arrowSwitcher)
searchBtn.addEventListener('click', openSearchInput)


menuBtn.addEventListener('click', fadeOutTitle)
menuBtn.addEventListener('click', fadeInMenu)

statusBar.addEventListener('click', statusBarActive)


function fadeOutTitle() {
    fadeOutItem(title, showMenu, menuBtn, fadeOutTitle, fadeInTitle)
}

function fadeInMenu() {
    fadeInItem(menu, showMenu, menuBtn, fadeInMenu, fadeOutMenu)
}

function fadeOutMenu() {
    fadeOutItem(menu, backToHomepage, menuBtn, fadeOutMenu, fadeInMenu)
}

function fadeInTitle() {
    fadeInItem(title, backToHomepage, menuBtn, fadeInTitle, fadeOutTitle)
}


// (要fadeOut的對象, 結束動畫後要執行的函數, 事件觸發對象, 事件觸發對象callback函數) 
function fadeInItem(targetItem, callback, evenTarget, removeCallback, addCallback) {
    targetItem.classList.add('animation-fade-in')
    targetItem.addEventListener('animationend', () => {
        menuBtn.classList.remove('pointer-events-none')
        evenTarget.removeEventListener('click', removeCallback)
        callback()
        targetItem.classList.remove('animation-fade-in')
        evenTarget.addEventListener('click', addCallback)
        // menuBtn.disabled = false;
    })
}

function fadeOutItem(targetItem, callback, evenTarget, removeCallback, addCallback) {
    targetItem.classList.add('animation-fade-out')
    targetItem.addEventListener('animationend', () => {
        menuBtn.classList.remove('pointer-events-none')
        callback()
        targetItem.classList.remove('animation-fade-out')
        evenTarget.removeEventListener('click', removeCallback)
        evenTarget.addEventListener('click', addCallback)
    })
}




// hamburger switcher(expand & collapse)
function hamburger_expandSwitcher() {
    menuBtn.disabled = true;
    let disabledTime = setTimeout(() => {
        menuBtn.disabled = false;
        // clearTimeout(disabledTime)
        // console.log('clear!');
    }, 600)



    // menuBtn.classList.add('pointer-events-none')
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
    style_hideTitle();
    style_showMenu();
    menuBtn.removeEventListener('click', showMenu);
}

function backToHomepage() {
    style_hideMenu()
    style_showTitle()
    menuBtn.removeEventListener('click', backToHomepage)
}

function openSearchInput() {
    style_showSearchInput()
    style_hideMenu()

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
    showMenu()
    menuBtn.removeEventListener('click', closeSearchInput);
    menuBtn.removeEventListener('click', hamburger_arrowSwitcher);
    menuBtn.addEventListener('click', backToHomepage);
    menuBtn.addEventListener('click', hamburger_expandSwitcher);
}

/* style控制系列 */

function style_hideTitle() {
    title.classList.add('hidden')
}

function style_showTitle() {
    title.classList.remove('hidden')
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

function statusBarActive(e) {
    if (e.target.tagName === 'BUTTON') {
        statusBar.querySelectorAll('button').forEach(item => {
            item.classList.remove('bg-primary')
            item.classList.remove('text-black')
        })

        e.target.classList.add('bg-primary')
        e.target.classList.add('text-black')
    }
}