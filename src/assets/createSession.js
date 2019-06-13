export default {
  data () {
    return {
      createSessionInterval: null
    }
  },
  fromMobx: {
    // sessionId: {get() {return Store.sessionId}},
    // standId: {get() {return Store.standId}},
    // sessionFlag: {get() {return Store.sessionFlag}}
  },
  mounted() {
    // console.log('mixin createSessionInterval')
    // this.$nextTick()
    // if (this.standId !== '') {
    //   if (this.sessionId === '') {
    //     if (this.route.path !== '/tv') {
    //       this.start()
    //     }
    //   }
    // }
  },
  methods: {
    // createSessionStart() {
    //   this.createSessionInterval = setInterval(() => {
    //     if ( this.sessionId === '') {
    //       Store.createSession()
    //     }
    //   }, 600)
    // }
  },
  beforeDestroy () {
    clearInterval(this.createSessionInterval)
  },
  watch: {
    // sessionId: function(valNew, valOld) {
    //   if (valNew !== '') {
    //     Store.setSessionFlag(true)
    //     clearInterval(this.createSessionInterval)
    //   } else {
    //     Store.setSessionFlag(false)
    //     this.createSessionStart()
    //   }
    // }
  }
}
