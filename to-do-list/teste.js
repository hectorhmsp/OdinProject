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
