<template>
  <div id="app">
    <section class="todoapp">
      <todoHead @addTodosEnter="addTodosEnter"></todoHead>
      <!-- This section should be hidden by default and shown when there are todos -->

      <todoAll :todos="filterTodos" :filterTodos="todos" @removeTodos="removeTodosClick"
               :getTodosChecked=" getTodosChecked"
               @toggleChecked="toggleChecked"></todoAll>
      <!-- This footer should hidden by default and shown when there are todos -->
      <todo-foot :todos="filterTodos" :filterTodos="todos" :filterText="filterText" @hashFilterClick="hashFilterClick"
                 @clearTodosClick="clearTodosClick"></todo-foot>
    </section>
    <AppFoot></AppFoot>

  </div>
</template>

<script>
  import AppFoot from './components/app-footer'
  import todoFoot from './components/todo-foot'
  import todoHead from './components/todo-header'
  import todoAll from './components/todoAll'


  export default {
    components: {
      AppFoot,
      todoFoot,
      todoHead,
      todoAll
    },
    data() {
      return {
        todos: JSON.parse(window.localStorage.getItem('xiaoxinTodos') || '[]'),
        filterText: ''
      }
    },
    watch: {
      todos: {
        handler: function (val, oldVal) {
          window.localStorage.setItem('xiaoxinTodos', JSON.stringify(this.todos))
        },
        deep: true//深度监视
      }
    },
    created() {
      this.filterText = window.location.hash.substr(2)
    },
    computed: {
      getTodosChecked: {
        get() {
          return this.todos.every(item => item.done == true)
        }
      },
      filterTodos() {
        if (this.filterText == 'active') {
          return this.todos.filter(item => item.done == false)
        } else if (this.filterText == 'completed') {
          return this.todos.filter(item => item.done == true)
        } else {
          return this.todos
        }
      }
    },
    methods: {
      removeTodosClick(index) {
        this.todos.splice(index, 1)
      },
      addTodosEnter(value) {
        const id = this.todos.length > 0 ? parseInt(this.todos[this.todos.length - 1].id) + 1 : 1;
        let val = value.trim();
        if (val) {
          this.todos.push({
            id: id,
            name: val,
            done: false
          })
          value = ''
        }
      },
      toggleChecked(checked) {
        this.todos.forEach(item => item.done = checked)
      },
      hashFilterClick(hashText) {
        this.filterText = hashText
      },
      clearTodosClick() {
        this.todos = this.todos.filter(item => item.done == false)
      }
    }
  }
</script>

<style>

</style>
