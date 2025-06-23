const apiUrl = "https://flashnews-api.onrender.com/api/news";
const newsContainer = document.getElementById("news-container");
const errorContainer = document.getElementById("error-container");

function createNewsCard(newsItem) {
  const card = document.createElement("div");
  card.className = "news-card";

  const title = document.createElement("h2");
  title.textContent = newsItem.title;
  title.className = "news-title";

  const meta = document.createElement("div");
  meta.className = "news-meta";
  meta.innerHTML = `
    🏷️ ${newsItem.category} |
    🕒 ${new Date(newsItem.date).toLocaleString("ar-EG")}
  `;

  const source = document.createElement("div");
  source.className = "news-source";
  source.innerHTML = `📺 المصدر: ${newsItem.source}`;

  const summary = document.createElement("p");
  summary.className = "news-summary";
  summary.textContent = newsItem.summary || "";

  const image = document.createElement("img");
  image.className = "news-thumbnail";
  image.src = newsItem.image || "default.jpg";
  image.alt = "صورة الخبر";

  const actions = document.createElement("div");
  actions.className = "news-actions";
  actions.innerHTML = `
    <a href="${newsItem.link}" target="_blank">📖 قراءة المزيد</a> |
    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(newsItem.link)}" target="_blank">🔗 مشاركة</a>
  `;

  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(meta);
  card.appendChild(source);
  card.appendChild(summary);
  card.appendChild(actions);

  return card;
}

async function fetchNews() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    newsContainer.innerHTML = ""; // مسح الأخبار القديمة
    errorContainer.style.display = "none";

    if (data.news && data.news.length > 0) {
      data.news.forEach(item => {
        const card = createNewsCard(item);
        newsContainer.appendChild(card);
      });
    } else {
      newsContainer.innerHTML = "<p>لا توجد أخبار متاحة حاليًا.</p>";
    }
  } catch (error) {
    console.error("فشل تحميل الأخبار:", error);
    errorContainer.style.display = "block";
    errorContainer.innerHTML = "⚠️ فشل تحميل الأخبار. تأكد من أن الخادم يعمل.";
  }
}

fetchNews(); // أول تحميل
setInterval(fetchNews, 60000); // كل دقيقة
