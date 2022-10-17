function Carousel (containerID = '#carousel', slideID = '.slide', interval = 2000) {
  this.container = document.querySelector('#carousel');
  this.slides = this.container.querySelectorAll('.slide');
  this.interval = interval;
}

Carousel.prototype = {
  _initProps() {
    this.SLIDES_COUNT = this.slides.length; 
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';

    this.isPlaying = true;
    this.currentSlide = 0;
  },

  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = '<span class="control" id="pause"><i class="fa-regular fa-circle-pause"></i></span>';
    const PREV = '<span class="control" id="prev"><i class="fa-solid fa-angle-left"></i></span>';
    const NEXT = '<span class="control" id="next"><i class="fa-solid fa-angle-right"></i></span>';
    controls.setAttribute('class','controls');
    this.container.append(controls);
    controls.innerHTML = PREV + PAUSE + NEXT;
    this.prevBtn = this.container.querySelector('#prev');
    this.pauseBtn = this.container.querySelector('#pause');
    this.nextBtn = this.container.querySelector('#next');
  },

  _initIndicators() {
    const indicators = document.createElement('div');
    indicators.setAttribute('class','indicators');

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indItem = document.createElement('div');
      indItem.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active');
      indItem.dataset.slideTo = `${i}`;
      indicators.append(indItem);    
    }
    this.container.append(indicators);

    this.indContainer = this.container.querySelector('.indicators');
    this.indicators = this.indContainer.querySelectorAll('.indicator');
   },

  _gotoNth(n){
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
    this._tick();
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
    this.indContainer.addEventListener('click', this._indicate.bind(this));
  },

  _tick() {
    this.timerID = setInterval(this._gotoNext.bind(this), this.interval);
  },

  pausePlay() {
    if (this.isPlaying) this._pause();
    else this._play();
  },

  init() {
    this._initProps();
    this._initIndicators();
    this._initControls();
    this._initListeners();
    this._tick();
  }
};

Carousel.prototype.constructor = Carousel;
