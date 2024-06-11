require('dotenv').config();
let category = 'general';
const API_KEY='5aa6d3f572a94ccabc59e06c29582809';



function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=in&apiKey=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayNews(data.articles);
        })
        .catch(error => {
            console.error("Error fetching news:", error);
        });
}

function ChangeCategory(newCategory) {
    category = newCategory;
    document.getElementById('categoryTitle').innerText = newCategory.charAt(0).toUpperCase() + newCategory.slice(1);
    fetchNews();
}

function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const newsCard = `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="card text-center border-2 border-warning" style="max-width: 400px; height:600px">
                    <div class="card-body">
                        <img src="${article.urlToImage || 'news_placeholder.png' }" alt="news image" class="card-img-top" style="max-height: 200px;">
                        <h4 class="card-title">${article.title}</h4>
                        <p class="card-text">${article.description || 'No description available.'}
                        
                            <a href="${article.url}" class="fw-light text-decoration-none" target="_blank"><span>Read more</span></a>
                        </p>
                    </div>
                </div>
            </div>`;
        newsContainer.insertAdjacentHTML('beforeend', newsCard);
    });
}

// document.getElementById('countrySelect').addEventListener('change', function() {
//     fetchNews();
// });
fetchNews();