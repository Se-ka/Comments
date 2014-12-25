var //server = 'http://comments.localnet/comments.php', //serverOnMyLaptop
    server = 'http://rasp.localnet/comments/comments.php'; //serverOnRaspberryPI


var redyfunction = function () { // определение функции при помощи переменной "redyfunction"
    // jQuery-функция: по событию "click" на кнопке "add a comment" будет вызвана функция "addComment"
    $('[name=add]').click(addComment);
    // вызывается функция "refreshComments",
    refreshComments();// для инициации переодичной загрузки коменттов (timeout - 1000)
    // = // "Show more comments" будет вызывана функция "showMoreComments"
    $('[name=showMoreComments]').click(showMoreComments);
    // = // "Reset comments" будет вызывана функция "resetComments"
    $('[name=resetComments]').click(resetComments);
};
// jQuery-функция: вызов функции через переменную "redyfunction"
$(redyfunction); //(вызывается сразу после того, как выстроилось DOM-дерево)


var flagForBuffer = false, // false означает что коментарии не были отрендерены (отрисованы)
    flagForError = false;

function addComment () { // объявление функции "addComment"
    // объявление лок. перем. "nameVal", в которую помещена jQuery-функция: метод "val" считывает значение,
    // помещёное в тэг с id"name" и помещает это значение в перемен.
    var nameVal = $('#name').val(),
        //объявление переменной "nE", для упрощения роботы движку (один раз сходили в ДОМ и дальше используем перемен.)
        nE = '#nam',
        cE = '#com',// = //
    //объявление лок. перем. "comVal", в которую помещена jQuery-функция: метод "val" считывает значение,
    // помещёное в тэг с id"aCom" и помещает это значение в перемен.
        comVal = $('#aCom').val();

    if(nameVal === '') { // если значение, ранее помещённое в в перем "nameVal" равно пустой строке
        //то jQuery-функция: к тэгу с id "nE" добавляем класс "error" а также помещаем в него текст в скобках
        $(nE).addClass("error").text('You forgot to enter a name!!!');
    }else {// иначе
        $(nE).removeClass("error");// jQuery-функция: у тэга с id "nE" удаляем класс "error"
        $(nE).text("The author's name:");//а также jQuery-функция: меняем в тэге с id "nE" текст на тот, что в скобках
    }
    if(comVal === '') {// если значение, ранее помещённое в в перем "comVal" равно пустой строке
        $(cE).addClass("error");//то jQuery-функция: к тэгу с id "nE" добавляем класс "error"
        $(cE).text('You forgot to enter a comment!!!');// а также помещаем в него текст в скобках

    }else {//иначе
        $(cE).removeClass("error");// = //
        $(cE).text("The author's comment:");// = //

        $.ajax({// jQuery-функция: метод "ajax" предназначен для отправки запросов на сервер
            // url-адрес, на который отправляется запрос с параметрами, которые заранее определены на сервере
            // (в данном случае: ключ "action" со значением "add" - добавить данные на сервер:"author", "text")
            url: server + "?action=add&author="
            + nameVal + "&text=" + comVal + "&v=2",//
            dataType: "jsonp"//технология при помощи, которой отправляется запрос на сервер
        })
            //  метод "done" установливает обработчик удачного выполнения запроса - "addCommentToBuffer"
            .done(addCommentsToBuffer);
            //метод "fail" установливает обработчик удачного выполнения запроса - "addCommentToBuffer"
//            .fail(messageError);
        console.log('add comment');// команда для вывода на консоль строки 'add comment'
    }
}


//объявление глобальной переменной "bufferOfComments", которой присваивается пустой объект
// для помещенния в него данных с сервера в виде других объектов
var bufferOfComments = {};
var addCommentsToBuffer = function (dat) {// объявление функции при помощи перемен. "addCommentToBuffer"
    if(_.isObject(dat) == false) {//
        return
    }
    if(dat.error){
        // в тэг с id "comments" добавляем текст который находится в скобках(аргумент, или как называется?)
        messageError();
        return
    }
    bufferOfComments = dat;// помещенния в глобальную переменю. данных с сервера в виде других объектов
    if (!flagForBuffer) { // если флаг == ложь(можно так писать)
        renderNextTenComments();
        flagForBuffer = true;
    }
    showButtonShowMoreComments();
};


