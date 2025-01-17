<template>
    <div class="todo-container">
        <h1 class="todo-title">Todo List</h1>
        <form @submit.prevent="addTask" class="todo-form">
            <input v-model="newTask" placeholder="Add new task" required class="task-input" />
            <button type="submit" class="add-button">Add</button>
        </form>
        <ul class="task-list">
            <li v-for="task in tasks" :key="task.id" class="task-item">
                <input type="checkbox" v-model="task.completed" @change="updateTask(task)" class="task-checkbox" />
                <span :class="{ completed: task.completed }">{{ task.title }}</span>
                <button @click="deleteTask(task.id)" class="delete-button">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            tasks: [],
            newTask: ''
        };
    },
    methods: {
        async fetchTasks() {
            try {
                const response = await axios.get('http://localhost:3000/tasks');
                this.tasks = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async addTask() {
            try {
                await axios.post('http://localhost:3000/tasks', { title: this.newTask });
                this.newTask = '';
                this.fetchTasks();
            } catch (error) {
                console.error(error);
            }
        },
        async updateTask(task) {
            try {
                await axios.patch(`http://localhost:3000/tasks/${task.id}`, { completed: task.completed });
            } catch (error) {
                console.error(error);
            }
        },
        async deleteTask(id) {
            try {
                await axios.delete(`http://localhost:3000/tasks/${id}`);
                this.fetchTasks();
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.fetchTasks();
    }
};
</script>

<style scoped>
.todo-container {
    max-width: 600px;
    width: 100%;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.todo-title {
    margin-bottom: 20px;
}

.task-input {
    width: calc(100% - 100px);
    padding: 10px;
    margin-right: 10px;
}

.add-button {
    padding: 10px;
}

.task-list {
    list-style-type: none;
    padding: 0;
}

.task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.delete-button {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}
</style>
