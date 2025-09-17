    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const slideshow = document.getElementById("slideshow");
    let index = 0;
    let timer;
    let startX = 0;
    let endX = 0;

    function showSlide(i) {
      slides.forEach((slide, idx) => {
        slide.style.opacity = "0";
        dots[idx].classList.remove("bg-white");
        dots[idx].classList.add("bg-white/50");
      });
      slides[i].style.opacity = "1";
      dots[i].classList.add("bg-white");
      dots[i].classList.remove("bg-white/50");
    }

    function nextSlide() {
      index = (index + 1) % slides.length;
      showSlide(index);
      resetTimer();
    }

    function prevSlide() {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
      resetTimer();
    }

    function autoPlay() {
      let interval = 7000;
      timer = setTimeout(() => {
        nextSlide();
        autoPlay();
      }, interval);
    }

    function resetTimer() {
      clearTimeout(timer);
      autoPlay();
    }

    // Swipe support for mobile
    slideshow.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });

    slideshow.addEventListener("touchend", e => {
      endX = e.changedTouches[0].clientX;
      let diff = startX - endX;
      if (diff > 50) {       // swipe left → next
        nextSlide();
      } else if (diff < -50) { // swipe right → prev
        prevSlide();
      }
    });

    // Button + dot events
    document.getElementById("next").addEventListener("click", nextSlide);
    document.getElementById("prev").addEventListener("click", prevSlide);

    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        index = idx;
        showSlide(index);
        resetTimer();
      });
    });

    // Init
    showSlide(index);
    autoPlay();
