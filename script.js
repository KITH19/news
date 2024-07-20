// const API_KEY = "7344a3f5d8e7443298e446ccf38cb181";
// const url = "https://newsapi.org/v2/everything?q=";

const API_KEY = "49005dc5b96d5707f7933e6d0ddd693b005c9";
const url = "https://newsdata.io/api/1/latest?apikey=pub_";
var q;
var pg;


window.addEventListener("load", () => fetchNews("India", null));

function reload() {
    window.location.reload();
}

const btn = document.getElementById("aaaa");
btn.addEventListener("click", function(){
    fetchNews(q, pg);
});

async function fetchNews(query, pageNumber) {
    var res;
    if(pageNumber){
        res = await fetch(`${url}${API_KEY}&q=${query}&page=${pageNumber}`);
    }
    else{
        res = await fetch(`${url}${API_KEY}&q=${query}`);
    }
    const data = await res.json();
    q=query;
    pg=data.nextPage;
    bindData(data.results);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.image_url) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.image_url;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description.slice(0,400)+"....";

    const date = new Date(article.pubDate).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source_id} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.link, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id, null);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
