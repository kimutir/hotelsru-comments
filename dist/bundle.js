/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://project-1/./src/style.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n\n\nconst addCommentForm = document.querySelector('#add-comment-form');\nconst userNameInput = document.querySelector('#user-name');\nconst dateInput = document.querySelector('#user-date');\nconst userCommentText = document.querySelector('#user-comment');\nconst commentsList = document.querySelector('.comments-list');\nconst nameError = document.querySelector('.add-comment__info_name-error');\nconst dateError = document.querySelector('.add-comment__info_date-error');\nconst commentError = document.querySelector('.add-comment__text_error');\nlet deleteButtons;\nlet likeButtons;\n\nlet userName = '';\nlet userDate = '';\nlet userComment = '';\nlet error = false;\n\nfunction renderComment({ user, comment, date }) {\n    const dateToRender = parseDate(date);\n    const id = String(Date.now());\n    const li = document.createElement('li');\n    li.setAttribute('id', id);\n    li.classList.add('comments-list__item');\n    li.innerHTML = `<article data-id=\"${id}\" class=\"comment-item\"><div class=\"comment-item__content\"><p class=\"comment-item__content_name\">${user}</p><p class=\"comment-item__content_text\">${comment}</p><p class=\"comment-item__content_date\">Добавлен: ${dateToRender}</p></div><div class=\"comment-item__actions\"><div class=\"comment-item__actions_delete\"></div><div class=\"comment-item__actions_like\"></div></div></article>`;\n    return li;\n}\n\nfunction parseDate(date) {\n    const today = new Date();\n    let [dayNow, monthNow, yearNow] = [today.getDate(), today.getMonth(), today.getFullYear()];\n    String(monthNow + 1).length === 1 ? (monthNow = '0' + (monthNow + 1)) : (monthNow += 1);\n\n    const [day, month, year] = date.split('.');\n\n    if (!date) return `сегодня, ${today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;\n\n    if (yearNow == year && monthNow == month) {\n        if (dayNow == day) return `сегодня, ${today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;\n        if (dayNow - day == 1) return `вчера, ${today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;\n    }\n\n    return `${day}.${month}.${year}, ${today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;\n}\nfunction onDeleteComment(e) {\n    const id = e.target.parentElement.parentElement.getAttribute('data-id');\n    const currentLi = document.querySelector(`li[id=\"${id}\"]`);\n    currentLi.remove();\n}\nfunction onLikeComment(e) {\n    e.target.classList.toggle('liked');\n}\nfunction validateDate(date) {\n    console.log('validation');\n    if (!date.includes('.') && date.length === 8) {\n        dateInput.value = date.slice(0, 2) + '.' + date.slice(2, 4) + '.' + date.slice(4, 8);\n    }\n    if (date.includes('.') && date.length === 10) {\n        const withoutDot = date.slice(0, 2) + date.slice(3, 5) + date.slice(6, -1);\n        if (date[2] === '.' && date[5] === '.' && !withoutDot.includes('.')) dateInput.value = date;\n    }\n\n    const [day, month, year] = dateInput.value.split('.');\n    error = false;\n    if (['01', '03', '05', '07', '08', '10', '12'].includes(month) && Number(day) <= 31 && day.length === 2) return;\n    if (['04', '06', '09', '11'].includes(month) && Number(day) <= 30 && day.length === 2) return;\n    if (month === '02' && Number(day) <= 28 && day.length === 2) return;\n    if (!dateInput.value) return;\n\n    dateError.classList.add('error-active');\n    error = true;\n    return;\n}\n\nuserNameInput.addEventListener('input', (e) => {\n    e.target.value = e.target.value.replace(/[^a-zA-Za-яА-Я]/g, '');\n\n    userName = e.target.value;\n    if (nameError.classList.contains('error-active')) {\n        nameError.classList.remove('error-active');\n        error = false;\n    }\n});\n\ndateInput.addEventListener('focusout', (e) => {\n    validateDate(e.target.value);\n});\n\ndateInput.addEventListener('input', (e) => {\n    if (dateError.classList.contains('error-active')) dateError.classList.remove('error-active');\n\n    e.target.value = e.target.value.replace(/[^0-9.]/g, '');\n\n    if (e.target.value.includes('.')) {\n        dateInput.setAttribute('maxlength', 10);\n    }\n    if (!e.target.value.includes('.')) {\n        dateInput.setAttribute('maxlength', 8);\n    }\n});\n\nconst initTexareaHeight = userCommentText.scrollHeight + 'px';\nuserCommentText.style.height = initTexareaHeight;\n\nuserCommentText.addEventListener('input', (e) => {\n    if (commentError.classList.contains('error-active')) {\n        commentError.classList.remove('error-active');\n        error = false;\n    }\n\n    if (!e.target.value) {\n        userCommentText.style.height = initTexareaHeight;\n    }\n    userComment = e.target.value;\n    userCommentText.style.height = e.target.scrollHeight + 'px';\n});\n\naddCommentForm.addEventListener('submit', (e) => {\n    e.preventDefault();\n    validateDate(dateInput.value);\n\n    userDate = dateInput.value;\n\n    if (!userName.trim()) {\n        if (!nameError.classList.contains('error-active')) {\n            nameError.classList.add('error-active');\n        } else return;\n\n        error = true;\n    }\n\n    if (!userComment.trim()) {\n        if (!commentError.classList.contains('error-active')) {\n            commentError.classList.add('error-active');\n        } else return;\n\n        error = true;\n    }\n\n    if (error) return;\n\n    const commentHTML = renderComment({ user: userName, comment: userComment, date: userDate });\n    commentsList.appendChild(commentHTML);\n    error = false;\n    userName = '';\n    userComment = '';\n    userCommentText.value = '';\n    userNameInput.value = '';\n    dateInput.value = '';\n\n    deleteButtons = document.querySelectorAll('.comment-item__actions_delete');\n    likeButtons = document.querySelectorAll('.comment-item__actions_like');\n    deleteButtons.forEach((button) => button.addEventListener('click', onDeleteComment));\n    likeButtons.forEach((button) => button.addEventListener('click', onLikeComment));\n});\n\n\n//# sourceURL=webpack://project-1/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;