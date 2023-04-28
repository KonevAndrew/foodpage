import './index.html';
import './index.scss';
import calc from './modules/calc';
import slider from './modules/slider';
import timer from './modules/timer';

"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");
  const tabsParent = document.querySelector(".tabheader__items");
  const burgerWrapper = document.querySelector(".burger__wrapper");
  const burger = document.querySelector(".burger");
  const burgerMenu = document.querySelector(".burger__menu");
  const body = document.querySelector("body");
  const topBtn = document.querySelector(".btn__top");

  //переключение табов

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //скрытие бургера при клике вне элемента

  document.addEventListener("click", function (e) {
    const withinBoundaries = e.composedPath().includes(burgerWrapper);
    if (!withinBoundaries) {
      burger.classList.remove("burger_active");
      burgerMenu.classList.remove("burger__menu-active");
      body.classList.remove("hidden");
    }
  });

  //бургер меню

  burger.addEventListener("click", () => {
    burger.classList.toggle("burger_active");
    burgerMenu.classList.toggle("burger__menu-active");
    body.classList.toggle("hidden");
  });

  
// Получаем элементы со страницы
const modalTrigger = document.querySelectorAll('.modal-trigger');
const modalClose = document.querySelector('.modal__close');
const modal = document.querySelector('.modal');
const modalDialog = document.querySelector('.modal__dialog');

// Функция для открытия модального окна
function openModal() {
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
}

// Функция для закрытия модального окна
function closeModal() {
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

// Навешиваем обработчик событий на каждую кнопку
modalTrigger.forEach(btn => {
  btn.addEventListener('click', openModal);
});

// Навешиваем обработчик события на крестик
modalClose.addEventListener('click', closeModal);

// Навешиваем обработчик события на область вокруг модального окна
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
topBtn.addEventListener("click", scrollToPos);

//скрол наверх

function scrollToPos() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

//скрытие и появление ракеты для скрола вверх

window.addEventListener("scroll", function () {
  if (window.scrollY < window.innerHeight) {
    topBtn.classList.remove("show");
  } else {
    topBtn.classList.add("show");
  }
});

//вызов функций
  timer('.timer', '2023-05-23');
  calc();
  slider({
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
});
  
});