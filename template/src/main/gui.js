// const gui = require('nw.gui');
// const path = require('path')

// var menu = new gui.Menu();
// menu.append(new gui.MenuItem({ label: 'nv-vue-ui' }));
// menu.append(new gui.MenuItem({ type: 'separator' }));
// menu.append(new gui.MenuItem({
//   label: 'click',
//   click: function() {
//     alert('hello world!')
//   }
// }));

// document.body.addEventListener('contextmenu', function(e) {
//   e.preventDefault();
//   menu.popup(e.x, e.y);
//   return false;
// }, false);


// // Создаем иконку в трее (менюбаре)
// var tray = new gui.Tray({
//   title: 'nw-vue'
// });

// // Добавляем меню при клике на иконке в трее
// var traymenu = new gui.Menu();
// traymenu.append(new gui.MenuItem({label: 'One', type: 'checkbox'}));
// traymenu.append(new gui.MenuItem({label: 'Two', type: 'checkbox' }));
// traymenu.append(new gui.MenuItem({type: 'separator' }));
// // В качестве вложенных меню используем такой-же код как в примере c контекстным меню.
// traymenu.append(new gui.MenuItem({label: 'or ...',   submenu: menu}));

// tray.menu = traymenu;
