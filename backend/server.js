const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const neo4j = require('neo4j-driver');

const app = express();
const port = 3000;

// Настройка базы данных Neo4j
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('username', 'password'));
const session = driver.session();

app.use(cors());
app.use(bodyParser.json());

// Обработчик корневого маршрута
app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

// Получение списка задач
app.get('/tasks', async (req, res) => {
    try {
        const result = await session.run('MATCH (t:Task) RETURN t');
        const tasks = result.records.map(record => record.get('t').properties);
        res.json(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Добавление новой задачи
app.post('/tasks', async (req, res) => {
    const { title } = req.body;
    try {
        await session.run('CREATE (t:Task {title: $title, completed: false})', { title });
        res.status(201).send('Task added');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Изменение статуса задачи
app.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        await session.run('MATCH (t:Task) WHERE id(t) = $id SET t.completed = $completed', { id: parseInt(id), completed });
        res.send('Task updated');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Удаление задачи
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await session.run('MATCH (t:Task) WHERE id(t) = $id DELETE t', { id: parseInt(id) });
        res.send('Task deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
