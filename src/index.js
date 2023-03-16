import './style.scss';

const addCommentForm = document.querySelector('#add-comment-form');
const userNameInput = document.querySelector('#user-name');
const dateInput = document.querySelector('#user-date');
const userCommentText = document.querySelector('#user-comment');
const commentsList = document.querySelector('.comments-list');
const nameError = document.querySelector('.add-comment__info_name-error');
const dateError = document.querySelector('.add-comment__info_date-error');
const commentError = document.querySelector('.add-comment__text_error');
let deleteButtons;
let likeButtons;

let userName = '';
let userDate = '';
let userComment = '';
let error = false;

function renderComment({ user, comment, date }) {
    const dateToRender = parseDate(date);
    const id = String(Date.now());
    const li = document.createElement('li');
    li.setAttribute('id', id);
    li.classList.add('comments-list__item');
    li.innerHTML = `<article data-id="${id}" class="comment-item"><div class="comment-item__content"><p class="comment-item__content_name">${user}</p><p class="comment-item__content_text">${comment}</p><p class="comment-item__content_date">Добавлен: ${dateToRender}</p></div><div class="comment-item__actions"><div class="comment-item__actions_delete"></div><div class="comment-item__actions_like"></div></div></article>`;
    return li;
}

function parseDate(date) {
    const today = new Date();
    let [dayNow, monthNow, yearNow] = [today.getDate(), today.getMonth(), today.getFullYear()];
    String(monthNow + 1).length === 1 ? (monthNow = '0' + (monthNow + 1)) : (monthNow += 1);

    const [day, month, year] = date.split('.');

    if (!date) return `сегодня, ${today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    if (yearNow == year && monthNow == month) {
        if (dayNow == day) return `сегодня, ${today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        if (dayNow - day == 1) return `вчера, ${today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    return `${day}.${month}.${year}, ${today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}
function onDeleteComment(e) {
    const id = e.target.parentElement.parentElement.getAttribute('data-id');
    const currentLi = document.querySelector(`li[id="${id}"]`);
    currentLi.remove();
}
function onLikeComment(e) {
    e.target.classList.toggle('liked');
}
function validateDate(date) {
    console.log('validation');
    if (!date.includes('.') && date.length === 8) {
        dateInput.value = date.slice(0, 2) + '.' + date.slice(2, 4) + '.' + date.slice(4, 8);
    }
    if (date.includes('.') && date.length === 10) {
        const withoutDot = date.slice(0, 2) + date.slice(3, 5) + date.slice(6, -1);
        if (date[2] === '.' && date[5] === '.' && !withoutDot.includes('.')) dateInput.value = date;
    }

    const [day, month, year] = dateInput.value.split('.');
    error = false;
    if (['01', '03', '05', '07', '08', '10', '12'].includes(month) && Number(day) <= 31 && day.length === 2) return;
    if (['04', '06', '09', '11'].includes(month) && Number(day) <= 30 && day.length === 2) return;
    if (month === '02' && Number(day) <= 28 && day.length === 2) return;
    if (!dateInput.value) return;

    dateError.classList.add('error-active');
    error = true;
    return;
}

userNameInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Za-яА-Я]/g, '');

    userName = e.target.value;
    if (nameError.classList.contains('error-active')) {
        nameError.classList.remove('error-active');
        error = false;
    }
});

dateInput.addEventListener('focusout', (e) => {
    validateDate(e.target.value);
});

dateInput.addEventListener('input', (e) => {
    if (dateError.classList.contains('error-active')) dateError.classList.remove('error-active');

    e.target.value = e.target.value.replace(/[^0-9.]/g, '');

    if (e.target.value.includes('.')) {
        dateInput.setAttribute('maxlength', 10);
    }
    if (!e.target.value.includes('.')) {
        dateInput.setAttribute('maxlength', 8);
    }
});

const initTexareaHeight = userCommentText.scrollHeight + 'px';
userCommentText.style.height = initTexareaHeight;

userCommentText.addEventListener('input', (e) => {
    if (commentError.classList.contains('error-active')) {
        commentError.classList.remove('error-active');
        error = false;
    }

    if (!e.target.value) {
        userCommentText.style.height = initTexareaHeight;
    }
    userComment = e.target.value;
    userCommentText.style.height = e.target.scrollHeight + 'px';
});

addCommentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    validateDate(dateInput.value);

    userDate = dateInput.value;

    if (!userName.trim()) {
        if (!nameError.classList.contains('error-active')) {
            nameError.classList.add('error-active');
        } else return;

        error = true;
    }

    if (!userComment.trim()) {
        if (!commentError.classList.contains('error-active')) {
            commentError.classList.add('error-active');
        } else return;

        error = true;
    }

    if (error) return;

    const commentHTML = renderComment({ user: userName, comment: userComment, date: userDate });
    commentsList.appendChild(commentHTML);
    error = false;
    userName = '';
    userComment = '';
    userCommentText.value = '';
    userNameInput.value = '';
    dateInput.value = '';

    deleteButtons = document.querySelectorAll('.comment-item__actions_delete');
    likeButtons = document.querySelectorAll('.comment-item__actions_like');
    deleteButtons.forEach((button) => button.addEventListener('click', onDeleteComment));
    likeButtons.forEach((button) => button.addEventListener('click', onLikeComment));
});
