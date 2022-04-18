const menuBtn = document.querySelector('#menu-btn')
const menu = document.querySelector('#menu')
const title = document.querySelector('#title')
const hamburger = document.querySelector('#hamburger')
const searchBtn = document.querySelector('#search-btn')
const searchWrapper = document.querySelector('#search-wrapper')
const clearBtn = document.querySelector('#clear-btn')
const closeSearchBtn = document.querySelector('#search-close-btn')
const searchInput = document.querySelector('#search-input')
const statusBar = document.querySelector('#status-bar')

/* hamburger switch */
menuBtn.addEventListener('click', hamburger_expandSwitcher)
searchBtn.addEventListener('click', hamburger_arrowSwitcher)

/* open search input */
searchBtn.addEventListener('click', openSearchInput)

/* title, menu -> fadein & fadeout  */
menuBtn.addEventListener('click', fadeOutTitle)
menuBtn.addEventListener('click', fadeInMenu)


/* Todo Input */
const todoInput = document.querySelector('#todo-input')
const addBtn = document.querySelector('#add-btn')
todoInput.addEventListener('keyup', e => {
    if (e.key === "Enter") {
        addNewTodo()
    }
})
addBtn.addEventListener('click', addNewTodo)



/* Todo List */
const todoList = document.querySelector('#todo-list')
const todoItems = todoList.querySelectorAll('.todo-item');
let todoListData = JSON.parse(localStorage.getItem('todos'))

renderTodo()


function renderTodo() {
    let todoItems = '';
    if (todoListData) {
        todoListData.forEach((data) => {
            todoItems +=
                `<li class="todo-item">
                    <div class="flex items-center justify-between w-full">
                        <input type="checkbox" class="todo-checkbox">
                        <p class="todo-text">${data.content}</p>
                        <button class="todo-option-btn">
                            <div class="todo-option-btn__dot"></div>
                            <div class="todo-option-btn__dot"></div>
                            <div class="todo-option-btn__dot"></div>
                        </button>
                    </div>
                    <div class="todo-option">
                        <button class="edit-btn btn btn--small btn--black mr-4">Edit<i
                                class="fa-solid fa-pen-to-square ml-2"></i></button>
                        <button class="remove-btn btn btn--small btn--black">Remove<i
                                class="fa-solid fa-trash ml-2"></i></button>
                    </div>
                </li>`
            todoList.innerHTML = todoItems;
        })
    }

}

function addNewTodo() {
    if (todoInput.value.trim() !== '') {
        if (!todoListData) {
            todoListData = [];
        }

        let inputData = {
            content: todoInput.value,
            checked: false,
            status: 'active',
        }

        todoListData.unshift(inputData)
        todoInput.value = '';
        localStorage.setItem('todos', JSON.stringify(todoListData))
        renderTodo()

    } else {
        todoInput.value = '';
    }
}


todoList.addEventListener('click', e => {
    const todoItem = e.target.closest('li')


    // 如果用戶點按todo-option-btn，使其展開todo-option
    const todoOption = todoItem.querySelector('.todo-option');
    if (e.target.classList.value === 'todo-option-btn') {
        todoOption.classList.toggle('todo-option--open')
    }

    // ★處改成寫進來


})



// ★
// 使editBtn按下去之後該文字區域變成可編輯狀態。
const editBtn = document.querySelectorAll('.edit-btn')
editBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        const todoText = e.target.parentElement.parentElement.querySelector('.todo-text')
        todoText.setAttribute('contenteditable', 'true')
    })
})
//


// 以下兩行是受到selectText函數啟發，原來這樣寫也行，我的作法多套了一層function。但這兩還最後還是會出現閃爍
// menuBtn.addEventListener('click', () => fadeInItem(menu, showMenu, menuBtn, fadeInMenu, fadeOutMenu))
// menuBtn.addEventListener('click', () => fadeOutItem(title, showMenu, menuBtn, fadeOutTitle, fadeInTitle))

statusBar.addEventListener('click', statusBarActive)


/* 以下測試編輯文字 可行 */
function selectText(e, node) {
    node = e.target.parentElement.parentElement.querySelector('.todo-text');
    node.style.border = '1px dashed'
    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
}
const clickable = document.querySelectorAll('.edit-btn');
clickable.forEach(item => {
    item.addEventListener('click', e => selectText(e, 'todo-text'));
})
// const clickable = document.querySelector('.edit-btn');
// clickable.addEventListener('click', e => selectText(e, 'todo-text'));
/* 以上測試編輯文字 */


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
    clearBtn.classList.remove('hidden')
    searchWrapper.classList.add('hidden')
}

function style_showSearchInput() {
    searchBtn.classList.add('hidden')
    clearBtn.classList.add('hidden')
    searchWrapper.classList.remove('hidden')
}

function statusBarActive(e) {
    if (e.target.tagName === 'BUTTON') {
        statusBar.querySelectorAll('.status-bar__btn').forEach(item => {
            item.classList.remove('status-bar__btn--active')
        })

        e.target.classList.add('status-bar__btn--active')
    }
}

