// ==========================================
// 1. GLOBAL VARIABLES & CONFIG
// ==========================================
let allPackages = [];
let currentLang = localStorage.getItem('konyaalti_lang') || 'en';

// ==========================================
// 2. TRANSLATIONS (DICTIONARY)
// ==========================================
const translations = {
    en: {
        // --- Navbar ---
        nav_home: "Home", nav_about: "About Us", nav_packages: "Packages", 
        nav_activities: "Activities", nav_contact: "Contact", nav_faq: "FAQ",
        btn_login: "Login", btn_logout: "Logout",
        
        // --- Hero & Home ---
        hero_title: "Experience <span class='highlight'>Antalya</span>", 
        hero_subtitle: "Turquoise coasts, ancient history, and magic.",
        btn_explore: "Explore Packages", 
        pkg_title: "Popular Destinations",
        
        // --- Home: Welcome Section (ADDED) ---
        home_welcome_title: "Welcome to Antalya",
        home_welcome_sub: "Discover the pearl of the Mediterranean. Premium tours & unforgettable memories.",
        home_card_history: "History & Culture",
        home_card_beaches: "Turquoise Beaches",
        home_card_flavors: "Authentic Flavors",

        // --- Packages Page ---
        pkg_exclusive_title: "Our Exclusive Packages",
        pkg_exclusive_sub: "Choose your next adventure in Antalya",
        search_placeholder: "Search destinations...",
        btn_view_all: "View All Packages",

        // --- About Page ---
        about_header_title: "About Us",
        about_header_sub: "Your new trusted partner in Antalya.",
        story_title: "Our Story",
        story_head: "A New Journey Begins Here",
        story_text1: "Konyaaltitours was founded with a fresh vision: to show the world the authentic beauty of Antalya beyond the usual tourist traps.",
        story_text2: "We are a passionate team dedicated to crafting unforgettable memories with personalized care and attention to detail.",
        
        // Stats
        stat_travelers: "Customer Passion", 
        stat_packages: "Quality Service",
        stat_exp: "Guest Support",
        stat_rating: "Local Expertise",

        // --- Activities Page ---
        act_header_title: "Daily Activities",
        act_header_sub: "Adrenaline, Fun, and Adventure.",
        act_rafting_title: "White Water Rafting",
        act_rafting_desc: "Experience the thrill of Köprülü Canyon waters.",
        act_boat_title: "Mega Star Boat Trip",
        act_boat_desc: "Swim in turquoise bays with music and lunch.",
        act_safari_title: "Jeep Safari Adventure",
        act_safari_desc: "Off-road fun through the Taurus Mountains.",
        act_para_title: "Paragliding",
        act_para_desc: "Fly over Alanya or Kas with stunning views.",
        btn_book_now: "Book Now",

        // --- Contact Page ---
        contact_header_title: "Get In Touch",
        contact_header_sub: "We'd love to hear from you.",
        contact_info_title: "Contact Info",
        contact_addr_title: "Address",
        contact_addr_val: "Liman Mah, Konyaaltı, Antalya, Turkey",
        contact_phone_title: "Phone",
        contact_email_title: "Email",
        contact_wa_title: "WhatsApp",
        form_title: "Send a Message",
        form_btn: "Send Message",

        // --- FAQ Page ---
        faq_header_title: "Frequently Asked Questions",
        faq_header_sub: "Find answers to common questions.",
        faq_q1: "How can I book a tour?",
        faq_a1: "You can book directly through our website by selecting a package, or contact us via WhatsApp.",
        faq_q2: "Do you offer airport transfers?",
        faq_a2: "Yes, most of our multi-day packages include VIP airport transfers.",
        faq_q3: "Is lunch included?",
        faq_a3: "Yes, almost all our full-day tours include a delicious lunch.",
        faq_q4: "Cancellation policy?",
        faq_a4: "Cancel up to 24 hours before the tour starts for a full refund.",
        faq_q5: "Can I customize my package?",
        faq_a5: "Absolutely! Contact us to create a custom itinerary.",

        // --- Footer & Common ---
        footer_about: "Travel with confidence. Premium experiences tailored for you.", 
        footer_quick_links: "Quick Links",
        footer_contact: "Contact",
        btn_details: "View Details",
        btn_book: "Confirm Booking",
        
        // --- Package Details ---
        dt_desc_title: "Description",
        dt_itin_title: "Itinerary",
        dt_book_title: "Book This Tour",
        lbl_date: "Select Date",
        lbl_guests: "Guests",
        lbl_name: "Full Name",
        lbl_phone: "Phone / WhatsApp",
        lbl_total: "Total Estimate"
    },
    tr: {
        nav_home: "Anasayfa", nav_about: "Hakkında", nav_packages: "Turlar", 
        nav_activities: "Aktiviteler", nav_contact: "İletişim", nav_faq: "SSS",
        btn_login: "Giriş", btn_logout: "Çıkış",
        
        hero_title: "<span class='highlight'>Antalya'yı</span> Keşfedin", 
        hero_subtitle: "Turkuaz kıyılar, antik tarih ve büyü.",
        btn_explore: "Turları Keşfet", 
        pkg_title: "Popüler Destinasyonlar",

        // Home: Welcome (Turkish)
        home_welcome_title: "Antalya'ya Hoşgeldiniz",
        home_welcome_sub: "Akdeniz'in incisini keşfedin. Premium turlar ve unutulmaz anılar.",
        home_card_history: "Tarih ve Kültür",
        home_card_beaches: "Turkuaz Plajlar",
        home_card_flavors: "Otantik Lezzetler",

        // Packages Page
        pkg_exclusive_title: "Özel Paketlerimiz",
        pkg_exclusive_sub: "Antalya'daki bir sonraki maceranızı seçin",
        search_placeholder: "Destinasyon ara...",
        btn_view_all: "Tüm Paketleri Gör",

        // About Updates
        about_header_title: "Hakkımızda",
        about_header_sub: "Antalya'daki yeni güvenilir ortağınız.",
        story_title: "Hikayemiz",
        story_head: "Yeni Bir Yolculuk Başlıyor",
        story_text1: "Konyaaltitours, Antalya'nın gerçek güzelliklerini dünyaya tanıtmak için taze bir vizyonla kuruldu.",
        story_text2: "Biz, kişisel özen ve detaylara dikkat ederek unutulmaz anılar yaratmaya adanmış tutkulu bir ekibiz.",
        
        stat_travelers: "Müşteri Tutkusu",
        stat_packages: "Kaliteli Hizmet",
        stat_exp: "Misafir Desteği",
        stat_rating: "Yerel Uzmanlık",

        act_header_title: "Günlük Aktiviteler",
        act_header_sub: "Adrenalin, Eğlence ve Macera.",
        act_rafting_title: "Rafting Heyecanı",
        act_rafting_desc: "Köprülü Kanyon sularında heyecanı yaşayın.",
        act_boat_title: "Mega Star Tekne Turu",
        act_boat_desc: "Müzik ve öğle yemeği ile turkuaz koylarda yüzün.",
        act_safari_title: "Jeep Safari",
        act_safari_desc: "Toros Dağları'nda off-road eğlencesi.",
        act_para_title: "Yamaç Paraşütü",
        act_para_desc: "Alanya veya Kaş üzerinde muhteşem manzaralarla uçun.",
        btn_book_now: "Rezervasyon Yap",

        contact_header_title: "Bize Ulaşın",
        contact_header_sub: "Sizden haber almayı çok isteriz.",
        contact_info_title: "İletişim Bilgileri",
        contact_addr_title: "Adres",
        contact_addr_val: "Liman Mah, Konyaaltı, Antalya, Türkiye",
        contact_phone_title: "Telefon",
        contact_email_title: "E-posta",
        contact_wa_title: "WhatsApp",
        form_title: "Mesaj Gönder",
        form_btn: "Gönder",

        faq_header_title: "Sıkça Sorulan Sorular",
        faq_header_sub: "Sorularınıza cevap bulun.",
        faq_q1: "Nasıl rezervasyon yapabilirim?",
        faq_a1: "Web sitemizden doğrudan paket seçerek veya WhatsApp üzerinden iletişime geçerek rezervasyon yapabilirsiniz.",
        faq_q2: "Havalimanı transferi var mı?",
        faq_a2: "Evet, çok günlük paketlerimizin çoğunda VIP transfer dahildir.",
        faq_q3: "Öğle yemeği dahil mi?",
        faq_a3: "Evet, tam günlük turlarımızın neredeyse hepsinde yemek dahildir.",
        faq_q4: "İptal politikası nedir?",
        faq_a4: "Tur başlamadan 24 saat öncesine kadar tam iade ile iptal edebilirsiniz.",
        faq_q5: "Paketimi özelleştirebilir miyim?",
        faq_a5: "Kesinlikle! Size özel bir plan oluşturmak için bizimle iletişime geçin.",

        footer_about: "Güvenle seyahat edin. Size özel premium deneyimler.", 
        footer_quick_links: "Hızlı Bağlantılar",
        footer_contact: "İletişim",
        btn_details: "Detaylar",
        btn_book: "Rezervasyonu Onayla",

        dt_desc_title: "Açıklama",
        dt_itin_title: "Tur Planı",
        dt_book_title: "Turu Rezerve Et",
        lbl_date: "Tarih Seçin",
        lbl_guests: "Kişi Sayısı",
        lbl_name: "Ad Soyad",
        lbl_phone: "Telefon / WhatsApp",
        lbl_total: "Tahmini Tutar"
    },
    ar: {
        nav_home: "الرئيسية", nav_about: "من نحن", nav_packages: "الباقات", 
        nav_activities: "الأنشطة", nav_contact: "تواصل معنا", nav_faq: "الأسئلة",
        btn_login: "دخول", btn_logout: "خروج",
        
        hero_title: "اكتشف سحر <span class='highlight'>أنطاليا</span>", 
        hero_subtitle: "سواحل فيروزية، تاريخ عريق، وسحر لا ينسى.",
        btn_explore: "تصفح الرحلات", 
        pkg_title: "الوجهات الشهيرة",

        // Home: Welcome (Arabic)
        home_welcome_title: "مرحباً بكم في أنطاليا",
        home_welcome_sub: "اكتشف لؤلؤة البحر الأبيض المتوسط. رحلات فاخرة وذكريات لا تُنسى.",
        home_card_history: "تاريخ وثقافة",
        home_card_beaches: "شواطئ فيروزية",
        home_card_flavors: "نكهات أصيلة",

        // Packages Page
        pkg_exclusive_title: "باقاتنا الحصرية",
        pkg_exclusive_sub: "اختر مغامرتك القادمة في أنطاليا",
        search_placeholder: "ابحث عن وجهة...",
        btn_view_all: "عرض كل الباقات",

        // About Updates
        about_header_title: "من نحن",
        about_header_sub: "شريكك الجديد والموثوق في أنطاليا.",
        story_title: "قصتنا",
        story_head: "رحلة جديدة تبدأ هنا",
        story_text1: "تأسست كونياالتي تورز برؤية جديدة: لإظهار الجمال الحقيقي لأنطاليا بعيداً عن الجولات التقليدية.",
        story_text2: "نحن فريق شغوف مكرس لصناعة ذكريات لا تُنسى مع اهتمام دقيق بكل التفاصيل.",
        
        stat_travelers: "شغف بالعملاء",
        stat_packages: "خدمة راقية",
        stat_exp: "دعم متواصل",
        stat_rating: "خبرة محلية",

        act_header_title: "الأنشطة اليومية",
        act_header_sub: "أدرينالين، مرح، ومغامرة.",
        act_rafting_title: "تجديف الأنهار",
        act_rafting_desc: "عش الإثارة في مياه وادي كوبرولو.",
        act_boat_title: "رحلة القارب ميجا ستار",
        act_boat_desc: "سباحة في الخلجان الفيروزية مع غداء وموسيقى.",
        act_safari_title: "سفاري الجيب",
        act_safari_desc: "مرح الطرق الوعرة عبر جبال طوروس.",
        act_para_title: "القفز المظلي",
        act_para_desc: "حلق فوق ألانيا أو كاش بمناظر خلابة.",
        btn_book_now: "احجز الآن",

        contact_header_title: "تواصل معنا",
        contact_header_sub: "نسعد بسماع صوتك.",
        contact_info_title: "معلومات الاتصال",
        contact_addr_title: "العنوان",
        contact_addr_val: "ليمان، كونيالتي، أنطاليا، تركيا",
        contact_phone_title: "الهاتف",
        contact_email_title: "البريد",
        contact_wa_title: "واتساب",
        form_title: "أرسل رسالة",
        form_btn: "إرسال",

        faq_header_title: "الأسئلة الشائعة",
        faq_header_sub: "إجابات لأهم استفساراتكم.",
        faq_q1: "كيف أحجز رحلة؟",
        faq_a1: "يمكنك الحجز مباشرة عبر الموقع أو التواصل معنا عبر واتساب.",
        faq_q2: "هل توفرون استقبال من المطار؟",
        faq_a2: "نعم، معظم الباقات تشمل استقبال VIP.",
        faq_q3: "هل الغداء مشمول؟",
        faq_a3: "نعم، الغداء مشمول في معظم الرحلات اليومية الكاملة.",
        faq_q4: "ما هي سياسة الإلغاء؟",
        faq_a4: "يمكنك الإلغاء قبل 24 ساعة لاسترداد المبلغ كاملاً.",
        faq_q5: "هل يمكن تفصيل برنامج خاص؟",
        faq_a5: "بالتأكيد! تواصل معنا لتصميم رحلة على مزاجك.",

        footer_about: "سافر بثقة. تجارب فاخرة مصممة خصيصاً لك.", 
        footer_quick_links: "روابط سريعة",
        footer_contact: "اتصل بنا",
        btn_details: "التفاصيل",
        btn_book: "تأكيد الحجز",

        dt_desc_title: "الوصف",
        dt_itin_title: "البرنامج",
        dt_book_title: "حجز هذه الرحلة",
        lbl_date: "اختر التاريخ",
        lbl_guests: "عدد الأفراد",
        lbl_name: "الاسم الكامل",
        lbl_phone: "هاتف / واتساب",
        lbl_total: "الإجمالي المتوقع"
    },
    ru: { 
        nav_home: "Главная", nav_about: "О нас", nav_packages: "Туры", 
        nav_activities: "Активности", nav_contact: "Контакты", nav_faq: "FAQ",
        btn_login: "Войти", btn_logout: "Выйти",
        
        hero_title: "Откройте <span class='highlight'>Анталию</span>", 
        hero_subtitle: "Бирюзовое побережье, древняя история и магия.",
        btn_explore: "Смотреть туры", 
        pkg_title: "Популярные направления",

        // Home: Welcome (Russian)
        home_welcome_title: "Добро пожаловать в Анталию",
        home_welcome_sub: "Откройте жемчужину Средиземноморья. Премиум туры и незабываемые моменты.",
        home_card_history: "История и Культура",
        home_card_beaches: "Бирюзовые пляжи",
        home_card_flavors: "Аутентичные вкусы",

        // Packages Page
        pkg_exclusive_title: "Наши эксклюзивные туры",
        pkg_exclusive_sub: "Выберите ваше следующее приключение",
        search_placeholder: "Поиск туров...",
        btn_view_all: "Посмотреть все туры",

        // About Updates
        about_header_title: "О нас",
        about_header_sub: "Ваш новый надежный партнер в Турции.",
        story_title: "Наша история",
        story_head: "Новое путешествие начинается здесь",
        story_text1: "Konyaaltitours была основана с целью показать настоящую красоту Анталии.",
        story_text2: "Мы - страстная команда, создающая незабываемые воспоминания.",
        
        stat_travelers: "Страсть к клиентам",
        stat_packages: "VIP Сервис",
        stat_exp: "Поддержка 24/7",
        stat_rating: "Местные эксперты",

        act_header_title: "Ежедневные активности",
        act_header_sub: "Адреналин и веселье.",
        act_rafting_title: "Рафтинг",
        act_rafting_desc: "Почувствуйте драйв.",
        act_boat_title: "Прогулка на лодке",
        act_boat_desc: "Плавание в бирюзовых бухтах.",
        act_safari_title: "Джип Сафари",
        act_safari_desc: "Веселье в горах.",
        act_para_title: "Параглайдинг",
        act_para_desc: "Полет над Аланией.",
        btn_book_now: "Забронировать",

        contact_header_title: "Связаться с нами",
        contact_header_sub: "Мы ждем вашего звонка.",
        contact_info_title: "Контакты",
        contact_addr_title: "Адрес",
        contact_addr_val: "Лиман, Коньяалты, Анталия",
        contact_phone_title: "Телефон",
        contact_email_title: "Email",
        contact_wa_title: "WhatsApp",
        form_title: "Отправить сообщение",
        form_btn: "Отправить",

        faq_header_title: "Частые вопросы",
        faq_header_sub: "Найдите ответы.",
        faq_q1: "Как забронировать?",
        faq_a1: "Через сайт или WhatsApp.",
        faq_q2: "Есть ли трансфер?",
        faq_a2: "Да, VIP трансфер включен.",
        faq_q3: "Включен ли обед?",
        faq_a3: "Да, почти везде.",
        faq_q4: "Отмена брони?",
        faq_a4: "За 24 часа - полный возврат.",
        faq_q5: "Индивидуальный тур?",
        faq_a5: "Конечно, напишите нам.",

        footer_about: "Путешествуйте с уверенностью.", 
        footer_quick_links: "Быстрые ссылки",
        footer_contact: "Контакты",
        btn_details: "Подробнее",
        btn_book: "Подтвердить",

        dt_desc_title: "Описание",
        dt_itin_title: "Программа",
        dt_book_title: "Забронировать",
        lbl_date: "Дата",
        lbl_guests: "Гостей",
        lbl_name: "Имя",
        lbl_phone: "Телефон",
        lbl_total: "Итого"
    }
};

