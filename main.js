/* ------ Table of contents ------
    

 */



/**
 * .preload class用來防止動畫在載入時或重新整理時播放，
 * 在頁面載入後的500ms後刪掉它。 
 */
setTimeout(function () {
    document.body.classList.remove('preload');
}, 500);

const loader = document.querySelector('#loader');
// loader

const letterWrapper = document.querySelector('#letter-wrapper');

setTimeout(() => {
    [...letterWrapper.children].forEach((letter, index, arr) => {
        letter.classList.add('animate-jumping-letter');
        if (arr[index + 1]) {
            arr[index + 1].style.animationDelay = (index + 1) + '00ms';
        };
    })
}, 1200);



letterWrapper.lastChild.addEventListener('animationend', () => {
    loader.classList.add('animate-fade-out');
}, { once: true })



const title = document.querySelector('#title')
const clearBtnWrapper = document.querySelector('#clear-btn-wrapper')

let currentTab = JSON.parse(localStorage.getItem('currentTab')) || 'all';

/* Todo Input */

//  透過'滑鼠點擊addBtn'或'鍵盤按下Enter'來新增todo-item
const todoInput = document.querySelector('#todo-input')
const addBtn = document.querySelector('#add-btn')

// 滑鼠點擊addBtn
addBtn.addEventListener('mousedown', e => {
    addBtn.classList.add('add-btn--active');

    // 防止使用者壓著滑鼠不放移出範圍產生的按鈕卡住問題
    addBtn.addEventListener('mouseout', () => {
        addBtn.classList.remove('add-btn--active')
    })
})

addBtn.addEventListener('mouseup', e => {
    addNewTodo()
    addBtn.classList.remove('add-btn--active')

    clearTextBtn.classList.add('hide');
})

addBtn.addEventListener('click', addNewTodo)


// 鍵盤按下Enter
todoInput.addEventListener('keydown', e => {
    if (e.key === "Enter") {
        addBtn.classList.add('add-btn--active')
    }
})

todoInput.addEventListener('keyup', e => {
    if (e.key === "Enter") {
        addNewTodo()
        addBtn.classList.remove('add-btn--active')
    }

    clearTextBtn.classList.add('hide');
})

function addNewTodo() {

    if (todoInput.value.trim() !== '') {
        if (!todoListData) {
            todoListData = [];
        }

        let inputData = {
            content: todoInput.value,
            status: 'active',
        }

        todoListData.unshift(inputData)
        todoInput.value = '';
        localStorage.setItem('todos', JSON.stringify(todoListData))
        renderTodo(currentTab)
        showSuccessAddedMsg()

    } else {
        todoInput.value = '';
    }
}




/*
以下針對彈出的訊息框做說明:

由於目前仍未找到當動畫重複觸發時，重新執行動畫的方法，
所以這部分先擱置，先去處理該處理的其他部分。
(怕忘記這邊說一下:重複執行動畫是要用在alert message這個div的::before部分，
    為了使progress(進度條動畫)可以重新從100%開始倒數)
    
 */

const messageWrapper = document.querySelector('#message-wrapper');

/* 這行暫時寫的 用完務必刪除 */
addBtn.addEventListener('click', showSuccessAddedMsg)


function showSuccessAddedMsg() {
    if (currentTab === 'completed') {

        messageWrapper.classList.add('before:w-full');
        messageWrapper.classList.remove('hide');
        messageWrapper.innerHTML =
            `<i class="fa-regular fa-circle-check text-lg"></i>
                已成功新增至<span class="text-tertiary-dark">待完成</span>！`
        messageWrapper.classList.add('animate-popdown');
        messageWrapper.classList.add('before:animate-progress');

        setTimeout(() => {
            messageWrapper.classList.add('animate-hide-up');
            messageWrapper.classList.remove('animate-popdown');
            messageWrapper.classList.remove('before:animate-progress');

            messageWrapper.addEventListener('animationend', () => {
                messageWrapper.classList.remove('animate-hide-up');
                messageWrapper.innerHTML = '';
                messageWrapper.classList.add('hide');
                messageWrapper.classList.remove('show');
            }, { once: true })
        }, 2000)
    }

}


/**
 * 顯示提示訊息
 * @param {*} msg 欲顯示的訊息內容
 */
function showMsg(msgContent) {
    // msgWrapper 
    msgWrapper.innerHTML = msgContent;
}



/* clear text button */
const clearTextBtn = document.querySelector('#clear-text-btn');
const clearTextBtnWrapper = clearTextBtn.parentElement;
clearTextBtnWrapper.addEventListener('click', () => {
    // clearTextBtnWrapper是額外做出來的區塊，所以點它並不會使input聚焦，要手動增加點，使他點了之後可以聚焦input
    todoInput.focus();
})

todoInput.addEventListener('keyup', clearTextBtnController)

function clearTextBtnController() {
    if (todoInput.value !== '') {
        clearTextBtn.classList.remove('hide');
    } else {
        clearTextBtn.classList.add('hide');
    }
}

clearTextBtn.addEventListener('click', () => {
    clearTextBtn.classList.toggle('hide');
    todoInput.value = '';
})







