document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },

    grabCursor: true
  });
});
