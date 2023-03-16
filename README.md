# hotelsru-comments

dist/index.html - готовый проект

<h3>Валидация</h3>
<ul>
  <li> name: только русский или английский, без символов и цифр;</li>
  <li> date: только цифры или цифры и две точки, разделяющие день, месяц и год. Итоговый формат DD.MM.YYYY, любой другой вызовет ошибку:
    <ul>
      <li>DDMMYYYY => DD.MM.YYYY - форматирование и валидация при расфокусировке;</li>
      <li>DD.MM.YYYY - валидация при расфокусировке;</li>
    </ul>
  </li>
</ul>

<hr>

<h3>Отправка формы</h3>
<ul>
  <li> форма отправляется при нажатии на Enter или на кнопку "Отправить";</li>
  <li> при пустых имени или комментарии отправки не произойдет;</li>
</ul>

<hr>

<h3>Комментарий</h3>
<ul>
  <li> в комментарии можно оставлять любые символы и буквы;</li>
  <li> блок комментария textarea увеличивается при переносе строки (Enter) и подстраивается под размер комментария;</li>
</ul>

<hr>

<h3>Блок комментариев</h3>
<ul>
  <li> удаление комментария при нажатии на иконку корзины;</li>
  <li> лайк при нажатии на сердечко;</li>
</ul>
