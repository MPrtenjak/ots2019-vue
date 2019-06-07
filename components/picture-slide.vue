<template>
  <div class="row">
    <img v-if="slide.id === 'ages'" class="mp-image" src="~/assets/img/ages.png">
    <img v-if="slide.id === 'crisis'" class="mp-image" src="~/assets/img/crisis.png">
  </div>
</template>

<script>
import StoreMixin from '~/mixins/store'

export default {
  name: 'PictureSlide',

  mixins: [ StoreMixin ],
}
</script>
