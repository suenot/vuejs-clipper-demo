export default {
  data () {
    return {
      counter: 0,
      counterInterval: null
    }
  },
  methods: {
    startCounter() {
      this.counterInterval = setInterval(() => {
        if ( (this.$route.path !== '/tv') && (this.$route.path !== '/') ) {
          this.counter += 5000
        }
      }, 5000)
    }
  },
  beforeDestroy () {
    clearInterval(this.counterInterval)
  },
  created () {
    this.startCounter()
  },
  watch: {
    counter: function(valNew, valOld) {
      if (valNew > 1000*60*5) {
        if ( (this.$route.path !== '/tv') && (this.$route.path !== '/')) {
          Store.setModal({
            component: 'ModalContinue',
            position: 'center',
            show: true
          })
        }
      }
    }
  }
}
