<script setup="">
import {ref, watch, onMounted, onUnmounted} from 'vue'
import {useDisplay} from 'vuetify'
import {YoutubeIframe} from '@vue-youtube/component';
import 'animate.css';

import mainImage from '../assets/photo/backgroundPhotoInCarousel1.png'
import secondaryImage1 from '../assets/photo/backgroundPhotoInCarousel2.png'
import secondaryImage2 from '../assets/photo/backgroundPhotoInCarousel3.png'

const slides = ref([
  {
    title: 'KEEP SAFE',
    src: mainImage
  },
  {
    title: 'HUMAN LIFE IS PRICELESS',
    src: secondaryImage1
  },
  {
    title: 'TRUST THE PROFESSEIONALS',
    src: secondaryImage2
  }
])
const currentIndex = ref(0)

const printedText = ref('');

let typingSpeed = 70; // Скорость печатания (миллисекунды)

const typeText = (text) => {
  let i = 0;
  const intervalId = setInterval(() => {
    if (i <= text.length) {
      printedText.value = text.substring(0, i);
      i++;
    } else {
      clearInterval(intervalId);
    }
  }, typingSpeed);
}

onMounted(() => {
  typeText(slides.value[currentIndex.value].title);
  const intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slides.value.length;
    printedText.value = '';
    typeText(slides.value[currentIndex.value].title);
  }, 5000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
});


const {name} = useDisplay()
const widthValueYouTube = () => {
  if (name.value === 'xs') {
    return '100%'
  } else if (name.value === 'sm') {
    return '100%'
  } else if (name.value === 'md') {
    return '100%'
  } else if (name.value === 'lg') {
    return '70%'
  } else if (name.value === 'xl') {
    return '80%'
  } else if (name.value === 'xxl') {
    return '80%'
  }
}
const heightValueYouTube = () => {
  if (name.value === 'xs') {
    return '400'
  } else if (name.value === 'sm') {
    return null
  } else if (name.value === 'md') {
    return null
  } else if (name.value === 'lg') {
    return '350'
  } else if (name.value === 'xl') {
    return null
  } else if (name.value === 'xxl') {
    return null
  }
}
const visibleCarousel = () => {
  if (name.value === 'xs') {
    return false
  } else if (name.value === 'sm') {
    return false
  } else if (name.value === 'md') {
    return true
  } else if (name.value === 'lg') {
    return true
  } else if (name.value === 'xl') {
    return true
  } else if (name.value === 'xxl') {
    return true
  }
}
console.log(name.value);

const content = ref([
  {
    icon: 'globe-outline',
    title: 'LLC "REITOR LTD"'
  },
  {
    icon: 'navigate-outline',
    title: 'st. Zverinetskaya 63, Kyiv, 01014, Ukraine',
  },
  {
    icon: 'call-outline',
    title: '+(380) 95 588 9773',
  },
  {
    icon: 'at-circle-outline',
    title: 'reitorltd@gmail.com',
  }
])

// Carousel


// const images = ref([mainImage, secondaryImage1, secondaryImage2])

const h1Visible = ref(false);

const checkVisibility = () => {
  const h1 = document.querySelector('.v-carousel-item-title.active');
  if (h1) {
    const rect = h1.getBoundingClientRect();
    h1Visible.value = rect.top < window.innerHeight && rect.bottom >= 0;
  } else {
    h1Visible.value = false;
  }
};

watch(currentIndex, () => {
  checkVisibility();
});

// carousel


</script>

<template>
  <div class="wrap_content">
    <div class="content_carousel" v-if="visibleCarousel()">

      <div class="carousel" v-for="(slide, index) in slides" :key="index">
        <img alt="" :src="slide.src" :class="{ active: index === currentIndex }" class="image"/>
        <div class="carouselH1Div">
          <h1 class="v-carousel-item-title" :class="{ active: index === currentIndex }">
            <span class="v-carousel-item-title-span">{{ printedText }}</span><span class="cursor">|</span>
          </h1>
        </div>
      </div>


    </div>

    <div class="content_introduction_wrap">
      <div class="content_introduction">
        <div class="introduction_youtube">
          <h1 class="introduction_youtube_title">INTRODUCTION</h1>
          <youtube-iframe :width="widthValueYouTube()" :height="heightValueYouTube()" video-id="PllzEKkfw5I"/>
        </div>
      </div>
      <!--      <div class="content_about_us_main">-->
      <!--        <h1 class="block_main_title">ABOUT US</h1>-->
      <!--        <div class="content_about_us">-->
      <!--          <div class="block_img">-->
      <!--            &lt;!&ndash;         карта Киева&ndash;&gt;-->
      <!--            <div class="map">-->
      <!--              <img class="img_map" src="../assets/photo/mapEN.jpeg" alt="">-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="about_us_block_main">-->
      <!--            <div class="about_us_block" v-for="i in content">-->
      <!--              <div class="block_icon">-->
      <!--                <ion-icon :name="i.icon"></ion-icon>-->
      <!--              </div>-->
      <!--              <div class="block_content">-->
      <!--                <h1 class="content_title">{{ i.title }}</h1>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>


  </div>
