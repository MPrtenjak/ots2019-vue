<template>
  <div>
    <div class="sticky-top">
      <div class="row mp-navigation">
        <div class="col-6">
          <form class="form-inline" action="javascript:void(0);">
            <button type="button" class="btn btn-secondary" @click="moveCurrentSlideByID(-1)"><i class="fas fa-angle-double-left" /></button>
            <input :max="numOfSlides - 1" v-model="currentSlide" type="range" class="form-control" min="0">{{ currentSlide + 1 }} / {{ numOfSlides }}
            <button type="button" class="btn btn-secondary" @click="moveCurrentSlideByID(1)"><i class="fas fa-angle-double-right" /></button>
            <button type="button" class="btn btn-secondary" @click="changeTheme"><i class="fas fa-adjust" /></button>
          </form>
        </div>

        <div class="col-4">
          <form v-if="isDemo" class="form-inline" action="javascript:void(0);">
            <input v-model="fontSize" type="range" class="form-control" min="100" max="250">
            <span>{{ fontSize }}%</span>
          </form>
        </div>

        <div :style="{ 'color': timeToEndColor }" class="col-2 mp-time-to-end">
          <span v-if="showCoutdownTimer" class="float-right"><i class="far fa-clock" /> {{ timeToEnd }}</span>
        </div>
      </div>

      <div v-if="isDemo" class="row">
        <div :style="{ 'font-size': fontSize + '%' }" class="col">
          <div class="mp-code-header">
            <div class="mp-code-desc">
              {{ codeData.codeDescription }}
              <nuxt-link v-if="codeData.whenRunJumpToPage" :to="codeData.whenRunJumpToPage" target="_blank" class="btn-run btn btn-success mp-code-run">Izvedi</nuxt-link>

              <span v-show="codeData.nextCodeDescription" class="mp-next-code-desc float-right" v-html="codeData.nextCodeDescription" />
            </div>

            <div v-show="codeData.slideText" class="mp-demo-slide-info">
              <div v-for="(text, tidx) in codeData.slideText" :key="'slide-text-' + tidx" v-html="'* ' + text" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <template>
      <picture-slide v-if="isPictureSlide" />
      <text-slide v-if="isTextSlide" />
      <demo v-if="isDemo" @codeData="onCodeData" />
    </template>
  </div>
</template>

<script>
import moment from 'moment'

import PictureSlide from '@/components/picture-slide'
import TextSlide from '@/components/text-slide'
import Demo from '@/components/demo'

import StoreMixin from '~/mixins/store'
import CountDown from '@/components/CountDown'

export default {
  components: { PictureSlide, TextSlide, Demo },

  mixins: [ StoreMixin ],

  layout: 'index',

  head() {
    return {
      link: [
        { rel: "stylesheet", href: `css/web/${this.theme}/bootstrap.min.css` },
        { rel: "stylesheet", href: `css/web/${this.theme}/hljs.css` },
        { rel: "stylesheet", href: `css/${this.theme}.css` },
      ]
    };
  },

  data() {
    return {
      countDown: new CountDown(),
      timeToEnd: null,
      codeData: {},
      timeToEndColor: 'green',
    }
  },

  computed: {
    isPictureSlide() { return this.slide.pageType === 'pictureSlide' },
    isTextSlide() { return this.slide.pageType === 'textSlide' },
    isDemo() { return this.slide.pageType === 'demoSlide' },
  },

  created() {
    this.calculateTimeToEnd()
    this.initializeSlides()
  },

  mounted() {
    let self = this
    setInterval(() => {
      self.calculateTimeToEnd()
    }, 1000)
  },

  methods: {
    changeTheme() {
      this.theme = 'new';
    },
    calculateTimeToEnd() {
      let calculatedResult = this.countDown.calculate()
      this.timeToEnd = calculatedResult.formatedTimeLeftInSec

      // hsl(120, 100%, 50%)  -> hsl(0, 100%, 50%) ==> h = 120 -> 0
      let h = calculatedResult.limeLeftInProc * 1.2
      this.timeToEndColor = `hsl(${h}, 100%, 50%)`
    },
    onCodeData(value) {
      this.codeData = value
    }
  },
}
</script>
