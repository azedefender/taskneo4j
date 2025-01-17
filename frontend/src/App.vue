<template>
    <div id="app" class="app-container">
        <TodoList />
    </div>
</template>

<script>
import TodoList from './components/TodoList.vue';

export default {
    components: {
        TodoList
    }
};
</script>

<style>
.app-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f2f5;
    font-family: 'Arial', sans-serif;
}

h1 {
    margin: 0;
}
.todo-container {
    max-width: 600px;
    width: 100%;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>