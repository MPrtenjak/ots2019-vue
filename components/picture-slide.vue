<template>
  <div>
    <br>

    <div v-if="caption" class="row">
      <div class="col">
        <h1 class="text-center">{{ caption }}</h1>
      </div>
    </div>

    <div v-if="text" class="row">
      <div class="col">
        <h2 class="text-center">{{ text }}</h2>
      </div>
    </div>

    <div class="row">
      <div class="col text-center">
        <img v-if="slide.id === 'ages'" class="mp-image" src="~/assets/img/ages.png">
        <img v-if="slide.id === 'crisis'" class="mp-image" src="~/assets/img/crisis.png">
        <img v-if="slide.id === 'horse1'" class="mp-image" src="~/assets/img/horse1.png">
        <img v-if="slide.id === 'horse2'" class="mp-image" src="~/assets/img/horse2.png">
        <img v-if="slide.id === 'horse3'" class="mp-image" src="~/assets/img/horse3.png">
        <img v-if="slide.id === 'horse4'" class="mp-image" src="~/assets/img/horse4.png">
      </div>
    </div>
  </div>
</template>

<script>
import StoreMixin from '~/mixins/store'

export default {
  name: 'PictureSlide',

  mixins: [ StoreMixin ],

  computed: {
    caption() {
      if (this.slide.id === 'horse1') return "Kako narisati konja"
      if (this.slide.id === 'horse2') return "Kako narisati konja II"
      if (this.slide.id === 'horse3') return "Kako narisati konja III"
      if (this.slide.id === 'horse4') return "Kako narisati konja IV"
      return undefined
    },
    text() {
      if (this.slide.id === 'horse1') return "Nariši dve elipsi"
      if (this.slide.id === 'horse2') return "Doriši vrat in noge"
      if (this.slide.id === 'horse3') return "Nariši ušesa, usta, oči in kopita "
      if (this.slide.id === 'horse4') return "Doriši podrobnosti in pobarvaj"
      return undefined
    },
  }
}
</script>
