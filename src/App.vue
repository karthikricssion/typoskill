<template>
  <div id="app">
    <div class="set-timer-report" v-if="!status">
      <p>Challenge yourself with your typing skills at desired time</p>
    
      <select v-model="timer">
        <option value="10">10 seconds</option>
        <option value="20">20 seconds</option>
        <option value="30">30 seconds</option>
        <option value="40">40 seconds</option>
        <option value="50">50 seconds</option>
        <option value="60">60 seconds</option>
      </select>

      <button @click="changeStatus">Start Typing</button>
    </div>

    <div class="typing-wrapper" v-else>
      {{countTimer}} seconds left
      <textarea v-model="paragrah" :disabled="showReport" ref="typeArea"></textarea>
    </div>

    <div class="typoskill-report" v-if="showReport">
      I will list the reports

      <ul>
        <li v-for="(value, key) in report" v-bind:key="key">
          <br> {{key}} : {{value}} 
        </li>
      </ul>

      <button @click="reset">Retry Challenge</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      timer: "20",
      countTimer: 0,
      paragrah: '',
      showReport: false,
      report: {
        letters: 0,
        words: 0,
        sentences: 0
      }
    }
  },
  computed: {
    ...mapGetters({
      status: 'getStatus'
    })
  },
  methods: {
    changeStatus() {
      this.$store.dispatch('setStatus', true)
      this.countTimer = parseInt(this.timer)

      let self = this

      setTimeout(() => {
        self.$nextTick(self.$refs.typeArea.focus())
      }, 100)

      let startCountDown = setInterval(() => {
        self.countTimer -= 1

        if(self.countTimer === 0) {
          clearInterval(startCountDown);
          self.prepareReport()
        }
      }, 1000)
    },
    letterCounter(str) {
      var letters = 0;
      var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var ar = alphabet.split("");
      for (var i=0; i<str.length;i++) {
          if (ar.indexOf(str[i]) > -1) {
              letters = letters + 1;
          }
      }
      return letters;
    }, 
    prepareReport() {
      this.report.letters = this.letterCounter(this.paragrah)
      this.report.words = this.paragrah.split(' ').length - 1;
      this.report.sentences = this.paragrah.split(". ").length - 1;

      this.showReport = true
    },
    reset() {
      this.paragrah = ''
      this.showReport = false
      this.$store.dispatch('setStatus', false)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
