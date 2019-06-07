import pagesData from '~/assets/pages.json'
import _ from 'underscore'

export const state = () => ({
  theme: localStorage.getItem('theme') || 'dark',
  fontSize: localStorage.getItem('fontSize') || 100,
  slideID: 0,
  slides: null,
  showCoutdownTimer: false,
  pagesData,
})

export const getters = {
  getTheme(state) {
    return state.theme
  },
  getFontSize(state) {
    return state.fontSize
  },
  getSlideID(state) {
    return state.slideID
  },
  getShowCoutdownTimer(state) {
    return state.showCoutdownTimer
  },
  getSlide(state) {
    return state.slides[state.slideID]
  },
  getNumOfSlides(state) {
    return state.slides.length
  },
  getPages(state) {
    return state.pagesData.pages
  },
  getFolders(state) {
    return state.pagesData.folders
  },
  getPage2DemoPage(state) {
    return (pageID) => {
      return state.slides[pageID].id
    }
  },
  getDemoPage2Page(state) {
    return (demoPageID) => {
      return _.findIndex(state.slides, (element) => element.pageType === 'demoSlide' && element.id === demoPageID)
    }
  }
}

export const mutations = {
  initializeState(state) {
    let showCodeSlides = (fromSlide, numSlides) => {
      for(let slide = fromSlide; slide < fromSlide + numSlides; ++slide) {
        state.slides.push({ pageType: 'demoSlide', id: slide })
      }
    }

    if (state.slides) return;
    state.slides = []

    state.slides.push({ pageType: 'textSlide', id: 'intro-1' })
    state.slides.push({ pageType: 'textSlide', id: 'intro-2' })
    state.slides.push({ pageType: 'textSlide', id: 'intro-3' })
    state.slides.push({ pageType: 'textSlide', id: 'intro-caption' })
    /*
    state.slides.push({ pageType: 'pictureSlide', id: 'ages' })
    state.slides.push({ pageType: 'textSlide', id: 'ages' })
    state.slides.push({ pageType: 'textSlide', id: 'jobs' })
    state.slides.push({ pageType: 'pictureSlide', id: 'crisis' })
    state.slides.push({ pageType: 'textSlide', id: 'crisis' })
    state.slides.push({ pageType: 'textSlide', id: 'caption' })
    */
    state.slides.push({ pageType: 'textSlide', id: 'step1' })
    showCodeSlides(0, 2)
    state.slides.push({ pageType: 'textSlide', id: 'step2' })
    showCodeSlides(2, 3)
    state.slides.push({ pageType: 'textSlide', id: 'step3' })
    showCodeSlides(5, 6)
    state.slides.push({ pageType: 'textSlide', id: 'take-away-1' })
    state.slides.push({ pageType: 'textSlide', id: 'take-away-2' })

    state.slides.push({ pageType: 'textSlide', id: 'close' })
  },
  changeTheme(state) {
    state.theme = (state.theme === 'dark') ? 'light' : 'dark';
    localStorage.setItem('theme', state.theme)
  },
  setFontSize(state, newValue) {
    localStorage.setItem('fontSize', newValue)
    state.fontSize = newValue
  },
  setSlideID(state, newValue) {
    state.slideID = Number(newValue)
  },
  setShowCoutdownTimer(state, newValue) {
    state.showCoutdownTimer = newValue
  },
}

export const actions = {
  changeSlideBy({ commit, state }, changeBy) {
    const numOfSlides = state.slides.length
    let newSlideID = state.slideID + changeBy
    if (newSlideID > numOfSlides - 1) newSlideID = numOfSlides - 1
    if (newSlideID < 0) newSlideID = 0

    commit('setSlideID', newSlideID)
  },
}
