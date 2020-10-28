<template>
  <div id="app">
    <template> 
      <nav class="navbar navbar-light border-bottom">
          <h5>Where in the world?</h5>
          <input type="checkbox" id='theme-switch' class='theme-switch' v-model="darkMode"/>
          <label for='theme-switch'>
              <span v-if="darkMode === true">
                <p class="text-light">Light Mode <img alt="logo" src="./assets/images/sun.png" class="icon"></p>
              </span>
              <span v-else>
                <p class="text-body">Dark Mode <img alt="logo" src="./assets/images/moon.png" class="icon"></p>
              </span>
          </label>
      </nav>
    </template>   
    <router-view/>
  </div>
</template>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

img{
  width: 200px; /* You can set the dimensions to whatever you want */
  height: 200px;
  object-fit: cover;
}

img.image{
  width: 400px; /* You can set the dimensions to whatever you want */
  height: 300px;
  object-fit: cover;
}

img.icon{
  width: 40px; /* You can set the dimensions to whatever you want */
  height: 40px;
  object-fit: cover;
}
</style>

<script>
export default {
  data() {
    return {
        darkMode: false,
    }
  },
  mounted() {
    // set 'app-background' class to body tag
    let bodyElement = document.body;
    bodyElement.classList.add("app-background");

    // check for active theme
    let htmlElement = document.documentElement;
    let theme = localStorage.getItem("theme");

    if (theme === 'dark') {
        htmlElement.setAttribute('theme', 'dark')
        this.darkMode = true
    } else {
        htmlElement.setAttribute('theme', 'light');
        this.darkMode = false
    }
  },
  watch: {
    darkMode: function () {
        // add/remove class to/from html tag
        let htmlElement = document.documentElement;

        if (this.darkMode) {
            localStorage.setItem("theme", 'dark');
            htmlElement.setAttribute('theme', 'dark');
        } else {
            localStorage.setItem("theme", 'light');
            htmlElement.setAttribute('theme', 'light');
        }
    }
  }
}
</script>