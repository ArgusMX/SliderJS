function Carousel () {

  this.container = document.querySelector('#carousel');
  this.slides = this.container.querySelectorAll('.slide');
  this.indicatorsContainer = this.container.querySelector('#indicators-container');
  this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
  this.prevBtn = this.container.querySelector('#prev');
  this.pauseBtn = this.container.querySelector('#pause');
  this.nextBtn = this.container.querySelector('#next');
  
  this.SLIDES_COUNT = this.slides.length; 
  this.CODE_LEFT_ARROW = 'ArrowLeft';
  this.CODE_RIGHT_ARROW = 'ArrowRight';
  this.CODE_SPACE = 'Space';

  this.interval = 2000;
  this.isPlaying = true;
  this.currentSlide = 0;
}

Carousel.prototype = {
  pausePlay() {
    if (this.isPlaying) this._pause();
    else this._play();
  },

  init() {
    this.timerID = setInterval(this._gotoNext.bind(this), this.interval);
    this._initListeners();
  },

  _gotoNth(n){
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');

    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');

  },
  
  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  },
  
  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  },
  
  _pause() {
    this.isPlaying = false;
    clearInterval(this.timerID);
    this.pauseBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
  },
  
  _play() {
    this.timerID = setInterval(this._gotoNext.bind(this), this.interval);
    this.isPlaying = true;
    this.pauseBtn.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
  },
  
  _prev() {
    this._gotoPrev();
    this._pause();
  },
  
  _next() {
    this._gotoNext();
    this._pause();
  },
  
  _indicate(e) {
    let target = e.target;
    if (target && target.classList.contains('indicator')) {
      const dataSlide = +target.dataset.slideTo;
      if (isNaN(dataSlide)) return
      this._pause();
      this._gotoNth(dataSlide);
    }
  },
  
  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this._prev();
    if (e.code === this.CODE_RIGHT_ARROW) this._next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  },

  _initListeners() {
    document.addEventListener('keydown', this._pressKey.bind(this));
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.nextBtn.addEventListener('click', this._next.bind(this));
    this.prevBtn.addEventListener('click', this._prev.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
  }
};

Carousel.prototype.constructor = Carousel;

function SwipeCarousel() {
  Carousel.apply(this, arguments)
};

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype._swipeStart = function(e) {
  this.swipeStartX = e.changedTouches[0].pageX;
};

SwipeCarousel.prototype._swipeEnd = function(e){
  this.swipeEndX = e.changedTouches[0].pageX;
  if (this.swipeStartX - this.swipeEndX > 100) this._next();
  if (this.swipeStartX - this.swipeEndX < -100) this._prev(); 
};

SwipeCarousel.prototype._initListeners = function() {
  Carousel.prototype._initListeners.apply(this);
  this.container.addEventListener('touchstart', this._swipeStart.bind(this));
  this.container.addEventListener('touchend', this._swipeEnd.bind(this));
}

const carousel = new SwipeCarousel();
carousel.init();
