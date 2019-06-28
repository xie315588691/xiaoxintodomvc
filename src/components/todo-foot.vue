<template>
  <footer class="footer" v-if="filterTodos.length">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count"><strong>{{filterTodos.length}}</strong> item left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <a :class="{selected:filterText==''}" href="#/" @click="handleHashClik">All</a>
      </li>
      <li>
        <a href="#/active" :class="{selected:filterText=='active'}" @click="handleHashClik">Active</a>
      </li>
      <li>
        <a href="#/completed" :class="{selected:filterText=='completed'}" @click="handleHashClik">Completed</a>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button class="clear-completed" @click="handleClearTodosClick">Clear completed</button>
  </footer>
</template>

<script>
  export default {
    name: "todo-foot",
    props: ['todos', 'filterText','filterTodos'],
    computed: {},
    methods: {
      handleHashClik(e) {
        const strSub = e.target.href
        const i = strSub.indexOf('#')
        const hashText = strSub.substr(i + 2)
        this.$emit('hashFilterClick', hashText)
      },
      handleClearTodosClick() {
        this.$emit('clearTodosClick')
      }
    }
  }
</script>

<style scoped>

</style>
