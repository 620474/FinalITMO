<template>
  <div id="app">
    <Navbar />

    <div id="app-container">
      <Background/>
      <router-view/>
    </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Background from '@/components/Background.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Footer,
    Background
  },
  beforeCreate: function() {

    this.$store.dispatch('authenticate');
  }
}
</script>
