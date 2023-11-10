// restaurant.js

const createRestaurantHomePage = () => {
	const content = document.getElementById('content');
	const pageContent = document.createElement('div');
	pageContent.classList.add('page-content');

	// Create and append image element 
	const image = document.createElement('img');
	// image.src = '...'
	// image.height = '300';
	pageContent.appendChild(image);

	// Create and append headline element
	const headline = document.createElement('h1');
	headline.textContent = 'Welcome to our restaurant!';
	pageContent.appendChild(headline);

	// Create and append copy element
	const copy = document.createElement('p');
	copy.textContent = 'We serve the best food in town!';
	pageContent.appendChild(copy);

	content.appendChild(pageContent);

	let footerDiv = document.getElementById('footerDiv');

	if (!footerDiv) {
		const footerDiv = document.createElement('div');
		footerDiv.id = 'footerDiv';
		footerDiv.classList.add('footer-div');
		content.appendChild(footerDiv);	
	}
}
