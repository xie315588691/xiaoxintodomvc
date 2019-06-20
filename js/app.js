(function (window) {
	window.app = new Vue({
		el: '#app',
		data: {
			todos: JSON.parse(window.localStorage.getItem('xiaoxinTodos') || '[]'),
			name: '',
			currentEditing: null,
			filterText: ''
		},
		computed: {
			remainingCount() {
				return this.todos.filter(item => {
					return item.done == false;
				}).length
			},
			hiddeCompuleted() {
				return this.todos.some((item) => {
					return item.done == true;
				})
			},
			toggleAllState: {
				get() {
					return this.todos.every(item => {
						return item.done == true;
					})
				},
				set() {
					const checked = !this.toggleAllState;
					this.todos.forEach(item => {
						item.done = checked;
					})
				}
			},
			filterTodos() {
				if (this.filterText == 'active') {
					return this.todos.filter(item => {
						return item.done == false;
					})
				} else if (this.filterText == 'completed') {
					return this.todos.filter(item => {
						return item.done == true;
					})
				} else {
					return this.todos;
				}
			}
		},
		watch: {
			todos: {
				handler: function (val, oldVal) {
					window.localStorage.setItem('xiaoxinTodos', JSON.stringify(val))
				}
				,
				deep: true
			}
			,
		}
		,
		methods: {
			handleTodosRemoveClick(index) {
				this.todos.splice(index, 1);
			}
			,
			handleTodosAdd() {
				var id = this.todos.length > 0 ? parseInt(this.todos[this.todos.length - 1].id) + 1 : 1;
				this.todos.push({
					"id": id,
					"name": this.name,
					"done": false
				})
				window.localStorage.setItem('xiaoxinTodos', JSON.stringify(this.todos))
				this.name = ''
			}
			,
			handleEditTodos(item) {
				this.currentEditing = item;
			}
			,
			handleSaveEdit(item, index, e) {
				var target = e.target;
				var val = target.value.trim();
				if (!val) {
					this.todos.splice(index, 1);
				} else {
					item.name = val;
					this.currentEditing = null
				}
			}
			,
			handleEscEdit() {
				this.currentEditing = null
			}
			,
			handleClearClick() {
				this.todos = this.todos.filter(item => {
					return item.done == false;
				})
			}
		}
	})

	window.onhashchange = function () {
		hashChange();
	}

	function hashChange() {
		window.app.filterText = window.location.hash.substr(2);
	}

	hashChange();
})(window);
