<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>نوف البدراني | Nouf AlBadrani - Portfolio</title>
    <!-- Font Awesome Icons & Google Fonts -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary: #002B49; /* اللون الكحلي الرسمي */
            --accent: #0A66C2;  /* أزرق الاحترافية */
            --bg-light: #f8fafc;
            --text-dark: #1e293b;
            --text-muted: #64748b;
            --card-bg: #ffffff;
            --border-color: #e2e8f0;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Tajawal', sans-serif;
            scroll-behavior: smooth;
        }

        body {
            background-color: var(--bg-light);
            color: var(--text-dark);
            line-height: 1.7;
        }

        /* Navigation Bar */
        header {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border-color);
            z-index: 1000;
        }

        .nav-container {
            max-width: 1100px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
        }

        .logo {
            font-size: 1.4rem;
            font-weight: 800;
            color: var(--primary);
        }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 1.5rem;
        }

        .nav-links a {
            text-decoration: none;
            color: var(--text-dark);
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: var(--accent);
        }

        /* Hero Section */
        .hero {
            padding: 8rem 2rem 4rem;
            max-width: 1100px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .profile-img-placeholder {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 10px 25px rgba(0, 43, 73, 0.2);
        }

        .hero h1 {
            font-size: 2.5rem;
            color: var(--primary);
            margin-bottom: 0.5rem;
        }

        .hero h3 {
            font-size: 1.2rem;
            color: var(--text-muted);
            margin-bottom: 1.5rem;
            font-weight: 400;
        }

        .badge-tag {
            background-color: #e0f2fe;
            color: var(--accent);
            padding: 0.4rem 1rem;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 1.5rem;
        }

        .cta-buttons {
            display: flex;
            gap: 1rem;
        }

        .btn {
            padding: 0.75rem 1.8rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-primary {
            background-color: var(--primary);
            color: white;
        }

        .btn-secondary {
            background-color: white;
            color: var(--primary);
            border: 1px solid var(--border-color);
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        /* Sections Layout */
        section {
            padding: 4rem 2rem;
            max-width: 1100px;
            margin: 0 auto;
        }

        .section-title {
            font-size: 1.8rem;
            color: var(--primary);
            margin-bottom: 2rem;
            position: relative;
            display: inline-block;
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: -5px;
            right: 0;
            width: 50%;
            height: 3px;
            background-color: var(--accent);
            border-radius: 2px;
        }

        /* Grid Cards */
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
        }

        .card {
            background: var(--card-bg);
            padding: 1.8rem;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 20px -5px rgba(0,0,0,0.1);
        }

        .card-icon {
            font-size: 2rem;
            color: var(--accent);
            margin-bottom: 1rem;
        }

        .card h3 {
            font-size: 1.2rem;
            color: var(--primary);
            margin-bottom: 0.5rem;
        }

        .card .date {
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-bottom: 1rem;
            display: block;
        }

        .card ul {
            padding-right: 1.2rem;
            font-size: 0.95rem;
            color: var(--text-dark);
        }

        .card ul li {
            margin-bottom: 0.5rem;
        }

        /* Skills Badges */
        .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.8rem;
        }

        .skill-chip {
            background-color: white;
            border: 1px solid var(--border-color);
            padding: 0.6rem 1.2rem;
            border-radius: 8px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .skill-chip i {
            color: var(--accent);
        }

        /* Contact Section */
        .contact-box {
            background: var(--primary);
            color: white;
            padding: 3rem;
            border-radius: 16px;
            text-align: center;
        }

        .contact-box h2 {
            margin-bottom: 1rem;
        }

        .contact-links {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 2rem;
            flex-wrap: wrap;
        }

        .contact-btn {
            color: white;
            background: rgba(255,255,255,0.1);
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: background 0.3s;
        }

        .contact-btn:hover {
            background: rgba(255,255,255,0.25);
        }

        footer {
            text-align: center;
            padding: 2rem;
            color: var(--text-muted);
            border-top: 1px solid var(--border-color);
            font-size: 0.9rem;
        }

        @media (max-width: 768px) {
            .nav-links { display: none; }
            .hero h1 { font-size: 2rem; }
        }
    </style>
</head>
<body>

    <!-- Header Navigation -->
    <header>
        <div class="nav-container">
            <div class="logo">نوف البدراني</div>
            <ul class="nav-links">
                <li><a href="#about">نبذة عني</a></li>
                <li><a href="#experience">الخبرات</a></li>
                <li><a href="#education">التعليم</a></li>
                <li><a href="#skills">المهارات</a></li>
                <li><a href="#contact">التواصل</a></li>
            </ul>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="profile-img-placeholder">
            <i class="fa-solid fa-user-shield"></i>
        </div>
        <span class="badge-tag">الامتثال المالي والرقابة الحوكمية</span>
        <h1>نوف فارس البدراني</h1>
        <h3>متخصصة بالشريعة | أخصائي امتثال وعمليات | الرياض، المملكة العربية السعودية</h3>
        <div class="cta-buttons">
            <a href="#contact" class="btn btn-primary"><i class="fa-solid fa-envelope"></i> تواصل معي</a>
            <a href="mailto:noufalbadrani3@gmail.com" class="btn btn-secondary"><i class="fa-solid fa-download"></i> تحميل السي في</a>
        </div>
    </section>

    <!-- About Section -->
    <section id="about">
        <h2 class="section-title">نبذة عني</h2>
        <p style="font-size: 1.1rem; color: var(--text-dark); max-width: 800px;">
            متخصصة خريجة <strong>شريعة</strong> وحاصلة على تأهيل مهني ومكثف في <strong>الامتثال المالي والرقابة</strong>[cite: 1]. أمتلك سجلاً حافلاً في تحسين رضا العملاء، رفع كفاءة العمليات، وحل المشكلات المعقدة بأسلوب تحليلي مبني على البيانات[cite: 1]. ألتزم بتطبيق المعايير الأخلاقية والأنظمة الحوكمية للمساهمة في تحقيق الأهداف الاستراتيجية للمؤسسات[cite: 1].
        </p>
    </section>

    <!-- Experience Section -->
    <section id="experience">
        <h2 class="section-title">الخبرات المهنية</h2>
        <div class="cards-grid">
            
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-briefcase"></i></div>
                <h3>أخصائي عمليات (Operations Associate)</h3>
                <span class="date">شركة عملة (Omlah Co.) | أغسطس 2023 - الحالي</span>[cite: 1]
                <ul>
                    <li>تحسين زمن الاستجابة واستفسارات العملاء بنسبة 15% من خلال تسهيل التواصل[cite: 1].</li>
                    <li>الحفاظ على معدل رضا عملاء قدره 95% عبر تقديم حلول استباقية[cite: 1].</li>
                    <li>تحليل استبيانات الجودة وتطبيق 3 تحسينات رئيسية في الخدمات[cite: 1].</li>
                    <li>إدارة وتنسيق الجدولة بنسبة دقة 100% ومنع تضارب المواعيد[cite: 1].</li>
                </ul>
            </div>

            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-scale-balanced"></i></div>
                <h3>أخصائي امتثال - تدريب (Compliance Intern)</h3>
                <span class="date">شركة عملة للصرافة | يناير 2026 - يونيو 2026</span>[cite: 1]
                <ul>
                    <li>التطبيق العملي للوائح الرقابية وفحص الهويات واكتشاف المخاطر المالي.</li>
                    <li>متابعة إجراءات الالتزام والأنظمة والتحقق من صحة البيانات.</li>
                </ul>
            </div>

            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-users"></i></div>
                <h3>قائد الموارد البشرية (HR Leader)</h3>
                <span class="date">نادي تكوين الفنون - جامعة الإمام | 2024 - 2026</span>[cite: 1]
                <ul>
                    <li>إدارة عمليات الاستقطاب والمقابلات بنسبة 100% للأعضاء الجدد[cite: 1].</li>
                    <li>قيادة التنسيق بين 5 لجان مختلفة لتنفيذ برنامج التميز الأسبوعي[cite: 1].</li>
                </ul>
            </div>

        </div>
    </section>

    <!-- Education & Certifications -->
    <section id="education">
        <h2 class="section-title">التعليم والشهادات المهنية</h2>
        <div class="cards-grid">
            
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-graduation-cap"></i></div>
                <h3>بكالوريوس شريعة</h3>
                <span class="date">جامعة الإمام محمد بن سعود الإسلامية | 2026</span>[cite: 1]
                <p>تخصص شرعي يركز على الفقه المقارن، الحوكمة، والمعاملات المالية الإسلامية.</p>
            </div>

            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-certificate"></i></div>
                <h3>الشهادات المهنية</h3>
                <span class="date">الأكاديمية المالية وأكاديمية الاستثمار</span>[cite: 1]
                <ul>
                    <li>الاختبار المهني لأساسيات الامتثال - الأكاديمية المالية (2026)[cite: 1]</li>
                    <li>مكافحة غسل الأموال وتمويل الإرهاب (AML) (2025)[cite: 1]</li>
                    <li>مهارات مكافحة الاحتيال والتزوير (2025)[cite: 1]</li>
                    <li>حماية البيانات الشخصية (2025)[cite: 1]</li>
                </ul>
            </div>

        </div>
    </section>

    <!-- Skills Section -->
    <section id="skills">
        <h2 class="section-title">المهارات والقدرات</h2>
        <div class="skills-container">
            <div class="skill-chip"><i class="fa-solid fa-check-circle"></i> الامتثال والرقابة التنظيمية (Regulatory Compliance)</div>
            <div class="skill-chip"><i class="fa-solid fa-check-circle"></i> إدارة المخاطر (Risk Management)</div>
            <div class="skill-chip"><i class="fa-solid fa-check-circle"></i> استقطاب الكفاءات وتنسيق الموارد البشرية</div>
            <div class="skill-chip"><i class="fa-solid fa-check-circle"></i> إدارة علاقات العملاء (CRM)</div>
            <div class="skill-chip"><i class="fa-solid fa-check-circle"></i> حل المشكلات القائم على البيانات</div>
            <div class="skill-chip"><i class="fa-solid fa-check-circle"></i> تميز العمليات وتطوير الإجراءات</div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact">
        <div class="contact-box">
            <h2>تواصل معي مباشرة</h2>
            <p>أرحب دائمًا بفرص التعاون المهني والاستشارات في مجالات الامتثال والعمليات</p>
            <div class="contact-links">
                <a href="mailto:noufalbadrani3@gmail.com" class="contact-btn"><i class="fa-solid fa-envelope"></i> noufalbadrani3@gmail.com</a>
                <a href="https://linkedin.com" target="_blank" class="contact-btn"><i class="fa-brands fa-linkedin"></i> LinkedIn Profile</a>
                <span class="contact-btn"><i class="fa-solid fa-location-dot"></i> الرياض، المملكة العربية السعودية</span>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <p>© 2026 نوف البدراني. جميع الحقوق محفوظة.</p>
    </footer>

</body>
</html>
