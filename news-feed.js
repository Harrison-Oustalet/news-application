export let recentlyViewedArray = [];

async function getNews() {
  try {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apikey=1a6fab5ef5a049a888386f67faad2740');

    let data = await response.json();

    let newsHTML = "";

    data.articles.forEach((object) => {
      if (object.title && object.urlToImage) {
        newsHTML += `<div class="row-container">
        <div class="news-headline">
          ${object.title}
        </div>
        <div>
          <img class="news-image" src="${object.urlToImage}">
        </div>
        <div title="More Info" class="detailed-info-icon" data-title="${object.title}">
          <span class="material-symbols--info-outline-rounded"></span>
        </div>
      </div>`
    } else if (object.title && !object.urlToImage) {
      newsHTML += `<div class="row-container" style="width: 400px;">
        <div class="news-headline">
          ${object.title}
        </div>
        <div title="More Info" class="detailed-info-icon" data-title="${object.title}">
          <span class="material-symbols--info-outline-rounded"></span>
        </div>
      </div>`
    }
    });

    document.querySelector('.news-containers').innerHTML = newsHTML;

    document.querySelectorAll('.detailed-info-icon').forEach(button => {
      button.addEventListener('click', () => {
        const title = button.dataset.title;
        const parentElement = button.parentElement;
        parentElement.style.width = "400px";
        parentElement.style.height = "400px";
        parentElement.style.filter = "blur(5px)";
        setTimeout(() => {
          parentElement.style.flexDirection = "column";
        }, 550)
        setTimeout(() => {
          parentElement.style.alignItems = "left";
          data.articles.forEach(article => {
            if (article.title === title && article.description) {
              addToRecentlyViewed(article);
              parentElement.innerHTML = `
          <div class="news-headline">
            ${article.title}
          </div>
          <div class="article-description">
            ${article.description}
          <div>
          <div title="More Info" class="detailed-info-icon" data-title="${article.title}">
            <span class="material-symbols--info-outline-rounded"></span>
          </div>`
            } else if (article.title === title && !article.description) {
              addToRecentlyViewed(article);
              parentElement.innerHTML = `
          <div class="news-headline">
            ${article.title}
          </div>
          <div title="More Info" class="detailed-info-icon" data-title="${article.title}">
            <span class="material-symbols--info-outline-rounded"></span>
          </div>`
            }
          });
          parentElement.style.filter = "blur(0px)";
        }, 1200)
      })
    });

  } catch (error) {
    console.log(error);
  }
}

getNews();

function addToRecentlyViewed(article) {
  const current = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

  // Avoid duplicates
  const alreadyAdded = current.find(item => item.title === article.title);
  if (!alreadyAdded) {
    current.push(article);
    localStorage.setItem('recentlyViewed', JSON.stringify(current));
  }
}