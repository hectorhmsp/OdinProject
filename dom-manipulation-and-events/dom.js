// your JavaScript file
const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';

container.appendChild(content);

const pRed = document.createElement('p');
pRed.classList.add('pRed');
pRed.textContent = "Hey I'm red!";
pRed.style.color = 'red';

container.appendChild(pRed);

const h3 = document.createElement('h3');
h3.classList.add('h3');
h3.textContent = "I'm a blue h3!";
h3.style.color = 'blue';

container.appendChild(h3);

const pDiv = document.createElement('p');
pDiv.classList.add('pDiv');
pDiv.textContent = "ME TOO!";

const h1 = document.createElement('h1');
h1.classList.add('h1');
h1.textContent = "I'm in a div"



const blackDiv = document.createElement('div');
blackDiv.classList.add('blackDiv');
blackDiv.style.cssText='border: solid 1px black; background-color: pink;';
blackDiv.appendChild(h1);
blackDiv.appendChild(pDiv);

container.appendChild(blackDiv);

