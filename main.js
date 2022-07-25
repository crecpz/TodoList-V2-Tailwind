/*  ------ Table of contents ------
    - loader
*/

// loader
const loader = document.querySelector('#loader');
const letterWrapper = document.querySelector('#letter-wrapper');

setTimeout(() => {
    [...letterWrapper.children].forEach((letter, index, arr) => {
        letter.classList.add('animate-jumping-letter');
        if (arr[index + 1]) {
            arr[index + 1].style.animationDelay = (index + 1) + '00ms';
        };
    })
}, 1400);

letterWrapper.lastChild.addEventListener('animationend', () => {
    loader.classList.add('animate-fade-out');
}, { once: true })



const title = document.querySelector('#title')
const clearBtnWrapper = document.querySelector('#clear-btn-wrapper')

let currentTab = JSON.parse(localStorage.getItem('currentTab')) || 'all';


// ---------- Todo Input ----------

// 透過「 滑鼠點擊addBtn 」或「 鍵盤按下Enter 」來新增todo-item
const todoInput = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');

// 滑鼠點擊addBtn
addBtn.addEventListener('mousedown', () => {
    addBtn.classList.add('add-btn--active');

    // 防止使用者壓著滑鼠不放移出範圍產生的按鈕卡住問題
    addBtn.addEventListener('mouseout', () => {
        addBtn.classList.remove('add-btn--active');
    });
});

addBtn.addEventListener('mouseup', () => {
    addNewTodo();
    addBtn.classList.remove('add-btn--active');
    clearTextBtn.classList.add('hide');
    todoInput.focus();
})

// // 取消在觸控螢幕上按下addBtn的預設行為(鍵盤收起)
// addBtn.addEventListener('touchend', e => {
//     e.preventDefault();
//     console.loclearTextBtng(e)
// })

addBtn.addEventListener('click', addNewTodo);


// 鍵盤按下Enter
todoInput.addEventListener('keydown', e => {
    if (e.key === "Enter") {
        addBtn.classList.add('add-btn--active');
    }
})


// isComposition用來表示現在是否為「選字完成」的狀態，預設是false
let isComposition = false;

// compositionend用來偵測是否完成選字，該事件在選完字按下enter時(keydown)即觸發
todoInput.addEventListener('compositionend', () => {
    if (navigator.userAgent.search("Firefox") > -1) {
        // console.log(true);
        isComposition = true;
    }
})


todoInput.addEventListener('keyup', e => {
    // 如果e.key是Enter，而且isComposition是false狀態    
    if (e.key === "Enter" && !isComposition) {
        addNewTodo();
        addBtn.classList.remove('add-btn--active');
        clearTextBtn.classList.add('hide');
    }

    isComposition = false;
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

        todoListData.unshift(inputData);
        todoInput.value = '';
        localStorage.setItem('todos', JSON.stringify(todoListData));
        renderTodo(currentTab);

        if (currentTab === 'completed') {
            showMsg(msg_addToActive);
        }
    } else {
        todoInput.value = '';
    }
}


// 提示訊息內容:成功新增至待完成
const msg_addToActive = `
    <i class="fa-regular fa-circle-check text-lg mr-4"></i>
    已成功新增至<span class="text-tertiary">待完成</span>！
`;

// 提示訊息內容:成功清除已完成事項
const msg_clearCompleted = `
    <svg class="w-4 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.49 13.13">
        <defs>
            <style>
                .cls-2 {
                    fill: #eee5dc;
                }
            </style>
        </defs>
        <path class="cls-2"
            d="M.8,11.49a1.66,1.66,0,0,0,1.64,1.64H9a1.65,1.65,0,0,0,1.64-1.64V3.28H.8ZM5.23,9.84a.39.39,0,0,1-.56,0L3.08,8.25a.39.39,0,0,1,0-.56.4.4,0,0,1,.56,0L4.94,9,7.85,6.1a.4.4,0,0,1,.56,0,.39.39,0,0,1,0,.56Z" />
        <path class="cls-2"
            d="M10.67.82H8.21L8,.45A.83.83,0,0,0,7.29,0H4.2a.83.83,0,0,0-.73.45L3.28.82H.82a.82.82,0,0,0,0,1.64h9.85a.82.82,0,1,0,0-1.64Z" />
    </svg>成功清除已完成事項！
`;




