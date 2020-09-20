<template>
    <div>
        <nav id='resumption'>
        <div id='left'>
          <p>Résumption</p>
        </div>
        <div id='right'>
          <p id='hamburger' v-on:click="hamburgerClick">☰</p>
          <p class="non-ham"><a href="/#/about">About</a></p>
          <p class="non-ham">LinkedIn</p>
          <div :class="hamburgerDetails ? 'behind-ham-show' : 'behind-ham' ">
            <p class="hideable">About</p>
            <p class="hideable">LinkedIn</p>
          </div>
        </div>
      </nav>
        <h2 id='about'>
        Résumption is an application that you can use to track your job search. Its name comes from combining the words <em>résumé</em>, which one can use to apply for jobs, and <em>resume</em>, meaning to continue doing after a hiatus (for example, beginning work after being out of the job market for a while). With both of these things in mind, let's use Résumption!
    </h2>
    </div>
</template>

<script>

export default {
  name: 'About',
  components: {

  }
  
}
</script>

<style>
    #about{
        color:white;
        margin: 1em 30%;
        font-variant-caps: normal;
    }
</style>
