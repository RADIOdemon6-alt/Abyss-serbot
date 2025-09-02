// التحكم في إظهار welcome / intro بعد 5 ثواني
window.addEventListener("DOMContentLoaded", () => {
  const welcomeText = document.getElementById("welcomeText");
  const introSection = document.getElementById("introSection");
  const navItems = document.querySelectorAll(".nav-item");
  const navIndicator = document.querySelector(".nav-indicator");

  // بعد 5 ثواني اخفي welcome واظهر intro
  setTimeout(() => {
    welcomeText.style.display = "none";
    introSection.classList.remove("hidden");
  }, 5000);

  // التنقل بين التابات
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      // شيل active من الكل
      navItems.forEach((el) => el.classList.remove("is-active"));
      // ضيف active للعنصر المضغوط
      item.classList.add("is-active");

      // غير لون المؤشر
      const color = item.dataset.color;
      navIndicator.style.backgroundColor = color;
    });
  });

  // اللون الأول افتراضي
  navIndicator.style.backgroundColor = "orange";
});