// ==========================================
// 3. MAIN INITIALIZATION & ROUTER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLang);
    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.value = currentLang;

    if (document.getElementById('details-wrapper')) {
        initPackageDetailsPage();
    } else if (document.getElementById('packages-container')) {
        waitForFirebase(() => loadPackages());
    }

    initNavbarScroll();
});

// Helper: Wait for Firebase
function waitForFirebase(callback) {
    const interval = setInterval(() => {
        if (window.db) { clearInterval(interval); callback(); }
    }, 100);
}

// ==========================================
// 4. LANGUAGE LOGIC
// ==========================================
window.changeLanguage = function(lang) {
    currentLang = lang;
    localStorage.setItem('konyaalti_lang', lang); 
    applyLanguage(lang);
}

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    if (lang === 'ar') {
        document.body.classList.add('rtl');
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.body.classList.remove('rtl');
        document.documentElement.setAttribute('dir', 'ltr');
    }
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = translations[lang][key] || translations['en'][key];
        if (text) {
            if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.innerHTML = text;
            }
        }
    });

    if(document.getElementById('packages-container')) {
        renderPackagesGrid(document.getElementById('search-bar')?.value || "");
    }
}

// ==========================================
// 5. HERO SLIDER LOGIC
// ==========================================
let currentSlideIndex = 0;
if(document.querySelector('.slide')) {
    setInterval(() => { window.changeSlide(1); }, 5000);
}

