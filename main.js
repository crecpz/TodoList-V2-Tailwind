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
// menuBtn.addEventListener('click', showMenu)


menuBtn.addEventListener('click', fadeoutTitle)
// menuBtn.addEventListener('click', fadeoutMenu)


// menuBtn.addEventListener('click', () => {
//     fadeout(title, showMenu)
// })
// menuBtn.addEventListener('click', fadeoutFather)

// function fadeoutFather() {
//     fadeout(title, showMenu)
// }



// menuBtn.addEventListener('click', ()=>{
//     title.classList.add('animation-fadeout')
//     title.addEventListener('animationend', showMenu)
// })
searchBtn.addEventListener('click', hamburger_arrowSwitcher)
searchBtn.addEventListener('click', openSearchInput)

function fadeoutTitle() {
    fadeoutItem(title, showMenu, menuBtn, fadeoutTitle)
}
function fadeoutMenu() {
    fadeoutItem(menu, backToHomepage, menuBtn, fadeoutMenu)
}

/* 以下測試中 */

// function fadeinMenu() {
//     fadeinItem(menu, showMenu, menuBtn, fadeinMenu)
// }

// function fadeinItem(targetItem, callback, evenTarget, evenTargetCallback) {
//     targetItem.classList.add('animation-fadein')
//     targetItem.addEventListener('animationend', () => {
//         callback()
//         targetItem.classList.remove('animation-fadein')
//         evenTarget.removeEventListener('click', evenTargetCallback)
//     })
// }

// 先檢查看看函數有沒有問題，接著檢查函數連接的相關事件有沒有問題。
// 如果檢查函數大概沒問題卻還是不會動，可以考慮【來與回只寫來不寫回】
// 畢竟很多都重複動作的感覺

/* 以上測試中 */


/* 以下沒問題 */

// fadeoutItem(要fadeout的對象, 結束動畫後要執行的函數, 事件觸發對象, 事件觸發對象callback函數) 
function fadeoutItem(targetItem, callback, evenTarget, evenTargetCallback) {
    targetItem.classList.add('animation-fadeout')
    targetItem.addEventListener('animationend', () => {
        callback()
        targetItem.classList.remove('animation-fadeout')
        evenTarget.removeEventListener('click', evenTargetCallback)
    })
}


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



// 原汁原味showMenu()
function showMenu() {
    style_hideTitle();
    style_showMenu();
    menuBtn.removeEventListener('click', showMenu);
    // backup!! menuBtn.addEventListener('click', backToHomepage);
    menuBtn.addEventListener('click', fadeoutMenu);
}

// 原汁原味 backToHomepage()
function backToHomepage() {
    style_hideMenu()
    style_showTitle()
    menuBtn.removeEventListener('click', backToHomepage)
    menuBtn.addEventListener('click', showMenu)
}



// function showMenu() {
//     title.classList.add('animation-fadeout')
//     title.addEventListener('animationend', () => {
//         title.classList.remove('animation-fadeout')
//         style_hideTitle();
//         style_showMenu();
//     })
//     menuBtn.removeEventListener('click', showMenu);
//     menuBtn.addEventListener('click', backToHomepage);
// }


// function backToHomepage() {
//     menu.classList.add('animation-fadeout')
//     menu.addEventListener('animationend', () => {
//         menu.classList.remove('animation-fadeout')
//         style_hideMenu()
//         style_showTitle()
//     })
//     menuBtn.removeEventListener('click', backToHomepage)
//     menuBtn.addEventListener('click', showMenu)
// }

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