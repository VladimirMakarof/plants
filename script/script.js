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
      // console.log(card.dataset['filter']);
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
    // класс листа contains
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
const priceDropdown = document.querySelectorAll('price_dropdown') // получим все элементы с коротким текстом, html коллекцию элементов !

const accControl = document.querySelectorAll('.accordion-control');

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



const dropBtn = document.querySelector('.drop-btn');
const dropContent = document.querySelector('.dropdown-content');
const dropLinks = document.querySelectorAll('.dropdown-link');

let elem;


//dropdown

dropBtn.addEventListener('click', (e) => {
  e.target.classList.add('_active')
  e.target.nextElementSibling.classList.toggle('_active')
  dropContent.classList.toggle('_show');
})

class Card {
  constructor(city, phone, address, phoneLink, parentSelector) {
    this.city = city;
    this.phone = phone;
    this.address = address;
    this.phoneLink = phoneLink;
    this.parent = document.querySelector(parentSelector);
  }
  render() {
    elem = document.createElement('div');
    elem.innerHTML = `
            <div class="drop-inner">
            <div class="drop-titles">
                <p class="drop-title">City:</p>
                <p class="drop-title">Phone:</p>
                <p class="drop-title">Office address:</p>
            </div>
            <div class="drop-info">
                <p class="info">${this.city}</p>
                <p class="info">${this.phone}</p>
                <p class="info">${this.address}</p>
            </div>
            </div>
            <a class="link" href="tel:${this.phoneLink}">
                Call us
            </a>`;
    elem.classList.add('drop-block');
    this.parent.append(elem);
  }
  delete() {
    if (elem) {
      elem.remove()
    }
  }
}

const arrCards = [new Card(
  "Canandaigua, NY",
  "+1\t585\t393 0001",
  "151 Charlotte Street",
  "+15853930001",
  '.contact-dropdown'
), new Card(
  "New York City",
  "+1\t212\t456 0002",
  "9 East 91st Street",
  "+12124560002",
  '.contact-dropdown'
), new Card(
  "Yonkers, NY",
  "+1\t914\t678 0003",
  "511 Warburton Ave",
  "+19146780003",
  '.contact-dropdown'
), new Card(
  "Sherrill, NY",
  "+1\t315\t908 0004",
  "14 WEST Noyes BLVD",
  "+13159080004",
  '.contact-dropdown'
)]

dropLinks.forEach((link, i) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.classList.contains('dropdown-link')) {
      dropBtn.textContent = e.target.textContent
      // console.log(e.target.nextElementSibling)
      dropContent.classList.toggle('_show');
      arrCards.forEach(item => {
        item.delete()
      })
      arrCards[i].render()
    }
  })
})

const accBtn = document.querySelectorAll('.accordion-item');


//accordion

accBtn.forEach(item => {
  item.addEventListener('click', (e) => {

    if (item.classList.contains('_active')) {
      accBtn.forEach(elem => {
        elem.classList.remove('_active');
      });
    } else {
      accBtn.forEach(elem => {
        elem.classList.remove('_active');
      });

      item.classList.toggle('_active')
    }
  });
});
console.log(`Максимальная оценка за задание 100 баллов`)
console.log(`При нажатии на кнопки:Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50
При выборе одной услуги(нажатии одной кнопки), остальные карточки услуг принимают эффект blur, выбранная услуга остается неизменной + 20
Пользователь может нажать одновременно две кнопки услуги, тогда эта кнопка тоже принимает стиль активной и карточки с именем услуги выходят из эффекта blur.При этом пользователь не может нажать одновременно все три кнопки услуг.При повторном нажатии на активную кнопку она деактивируется(становится неактивной) а привязанные к ней позиции возвращаются в исходное состояние(входит в состяние blur если есть еще активная кнопка или же перестають быть в блюре если это была единственная нажатая кнопка). + 20
Анимации плавного перемещения кнопок в активное состояние и карточек услуг в эффект blur + 10`)
console.log(`Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50
При нажатии на dropdown кнопку появляется описание тарифов цен в соответствии с макетом. Внутри реализована кнопка order, которая ведет на секцию contacts, при нажатии на нее Accordion все еще остается открытым. +25
Пользователь может самостоятельно закрыть содержимое нажав на кнопку dropup, но не может одновременно открыть все тарифы услуг, при открытии нового тарифа предыдущее автоматически закрывается. +25`);
console.log(`В разделе contacts реализован select с выбором городов +25
В зависимости от выбора пользователя появляется блок с адресом и телефоном офиса в определенном городе +15
При нажатии на кнопку Call us реализован вызов по номеру, который соответствует выбранному городу +10`)