var messageError = function () { // объявление функ. при помощи перемен. "messageError"

    //  мы должны выводить сообщение об ошибке только в случае кодга комментарии не были отрендерены

    if(flagForError === false) { // если флаг - ложь,
        // то в тэг с id "comments" добавляем текст который находится в скобках(аргумент, или как называется?)
        $("#comments").text("We apologize for the temporary technical problems. Try again later.");
    }
};


var refreshComments = function () {//объявление функ. при помощи перемен. "refreshComments"
    $.ajax({//jQuery-функция: метод "ajax" предназначен для отправки запросов на сервер
        // url-адрес, на который отправляется запрос с параметрами, которые заранее определены на сервере
        // (в данном случае: ключ "v" со значением "2" - получить данные с сервера)
        url: server + "?v=2",
        dataType: "jsonp"// технология при помощи, которой отправляется запрос на сервер
    })
        // метод "done" установливает обработчик удачного выполнения запроса - "addCommentToBuffer"
        .done(addCommentsToBuffer);
    setTimeout(refreshComments, 1500);
console.log('setTimeout')
};


var showMoreComments = function() {// объявление функ. при помощи перемен. "refreshComments"

    //если результат выполнения функции "getUnrenderedComments()" по длинне больше ноля,
    if (getUnrenderedComments().length > 0) {
//        $('#comments').empty();// то зачистка поля вывода '#comments' на монитор коментов
        renderNextTenComments();// и вызываеется функция "renderNextTenComments()"
        showButtonShowMoreComments();
    }
};


var getUnrenderedComments = function() {// объявление функ. при помощи перемен. "refreshComments"

    var commentId,//объявление перемен. "commentId"
        commentClone,// = //
        UnrenderedComments = [],// = // с присвоением ей пустого массива
        N = 3;//= // с присвоением ей числа 9

    // цикл, в котором пробегаемся по коментариям (по ключам, которые мы назвали "commentId")
    // в буфере(глоб. перем.) "bufferOfComments"
    for (commentId in bufferOfComments) {
        // если метод "hasOwnProperty" находит ключ, который не является "родным(своим)"
        // ДЛЯ СЕБЯ "hasOwnProperty" работает по принципу поиска "своих" ключей (определённых заранее) и отсеивает -->
        // ДЛЯ СЕБЯ (не реагирует на) родительские ключи (которые всегда есть в ОБЪЕКТАХ
        // (а ими бывают и объект, и массив, и строка, и чила),
        if (!bufferOfComments.hasOwnProperty(commentId)) {
            continue;// то выходим из итерации и начинаем следующую итерацию
        }
        if ($('#commentId' + commentId).length===0) {// если мы  не нашли конкретный коментарий

            commentClone = {              //то создаём клон объекта
                // клонируется автор (ключу "author" мы присваиваем новое значение: а именно, обращаясь к коменту
                // из "bufferOfComments" присваиваем ключ "commentId" (через [] потому что ключ объявлен через
                // переменную) и ключ "author")
                author: bufferOfComments[commentId].author,
                time: bufferOfComments[commentId].time,// = // время
                text: bufferOfComments[commentId].text// = // текст
            };

            // добавляем id(ключ объекта)
            commentClone.id = commentId;

            // добавили в массив модефицированный (с id) коментарий
            UnrenderedComments.push(commentClone);
            // если длинна массива равна 10, (при такой записи постоянно будут выводиться первые десять коментов)
            if (UnrenderedComments.length === N) {
                return UnrenderedComments;// то возвращаем этот массив
            }
        }
    }
    // возвращаем массив "ar", который или меньше 10 коментов, или оставшиеся после отпечатаных "десяток"
    return UnrenderedComments;
};


