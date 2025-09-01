import React, { useState, useEffect } from "react";
import "./Home.css";
import profilePic from "./profile.jpg"; // ضع صورتك هنا

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  // تغيير النص بعد 5 ثواني
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
      setShowIntro(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { name: "Home", color: "orange" },
    { name: "About", color: "green" },
    { name: "Testimonials", color: "blue" },
    { name: "Projects", color: "red" },
    { name: "Contact", color: "rebeccapurple" },
  ];

  const handleTabClick = (item) => setActiveTab(item.name);

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="nav">
        {navItems.map((item, i) => (
          <a
            key={i}
            className={`nav-item ${activeTab === item.name ? "is-active" : ""}`}
            style={activeTab === item.name ? { color: item.color } : {}}
            onClick={() => handleTabClick(item)}
          >
            {item.name}
          </a>
        ))}
        <span className="nav-indicator" style={{
          backgroundColor: navItems.find(i => i.name === activeTab).color
        }}></span>
      </nav>

      {/* Welcome */}
      {showWelcome && (
        <h2 className="welcome-text neon">Welcome to ABYSS Core</h2>
      )}

      {/* Intro */}
      {showIntro && (
        <div className="intro-section">
          <div className="profile-container">
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <div className="floating-text">
              <h1 className="neon">Welcome, I am Frontend-DEV</h1>
              <p>المطور</p>
              <p>الاسم: محمد وليد محمد</p>
              <p>اللقب: شيطان الإذاعة</p>
              <p>العمر: 17</p>
            </div>
          </div>

          {/* Languages Table */}
          <div className="languages">
            <h3 className="neon">اللغات ونسبة الإتقان</h3>
            <table>
              <tbody>
                <tr><td>HTML</td><td>100%</td></tr>
                <tr><td>CSS</td><td>100%</td></tr>
                <tr><td>JS</td><td>90%</td></tr>
                <tr><td>React</td><td>20%</td></tr>
              </tbody>
            </table>
          </div>

          {/* Tools */}
          <div className="tools">
            <h3 className="neon">الأدوات التي استخدمها</h3>
            <ul>
              <li>Git</li>
              <li>GitHub</li>
              <li>Firebase</li>
              <li>Firebase Auth</li>
              <li>Firebase Firestore</li>
            </ul>
          </div>

          {/* Description */}
          <p className="description neon">
            هذا الموقع عبارة عن عرض سيرتي الذاتية وتنصيب بوت واتس وتعليم فرونت اند (قريبا)
          </p>
        </div>
      )}
    </div>
  );
          }
