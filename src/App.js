import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import countries from "./countries.json";
import { registerUser, loginUser } from "./firebase";
import Home from "./assets/page/home";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [useEmail, setUseEmail] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+20");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const resetFields = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const userData = useEmail
        ? { name, email, password }
        : { name, phone: countryCode + phone, password };

      await registerUser(userData);
      setSuccessMessage("✅ تم التسجيل بنجاح!");
      resetFields();

      // 🌐 إعادة التوجيه باستخدام window.location
      window.location.href = "/home";
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setErrorMessage("🚨 هذا الحساب مستخدم مسبقًا");
      } else if (err.code === "auth/invalid-email") {
        setErrorMessage("🚨 الإيميل غير صالح");
      } else {
        setErrorMessage("🚨 خطأ في التسجيل: " + err.message);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const userData = useEmail
        ? { email, password }
        : { phone: countryCode + phone, password };

      await loginUser(userData);
      setSuccessMessage("✅ تم تسجيل الدخول بنجاح!");
      resetFields();

      // 🌐 إعادة التوجيه باستخدام window.location
      window.location.href = "/home";
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setErrorMessage("🚨 كلمة المرور خاطئة");
      } else if (err.code === "auth/user-not-found") {
        setErrorMessage("🚨 لم يتم العثور على المستخدم");
      } else {
        setErrorMessage("🚨 خطأ في تسجيل الدخول: " + err.message);
      }
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">ABYSS-Jadibot</h1>

      <div className="toggle-method">
        <button onClick={() => setUseEmail(false)} className={!useEmail ? "active" : ""}>
          📱 هاتف
        </button>
        <button onClick={() => setUseEmail(true)} className={useEmail ? "active" : ""}>
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
              <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
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
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          {successMessage && <p className="success-msg">{successMessage}</p>}
          <button type="submit">دخول</button>
          <p onClick={() => { resetFields(); setIsLogin(false); }} className="switch">
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
              <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
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
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          {successMessage && <p className="success-msg">{successMessage}</p>}
          <button type="submit">تسجيل</button>
          <p onClick={() => { resetFields(); setIsLogin(true); }} className="switch">
            لديك حساب؟ تسجيل الدخول
          </p>
        </form>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
      }