window.changeSlide = function(step) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = (currentSlideIndex + step + slides.length) % slides.length;
    slides[currentSlideIndex].classList.add('active');
}

// ==========================================
// 6. PACKAGE DETAILS LOGIC
// ==========================================
async function initPackageDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const pkgId = urlParams.get('id');

    if (!pkgId) {
        document.getElementById('loading-overlay').style.display = 'none';
        document.getElementById('error-msg').style.display = 'block';
        return;
    }

    waitForFirebase(async () => {
        try {
            const querySnapshot = await window.getDocs(window.collection(window.db, "packages"));
            let foundPkg = null;
            querySnapshot.forEach((doc) => {
                if(doc.id === pkgId) foundPkg = { id: doc.id, ...doc.data() };
            });

            if (foundPkg) {
                renderSinglePackage(foundPkg);
            } else {
                document.getElementById('loading-overlay').style.display = 'none';
                document.getElementById('error-msg').style.display = 'block';
            }
        } catch (e) { console.error(e); }
    });
}

function renderSinglePackage(pkg) {
    document.getElementById('loading-overlay').style.display = 'none';
    document.getElementById('details-wrapper').style.display = 'block';

    document.getElementById('dt-image').src = pkg.image || 'https://via.placeholder.com/800x400';
    document.getElementById('dt-name').innerText = pkg.name;
    document.getElementById('dt-price').innerText = `$${pkg.price}`;
    document.getElementById('dt-duration').innerHTML = `<i class="far fa-clock"></i> ${pkg.duration}`;
    document.getElementById('dt-desc').innerText = pkg.desc;

    const planContainer = document.getElementById('dt-plan');
    planContainer.innerHTML = '';
    if (pkg.plan) {
        pkg.plan.forEach((day, index) => {
            const div = document.createElement('div');
            div.className = 'itinerary-box';
            div.innerHTML = `<strong>Day ${index + 1}:</strong> ${day}`;
            planContainer.appendChild(div);
        });
    }

    const dateInput = document.getElementById('book-date');
    const dateHint = document.getElementById('date-hint');
    dateInput.dataset.allowedDates = JSON.stringify(pkg.dates || []);
    
    if (pkg.dates && pkg.dates.length > 0) {
        dateHint.innerText = `Available: ${pkg.dates.join(', ')}`;
    } else {
        dateHint.innerText = "Available daily upon request.";
    }

    const guestInput = document.getElementById('book-guests');
    const totalDisplay = document.getElementById('booking-total');
    
    guestInput.addEventListener('change', () => {
        const count = parseInt(guestInput.value) || 1;
        totalDisplay.innerText = `$${count * pkg.price}`;
    });
    totalDisplay.innerText = `$${pkg.price}`;

    document.getElementById('single-booking-form').onsubmit = (e) => handleBookingSubmit(e, pkg);
}

