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

//  adding new todo by {click addBtn} & {press Enter}
const todoInput = document.querySelector('#todo-input')
const addBtn = document.querySelector('#add-btn')


// {click addBtn}
addBtn.addEventListener('mousedown', e => {
    addBtn.classList.add('add-btn--active')
    addBtn.style.animation = '';

    // 防止用戶壓著滑鼠不放移出範圍產生的按鈕卡住問題
    addBtn.addEventListener('mouseout', () => {
        addBtn.classList.remove('add-btn--active')
    })
})

addBtn.addEventListener('mouseup', e => {
    addNewTodo()
    addBtn.classList.remove('add-btn--active')

    // 按下addBtn產生的動畫效果
    addBtnTransition()
})

// 仍需要一個設定是當用戶重複點按的時候，使按紐背景變黑，且重跑動畫。

function addBtnTransition() {
    addBtn.style.animation = "add-btn-transition linear 2000ms forwards";
    addBtn.addEventListener('animationend', () => {
        addBtn.style.animation = '';
    })
}

addBtn.addEventListener('click', addNewTodo)


// {press Enter}

todoInput.addEventListener('keydown', e => {
    if (e.key === "Enter") {
        addBtn.classList.add('add-btn--active')
    }
    addBtn.style.animation = '';
})

todoInput.addEventListener('keyup', e => {
    if (e.key === "Enter") {
        addNewTodo()
        addBtn.classList.remove('add-btn--active')
        // 按下addBtn產生的動畫效果
        addBtnTransition()
    }
})




/* Todo List */
const todoList = document.querySelector('#todo-list')
let todoListData = JSON.parse(localStorage.getItem('todos'))

renderTodo()


