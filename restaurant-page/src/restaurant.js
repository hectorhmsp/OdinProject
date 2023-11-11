// restaurant.js

const createRestaurantHomePage = () => {
	const content = document.getElementById('content');
	const pageContent = document.createElement('div');
	pageContent.classList.add('page-content');

	// Create and append headline element
	const headline = document.createElement('h1');
	headline.textContent = 'Tempero do Brasil';
	headline.classList.add('headline');
	pageContent.appendChild(headline);

	// Create and append copy element
	const copy = document.createElement('p');

	copy.textContent = `Comidas tipicamente brasileiras, regionais, preparadas na hora! 
											`;

	copy.classList.add('copy');
	pageContent.appendChild(copy);

	content.appendChild(pageContent);

	let footerDiv = document.getElementById('footerDiv');

	if (!footerDiv) {
		const footerDiv = document.createElement('div');
		footerDiv.id = 'footerDiv';
		footerDiv.classList.add('footer-div');
		footerDiv.innerHTML = `Source Code`;
		content.appendChild(footerDiv);	
	}
}
