import React, { useState, useEffect, useRef } from "react";
import countries from "./countries.json";
import { registerUser, loginUser } from "./firebase";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [useEmail, setUseEmail] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+20");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "error" أو "success"
  const [consoleLogs, setConsoleLogs] = useState([]);
  const consoleEndRef = useRef(null);

  // 🔹 إضافة رسالة للكونسول مع وقت
  const addConsoleLog = (text) => {
    const time = new Date().toLocaleTimeString();
    setConsoleLogs((prev) => [...prev, `[${time}] ${text}`]);
  };

  // 🔹 تمرير تلقائي للكونسول
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs]);

  const resetFields = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setMessage("");
    setMessageType("");
  };

  const navigateToHome = () => {
    addConsoleLog("🔄 إعادة التوجيه لصفحة home.html...");
    window.location.href = "/assets/page/home/home.html";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    addConsoleLog("🟢 محاولة تسجيل الدخول...");
    addConsoleLog("Data: " + JSON.stringify(useEmail ? { email, password } : { phone: countryCode + phone, password }));

    try {
      const userData = useEmail
        ? { email, password }
        : { phone: countryCode + phone, password };

      await loginUser(userData);
      addConsoleLog("✅ تسجيل الدخول ناجح!");
      setMessage("✅ تم تسجيل الدخول بنجاح!");
      setMessageType("success");

      setTimeout(() => {
        resetFields();
        navigateToHome();
      }, 1000);

    } catch (err) {
      addConsoleLog("❌ خطأ أثناء تسجيل الدخول: " + JSON.stringify(err));
      let errorText = "🚨 خطأ في تسجيل الدخول";
      if (err.code === "auth/wrong-password") errorText = "🚨 كلمة المرور خاطئة";
      else if (err.code === "auth/user-not-found") errorText = "🚨 الحساب غير موجود";
      else if (!useEmail) errorText = "🚨 رقم الهاتف خاطئ";

      setMessage(errorText);
      setMessageType("error");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    addConsoleLog("🟢 محاولة تسجيل مستخدم جديد...");
    addConsoleLog("Data: " + JSON.stringify(useEmail ? { name, email, password } : { name, phone: countryCode + phone, password }));

    try {
      const userData = useEmail
        ? { name, email, password }
        : { name, phone: countryCode + phone, password };

      await registerUser(userData);
      addConsoleLog("✅ التسجيل ناجح!");
      setMessage("✅ تم التسجيل بنجاح!");
      setMessageType("success");

      setTimeout(() => {
        resetFields();
        navigateToHome();
      }, 1000);

    } catch (err) {
      addConsoleLog("❌ خطأ أثناء التسجيل: " + JSON.stringify(err));
      let errorText = "🚨 خطأ في التسجيل";
      if (err.code === "auth/email-already-in-use") errorText = "🚨 هذا الحساب مستخدم مسبقًا";
      else if (err.code === "auth/invalid-email") errorText = "🚨 الإيميل غير صالح";
      else if (err.code === "auth/weak-password") errorText = "🚨 كلمة المرور ضعيفة";

      setMessage(errorText);
      setMessageType("error");
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">ABYSS-Jadibot</h1>

      {/* اختيار طريقة التسجيل: إيميل أو هاتف */}
      <div className="toggle-method">
        <button onClick={() => setUseEmail(false)} className={!useEmail ? "active" : ""}>📱 هاتف</button>
        <button onClick={() => setUseEmail(true)} className={useEmail ? "active" : ""}>📧 إيميل</button>
      </div>

      {/* رسالة الخطأ أو النجاح */}
      {message && (
        <p className={messageType === "error" ? "error-msg" : "success-msg"}>{message}</p>
      )}

      {isLogin ? (
        <form className="form-box" onSubmit={handleLogin}>
          <h2>تسجيل الدخول</h2>
          {useEmail ? (
            <input type="email" placeholder="📧 الإيميل" value={email} onChange={(e) => setEmail(e.target.value)} required />
          ) : (
            <div className="phone-box">
              <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                {countries.map((c, i) => (
                  <option key={i} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                ))}
              </select>
              <input type="text" placeholder="📱 رقم الهاتف" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          )}
          <input type="password" placeholder="🔑 كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">دخول</button>
          <p onClick={() => { resetFields(); setIsLogin(false); }} className="switch">ليس لديك حساب؟ سجّل الآن</p>
        </form>
      ) : (
        <form className="form-box" onSubmit={handleRegister}>
          <h2>تسجيل جديد</h2>
          <input type="text" placeholder="👤 الاسم" value={name} onChange={(e) => setName(e.target.value)} required />
          {useEmail ? (
            <input type="email" placeholder="📧 الإيميل" value={email} onChange={(e) => setEmail(e.target.value)} required />
          ) : (
            <div className="phone-box">
              <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                {countries.map((c, i) => (
                  <option key={i} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                ))}
              </select>
              <input type="text" placeholder="📱 رقم الهاتف" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          )}
          <input type="password" placeholder="🔑 كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">تسجيل</button>
          <p onClick={() => { resetFields(); setIsLogin(true); }} className="switch">لديك حساب؟ تسجيل الدخول</p>
        </form>
      )}

      {/* كونسول داخلي */}
      <div className="page-console" style={{marginTop:"20px"}}>
        <h3>Console Log:</h3>
        <div style={{background: "#000", color: "#0f0", padding: "10px", height: "150px", overflowY: "scroll", fontFamily: "monospace", fontSize:"12px"}}>
          {consoleLogs.map((log, i) => <div key={i}>{log}</div>)}
          <div ref={consoleEndRef} />
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
