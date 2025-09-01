import React, { useState } from "react";
import "./App.css";
import countries from "./countries.json";
import { registerUser, loginUser } from "./firebase"; // 🔥 firebase functions

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [useEmail, setUseEmail] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+20");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // 🟢 تسجيل جديد
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = useEmail
        ? { name, email, password }
        : { name, phone: countryCode + phone, password };

      const uid = await registerUser(userData);
      alert(`✅ تم التسجيل بنجاح، ID: ${uid}`);
      setIsLogin(true);
    } catch (err) {
      alert("🚨 خطأ في التسجيل: " + err.message);
    }
  };

  // 🔵 تسجيل الدخول
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = useEmail
        ? { email, password }
        : { phone: countryCode + phone, password };

      const user = await loginUser(userData);
      alert(`👋 أهلًا ${user.name || "مستخدم"}`);
    } catch (err) {
      alert("🚨 خطأ في تسجيل الدخول: " + err.message);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">🌌 Abyss</h1>

      <div className="toggle-method">
        <button
          onClick={() => setUseEmail(false)}
          className={!useEmail ? "active" : ""}
        >
          📱 هاتف
        </button>
        <button
          onClick={() => setUseEmail(true)}
          className={useEmail ? "active" : ""}
        >
          📧 إيميل
        </button>
      </div>

      {isLogin ? (
        <form className="form-box" onSubmit={handleLogin}>
          <h2>تسجيل الدخول</h2>

          {useEmail ? (
            <input
              type="email"
              placeholder="📧 الإيميل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          ) : (
            <div className="phone-box">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {countries.map((c, i) => (
                  <option key={i} value={c.code}>
                    {c.flag} {c.name} ({c.code})
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="📱 رقم الهاتف"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          )}

          <input
            type="password"
            placeholder="🔑 كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">دخول</button>
          <p onClick={() => setIsLogin(false)} className="switch">
            ليس لديك حساب؟ سجّل الآن
          </p>
        </form>
      ) : (
        <form className="form-box" onSubmit={handleRegister}>
          <h2>تسجيل جديد</h2>

          <input
            type="text"
            placeholder="👤 الاسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {useEmail ? (
            <input
              type="email"
              placeholder="📧 الإيميل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          ) : (
            <div className="phone-box">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {countries.map((c, i) => (
                  <option key={i} value={c.code}>
                    {c.flag} {c.name} ({c.code})
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="📱 رقم الهاتف"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          )}

          <input
            type="password"
            placeholder="🔑 كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">تسجيل</button>
          <p onClick={() => setIsLogin(true)} className="switch">
            لديك حساب؟ تسجيل الدخول
          </p>
        </form>
      )}
    </div>
  );
            }
