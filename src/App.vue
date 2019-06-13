<template>
  <div id="app">

    <main>
      <transition :name="transitionName">
        <router-view/>
      </transition>
    </main>

  </div>
</template>

<script>
// import { toJS } from 'mobx'
// import Store from '@/stores/Store'


export default {
  name: "App",
  data() {
    return {
      transitionName: ""
    };
  },
  // mixins: [counterMixin, createSession],
  fromMobx: {

  },
  watch: {
    $route(to, from) {
      this.transitionName = to.meta.page > from.meta.page ? "next" : "prev";
    },
    selectedPalettesTitle: function(val) {
      Store.setPalette(val)
    }
  },
  methods: {
    // cleanCounter: function() {
    //   this.counter = 0
    // }
  },
  beforeDestroy () {
    // Store.closeSession()
  },
  components: {

  }
};
</script>

<style lang="css" src="./assets/bootstrap.min.css"></style>
<style lang="sass" src="./app.sass"></style>

<style>
@keyframes leaveToLeft {
  from {
    transform: translateX(0);
    overflow: hidden;
  }
  to {
    transform: translateX(-25%);
    filter: brightness(0.5);
    overflow: hidden;
  }
}

@keyframes enterFromLeft {
  from {
    transform: translateX(-25%);
    filter: brightness(0.5);
    overflow: hidden;
  }
  to {
    transform: translateX(0);
    overflow: visible;
  }
}

@keyframes leaveToRight {
  from {
    transform: translateX(0);
    overflow: hidden;
  }
  to {
    transform: translateX(100%);
    overflow: hidden;
  }
}

@keyframes enterFromRight {
  from {
    transform: translateX(100%);
    overflow: hidden;
  }
  to {
    transform: translateX(0);
    overflow: visible;
  }
}
</style>
