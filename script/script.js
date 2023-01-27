'use strict'

// burger

const iconMenu = document.querySelector('.header-burger')
const menuBody = document.querySelector('.header__navigation-items')
const overlay = document.querySelector('.overlay')
const link = document.querySelectorAll('.header__navigation-link')
const gardens_btn = document.querySelector('.gardens-btn')
const lawn_btn = document.querySelector('.lawn-btn')
const planting_btn = document.querySelector('.planting-btn')
const btns = document.querySelectorAll('.service__section-button')
const cards = document.querySelectorAll('.service__section-card')

iconMenu.addEventListener('click', closeMenu);
link.forEach(l => l.addEventListener('click', closeMenu));
overlay.addEventListener('click', closeMenu);


function closeMenu(event) {
  menuBody.classList.toggle('active');
  iconMenu.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('lock');
}

// blur btns

btns.forEach(function (button) {
  button.addEventListener('click', function () {
    let sum = 0;
    btns.forEach(function (button) {
      if (button.classList.contains('active')) sum = sum + 1
    })
    if (sum < 2) {
      button.classList.toggle('active')

    } else {
      button.classList.remove('active')
    }
    blur()
  })
})


function showAllCards() {
  cards.forEach(card => {
    card.classList.remove('blur')
  })
}

// === вариант 2
// function showAll() {
//   return [...btns].every(item => !item.classList.contains('active'))
// }
//  вариант 2 ===

function blur() {
  const activeButtonsClass = getActiveButtonsClass()
  if (activeButtonsClass.length == 0) {
    // === вариант 2
    // if (showAll()) {
    //  вариант 2 ===
    showAllCards()
  } else {
    cards.forEach(card => {
      // попытка проверить по заголовкам
      // const title = card.querySelector(".service__section-card-title").textContent
      console.log(card.dataset['filter']);
      // console.log(activeButtonsClass);
      // для массивов includes
      if (activeButtonsClass.includes(card.dataset['filter'])) {
        card.classList.remove('blur')
      } else {
        card.classList.add('blur')
      }
    })
  }
}

function getActiveButtonsClass() {

  let activeButtons = []

  btns.forEach((btn) => {
    // для класс листа contains
    if (btn.classList.contains('active')) {
      // в дата сетах используется только второе слово, без dataset 
      activeButtons.push(btn.dataset['filter'])
    }

  })
  return activeButtons;

}

// btns.forEach(function (btn) {
//   btn.addEventListener('click', function (e) {

//     const styles = e.currentTarget.classList
//     if (styles.contains('gardens-btn')) {
//       console.log(titles);
//       console.log(cards);
//       titles_array.forEach(title => {
//         if (title.textContent !== "Garden care") {
//           for (let i = 0; i < title.length; i++) {

//             cards.classList.add('blur')
//           }
//         }
//       })
//     }
//   })
// })

// accordion

const priceCircle = document.querySelectorAll('.price-circle')
const priceDropdown = document.querySelectorAll(' ice_dropdown') // получим все элементы с коротким текстом, html коллекцию элементов !! Важно, на коллекцию элементов событие повестить нельзя, нужен перебор

// =============================================================================
const accBtn = document.querySelectorAll('.accordion-item');
const accInfo = document.querySelectorAll('.accordion-info');
const accControl = document.querySelectorAll('.accordion-control');

accBtn.forEach(item => {
  item.addEventListener('click', e => {
    if (e.currentTarget.classList.contains('order-btn')) {
      e.target.parentNode.classList.add('_show');
      e.target.parentNode.previousElementSibling.classList.add('_active')
      e.target.parentNode.previousElementSibling.previousElementSibling.classList.add('_active')
    } else if (e.target.classList.contains('_active')) {
      e.target.classList.remove('_active');
      e.target.previousElementSibling.classList.remove('_active')
      e.target.nextElementSibling.classList.remove('_show')
      return;
    } else {
      accBtn.forEach(elem => {
        elem.classList.remove('_active');
        elem.childNodes[1].classList.remove('_active')
        elem.childNodes[3].classList.remove('_active')
        elem.childNodes[5].classList.remove('_show')
        if (e.target.classList.contains('order-btn')) {
          e.target.parentNode.classList.add('_show');
          e.target.parentNode.previousElementSibling.classList.add('_active')
          e.target.parentNode.previousElementSibling.previousElementSibling.classList.add('_active')
        }
      });
      e.target.classList.add('_active');
      e.target.previousElementSibling.classList.add('_active')
      e.target.nextElementSibling.classList.add('_show')
    }
  });
});


// ===================================================================================

// перебор коллекции элементов = for(of)

for (let circle of priceCircle) {
  circle.addEventListener('click', toggleDescription)
}

function toggleDescription(event) { // handler
  event.stopPropagation() // Прекращает дальнейшую передачу текущего события.
  if (!this.parentElement.nextElementSibling.classList.contains('open')) {
    closeDescription(this)
    // nextElementSibling - свойство только для чтения, возвращающее последующий элемент перед текущим, или null, если элемент является последним в своём родительском узле.
  }
  this.parentElement.nextElementSibling.classList.toggle('open')
  if (this.parentElement.nextElementSibling.classList.contains('open')) {
    this.classList.add('color')
  }
  else {
    this.classList.remove('color')
  }
}
function closeDescription(e) {
  for (let i = 0; i < priceDropdown.length; i++) {
    close_title(priceDropdown[i]);
    close_circle(priceCircle[i])
  }
}

function close_title(elem) {
  elem.nextElementSibling.classList.remove('open')

}
function close_circle(elem) {
  elem.classList.remove('color')

}

// const buttons = document.querySelectorAll('.service__section-button');
// console.log(buttons);

// buttons.forEach((button) => {
//   button.addEventListener('click', () => {
//     console.log(button);
//     const currentCategory = button.dataset.filter
//     console.log(currentCategory)
//     // Здесь сработает функция
//     filter(currentCategory, cards)
//   })
// })


// function filter(category, items) {
//   items.forEach((item) => {
//     // проверка на соответствие категории
//     const isItemFiltered = !item.classList.contains(category)
//     console.log(isItemFiltered);
//     // Если карточка не содержит данную категорию
//     if (isItemFiltered == true) {
//       // Добавлять класс blur
//       item.classList.toggle('blur')
//       // В противном случае, удалять класс blur
//     }
//     // else {
//     //   item.classList.remove('blur')
//     // }
//   })
// }


// =