/* Todo List */

/* status(全部、待完成、已完成) */
const statusTabs = document.querySelector('#status');

activeCurrentTab()

/**
 * 將css中的.status__tab--current狀態給某一個status__tab。
 */
function activeCurrentTab() {
    const activeTarget = statusTabs.querySelector(`#${currentTab}`)
    statusTabs.querySelectorAll('.status__tab').forEach(item => {
        item.classList.remove('status__tab--current')
    })
    activeTarget.classList.add('status__tab--current')
}


statusTabs.addEventListener('click', updateCurrentStatus)

function updateCurrentStatus(e) {
    // 此判斷式是為了防止e.target點到其他目標，將錯誤的id傳給了currentTab
    if (e.target.tagName === 'BUTTON') {
        currentTab = e.target.id;
    }

    localStorage.setItem('currentTab', JSON.stringify(currentTab))
    activeCurrentTab()

    renderTodo(currentTab)
    checkIfListEmpty()
}

const todoList = document.querySelector('#todo-list')
let todoListData = JSON.parse(localStorage.getItem('todos'))

renderTodo(currentTab)

function renderTodo(currentTab) {
    let checkbox;
    let todoItems = '';

    todoListData.forEach((data, index) => {
        // 檢查每一項todoListData內的「status」，確認其狀態是否為active
        if (data.status === 'active') {
            checkbox = '';
            dataCheck = false;
        } else {
            checkbox = 'checked';
            dataCheck = true;
        }

        if (currentTab === data.status || currentTab === 'all') {
            todoItems +=
                `<li class="todo-item" id="${index}" data-status="${data.status}">
                    <label class="flex items-center justify-between w-full py-3 cursor-pointer xs:py-4">
                        <input type="checkbox" class="todo-checkbox" ${checkbox}>
                        <p class="todo-text">${data.content}</p>
                        <button class="todo-option-btn">
                            <div class="todo-option-btn__dot"></div>
                            <div class="todo-option-btn__dot"></div>
                            <div class="todo-option-btn__dot"></div>
                        </button>
                    </label>

                    <div class="todo-option">
                        <button class="edit-btn btn btn-normal mr-4">
                            <i class="fa-solid fa-pen-to-square mr-2"></i>編輯
                        </button>
                        <button class="remove-btn btn btn-hightlight">
                            <i class="fa-solid fa-trash mr-2"></i>刪除
                        </button>
                    </div>
                </li>`
        }

        if (todoItems) {
            todoList.innerHTML = todoItems;
        } else {
            showEmptyMsg()
        }
    })


    if (isAnyItemCompleted()) {
        showClearBtn()
        addPaddingBottom()
    } else {
        hideClearBtn()
        removePaddingBottom()
    }
}


/**
 * 檢查是否有任何一個項目已經是completed狀態。
 * @returns Boolean
 */
function isAnyItemCompleted() {
    const todoItems = [...document.querySelectorAll('.todo-item')];
    return todoItems.some(todoItem => todoItem.dataset.status === 'completed');
}






/**
 * 在todoList增加額外的padding。
 * 
 * 為了防止「清除已完成」按鈕擋住內容，當「清除已完成」按鈕彈出時，使todoList的padding-bottom增加一個「清除已完成」的clientHeight的空間。
 */
function addPaddingBottom() {
    todoList.style.paddingBottom = clearBtnWrapper.clientHeight + 'px';
}

/**
 * 清除在todoList增加額外的padding。
 * 
 * 為了防止「清除已完成」按鈕擋住內容，當「清除已完成」按鈕彈出時，使todoList的padding-bottom增加一個「清除已完成」的clientHeight的空間。
 */
function removePaddingBottom() {
    todoList.style.paddingBottom = '';
}



/**
 * 控制hide-down動畫與popup動畫在clearBtnWrapper的classList狀態。
 * 此函數用來隱藏clearBtn。
 */
function hideClearBtn() {
    clearBtnWrapper.classList.add('animate-hide-down');
    clearBtnWrapper.classList.remove('animate-popup');
}

/**
 * 控制hide-down動畫與popup動畫在clearBtnWrapper的classList狀態。
 * 此函數用來顯示clearBtn。
 */
function showClearBtn() {
    clearBtnWrapper.classList.add('animate-popup');
    clearBtnWrapper.classList.remove('animate-hide-down');
}

/**
 * 在todoList為空的時候顯示訊息來告知使用者此處沒內容。
 * 
 * 在顯示訊息內容之前會先進行判斷，當前的頁面(currentTab)位於待完成(active)或是全部(all)，
 * 與當前的頁面(currentTab)位於已完成(completed)所顯示的訊息會有所不同。
 * 
 */