/**
 * 顯示提示訊息，在在使用者點按提示訊息後收起或數秒後自動收起
 */
function showMsg(msg) {
    const messageWrapper = document.querySelector('#message-wrapper');
    const progressBar = messageWrapper.children[0];
    const messageContent = document.querySelector('#message-content');
    messageContent.innerHTML = msg;


    // 使動畫可以在執行過程中能夠被重複(重新)觸發
    progressBar.style.animationName = "none";
    requestAnimationFrame(() => {
        setTimeout(() => {
            progressBar.style.animationName = "";
            progressBar.classList.add('animate-progress');
        }, 0);
    });

    // 跳出提示通知
    messageWrapper.classList.add('translate-y-[calc(100%+6px)]');
    messageWrapper.classList.remove('hide');

    // 當動畫執行結束時或當使用者親自按下提示通知時 => 關閉提示通知 
    messageWrapper.addEventListener('animationend', closeMessage, { once: true });
    messageWrapper.addEventListener('click', closeMessage, { once: true });

    /**
     * 關閉提示通知
     */
    function closeMessage() {
        messageWrapper.classList.remove('translate-y-[calc(100%+6px)]');
        messageWrapper.classList.add('hide');
        messageWrapper.classList.remove('before:animate-progress');
    }
}


/* clear text button */
const clearTextBtn = document.querySelector('#clear-text-btn');
const clearTextBtnIcon = document.querySelector('#clear-text-btn-icon');

todoInput.addEventListener('keyup', clearTextBtnController);

/**
 * 控制clearTextBtn的顯示與隱藏。
 * 
 * 如果todoInput的value為空，則顯示；反之則隱藏。
 */
function clearTextBtnController() {
    if (todoInput.value !== '') {
        clearTextBtn.classList.remove('hide');
    } else {
        clearTextBtn.classList.add('hide');
    }
}

clearTextBtn.addEventListener('click', () => {
    clearTextBtn.classList.add('hide');
    todoInput.value = '';
    todoInput.focus();
})

clearTextBtn.addEventListener('touchend', e => {
    e.preventDefault();
    clearTextBtn.classList.add('hide');
    todoInput.value = '';
    todoInput.focus();
})




/* Todo List */

/* status(全部、待完成、已完成) */
const statusTabs = document.querySelector('#status');

activeCurrentTab();

/**
 * 將css中的.status__tab--current狀態給某一個status__tab。
 */
function activeCurrentTab() {
    const activeTarget = statusTabs.querySelector(`#${currentTab}`);
    statusTabs.querySelectorAll('.status__tab').forEach(item => {
        item.classList.remove('status__tab--current');
    })
    activeTarget.classList.add('status__tab--current');
}


statusTabs.addEventListener('click', updateCurrentTab);

function updateCurrentTab(e) {
    // 確保e.target點的是<button>
    if (e.target.tagName === 'BUTTON') {
        currentTab = e.target.id;
    }

    localStorage.setItem('currentTab', JSON.stringify(currentTab));
    activeCurrentTab();

    renderTodo(currentTab);
    checkIfListEmpty();
}

const todoList = document.querySelector('#todo-list');
let todoListData = JSON.parse(localStorage.getItem('todos'));

renderTodo(currentTab);

function renderTodo(currentTab) {
    // 如果todoListData為空，則顯示訊息告知使用者此處沒內容
    if (todoListData === null) {
        showEmptyMsg();
    } else {
        let checkbox = '';
        let todoItems = '';

        todoListData.forEach((data, index) => {
            /* 
            檢查每一項todoListData內的「status」，確認其狀態是否為active?
            如果是active，則表示該事項還未被完成，checkbox不應該被勾選；
            如果不是active，則表示該事項已被完成，checkbox應該勾選起來。
            以下的checkbox用來儲存在模板文字中應該顯示的狀態。
            */
            checkbox = data.status === 'active'
                ? ''
                : 'checked';

            if (currentTab === data.status || currentTab === 'all') {
                todoItems +=
                    `<li class="todo-item" id="${index}" data-status="${data.status}">
                        <label class="flex items-center justify-between w-full py-3 px-6 cursor-pointer xs:py-4">
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
                    </li>
                `;
            }
        })


        //  如果todoItems沒東西，則顯示此處為空的訊息
        if (todoItems) {
            todoList.innerHTML = todoItems;
        } else {
            showEmptyMsg();
        }
    }

    if (hasAnyCompleted() && currentTab === "completed") {
        showClearBtn();
        addPaddingBottom();
    } else {
        // console.log('close')
        hideClearBtn();
        removePaddingBottom();
    }
}


