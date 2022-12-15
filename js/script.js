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
    optArticleAuthorSelector = '.post-author';

  const generateTitleLinks = function(customSelector = '') {
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] find selected articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(optArticleSelector + customSelector);

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
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article */
    for (let article of articles) {
      /* [DONE] find tags wrapper */
      let tagsWrapper = article.querySelector(optArticleTagsSelector);

      /* [DONE] get tags from data-tags attribute */
      const tagsAttribute = article.getAttribute('data-tags');

      /* [DONE] split tags into array */
      const tags = tagsAttribute.split(' ');

      /* START LOOP: for each tag */
      for (let tag of tags) {
        /* [DONE] append HTML of the link into the tags wrapper */
        tagsWrapper.innerHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      }
      /* END LOOP: for each tag */
    }
    /* END LOOP: for every article */
  };

  generateTags();

  const tagClickHandler = function(event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* [DONE] find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let link of activeTagLinks) {
      /* [DONE] remove class active */
      link.classList.remove('active');
    }
    /* END LOOP: for each active tag link */

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let link of hrefTagLinks) {
      /* [DONE] add class active */
      link.classList.add('active');
    }
    /* END LOOP: for each found tag link */

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function() {
    /* [DONE] find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */
    for (let link of links) {
      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    }
    /* END LOOP: for each link */
  };

  addClickListenersToTags();

  const generateAuthors = function() {
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article */
    for (let article of articles) {
      /* [DONE] get author from data-author attribute */
      const authorAttribute = article.getAttribute('data-author');

      /* [DONE] find author wrapper */
      let authorWrapper = article.querySelector(optArticleAuthorSelector);

      /* [DONE] insert author into author wrapper */
      authorWrapper.innerHTML = 'by ' + authorAttribute;
    }
    /* END LOOP: for every article */
  };

  generateAuthors();
}
