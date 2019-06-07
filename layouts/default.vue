<template>
  <section class="container">
    <div :style="{ 'font-size': fontSize + '%' }" class="mp-example">
      <button type="button" class="btn btn-primary float-right" @click="doClose">Close</button>
      <nuxt/>
    </div>
  </section>
</template>

<script>
import StoreMixin from '~/mixins/store'

export default {
  mixins: [ StoreMixin ],

  created () {
    if (process.client) {
      window.addEventListener('keydown', this.onkeydown);
    }
  },

  destroyed() {
    if (process.client) {
      window.removeEventListener('keydown', this.onkeydown);
    }
  },

  methods: {
    doClose() {
      window.close()
    },

    onkeydown(event) {
      if ((event.key == "Escape") || (event.code == "KeyC")) {
        window.close()
      }
    }
  },
}
</script>
