<template>
  <div class="row">
    <div :style="{ 'margin-top' : topMargin }"
         class="col mp-slide">
      <div class="mp-slide-body">
        <dl v-for="(def, didx) in currentArray" :key="didx">
          <h1 v-if="def.header" v-html="def.header" />
          <dt v-if="def.dt" v-html="dtx(def.dt)" />
          <dd v-if="def.dd" v-html="def.dd" />
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'
import StoreMixin from '~/mixins/store'

export default {
  name: 'Slide',

  mixins: [ StoreMixin ],

  data() {
    return {
      definitions: {
        'intro-1': [
          { header: 'Zakaj?', },
          { dt: `GOOGLE: "povprečna starost zaposlenih"
<ul>
<li>Delovno aktivne osebe: povprečna starost je 41,8 leta</li>
<li>Petina zaposlenih je starejših od 65 let</li>
<li>Povprečna starost zaposlenih se povečuje: Kako ta trend obrniti v prid...</li>
<li>...</li>
</ul>` },
        ],
        'intro-2': [
          { header: 'Zakaj?', },
          { dt: `GOOGLE: "povprečna starost zaposlenih"` },
          { dt: `GOOGLE: "ali se bliža naslednja kriza"
<ul>
<li>Naslednja finančna kriza bo še hujša od tiste pred desetletjem - Mladina</li>
<li>Nova kriza je za vogalom. Preverite, kako hudo bo - Cekin.si</li>
<li>Nova kriza naj bi nam že grozila - Cekin.si</li>
<li>Nova finančna kriza: nikoli več ali pa je že za vogalom – in kdo vse jo ...</li>
<li>Svet24.si - Pripravite se, prihaja nova finančna kriza!</li>
<li>...</li>
</ul>` }
        ],
        'intro-3': [
          { header: 'Zakaj?', },
          { dt: `GOOGLE: "povprečna starost zaposlenih"` },
          { dt: `GOOGLE: "ali se bliža naslednja kriza"` },
          { dt: `GOOGLE: "zaposlitveni oglasi - razvijalec"
<ul>
<li>JavaScript razvijalci (m/ž)</li>
<li>HTML/CSS razvijalci (m/ž)</li>
<li>Senior Frontend Engineer</li>
<li>Spletni razvijalec - programer</li>
<li>PHP razvijalci (m/ž)</li>
<li>WordPress razvijalci (m/ž)</li>
<li>...</li>
</ul>` },
        ],
        'intro-caption': [
          { header: 'Kaj?', },
          { dt: 'Kako razvijati v Vue/NUXT, če si navajen/a objektnih jezikov, kot so C++, C# ali Java?', }
        ],
        'ages': [
          { header: 'Google, 21.05.2019: "povprečna starost zaposlenih"', },
          { dt: 'Povprečna starost zaposlenih v podjetju Facebook je 26 let' },
          { dt: 'Delovno aktivne osebe: povprečna starost je 41,8 leta' },
          { dt: 'Petina zaposlenih je starejših od 65 let' },
          { dt: 'Povprečna starost zaposlenih se povečuje: Kako ta trend obrniti v prid...' },
          { dt: '...' },
        ],
        'jobs': [
          { header: 'Izbor najpogostejših zaposlitvenih oglasov v maju 2019', },
          { dt: {
              no_hand: true,
              text: '... <i>https://slo-tech.com/, https://mojedelo.com, https://www.racunalniske-novice.com/</i> ...'
            }
          },
          { dt: 'JavaScript razvijalci (m/ž)' },
          { dt: 'HTML/CSS razvijalci (m/ž)' },
          { dt: 'Senior Frontend Engineer' },
          { dt: 'Spletni razvijalec - programer' },
          { dt: 'PHP razvijalci (m/ž)' },
          { dt: 'WordPress razvijalci (m/ž)' },
          { dt: '...' },
        ],
        'crisis': [
          { header: 'Google, 21.05.2019: "ali se bliža naslednja kriza"', },
          { dt: 'Naslednja finančna kriza bo še hujša od tiste pred desetletjem - Mladina' },
          { dt: 'Nova kriza je za vogalom. Preverite, kako hudo bo - Cekin.si' },
          { dt: 'Nova kriza naj bi nam že grozila - Cekin.si' },
          { dt: 'Nova finančna kriza: nikoli več ali pa je že za vogalom – in kdo vse jo ...' },
          { dt: 'Svet24.si - Pripravite se, prihaja nova finančna kriza!' },
          { dt: '...' },
        ],
        'caption': {
          center: true,
          list : [
            { header: '<center>Kako razvijati v Vue/NUXT, če si navajen/a objektnih jezikov, kot so C++, C# ali Java?</center>', }
          ]
        },
        'step1': [
          { header: 'Korak 1: HTML in CSS"', },
          { dt: 'Dokaj preprosto' },
          { dt: 'Hitro se naučimo' },
          { dt: 'Razvijalci nismo grafični oblikovalci <i class="fas fa-equals" /><i class="fas fa-chevron-right" /> CSS knjžnice' },
        ],
        'step2': [
          { header: 'Korak 2: JavaScript"', },
          { dt: 'Ime podobno Javi' },
          { dt: 'Sintaksa podobna Javi/C++' },
          { dt: '<b>Podobnost je zelo zavajujoča!</b>' },
          { dt: 'To je programski jezik, ki je bil <b>napisan v 10 dneh!</b>' },
        ],
        'step3': [
          { header: 'Korak 3: VUE"', },
          { dt: 'Knjižnica napisana v jeziku JavaScript' },
          { dt: 'Namenjena izdelavi intaraktivnih spletnih strani' },
          { dt: 'Podobna preostalim, kot sta Angular in React' },
        ],
        'take-away-1': [
          { header: 'Povzetek I', },
          { dt: 'Učenje HTML je preprosto in hitro' },
          { dt: 'CSS je kompleksen in za razvijalce zahteven, namenjen je oblikovalcem. Rešitev so predpripravljene CSS knjižnice' },
          { dt: 'JavaScript nosi zavajujoče ime' },
          { dt: 'Dobro se naučite JavaScript programskega jezika, saj ima "zanimive lastnosti"' },
          { dt: 'V JS lahko uporabite različne (pravzaprav vse) programske tehnike, od uporabe preprostih funkcij, preko objektov do pravega funkijskega programiranja' },
        ],
        'take-away-2': [
          { header: 'Povzetek II', },
          { dt: 'JS pozna OOP vendar ga ne "posiljujte" z OOP. Uporabite tisti model, ki najbolje reši zadano nalogo' },
          { dt: 'VUE je samo ena izmed mnogih knjižnic. Znati morate JS!' },
          { dt: 'Hitrost nastajanja novih knjižnic / tehnologij / principov razvoja je neverjetna in težko je slediti' },
          { dt: 'V letu 2019 je vsebolj popularna knjižnica Svelte, ki združuje dobre lastnosti Vue, React, NUXT... ' },
        ],
        'close': [
          { header: 'O predavatelju in prezentaciji', },
          {
            dt: 'Matjaž Prtenjak',
            dd: `<ul>
            <li>Freelancer, full-stack developer: <b>mnet.si</b></li>
            <li>Vodja razvoja maloprodajnega informacijskega sistema <b>v Merkurju</b></li>
            </ul>`
          },
          {
            dt: 'Kontakti',
            dd: `Dosegljiv sem preko: <ul>
            <li>twitter / github: <span class="mp-info">@MPrtenjak</span></li>
            <li>e.mail: <span class="mp-info">info@mnet.si</span></li>
            <li>web: <span class="mp-info">mnet.si</span></li>
            </ul>`
          },
          {
            dt: 'GitHub projekt',
            dd: `<ul>
            <li>Celotna prezentacija je dosegljiva preko github-a in je napisana v Vue (Nuxt): <span class="mp-info">https://github.com/MPrtenjak</span></li>
            <li>"Živa" prezentacija: <span class="mp-info">https://mnet.si/ots2019</span></li>
            </ul>`,
          },
        ],
      }
    }
  },

  computed: {
    currentDefinition () {
      const prop = this.slide.id
      return this.definitions[prop]
    },
    currentArray () {
      let def = this.currentDefinition
      if (_.isArray(def)) return def

      return def.list
    },
    topMargin () {
      return (this.currentDefinition.center) ? '200px' : '50px'
    }
  },

  methods: {
    dtx (dt) {
      if (dt.no_hand)
        return dt.text

      return '<i class="far fa-hand-point-right"></i>' + dt
    }
  }
}
</script>
