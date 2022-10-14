(function (time){

  const container = document.querySelector('#carousel');
  const slides = container.querySelectorAll('.slide');
  const indicatorsContainer = container.querySelector('#indicators-container');
  const indicators = indicatorsContainer.querySelectorAll('.indicator');
  const prevBtn = container.querySelector('#prev');
  const pauseBtn = container.querySelector('#pause');
  const nextBtn = container.querySelector('#next');
  
  const SLIDES_COUNT = slides.length; 
  const CODE_LEFT_ARROW = 'ArrowLeft';
  const CODE_RIGHT_ARROW = 'ArrowRight';
  const CODE_SPACE = 'Space';
  
  let isPlaying = true;
  let currentSlide = 0;
  let timerID = null;
  let swipeStartX = null;
  let swipeEndX = null;
  let interval = time;
  
  function gotoNth(n){
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  }
  
  function gotoPrev() {
    gotoNth(currentSlide - 1);
  }
  
  function gotoNext() {
    gotoNth(currentSlide + 1);
  }
  
  function pause() {
    isPlaying = false;
    clearInterval(timerID);
    pauseBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
  }
  
  function play() {
    isPlaying = true;
    timerID = setInterval(gotoNext, 2000);
    pauseBtn.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
  }
  
  function pausePlay() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }
  
  function prev() {
    gotoPrev();
    pause();
  }
  
  function next() {
    gotoNext();
    pause();
  }
  
  function indicate(e) {
    let target = e.target;
    if (target && target.classList.contains('indicator')) {
      const dataSlide = +target.dataset.slideTo;
      if (isNaN(dataSlide)) return
      pause();
      gotoNth(dataSlide);
    }
  }
  
  function pressKey(e) {
    if (e.code === CODE_LEFT_ARROW) prev();
    if (e.code === CODE_RIGHT_ARROW) next();
    if (e.code === CODE_SPACE) pausePlay();
  }
  
  function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
  }
  
  function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX > 100) next();
    if (swipeStartX - swipeEndX < -100) prev(); 
  }
  
  function initListeners() {
    pauseBtn.addEventListener('click', pausePlay);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    indicatorsContainer.addEventListener('click', indicate);
    document.addEventListener('keydown', pressKey);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
  }
  
  function init() {
    timerID = setInterval(gotoNext, interval);
    initListeners();
  }

  init();

}(2000));
