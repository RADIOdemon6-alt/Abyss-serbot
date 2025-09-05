import React, { useState } from "react";
import countries from "./countries.json";
import { registerUser, loginUser } from "./firebase";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [useEmail, setUseEmail] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+20");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // 🔑 hook للتنقل

  const resetFields = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setErrorMessage("");
  };

  const navigateToHome = () => {
    // 🚀 تنقل للـ HTML خارج React
    window.location.href = "/assets/page/home/home.html";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const userData = useEmail
        ? { name, email, password }
        : { name, phone: countryCode + phone, password };

      await registerUser(userData);
      resetFields();
      navigateToHome();
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
    try {
      const userData = useEmail
        ? { email, password }
        : { phone: countryCode + phone, password };

      await loginUser(userData);
      resetFields();
      navigateToHome();
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
          <button type="submit">دخول</button>
          <p
            onClick={() => {
              resetFields();
              setIsLogin(false);
            }}
            className="switch"
          >
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
          <button type="submit">تسجيل</button>
          <p
            onClick={() => {
              resetFields();
              setIsLogin(true);
            }}
            className="switch"
          >
            لديك حساب؟ تسجيل الدخول
          </p>
        </form>
      )}
    </div>
  );
}

export default AuthForm;
