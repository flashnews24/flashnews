const apiUrl = 'https://flashnews-api.onrender.com/';

async function fetchNews() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayNews(data.news);
  } catch (error) {
    document.getElementById('news').innerHTML = '<p style="color: darkred;">⚠️ فشل تحميل الأخبار.</p>';
    console.error('Error fetching news:', error);
  }
}

function displayNews(news) {
  const newsContainer = document.getElementById('news');
  newsContainer.innerHTML = '';

  if (!news || news.length === 0) {
    newsContainer.innerHTML = '<p>لا توجد أخبار متاحة حالياً.</p>';
    return;
  }

  news.forEach(item => {
    const article = document.createElement('div');
    article.className = 'news-item';

    article.innerHTML = `
      <h2>${item.title}</h2>
      <p>📡 المصدر: ${item.source} | 🗂️ التصنيف: ${item.category} | 🕒 ${new Date(item.date).toLocaleString("ar-EG")}</p>
    `;

    newsContainer.appendChild(article);
  });
}

// تحميل الأخبار عند فتح الصفحة
fetchNews();

// تحديث الأخبار كل 60 ثانية تلقائيًا
setInterval(fetchNews, 60000);
