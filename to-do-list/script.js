// ADICIONAR O JSON!!


import { format, compareAsc, add } from 'https://cdn.skypack.dev/date-fns';

let projectsDiv, taskDiv, allTasksButton, todayButton, next7Button, importantButton, addProjectButton;

projectsDiv = document.getElementById('projects');
taskDiv = document.getElementById('tasks');

allTasksButton = document.getElementById('allTasksButton');
todayButton = document.getElementById('todayButton');
next7Button = document.getElementById('next7Button');
importantButton = document.getElementById('importantButton');
addProjectButton = document.getElementById('addProjectButton');

const projects = [];

function addProject(name) {
    const newProject = { name, tasks: [] };
    projects.push(newProject);
}

addProjectButton.addEventListener("click", function () {
    const projectName = promptWithMaxLength("Digite o nome do projeto: (máx. 10 caracteres) ", 10);

    if (projectName !== null) { // Executar apenas caso o usuário não clique em "cancelar" no prompt
        addProject(projectName);

        const lastIndex = projects.length - 1; // Armazena o último índice
        const project = createProject(lastIndex); // Passa o último índice como argumento
        projectsDiv.appendChild(project);

        console.log(projects);
    }

});

function getTodayDate() {
    // valor recebido no site: "2024-03-08", string  

    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1;
    let ano = dataAtual.getFullYear();

    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }

    let diaAtual = ano + '-' + mes + '-' + dia;

    return diaAtual;

    //const result = compareAsc(new Date(selectedDate), new Date(diaAtual));
}

let dataSeteDias = add(new Date(getTodayDate()), {
    days: 8,
});
let dataSeteDiasFormat = format(new Date(dataSeteDias), 'yyyy-MM-dd');
console.log('data daqui há 7 dias: ' + dataSeteDiasFormat);

function createProject(index) {
    const project = document.createElement('div');
    project.classList.add('project');

    // Create a new h2 element for the project
    const projectTitle = document.createElement('h2');
    projectTitle.classList.add('project-title');
    projectTitle.textContent = projects[index].name;
    console.log(projectTitle.textContent);

    const deleteProject = document.createElement('div');
    deleteProject.innerText = "deletar";
    deleteProject.classList.add('delete-project');
    deleteProject.addEventListener('click', () => {
        // Encontrar o projeto pai do botão delete
        const projectElement = event.target.closest('.project');

        // Remover o projeto da array
        removeProject(projects.find(project => project.name === projectElement.querySelector('.project-title').textContent));

        // Remover o elemento do DOM
        projectsDiv.removeChild(project);

        const taskHeader = document.querySelector('.task-header');
        const taskHeaderProj = document.querySelector('.task-header-proj');

        if (
            (taskDiv.innerHTML === '') ||
            ((taskHeader !== null) && (taskHeader.innerText === projectTitle.textContent)) ||
            ((taskHeaderProj !== null) && (taskHeaderProj.innerText === projectTitle.textContent))
        ) {
            taskDiv.innerHTML = '';
            console.log(projects);
        } else if (taskHeader.innerText === 'All Tasks') {
            allTasksButton.click(); console.log('dentro do task');
        } else if (taskHeader.innerText === 'Today!') {
            todayButton.click();
        } else if (taskHeader.innerText === 'Next 7 days') {
            next7Button.click();
        } else if (taskHeader.innerText === 'Important!') {
            importantButton.click();
        }
    });

    // Append the title and the delete-button to the project div
    project.appendChild(projectTitle);
    project.appendChild(deleteProject);

    projectTitle.addEventListener('click', () => addTask(projectTitle.textContent, projectTitle));

    return project;
}