/**
 * 檢查是否有任何一個項目已經是completed狀態。
 * @returns Boolean
 */
function hasAnyCompleted() {
    const todoItems = [...document.querySelectorAll('.todo-item')];
    // console.log(todoItems);
    // console.log(todoItems.some(todoItem => todoItem.dataset.status === 'completed'));
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
    clearBtnWrapper.classList.remove('animate-hide-down');
    clearBtnWrapper.classList.add('animate-popup');
}




// showEmptyMsg();

/**
 * 在todoList為空的時候，顯示訊息告知使用者此處沒內容。
 * 
 * 在顯示訊息內容之前會先進行判斷，當前的頁面(currentTab)位於待完成(active)或是全部(all)，
 * 與當前的頁面(currentTab)位於已完成(completed)所顯示的訊息會有所不同。
 * 
 */
function showEmptyMsg() {

    const allEmptyMsg = '目前沒有任何事項<br><span class="inline-block mt-0.5">在下方輸入新的待辦事項吧！</span>';
    const activeEmptyMsg = '目前沒有待完成事項<br><span class="inline-block mt-0.5">在下方輸入新的待辦事項吧！</span>';
    const completedEmptyMsg = "目前沒有已完成事項!";
    let outputMsg = '';

    if (currentTab === 'all') {
        outputMsg = allEmptyMsg;
    } else if (currentTab === 'active') {
        outputMsg = activeEmptyMsg;
    } else if (currentTab === 'completed') {
        outputMsg = completedEmptyMsg;
    }

    todoList.innerHTML = `
        <div id="empty-msg" class="relative flex flex-col items-center justify-between w-full h-full pointer-events-none select-none">
            <div class="flex flex-col items-center my-auto">
                <img class="max-w-[150px] w-full" src="img/todo-illustration.svg">
                <p class="text-primary text-center mt-6 font-bold">${outputMsg}</p>
            </div>
            <i class="fa-solid fa-arrow-down-long absolute -bottom-0 text-xl text-primary mb-4 animate-bounce"></i>
        </div>
    `;

    if (currentTab === 'completed') {
        todoList.innerHTML = `
            <div id="empty-msg" class="flex flex-col items-center justify-between w-full h-full pointer-events-none select-none">
                <div class="flex flex-col items-center my-auto">
                    <img class="max-w-[150px] w-full" src="img/todo-illustration.svg">
                    <p class="text-primary text-center mt-6 font-bold">目前沒有已完成事項!</p>
                </div>
            </div>
    `;
    }
}

