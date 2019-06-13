/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@storybook/vue'

import '../../src/assets/bootstrap.min.css'
import '../../src/app.sass'
import Vue from 'vue'
import VuejsClipper from 'vuejs-clipper'
import VueRx from 'vue-rx'
const VueInputMask = require('vue-inputmask').default

Vue.use(VueInputMask)
Vue.use(VueRx)
Vue.use(VuejsClipper)

const req = require.context('../../src/stories', true, /.stories.js$/)

Vue.component('ModalContinue', require('@/components/ModalContinue.vue').default)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
