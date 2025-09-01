// 📦 Firebase من npm
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from "firebase/firestore";

// 🔑 إعدادات Firebase الخاصة بمشروعك
const firebaseConfig = {
  apiKey: "AIzaSyCCrcCg0M8ICcCCynyj9oie1Ol6kNtzh3Q",
  authDomain: "abyss-jadibot.firebaseapp.com",
  projectId: "abyss-jadibot",
  storageBucket: "abyss-jadibot.firebasestorage.app",
  messagingSenderId: "270956228689",
  appId: "1:270956228689:web:370b3e11bfdd279a428870",
  measurementId: "G-FJY8VV651N"
};

// 🚀 تهيئة Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// 🌀 تحويل رقم الهاتف → إيميل وهمي
export function phoneToEmail(phone) {
  return phone.replace(/[^+\d]/g, '') + "@abyss.com";
}

// 🟢 تسجيل مستخدم جديد
export async function registerUser({ name, phone, password }) {
  const email = phoneToEmail(phone);
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  // حفظ البيانات في Firestore
  await setDoc(doc(db, "users", uid), {
    name,
    phone,
    createdAt: serverTimestamp()
  });

  return uid;
}

// 🔵 تسجيل دخول
export async function loginUser({ phone, password }) {
  const email = phoneToEmail(phone);
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  // جلب بيانات المستخدم
  const userSnap = await getDoc(doc(db, "users", uid));
  if (userSnap.exists()) {
    return { uid, ...userSnap.data() };
  } else {
    throw new Error("🚨 لم يتم العثور على بيانات المستخدم");
  }
}
