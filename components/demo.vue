<template>
  <div class="row">
    <div :style="{ 'font-size': fontSize + '%' }" class="col mp-content">
      <pre class="hljs mp-code" v-html="content" />
    </div>
  </div>
</template>

<script>
import _ from 'underscore'
import {} from '~/assets/js/highlight.pack.js'

import StoreMixin from '~/mixins/store'

export default {
  name: 'Demo',

  mixins: [ StoreMixin ],

  data: function() {
    return {
      content: null,
      currentFolder: null,
      currentPageIndex: null,
      whenRunJumpToPage: null,
    }
  },

  computed: {
    codeDescription() {
      return (this.currentPageIndex !== null) ? this.pages[this.currentPageIndex].description : null
    },
    nextCodeDescription () {
      return (this.currentPageIndex !== null) && (this.currentPageIndex < this.pages.length - 1) ? this.pages[this.currentPageIndex + 1].description : null
    },
    fileCaption() {
      return (this.currentPageIndex !== null) ? this.pages[this.currentPageIndex].caption : null
    },
    slideText() {
      return (this.currentPageIndex !== null) ? this.pages[this.currentPageIndex].slideText : null
    }
  },

  watch: {
    currentSlide () {
      this.openFileAndEmitEvent(this.getPage2DemoPage(this.currentSlide))
    }
  },

  mounted () {
    this.openFileAndEmitEvent(this.getPage2DemoPage(this.currentSlide))
  },

  created() {
    this.$nuxt.$on('ACT_RUN', () => {
      const link = document.getElementsByClassName("btn-run")
      if ((!link) || (!link.length) || (link.length == 0)) return

      link[0].click()
    });
  },

  beforeDestroy() {
    this.$nuxt.$off('ACT_RUN');
  },

  methods: {
    openFileAndEmitEvent(index) {
      this.openFile(index)

      let codeData = {
        codeDescription : this.codeDescription,
        whenRunJumpToPage: this.whenRunJumpToPage,
        nextCodeDescription: this.nextCodeDescription,
        slideText: this.slideText,
      }
      this.$emit('codeData', codeData)
    },
    openFile(index) {
      let getColoredSubstring = (sourceString, language) => {
        if (!sourceString) return null
        return hljs.highlight(language, sourceString).value
      }

      if ((index < 0) || (index >= this.pages.length)) return

      this.currentSlide = this.getDemoPage2Page(index)

      const pageInfo = this.pages[index]
      this.currentPageIndex = index
      this.currentFolder = pageInfo.folderSort
      this.whenRunJumpToPage = pageInfo.link

      const html = getColoredSubstring(pageInfo.html, 'html')
      const js = getColoredSubstring(pageInfo.js, 'js')

      if (pageInfo.ext == 'vue') {
        this.content = '&lt;template&gt;' + html + '&lt;/template&gt;<br/><br/>&lt;script&gt;' + js + '&lt;/script&gt;'
      }else if (pageInfo.ext == 'html') {
        this.content = html
      } else {
        this.content = js
      }
    },
  },
}
</script>