// رابط API الخاص بالأخبار الحقيقية
const apiUrl = 'https://flashnews-api.onrender.com';

async function fetchNews() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'success') {
      displayNews(data.news);
    } else {
      console.error('فشل في تحميل الأخبار:', data);
    }
  } catch (error) {
    console.error('خطأ في الاتصال بـ API:', error);
  }
}

function displayNews(newsArray) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';

  newsArray.forEach(item => {
    const card = document.createElement('div');
    card.className = 'news-card';

    const title = document.createElement('h3');
    title.textContent = item.title;

    const source = document.createElement('p');
    source.innerHTML = `<strong>المصدر:</strong> ${item.source}`;

    const category = document.createElement('p');
    category.innerHTML = `<strong>القسم:</strong> ${item.category}`;

    const date = document.createElement('p');
    date.innerHTML = `<strong>التاريخ:</strong> ${new Date(item.date).toLocaleString()}`;

    card.appendChild(title);
    card.appendChild(source);
    card.appendChild(category);
    card.appendChild(date);

    newsContainer.appendChild(card);
  });
}

// تشغيل جلب الأخبار عند تحميل الصفحة
window.onload = fetchNews;
