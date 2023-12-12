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


let isProjectFormVisible = false;

function addProject() {
    
	if (!isProjectFormVisible ) {
	    // Create the project form element
	    const projectForm = document.createElement('form');
	    projectForm.classList.add('add-project-form');
	    projectForm.id = 'addProjectForm';

	    projectForm.innerHTML = `
	        <input class="input" type="text" id="title" placeholder="Title" required maxlength="100" />        
	        <button class="add-button">Add</button>
	        <button class="cancel-button">Cancel</button>
	    `;

	    // Append the project form element to the projectsDiv
	    projectsDiv.appendChild(projectForm);

	    // Get references to elements within the project form
	    const titleInput = projectForm.querySelector('#title');

	    // Add click event for the "Add" button
	    projectForm.querySelector('.add-button').addEventListener('click', () => {
	        const inputValue = titleInput.value;

	        // Create a new project element
	        const project = document.createElement('div');
	        project.classList.add('project');
	        
	        // Create a new h2 element for the project
	        const projectTitle = document.createElement('h2');
	        projectTitle.classList.add('project-title');
	        projectTitle.textContent = inputValue;

	        // Update the taskDiv when clicking on the project title
	        projectTitle.addEventListener('click', () => {
	        	
				// Create a new h2 element
				const taskHeader = document.createElement('h2');
				taskHeader.textContent = inputValue;

				// Create a new div for "(edit)"
				const editDiv = document.createElement('div');
				editDiv.textContent = '(edit)';

				// Create a new div for "Add Task"
				const addTaskDiv = document.createElement('div');
				addTaskDiv.classList.add('add-task');
				addTaskDiv.id = 'addTask';
				addTaskDiv.textContent = '+ Add Task';

				// Create a separate div for each task
				const addedTaskDiv = document.createElement('div'); 
				addedTaskDiv.classList.add('task-div')

				// Append the elements to addedTaskDiv
				addedTaskDiv.appendChild(taskHeader);
				addedTaskDiv.appendChild(editDiv);
				addedTaskDiv.appendChild(addTaskDiv);

				// Append the addedTaskDiv to the taskDiv
				taskDiv.appendChild(addedTaskDiv);

	    	    document.getElementById('addTask').addEventListener('click', () => {
	    	    	if (!addedTaskDiv.querySelector('.added-task')) {
		    	    	const taskAdded = document.createElement('h2');
		    	    	taskAdded.textContent = 'Task Added!';
		    	    	taskAdded.classList.add('added-task');
			    	
		    	    	addedTaskDiv.appendChild(taskAdded);
	    	    	}
		    	});


	        });

	        // Create a new delete button for each project
	        const deleteProject = document.createElement('div');
	        deleteProject.classList.add('delete-project');
	        deleteProject.addEventListener('click', () => {
	            projectsDiv.removeChild(project);
	            taskDiv.innerHTML = ``;
	        });

	        // Append elements to their respective containers
	        project.appendChild(projectTitle);
	        project.appendChild(deleteProject);

	        // Add the project to the projectsDiv
	        projectsDiv.appendChild(project);

	        // Remove the project form from projectsDiv
	        projectsDiv.removeChild(projectForm);
	        isProjectFormVisible = false;

	    });

	    // Add click event for the "Cancel" button
	    projectForm.querySelector('.cancel-button').addEventListener('click', () => {
	        projectsDiv.removeChild(projectForm);
	        isProjectFormVisible  = false;
	    });	

	    isProjectFormVisible = true;	

	}

}