async function handleBookingSubmit(e, pkg) {
    e.preventDefault();
    toggleLoading(true);
    const dateInput = document.getElementById('book-date');
    const selectedDate = dateInput.value;
    const allowedDates = JSON.parse(dateInput.dataset.allowedDates || "[]");

    if (allowedDates.length > 0) {
        const cleanAllowed = allowedDates.map(d => d.trim());
        if (!cleanAllowed.includes(selectedDate)) {
            alert(`❌ Invalid Date! Please select: ${cleanAllowed.join(", ")}`);
            toggleLoading(false); return;
        }
    }

    const bookingData = {
        trip: pkg.name, tripId: pkg.id,
        name: document.getElementById('book-name').value,
        phone: document.getElementById('book-phone').value,
        date: selectedDate,
        guests: document.getElementById('book-guests').value,
        total: document.getElementById('booking-total').innerText,
        status: "Pending", created_at: new Date().toISOString()
    };

    try {
        await window.addDoc(window.collection(window.db, "bookings"), bookingData);
        window.openModal('success-modal');
        document.getElementById('single-booking-form').reset();
    } catch (err) { alert("Error: " + err.message); } 
    finally { toggleLoading(false); }
}

// ==========================================
// 7. SHARED FUNCTIONS
// ==========================================
async function loadPackages() {
    try {
        const snapshot = await window.getDocs(window.collection(window.db, "packages"));
        allPackages = [];
        snapshot.forEach(doc => { allPackages.push({ id: doc.id, ...doc.data() }); });
        renderPackagesGrid();
    } catch (error) { console.error(error); }
}

