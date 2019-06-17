<template>
  <section class="container-fluid">
    <nuxt/>
  </section>
</template>

<script>
import CountDown from '@/components/CountDown'

import StoreMixin from '~/mixins/store'

export default {
  mixins: [ StoreMixin ],

  data() {
    return {
      resetTimerStep: 0,
    }
  },

  created () {
    if (process.client) {
      window.addEventListener('keypress', this.onkeypress);
      window.addEventListener('keydown', this.onkeydown);
    }
  },

  destroyed() {
    if (process.client) {
      window.removeEventListener('keypress', this.onkeypress);
      window.removeEventListener('keydown', this.onkeydown);
    }
  },

  methods:  {
    onkeypress (event) {
      if (this.resetTimerStep === 1) {
        if (event.code === "KeyT") {
          CountDown.prototype.reset()
        }

        this.resetTimerStep = 0
      }

      if (event.code === "KeyC") { this.resetTimerStep = 1 }
      if (event.code === "KeyR") { this.$nuxt.$emit('ACT_RUN'); }
      if (event.code === "KeyS") { this.showCoutdownTimer = true }
      if (event.code === "KeyH") { this.showCoutdownTimer = false }
    },
    onkeydown (event) {
      if ((event.key == "Backspace") || (event.key == "P") || (event.key == "p") || (event.key == "ArrowLeft")) {
        event.preventDefault();
        this.moveCurrentSlideByID(-1)
      }

      if ((event.key == " ") || (event.key == "N") || (event.key == "n") || (event.key == "ArrowRight")) {
        event.preventDefault();
        this.moveCurrentSlideByID(1)
      }
    }
  }
}
</script>