function addTask(projectName, projectTitle) {

    // Clear existing content in taskDiv
    taskDiv.innerHTML = '';

    const taskHeader = document.createElement('h1');
    taskHeader.classList.add('task-header-proj');
    taskHeader.textContent = projectName;

    // Create a new div for "(edit)"
    const editDiv = document.createElement('div');
    editDiv.textContent = '(edit)';
    editDiv.classList.add('edit-project');
    editDiv.addEventListener('click', () => {
        const project = projects.find(proj => proj.name === projectName);
        if (project) {
            const newProjectName = promptWithMaxLength("Digite o novo nome do projeto: (máx. 10 caracteres) ", 10);
            if (newProjectName !== null) {
                taskHeader.textContent = newProjectName;
                projectTitle.textContent = newProjectName;
                project.name = newProjectName;
            }
        }
    });

    // Create a new div for "Add Task"
    const addTaskDiv = document.createElement('div');
    addTaskDiv.classList.add('add-task');
    addTaskDiv.id = 'addTask';
    addTaskDiv.textContent = '+ Add Task';
    addTaskDiv.addEventListener('click', () => {
        const project = projects.find(proj => proj.name === projectName);
        if (project) {
            const newTask = prompt("Digite a nova tarefa: ");
            if (newTask) {
                // adicionei o "isTaskWithinSevenDays"
                const newTaskObject = { task: newTask, taskDate: null, isTaskImportant: false, isTaskWithinSevenDays: false };
                project.tasks.push(newTaskObject);

                // Adiciona um "important" button
                const importantTask = document.createElement('div');
                importantTask.classList.add('important-task');
                importantTask.textContent = 'A TASK NÃO É IMPORTANTE!';
                importantTask.addEventListener('click', () => {
                    if (newTaskObject.isTaskImportant !== undefined) {
                        newTaskObject.isTaskImportant = !newTaskObject.isTaskImportant;
                        console.log(`A tarefa atual é importante: ${newTaskObject.isTaskImportant}`);

                        if (newTaskObject.isTaskImportant) {
                            importantTask.textContent = 'A TASK É IMPORTANTE!';
                        } else {
                            importantTask.textContent = 'A TASK NÃO É IMPORTANTE!';
                        }
                    }
                });

                // Adiciona um "remove-task"
                const removeTask = document.createElement('div');
                removeTask.textContent = '(remove-task)';
                removeTask.classList.add('remove-task');
                removeTask.addEventListener('click', () => {
                    taskDiv.removeChild(newDiv);
                    taskDiv.removeChild(editTask);
                    taskDiv.removeChild(dateInput);
                    taskDiv.removeChild(importantTask);

                    const taskIndex = project.tasks.indexOf(newTaskObject);

                    if (taskIndex !== -1) { project.tasks.splice(taskIndex, 1) }

                    taskDiv.removeChild(removeTask);
                });

                // Adiciona um "edit-task"
                const editTask = document.createElement('div');
                editTask.textContent = '(edit task)';
                editTask.classList.add('edit-task');
                editTask.addEventListener('click', () => {
                    const editTaskPrompt = prompt("Edite o nome da tarefa: ");

                    if (editTaskPrompt !== null) {
                        newDiv.textContent = editTaskPrompt;
                        newTaskObject.task = editTaskPrompt;
                    }
                });

                // Adiciona a nova task
                const newDiv = document.createElement('div');
                newDiv.textContent = newTask;

                // Adiciona o "no-date"
                const dateInput = document.createElement('input');
                dateInput.type = 'date';
                dateInput.addEventListener('change', () => {
                    // Acesse a data selecionada usando o valor do campo
                    const selectedDate = dateInput.value;

                    // Atualize a data no objeto da tarefa
                    newTaskObject.taskDate = selectedDate;

                    let firstCompare = compareAsc(new Date(selectedDate), new Date(getTodayDate()));

                    if (firstCompare === 0) {
                        newTaskObject.isTaskWithinSevenDays = true;
                    } else if (firstCompare === 1 || firstCompare === 0) {
                        let secondCompare = compareAsc(new Date(dataSeteDiasFormat), new Date(selectedDate));
                        newTaskObject.isTaskWithinSevenDays = true;
                        if (secondCompare === 1 || secondCompare === 0) {
                            console.log('a data está dentro dos 7 dias!');
                            newTaskObject.isTaskWithinSevenDays = true;
                        } else {
                            newTaskObject.isTaskWithinSevenDays = false;
                        }
                    } else {
                        newTaskObject.isTaskWithinSevenDays = false;
                    }

                });

                taskDiv.appendChild(newDiv);
                taskDiv.appendChild(editTask);
                taskDiv.appendChild(dateInput);
                taskDiv.appendChild(removeTask);
                taskDiv.appendChild(importantTask);

            }
        }
    });

    // Create a separate div for each task
    const addedTaskDiv = document.createElement('div');
    addedTaskDiv.classList.add('task-div')

    // Append the elements to addedTaskDiv
    addedTaskDiv.appendChild(taskHeader);
    addedTaskDiv.appendChild(editDiv);
    addedTaskDiv.appendChild(addTaskDiv);

    // Append the addedTaskDiv to the taskDiv
    taskDiv.appendChild(addedTaskDiv);

    const project = projects.find(proj => proj.name === projectName);
    if (project && project.tasks.length > 0) {
        project.tasks.forEach((task, taskIndex) => {
            const newTaskDiv = document.createElement('div');
            newTaskDiv.textContent = task.task;
            newTaskDiv.classList.add('task');

            // Adiciona um novo "edit-task"
            const newEditTask = document.createElement('div');
            newEditTask.textContent = '(edit task)';
            newEditTask.classList.add('new-edit-task');
            newEditTask.addEventListener('click', () => {
                // Lógica para edição ou outras ações desejadas ao clicar na tarefa	
                const editTaskPrompt = prompt("Edite o nome da tarefa: ");

                if (editTaskPrompt !== null) {
                    newTaskDiv.textContent = editTaskPrompt;
                    project.tasks[taskIndex].task = editTaskPrompt;
                }
            });

            // Adiciona um "important" button
            const newImportantTask = document.createElement('div');
            newImportantTask.classList.add('new-important-task');

            if (project.tasks[taskIndex].isTaskImportant) {
                newImportantTask.textContent = 'A TASK É IMPORTANTE!';
            } else {
                newImportantTask.textContent = 'A TASK NÃO É IMPORTANTE!';
            }

            newImportantTask.addEventListener('click', () => {
                if (project.tasks[taskIndex].isTaskImportant !== undefined) {
                    project.tasks[taskIndex].isTaskImportant = !project.tasks[taskIndex].isTaskImportant;
                    console.log(`A tarefa atual é importante: ${project.tasks[taskIndex].isTaskImportant}`);

                    if (project.tasks[taskIndex].isTaskImportant) {
                        newImportantTask.textContent = 'A TASK É IMPORTANTE!';
                    } else {
                        newImportantTask.textContent = 'A TASK NÃO É IMPORTANTE!';
                    }
                }
            });

            const newDateInput = document.createElement('input');
            newDateInput.type = 'date';
            if (task.taskDate) { newDateInput.value = task.taskDate };
            newDateInput.addEventListener('change', () => {
                // Acesse a data selecionada usando o valor do campo
                const selectedDate = newDateInput.value;

                // Atualize a data no objeto da tarefa
                project.tasks[taskIndex].taskDate = selectedDate;


                let firstCompare = compareAsc(new Date(selectedDate), new Date(getTodayDate()));

                if (firstCompare === 0) {
                    task.isTaskWithinSevenDays = true;
                } else if (firstCompare === 1 || firstCompare === 0) {
                    let secondCompare = compareAsc(new Date(dataSeteDiasFormat), new Date(selectedDate));
                    task.isTaskWithinSevenDays = true;
                    if (secondCompare === 1 || secondCompare === 0) {
                        console.log('a data está dentro dos 7 dias!');
                        task.isTaskWithinSevenDays = true;
                    } else {
                        task.isTaskWithinSevenDays = false;
                    }
                } else {
                    console.log('a data selecionada está no passado!');
                    task.isTaskWithinSevenDays = false;
                }

                console.log('Data selecionada:', selectedDate);

            });

            // Adiciona um novo "remove-task"
            const newRemoveTask = document.createElement('div');
            newRemoveTask.textContent = '(remove-task)';
            newRemoveTask.classList.add('new-remove-task');
            newRemoveTask.addEventListener('click', () => {
                taskDiv.removeChild(newTaskDiv);
                taskDiv.removeChild(newEditTask);
                taskDiv.removeChild(newDateInput);
                taskDiv.removeChild(newImportantTask);

                project.tasks.splice(taskIndex, 1);

                taskDiv.removeChild(newRemoveTask);
            });

            taskDiv.appendChild(newTaskDiv);
            taskDiv.appendChild(newEditTask);
            taskDiv.appendChild(newDateInput);
            taskDiv.appendChild(newRemoveTask);
            taskDiv.appendChild(newImportantTask);

        });
    }


}

