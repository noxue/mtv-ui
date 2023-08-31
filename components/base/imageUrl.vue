<template>
  <image class="w-h-full" style="font-size: 0rpx;" :src="imageUrl" :style="style_" :show-menu-by-longpress="showMenuByLongpress"></image>
</template>

<script>
  import {
    setFileHost
  } from '@/serve/project.js';

  export default {
    name: 'ImageUrl',
    props: {
      src: {
        type: [String],
        default () {
          return '';
        }
      },
      style_: {
        type: String,
        default: '' // width:100%;height:100%;
      },
      showMenuByLongpress: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      src(newValue, oldValue) {
        this.set(newValue);
      }
    },
    data() {
      return {
        imageUrl: ''
      };
    },
    created() {
      this.set(this.src);
    },
    methods: {
      set(value) {
        if (!value) {
          this.imageUrl = '';
        } else {
          this.imageUrl = setFileHost(value);
        }
      }
    }
  };
</script>