todoList.addEventListener('click', e => {

    if (e.target.id !== 'empty-msg' && e.target.closest('li')) {

        // 取得點按的目標todoItem
        const todoItem = e.target.closest('li');

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
            1.保留當前所點擊的todoItem身上的「todo-item--todo-option-open」className，並移除其他所有非當前的
            2.保留當前所點擊的todoItem中的.todo-option身上的todo-option--open，並移除其他所有非當前的
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

            if (hasAnyCompleted() && currentTab === 'completed') {
                showClearBtn();
                addPaddingBottom();
            } else {
                hideClearBtn();
                removePaddingBottom();
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
            // 當「編輯」鈕被按下: 1.收合已展開的todoOption 2.去除todoItem的背景色
            todoOption.classList.remove('todo-option--open');
            todoItem.classList.remove('todo-item--todo-option-open');

            // 獲取todoText DOM
            const todoText = todoItem.querySelector('.todo-text');

            // 調用editMode()
            editMode();

            /**
             * 編輯模式:開啟
             */
            function editMode() {
                // 準備內容: 先獲取editDialogDOM，加入HTML結構，並把todoText.innerHTML內容抓進編輯輸入框內
                const editDialog = document.querySelector('#edit-dialog'),
                    dialogBg = document.querySelector('#dialog-bg');

                // editDialog.innerHTML =
                //     `<p class="text-xl text-primary text-center mb-6">編輯待辦事項</p>
                //     <textarea id="edit-text" class="w-full h-[80px] p-2 mb-6 bg-secondary outline-none border-2 border-primary/50 rounded-lg overflow-y-auto" autofocus>
                //         ${todoText.innerHTML}
                //     </textarea>
                //     <div class="flex justify-center items-center">
                //         <button class="cancel-btn btn btn-normal mr-6">
                //             <i class="fa-solid fa-circle-xmark mr-2"></i>取消
                //         </button>
                //         <button class="save-btn btn btn-hightlight">
                //             <i class="fa-solid fa-floppy-disk mr-2"></i>儲存
                //         </button>
                //     </div>
                // `;



                // 設定輸入框內容為可編輯狀態，並在對話框彈出時，內容文字已被全選
                let editText = editDialog.querySelector('#edit-text');
                editText.value = todoText.innerHTML;

                // 以上內容準備完成後，使對話框彈出
                openDialog(editDialog);

                setTimeout(() => {
                    editText.select();
                }, 100)


                // 在editDialog中有兩個按鈕，分別是【取消】與【儲存】:

                /* 當使用者按下【儲存】(無論是否有編輯過):
                關閉dialog -> 將已編輯的todoText更新至HTML與localstorage -> 自動將原本已經勾選的checkbox取消勾選 */
                const saveBtn = editDialog.querySelector('.save-btn');
                saveBtn.addEventListener('click', () => {
                    updateChanges();
                    changeToActive();
                    closeDialog(editDialog);
                });

                // 當使用者按下【取消】: 1.關閉dialog  2.檢查使用者是否有編輯過內容
                const cancelBtn = editDialog.querySelector('.cancel-btn');
                cancelBtn.addEventListener('click', () => {
                    checkIfEdited();
                    closeDialog(editDialog);
                });

                // 有關editDialog的鍵盤操作
                editDialog.addEventListener('keydown', e => {
                    if (e.key === "Escape") {
                        e.preventDefault();
                        cancelBtn.click();
                    }

                    if (e.key === "Enter") {
                        e.preventDefault();
                        saveBtn.click();
                    }
                })


                /**
                 * 注意:此函數的內容只有在使用者已經更動過editText中的內容卻未儲存的情況下才會執行。
                 * 確認使用者是否更動todTtext，如果有，則執行此函式的內容；
                 * 如果沒有，則忽略此函式的內容。
                 */
                function checkIfEdited() {
                    // 如果使用者有更動todTtext，則執行以下；沒有則此函式的內容可忽略。                    
                    if (editText.value !== todoText.innerHTML) {
                        // 準備內容: 獲取confirmDialog的DOM，在DOM中加入相應的innerHTML
                        const confirmDialog = document.querySelector('#confirm-dialog');
                        // confirmDialog.innerHTML =
                        //     `
                        //     <div class="flex flex-col items-center">
                        //         <i class="fa-solid fa-circle-exclamation text-4xl text-primary mb-4 text-center"></i>
                        //         <p class="text-center text-xl mb-6">編輯尚未儲存</p>
                        //         <p class="text-center text-sm">是否儲存變更?</p>
                        //         <div class="flex justify-center items-center mt-6">
                        //             <button class="cancel-btn btn btn-normal mr-6">
                        //                 <i class="fa-solid fa-circle-xmark mr-2"></i>不儲存
                        //             </button>
                        //             <button class="save-btn btn btn-hightlight">
                        //                 <i class="fa-solid fa-floppy-disk mr-2"></i>儲存
                        //             </button>
                        //         </div>
                        //     </div>
                        //     `;


                        // confirmDialog內容準備完成，使confirmDialog彈出
                        openDialog(confirmDialog);


                        // 在confirmDialog有兩個按鈕，分別是【不儲存】與【儲存】:

                        // 若使用者選擇【不儲存】--->　關閉此confirmDialog
                        const cancelBtn = confirmDialog.querySelector('.cancel-btn');
                        cancelBtn.addEventListener('click', () => {
                            closeDialog(confirmDialog);
                        });

                        // 若使用者選擇【儲存】　---> 儲存此次變更
                        // 關閉confirmDialog -> 將已編輯的todoText更新至HTML與localstorage -> 自動將原本已經勾選的checkbox取消勾選
                        const saveBtn = confirmDialog.querySelector('.save-btn');
                        saveBtn.addEventListener('click', () => {
                            updateChanges();
                            changeToActive();
                            closeDialog(confirmDialog);
                        });
                    }
                }

                function openDialog(dialog) {
                    
                    document.documentElement.style.overflowY = 'hidden';
                    dialogBg.classList.remove('hide');
                    dialog.setAttribute('data-status', 'opening');
                }

                /**
                 * 傳入一個diaolg，關閉該dialog
                 * @param {*} dialog 要關閉的目標dialog
                 */
                function closeDialog(dialog) {
                    dialog.setAttribute('data-status', 'closing');

                    // 檢查在場是否有還未關閉的dialog，如果都沒有，則連同dialogBg一起隱藏
                    checkDialogIsOpen();

                    dialog.addEventListener('animationend', () => {
                        dialog.removeAttribute('data-status', 'closing');
                        document.documentElement.style.overflowY = '';
                    }, { once: true });
                }

                /**
                 * 檢查在場是否有還未關閉的dialog，如果都沒有，則連同`dialogBg`一起隱藏
                 */
                function checkDialogIsOpen() {
                    // 確認是否有任何dialog是開啟狀態
                    let anyDialogIsOpen = [...document.querySelectorAll('.dialog')]
                        .some(dialog => {
                            return dialog.dataset.status === 'opening';
                        });

                    // 如果沒有任何的dialog是開啟狀態的話
                    if (!anyDialogIsOpen) {
                        // 隱藏dialogBg
                        dialogBg.classList.add('hide');
                    }
                }



                /**
                * 將已編輯的todoText更新至HTML與localstorage
                */
                function updateChanges() {
                    // 將編輯後的文字更新至DOM
                    todoText.innerHTML = editText.value;
                    // 將編輯後的文字更新至todoListData中
                    todoListData[todoItem.id].content = editText.value;
                    // 將最新的todoListData更新至localstorage中
                    localStorage.setItem('todos', JSON.stringify(todoListData));
                }

                // /**
                //  * 此函數用來關閉dialog(附帶監聽animationend)
                //  * @param {*} dialog 欲關閉的dialog
                //  */
                // function closeDialog(dialog) {
                //     dialog.setAttribute('closing', "");
                //     dialog.addEventListener('animationend', () => {
                //         dialog.close();
                //         dialog.removeAttribute('closing', "");
                //         dialog.classList.remove('block');
                //     }, { once: true })
                // }

                /**
                 * 在編輯過後，若使用者按下「儲存」，自動將原本已經勾選的checkbox取消勾選
                 */
                function changeToActive() {
                    const checkbox = todoItem.querySelector('.todo-checkbox');
                    if (checkbox.checked) {
                        checkbox.click();
                    }
                }
            }
        }

        /* 移除項目 */
        if (e.target.classList.contains('remove-btn')) {
            removeTodo();
            checkIfListEmpty();
        }


        function removeTodo() {
            // 找出在localStorage中的todo所有除了點到的這項以外的todo，然後重新賦值(更新)給todoListData
            todoListData = todoListData.filter(data => data !== todoListData[todoItem.id]);
            localStorage.setItem('todos', JSON.stringify(todoListData));
            renderTodo(currentTab);
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
    if (!todoListData || todoListData.length === 0) {
        showEmptyMsg();
        hideClearBtn();
        removePaddingBottom();
    }
}



// 使用者按下「清除已完成事項」

const clearBtn = document.querySelector('#clear-btn')
clearBtn.addEventListener('click', () => {
    // 清除所有已完成的項目
    clearCompleted();

    // 渲染
    renderTodo(currentTab);

    // 顯示「成功清除所有已完成的項目」提示
    showMsg(msg_clearCompleted);

    // 檢查清單是否為空
    checkIfListEmpty();

    // 將最新的內容更新至localStorage
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


let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);