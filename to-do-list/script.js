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


function addProject () {

	let editToggle = false; 

	const project = document.createElement('div');
	project.classList.add('project');

	const editProject = document.createElement('div');
	editProject.classList.add('edit-project');
	
	project.appendChild(editProject);

	projectsDiv.appendChild(project);


}