function renderPackagesGrid(filterText = "") {
    const container = document.getElementById('packages-container');
    if(!container) return;
    container.innerHTML = "";
    const filtered = allPackages.filter(pkg => pkg.name.toLowerCase().includes(filterText.toLowerCase()));

    if(filtered.length === 0 && allPackages.length > 0) {
        container.innerHTML = "<p style='text-align:center; color:#777; grid-column:1/-1;'>No packages found.</p>";
        return;
    }

    filtered.forEach((pkg, index) => {
        const btnText = translations[currentLang] ? translations[currentLang].btn_details : "View Details";
        const div = document.createElement('div');
        div.className = 'package-card';
        div.setAttribute('data-aos', 'fade-up');
        div.setAttribute('data-aos-delay', (index * 100).toString()); 
        div.innerHTML = `
            <img src="${pkg.image}" onerror="this.src='https://via.placeholder.com/400x200'">
            <div class="rating-badge"><i class="fas fa-star" style="color:#d4af37"></i> 5.0</div>
            <div class="card-body">
                <h3>${pkg.name}</h3>
                <p>${pkg.desc}</p>
                <div class="card-meta">
                    <div class="duration"><i class="far fa-clock"></i> ${pkg.duration}</div>
                    <div class="price">$${pkg.price}</div>
                </div>
                <a href="package-details.html?id=${pkg.id}" class="details-btn">${btnText}</a>
            </div>
        `;
        container.appendChild(div);
    });
}

window.filterPackages = () => renderPackagesGrid(document.getElementById('search-bar').value);

function initNavbarScroll() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if(!navbar) return;
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
}

function toggleLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = show ? 'flex' : 'none';
}

function showToast(msg, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return alert(msg);
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i></i><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
}

// Helpers for UI
window.openModal = (id) => document.getElementById(id)?.classList.add('active');
window.closeModal = (id) => document.getElementById(id)?.classList.remove('active');
window.toggleMenu = () => document.querySelector('.nav-links').classList.toggle('active');