import React, { useState } from "react";
import countries from "./assets/countries.json";
import { registerUser, loginUser } from "./assets/firebase";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [useEmail, setUseEmail] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+20");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [logConsole, setLogConsole] = useState([]); // رسائل الكونسول

  const resetFields = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setMessage("");
    setMessageType("");
  };

  // إضافة رسالة للكونسول الداخلي مع نوع (error, success, warning)
  const addLog = (text, type = "info") => {
    setLogConsole(prev => [...prev, { text, type }]);
  };

  const navigateToHome = () => {
    addLog("🔹 الانتقال إلى صفحة Home...", "warning");
    window.open("/assets/page/home/home.html", "_self");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    addLog("🚀 بدء عملية التسجيل...", "warning");

    try {
      const userData = useEmail
        ? { name, email, password }
        : { name, phone: countryCode + phone, password };

      addLog(`📌 البيانات المرسلة للتسجيل: ${JSON.stringify(userData)}`, "info");
      await registerUser(userData);
      setMessage("✅ تم التسجيل بنجاح!");
      setMessageType("success");
      addLog("✅ تم التسجيل بنجاح!", "success");

      setTimeout(() => {
        resetFields();
        navigateToHome();
      }, 1000);
    } catch (err) {
      let errorText = "🚨 خطأ في التسجيل";
      if (err.code === "auth/email-already-in-use") errorText = "🚨 هذا الحساب مستخدم مسبقًا";
      else if (err.code === "auth/invalid-email") errorText = "🚨 الإيميل غير صالح";
      else if (err.code === "auth/weak-password") errorText = "🚨 كلمة المرور ضعيفة";
      else if (err.code === "auth/invalid-phone-number") errorText = "🚨 رقم الهاتف غير صالح";

      setMessage(errorText);
      setMessageType("error");
      addLog(`❌ حدث خطأ: ${errorText}`, "error");
      addLog(`تفاصيل Firebase: ${JSON.stringify(err)}`, "error");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    addLog("🚀 بدء عملية تسجيل الدخول...", "warning");

    try {
      const userData = useEmail
        ? { email, password }
        : { phone: countryCode + phone, password };

      addLog(`📌 البيانات المرسلة لتسجيل الدخول: ${JSON.stringify(userData)}`, "info");
      await loginUser(userData);
      setMessage("✅ تم تسجيل الدخول بنجاح!");
      setMessageType("success");
      addLog("✅ تم تسجيل الدخول بنجاح!", "success");

      setTimeout(() => {
        resetFields();
        navigateToHome();
      }, 1000);
    } catch (err) {
      let errorText = "🚨 خطأ في تسجيل الدخول";
      if (err.code === "auth/wrong-password") errorText = "🚨 كلمة المرور خاطئة";
      else if (err.code === "auth/user-not-found") errorText = "🚨 الحساب غير موجود";
      else if (!useEmail) errorText = "🚨 رقم الهاتف خاطئ";

      setMessage(errorText);
      setMessageType("error");
      addLog(`❌ حدث خطأ: ${errorText}`, "error");
      addLog(`تفاصيل Firebase: ${JSON.stringify(err)}`, "error");
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

      {message && (
        <p className={messageType === "error" ? "error-msg" : "success-msg"}>{message}</p>
      )}

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
                type="tel"
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
                type="tel"
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
          <p onClick={() => { resetFields(); setIsLogin(true); }} className="switch">
            لديك حساب؟ تسجيل الدخول
          </p>
        </form>
      )}

      {/* 🖥️ كونسول مباشر داخل الصفحة مع ألوان */}
      <div className="console-box">
        <h3>Console Logs:</h3>
        <div className="logs">
          {logConsole.map((log, i) => {
            let color = "white";
            if (log.type === "error") color = "red";
            else if (log.type === "success") color = "green";
            else if (log.type === "warning") color = "yellow";
            return (
              <p key={i} style={{ color, margin: "2px 0", fontFamily: "monospace" }}>
                {log.text}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
