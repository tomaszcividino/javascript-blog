'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  articleAuthors: Handlebars.compile(document.querySelector('#template-author-article').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

const articles = document.querySelectorAll('article');
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleAuthorSelector = '.post-author',
  optArticleTagsSelector = '.post-tags .list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.list.authors';
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
};

function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    titleList.insertAdjacentHTML('beforeend',linkHTML);
  }
  const activeLinks = document.querySelectorAll('.titles a');
  for(let activeLink of activeLinks) {
    activeLink.addEventListener('click', titleClickHandler);
  }    
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 0
  };
  for(let tag in tags){
    if(tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if(tags[tag] < params.max)
      params.min = tags[tag];
  }
  return params;
}

function calculateTagClass(count,params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;


}
function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll('article');
  for(let article of articles) {
    const TagWrapper = article.querySelector(optArticleTagsSelector);
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for(let tag of articleTagsArray) {
      const linkHTML = {id:tag};
      const html = templates.articleTag(linkHTML);
      TagWrapper.insertAdjacentHTML('beforeend',html);
      if(!allTags[tag]) {
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }
    }
  }
  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = {tags: []};
  for(let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag],tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();

function generateAuthors() {
  let allTags = {};
  const articles = document.querySelectorAll('article');
  const authorSideBarWrapper = document.querySelector(optAuthorsListSelector);
  for(let article of articles) {
    const articleAttributeBy = article.getAttribute('data-author');
    const articleAttribute = articleAttributeBy.replace('by', '');
    if(!allTags[articleAttribute]) {
      allTags[articleAttribute] = 1;
    }
    else {
      allTags[articleAttribute]++;
    }
    const linkHTML = {id: articleAttributeBy};
    const html = templates.articleAuthors(linkHTML);
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    authorWrapper.insertAdjacentHTML('beforeend',html);
  }
  for (let authorWrap in allTags) {
    const allTagsData = {tags: []};
    allTagsData.tags.push({
      tag: authorWrap,
      count: allTags[authorWrap],
    });
    authorSideBarWrapper.innerHTML += templates.authorCloudLink(allTagsData);
  }
}
generateAuthors();

function tagClickHandler(event) {
  event.preventDefault();
  const href = this.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for(activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  let tagEquals = document.querySelectorAll(href);
  for (let tagEqual of tagEquals) {
    tagEqual.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const tags = document.querySelectorAll('.list-horizontal a');
  for (let tag of tags) {
    tag.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const clickedAttribute = clickedElement.getAttribute('href');
  const clickedHref = clickedAttribute.replace('#','');
    
  generateTitleLinks('[data-author="' + clickedHref + '"]');

}

function addClickListenersToAuthors() {
  const authors = document.querySelectorAll('.post-author a');
  for (let author of authors) {
    author.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();

