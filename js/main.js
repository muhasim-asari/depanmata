(function () {
  "use strict";

  /*------------------------------------------------------------------

  01. Custom easings

-------------------------------------------------------------------*/

  window.App = {};

  App.html = document.querySelector("html");
  App.body = document.querySelector("body");
  App.SMcontroller = new ScrollMagic.Controller();

  window.onload = function () {
    document.fonts.ready.then(function () {
      initialReveal();
      initComponents();
    });
  };

  function initialReveal() {
    const preloader = document.querySelector(".js-preloader");
    if (!preloader) return;

    setTimeout(() => {
      preloader.classList.add("-is-hidden");
      RevealAnim.init();
    }, 300);
  }

  // Reloads all scripts when navigating through pages
  function initComponents() {
    lazyLoading();
    Accordion.init();
    Tabs.init();
    sectionSlider();
    Select.init(".js-select");
    parallaxInit();
    Events.init();
    Events.ddInit();
    Header.init();
    Header.headerSticky();

    cardImageSlider();
    mastheadSlider7();
    dropDown();
    clickElToggle();
    singleMenu();
    galleryInit();
    pinOnScroll();
    lineChart();
    parallaxIt();
    liveSearch();
    // mobileModal();
    mobileModalMobile();
  }

  function liveSearch() {
    const targets = document.querySelectorAll(".js-liverSearch");
    if (!targets) return;

    const data = [
      { city: "Solo", country: "Central Java, Indonesia", type: "location" },
      {
        city: "Manahan",
        country: "Solo, Central Java, Indonesia",
        type: "location",
      },
      {
        city: "Jebres",
        country: "Solo, Central Java, Indonesia",
        type: "location",
      },
      {
        city: "Banjarsari",
        country: "Solo, Central Java, Indonesia",
        type: "location",
      },
      {
        city: "Laweyan",
        country: "Solo, Central Java, Indonesia",
        type: "location",
      },
      {
        city: "Manahan Stadium",
        country: "Manahan, Central Java, Indonesia",
        type: "poi",
      },
      {
        city: "Taman Balekambang",
        country:
          "CRX4+2X2 Balekambang Park, Jl. Balekambang, Manahan, Kec. Banjarsari, Kota Surakarta, Jawa Tengah 57139, Indonesia",
        type: "poi",
      },
      {
        city: "Solo Paragon Mall",
        country:
          "Jl. Yosodipuro No.133, Mangkubumen, Kec. Banjarsari, Kota Surakarta, Jawa Tengah 57139",
        type: "poi",
      },
      {
        city: "Pura Mangkunegaran",
        country:
          "Jl. Ronggowarsito No.83, Keprabon, Kec. Banjarsari, Kota Surakarta, Jawa Tengah 57131",
        type: "poi",
      },
      {
        city: "Stasiun Balapan",
        country:
          "Jalan Wolter Monginsidi No.112, Kestalan, Kec. Banjarsari, Kota Surakarta, Jawa Tengah 57133",
        type: "poi",
      },
      {
        city: "Swiss-Belhotel Solo",
        country: "45 Jalan Ahmad Yani, Banjarsari, Surakarta",
        type: "property",
      },
      {
        city: "Red Planet Solo",
        country: "Mangkubumen, Central Java, Indonesia",
        type: "property",
      },
      {
        city: "Sans Hotel Fourth Loft Solo",
        country: "Manahan, Central Java, Indonesia",
        type: "property",
      },
      {
        city: "Dinasty Smart Hotel",
        country: "Manahan, Central Java, Indonesia",
        type: "property",
      },
    ];

    targets.forEach((el) => {
      const search = el.querySelector(".js-search");
      const results = el.querySelector(".js-results");
      let searchTerm = "";

      results.querySelectorAll(".js-search-option").forEach((option) => {
        const title = option.querySelector(
          ".js-search-option-target"
        ).innerHTML;

        option.addEventListener("click", () => {
          search.value = title;
          el.querySelector(".js-popup-window").classList.remove("-is-active");
        });
      });

      search.addEventListener("input", (event) => {
        searchTerm = event.target.value.toLowerCase();
        showList(searchTerm, results);

        results.querySelectorAll(".js-search-option").forEach((option) => {
          const title = option.querySelector(
            ".js-search-option-target"
          ).innerHTML;

          option.addEventListener("click", () => {
            search.value = title;
            el.querySelector(".js-popup-window").classList.remove("-is-active");
          });
        });
      });
    });

    const showList = (searchTerm, resultsEl) => {
      resultsEl.innerHTML = "";

      data
        .filter((item) => item.city.toLowerCase().includes(searchTerm))
        .forEach((e) => {
          const div = document.createElement("div");

          div.innerHTML = `
          <button class="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option">
            <div class="d-flex">
              <div class="icon-type">
              ${
                e.type === "location"
                  ? "<img src='img/icon/pin-location.svg' alt='icon-location'/>"
                  : e.type === "poi"
                  ? "<img src='img/icon/pin-poi.svg' alt='icon-location'/>"
                  : e.type === "property"
                  ? "<img src='img/icon/pin-property.svg' alt='icon-location'/>"
                  : "<label>Sorry, no results were found for sdsadasfdad. Try something else?</label>"
              }
              </div>
              <div class="ml-10">
                <div class="text-15 lh-12 fw-500 js-search-option-target">${
                  e.city
                }</div>
                <div class="text-14 lh-12 text-light-1 mt-5 text-overflow-search">${
                  e.country
                }</div>
              </div>
            </div>
          </button>
        `;

          resultsEl.appendChild(div);
        });
    };
  }

  function parallaxIt() {
    const target = document.querySelectorAll(".js-mouse-move-container");

    target.forEach((container) => {
      const $this = container;
      const targets = container.querySelectorAll(".js-mouse-move");

      targets.forEach((el) => {
        const movement = el.getAttribute("data-move");

        document.addEventListener("mousemove", (e) => {
          const relX = e.pageX - $this.offsetLeft;
          const relY = e.pageY - $this.offsetTop;

          gsap.to(el, {
            x: ((relX - $this.offsetWidth / 2) / $this.offsetWidth) * movement,
            y:
              ((relY - $this.offsetHeight / 2) / $this.offsetHeight) * movement,
            duration: 0.2,
          });
        });
      });
    });
  }

  function lineChart() {
    const ctx = document.getElementById("lineChart");
    if (!ctx) return;

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Marc",
          "April",
          "May",
          "Jun",
          "July",
          "Agust",
          "Sept",
          "Oct",
          "Now",
          "Dec",
        ],
        datasets: [
          {
            label: "#",
            data: [148, 100, 205, 110, 165, 145, 180, 156, 148, 220, 180, 245],
            tension: 0.4,
            backgroundColor: "#336CFB",
            borderColor: "#336CFB",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            min: 0,
            max: 300,
            ticks: {
              stepSize: 50,
            },
          },
        },
      },
    });
  }

  function pinOnScroll() {
    const target = document.querySelectorAll(".js-pin-container");
    if (!target) return;

    target.forEach((el) => {
      let itemOffset;

      if (el.querySelector(".js-pin-content").getAttribute("data-offset")) {
        itemOffset = el
          .querySelector(".js-pin-content")
          .getAttribute("data-offset");
      } else {
        itemOffset = 300;
      }

      console.log(itemOffset);

      const sceneDuration = el.offsetHeight + parseInt(itemOffset);

      const sceneOffset =
        el.querySelector(".js-pin-content").offsetHeight + parseInt(itemOffset);

      const scene = new ScrollMagic.Scene({
        duration: sceneDuration - sceneOffset,
        offset: sceneOffset,
        triggerElement: el,
        triggerHook: "onEnter",
      })
        .setPin(".js-pin-content")
        .addTo(App.SMcontroller);

      let width = window.innerWidth > 0 ? window.innerWidth : screen.width;

      if (width < 992) {
        scene.duration("1px");
        scene.refresh();
      } else {
        scene.duration(sceneDuration - sceneOffset);
        scene.refresh();
      }

      window.addEventListener("resize", () => {
        let width = window.innerWidth > 0 ? window.innerWidth : screen.width;

        if (width < 992) {
          scene.duration("1px");
          scene.refresh();
        } else {
          scene.duration(sceneDuration - sceneOffset);
          scene.refresh();
        }
      });
    });
  }

  function galleryInit() {
    GLightbox({
      selector: ".js-gallery",
      touchNavigation: true,
      loop: false,
      autoplayVideos: true,
    });
  }

  function singleMenu() {
    const target = document.querySelector(".js-singleMenu");
    if (!target) return;

    new ScrollMagic.Scene({ offset: "250px" })
      .setClassToggle(target, "-is-active")
      .addTo(App.SMcontroller);
  }

  function clickElToggle() {
    const target = document.querySelectorAll("[data-el-toggle]");
    if (!target) return;

    target.forEach((el) => {
      const attr = el.getAttribute("data-el-toggle");
      const openElement = document.querySelector(attr);

      const attrActive = el.getAttribute("data-el-toggle-active");
      const activeElement = document.querySelector(attrActive);

      el.addEventListener("click", () => {
        const allDD = document.querySelectorAll(
          ".js-click-dropdown.-is-el-visible"
        );
        if (allDD) {
          allDD.forEach((el) => el.classList.remove("-is-el-visible"));
        }

        const allActiveDD = document.querySelectorAll(".-is-dd-active");
        if (allActiveDD) {
          allActiveDD.forEach((el) => el.classList.remove("-is-dd-active"));
        }

        openElement.classList.toggle("-is-el-visible");
        if (activeElement) activeElement.classList.toggle("-is-dd-active");
      });
    });
  }

  function dropDown() {
    const target = document.querySelectorAll(".js-dropdown");
    if (!target) return;

    target.forEach((el) => {
      const items = el.querySelectorAll(".js-dropdown-list .js-dropdown-link");
      // const title = el.querySelector('.js-dropdown-title')

      items.forEach((el) => {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          title.innerHTML = el.innerHTML;

          const allDD = document.querySelectorAll(
            ".js-click-dropdown.-is-el-visible"
          );
          if (allDD) {
            allDD.forEach((el) => {
              el.classList.remove("-is-el-visible");
            });
          }

          const allActiveDD = document.querySelectorAll(".-is-dd-active");
          if (allActiveDD) {
            allActiveDD.forEach((el) => el.classList.remove("-is-dd-active"));
          }
        });
      });
    });
  }

  window.onclick = function (event) {
    if (
      !event.target.closest("[data-x-dd-click]") &&
      !event.target.closest("[data-x-dd]")
    ) {
      Events.closeAllDropdowns();
    }

    if (
      !event.target.classList.contains("dropdown__button") &&
      !event.target.classList.contains("js-dropdown-title")
    ) {
      const allDD = document.querySelectorAll(
        ".js-click-dropdown.-is-el-visible"
      );
      if (allDD) {
        allDD.forEach((el) => {
          el.classList.remove("-is-el-visible");
        });
      }

      const allActiveDD = document.querySelectorAll(".-is-dd-active");
      if (allActiveDD) {
        allActiveDD.forEach((el) => el.classList.remove("-is-dd-active"));
      }
    }

    if (!event.target.closest(".js-select")) {
      const targets = document.querySelectorAll(".js-select");
      if (!targets) return;

      targets.forEach((el) => {
        if (el.querySelector(".-is-visible")) {
          el.querySelector(".-is-visible").classList.remove("-is-visible");
        }
      });
    }

    if (!event.target.closest(".js-multiple-select")) {
      const targets = document.querySelectorAll(".js-multiple-select");
      if (!targets) return;

      targets.forEach((el) => {
        if (el.querySelector(".-is-visible")) {
          el.querySelector(".-is-visible").classList.remove("-is-visible");
        }
      });
    }
  };

  const Accordion = (function () {
    function init() {
      const targets = document.querySelectorAll(".js-accordion");
      if (!targets) return;

      for (let i = 0; i < targets.length; i++) {
        const items = targets[i].querySelectorAll(".accordion__item");

        for (let l = 0; l < items.length; l++) {
          const button = items[l].querySelector(".accordion__button");
          const content = items[l].querySelector(".accordion__content");
          const titleChange = items[l].querySelector(
            "[data-open-change-title]"
          );
          let buttonOrigTitle;
          let buttonNewTitle;

          if (items[l].classList.contains("js-accordion-item-active")) {
            items[l].classList.toggle("is-active");
            content.style.maxHeight = content.scrollHeight + "px";
          }

          if (titleChange) {
            buttonOrigTitle = titleChange.innerHTML;
            buttonNewTitle = titleChange.getAttribute("data-open-change-title");
          }

          button.addEventListener("click", (e) => {
            items[l].classList.toggle("is-active");

            if (titleChange) {
              if (items[l].classList.contains("is-active")) {
                titleChange.innerHTML = buttonNewTitle;
              } else {
                titleChange.innerHTML = buttonOrigTitle;
              }
            }

            if (content.style.maxHeight) {
              content.style.maxHeight = null;
            } else {
              content.style.maxHeight = content.scrollHeight + "px";
            }
          });
        }
      }
    }

    return {
      init: init,
    };
  })();

  const ShowMore = (function () {
    function init() {
      const targets = document.querySelectorAll(".js-show-more");
      if (!targets) return;

      targets.forEach((el, i) => {
        const button = el.querySelector(".show-more__button");
        const content = el.querySelector(".show-more__content");

        button.addEventListener("click", (e) => {
          el.classList.toggle("is-active");

          if (content.style.maxHeight) {
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      });
    }

    return {
      init: init,
    };
  })();

  const Tabs = (function () {
    function init() {
      const targets = document.querySelectorAll(".js-tabs");
      if (!targets) return;

      targets.forEach((el) => {
        singleTab(el);
      });
    }

    function singleTab(target) {
      const controls = target.querySelector(".js-tabs-controls");
      const controlsItems = target.querySelectorAll(
        ".js-tabs-controls .js-tabs-button"
      );
      const content = target.querySelector(".js-tabs-content");

      for (let l = 0; l < controlsItems.length; l++) {
        const el = controlsItems[l];

        el.addEventListener("click", (e) => {
          const selector = el.getAttribute("data-tab-target");

          controls
            .querySelector(".is-tab-el-active")
            .classList.remove("is-tab-el-active");
          content
            .querySelector(".is-tab-el-active")
            .classList.remove("is-tab-el-active");

          // console.log(controls.querySelector('.is-active'))
          // console.log(content.querySelector('.is-active'))

          el.classList.add("is-tab-el-active");
          content.querySelector(selector).classList.add("is-tab-el-active");
        });
      }
    }

    return {
      init: init,
    };
  })();

  /*--------------------------------------------------
  02. Elements reveal
---------------------------------------------------*/

  const RevealAnim = (function () {
    function single() {
      const animationTarget = document.querySelectorAll("[data-anim]");
      if (!animationTarget.length) return;

      for (let i = 0; i < animationTarget.length; i++) {
        const el = animationTarget[i];

        new ScrollMagic.Scene({
          offset: "350px",
          triggerElement: el,
          triggerHook: "onEnter",
          reverse: false,
        })
          .on("enter", function (event) {
            animateElement(el);
          })
          .addTo(App.SMcontroller);
      }
    }

    function container() {
      const animationContainer = document.querySelectorAll("[data-anim-wrap]");

      if (!animationContainer.length) {
        return;
      }

      for (let i = 0; i < animationContainer.length; i++) {
        const el = animationContainer[i];

        new ScrollMagic.Scene({
          offset: "350px",
          triggerElement: el,
          triggerHook: "onEnter",
          reverse: false,
        })
          .on("enter", function (event) {
            const animChilds = el.querySelectorAll("[data-anim-child]");
            el.classList.add("animated");
            animChilds.forEach((el) => animateElement(el));
          })
          .addTo(App.SMcontroller);
      }
    }

    function animateElement(target) {
      let attrVal;
      let animDelay;
      let attrDelayPart;

      if (target.getAttribute("data-anim")) {
        attrVal = target.getAttribute("data-anim");
      } else {
        attrVal = target.getAttribute("data-anim-child");
      }

      if (attrVal.includes("delay-")) {
        attrDelayPart = attrVal.split(" ").pop();
        animDelay = attrDelayPart.substr(attrDelayPart.indexOf("-") + 1) / 10;
      }

      if (attrVal.includes("counter")) {
        counter(target, animDelay);
      } else if (attrVal.includes("line-chart")) {
        lineChart(target, animDelay);
      } else if (attrVal.includes("pie-chart")) {
        pieChart(target, animDelay);
      } else if (attrVal.includes("split-lines")) {
        splitLines(target, animDelay);
      } else {
        target.classList.add("is-in-view");
      }
    }

    function pieChart(target, animDelay = 0) {
      const counterVal = target.getAttribute("data-percent");
      const chartBar = target.querySelector(".js-chart-bar");

      if (counterVal < 0) {
        counterVal = 0;
      }
      if (counterVal > 100) {
        counterVal = 100;
      }

      gsap.fromTo(
        chartBar,
        {
          drawSVG: `0%`,
        },
        {
          delay: 0.3 + animDelay,
          duration: 1.4,
          ease: "power3.inOut",
          drawSVG: `${counterVal}%`,

          onStart: () => {
            chartBar.classList.remove("bar-stroke-hidden");
          },
        }
      );

      let object = { count: 0 };
      const barPercent = target.querySelector(".js-chart-percent");

      gsap.to(object, {
        count: counterVal,
        delay: 0.45 + animDelay,
        duration: 1,
        ease: "power3.inOut",

        onUpdate: function () {
          barPercent.innerHTML = Math.round(object.count) + "%";
        },
      });
    }

    function lineChart(target, animDelay = 0) {
      const counterVal = target.getAttribute("data-percent");

      gsap.fromTo(
        target.querySelector(".js-bar"),
        {
          scaleX: 0,
        },
        {
          delay: 0.45 + animDelay,
          duration: 1,
          ease: "power3.inOut",
          scaleX: counterVal / 100,
        }
      );

      let object = { count: 0 };
      const barPercent = target.querySelector(".js-number");

      gsap.to(object, {
        count: counterVal,
        delay: 0.45 + animDelay,
        duration: 1,
        ease: "power3.inOut",

        onUpdate: function () {
          barPercent.innerHTML = Math.round(object.count);
        },
      });
    }

    function counter(target, animDelay = 0) {
      const counterVal = target.getAttribute("data-counter");
      const counterAdd = target.getAttribute("data-counter-add");
      const totalDelay = animDelay;
      let symbols = "";

      let object = { count: 0 };
      const counterNum = target.querySelector(".js-counter-num");

      if (counterAdd) {
        symbols = counterAdd;
      }

      gsap.to(object, {
        count: counterVal,
        delay: totalDelay,
        duration: 1.8,
        ease: "power3.inOut",

        onUpdate: function () {
          counterNum.innerHTML = Math.round(object.count) + symbols;
        },
      });
    }

    function init() {
      single();
      container();
    }

    return {
      init: init,
    };
  })();

  const Select = (function () {
    function init(selector) {
      document.querySelectorAll(selector).forEach((el) => singleSelect(el));
      document
        .querySelectorAll(".js-multiple-select")
        .forEach((el) => multipleSelect(el));
    }

    function multipleSelect(target) {
      console.log(target);
      const button = target.querySelector(".js-button");
      const title = button.querySelector(".js-button-title");

      button.addEventListener("click", () => {
        let dropdown = target.querySelector(".js-dropdown");

        if (dropdown.classList.contains("-is-visible")) {
          dropdown.classList.remove("-is-visible");
        } else {
          closeAlldropdowns();
          dropdown.classList.add("-is-visible");
        }
      });

      const dropdown = target.querySelector(".js-dropdown");
      const options = dropdown.querySelectorAll(".js-options > *");

      options.forEach((el) => {
        el.addEventListener("click", () => {
          let selectedValues = [];
          el.classList.toggle("-is-choosen");

          const array = dropdown.querySelectorAll(
            ".-is-choosen .js-target-title"
          );
          array.forEach((el2) => {
            selectedValues.push(el2.innerHTML);
          });

          if (!array.length) {
            title.innerHTML = "Default";
            target.setAttribute("data-select-value", "");
          } else {
            title.innerHTML = selectedValues.join(", ");
            target.setAttribute("data-select-value", selectedValues.join(", "));
          }

          const checkbox = el.querySelector("input");
          checkbox.checked = !checkbox.checked;
        });
      });
    }

    function singleSelect(target) {
      const button = target.querySelector(".js-button");
      const title = button.querySelector(".js-button-title");

      if (target.classList.contains("js-liveSearch")) {
        liveSearch(target);
      }

      button.addEventListener("click", () => {
        let dropdown = target.querySelector(".js-dropdown");

        if (dropdown.classList.contains("-is-visible")) {
          dropdown.classList.remove("-is-visible");
        } else {
          closeAlldropdowns();
          dropdown.classList.add("-is-visible");
        }

        if (target.classList.contains("js-liveSearch")) {
          target.querySelector(".js-search").focus();
        }
      });

      const dropdown = target.querySelector(".js-dropdown");
      const options = dropdown.querySelectorAll(".js-options > *");

      options.forEach((el) => {
        el.addEventListener("click", () => {
          title.innerHTML = el.innerHTML;
          target.setAttribute(
            "data-select-value",
            el.getAttribute("data-value")
          );
          dropdown.classList.toggle("-is-visible");
        });
      });
    }

    function liveSearch(target) {
      const search = target.querySelector(".js-search");
      const options = target.querySelectorAll(".js-options > *");

      search.addEventListener("input", (event) => {
        let searchTerm = event.target.value.toLowerCase();

        options.forEach((el) => {
          el.classList.add("d-none");

          if (el.getAttribute("data-value").includes(searchTerm)) {
            el.classList.remove("d-none");
          }
        });
      });
    }

    function closeAlldropdowns() {
      const targets = document.querySelectorAll(
        ".js-select, .js-multiple-select"
      );
      if (!targets) return;

      targets.forEach((el) => {
        if (el.querySelector(".-is-visible")) {
          el.querySelector(".-is-visible").classList.remove("-is-visible");
        }
      });
    }

    return {
      init: init,
    };
  })();

  /*--------------------------------------------------
  03. Section sliders
---------------------------------------------------*/

  function sectionSlider() {
    const sectionSlider = document.querySelectorAll(".js-section-slider");
    if (!sectionSlider.length) return;

    for (let i = 0; i < sectionSlider.length; i++) {
      const el = sectionSlider[i];

      let prevNavElement = el.querySelector(".js-prev");
      let nextNavElement = el.querySelector(".js-next");

      if (el.getAttribute("data-nav-prev"))
        prevNavElement = document.querySelector(
          `.${el.getAttribute("data-nav-prev")}`
        );
      if (el.getAttribute("data-nav-next"))
        nextNavElement = document.querySelector(
          `.${el.getAttribute("data-nav-next")}`
        );

      let gap = 0;
      let loop = false;
      let centered = false;
      let pagination = false;
      let scrollbar = false;

      if (el.getAttribute("data-gap")) gap = el.getAttribute("data-gap");
      if (el.hasAttribute("data-loop")) loop = true;
      if (el.hasAttribute("data-center")) centered = true;

      if (el.getAttribute("data-pagination")) {
        let paginationElement = document.querySelector(
          `.${el.getAttribute("data-pagination")}`
        );

        pagination = {
          el: paginationElement,
          bulletClass: "pagination__item",
          bulletActiveClass: "is-active",
          bulletElement: "div",
          clickable: true,
        };
      }

      if (el.hasAttribute("data-scrollbar")) {
        scrollbar = {
          el: ".js-scrollbar",
          draggable: true,
        };
      }

      const colsArray = el.getAttribute("data-slider-cols").split(" ");

      let cols_base = 1;
      let cols_xl = 1;
      let cols_lg = 1;
      let cols_md = 1;
      let cols_sm = 1;

      colsArray.forEach((el) => {
        if (el.includes("base")) cols_base = el.slice(-1);
        if (el.includes("xl")) cols_xl = el.slice(-1);
        if (el.includes("lg")) cols_lg = el.slice(-1);
        if (el.includes("md")) cols_md = el.slice(-1);
        if (el.includes("sm")) cols_sm = el.slice(-1);
      });

      new Swiper(el, {
        speed: 600,

        centeredSlides: centered,
        parallax: true,
        watchSlidesVisibility: true,
        loop: loop,
        loopAdditionalSlides: 1,
        preloadImages: false,
        lazy: true,

        scrollbar: scrollbar,
        pagination: pagination,
        spaceBetween: 10,

        slidesPerView: parseInt(cols_base),
        breakpoints: {
          1199: {
            slidesPerView: parseInt(cols_xl),
            width: null,
            spaceBetween: parseInt(gap),
          },
          991: {
            slidesPerView: parseInt(cols_lg),
            width: null,
            spaceBetween: parseInt(gap),
          },
          767: {
            slidesPerView: parseInt(cols_md),
            width: null,
            spaceBetween: parseInt(gap),
          },
          574: {
            slidesPerView: parseInt(cols_sm),
            width: null,
            spaceBetween: parseInt(gap),
          },
        },

        lazy: {
          loadPrevNext: true,
        },
        navigation: {
          prevEl: prevNavElement,
          nextEl: nextNavElement,
        },
      });
    }
  }

  function cardImageSlider() {
    new Swiper(".js-cardImage-slider", {
      speed: 400,
      loop: true,
      lazy: {
        loadPrevNext: true,
      },
      navigation: {
        prevEl: ".js-prev",
        nextEl: ".js-next",
      },
      pagination: {
        el: ".js-pagination",
        bulletClass: "pagination__item",
        bulletActiveClass: "is-active",
        bulletElement: "div",
        clickable: true,
      },
    });
  }

  function mastheadSlider7() {
    var slidesQuantity = document.querySelectorAll(".albums-venue").length;

    function updSwiperNumericPagination() {
      this.el.querySelector(".total-slide-albums").innerHTML =
        '<span class="count">' +
        (this.realIndex + 1) +
        '</span>/<span class="total">' +
        slidesQuantity +
        "</span>";
    }

    new Swiper(".js-masthead-slider-7", {
      speed: 600,
      loop: true,
      lazy: {
        loadPrevNext: true,
      },
      navigation: {
        prevEl: ".js-prev",
        nextEl: ".js-next",
      },
      pagination: {
        el: ".swiper-pagination",
      },
      on: {
        init: updSwiperNumericPagination,
        slideChange: updSwiperNumericPagination,
      },
    });
  }

  /*--------------------------------------------------
  04. Lazy loading
---------------------------------------------------*/

  function lazyLoading() {
    if (!document.querySelector(".js-lazy")) {
      return;
    }

    new LazyLoad({
      elements_selector: ".js-lazy",
    });
  }

  /*--------------------------------------------------
  05. Parallax
---------------------------------------------------*/

  function parallaxInit() {
    if (!document.querySelector("[data-parallax]")) return;
    const target = document.querySelectorAll("[data-parallax]");

    target.forEach((el) => {
      jarallax(el, {
        speed: el.getAttribute("data-parallax"),
        imgElement: "[data-parallax-target]",
      });
    });
  }

  const Events = (function () {
    function init() {
      const targets = document.querySelectorAll("[data-x-click]");
      if (!targets) return;

      targets.forEach((eventTarget) => {
        const attributes = eventTarget.getAttribute("data-x-click").split(", ");

        attributes.forEach((el) => {
          const target = document.querySelector(`[data-x=${el}]`);

          eventTarget.addEventListener("click", () => {
            const toggleClass = target.getAttribute("data-x-toggle");
            target.classList.toggle(toggleClass);
          });
        });
      });
    }

    function ddInit() {
      const targets = document.querySelectorAll(".js-form-dd");
      if (!targets) return;

      targets.forEach((el) => {
        const eventTarget = el.querySelector("[data-x-dd-click]");
        const attributes = eventTarget
          .getAttribute("data-x-dd-click")
          .split(", ");

        attributes.forEach((el2) => {
          const target = el.querySelector(`[data-x-dd=${el2}]`);
          const toggleClass = target.getAttribute("data-x-dd-toggle");

          eventTarget.addEventListener("click", () => {
            if (eventTarget.querySelector(".js-dd-focus"))
              eventTarget.querySelector(".js-dd-focus").focus();

            if (target.classList.contains(toggleClass)) {
              target.classList.remove(toggleClass);
              el.classList.remove("-is-dd-wrap-active");
            } else {
              closeAllDropdowns();
              target.classList.add(toggleClass);
              el.classList.add("-is-dd-wrap-active");
            }
          });
        });
      });
    }

    function closeAllDropdowns() {
      const classes = document.querySelectorAll(".-is-dd-wrap-active");
      if (classes) {
        classes.forEach((el) => {
          el.classList.remove("-is-dd-wrap-active");
        });
      }

      const targets = document.querySelectorAll(".js-form-dd");
      if (!targets) return;

      targets.forEach((el) => {
        const eventElement = el.querySelector("[data-x-dd]");
        const eventTarget = el.querySelector("[data-x-dd-click]");
        const attributes = eventTarget
          .getAttribute("data-x-dd-click")
          .split(", ");

        attributes.forEach((el) => {
          eventElement.classList.remove("-is-active");
          const target = document.querySelector(`[data-x-dd=${el}]`);
          const toggleClass = target.getAttribute("data-x-dd-toggle");
          target.classList.remove(toggleClass);
        });
      });
    }

    return {
      ddInit: ddInit,
      closeAllDropdowns: closeAllDropdowns,
      init: init,
    };
  })();

  /*--------------------------------------------------
  06. Header
---------------------------------------------------*/

  const Header = (function () {
    let navList;
    let navBtnListBack;
    let menuDeepLevel;
    let timeline = gsap.timeline();

    function updateVars() {
      if (document.querySelector(".desktopMenu")) {
        navList = document.querySelector(".desktopMenu .js-navList");
      } else {
        navList = document.querySelector(".js-navList");
      }

      navBtnListBack = document.querySelectorAll(".js-nav-list-back");
      menuDeepLevel = 0;
    }

    function init() {
      updateVars();
      menuListBindEvents();
    }

    function deepLevelCheck(level) {
      return level;
    }

    function menuListBindEvents() {
      const listItems = document.querySelectorAll(
        ".js-navList .menu-item-has-children"
      );
      if (!listItems.length) return;

      navBtnListBack.forEach((el) => {
        el.addEventListener("click", () => {
          const visibleList = navList.querySelector("ul.-is-active");
          const parentList = visibleList.parentElement.parentElement;

          menuDeepLevel--;
          menuListStepAnimate(visibleList, parentList, menuDeepLevel);
        });
      });

      listItems.forEach((el) => {
        const parentLink = el.querySelector("li > a");
        parentLink.removeAttribute("href");

        parentLink.addEventListener("click", () => {
          const parent = el.parentElement;
          const subnavList = el.lastElementChild;

          menuDeepLevel++;
          menuListStepAnimate(
            parent,
            subnavList,
            menuDeepLevel,
            parentLink.innerHTML
          );
        });
      });
    }

    function menuListStepAnimate(hideList, showList, level) {
      let hideListItems = hideList.children;
      hideListItems = Array.from(hideListItems);
      const hideListLinks = hideListItems.map((item) =>
        item.querySelector("li > a")
      );

      let showListItems = showList.children;
      showListItems = Array.from(showListItems);
      const showListLinks = showListItems.map((item) =>
        item.querySelector("li > a")
      );

      let width = window.innerWidth > 0 ? window.innerWidth : screen.width;

      if (width < 1199 || document.querySelector(".js-desktopMenu")) {
        timeline.clear();

        if (!deepLevelCheck(level)) {
          gsap.to(navBtnListBack, {
            ease: "quart.inOut",
            duration: 0.6,
            opacity: 0,
          });
        }

        timeline.to(hideListLinks, {
          ease: "quart.out",
          stagger: -0.04,
          duration: 0.8,
          y: "100%",
          onStart: () => {
            showList.classList.add("-is-active");
          },
          onComplete: () => {
            hideList.classList.remove("-is-active");
          },
        });

        if (deepLevelCheck(level)) {
          timeline.to(
            navBtnListBack,
            {
              ease: "quart.inOut",
              duration: 0.6,
              y: "0px",
              opacity: 1,
            },
            ">-0.5"
          );
        }

        timeline.to(
          showListLinks,
          {
            ease: "quart.out",
            stagger: 0.08,
            duration: 0.9,
            y: "0%",
          },
          ">-0.6"
        );
      }
    }

    function headerSticky() {
      const header = document.querySelector(".js-header");
      if (!header) return;

      let classList = "";

      if (header.getAttribute("data-add-bg")) {
        classList = header.getAttribute("data-add-bg");
      }

      new ScrollMagic.Scene({ offset: "6px" })
        .setClassToggle(header, classList)
        .addTo(App.SMcontroller);

      new ScrollMagic.Scene({ offset: "6px" })
        .setClassToggle(header, "is-sticky")
        .addTo(App.SMcontroller);
    }

    return {
      headerSticky: headerSticky,
      init: init,
    };
  })();

  /*--------------------------------------------------
  07. Modal Mobile
---------------------------------------------------*/

  function mobileModal() {
    const jsMobilePopUp = document.querySelectorAll(".js-modal-popup");
    const SheetWrapper = document.querySelector(".sheet-wrapper");
    const closeButtons = document.querySelectorAll(".close");
    const backdrop = document.querySelector(".backdrop");
    const bodyHidden = document.querySelector("body");

    jsMobilePopUp.forEach((jsMobilePopUp) => {
      jsMobilePopUp.addEventListener("click", () => {
        SheetWrapper.classList.add("mobilePopup__is-active");
        bodyHidden.classList.add("html-overflow-hidden");
      });
    });

    function closeModal() {
      SheetWrapper.classList.remove("mobilePopup__is-active");
      bodyHidden.classList.remove("html-overflow-hidden");
    }

    closeButtons.forEach((closeButton) => {
      closeButton.addEventListener("click", closeModal);
    });

    backdrop.addEventListener("click", closeModal);
  }

  function mobileModalMobile() {
    const jsMobilePopUp = document.querySelectorAll(".js-modal-popup");
    const closeButtons = document.querySelectorAll(".close");
    const backdrop = document.querySelectorAll(".backdrop");
    const bodyHidden = document.querySelector("body");
  
    jsMobilePopUp.forEach((jsMobilePopUp) => {
      jsMobilePopUp.addEventListener("click", () => {
        const modalTarget = jsMobilePopUp.getAttribute("data-modal-target");
        const modalWrapper = document.querySelector(modalTarget);
        modalWrapper.classList.add("mobilePopup__is-active");
        bodyHidden.classList.add("html-overflow-hidden");
      });
    });
  
    function closeModal() {
      const modalWrapper = this.closest(".sheet-wrapper");
      modalWrapper.classList.remove("mobilePopup__is-active");
      bodyHidden.classList.remove("html-overflow-hidden");
    }
  
    closeButtons.forEach((closeButton) => {
      closeButton.addEventListener("click", closeModal);
    });
  
    backdrop.forEach((backdrop) => {
      backdrop.addEventListener("click", closeModal);
    });
  }
  
})();
