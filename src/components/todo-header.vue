<template>
  <header class="header">
    <h1>xiaoxin</h1>
    <input class="new-todo" placeholder="What needs to be done?" @keydown.enter="handleTodosAddClick"
           autofocus>
  </header>
</template>

<script>
  export default {
    name: "todo-header",
    methods: {
      handleTodosAddClick(e) {
        let val = e.target.value
        if (val.trim()) {
          this.$emit('addTodosEnter', val)
        }
        e.target.value = ''
      }
    }
  }
</script>

<style scoped>

</style>
