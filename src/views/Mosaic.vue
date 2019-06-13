<template>
  <div class="cropper">
    <div class="imageActions">
      <div class="resultWrap">

      </div>
      <div class="cropperWrap" ref="cropperWrap">
        <div class="cropperWrap_blur" :style="`background-image: url(${userPicture})`">
          <div class="cropperWrap_blur_shadow"></div>
        </div>

        <clipper-fixed
          class="cropperBody"
          :class="{'active': !this.inputsDisabled}"
          :src="userMosaic"
          ref="clipperFixed"
          bg-color="transparent"
          :shadow="shadow"
          :grid="grid"
          :border="border"
          :corner="corner"
          :outline="outline"
          :key="`clipperKey-${ratio}`"
          :zoom-rate="0.04"
          :min-scale="0.1"
          :ratio="ratioComputed"
          :style="{ 'max-width': '100%', 'min-width': minWidth + 'px' }"
          @load="loadCb()"
        >
        </clipper-fixed>

        <div v-if="inputsDisabled" class="placeholder">
          <div class="spinner-border text-light" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <h1>Пожалуйста, подождитe</h1>
          <p>Идёт генерация изображения</p>
        </div>

        <div class="zoomBlock">
          <button class="btn btn-light" @click="setZoom('plus')">
            <img svg-inline src="../../public/img/icons/plus.svg" />
          </button>
          <button class="btn btn-light" @click="setZoom('minus')">
            <img svg-inline src="../../public/img/icons/minus.svg" />
          </button>
        </div>
        <button class="btn btn-light cropToggle" @click="cropManager()">
          <img svg-inline src="../../public/img/icons/crop.svg" />
        </button>
      </div>
    </div>
    <div class="orderActions" >

    </div>
  </div>
</template>

<script>

import _ from 'lodash'


const fitRect = require('fit-rect')
import { clipperFixed } from 'vuejs-clipper'


export default {
  name: 'mosaic',
  data: () => ({
    inputsDisabled: true,
    protector: false,
    protectTimer: 0,
    userWidth: 150,
    userHeight: 150,
    grid: false,
    border: 0,
    corner: false,
    outline: 0,
    resultURL: '',
    shadow: 'rgba(0,0,0,0.0)',
    subscription: null,
    ratio: 1,
    minWidth: 200,
    userPicture: '/img/lodka_1920x1080.jpg',
    userMosaic: '/img/lodka_826x1080.jpg',
    mosaicPreview: '/img/fullscreen-img.jpg',
    UserOrderSizes: {
      width: 150,
      height: 150
    }
  }),

  components: {
    clipperFixed

  },
  async mounted(){


  },
  methods: {
    loadCb: function() {
      var imgSizes = this.userPictureSize
      // console.log(imgSizes)
      // console.log(this.$refs.cropperWrapBasic.clientHeight, this.$refs.cropperWrapBasic.clientWidth)
      // console.log(this.userPictureSize.height, this.userPictureSize.width)
      // console.log(this.$refs.clipperFixed.imgEl.naturalWidth, this.$refs.clipperFixed.imgEl.naturalHeight)
      var ratioImage = this.$refs.clipperFixed.imgEl.naturalWidth/this.$refs.clipperFixed.imgEl.naturalHeight
      var target = [0, 0, this.$refs.cropperWrap.clientWidth, this.$refs.cropperWrap.clientHeight]
      var rect = [0, 0, this.$refs.clipperFixed.imgEl.naturalWidth, this.$refs.clipperFixed.imgEl.naturalHeight ]
      var containedRect = fitRect(rect, target, 'contain')
      // console.log(ratioImage)
      // console.log(containedRect)
      this.minWidth = containedRect[2]
      // this.maxHeight = containedRect[3]
      this.inputsDisabled = false
    },
    cropManager: function () {
      this.$router.push('/cropper')
    },
    setZoom: function(direction) {
      this.zoom = this.$refs.clipperFixed.bgWH$
      // console.log(this.zoom)
      if (direction === 'plus') {
        this.$refs.clipperFixed.setWH$.next(this.zoom + 0.2)
      } else if (direction === 'minus') {
        this.$refs.clipperFixed.setWH$.next(this.zoom - 0.2)
      }
    },

  },

  computed: {
    ratioComputed: function() {
      try{
        return this.mosaicImgWidth/this.mosaicImgHeight
      } catch {
        return this.mosaicImgWidth/this.mosaicImgHeight
      }
    }
  }

}
</script>

