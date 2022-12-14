'use strict';
{
  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const href = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const article = document.querySelector(href);

    /* [DONE] add class 'active' to the correct article */
    article.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleTagsAttribute = 'data-tags';

  const generateTitleLinks = function() {
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] create links */
    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');

      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] insert link into titleList */
      titleList.innerHTML += '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    }

    /* [DONE] add links handlers */
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const generateTags = function() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      let tagsWrapper = article.querySelector(optArticleTagsSelector);

      /* get tags from data-tags attribute */
      const tagsAttribute = article.getAttribute(optArticleTagsAttribute);

      /* split tags into array */
      const tags = tagsAttribute.split(' ');

      /* START LOOP: for each tag */
      for (let tag of tags) {
        /* append HTML of the link into the tags wrapper */
        tagsWrapper.innerHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      }
      /* END LOOP: for each tag */
    }
    /* END LOOP: for every article: */
  };

  generateTags();
}
