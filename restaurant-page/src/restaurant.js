// restaurant.js

const createRestaurantHomePage = () => {
	const content = document.getElementById('content');
	const pageContent = document.createElement('div');
	pageContent.classList.add('page-content');

	// Create and append headline element
	const headline = document.createElement('h1');
	headline.textContent = 'Welcome to our restaurant!';
	headline.classList.add('headline');
	pageContent.appendChild(headline);

	// Create and append copy element
	const copy = document.createElement('p');

	copy.textContent = `Lorem ipsum dolor sit amet,						
											consectetur adipiscing elit. 
											Suspendisse maximus nulla vitae tortor rutrum fermentum.
											Nunc ac dignissim dui. Maecenas rhoncus hendrerit consectetur. 
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
