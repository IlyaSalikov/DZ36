$(function () {
    // Задача: создать список дел с возможность добавления/удаления пунктов
    let $list = $('#ul');
    let $newItemButton = $('#newItemButton');
    let $newItemForm = $('#newItemForm');
    let $itemDescription = $('#itemDescription');
    let $li = $('li');
    let itemText = ''; // будет хранить текст из текстового поля
    let $addItem = $('#addItem');
    let $bucket = $('#bucket');
    let $removeBucket = $('#removeBucket');

    // скрываем начальный список и затем плавно его выводом по элементно с задержкой
    $li.hide().each(function (index) {
        // delay - задержка перед первоначальным появление элемента
        // fadeIn - плавно повление, посредством изменения свойства opacity
        $(this).delay(450 * index).fadeIn(1000);
    });

    // показать количество дел
    function updateCounter() {
        $('#counter').text($('li').length);
    }

    updateCounter();

    // подготовка к добавлению элементов
    $newItemForm.hide();
    $('#showForm').on('click', (event) => {
        event.preventDefault(); // позволяет отменить стандартную функциональность элемента. Пример: если прописать e.preventDefault() для ссылки, то это отменит переход по ней по причине блокировки клика. НО в дальнейшем мы можем сделать свои действия по клику на объект (допустим строчки ниже)
        $newItemButton.hide();
        $newItemForm.show();
    });

    function addZero(a) {
        return (a < 10) ? `0${a}` : a;
    }

    // добавление нового элемента списка
    function addItem() {
        const text = $itemDescription.val().trim(); // берем значение атрибута value
        // .trim() - убирает пробелы, табуляцию, переносы на новую строку в начале и в конце строки
        if (text.length !== 0) {
            // append добавляет в конец
            // prepend добавляет в начало
            $list.append(`<li>${text}</li>`);
            $itemDescription.val('');
            updateCounter();
            let date = new Date();
            let textDate = (`${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`);
            $list.append(`<span class="date">(${textDate})</span>`);
        }
    }

    //ПУНКТ 2 (ДЗ 36) - Сделать автофокус на поле ввода
    $newItemButton.on('click', function () {
        $('#itemDescription').focus();
    });

    //ПУНКТ 3 (ДЗ 36) - Дела должны добавлять в список при помощи кнопки "добавить"
    $("#addItem").on('click', addItem);

    //ПУНКТ 4 (ДЗ 36) - Добавлять дату и время создания для каждой задачи(+строки 46,47,48)
    $newItemForm.on('submit', function (e) {
        e.preventDefault();
        addItem();
    });

    // удаление элементов. при первом нажатии на элемент мы делаем его красным цветом и помещаем в конце списка. при повторном нажатии мы удаляем элемент
    $list.on('click', 'li', function () {
        let $elem = $(this); // кэширую элемент. т.е. сохраняю нажатый и его состояние
        let $complete = $elem.hasClass('complete'); // проверяем, есть ли у элемента класс complete. возвращает true/false
        if ($complete) {
            $elem.animate({opacity: 0, paddingLeft: '+=180px'}, 1500, 'swing', () => {
                $elem.remove();
                updateCounter();
            });
        } else {
            itemText = $elem.text(); // беру текст из нажатого эл. списка
            $elem.remove();
            // добавление в конце списка с классом compelete
            $list.append(`<li class="complete">${itemText}</li>`).hide().fadeIn(1500);
        }
    })

    //ДЗ 39
    let list = [];
    if ($.cookie(`list`)) {
        for (let i = 1; i <= $("#ul li").length; i++) {
            list.push({
                name: $(`#ul li:nth-of-type(${i}).item`).text(),
                date: $(`#ul li:nth-of-type(${i}).date`).text()
            });
        }
        $.cookie("list", JSON.stringify(list));
    }
    console.log(list);

    //ДЗ40
    $(function () {
        //1) Добавить возможность перетаскивать элементы списка меняя очередность.
        $("ul").sortable();//не работает, если draggable на $li
        $li.draggable({
            containment: '.page',
            snap: '.page',
            revert: "invalid",
            cursor: 'move',
        })
        $bucket.droppable({//2) Добавить возможность перенести элементы в корзину.
            drop: function (event, ui) {
                ui.draggable.position({
                    my: "left top", // значение элемента .drop
                    at: "center",
                    of: $('.bucket'),
                });
            }
        });
        //$removeBucket.addEventListener('click', () => {//3) Для корзины добавить кнопку очистки всех элементов, которые в ней находятся.
        //    $list.remove();
       // })
    });
});