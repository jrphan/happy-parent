document.addEventListener("DOMContentLoaded", function () {
  // FAQ
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    const getAnswerHeight = () => {
      const answerContent = answer.querySelector("p");
      const styles = window.getComputedStyle(answerContent);
      const padding =
        parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      return answerContent.offsetHeight + padding;
    };

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-answer").style.maxHeight = "0";
        }
      });

      if (!isActive) {
        item.classList.add("active");
        const height = getAnswerHeight();
        answer.style.maxHeight = `${height}px`;
      } else {
        item.classList.remove("active");
        answer.style.maxHeight = "0";
      }
    });
  });
  const activeItem = document.querySelector(".faq-item.active");
  if (activeItem) {
    const answer = activeItem.querySelector(".faq-answer");
    const height = answer.querySelector("p").offsetHeight + 40;
    answer.style.maxHeight = `${height}px`;
  }
});
