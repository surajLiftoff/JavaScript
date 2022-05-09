const button = document.querySelector('button');

const buttonClickHandler = event => {
    console.log(event);
};

const anotherButtonClickHandler = () => {
    console.log('This was clicked!');
};   

// button.onclick = buttonClickHandler;
// button.onclick = anotherButtonClickHandler;

// const boundFn = buttonClickHandler.bind(this);

button.addEventListener('click', buttonClickHandler);

setTimeout(() => {
    button.removeEventListener('click', buttonClickHandler);
}, 2000);