function showEmptyMsg() {
    if (currentTab === 'active' || currentTab === 'all') {
        todoList.innerHTML =
            `<div id="empty-msg" class="relative flex flex-col items-center justify-between w-full h-full pointer-events-none">
                <div class="flex flex-col items-center my-auto">
                    <img class="max-w-[150px] w-full" src="img/todo-illustration.svg">
                    <p class="text-primary text-center mt-6 font-bold">目前沒有待辦事項<br>在下方輸入新的待辦事項吧！</p>
                </div>
                <i class="fa-solid fa-arrow-down-long absolute -bottom-0 text-xl text-primary mb-4 animate-bounce"></i>
            </div>`;
    } else {
        todoList.innerHTML =
            `<div id="empty-msg" class="flex flex-col items-center justify-between w-full h-full pointer-events-none">
                <div class="flex flex-col items-center my-auto">
                    <img class="max-w-[150px] w-full" src="img/todo-illustration.svg">
                    <p class="text-primary text-center mt-6 font-bold">目前沒有已完成事項!</p>
                </div>
            </div>`
    }
}

todoList.addEventListener('click', e => {

    if (e.target.id !== 'empty-msg' && e.target.closest('li')) {

        // 取得點按的目標todoItem
        const todoItem = e.target.closest('li');

        // 展開todo-option


        // 如果使用者點按todo-option-btn，使其展開todo-option
        const todoOption = todoItem.querySelector('.todo-option');


        if (e.target.classList.value === 'todo-option-btn') {
            if (todoOption.classList.contains('todo-option--open')) {
                todoOption.classList.remove('todo-option--open');
                todoItem.classList.remove('todo-item--todo-option-open');
            } else {
                todoOption.classList.add('todo-option--open');
                todoItem.classList.add('todo-item--todo-option-open');
            }



            /* 找出所有的.todo-item:
            1.保留當前所點擊的todoItem身上的「todo-item--todo-option-open」className，並移除所有非當前的
            2.保留當前所點擊的todoItem中的.todo-option身上的todo-option--open，並移除所有非當前的
            */
            document.querySelectorAll('.todo-item')
                .forEach(i => {
                    if (i.id !== todoItem.id) {
                        i.classList.remove('todo-item--todo-option-open');
                        i.querySelector('.todo-option').classList.remove('todo-option--open');
                    }
                });
        }

        /* 控制checkbox狀態 */
        if (e.target.tagName === 'LABEL' || e.target.tagName === 'INPUT') {
            changeStatus();

            /* 滑走動畫試寫 */
            // removingItem()
            // function removingItem() {
            //     todoItem.classList.add('animate-remove-item')
            // }

            if (isAnyItemCompleted()) {
                showClearBtn()
                addPaddingBottom()
            } else {
                hideClearBtn()
                removePaddingBottom()
            }
        }

        /**
         * 更換checkbox的狀態，一共會更換2處。
         * 1.更換在HTML中，對應項目的data-status狀態 2.更換todoListData中，對應項目的status屬性，並將其更新至localStorage
         */
        function changeStatus() {
            const todoCheckbox = todoItem.querySelector('.todo-checkbox');
            todoListData[todoItem.id].status = todoCheckbox.checked ? 'completed' : 'active';
            todoItem.dataset.status = todoListData[todoItem.id].status;
            localStorage.setItem('todos', JSON.stringify(todoListData));
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
                const editDialog = document.querySelector('#edit-dialog');
                editDialog.innerHTML =

                    `<p class="text-xl text-primary text-center mb-6">編輯待辦事項</p>
                    <textarea id="edit-text" class="w-full h-[80px] p-2 mb-6 bg-secondary outline-none border-2 border-primary/50 rounded-lg overflow-y-auto"></textarea>
                    <div class="flex justify-center items-center">
                        <button class="cancel-btn btn btn-normal mr-6">
                            <i class="fa-solid fa-circle-xmark mr-2"></i>取消
                        </button>
                        <button class="save-btn btn btn-hightlight">
                            <i class="fa-solid fa-floppy-disk mr-2"></i>儲存
                        </button>
                    </div>
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
                                <p class="text-center text-sm">是否儲存變更?</p>
                                <div class="flex justify-center items-center mt-6">
                                    <button class="cancel-btn btn btn-normal mr-6">
                                        <i class="fa-solid fa-circle-xmark mr-2"></i>不儲存
                                    </button>
                                    <button class="save-btn btn btn-hightlight">
                                        <i class="fa-solid fa-floppy-disk mr-2"></i>儲存
                                    </button>
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






/**
 * 檢查todoListData是否為空，如果為空，則:
 *  1.顯示出emptyMsg
 *  2.隱藏clearBtn
 *  3.移除在todoList所新增的padding-bottom
 */
function checkIfListEmpty() {
    if (todoListData.length === 0) {
        showEmptyMsg();
        hideClearBtn();
        removePaddingBottom();
    }
}

/* 移除所有已完成項目 */
const clearBtn = document.querySelector('#clear-btn')

clearBtn.addEventListener('click', () => {
    clearCompleted();
    renderTodo(currentTab);
    checkIfListEmpty();
    localStorage.setItem('todos', JSON.stringify(todoListData));
})

/**
 * 清除所有已完成的項目
 * 
 * 將todoListData使用Array.fliter()檢查todoListData內每一個項目的status鍵，
 * 將所有的status鍵中的值不是'completed'的項目賦值給todoListData。
 */
function clearCompleted() {
    todoListData = todoListData.filter(data => {
        return data.status !== 'completed';
    })
}