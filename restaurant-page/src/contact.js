// module for creating the contact page
const createContactPage = () => {
	const content = document.querySelector('#content');
	const pageContent = document.createElement('div');
	pageContent.classList.add('page-content');

	const form = document.createElement('form');
	form.classList.add('contact-form');

	const headingInput = document.createElement('input');
	headingInput.type = 'text';
	headingInput.placeholder = 'Enter heading';
	form.appendChild(headingInput);

	const adressInput = document.createElement('input');
	adressInput.type = 'text';
	adressInput.placeholder = 'Enter adress';
	form.appendChild(adressInput);

	const phoneInput = document.createElement('input');
	phoneInput.type = 'text';
	phoneInput.placeholder = 'Enter phone';
	form.appendChild(phoneInput);

	const submitButton = document.createElement('input');
	submitButton.type = 'submit';
	submitButton.value = 'Submit';
	form.appendChild(submitButton);

	pageContent.appendChild(form);
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