// объявление функ. при помощи перемен. "renderNextTenComments"
var renderNextTenComments = function() {
    // объявление перемен. "comment", в которую поместили вызов функ. "getUnrenderedComments"
    // (результат работы функции будет в этой переменной)
    var comments = getUnrenderedComments(),

    // объявление перемен. "count", в которую поместили длинну результатат вызова функ. "getUnrenderedComments"
        count = comments.length,
        i;
    if(count > 0){
        if (flagForError === false){
            $("#comments").empty();
        }
    }

    // цикл, который считает количество раз вызова функции в теле цикла: кол-во будет равно 10 разам
    for (i = 0; i < count; i++) {

    // вызов функции "renderOneComment", в которую помещен аргумент - каждый последующий коментарий
        renderOneComment(comments[i]);
    }
    console.log("10 comments to render: ", comments);// команда для вывода на консоль строки + 'comments'
};


// объявление функ. при помощи перемен. "renderOneComment" с параментром котрый принимает на вход аргумент
var renderOneComment = function (comment) {
    console.log(comment);// команда для вывода на консоль 'comment'

    var div1 = document.createElement('div'),// создаём переменную "div1", в которую ложим новый элемент - тэг "div"
        div4 = document.createElement('div'),// = // "div4" // = //
        div5 = document.createElement('div'),// = // "div5" // = //
        div2 = document.createElement('div'),// = // "div2" // = //
        div3 = document.createElement('div'),// = // "div3" // = //
        // = // "div", при помощи которого будем обращаться к тэгу с айдишником "comments"
        div = document.getElementById('comments');

    div1.className = 'commentBlock';// тэгу "div1" добавим класс 'commentBlock'
    div1.id = 'commentId' + comment.id;// = // id 'commentId'
    div4.className ='commentAuthor';// тэгу "div4" добавим класс 'commentAuthor'
    div5.className ='commentData';// = //
    div2.className ='commentText';// = //
    div3.className ='answer';// = //

    div4.innerHTML = '<strong>Author: </strong>' + comment.author;// в "div4" добавим HTML-код
    div5.innerHTML = '<strong> Date: </strong>' + moment.unix(comment.time).format("hh:mm:ss a, dddd, Do MMMM, YYYY");// = //
    div2.innerHTML = comment.text;// = //
    div3.innerHTML= 'Answer';// = //

    div1.appendChild(div4);// поместим в "div1" "div4"
    div1.appendChild(div5);// = //
    div1.appendChild(div2);// = //
    div1.appendChild(div3);// = //

    div.appendChild(div1);// поместим в "div" "div1"

    flagForError = true;
};


function showButtonShowMoreComments() {//

    //создаём переменную "button", которой присваиваем jQuery-функцию, какая выбирает тэги по "name=showMoreComments"
    var button = $('[name=showMoreComments]');

    // если длинна содержимого глоб. перем. "bufferOfComments"  больше 0
    if(getUnrenderedComments().length > 0) {

        // jQuery-функция: через переменную "button" у тэга с "name=showMoreComments" удаляет класс "hidden"
        button.removeClass("hidden");

    }else {// иначе

        //то jQuery-функция: через переменную "button" к тэгу с "name=showMoreComments" добавляет класс "hidden"
        button.addClass("hidden");
    }
}


var resetComments = function() { // определение функции при помощи переменной "resetComments"

    $.ajax({  //jQuery-функция: метод "ajax" предназначен для отправки запросов на сервер
        // url-адрес, на который отправляется запрос с параметрами, которые заранее определены на сервере
        // (в данном случае: ключ "action" со значением "reset" - сброс данных на сервере)
        url: server + "?action=reset",
        dataType: "jsonp" // технология при помощи, которой отправляется запрос на сервер
    });
    console.log('reset comment'); // команда для вывода на консоль строки 'reset comment'
    $("#comments").empty(); // jQuery-функция: метод "empty" удаляет контент(все дочерние блоки) в тэге с id"comments"
};

//Object {author: undefined, time: undefined, text: undefined, id: "error"}
//Object {author: undefined, time: undefined, text: undefined, id: "reason"}
//
// зачистить поле вывода на экран коментов от "We apologize..."
//
//
//
//
//
// jh
//
//