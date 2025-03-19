// Utility functions
const Utils = {
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  isMobile() {
    return window.innerWidth <= 768;
  },
};

// FAQ Component
class FAQ {
  constructor() {
    this.faqItems = document.querySelectorAll(".faq-item");
    this.init();
  }

  init() {
    this.faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      question.addEventListener("click", () => this.toggleFAQ(item));
    });
  }

  toggleFAQ(item) {
    const isActive = item.classList.contains("active");
    const answer = item.querySelector(".faq-answer");

    this.faqItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("active")) {
        otherItem.classList.remove("active");
        otherItem.querySelector(".faq-answer").style.maxHeight = "0";
      }
    });

    if (!isActive) {
      item.classList.add("active");
      const height = answer.querySelector("p").offsetHeight + 40;
      answer.style.maxHeight = `${height}px`;
    } else {
      item.classList.remove("active");
      answer.style.maxHeight = "0";
    }
  }
}

// Testimonials Component
class Testimonials {
  constructor() {
    this.swiperConfig = {
      slidesPerView: "auto",
      spaceBetween: 24,
      loop: false,
      // autoplay: {
      //   delay: 30000,
      //   disableOnInteraction: false,
      //   stopOnLastSlide: true,
      // },
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
      speed: 800,
      effect: "slide",
      observer: true,
      observeParents: true,
      resizeObserver: true,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 2.2,
          spaceBetween: 24,
        },
      },
      centeredSlides: false,
      grabCursor: true,
      on: {
        init: () => this.checkNavigationState(),
        slideChange: () => this.checkNavigationState(),
        resize: () => {
          this.swiper.update();
          this.checkNavigationState();
          this.updateSwiperContainer();
        },
      },
    };

    this.init();
  }

  init() {
    this.swiper = new Swiper(".testimonials-swiper", this.swiperConfig);
    this.updateSwiperContainer();
    this.setupResizeListener();
  }

  checkNavigationState() {
    const prevButton = document.querySelector(".button-prev");
    const nextButton = document.querySelector(".button-next");

    prevButton.classList.toggle("disabled", this.swiper.isBeginning);
    nextButton.classList.toggle("disabled", this.swiper.isEnd);
  }

  updateSwiperContainer() {
    const container = document.querySelector(".testimonials-swiper");
    const windowWidth = window.innerWidth;
    const containerWidth = document.querySelector(".container").offsetWidth;

    if (windowWidth <= 768) {
      container.style.width = "100%";
      container.style.paddingRight = "0";
    } else {
      const extraWidth = (windowWidth - containerWidth) / 2;
      container.style.width = `calc(100% + ${extraWidth}px)`;
      container.style.paddingRight = `${extraWidth}px`;
    }
  }

  setupResizeListener() {
    window.addEventListener(
      "resize",
      Utils.debounce(() => {
        this.swiper.update();
        this.checkNavigationState();
        this.updateSwiperContainer();
      }, 250)
    );
  }
}

// App Initialization
class App {
  constructor() {
    this.initializeModules();
  }

  initializeModules() {
    this.faq = new FAQ();
    this.testimonials = new Testimonials();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});
