const createTabs = () => {
	const content = document.querySelector('#content');

	footerDiv = document.getElementById('footerDiv');

	// Create the header div

	const headerDiv = document.createElement('div');
	headerDiv.classList.add('header-div');
	content.appendChild(headerDiv);

	// Create the three divs
	const div1 = document.createElement('div');
	const div2 = document.createElement('div');
	const div3 = document.createElement('div');

	// Set ids for the divs
	div1.setAttribute('id', 'home-btn');
	div2.setAttribute('id', 'menu-btn');
	div3.setAttribute('id', 'contact-btn');

	// Set classes for the divs
	div1.classList.add('tab');
	div2.classList.add('tab');
	div3.classList.add('tab');

	// Set text content for the tabs
	div1.textContent = 'Home';
	div2.textContent = 'Menu';
	div3.textContent = 'Contact';

	// Append the divs to the content div
	headerDiv.appendChild(div1);
	headerDiv.appendChild(div2);
	headerDiv.appendChild(div3);

	div1.addEventListener('click', () => {
		clearContent();
		createRestaurantHomePage();
	})

	div2.addEventListener('click', () => {
		clearContent();
		createMenuPage();
	})

	div3.addEventListener('click', () => {
		clearContent();
		createContactPage();
	})
}

function clearContent() {
	const content = document.querySelector("#content");
	const pageContent = document.querySelector(".page-content");
	let footerDiv = document.getElementById('footerDiv');

	if (footerDiv) {
		content.removeChild(footerDiv);
	}

	if (pageContent) {
		content.removeChild(pageContent);
	}	
}
