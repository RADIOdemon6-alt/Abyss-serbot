import React, { useState, useEffect } from "react";
import "./style.css"; // ملف CSS منفصل
import profilePic from "./profile.jpg"; // ضع الصورة في نفس المجلد أو مسار مناسب
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faInfoCircle, faShoppingBag, faPhone, faStar, faUser, faSignOutAlt, faFire, faUserShield, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faGitAlt, faGithub } from "@fortawesome/free-brands-svg-icons";

function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // تحريك progress bars
  useEffect(() => {
    const progressElements = document.querySelectorAll(".progress");
    progressElements.forEach((el) => {
      const value = el.getAttribute("data-value");
      el.style.width = "0%";
      setTimeout(() => {
        el.style.width = value + "%";
      }, 200);
    });
  }, []);

  return (
    <div className="home-wrapper">
      {/* الشريط العلوي */}
      <header className="top-bar">
        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1 className="top-title">Welcome to Abyss Core</h1>
      </header>

      {/* القائمة الجانبية */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="profile-container">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <div className="profile-info">
            <h2>محمد وليد محمد</h2>
            <p>👹 شيطان الإذاعة</p>
            <p>🎂 العمر: 17</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li><a href="#"><FontAwesomeIcon icon={faHome} /> الرئيسية</a></li>
            <li><a href="#"><FontAwesomeIcon icon={faInfoCircle} /> عني</a></li>
            <li><a href="#"><FontAwesomeIcon icon={faShoppingBag} /> المنتجات</a></li>
            <li><a href="#"><FontAwesomeIcon icon={faPhone} /> تواصل</a></li>
            <li><a href="#"><FontAwesomeIcon icon={faStar} /> التوصيات</a></li>
            <li><a href="#"><FontAwesomeIcon icon={faUser} /> البروفايل</a></li>
          </ul>

          <div className="logout">
            <a href="#"><FontAwesomeIcon icon={faSignOutAlt} /> تسجيل خروج</a>
          </div>
        </nav>
      </aside>

      {/* المحتوى */}
      <main className="content">
        <h1 className="neon">Welcome, I am Frontend-DEV</h1>

        {/* المهارات */}
        <section className="languages">
          <h3 className="neon">📚 المهارات ونسبة الإتقان</h3>
          {[
            { name: "HTML", value: 100 },
            { name: "CSS", value: 95 },
            { name: "JavaScript", value: 85 },
            { name: "React", value: 40 },
          ].map((skill, i) => (
            <div className="skill" key={i}>
              <span>{skill.name}</span>
              <div className="progress-bar">
                <div className="progress" data-value={skill.value}><span>{skill.value}%</span></div>
              </div>
            </div>
          ))}
        </section>

        {/* الأدوات */}
        <section className="tools">
          <h3 className="neon">🛠 الأدوات التي أستخدمها</h3>
          <div className="tools-container">
            <div className="tool"><FontAwesomeIcon icon={faGitAlt} /><span>Git</span></div>
            <div className="tool"><FontAwesomeIcon icon={faGithub} /><span>GitHub</span></div>
            <div className="tool"><FontAwesomeIcon icon={faFire} /><span>Firebase</span></div>
            <div className="tool"><FontAwesomeIcon icon={faUserShield} /><span>Firebase Auth</span></div>
            <div className="tool"><FontAwesomeIcon icon={faDatabase} /><span>Firestore</span></div>
          </div>
        </section>

        <p className="description neon">
          هذا الموقع عبارة عن عرض سيرتي الذاتية وتنصيب بوت واتس وتعليم فرونت اند (قريبا)
        </p>
      </main>
    </div>
  );
}

export default HomePage;
