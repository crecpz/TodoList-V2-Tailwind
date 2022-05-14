const menuBtn = document.querySelector('#menu-btn')
const menu = document.querySelector('#menu')
const title = document.querySelector('#title')

const searchBtn = document.querySelector('#search-btn')
const searchWrapper = document.querySelector('#search-wrapper')
const closeSearchBtn = document.querySelector('#search-close-btn')
const searchInput = document.querySelector('#search-input')







/* Todo Input */

//  adding new todo by {click addBtn} & {press Enter}
const todoInput = document.querySelector('#todo-input')
const addBtn = document.querySelector('#add-btn')

// {click addBtn}
addBtn.addEventListener('mousedown', e => {
    addBtn.classList.add('add-btn--active')
    addBtn.style.animation = '';

    // 防止使用者壓著滑鼠不放移出範圍產生的按鈕卡住問題
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

function addNewTodo() {

    if (todoInput.value.trim() !== '') {
        if (!todoListData) {
            todoListData = [];
        }

        let inputData = {
            content: todoInput.value,
            // checked: false,
            status: 'active',
        }

        todoListData.unshift(inputData)
        todoInput.value = '';
        localStorage.setItem('todos', JSON.stringify(todoListData))
        renderTodo(currentTab)

        // if(currentTab !== 'completed'){
        //     latestItemHighlight(todoList)
        // }    

    } else {
        todoInput.value = '';
    }
}



/* Todo List */


/* status(全部、待完成、已完成) */
const statusTabs = document.querySelector('#status');
let currentTab = JSON.parse(localStorage.getItem('currentTab')) || 'all';

activeCurrentTab()

function activeCurrentTab() {
    const activeTarget = statusTabs.querySelector(`#${currentTab}`)
    statusTabs.querySelectorAll('.status__tab').forEach(item => {
        item.classList.remove('status__tab--current')
    })
    activeTarget.classList.add('status__tab--current')
}


statusTabs.addEventListener('click', updateCurrentStatus)

function updateCurrentStatus(e) {
    currentTab = e.target.id;
    localStorage.setItem('currentTab', JSON.stringify(currentTab))
    activeCurrentTab()
    renderTodo(currentTab)
}




const todoList = document.querySelector('#todo-list')
let todoListData = JSON.parse(localStorage.getItem('todos'))

renderTodo(currentTab)

function renderTodo(currentTab) {
    let checkbox;
    let todoItems = '';

    if (todoListData) {

        todoListData.forEach((data, index) => {
            // 檢查每一項todoListData內的「status」，確認其狀態是否為active
            if (data.status === 'active') {
                checkbox = ''
            } else {
                checkbox = 'checked'
            }

            if (currentTab === data.status || currentTab === 'all') {
                todoItems +=
                    `<li class="todo-item" id="${index}"">
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
                            <button class="edit-btn btn mr-4"><i
                                    class="fa-solid fa-pen-to-square mr-2"></i>編輯</button>
                            <button class="remove-btn btn btn-hightlight"><i
                                    class="fa-solid fa-trash mr-2"></i>刪除</button>
                        </div>
                    </li>`
            }
            todoList.innerHTML = todoItems || '<p id="empty-msg" class="text-primary text-center py-4">Is empty here.</p>';
        })
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

function addedPrompt() {

}



function checkIfListEmpty() {
    if (todoListData.length === 0) {
        todoList.innerHTML = '<p id="empty-msg" class="text-primary text-center py-4">Is empty here.</p>';
    }
}

todoList.addEventListener('click', e => {
    if (e.target.id !== 'empty-msg') {
        // 取得點按的目標todoItem
        const todoItem = e.target.closest('li')

        /* 展開todo-option */

        // 如果使用者點按todo-option-btn，使其展開todo-option
        const todoOption = todoItem.querySelector('.todo-option');
        if (e.target.classList.value === 'todo-option-btn') {
            todoOption.classList.toggle('todo-option--open')
        }

        /* 控制checkbox狀態 */
        if (e.target.tagName === 'LABEL' || e.target.tagName === 'INPUT') {
            changeStatus()
        }


        /**
         * 更換checkbox的狀態。
         * 1.更換在HTML中，對應項目的data-status狀態 2.更換todoListData中，對應項目的status屬性，並將其更新至localStorage
         */
        function changeStatus() {
            const todoCheckbox = todoItem.querySelector('.todo-checkbox')
            todoListData[todoItem.id].status = todoCheckbox.checked ? 'completed' : 'active';
            localStorage.setItem('todos', JSON.stringify(todoListData))
            // console.log(todoCheckbox.checked)
            // console.log(`
            // 現在的cruuentTab是${currentTab}
            // 此todoItem的checkbox狀態是${}
            // `)



            // 這邊不會執行，不知道為什麼
            // renderTodo(currentTab)
        }



        /* 編輯todoText */
        if (e.target.classList.contains('edit-btn')) {
            // 一按下「編輯」，就收合已展開的todoOption
            todoOption.classList.remove('todo-option--open')

            // 獲取todoText DOM
            const todoText = todoItem.querySelector('.todo-text')

            // 調用editMode()
            editMode();

            /**
             * 編輯模式:開啟
             */
            function editMode() {
                // 準備內容: 先獲取editDialogDOM，加入HTML結構，並把todoText.innerHTML內容抓進編輯輸入框內
                const editDialog = document.querySelector('#edit-dialog')
                editDialog.innerHTML =
                    `
                    <p class="text-xl text-center mb-8">編輯待辦事項</p>
                    <textarea id="edit-text" class="w-full h-[80px] p-2 bg-secondary outline-none border border-primary  rounded-md overflow-y-auto"></textarea>
                    <div class="flex justify-center items-center mt-8">
                    <button class="cancel-btn btn btn-small mr-6">取消</button>
                    <button class="save-btn btn btn-small">儲存</button>
                `

                // 設定輸入框內容為可編輯狀態，並在對話框彈出時，內容文字已被全選
                let editText = editDialog.querySelector('#edit-text')
                editText.value = todoText.innerHTML;
                editText.select()


                // 以下這段暫時用不到，但是如果未來在處理手機板不會自動全選的時候，可能會用到
                // 先不刪
                // editText.setAttribute('contenteditable', true)

                // selectText(editText)

                // function selectText(node) {
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

                // 先確保在開啟dialog前，dialog是關閉的狀態
                editDialog.close()

                // 以上內容準備完成後，使對話框彈出
                editDialog.showModal()




                // 在editDialog中有兩個按鈕，分別是【取消】與【儲存】:

                // 當使用者按下【儲存】(無論是否有編輯過):
                // 關閉dialog -> 將已編輯的todoText更新至HTML與localstorage -> 自動將原本已經勾選的checkbox取消勾選
                const saveBtn = editDialog.querySelector('.save-btn')
                saveBtn.addEventListener('click', () => closeDialog(editDialog))
                saveBtn.addEventListener('click', updateChanges)
                saveBtn.addEventListener('click', changeToActive)

                // 當使用者按下【取消】: 1.關閉dialog  2.檢查使用者是否有編輯過內容
                const cancelBtn = editDialog.querySelector('.cancel-btn')
                cancelBtn.addEventListener('click', () => closeDialog(editDialog))
                cancelBtn.addEventListener('click', checkIfEdited)

                /**
                 * 注意:此函數的內容只有在使用者已經更動過editText中的內容卻未儲存的情況下才會執行。
                 * 確認使用者是否更動todTtext，如果有，則執行此函式的內容；
                 * 如果沒有，則忽略此函式的內容。
                 */
                function checkIfEdited() {
                    // 如果使用者有更動todTtext，則執行以下；沒有則此函式的內容可忽略。                    
                    if (editText.value != todoText.innerHTML) {
                        // 準備內容: 獲取confirmDialog的DOM，在DOM中加入相應的innerHTML
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
                        // 先確保在開啟dialog前，dialog是關閉的狀態
                        confirmDialog.close()

                        // confirmDialog內容準備完成，使confirmDialog彈出
                        confirmDialog.showModal()


                        // 在confirmDialog有兩個按鈕，分別是【不儲存】與【儲存】:

                        // 若使用者選擇【不儲存】--->　關閉此confirmDialog
                        const cancelBtn = confirmDialog.querySelector('.cancel-btn')
                        cancelBtn.addEventListener('click', () => closeDialog(confirmDialog))

                        // 若使用者選擇【儲存】　---> 儲存此次變更
                        // 關閉confirmDialog -> 將已編輯的todoText更新至HTML與localstorage -> 自動將原本已經勾選的checkbox取消勾選
                        const saveBtn = confirmDialog.querySelector('.save-btn')
                        saveBtn.addEventListener('click', () => closeDialog(confirmDialog))
                        saveBtn.addEventListener('click', updateChanges)
                        saveBtn.addEventListener('click', changeToActive)
                    }
                }

                editDialog.addEventListener('keydown', e => {
                    /* 原本想要做按下esc可以等同於按下取消鈕一樣的效果，但出了點問題，像是如果 
                    把文字編輯過之後，再次打開編輯框，不做任何編輯就按ESC，會跳出checkIfEdited對話框 */
                    // if (e.key === "Escape") {
                    //     e.preventDefault();
                    //     e.stopPropagation()
                    //     closeDialog(editDialog);
                    //     checkIfEdited();
                    // }


                    // 所以，我想試著用 esc 點下去就相當於點下取消按鈕，我不要再重複綁一堆亂七八糟的了，先來研究如何阻止連續觸發keydown
                    // https://localcoder.org/prevent-javascript-keydown-event-from-being-handled-multiple-times-while-held-do#solution_3

                    if (e.key === "Escape") {
                        e.preventDefault();
                        cancelBtn.click();
                    }

                    if (e.key === "Enter") {
                        e.preventDefault();
                        closeDialog(editDialog);
                        updateChanges();
                        changeToActive();
                    }
                })

                /**
                * 將已編輯的todoText更新至HTML與localstorage
                */
                function updateChanges() {
                    // 將編輯後的文字更新至DOM
                    todoText.innerHTML = editText.value;
                    // 將編輯後的文字更新至todoListData中
                    todoListData[todoItem.id].content = editText.value
                    // 將最新的todoListData更新至localstorage中
                    localStorage.setItem('todos', JSON.stringify(todoListData))
                }

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

                /**
                 * 在編輯過後，若使用者按下「儲存」，自動將原本已經勾選的checkbox取消勾選
                 */
                function changeToActive() {
                    const checkbox = todoItem.querySelector('.todo-checkbox')
                    if (checkbox.checked) {
                        checkbox.click()
                    }
                }

            }
        }

        /* 移除項目 */
        if (e.target.classList.contains('remove-btn')) {
            removeTodo()
            checkIfListEmpty()
        }

        function removeTodo() {
            // 找出在localStorage中的todo所有除了點到的這項以外的todo，然後重新賦值(更新)給todoListData
            todoListData = todoListData.filter(data => data !== todoListData[todoItem.id])
            localStorage.setItem('todos', JSON.stringify(todoListData))
            renderTodo(currentTab)
        }
    }
})

/* 移除所有已完成項目 */
const clearBtn = document.querySelector('#clear-btn')
clearBtn.addEventListener('click', clearCompleted)
function clearCompleted() {
    todoListData = todoListData.filter(data => {
        return data.status !== 'completed';
    })
    renderTodo(currentTab)
    checkIfListEmpty()
    localStorage.setItem('todos', JSON.stringify(todoListData))
}