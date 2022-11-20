const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector('.tasks-container');


// Começo da validação do input
const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputIsValid = validateInput();

    if (!inputIsValid) {
        return inputElement.classList.add('error');
    }

    // Criação da div task-item com o paragrafo dentro
    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerText = inputElement.value;

    // Marcar a terefa como concluida
    taskContent.addEventListener('click', () => handleClick(taskContent));


    const deleteItem = document.createElement('i');
    deleteItem.classList.add('far');
    deleteItem.classList.add('fa-trash-alt');
    deleteItem.classList.add('delete-task-button');
    // Deletar uma tarefa da lista
    deleteItem.addEventListener('click', () => handleDelete(taskItemContainer, taskContent));

    // Adicionando a div e o conteudo dentro de task item.
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);
    // Limpando o Input
    inputElement.value = "";

    updateLocalStorage();
};

// Lógica usada -> faz um for pra div task itens que é criada
// quando uma tarefa é adicionada, compara pra ver se a mesma
// clicada é a mesma que foi digitada, se for, altera pra completada
// ou remove da div.
const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
        if (currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle('completed');
        }
    }

    updateLocalStorage();
};

const handleDelete = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
        if (currentTaskIsBeingClicked) {
            taskItemContainer.remove();
        }
    }

    updateLocalStorage();
};

const handleInputChange = () => {
    const inputIsValid = validateInput();

    if(inputIsValid) {
        return inputElement.classList.remove('error');
    }
};
// Termino da validação do input

// Colocando localStorage

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;

    const localStorageTasks = [ ... tasks].map((task) => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed');

        return {description: content.innerText, isCompleted };
    });

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    if(!tasksFromLocalStorage) return;

    for (const task of tasksFromLocalStorage) {
        const taskItemContainer = document.createElement('div');
        taskItemContainer.classList.add('task-item');
    
        const taskContent = document.createElement('p');
        taskContent.innerText = task.description;

        if(task.isCompleted) {
            taskContent.classList.add('completed');
        }
    
        taskContent.addEventListener('click', () => handleClick(taskContent));
    
    
        const deleteItem = document.createElement('i');
        deleteItem.classList.add('far');
        deleteItem.classList.add('fa-trash-alt');
        deleteItem.classList.add('delete-task-button');
        deleteItem.addEventListener('click', () => handleDelete(taskItemContainer, taskContent));
    
        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
    
        tasksContainer.appendChild(taskItemContainer);
    };
};

refreshTasksUsingLocalStorage();

// Fim do localStorage

addTaskButton.addEventListener('click', () => handleAddTask());

inputElement.addEventListener('change', () => handleInputChange());