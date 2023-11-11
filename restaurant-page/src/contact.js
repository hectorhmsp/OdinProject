// module for creating the contact page
const createContactPage = () => {
	const content = document.querySelector('#content');
	const pageContent = document.createElement('div');
	pageContent.classList.add('page-content');

	const contact = document.createElement('div');
	const contactUs = document.createElement('p');
	const contactText = document.createElement('p');
	const contactInfo = document.createElement('p');

	contact.appendChild(contactUs);
	contact.appendChild(contactText);
	contact.appendChild(contactInfo);

	contactUs.innerHTML = `Contact us!`;
	contactText.innerHTML = `We'd love to hear from you! At Lorem Ipsum Restaurant,
													 your satisfaction is our top priority. If you have any
													 questions, suggestions, or feedback, please reach out
													 to us through the following channels: 
													 `;
	contactInfo.innerHTML = `Email: loremIpsumRestaurant@gmail.com
													 Phone: (51) 3123-4567
													 Adress: 1234, Seaside Avenue
													 `;

	pageContent.appendChild(contact);
	content.appendChild(pageContent);

	contact.classList.add('contact');
	contactUs.classList.add('contact-item1');
	contactText.classList.add('contact-item');
	contactInfo.classList.add('contact-item');
	
	let footerDiv = document.getElementById('footerDiv');

	if (footerDiv) {
		content.removeChild(footerDiv)
	}

	if (!footerDiv) {
		const footerDiv = document.createElement('div');
		footerDiv.id = 'footerDiv';
		footerDiv.classList.add('footer-div');
		footerDiv.innerHTML = "Source Code"
		content.appendChild(footerDiv);	
	}
}