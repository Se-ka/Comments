/**
 * Created by sergiy on 19.12.14.
 */
/*var displayComments = function(data) {
 var comments = "#comments";
 console.log('ooo', data);

 if(flag === false){
 $(comments).empty();
 }

 if (!data.error) {
 var k;
 console.log('new', data);
 console.log('old', currentComment);
 for (k in data) {<input type="button" class="butAdd" value="Add a comment" id="add"/>

 <input type="button" class="butAddFB" value="Show more comments" id="showMoreComments"/>
 // проверяем является ли ключ К родным data
 if (!data.hasOwnProperty(k)) {
 continue;
 }
 // проверяем есть ли ключ К в объекте currentComment
 if (flag === true) {
 if (currentComment.hasOwnProperty(k)) {
 console.log("Skipping comment id: ", k);
 continue;// блокирует отрисовку коментария, который уже был отрисован
 }
 }
 console.log("Key '" + k + "' has value '" + data[k] + "'");
 renderingComment(data[k]);
 }
 currentComment = data;
 flag = true;
 }else{
 if (flag === false) {
 $("#comments").text(data.reason);
 }
 }

 };
 */



//как сортировать по id?





/*
 Комментарии:

 запрос:
 http://rasp.localnet/comments/comments.php
 возвращает список комментариев (массив). Каждый комментарий это объект у кого есть ключи
 author -- имя автора
 text -- тест комментария
 time -- дата добавления комментария (количество секунд с начала эпохи)

 запрос:
 http://rasp.localnet/comments/comments.php?action=add&author=dima&text=hello
 добавляет новый комментарий. Два параметра обязательны:
 author -- автор
 text -- текст комментария
 возвращает новый списко комменатриев, либо описание ошибки в случае  ошибки.

 запрос:
 http://rasp.localnet/comments/comments.php?action=reset
 Удаляет все комментарии и возвращает пустой список комменатриев

 Пример ошибки:
 запрос:
 http://rasp.localnet/comments/comments.php?action=add
 ответ:
 {"error":true,"text":"Please, specify author and text"}

 Пример добавления комментария:
 запрос:
 http://rasp.localnet/comments/comments.php?action=add&author=dima&text=hello
 ответ:
 [{"author":"dima","text":"hello","time":1415540353}]
 [15:45:51] Dmitriy Gorbenko:
 192.168.1.87    rasp.localhost

 запрос:
 http://rasp.localnet/comments/comments.php?v=2
 возвращает новый список коментариев с id (0, или 1, или 2...)
 {"0":{"author":"Norton","text":"Yes, this is a very lovely dog!","time":1416935064}}




 moment.unix(1318781877).format("MMMM <-> dddd, Do YYYY, h:mm:ss a")




 var displayComments = function (data) {
 console.log(data);
 var comments = "#comments";
 if (Object.prototype.toString.call(data) === '[object Array]'){
 $(comments).empty();
 var i, l = data.length;
 for (i = 0; i < l; i++) {
 $(comments).append(
 "<div class='commentBlock' id='addComment'>" +
 "<span class='commentAuthor'>" + "<strong>Author: </strong>" +
 data[i].author + "</span>" +
 "<span class='commentData'>" + " <strong> Date: </strong>" +
 moment.unix(data[i].time).format("hh:mm:ss a, dddd, Do MMMM, YYYY") + "</span>" +
 "<div class='commentText'>" + data[i].text + "</div>" +
 "<div class='answer'>Answer<div>" + "</div>"
 );
 console.log(data[i]);
 }
 }else{
 //serverError();
 }
 };


 var div = document.createElement("div");
 var span = document.createElement("span");
 var a = document.createElement("a");
 div.appendChild(span);
 span.appendChild(a);
 a.href = "http://facebook.com";
 a.className = "link";
 a.target = "_blank";
 a.innerHTML = "Link to Facebook";
 span.className = "spanTag";
 div.className = "divTag";
 var body = document.getElementsByTagName("body")[0];
 body.appendChild(div);


 var element = document.createElement('div');
 element.innerHTML = '';
 element.innerHTML = 'Content for div starting here', element.id = 'div123';
 document.body.appendChild(element);


 /*
 $(comments).append(  //????????????????????????
 "<div class='commentBlock' id='addComment'>" +
 "<span class='commentAuthor'>" + "<strong>Author: </strong>" +
 data[i].author + "</span>" +
 "<span class='commentData'>" + " <strong> Date: </strong>" +
 moment.unix(data[i].time).format("hh:mm:ss a, dddd, Do MMMM, YYYY") + "</span>" +
 "<div class='commentText'>" + data[i].text + "</div>" +
 "<div class='answer'>Answer<div>" + "</div>"
 );



 for (var k in a) {
 if (!a.hasOwnProperty ( k ) ) { continue; }
 console.log("Key '" + k + "' has value '" + a[k] + "'");
 }


 запись объекта "о" с ключами и обращение к ключу "z" с выводом на консоль его("z") значения
 var o = {x :{y:{z:{p:{q:[,{z:'a'}]}}}}};
 console.log(o.x.y.z.p.q[1].z);




 var displayComments = function (data) {
 console.log(data);
 var comments = "#comments";
 if (Object.prototype.toString.call(data) === "[object Array]") {
 $(comments).empty();
 var i, l = data.length;
 for (i = 0; i < l; i++) {
 add(data[i]);
 console.log(data[i]);
 }
 flag = true;
 }
 if (Object.prototype.toString.call(data) === "[object Object]") {
 $("#comments").text(data.reason);
 }
 };

 */
/**
 * Created by sergiy on 19.12.14.
 */
/*var displayComments = function(data) {
 var comments = "#comments";
 console.log('ooo', data);

 if(flag === false){
 $(comments).empty();
 }

 if (!data.error) {
 var k;
 console.log('new', data);
 console.log('old', currentComment);
 for (k in data) {<input type="button" class="butAdd" value="Add a comment" id="add"/>

 <input type="button" class="butAddFB" value="Show more comments" id="showMoreComments"/>
 // проверяем является ли ключ К родным data
 if (!data.hasOwnProperty(k)) {
 continue;
 }
 // проверяем есть ли ключ К в объекте currentComment
 if (flag === true) {
 if (currentComment.hasOwnProperty(k)) {
 console.log("Skipping comment id: ", k);
 continue;// блокирует отрисовку коментария, который уже был отрисован
 }
 }
 console.log("Key '" + k + "' has value '" + data[k] + "'");
 renderingComment(data[k]);
 }
 currentComment = data;
 flag = true;
 }else{
 if (flag === false) {
 $("#comments").text(data.reason);
 }
 }

 };
 */



//как сортировать по id?






























