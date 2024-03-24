function addImportantTask (isTaskImportant) {
    const importantTask = document.createElement('div');
    importantTask.classList.add('important-task');
    

    // essa parte precisa ser adaptada:
    if (isTaskImportant) {
        importantTask.innerHTML = `<img src="star_filled.svg" alt="Ícone SVG" class="star-filled-svg" />`;
    } else {
        importantTask.innerHTML = `<img src="star_empty.svg" alt="Ícone SVG" class="star-empty-svg" />`;
    }

    importantTask.addEventListener('click', () => {
        if (isTaskImportant !== undefined) {
            isTaskImportant = !isTaskImportant;
            console.log(`A tarefa atual é importante: ${isTaskImportant}`);

            if (isTaskImportant) {
                importantTask.innerHTML = `<img src="star_filled.svg" alt="Ícone SVG" class="star-filled-svg" />`;
            } else {
                importantTask.innerHTML = `<img src="star_empty.svg" alt="Ícone SVG" class="star-empty-svg" />`;
            }

            saveTasksToLocal();
        }
    });

    return importantTask;
}

function addRemoveTask (task, project, taskDiv, specificTask) {
    const removeTask = document.createElement('div');
    removeTask.innerHTML = `<img src="cancel.svg" alt="Ícone SVG" class="cancel-svg" />`;
    removeTask.classList.add('remove-task');
    removeTask.addEventListener('click', () => {
        const taskIndex = project.tasks.indexOf(task);

        if (taskIndex !== -1) { project.tasks.splice(taskIndex, 1) }

        taskDiv.removeChild(specificTask);
        saveTasksToLocal();
    });  

    return removeTask;
}

function specificTaskAppend(specificTask, div, dateInput, removeTask, importantTask) {
    specificTask.appendChild(div);
    specificTask.appendChild(dateInput);
    specificTask.appendChild(removeTask);
    specificTask.appendChild(importantTask);
}

function specificTaskRemove(specificTask, newDiv, dateInput, importantTask, removeTask) {
    specificTask.removeChild(newDiv);
    specificTask.removeChild(dateInput);
    specificTask.removeChild(importantTask);
    specificTask.removeChild(removeTask);
}