</template>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

@media screen and (max-width: 376px) {

  .wrap_content {
    min-height: 100vh;
    margin-bottom: 5vh;
    background-color: #ffffff;
  }

  // Carousel

  .content_carousel {
    width: 100%;
    height: 100vh;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
    background-color: $text;
  }


  // YouTube

  .content_introduction {
    width: 100%;
    min-height: 100vh;
    margin-top: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
    //background-color: $surface;
  }

  .introduction_youtube {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .introduction_youtube_title {
    margin-bottom: 10vh;
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 7px;
    color: $primaryText;
  }

  // Content About Us

  .content_about_us_main {
    width: 100%;
    min-height: 20vh;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
  }


  .block_main_title {
    width: 100%;
    margin-top: 10vh;
    margin-bottom: 10vh;
    text-align: center;
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 7px;
    color: $primaryText;

  }

  .content_about_us {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  // Photo

  .block_img {
    width: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
    //transform: translateY(50%, -50%);
  }


  .map {
    z-index: 2;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
  }

  .img_map {
    height: 100%;
  }

  .leaflet-control-container {
    background-color: #333;
    color: #fff;
  }

  // About Us Main

  .about_us_block_main {
    width: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .about_us_block {
    width: 90%;
    min-height: 80px;
    display: flex;
    align-items: center;
    margin-top: 1%;
    margin-bottom: 1%;
    //background-color: $textSpan;
    //background-color: $background;
    background-color: #b8b8b8;
  }

  .block_icon {
    width: 100px;
    height: 100%;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ion-icon {
    font-size: 1rem;
    padding: 5px;
    color: $primary;
  }

  .block_content {
    width: 450px;
    padding: 5px;
  }

  .content_title {
    font-size: 0.6rem;
    line-height: 1.5;
    font-weight: 500;
    font-family: "Segoe UI", sans-serif;
    color: #ffffff;
  }

  //

  .carousel-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }


  .v-carousel-item-title {
    position: absolute;
    top: 30%;
    left: 10%;
    font-size: 1.5rem;
    font-weight: 600;
    z-index: 0;
    transition: opacity 1s;
    color: #ffffff;
  }


  .carousel {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    overflow: hidden;
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 1s;
    z-index: 0;
  }

  .active {
    z-index: 1;
    opacity: 1;
  }

  .image:not(.active) {
    opacity: 0;
  }


  .v-carousel-item-title:not(.active) {
    opacity: 0;
  }

  // asdsa

  .cursor {
    animation: blink-caret 0.75s step-end infinite;
  }

  .v-carousel-item-title-span {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 5px;
    z-index: 0;
    transition: opacity 1s;
    color: #ffffff;
  }

  @keyframes blink-caret {
    from, to {
      border-color: transparent;
    }
    50% {
      border-color: orange;
    }
  }
}

@media screen and (min-width: 376px) and (max-width: 600px) {

  .wrap_content {
    min-height: 100vh;
    margin-bottom: 5vh;
    background-color: #ffffff;
  }

  // Carousel

  .content_carousel {
    width: 100%;
    height: 100vh;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
    background-color: $text;
    overflow: hidden;
  }


  // YouTube

  .content_introduction {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
    //background-color: $surface;
  }

  .introduction_youtube {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .introduction_youtube_title {
    margin-bottom: 10vh;
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 7px;
    color: $primaryText;
  }

  // Content About Us

  .content_about_us_main {
    width: 100%;
    min-height: 20vh;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
  }


  .block_main_title {
    width: 100%;
    margin-top: 10vh;
    margin-bottom: 10vh;
    text-align: center;
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 7px;
    color: $primaryText;

  }

  .content_about_us {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  // Photo

  .block_img {
    width: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
    //transform: translateY(50%, -50%);
  }


  .map {
    z-index: 2;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
  }

  .img_map {
    height: 100%;
  }

  .leaflet-control-container {
    background-color: #333;
    color: #fff;
  }

  // About Us Main

  .about_us_block_main {
    width: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .about_us_block {
    width: 90%;
    min-height: 80px;
    display: flex;
    align-items: center;
    margin-top: 1%;
    margin-bottom: 1%;
    //background-color: $textSpan;
    //background-color: $background;
    background-color: #b8b8b8;
  }

  .block_icon {
    width: 100px;
    height: 100%;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ion-icon {
    font-size: 1rem;
    padding: 5px;
    color: $primary;
  }

  .block_content {
    width: 450px;
    padding: 5px;
  }

  .content_title {
    font-size: 0.7rem;
    line-height: 1.5;
    font-weight: 500;
    font-family: "Segoe UI", sans-serif;
    color: #ffffff;
  }

  //

  .carousel-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }


  .v-carousel-item-title {
    position: absolute;
    top: 30%;
    left: 10%;
    font-size: 1.5rem;
    font-weight: 600;
    z-index: 0;
    transition: opacity 1s;
    color: #ffffff;
  }


  .carousel {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    overflow: hidden;
  }

  .image {
    //position: absolute;
    //top: 0;
    //left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 1s;
    z-index: 0;
  }

  .active {
    z-index: 1;
    opacity: 1;
    overflow: hidden;
  }

  .image:not(.active) {
    opacity: 0;
  }


  .v-carousel-item-title:not(.active) {
    opacity: 0;
  }

  // asdsa

  .cursor {
    animation: blink-caret 0.75s step-end infinite;
  }

  .v-carousel-item-title-span {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 5px;
    z-index: 0;
    transition: opacity 1s;
    color: #ffffff;
  }

  @keyframes blink-caret {
    from, to {
      border-color: transparent;
    }
    50% {
      border-color: orange;
    }
  }
}

@media screen and (min-width: 600px) and (max-width: 960px) {

  .wrap_content {
    min-height: 100vh;
    margin-bottom: 5vh;
    background-color: #ffffff;
  }

  // Carousel

  .content_carousel {
    width: 100%;
    height: 100vh;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
    background-color: $text;
  }


  // YouTube

  .content_introduction {
    width: 100%;
    min-height: 100vh;
    margin-top: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
    //background-color: $surface;
  }

  .introduction_youtube {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .introduction_youtube_title {
    margin-bottom: 10vh;
    font-size: 3.5rem;
    font-weight: 500;
    letter-spacing: 7px;
    color: $primaryText;
  }

  // Content About Us

  .content_about_us_main {
    width: 100%;
    min-height: 40vh;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
  }


  .block_main_title {
    width: 100%;
    margin-top: 10vh;
    margin-bottom: 10vh;
    text-align: center;
    font-size: 3.5rem;
    font-weight: 500;
    letter-spacing: 7px;
    color: $primaryText;

  }

  .content_about_us {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  // Photo

  .block_img {
    width: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
    //transform: translateY(50%, -50%);
  }


  .map {
    z-index: 2;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
  }

  .img_map {
    height: 100%;
  }

  .leaflet-control-container {
    background-color: #333;
    color: #fff;
  }

  // About Us Main

  .about_us_block_main {
    width: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .about_us_block {
    width: 90%;
    min-height: 80px;
    display: flex;
    align-items: center;
    margin-top: 1%;
    margin-bottom: 1%;
    //background-color: $textSpan;
    //background-color: $background;
    background-color: #b8b8b8;
  }

  .block_icon {
    width: 100px;
    height: 100%;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ion-icon {
    font-size: 1.5rem;
    padding: 15px;
    color: $primary;
  }

  .block_content {
    width: 450px;
    padding: 10px;
  }

  .content_title {
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 500;
    font-family: "Segoe UI", sans-serif;
    color: #ffffff;
  }

  //

  .carousel-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }


  .v-carousel-item-title {
    position: absolute;
    top: 25%;
    left: 10%;
    font-size: 1.5rem;
    font-weight: 600;
    z-index: 0;
    transition: opacity 1s;
    color: #ffffff;
  }


  .carousel {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    overflow: hidden;

  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transition: opacity 1s;
    z-index: 0;
  }

  .active {
    z-index: 1;
    opacity: 1;
  }

  .image:not(.active) {
    opacity: 0;
  }


  .v-carousel-item-title:not(.active) {
    opacity: 0;
  }

  // asdsa

  .cursor {
    animation: blink-caret 0.75s step-end infinite;
  }

  .v-carousel-item-title-span {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 5px;
    z-index: 0;
    transition: opacity 1s;
    color: #ffffff;
  }

  @keyframes blink-caret {
    from, to {
      border-color: transparent;
    }
    50% {
      border-color: orange;
    }
  }
}

@media screen and (min-width: 960px) and (max-width: 1280px) {

  .wrap_content {
    min-height: 100vh;
    margin-bottom: 5vh;
    background-color: #ffffff;
  }

  // Carousel

  .content_carousel {
    width: 100%;
    height: 100vh;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
    background-color: $text;
  }


  // YouTube

  .content_introduction {
    width: 100%;
    min-height: 100vh;
    margin-top: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
    //background-color: $surface;
  }

  .introduction_youtube {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .introduction_youtube_title {
    margin-bottom: 10vh;
    font-size: 3.5rem;
    font-weight: 500;
    letter-spacing: 7px;
    color: $primaryText;
  }

  // Content About Us

  .content_about_us_main {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
  }


  .block_main_title {
    width: 100%;
    margin-top: 10vh;
    text-align: center;
    font-size: 3.5rem;
    font-weight: 500;
    letter-spacing: 7px;
    color: $primaryText;

  }

  .content_about_us {
    width: 100%;
    height: 100%;
    margin-top: 10vh;
    display: flex;
    justify-content: center;
  }

  // Photo

  .block_img {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    //transform: translateY(50%, -50%);
  }


  .map {
    z-index: 2;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
  }

  .img_map {
    height: 100%;
  }

  .leaflet-control-container {
    background-color: #333;
    color: #fff;
  }

  // About Us Main

  .about_us_block_main {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .about_us_block {
    width: 90%;
    min-height: 100px;
    display: flex;
    align-items: center;
    margin-top: 2%;
    margin-bottom: 2%;
    //background-color: $textSpan;
    //background-color: $background;
    background-color: #b8b8b8;
  }

  .block_icon {
    width: 100px;
    height: 100%;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ion-icon {
    font-size: 1.5rem;
    padding: 15px;
    color: $primary;
  }

  .block_content {
    width: 450px;
    padding: 10px;
  }

  .content_title {
    font-size: 1.2rem;
    line-height: 1.5;
    font-weight: 500;
    font-family: "Segoe UI", sans-serif;
    color: #ffffff;
  }

  //

  .carousel-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .carouselH1Div {
    width: 100%;
    height: 100%;
  }

  .v-carousel-item-title {
    position: absolute;
    top: 25%;
    left: 7%;
    font-size: 3rem;
    font-weight: 600;
    z-index: 0;
    transition: opacity 1s;
    color: #ffffff;
  }


  .carousel {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transition: opacity 1s;
    z-index: 0;
  }

  .active {
    z-index: 1;
    opacity: 1;
  }

  .image:not(.active) {
    opacity: 0;
  }


  .v-carousel-item-title:not(.active) {
    opacity: 0;
  }

  // asdsa

  .cursor {
    animation: blink-caret 0.75s step-end infinite;
  }

  .v-carousel-item-title-span {
    font-size: 3rem;
    font-weight: 600;
    letter-spacing: 5px;
    z-index: 0;
    transition: opacity 1s;
    color: #ffffff;
  }

  @keyframes blink-caret {
    from, to {
      border-color: transparent;
    }
    50% {
      border-color: orange;
    }
  }
}

@media screen and (min-width: 1280px) and (max-width: 1920px) {

  .wrap_content {
    min-height: 100vh;
    margin-bottom: 5vh;
    background-color: #ffffff;
  }

  // Carousel

  .content_carousel {
    width: 100%;
    height: 100vh;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
    //background-color: $text;
  }

  // YouTube

  .content_introduction {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
    //background-color: $surface;
  }

  .introduction_youtube {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .introduction_youtube_title {
    margin-top: 7vh;
    margin-bottom: 7vh;
    font-size: 2.5rem;
    font-weight: 500;
    letter-spacing: 7px;
    color: $primaryText;
  }

  // Content About Us

  .content_about_us_main {
    width: 100%;
    min-height: 50vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 10vh;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
  }


  .block_main_title {
    width: 100%;
    margin-top: 7vh;
    margin-bottom: 7vh;
    text-align: center;
    font-size: 2.5rem;
    font-weight: 500;
    letter-spacing: 7px;
    color: $primaryText;

  }

  .content_about_us {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  // Photo

  .block_img {
    width: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
    //transform: translateY(50%, -50%);
  }


  .map {
    z-index: 2;
    height: 500px;

    background-color: #ffffff;
  }

  .img_map {
    height: 100%;
  }

  .leaflet-control-container {
    background-color: #333;
    color: #fff;
  }

  // About Us Main

  .about_us_block_main {
    width: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .about_us_block {
    width: 90%;
    min-height: 100px;
    display: flex;
    align-items: center;
    margin-top: 1%;
    margin-bottom: 1%;
    //background-color: $textSpan;
    //background-color: $background;
    background-color: #b8b8b8;
  }

  .block_icon {
    width: 110px;
    height: 100%;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ion-icon {
    font-size: 2.5rem;
    padding: 15px;
    color: $primary;
  }

  .block_content {
    width: 450px;
    padding: 10px;
  }

  .content_title {
    font-size: 1.3rem;
    line-height: 1.5;
    font-weight: 500;
    font-family: "Segoe UI", sans-serif;
    color: #ffffff;
  }

  //

  .carousel-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .carouselH1Div {
    width: 100%;
    height: 100%;
  }

  .v-carousel-item-title {
    position: absolute;
    top: 25%;
    left: 10%;
    font-size: 2.5rem;
    font-weight: 600;
    z-index: 0;
    transition: opacity 1s;
    color: #ffffff;
  }


  .carousel {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transition: opacity 1s;
    z-index: 0;
  }

  .active {
    z-index: 1;
    opacity: 1;
  }

  .image:not(.active) {
    opacity: 0;
  }


  .v-carousel-item-title:not(.active) {
    opacity: 0;
  }

  // asdsa

  .cursor {
    animation: blink-caret 0.75s step-end infinite;
  }

  .v-carousel-item-title-span {
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: 4px;
    z-index: 0;
    transition: opacity 1s;
    color: #ffffff;
  }

  @keyframes blink-caret {
    from, to {
      border-color: transparent;
    }
    50% {
      border-color: orange;
    }
  }
}

@media screen and (min-width: 1920px) and (max-width: 2560px) {

  .wrap_content {
    min-height: 100vh;
    margin-bottom: 5vh;
    background-color: #ffffff;
  }

  // Carousel

  .content_carousel {
    width: 100%;
    height: 100vh;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
    background-color: $text;
  }


  // YouTube

  .content_introduction_wrap {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content_introduction {
    width: 1920px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
    //background-color: $surface;
  }

  .introduction_youtube {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .introduction_youtube_title {
    position: absolute;
    left: -10vw;
    transform: rotate(-90deg);
    font-size: 4rem;
    font-weight: 500;
    letter-spacing: 7px;
    color: $primaryText;
  }

  // Content About Us

  .content_about_us_main {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
  }


  .block_main_title {
    width: 100%;
    text-align: center;
    font-size: 4rem;
    font-weight: 500;
    letter-spacing: 7px;
    color: $primaryText;

  }

  .content_about_us {
    width: 100%;
    height: 100%;
    margin-top: 10vh;
    display: flex;
    justify-content: center;
  }

  // Photo

  .block_img {
    width: 50%;
    transform: translateY(50%, -50%);
  }


  .map {
    z-index: 2;
    height: 800px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
  }

  .img_map {
    height: 100%;
  }

  .leaflet-control-container {
    background-color: #333;
    color: #fff;
  }

  // About Us Main

  .about_us_block_main {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .about_us_block {
    width: 70%;
    min-height: 140px;
    display: flex;
    align-items: center;
    margin-bottom: 5%;
    //background-color: $textSpan;
    //background-color: $background;
    background-color: #b8b8b8;
  }

  .block_icon {
    width: 110px;
    height: 100%;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ion-icon {
    font-size: 4rem;
    padding: 15px;
    color: $primary;
  }

  .block_content {
    width: 450px;
    padding: 10px;
  }

  .content_title {
    font-size: 1.8rem;
    line-height: 1.5;
    font-weight: 500;
    font-family: "Segoe UI", sans-serif;
    color: #ffffff;
  }

  //

  .carousel-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .carouselH1Div {
    width: 1920px;
    height: 100%;
  }


  .v-carousel-item-title {
    position: absolute;
    top: 20%;
    left: 10%;
    font-size: 4rem;
    font-weight: 600;
    z-index: 0;
    transition: opacity 1s;
    color: #ffffff;
  }


  .carousel {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transition: opacity 1s;
    z-index: 0;
  }

  .active {
    z-index: 1;
    opacity: 1;
  }

  .image:not(.active) {
    opacity: 0;
  }


  .v-carousel-item-title:not(.active) {
    opacity: 0;
  }

  // asdsa

  .cursor {
    animation: blink-caret 0.75s step-end infinite;
  }

  .v-carousel-item-title-span {
    font-size: 4rem;
    font-weight: 600;
    letter-spacing: 4px;
    z-index: 0;
    transition: opacity 1s;
    color: #ffffff;
  }

  @keyframes blink-caret {
    from, to {
      border-color: transparent;
    }
    50% {
      border-color: orange;
    }
  }
}

@media screen and (min-width: 2560px) {

  .wrap_content {
    min-height: 100vh;
    margin-bottom: 5vh;
    background-color: #ffffff;
  }

  // Carousel

  .content_carousel {
    width: 100%;
    height: 100vh;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
    background-color: $text;
  }


  // YouTube

  .content_introduction_wrap {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content_introduction {
    width: 1920px;
    display: flex;
    justify-content: center;
    align-items: center;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
    //background-color: $surface;
  }

  .introduction_youtube {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .introduction_youtube_title {
    position: absolute;
    left: -10vw;
    transform: rotate(-90deg);
    font-size: 4rem;
    font-weight: 500;
    letter-spacing: 7px;
    color: $primaryText;
  }

  // Content About Us

  .content_about_us_main {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    //background-image: url('../assets/photo/backgroundPhotoInHomePage.jpg');
    //background-size: cover;
  }


  .block_main_title {
    width: 100%;
    text-align: center;
    font-size: 4rem;
    font-weight: 500;
    letter-spacing: 7px;
    color: $primaryText;

  }

  .content_about_us {
    width: 100%;
    height: 100%;
    margin-top: 10vh;
    display: flex;
    justify-content: center;
  }

  // Photo

  .block_img {
    width: 55%;
    transform: translateY(50%, -50%);
  }


  .map {
    z-index: 2;
    height: 1200px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
  }

  .img_map {
    height: 100%;
  }

  .leaflet-control-container {
    background-color: #333;
    color: #fff;
  }

  // About Us Main

  .about_us_block_main {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .about_us_block {
    width: 70%;
    min-height: 160px;
    display: flex;
    align-items: center;
    margin-top: 3%;
    margin-bottom: 3%;
    //background-color: $textSpan;
    //background-color: $background;
    background-color: #b8b8b8;
  }

  .block_icon {
    width: 110px;
    height: 100%;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ion-icon {
    font-size: 4rem;
    padding: 15px;
    color: $primary;
  }

  .block_content {
    width: 450px;
    padding: 10px;
  }

  .content_title {
    font-size: 1.8rem;
    line-height: 1.5;
    font-weight: 500;
    font-family: "Segoe UI", sans-serif;
    color: #ffffff;
  }

  //

  .carousel-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .carouselH1Div {
    width: 1920px;
    height: 100%;
  }

  .v-carousel-item-title {
    position: absolute;
    top: 20%;
    left: 10%;
    font-size: 4rem;
    font-weight: 600;
    z-index: 0;
    transition: opacity 1s;
    color: #ffffff;
  }


  .carousel {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transition: opacity 1s;
    z-index: 0;
  }

  .active {
    z-index: 1;
    opacity: 1;
  }

  .image:not(.active) {
    opacity: 0;
  }


  .v-carousel-item-title:not(.active) {
    opacity: 0;
  }

  // asdsa

  .cursor {
    animation: blink-caret 0.75s step-end infinite;
  }

  .v-carousel-item-title-span {
    font-size: 4rem;
    font-weight: 600;
    letter-spacing: 4px;
    z-index: 0;
    transition: opacity 1s;
    color: #ffffff;
  }

  @keyframes blink-caret {
    from, to {
      border-color: transparent;
    }
    50% {
      border-color: orange;
    }
  }
}

</style>
