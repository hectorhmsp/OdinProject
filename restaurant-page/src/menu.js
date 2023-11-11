const createMenuPage = () => {

	const content = document.querySelector('#content');
	const pageContent = document.createElement('div');
	pageContent.classList.add('page-content');

	const heading = document.createElement('h1');
	heading.textContent = 'Nosso Cardápio';

	// Create menu items and add them to the page-content div

	//#region Menu Items
	const menuItems = document.createElement('div');
	menuItems.classList.add('menu-items');

	const menuItem1 = document.createElement('div');
	const menuItem1name = document.createElement('p');
	const menuItem1description = document.createElement('p');
	const menuItem1price = document.createElement('p');
	menuItem1.appendChild(menuItem1name);
	menuItem1.appendChild(menuItem1description);
	menuItem1.appendChild(menuItem1price);
	menuItem1name.textContent = 'Feijoada';
	menuItem1description.innerHTML = 'Cozido típico do Brasil, feito com feijão preto e vários cortes de carne';
	menuItem1price.innerHTML = 'R$ 20';

	const menuItem2 = document.createElement('div');
	const menuItem2name = document.createElement('p');
	const menuItem2description = document.createElement('p');
	const menuItem2price = document.createElement('p');
	menuItem2.appendChild(menuItem2name);
	menuItem2.appendChild(menuItem2description);
	menuItem2.appendChild(menuItem2price);
	menuItem2name.textContent = 'Churrasco';
	menuItem2description.innerHTML = 'Carne assada no estilo brasileiro, com cortes grelhados e acompanhamentos';
	menuItem2price.innerHTML = 'R$ 40';

	const menuItem3 = document.createElement('div');
	const menuItem3name = document.createElement('p');
	const menuItem3description = document.createElement('p');
	const menuItem3price = document.createElement('p');
	menuItem3.appendChild(menuItem3name);
	menuItem3.appendChild(menuItem3description);
	menuItem3.appendChild(menuItem3price);
	menuItem3name.textContent = 'Pão de Queijo';
	menuItem3description.innerHTML = 'Pão de queijo feito com farinha de tapioca, originário de Minas Gerais, Brasil';
	menuItem3price.innerHTML = 'R$ 20';

	const menuItem4 = document.createElement('div');
	const menuItem4name = document.createElement('p');
	const menuItem4description = document.createElement('p');
	const menuItem4price = document.createElement('p');
	menuItem4.appendChild(menuItem4name);
	menuItem4.appendChild(menuItem4description);
	menuItem4.appendChild(menuItem4price);
	menuItem4name.textContent = 'Tijela de Açai';
	menuItem4description.innerHTML = 'Uma sobremesa brasileira, com mistura de polpa de açai, granola e frutas frescas.';
	menuItem4price.innerHTML = 'R$ 30';

	menuItems.appendChild(menuItem1);
	menuItems.appendChild(menuItem2);
	menuItems.appendChild(menuItem3);
	menuItems.appendChild(menuItem4);

	menuItem1.classList.add('menu-item1');
	menuItem2.classList.add('menu-item');
	menuItem3.classList.add('menu-item');
	menuItem4.classList.add('menu-item');
	//#endregion

	pageContent.appendChild(heading);
	pageContent.appendChild(menuItems);
	content.appendChild(pageContent); 

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