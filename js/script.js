'use strict';

const activeLinks = document.querySelectorAll('.titles a');
const articles = document.querySelectorAll('article');
const titleClickHandler = function(event) {
    const clickedElement = this;
    for(let article of articles) {
        article.classList.remove('active');
    }
    for(let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active');
    const id = clickedElement.getAttribute('href');
    const activeArticle = document.querySelector(id);
    activeArticle.classList.add('active')
}
for(let activeLink of activeLinks) {
    activeLink.addEventListener('click', titleClickHandler);
}    