function removeProject(project) {
    const projectIndex = projects.indexOf(project);

    if (projectIndex !== -1) {
        projects.splice(projectIndex, 1);
    }
}

function promptWithMaxLength(message, maxLength) {
    let userInput;

    do {
        userInput = prompt(message);
        if (userInput && userInput.length > maxLength) {
            alert(`O texto não pode ter mais que ${maxLength} caracteres. Por favor, tente novamente.`);
        }
    } while (userInput && userInput.length > maxLength);

    return userInput;
}

function createNoTasksYay() {
    const noTasksMessage = document.createElement('h2');
    noTasksMessage.textContent = 'Yay, no tasks!';
    taskDiv.appendChild(noTasksMessage);
}

function buttonClickFirst(name) {
    // Limpa o conteúdo atual em taskDiv
    taskDiv.innerHTML = '';

    let taskHeader = document.createElement('h1');
    taskHeader.classList.add('task-header');
    taskHeader.textContent = `${name}`;
    taskHeader.id = `${name}-id`;

    taskDiv.appendChild(taskHeader);
}

function buttonClickForEach(checkWithinSevenDays) {

    let tasksExist = false;
    let taskHeader = document.querySelector('.task-header');

    projects.forEach(project => {
        project.tasks.forEach(task => {
            if (
                (!checkWithinSevenDays) ||
                (checkWithinSevenDays && task.isTaskWithinSevenDays && taskHeader.innerText === "Next 7 days") ||
                (checkWithinSevenDays && task.taskDate === getTodayDate() && taskHeader.innerText === "Today!") ||
                (task.isTaskImportant && taskHeader.innerText === "Important!")
            ) {
                // Adiciona elementos HTML para cada tarefa
                const newDiv = document.createElement('div');
                newDiv.textContent = task.task;

                const editTask = document.createElement('div');
                editTask.textContent = '(edit task)';
                editTask.classList.add('edit-task');
                editTask.addEventListener('click', () => {
                    const editTaskPrompt = prompt("Edite o nome da tarefa: ");

                    if (editTaskPrompt !== null) {
                        newDiv.textContent = editTaskPrompt;
                        task.task = editTaskPrompt;
                    }
                });

                const dateInput = document.createElement('input');
                dateInput.type = 'date';
                dateInput.value = task.taskDate || '';
                dateInput.addEventListener('change', () => {
                    const selectedDate = dateInput.value;
                    task.taskDate = selectedDate;
                    console.log('Data selecionada:', selectedDate);

                    let firstCompare = compareAsc(new Date(selectedDate), new Date(getTodayDate()));

                    let taskHeader = document.querySelector('.task-header');

                    if (taskHeader.textContent === 'Next 7 days') {
                        if (firstCompare === 0) {
                            task.isTaskWithinSevenDays = true;
                        } else if (firstCompare === 1 || firstCompare === 0) {
                            let secondCompare = compareAsc(new Date(dataSeteDiasFormat), new Date(selectedDate));
                            task.isTaskWithinSevenDays = true;

                            if (secondCompare === 1 || secondCompare === 0) {
                                console.log('a data está dentro dos 7 dias!');
                                task.isTaskWithinSevenDays = true;
                            } else {
                                task.isTaskWithinSevenDays = false;
                                taskDiv.removeChild(newDiv);
                                taskDiv.removeChild(editTask);
                                taskDiv.removeChild(dateInput);
                                taskDiv.removeChild(importantTask);
                                taskDiv.removeChild(removeTask);
                            }
                        } else {
                            task.isTaskWithinSevenDays = false;
                            createNoTasksYay();

                            taskDiv.removeChild(newDiv);
                            taskDiv.removeChild(editTask);
                            taskDiv.removeChild(dateInput);
                            taskDiv.removeChild(importantTask);
                            taskDiv.removeChild(removeTask);

                            console.log('a data selecionada está no passado!');
                        }
                    }
                    else if (taskHeader.textContent === 'All Tasks') {
                        if (firstCompare === 0) {
                            task.isTaskWithinSevenDays = true;
                        } else if (firstCompare === 1 || firstCompare === 0) {
                            let secondCompare = compareAsc(new Date(dataSeteDiasFormat), new Date(selectedDate));
                            task.isTaskWithinSevenDays = true;

                            if (secondCompare === 1 || secondCompare === 0) {
                                console.log('a data está dentro dos 7 dias!');
                                task.isTaskWithinSevenDays = true;
                            } else {
                                task.isTaskWithinSevenDays = false;
                            }
                        } else {
                            task.isTaskWithinSevenDays = false;
                            console.log('a data selecionada está no passado!');
                        }
                    }
                    else if (taskHeader.textContent === "Today!") {
                        if (firstCompare === 0) {
                            task.isTaskWithinSevenDays = true;
                        } else {
                            task.isTaskWithinSevenDays = false;
                            taskDiv.removeChild(newDiv);
                            taskDiv.removeChild(editTask);
                            taskDiv.removeChild(dateInput);
                            taskDiv.removeChild(importantTask);
                            taskDiv.removeChild(removeTask);
                        }
                    }
                    else if (taskHeader.textContent === "Important!") {
                        if (firstCompare === 0) {
                            task.isTaskWithinSevenDays = true;
                        } else {
                            task.isTaskWithinSevenDays = false;
                        }
                    }

                });

                const removeTask = document.createElement('div');
                removeTask.textContent = '(remove-task)';
                removeTask.classList.add('remove-task');
                removeTask.addEventListener('click', () => {
                    taskDiv.removeChild(newDiv);
                    taskDiv.removeChild(editTask);
                    taskDiv.removeChild(dateInput);
                    taskDiv.removeChild(importantTask);

                    const taskIndex = project.tasks.indexOf(task);
                    if (taskIndex !== -1) { project.tasks.splice(taskIndex, 1) }

                    taskDiv.removeChild(removeTask);
                });

                const importantTask = document.createElement('div');
                importantTask.classList.add('important-task');

                if (task.isTaskImportant) {
                    importantTask.textContent = 'A TASK É IMPORTANTE!';
                } else {
                    importantTask.textContent = 'A TASK NÃO É IMPORTANTE!';
                }

                importantTask.addEventListener('click', () => {
                    if (task.isTaskImportant !== undefined) {
                        task.isTaskImportant = !task.isTaskImportant;
                        console.log(`A tarefa atual é importante: ${task.isTaskImportant}`);

                        if (task.isTaskImportant) {
                            importantTask.textContent = 'A TASK É IMPORTANTE!';
                        } else {
                            importantTask.textContent = 'A TASK NÃO É IMPORTANTE!';
                        }
                    }

                    const taskHeader = document.querySelector('.task-header');

                    if (
                        ((taskHeader !== null) && (task.isTaskImportant === false) && (taskHeader.textContent === "Important!"))
                    ) {
                        console.log(task.isTaskImportant);
                        console.log('deu merda...');
                        taskDiv.removeChild(newDiv);
                        taskDiv.removeChild(editTask);
                        taskDiv.removeChild(dateInput);
                        taskDiv.removeChild(importantTask);
                        taskDiv.removeChild(removeTask);
                    }
                });

                taskDiv.appendChild(newDiv);
                taskDiv.appendChild(editTask);
                taskDiv.appendChild(dateInput);
                taskDiv.appendChild(removeTask);
                taskDiv.appendChild(importantTask);

                tasksExist = true;
            };
        });
    });

    if (!tasksExist) {
        createNoTasksYay();
    };

}

allTasksButton.addEventListener('click', () => {
    buttonClickFirst('All Tasks');
    buttonClickForEach(false);
});

next7Button.addEventListener('click', () => {
    buttonClickFirst('Next 7 days');
    buttonClickForEach(true);
});

todayButton.addEventListener('click', () => {
    buttonClickFirst('Today!');
    buttonClickForEach(true);
});

importantButton.addEventListener('click', () => {
    buttonClickFirst('Important!');
    buttonClickForEach(true);
});