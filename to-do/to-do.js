$(function () {
    // Задача: создать список дел с возможность добавления/удаления пунктов
    let $list = $('#ul');
    let $newItemButton = $('#newItemButton');
    let $newItemForm = $('#newItemForm');
    let $itemDescription = $('#itemDescription');
    let $li = $('li');
    let itemText = ''; // будет хранить текст из текстового поля

    // скрываем начальный список и затем плавно его выводом по элементно с задержкой
    $li.hide().each(function (index) {
        // delay - задержка перед первоначальным появление элемента
        // fadeIn - плавно повление, посредством изменения свойства opacity
        $(this).delay( 450 * index).fadeIn(1000);
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

    // добавление нового элемента списка
    $newItemForm.on('submit', function (e) {
        e.preventDefault();
        const text = $itemDescription.val().trim(); // берем значение атрибута value
        // .trim() - убирает пробелы, табуляцию, переносы на новую строку в начале и в конце строки
        if( text.length !== 0) {
            // append добавляет в конец
            // prepend добавляет в начало
            $list.append(`<li>${text}</li>`);
            $itemDescription.val('');
            updateCounter();
        }
    });


    // удаление элементов. при первом нажатии на элемент мы делаем его красным цветом и помещаем в конце списка. при повторном нажатии мы удаляем элемент
    $list.on('click', 'li', function () {
        let $elem  = $(this); // кэширую элемент. т.е. сохраняю нажатый и его состояние
        let $complete = $elem.hasClass('complete'); // проверяем, есть ли у элемента класс complete. возвращает true/false
        if($complete) {
            $elem.animate({ opacity: 0, paddingLeft: '+=180px'}, 1500, 'swing', () => {
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
});