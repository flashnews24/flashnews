// main.js - فلاش نيوز

const apiURL = "https://flashnews-api.onrender.com/main.json";
const container = document.getElementById("main-news");

function fetchNews() {
  fetch(apiURL)
    .then(res => res.json())
    .then(data => displayNews(data))
    .catch(err => console.error("خطأ في تحميل الأخبار:", err));
}

function displayNews(newsList) {
  const loading = container.querySelector(".loading");
  if (loading) loading.remove();

  container.innerHTML = "";

  newsList.forEach(news => {
    const card = document.createElement("div");
    card.className = "news-card";

    card.innerHTML = `
      <img src="${news.image}" alt="صورة الخبر">
      <div class="news-content">
        <h3>${news.title}</h3>
        <p>${news.summary}</p>
        <div class="meta">
          <span>${news.source}</span>
          <span>${timeAgo(news.published_at)}</span>
        </div>
        <div class="actions">
          <a href="${news.link}" target="_blank">قراءة الخبر</a>
          <button onclick="copyLink('${news.link}')">نسخ الرابط</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function timeAgo(dateStr) {
  const now = new Date();
  const past = new Date(dateStr);
  const diff = Math.floor((now - past) / 1000);
  if (diff < 60) return "الآن";
  if (diff < 3600) return `${Math.floor(diff / 60)} دقيقة`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ساعة`;
  return `${Math.floor(diff / 86400)} يوم`;
}

function copyLink(link) {
  navigator.clipboard.writeText(link)
    .then(() => alert("تم نسخ الرابط ✅"))
    .catch(() => alert("حدث خطأ أثناء النسخ"));
}

fetchNews();
setInterval(fetchNews, 60000); // تحديث كل دقيقة
