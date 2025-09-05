// زر القائمة
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// تشغيل الأنيميشن للـ Progress Bars
window.addEventListener("load", () => {
  const progresses = document.querySelectorAll(".progress");
  progresses.forEach(bar => {
    const value = bar.getAttribute("data-value");
    setTimeout(() => { bar.style.width = value + "%"; }, 300);
  });
});
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  menuBtn.classList.toggle("active");
});
