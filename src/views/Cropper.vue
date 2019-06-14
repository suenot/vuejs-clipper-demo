<template>
  <div class="cropper">
    <div class="imageActions">
      <div class="resultWrap">

      </div>
      <div class="cropperWrap" ref="cropperWrapBasic">
        <div class="cropperWrap_blur" :style="`background-image: url(${userBG})`">
          <div class="cropperWrap_blur_shadow"></div>
        </div>
        <clipper-basic
          class="cropperBody"
          :src="userPicture"
          ref="clipper"
          bg-color="transparent"
          :shadow="shadow"
          :ratio="ratioClipComputed"
          :wrapRatio="ratioImageComputed"
          :grid="grid"
          :border="border"
          :corner="corner"
          :outline="outline"
          :key="`clipperKey-${ratioClipComputed}`"
          :minWidth="5"
          :minHeight="5"
          :style="{ 'max-width': '100%', 'min-width': minWidth + 'px' }"
          @load="loadCb()"

        >
          <div class="placeholder" slot="placeholder">
            <div class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <h1>Пожалуйста, подождитe</h1>
            <p>Идёт генерация изображения</p>
          </div>
        </clipper-basic>
      </div>
    </div>
    <div class="orderActions_crop">
      <div class="orderActions_button">
        <button class="btn btn-lg btn-tyler-outline" @click="cropManager()">Cancel</button>
      </div>
      <div class="orderActions_button">
        <button class="btn btn-lg btn-tyler" @click="generateMosaics()">
          <img svg-inline src="../../public/img/icons/crop.svg" />
          Crop & Generate
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import { clipperBasic } from 'vuejs-clipper'
const fitRect = require('fit-rect')
import _ from 'lodash'
export default {
  name: 'cropper',
  data: () => ({
    naturalWidth: 1,
    naturalHeight: 1,
    inputsDisabled: false,
    grid: true,
    border: 2,
    corner: true,
    outline: 6,
    resultURL: '',
    shadow: 'rgba(0,0,0,0.4)',
    ratioImage: 0,
    minWidth: 200,
    maxHeight: 200,
    UserOrderSizes: {
      width: 170,
      height: 150
    },
    crop: {
      height: '',
      left: '',
      top: '',
      width: '',
      clientHeight: '',
      clientWidth: ''
    },
    userPicture: '/img/lodka_1920x315.jpg',
    userBG: '/img/fullscreen-img.jpg'
  }),
  fromMobx: {

  },
  components: {
    clipperBasic
  },
  async mounted(){
    // this.UserOrderSizes = {
    //   width: 170,
    //   height: 150
    // }
    // Store.setAppStage('cropper')
    // await this.$nextTick()
    // await this.$nextTick()
    // this.setDimentions()
    // console.log('ratioImage', this.ratioImage)
  },
  methods: {
    loadCb: function() {
      this.naturalWidth = this.$refs.clipper.imgEl.naturalWidth
      this.naturalHeight = this.$refs.clipper.imgEl.naturalHeight
      
      var target = [0, 0, this.$refs.cropperWrapBasic.clientWidth, this.$refs.cropperWrapBasic.clientHeight]
      var rect = [0, 0, this.$refs.clipper.imgEl.naturalWidth, this.$refs.clipper.imgEl.naturalHeight ]
      var containedRect = fitRect(rect, target, 'contain')
      
      this.minWidth = containedRect[2]
      
      // this.setDimentions()
    },
    setDimentions: async function() {
      // console.log(this.$refs.clipper.posObj.height.slice(0, -1), this.$refs.clipper.posObj.width.slice(0, -1), this.$refs.clipper.posObj.left.slice(0, -1), this.$refs.clipper.posObj.top.slice(0, -1))
      try {
        var height = parseFloat(this.$refs.clipper.imgEl.naturalHeight)
        var width = parseFloat(this.$refs.clipper.imgEl.naturalWidth)
        var posHeight = parseFloat( this.$refs.clipper.posObj.height.slice(0, -1) )
        var posWidth = parseFloat( this.$refs.clipper.posObj.width.slice(0, -1) )
        var posLeft = parseFloat( this.$refs.clipper.posObj.left.slice(0, -1) )
        var posTop = parseFloat( this.$refs.clipper.posObj.top.slice(0, -1) )
        // console.log(posHeight, posWidth, posLeft, posTop)
        this.crop.clientHeight = height
        this.crop.clientWidth = width
        this.crop.height = height / 100 * posHeight
        this.crop.width = width / 100 * posWidth
        this.crop.left = width / 100 * posLeft
        this.crop.top = height / 100 * posTop
        // console.log(this.crop)
        Store.setRoiH(this.crop.height)
        Store.setRoiW(this.crop.width)
        Store.setRoiX(this.crop.left)
        Store.setRoiY(this.crop.top)
        console.log({'RoiX': this.crop.left,'RoiY': this.crop.top, 'RoiW': this.crop.width, 'RoiH': this.crop.height })
        await this.$nextTick()
      } catch(err) {
        // console.log(err)
      }
    },
    cropManager: async function () {
      // Store.setCropStatus(false)
      // await this.$nextTick()
      this.$router.push('/')
    },
    generateMosaics: async function() {
      // Store.removeUserMosaic()
      // Store.setCropStatus(true)
      // await this.$nextTick()
      // this.setDimentions()
      // await this.$nextTick()
      this.$router.push('/')
    }

  },
  computed: {
    ratioClipComputed: function() {
      try{
        return this.UserOrderSizes.width/this.UserOrderSizes.height
      } catch(err) {
        return this.UserOrderSizes.width/this.UserOrderSizes.height
      }
    },
    ratioImageComputed: function() {

      return this.naturalWidth/this.naturalHeight

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
  flex: 0 0 168px
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
      font-family: "SFUIDisplayMeduim"
.orderActions
  flex: 0 0 168px
  background: white
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
  padding: 0 10px
  position: relative
  .orderActions_button
    min-width: 220px
    button
      width: 100%
  .orderActions_price
    .price
      font-family: "SFUIDisplayBold"
      font-size: 36px
      font-weight: 900
      letter-spacing: -0.4px
      color: #454545
      margin-bottom: 10px
    .btn
      padding: 9px 0
  .orderActions_material
    width: 120px
    span
      display: block
      font-size: 12px
      line-height: 14px
      font-weight: 500
      text-align: center
    .orderActions_material
      .btn-group-vertical
        width: 100%
        .btn
          font-size: 12px
          font-weight: 300
          width: 100%
.imageActions
  flex: 1 0 auto
  display: flex
  flex-direction: row
  width: 100%
  position: relative
  overflow: hidden
  max-width: calc(100vw - 120px)
  max-height: calc(100vh - 213px)
  min-width: 100vw
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
    max-width: calc(100vw - 120px)
    max-height: calc(100vh - 213px)
    .cropToggle
      position: absolute
      bottom: 10px
      right: 10px
      z-index: 5
      border-radius: 8px
      &.active
        box-shadow: inset 0 5px 9px 0 rgba(0, 0, 0, 0.5)
      svg
        g, path
          fill: black
    .cropperBody
      // max-width: 700px
      // min-width: 270px
      // // max-height: calc(100% - 0px)
      // // max-width: calc(100% - 0px)
      // height: 100%
      // width: 100%
      // display: flex
      // justify-content: center
      // align-items: center
      // // max-height: calc(100vh - 290px)
      // // max-width: calc(100vw - 230px)
      // flex: 0 0 auto
      position: relative
      z-index: 2
      // .clip-area
      //   max-height: inherit !important
    .placeholder
      color: #fff
      text-align: center
      font-family: "SFUIDisplayLight"
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
</style>
<style lang="sass">
.cropperBody
  .clip-area
    overflow: visible !important
  //   .img-scale
  //     max-height: inherit !important
  //     img
  //       max-height: calc(100vh - 230px)
  //       height: calc(100vh - 230px)!important
  //       width: auto !important
  //       max-width: 100% !important
        // max-height: 370px !important
        // min-height: 370px
        // width: auto !important
        // max-width: 100% !important
  .zoom-area
    border-color: $warm-grey
  .corner
    width: 32px
    height: 32px
    background-image: url('/img/icons/resize.svg')
    border: none
    opacity: 1
    border-radius: 100%
    background-repeat: no-repeat
    background-position: center
    background-size: cover
    &.corner1
      top: -16px
      left: -16px
      transform: rotate(-270deg)
    &.corner2
      top: -16px
      right: -16px
    &.corner3
      bottom: -16px
      right: -16px
      transform: rotate(-270deg)
    &.corner4
      bottom: -16px
      left: -16px
</style>
