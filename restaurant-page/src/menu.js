const createMenuPage = () => {

	const content = document.querySelector('#content');
	const pageContent = document.createElement('div');
	pageContent.classList.add('page-content');

	const heading = document.createElement('h1');
	heading.textContent = 'Our Menu';

	const menuList = document.createElement('ul');
	const menuItem1 = document.createElement('li');
	menuItem1.textContent = 'Pomodoro';
	const menuItem2 = document.createElement('li');
	menuItem2.textContent = 'Bolognesa';
	const menuItem3 = document.createElement('li');
	menuItem3.textContent = 'Alfredo';
	menuList.appendChild(menuItem1);
	menuList.appendChild(menuItem2);
	menuList.appendChild(menuItem3);

	pageContent.appendChild(heading);
	pageContent.appendChild(menuList);
	content.appendChild(pageContent); 

	let footerDiv = document.getElementById('footerDiv');

	if (footerDiv) {
		content.removeChild(footerDiv)
	}

	if (!footerDiv) {
		const footerDiv = document.createElement('div');
		footerDiv.id = 'footerDiv';
		footerDiv.classList.add('footer-div');
		content.appendChild(footerDiv);	
	}
}