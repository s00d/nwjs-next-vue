<template>
  <!-- http://flexboxgrid.com/ -->
  <div class="row top-phanel">
    <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
        <div class="titlebar-close" @click.prevent="exit">
            <svg x="0px" y="0px" viewBox="0 0 6.4 6.4">
              <polygon fill="#4d0000" points="6.4,0.8 5.6,0 3.2,2.4 0.8,0 0,0.8 2.4,3.2 0,5.6 0.8,6.4 3.2,4 5.6,6.4 6.4,5.6 4,3.2"></polygon>
            </svg>
          </div>

          <div class="titlebar-minimize" @click.prevent="minimizeWindow">
            <svg x="0px" y="0px" viewBox="0 0 8 1.1">
              <rect fill="#995700" width="8" height="1.1"></rect>
            </svg>
          </div>

          <div class="titlebar-fullscreen" @click.prevent="enterFullscreen">
            <svg v-if="fullscreen" class="maximize-svg" x="0px" y="0px" viewBox="0 0 7.9 7.9">
              <polygon fill="#006400" points="7.9,4.5 7.9,3.4 4.5,3.4 4.5,0 3.4,0 3.4,3.4 0,3.4 0,4.5 3.4,4.5 3.4,7.9 4.5,7.9 4.5,4.5"></polygon>
            </svg>
            <svg v-else class="fullscreen-svg" x="0px" y="0px" viewBox="0 0 6 5.9">
              <path fill="#006400" d="M5.4,0h-4L6,4.5V0.6C5.7,0.6,5.3,0.3,5.4,0z"></path>
              <path fill="#006400" d="M0.6,5.9h4L0,1.4l0,3.9C0.3,5.3,0.6,5.6,0.6,5.9z"></path>
            </svg>
          </div>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 drag">
        <span v-text="label"></span>
    </div>
    <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 text-right">
        <span v-text="version"></span>
    </div>
  </div>
</template>

<script>
import gui from 'nw.gui';
import {label, version} from '../../../package.json';

let win = gui.Window.get();

export default {
  data() {
    return {
      fullscreen: false,
      label: label,
      version: version
    };
  },
  computed: {

  },
  methods: {
    exit() {
      console.log('exit');
      win.close(true);
    },
    minimizeWindow() {
      win.minimize();
    },
    enterFullscreen() {
      win.toggleFullscreen();
    }
  },
  created() {
    win.on('enter-fullscreen', () => this.fullscreen = true);
    win.on('restore', () => this.fullscreen = false);
    this.title = win.title;
  },
  beforeDestroy() {

  }
};
</script>

<style>
  .drag {
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }
  .top-phanel {
    background-color: #24292e;
    color: hsla(0,0%,100%,.75);
    padding: 5px 2px;
    z-index: 32;

    position: fixed;
    top: 0;
    right: 0;
    left: 0;
  }

  .titlebar-close,
  .titlebar-minimize,
  .titlebar-fullscreen {
    float: left;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 6px 4px;
    line-height: 0;
  }

  .titlebar-close {
    border: 1px solid #e2463f;
    background-color: #ff5f57;
    margin-left: 6px;
  }

  .titlebar-minimize {
    border: 1px solid #e1a116;
    background-color: #ffbd2e;
  }

  .titlebar-fullscreen {
    border: 1px solid #12ac28;
    background-color: #28c940;
  }

  .titlebar-minimize:hover {
    border-color: #ad7d15;
    background-color: #bf9123;
  }

  .titlebar-fullscreen:hover {
    border-color: #128622;
    background-color: #1f9a31;
  }

  .titlebar-close:hover {
    border-color: #ad3934;
    background-color: #bf4943;
    color: white;
  }

  .titlebar-close svg {
    width: 6px;
    height: 6px;
    margin-top: 2px;
    opacity: 0;
  }
  .titlebar-minimize svg {
    width: 8px;
    height: 8px;
    margin-top: 2px;
    opacity: 0;
  }

  .titlebar-fullscreen svg.fullscreen-svg {
    width: 6px;
    height: 6px;
    margin-top: 2px;
    opacity: 0;
  }

  .titlebar-fullscreen svg.maximize-svg {
    width: 8px;
    height: 8px;
    margin-top: 2px;
    opacity: 0;
    color: white;
  }

  .titlebar-close:hover svg,
  .titlebar-minimize:hover svg,
  .titlebar-fullscreen:hover svg.maximize-svg,
  .titlebar-fullscreen:hover svg.fullscreen-svg{
    opacity: 1;
  }
</style>


