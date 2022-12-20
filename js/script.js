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
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.list.authors';

  const generateTitleLinks = function(customSelector = '') {
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] find selected articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

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

  const calculateTagsParams = function(tags) {
    let result = {
      'max': 0,
      'min': Number.MAX_SAFE_INTEGER
    };
    
    /* search min and max occurrence of tag */
    for (let tag in tags) {
      if (tags[tag] > result.max) {
        result.max = tags[tag];
      }
      if (tags[tag] < result.min) {
        result.min = tags[tag];
      }
    }

    return result;
  };

  const calculateTagClass = function(count, params) {
    return optCloudClassPrefix + Math.round(((count - params.min) / (params.max - params.min)) * (optCloudClassCount - 1) + 1 );
  };

  const generateTags = function() {
    /* [DONE] create a new variable allTags with an empty object */
    let allTags = {};

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
        /* create HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* [DONE] append HTML of the link into the tags wrapper */
        tagsWrapper.innerHTML += linkHTML;

        /* [DONE] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [DONE] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      /* END LOOP: for each tag */
    }
    /* END LOOP: for every article */

    /* [DONE] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    const tagsParams = calculateTagsParams(allTags);
    
    /* [DONE] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [DONE] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [DONE] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag +  '</a></li>';
    }
    /* [DONE] END LOOP: for each tag in allTags: */

    /* [DONE] add html from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
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

  const getAuthorVarName = function(authorName) {
    return authorName.toLowerCase().replace(' ', '-');
  };

  const getAuthorName = function(authorHref) {
    /* extract author name from authorHref */
    const authorLowerCaseArr = authorHref.replace('#author-', '').split('-');
    return authorLowerCaseArr[0][0].toUpperCase() + authorLowerCaseArr[0].substring(1)
     + ' ' + authorLowerCaseArr[1][0].toUpperCase() + authorLowerCaseArr[1].substring(1);
  };

  const generateAuthors = function() {
    let allAuthors = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article */
    for (let article of articles) {
      /* [DONE] get author name from data-author attribute */
      const authorName = article.getAttribute('data-author');
      const authorVarName = getAuthorVarName(authorName);

      /* [DONE] make author href from author attribute */
      const authorHref = '#author-' + authorVarName;
      
      /* [DONE] find author wrapper */
      let authorWrapper = article.querySelector(optArticleAuthorSelector);

      /* [DONE] insert author into author wrapper */
      authorWrapper.innerHTML = '<a href="' + authorHref + '">' + 'by ' + authorName + '</a>';

      /* count author's articles */
      if (!allAuthors[authorVarName]) {
        allAuthors[authorVarName] = 1;
      } else {
        allAuthors[authorVarName]++;
      }
    }
    /* END LOOP: for every article */

    /* find list of authors in right column */
    const authorsList = document.querySelector(optAuthorsListSelector);

    /* generate author's links in right column */
    for (let auth in allAuthors) {
      authorsList.innerHTML += '<li><a href="#author-' + auth + '"><span class="author-name">' + getAuthorName(auth) + ' (' + allAuthors[auth] + ')</span></a></li>';
    }
  };

  generateAuthors();

  const authorClickHandler = function(event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] execute function "generateTitleLinks" with author selector as argument */
    generateTitleLinks('[data-author="' + getAuthorName(href) + '"]');
  };

  const addClickListenersToAuthors = function() {
    /* [DONE] find all links to authors */
    const links = document.querySelectorAll('a[href^="#author-"]');

    /* START LOOP: for each link */
    for (let link of links) {
      /* [DONE] add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    }
    /* END LOOP: for each link */
  };

  addClickListenersToAuthors();
}
