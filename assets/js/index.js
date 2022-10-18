import SwipeCarousel from "./carousel-swipe.js";
const carousel = new SwipeCarousel({
  containerID: '#carousel',
  slideID: '.slide',
  // interval: 5000,
  isPlaying: true
})
  
carousel.init();