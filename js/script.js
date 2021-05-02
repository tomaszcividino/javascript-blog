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

function generateTitleLinks(customSelector = ''){
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = "";
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

const optArticleTagsSelector = '.post-tags .list'
function generateTags() {
    const articles = document.querySelectorAll('article');
    for(let article of articles) {
        const TagWrapper = article.querySelector(optArticleTagsSelector);
        let html = '';
        const articleTags = article.getAttribute('data-tags');
        const articleTagsArray = articleTags.split(' ');
        for(let tag of articleTagsArray) {
            let LinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
            html = html + ' ' + LinkHTML
        }
        TagWrapper.innerHTML = html;
    }
}

generateTags();

  function tagClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = this.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const ActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    for(ActiveLink of ActiveLinks) {
        ActiveLink.classList.remove('active')
    }
    let TagEquals = document.querySelectorAll(href);
    for (let TagEqual of TagEquals) {
    TagEqual.classList.add('active')
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

  function addClickListenersToTags() {
    const tags = document.querySelectorAll('.list-horizontal a');
    for (let tag of tags) {
        tag.addEventListener('click', tagClickHandler);
    }
  }

  addClickListenersToTags()

  const optArticleAuthorSelector = '.post-author';
  function generateAuthors() {
    const articles = document.querySelectorAll('article');
    for(let article of articles) {
        let html = '';
        const authorWrapper = article.querySelectorAll(optArticleAuthorSelector);
        const articleAttribute = article.getAttribute('data-author');
        for (let authorWrap of authorWrapper) {
        let authorTag = '<a href="#' + articleAttribute + '">' + articleAttribute + '</a';
        authorWrap.innerHTML = html + authorTag
        }
    }
  }

  generateAuthors()


  function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const clickedAttribute = clickedElement.getAttribute('href');
    const clickedHref = clickedAttribute.replace('#','')
    
  generateTitleLinks('[data-author="' + clickedHref + '"]');

}

  function addClickListenersToAuthors() {
    const authors = document.querySelectorAll('.post-author a');
    for (let author of authors) {
        author.addEventListener('click', authorClickHandler);
    }
  }

  addClickListenersToAuthors()
