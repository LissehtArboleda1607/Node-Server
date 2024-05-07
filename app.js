import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasks = [];

function addTask(description) {
    tasks.push({ description, completed: false });
}

function completeTask(index) {
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
    }
}

function deleteTask(index) {
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
    }
}

function displayTasks() {
    console.log("Tareas:");
    tasks.forEach((task, index) => {
        const status = task.completed ? chalk.green('Completada') : chalk.red('Pendiente');
        console.log(`${index}. ${task.description} - ${status}`);
    });
}

function promptUser() {
    rl.question('¿Qué deseas hacer? (añadir, completar, eliminar, mostrar, salir): ', (answer) => {
        switch (answer) {
            case 'añadir':
                rl.question('Descripción de la nueva tarea: ', (desc) => {
                    addTask(desc);
                    promptUser();
                });
                break;
            case 'completar':
                rl.question('Índice de la tarea a completar: ', (index) => {
                    completeTask(parseInt(index));
                    promptUser();
                });
                break;
            case 'eliminar':
                rl.question('Índice de la tarea a eliminar: ', (index) => {
                    deleteTask(parseInt(index));
                    promptUser();
                });
                break;
            case 'mostrar':
                displayTasks();
                promptUser();
                break;
            case 'salir':
                rl.close();
                break;
            default:
                console.log('Comando no reconocido.');
                promptUser();
        }
    });
}

promptUser();