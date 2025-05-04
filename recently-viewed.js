let recentlyViewedArray = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

let newsHTML = "";

document.querySelector(".clear-button").addEventListener('click', () => {
  recentlyViewedArray = [];
  newsHTML = "";
  generateListHTML();
  localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewedArray));
})

recentlyViewedArray.reverse();

function generateListHTML() {
  recentlyViewedArray.forEach((article) => {
    if (!article.title) return;
  
    newsHTML += `<div class="row-container" style="width: 400px;">`;
  
    // Title (always shown)
    newsHTML += `<div class="news-headline">${article.title}</div>`;
  
    // Description (optional)
    if (article.description) {
      newsHTML += `<div class="article-description">${article.description}</div>`;
    }
  
    // Image (optional)
    if (article.urlToImage) {
      newsHTML += `<div><img class="news-image" src="${article.urlToImage}"></div>`;
    }
    
    // Author (optional)
    if (article.author) {
      newsHTML += `<div class="article-author"><span style="color: rgb(255, 80, 80);">Author:</span> ${article.author}</div>`;
    }
    
    newsHTML += `</div>`;
  });
  
  document.querySelector('.news-containers').innerHTML = newsHTML;
};

generateListHTML();