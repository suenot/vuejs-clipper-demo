export default {
  data () {
    return {
      polling: null
    }
  },
  methods: {
    pollData () {
      this.fetchFunction()
      this.polling = setInterval(() => {
        this.fetchFunction()
      }, 5000)
    }
  },
  beforeDestroy () {
    clearInterval(this.polling)
  },
  created () {
    this.pollData()
  }
}
