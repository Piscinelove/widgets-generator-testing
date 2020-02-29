<template>
<div>
  <h1>Widget Title</h1>
  <p>{{ test }}</p>
  <h1>{{ pktuveuxpas }}</h1>
  <h1>Widget Title</h1>
</div>
</template>


<script>
export default {
  name: 'NetplusTestPackages',
  props: {
    basePath: {
      type: String,
      default () {
        return '/test'
      }
    },
    pktuveuxpas: {
      type: String,
      default () {
        return 'history'
      }
    },
    test: {
      type: String,
      default () {
        return 'history'
      }
    }
  },

  data () {
    return {
      views: [
        'index'
      ]
    }
  },

  created () {
  }

}
</script>
