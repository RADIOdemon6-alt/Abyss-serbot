import React, { useState } from "react";
import "./App.css";
import { registerUser, loginUser } from "./firebase";

export default function App() {
  const [isLogin, setIsLogin] = useState(true); // التبديل بين تسجيل و دخول
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // تسجيل جديد
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const uid = await registerUser({ name, phone, password });
      alert(`✅ تم التسجيل بنجاح، ID: ${uid}`);
      setIsLogin(true); // بعد التسجيل يرجع لواجهة تسجيل الدخول
    } catch (err) {
      alert("🚨 خطأ في التسجيل: " + err.message);
    }
  };

  // تسجيل الدخول
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({ phone, password });
      alert(`👋 أهلًا ${user.name}`);
    } catch (err) {
      alert("🚨 خطأ في تسجيل الدخول: " + err.message);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">🌌 Abyss</h1>

      {isLogin ? (
        <form className="form-box" onSubmit={handleLogin}>
          <h2>تسجيل الدخول</h2>
          <input
            type="text"
            placeholder="📱 رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="🔑 كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          />
          <input
            type="text"
            placeholder="📱 رقم الهاتف (مع +)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="🔑 كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
