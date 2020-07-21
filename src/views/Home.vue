<template>
  <div class="Home">
    <header>
      <div>
        <img alt="logo" src="@/assets/logo.png" width="350" height="auto">
      </div>
      <blockquote>
        <p>
          <b>mai-tools</b> is a collection of useful tools for
          <b>maimai</b> and <b>maimai DX</b>.
        </p>
      </blockquote>
    </header>
    <main>
      <div>
        <h3><router-link :to="{ name: 'score-calc' }">Score Calculator</router-link></h3>
        <span>
          An utility that can be used to calculate score and achievement for maimai players.
        </span>
      </div>
      <div>
        <h3>More utils</h3>
        <span>
          <i>Coming soon...</i>
        </span>
      </div>
    </main>
    <footer>
      <b>mai-tools</b> is created and maintained by
      <a href="https://github.com/zetaraku" target="_blank" rel="noopener">Raku Zeta</a>.
    </footer>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
header, main, footer {
  margin-bottom: 20px;
  padding: 10px;
}
</style>