function renderTodo() {
    let checkbox;
    // let disabled;
    let todoItems = '';

    if (todoListData) {
        todoListData.forEach((data, index) => {
            if (data.status === 'active') {
                checkbox = ''
                // disabled = ''
            } else {
                checkbox = 'checked'
                // disabled = 'disabled'
            }


            todoItems +=
                `<li class="todo-item" id="${index}">
                    <label class="flex items-center justify-between w-full cursor-pointer">
                        <input type="checkbox" class="todo-checkbox" ${checkbox}>
                        <p class="todo-text">${data.content}</p>
                        <button class="todo-option-btn">
                            <div class="todo-option-btn__dot"></div>
                            <div class="todo-option-btn__dot"></div>
                            <div class="todo-option-btn__dot"></div>
                        </button>
                    </label>
                    <div class="todo-option">
                        <button class="edit-btn btn btn--small mr-8">編輯<i
                                class="fa-solid fa-pen-to-square ml-2"></i></button>
                        <button class="remove-btn btn btn--small">刪除<i
                                class="fa-solid fa-trash ml-2"></i></button>
                    </div>
                </li>`

            // 英文版
            // `<li class="todo-item" id="${index}">
            //     <label class="flex items-center justify-between w-full cursor-pointer">
            //         <input type="checkbox" class="todo-checkbox" ${checkbox}>
            //         <p class="todo-text">${data.content}</p>
            //         <button class="todo-option-btn">
            //             <div class="todo-option-btn__dot"></div>
            //             <div class="todo-option-btn__dot"></div>
            //             <div class="todo-option-btn__dot"></div>
            //         </button>
            //     </label>
            //     <div class="todo-option">
            //         <button class="edit-btn btn btn--small mr-8">Edit<i
            //                 class="fa-solid fa-pen-to-square ml-2"></i></button>
            //         <button class="remove-btn btn btn--small">Remove<i
            //                 class="fa-solid fa-trash ml-2"></i></button>
            //     </div>
            // </li>`

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
        latestItemHighlight(todoList)


    } else {
        todoInput.value = '';
    }
}

/**
 * 在父層的第一個ElementChild加上動畫效果，以表示它是最新的todo
 * @param {*} parentElement 父層
 */
function latestItemHighlight(parentElement) {
    parentElement.firstElementChild.style.animation = 'latestItem 2000ms ease-in-out';
    parentElement.firstElementChild.addEventListener('animationend', () => {
        parentElement.firstElementChild.style.animation = '';
    })
}


todoList.addEventListener('click', e => {
    if (e.target.id !== 'empty-msg') {
        // 取得點按的目標todoItem
        const todoItem = e.target.closest('li')


        /* 展開todo-option */

        // 如果用戶點按todo-option-btn，使其展開todo-option
        const todoOption = todoItem.querySelector('.todo-option');
        if (e.target.classList.value === 'todo-option-btn') {
            todoOption.classList.toggle('todo-option--open')
        }

       /* 控制checkbox狀態 */
        if (e.target.tagName === 'LABEL' || e.target.tagName === 'INPUT') {
            changeStatus()
        }

        function changeStatus() {
            const todoCheckbox = todoItem.querySelector('.todo-checkbox')
            let isChecked = todoCheckbox.checked;
            todoListData[todoItem.id].status = isChecked ? 'completed' : 'active';
            localStorage.setItem('todos', JSON.stringify(todoListData))
        }



        /* 編輯項目 */
        if (e.target.classList.contains('edit-btn')) {
            // 一按下「編輯」，就收合已展開的todoOption
            todoOption.classList.remove('todo-option--open')

            // 獲取todoText DOM
            const todoText = todoItem.querySelector('.todo-text')

            editingDialog();
            
            /**編輯狀態視窗:開啟 */
            function editingDialog() {
                // 準備內容: 先獲取editDialogDOM，加入HTML結構，並把todoText.innerHTML內容抓進編輯輸入框內
                const editDialog = document.querySelector('#edit-dialog')
                editDialog.innerHTML =
                `
                <p class="text-xl text-center mb-8">編輯待辦事項</p>
                <p id="edit-text" class="h-[80px] p-2 outline-none border border-primary  rounded-md overflow-y-auto">${todoText.innerHTML}</p>
                <div class="flex justify-center items-center mt-8">
                <button class="cancel-btn btn btn-small mr-6">取消</button>
                <button class="save-btn btn btn-small">儲存</button>
                </div> 
                `

                // 設定輸入框內容為可編輯狀態，並在對話框彈出時，內容文字已被全選
                let editText = editDialog.querySelector('#edit-text')
                editText.setAttribute('contenteditable', true)

                selectText(editText)

                function selectText(node) {
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

                // 以上內容準備完成後，使對話框彈出
                editDialog.showModal()


                // 「取消」鈕的相關設定
                const cancelBtn = editDialog.querySelector('.cancel-btn')
                // 如果用戶點按取消鈕，關閉dialog
                cancelBtn.addEventListener('click', () => closeDialog(editDialog))


                // !!!!!!!!!!!!!!!!!!!!!!!!!!! 從此處開始往下還沒有加上註解描述
                // 先試著將這個編輯部分的<p>換成input
                // 那段HTML我已經改成input放在index.html的最下面了
                

                cancelBtn.addEventListener('click', cancelConfirm)

                /**
                 * 此函數用來關閉dialog(附帶監聽animationend)
                 * @param {*} dialog 欲關閉的dialog
                 */
                function closeDialog(dialog) {
                    dialog.setAttribute('closing', '')
                    dialog.addEventListener('animationend', () => {
                        dialog.close();
                        dialog.removeAttribute('closing', '')
                    }, { once: true })
                }

                function cancelConfirm() {
                    // 如果用戶有更動todTtext，則執行以下
                    if (editText.innerHTML != todoText.innerHTML) {
                        const confirmDialog = document.querySelector('#confirm-dialog')
                        confirmDialog.innerHTML =
                            `
                        <div class="flex flex-col items-center">
                            <i class="fa-solid fa-circle-exclamation text-4xl text-primary mb-4 text-center"></i>
                            <p class="text-center text-xl mb-6">編輯尚未儲存</p>
                            <p class="text-center text-sm">是否儲存更動?</p>
                            <div class="flex justify-center items-center mt-6">
                                <button class="cancel-btn btn btn-small mr-6">不儲存</button>
                                <button class="save-btn btn btn-small">儲存</button>
                            </div>
                        </div>
                        `
                        confirmDialog.showModal()

                        const cancelBtn = confirmDialog.querySelector('.cancel-btn')
                        cancelBtn.addEventListener('click', () => closeDialog(confirmDialog))
                    }
                }


                const saveBtn = editDialog.querySelector('.save-btn')
                saveBtn.addEventListener('click', () => closeDialog(editDialog))
                saveBtn.addEventListener('click', updateTodoText)
                function updateTodoText() {
                    todoText.innerHTML = editText.innerHTML;
                    todoListData[todoItem.id].content = editText.innerHTML
                    localStorage.setItem('todos', JSON.stringify(todoListData))
                    // console.log(todoListData[todoItem.id].content)
                }
            }

            /* 這是原本的編輯方式

                todoText.setAttribute('contenteditable', true)

                selectText()

                const editBtn = e.target
                // 需要處理在編輯模式中會點擊到label的問題
                // 還有在已完成模式中藥如何處理編輯問題?
                // 我想到一個方法，編輯完之後預設就是使它變成待完成

                function selectText(node) {
                    // 此處將label取消滑鼠事件，待編輯完畢後要再次打開，記得。
                    // const label = todoItem.querySelector('label')
                    // label.classList.add('pointer-events-none')

                    node = todoText;
                    // node.style.border = '1px dashed'

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


                todoText.addEventListener('blur', cancelEditable)

                function cancelEditable() {
                    todoText.removeAttribute('contenteditable')
                }
                */



        }


        /* 移除項目 */
        if (e.target.classList.contains('remove-btn')) {
            removeTodo()
            if (todoListData.length === 0) {
                todoList.innerHTML = '<p id="empty-msg" class="text-primary-darken text-center py-4">Is empty here.</p>';
            }
        }

        function removeTodo() {
            // 找出在localStorage中的todo所有除了點到的這項以外的todo，然後重新賦值(更新)給todoListData
            todoListData = todoListData.filter(data => data !== todoListData[todoItem.id])
            localStorage.setItem('todos', JSON.stringify(todoListData))
            renderTodo()
        }
    }
})


statusBar.addEventListener('click', statusBarActive)


// 以下兩行是受到selectText函數啟發，原來這樣寫也行，我的作法多套了一層function。但這兩還最後還是會出現閃爍
// menuBtn.addEventListener('click', () => fadeInItem(menu, showMenu, menuBtn, fadeInMenu, fadeOutMenu))
// menuBtn.addEventListener('click', () => fadeOutItem(title, showMenu, menuBtn, fadeOutTitle, fadeInTitle))


/* 編輯文字功能方法一(未完成) begin */
//..........這行以下註解切換
// function selectText(e, node) {
//     const todoItem = e.target.closest('li')

//     // 此處將label取消滑鼠事件，待編輯完畢後要再次打開，記得。
//     const label = todoItem.querySelector('label')
//     label.classList.add('pointer-events-none')

//     node = todoItem.querySelector('.todo-text');
//     node.style.border = '1px dashed'
//     if (document.body.createTextRange) {
//         const range = document.body.createTextRange();
//         range.moveToElementText(node);
//         range.select();
//     } else if (window.getSelection) {
//         const selection = window.getSelection();
//         const range = document.createRange();
//         range.selectNodeContents(node);
//         selection.removeAllRanges();
//         selection.addRange(range);
//     } else {
//         console.warn("Could not select text in node: Unsupported browser.");
//     }
// }


// const clickable = document.querySelectorAll('.edit-btn');
// clickable.forEach(item => {
//     item.addEventListener('click', e => selectText(e, 'todo-text'));
// })
// // const clickable = document.querySelector('.edit-btn');
// // clickable.addEventListener('click', e => selectText(e, 'todo-text'));

// ........這行以上註解切換
/* 編輯文字功能方法一(未完成) end */


/* 編輯文字功能方法二 begin */


/* 編輯文字功能方法二 end */





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

