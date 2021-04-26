'use strict';
const articles = document.querySelectorAll('article');
const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';
const titleClickHandler = function(event) {
    const titles = document.querySelectorAll('.titles a');
    event.preventDefault();
    const clickedElement = this;
    for(let article of articles) {
        article.classList.remove('active');
    }
    for(let title of titles) {
        title.classList.remove('active');
    }
    clickedElement.classList.add('active');
    const id = clickedElement.getAttribute('href');
    const activeArticle = document.querySelector(id);
    activeArticle.classList.add('active');  
}
function generateTitleLinks() {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = "";
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        titleList.insertAdjacentHTML('beforeend',linkHTML);
    }
    const activeLinks = document.querySelectorAll('.titles a');
    for(let activeLink of activeLinks) {
        activeLink.addEventListener('click', titleClickHandler);
    }    
}
generateTitleLinks()