<style lang="sass" scoped>
.cropper
  flex: 1 0 auto
  display: flex
  flex-direction: column
.orderActions_crop
  flex: 0 0 174px
  background: white
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  padding: 0 10px
  position: relative
  .orderActions_button
    margin: 0 20px
    min-width: 220px
    .btn
      width: 100%
.orderActions
  flex: 0 0 173px
  background: white
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
  padding: 0 44px 0 28px
  position: relative
  .DimentionsInput_wrap
    flex: 0 0 auto
    position: relative
    width: 255px
    .DimentionsInput_blocker
      width: 100%
      height: 50px
      // background: red
      z-index: 1
      position: absolute
      top: 38px
      left: 0

  .orderActions_button
    min-width: 220px
    button
      width: 100%
      font-family: "SFUIDisplayBold"
  .orderActions_price
    .price
      font-family: "SFUIDisplayHeavy"
      font-size: 36px
      font-weight: 900
      letter-spacing: -0.4px
      color: #454545
      margin-bottom: 10px
      text-align: center
    .btn
      padding: 9px 0
      font-family: "SFUIDisplayBold"
  .orderActions_material
    width: 120px
    span
      display: block
      font-size: 12px
      margin-bottom: 4px
      line-height: 14px
      font-weight: 500
      text-align: center
      font-family: "SFUIDisplayMeduim"
    .orderActions_material
      .btn-group-vertical
        width: 100%
        .btn
          font-size: 12px
          font-weight: 300
          width: 100%


.imageActions
  flex: 1 1 auto
  display: flex
  flex-direction: row
  width: 100%
  position: relative
  overflow: hidden
  max-height: calc(100vh - 218px)
  min-height: calc(100vh - 218px)
  .cropperWrap_blur
    filter: blur(5px)
    background-size: cover
    background-repeat: no-repeat
    background-position: center
    position: absolute
    top: -10px
    left: -10px
    right: -10px
    bottom: -10px
    z-index: 1
    .cropperWrap_blur_shadow
      background: rgba(0,0,0,0.7)
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
  .cropperWrap
    flex: 1 1 auto
    position: relative
    // padding: 10px 40px 10px 10px
    display: flex
    justify-content: center
    align-items: center
    overflow: hidden
    max-height: calc(100vh - 218px)
    min-height: calc(100vh - 218px)
    .mosaicWrap
      background-size: contain
      background-repeat: no-repeat
      background-position: center
      width: calc(100% - 80px)
      height: calc(100% - 10px)
      z-index: 5
      display: flex
      align-items: center
      justify-content: center
    .cropToggle
      position: absolute
      bottom: 40px
      right: 20px
      height: 44px
      z-index: 5
      border-radius: 8px
      background: white
      &.active
        box-shadow: inset 0 5px 9px 0 rgba(0, 0, 0, 0.5)
      svg
        g, path
          fill: black
    .zoomBlock
      position: absolute
      bottom: 114px
      right: 20px
      z-index: 5
      width: 44px
      background: white
      border-radius: 8px
      button
        height: 44px
        background: white
        border: none
        border-radius: 8px
        svg
          g, path
            fill: black
        &:nth-child(1)
          margin-bottom: 20px

    .cropperBody
      // min-width: 100%
      // // min-width: calc(100vw - 205px)
      // min-height: 100%
      // max-height: calc(100vh - 235px)
      // max-width: calc(100vw - 205px)
      flex: 0 0 auto
      position: relative
      z-index: 2
      opacity: 0
      visibility: hidden
      transition: opacity .2s
      &.active
        opacity: 1
        visibility: visible
    .placeholder
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 5
      color: #fff
      text-align: center
      font-family: "SFUIDisplayLight"
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
  .resultWrap
    flex: 0 0 120px
    background: #171717
    padding: 20px 14px 10px
    display: flex
    flex-direction: column
    justify-content: space-between
    .result
      display: block
      flex: 1 0 auto
      background-size: auto 100%
      background-repeat: no-repeat
      background-position: center
      margin-bottom: 10px
    .backButton
      color: #fff
      fill: #fff
      margin-bottom: 20px
      text-align: center
    .resultWrap_description
      color: $warm-grey
      font-size: 12px
      display: block
      text-align: center
      font-family: "SFUIDisplayMeduim"


</style>
