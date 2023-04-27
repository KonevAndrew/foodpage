import './index.html';
import './index.scss';

import { mult, sum } from './modules/calc';

"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");
  const tabsParent = document.querySelector(".tabheader__items");
  const burgerWrapper = document.querySelector(".burger__wrapper");
  const burger = document.querySelector(".burger");
  const burgerMenu = document.querySelector(".burger__menu");
  const body = document.querySelector("body");
  const activity = document.querySelector(".calculating__choose_big");
  const activityBtn = activity.querySelectorAll(".calculating__choose-item");

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

  //калькулятор каллорий

  activity.addEventListener("click", (event) => {
    activityBtn.forEach((item) => {
      item.classList.remove("calculating__choose-item_active");
    });
    if (event.target && event.target.classList.contains("calculating__choose-item")) {
      event.target.classList.add("calculating__choose-item_active");
    }
  });

  //таймер

  const deadLine = "2023-05-23";

  function getTime(endtime) {
    let days, hourses, minutes, seconds;
    const time = Date.parse(endtime) - Date.parse(new Date());

    if (time <= 0) {
      days = 0;
      hourses = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(time / (1000 * 60 * 60 * 24));
      hourses = Math.floor((time / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((time / 1000 / 60) % 60);
      seconds = Math.floor((time / 1000) % 60);
    }

    return {
      total: time,
      days: days,
      hourses: hourses,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hourse = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
    const timeInterval = setInterval(upDateClock, 1000);

    upDateClock();

    function upDateClock() {
      const t = getTime(endtime);
      days.innerHTML = getZero(t.days);
      hourse.innerHTML = getZero(t.hourses);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (total.time <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadLine);

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
});

const topBtn = document.querySelector(".btn__top");

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
