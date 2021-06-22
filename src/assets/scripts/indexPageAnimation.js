import anime from "animejs";

const useIndexAnimation = () => {
  // Получаем элементы для анимации
  const firstSection = document.getElementById("firstSection");
  const secondSection = document.getElementById("secondSection");
  const thirdSection = document.getElementById("thirdSection");
  const indexBgImage = document.getElementById("indexBgImage");

  // Анимация появления
  console.log(window.location.href);
  document.body.style.overflow = "hidden";
  const timeLine = anime.timeline({
    complete: () => {
      document.body.style.overflow = "visible";
    },
  });
  timeLine
    .add({
      targets: ".main-index .titles-container",
      opacity: [0, 1],
      duration: 2500,
      delay: 1500,
      easing: "easeOutQuad",
    })
    .add(
      {
        targets: ".main-index .navigation__video-container",
        translateX: ["150%", 0],
        duration: 1000,
        easing: "easeOutCirc",
      },
      2500
    )
    .add(
      {
        targets: ".header__logo",
        translateX: ["-208%", 0],
        duration: 1500,
        easing: "easeOutCirc",
      },
      2500
    )
    .add(
      {
        targets: ".header__links",
        translateY: ["-250%", 0],
        duration: 1500,
        easing: "easeOutCirc",
      },
      2500
    )
    .add(
      {
        targets: ".main-index .navigation__links",
        translateY: ["208%", 0],
        duration: 2000,
        easing: "easeOutCirc",
      },
      2000
    )
    .add(
      {
        targets: ".sidebar",
        translateX: ["250px", 0],
        duration: 1500,
        easing: "easeOutCirc",
      },
      2300
    );

  // Расчет сколько писелей составляет хедер и первая секция для дальнейшегго скроллинга на это расстояние
  const scrollOffset =
    firstSection.getBoundingClientRect().height +
    firstSection.getBoundingClientRect().top +
    window.scrollY;

  // Анимация скроллинга до второй секции
  const useAnimationScroll = (documentScrollTop) => {
    document.body.style.overflow = "hidden";
    const tl = anime.timeline({
      complete: () => {
        document.body.style.overflow = "visible";
      },
    });
    tl.add({
      targets: [document.documentElement, document.body],
      scrollTop: [documentScrollTop, scrollOffset],
      duration: 2000,
      easing: "easeInOutQuad",
    }).add(
      {
        targets: [secondSection, thirdSection],
        opacity: [0, 1],
        duration: 2000,
        easing: "easeInOutQuad",
      },
      "-=1500"
    );
    return tl;
  };

  // Флаг был ли скроллинг страницы
  let scrolling = false;

  // Флаг какой по счету скроллинг
  let scrollingCount = 0;

  window.addEventListener("scroll", () => {
    // Если до этого не было скроллинга и если он первый
    if (!scrolling && !scrollingCount) {
      useAnimationScroll(document.documentElement.scrollTop).play();
      // Устанавливаем что скроллинг был
      scrolling = true;
      // Увеличиваем счетчик
      scrollingCount += 1;
    }

    // Если скролл был или скролл не первый добавляем паралакс эффект для картинки
    if (scrolling || scrollingCount) {
      const initialPosition = 50;
      const parallaxEffect =
        (window.pageYOffset * 100) / document.documentElement.clientHeight;
      const k = 2;
      indexBgImage.style.top = `${initialPosition + parallaxEffect / k}vh`;
    }

    if (window.pageYOffset === 0) {
      scrolling = false;
    }
  });

  // При обновлении скидываем скролл в ноль
  window.onunload = () => {
    window.scrollTo(0, 0);
  };

  // Получаем кнопки скроллинга
  const scrollDownBtn = document.getElementById("scrollDownBtn");
  const scrollUpBtn = document.getElementById("scrollUpBtn");

  scrollDownBtn.addEventListener("click", () => {
    useAnimationScroll(document.documentElement.scrollTop).play();
  });

  scrollUpBtn.addEventListener("click", () => {
    anime({
      targets: [document.documentElement, document.body],
      scrollTop: 0,
      duration: 2000,
      easing: "easeInOutQuad",
    });
  });
};

window.location.pathname === "/" && useIndexAnimation();
