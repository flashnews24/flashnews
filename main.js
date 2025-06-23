const sections = {
  "main-news": "main",
  "breaking-news": "breaking",
  "politics-news": "politics",
  "economy-news": "economy",
  "sports-news": "sports",
  "tech-news": "tech",
  "culture-news": "culture",
  "video-news": "video"
};

// جلب الأخبار من ملف JSON وتحديث القسم
async function loadNews(sectionId, file) {
  try {
    const res = await fetch(`data/${file}.json`);
    const news = await res.json();
    const container = document.getElementById(sectionId);
    container.innerHTML = "";

    news.forEach(item => {
      const card = document.createElement("div");
      card.className = "news-card";

      card.innerHTML = `
        <img src="${item.image}" alt="صورة الخبر">
        <div class="news-content">
          <h3>${item.title}${item.isNew ? ' <span style="color:red">🆕</span>' : ''}</h3>
          <p>${item.summary}</p>
          <div class="meta">
            <span>${item.source}</span>
            <span>${item.date}</span>
          </div>
          <div class="actions">
            <a href="${item.link}" target="_blank">عرض الخبر</a>
            <button onclick="shareNews('${item.link}')">مشاركة</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    // إذا كان القسم هو "عاجل" نحدّث الشريط العلوي
    if (file === "breaking") {
      const ticker = document.getElementById("breaking-ticker");
      ticker.innerText = news.map(n => n.title).join(" | ");
    }

    // إذا كان القسم "main"، نعرض أول 3 في السلايدر
    if (file === "main") {
      const slider = document.getElementById("slider");
      const topNews = news.slice(0, 3).map(n => `<span>${n.title}</span>`).join(" | ");
      slider.innerHTML = topNews;
    }

  } catch (err) {
    console.error(`خطأ في تحميل ${file}.json`, err);
  }
}

// مشاركة الخبر
function shareNews(link) {
  if (navigator.share) {
    navigator.share({
      title: "فلاش نيوز",
      url: link
    });
  } else {
    alert("المشاركة غير مدعومة في هذا المتصفح");
  }
}

// تغيير اللغة (عربي ↔ إنجليزي)
document.getElementById("lang-toggle").addEventListener("click", () => {
  const lang = document.documentElement.lang;
  if (lang === "ar") {
    document.documentElement.lang = "en";
    document.getElementById("lang-toggle").innerText = "العربية";
  } else {
    document.documentElement.lang = "ar";
    document.getElementById("lang-toggle").innerText = "English";
  }
});

// تحميل كل الأقسام
function loadAllSections() {
  Object.entries(sections).forEach(([sectionId, file]) => {
    loadNews(sectionId, file);
  });
}

// تحديث تلقائي كل دقيقة
loadAllSections();
setInterval(loadAllSections, 60000);
