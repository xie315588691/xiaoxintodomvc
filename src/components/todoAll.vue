<template>
  <section class="main" v-if="todos.length">
    <input id="toggle-all" class="toggle-all" type="checkbox" :checked="getTodosChecked" @click="handlerToggleClick">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <!-- These are here just to show the structure of the list items -->
      <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
      <li v-for="(item,index) in todos" :key="item.id" :class="{completed:item.done,editing:currentEdit ==item}"
          @dblclick="handleEditTodos(item)">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="item.done">
          <label>{{ item.name }}</label>
          <button class="destroy" @click="handlerTodosRemove(index)"></button>
        </div>
        <input class="edit" :value="item.name" @keydown.enter="handleSaveTodosEnter(item,index,$event)"
               @keydown.esc="handleClearEdit()" @blur="handleSaveTodosEnter(item,index,$event)">
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    props: ['todos', 'getTodosChecked'],
    data() {
      return {
        currentEdit: null,
      }
    },
    compute:{

    },
    methods: {
      handlerTodosRemove(index) {
        this.$emit('removeTodos', index)
      },
      handlerToggleClick(e) {
        const checked = e.target.checked
        this.$emit('toggleChecked', checked)
      },
      handleEditTodos(item) {
        this.currentEdit = item
      },
      handleSaveTodosEnter(item, index, e) {
        const value = e.target.value
        const val = value.trim()
        if (!val) {
          return this.handlerTodosRemove(index)
        }
        item.name = val
        this.currentEdit = null
      },
      handleClearEdit() {
        this.currentEdit = null
      }
    }
  }
</script>

<style scoped>

</style>
