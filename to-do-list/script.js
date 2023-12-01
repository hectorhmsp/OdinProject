// >> ‘todos’ are going to be objects that you’ll want to dynamically create, either using factories or constructors/classes to generate them.
// >> they should have a title, description, dueDate and priority. You might also want to include notes or even a checklist.
// >> list should have projects or separate lists of todo's. 
// >> When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put.
// >> Users should be able to create new projects and choose which project their todos go into.
// >> You should separate your application logic (i.e. creating new todos, setting todos as complete, etc.) from the DOM-related stuff,
//  	so keep all of those things in separate modules/files
// >> The look of the User Interface is up to you, but it should be able to do the following:
//		view all projects
//		view all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)
//		expand a single todo to see/edit its details
//		delete a todo
// >> You should add some persistence to this todo app using the localStorage
// >> Make sure your app doesn’t crash if the data you may want to retrieve from localStorage isn’t there!

projectsDiv = document.getElementById('projects');
taskDiv = document.getElementById('tasks');

allTasksButton = document.getElementById('allTasksButton');
todayButton = document.getElementById('todayButton');
next7Button = document.getElementById('next7Button');
importantButton = document.getElementById('importantButton');
addProjectButton = document.getElementById('addProjectButton');

addProjectButton.addEventListener('click', addProject);


document.addEventListener('submit', (event) => {
    // Check if the submitted form is the addProjectForm
    if (event.target.matches('.addProjectForm')) {
        event.preventDefault(); // Prevent the default form submission behavior
        // Add your logic for handling the form data here
    }
});


function addProject() {
    // Create the project element
    const project = document.createElement('div');
    project.classList.add('project');

    project.innerHTML = `
        <form class="addProjectForm" id="addProjectForm">
            <input class="input" type="text" id="title" placeholder="Title" required maxlength="100" />        
            <button class="add-button">Add</button>
            <button class="cancel-button">Cancel</button>
        </form>
    `;

    // Append the project element to the projectsDiv
    projectsDiv.appendChild(project);

    // Get references to elements within the project
    const titleInput = project.querySelector('#title');

    // Add click event for the "Add" button
    project.querySelector('.add-button').addEventListener('click', () => {
        const inputValue = titleInput.value;
        const newElement = document.createElement('h2');
        newElement.textContent = inputValue;

        // Create a new delete button for each project
        const deleteProject = document.createElement('div');
        deleteProject.classList.add('delete-project');
        deleteProject.addEventListener('click', () => {
            projectsDiv.removeChild(project);
            taskDiv.removeChild(newElement);
        });

        // Append elements to their respective containers
        taskDiv.appendChild(newElement);
        project.innerHTML = `<h2>${inputValue}</h2>`;
        project.appendChild(deleteProject);

        // Remove the Add and Cancel buttons
        const addButton = project.querySelector('.add-button');
        const cancelButton = project.querySelector('.cancel-button');

    });

    // Add click event for the "Cancel" button
    project.querySelector('.cancel-button').addEventListener('click', () => {
        projectsDiv.removeChild(project);
    });
}






