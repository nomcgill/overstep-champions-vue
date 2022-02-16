
<template>
  <transition name="fade">
    <div class="overlay" :class="{ showDropDown }" @click.stop="onOverlayClick" ref="overlay">
      <div
        class="modal-container"
        :class="{ fullscreen, showDropDown }"
      >

        <div v-if="$slots.header" class="header">
          <div class="header--content">
            <slot name="header"></slot>
          </div>
          <!-- space to add custom action buttons to the header -->
          <div v-if="$slots.customActions" class="custom--actions">
            <slot name="customActions"></slot>
          </div>
          <div class="header--actions">
            <i
              v-if="fullscreenButtonVisible"
              class="esp-icons fullscreen"
              @click="$emit('fullscreen', !fullscreen)"
            >
              {{ fullscreenIcon }}
            </i>
            <div id="close-x"
              v-on:click="closeModal"
              v-if="!noCornerX"
            >
              X
            </div>
          </div>
        </div>

        <div class="content" :class="{ scrollable }">
          <slot></slot>
        </div>

        <div v-if="$slots.footer" class="footer">
          <slot name="footer" class="footer"></slot>
        </div>
        <div class="modal-dropdown" v-if="dropDown">
            <div class="modal-dropdown__border">
              <span @click="toggleDropDown">
                <i class="esp-icons">{{(!showDropDown) ? 'expand_more': 'expand_less'}}</i>
                <i class="esp-icons">more_horiz</i>
                <i class="esp-icons">{{(!showDropDown) ? 'expand_more': 'expand_less'}}</i>
              </span>
            </div>
            <transition name="dropDown">
              <div class="modal-dropdown__container" v-if="showDropDown">
                <slot name="modal-dropdown" class="modal-dropdown"></slot>
              </div>
            </transition>
        </div>

      </div>
    </div>
  </transition>
</template>


<script>
// import { bus } from '@/main'
export default {
  name: 'Modal',
  props: {
    fullscreen: {
      type: Boolean,
      default: undefined
    },
    dropDown: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true
    },
    closeOnEscapeKey: {
      type: Boolean,
      default: true
    },
    noCornerX: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showDropDown: false
    }
  },
  computed: {
    fullscreenIcon () {
      return this.fullscreen ? 'fullscreen_exit' : 'fullscreen'
    },
    fullscreenButtonVisible () {
      return this.$listeners.fullscreen && this.fullscreen !== undefined
    }
  },
  methods: {
    onKeyup (e) {
      if (this.closeOnEscapeKey && (e.key === 'Escape' || e.keyCode === 27)) {
        if (this.level === this.$globalModalData.level) {
          this.closeModal()
        }
      }
    },
    onOverlayClick (event) {
      if (this.closeOnClickOutside && event.target === this.$refs.overlay) {
        this.closeModal()
      }
    },
    closeModal () {
        this.$emit('close')
    },
    toggleDropDown () {
      this.showDropDown = !this.showDropDown
    },
    disableTabNavigationOutside () {
      // Save all input elements and it's current tabindex before setting to -1
      this.elementWithFocusDisabled = Array.from(document.querySelectorAll('input, button, textarea, a'))
        .map(element => {
          const tabindex = element.getAttribute('tabindex')
          element.setAttribute('tabindex', '-1')
          return { element, tabindex }
        })
    },
    restoreTabNavigationOutside () {
      // Restore all inputs elements' tabindex
      this.elementWithFocusDisabled.forEach(({ element, tabindex }) => {
        element.setAttribute('tabindex', tabindex)
      })
    }
  },
  created () {
    this.level = ++this.$globalModalData.level
    window.addEventListener('keyup', this.onKeyup)
    this.disableTabNavigationOutside()
    this.$bus.$emit('close-drawer')
  },
  beforeDestroy () {
    this.$globalModalData.level--
    window.removeEventListener('keyup', this.onKeyup)
    this.restoreTabNavigationOutside()
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .overlay {
    background-color: rgba(rgb(0, 0, 0), 0.40);
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: all;
    z-index: 1000;
    &.showDropDown .modal-container{
      margin-top: -10%;
    }
  }

  .modal-container {
    color:black;
    background-color: white;
    border-radius: 2px;
    // border-top: solid 1px black;
    // border-right: solid 2px black;
    // border-bottom: solid 2px black;
    // border-left: solid 1px black;
    box-shadow: 1px 1px 4px rgba(black, 0.17);
    border-top: 6px solid black;
    display: flex;
    flex-direction: column;
    margin-top: 0;
    width: 95%;
    padding: 0;
    position: relative;
    transition: all 100ms ease-out;
    max-height: 95vh;
    max-width: 600px;
    // box-shadow: 0px 2px 2px 2px black;
    &.showDropDown{
      border-radius: 2px 2px 0 0;
    }
    &.fullscreen {
      width: calc(100% - 20px);
      height: calc(100vh - 20px);
    }
    .header {
      display: flex;
      justify-content: space-between;
      // align-items: center;
      font-weight: 600;
      padding: 16px 20px;
      min-height: 56px;
      &--content {
        flex: 1;
      }
      &--actions {
        i.esp-icons {
          font-size: 24px;
          cursor: pointer;
        }
        .close {
          color: gray;
        }
        .fullscreen {
          color: darkblue;
          margin-right: 8px;
        }
      }
      display: flex;
      flex-direction: 1;
    }
    & > .content {
      padding: 0 20px 20px;
      height: 100%;
      flex: 1;
      // max-height: calc(59vh);
      overflow: scroll;
    }

    .footer {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      padding: 16px 20px;
      border-top: 1px solid #d8d8d8;

      // /deep/ .btn:not(:first-child) {
      //   margin-left: 4px;
      // }
    }

    #close-x {
      // margin-top: 8px;
    }

    
  }

  @media only screen and (min-width: 768px) {
    .modal-container {
      min-width: 440px;
    }

  }

</style>