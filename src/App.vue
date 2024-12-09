<script setup>
  import 'primeicons/primeicons.css'
</script>

<template>
  <Header/>
  <!-- <nav>
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/about">About</RouterLink></li>
    </ul>
  </nav> -->
  <main>
    <RouterView />
  </main>
  <Footer/>
</template>

<script>
  import Orders from './views/Orders.vue';
  import Cars from './views/Cars.vue';
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';

  export default {
    components: {
      Header,
      Cars,
      Orders,
      Footer
    },
  };
</script>
