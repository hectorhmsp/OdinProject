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

	contactUs.innerHTML = `Fale conosco!`;
	contactText.innerHTML = `Adorariamos ouvir você! Aqui no Tempero do Brasil, sua satisfação 
													 é nossa maior prioridade! Se você possui qualquer dúvida,
													 sugestões, ou feedback, por favor, nos contate através dos seguintes
													 canais:
													 `;
	contactInfo.innerHTML = `Email: TemperoDoBrasil@gmail.com <br>
													 Telefone: (51) 3123-4567 <br>
													 Endereço: 1234, Avenida Fictícia
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