window.addEventListener("DOMContentLoaded", () => {
  const welcomeText = document.getElementById("welcomeText");
  const introSection = document.getElementById("introSection");
  const navItems = document.querySelectorAll(".nav-item");
  const navIndicator = document.querySelector(".nav-indicator");
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggler = document.querySelector(".sidebar-toggler");
  const menuToggler = document.querySelector(".menu-toggler");

  // بعد 5 ثواني: إخفاء الترحيب وعرض باقي المحتوى
  setTimeout(() => {
    welcomeText.style.display = "none";
    introSection.classList.remove("hidden");
    if (sidebar) sidebar.classList.remove("hidden");
  }, 5000);

  // التنقل بين التابات
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((el) => el.classList.remove("is-active"));
      item.classList.add("is-active");

      // تغيير لون المؤشر
      const color = item.dataset.color;
      navIndicator.style.backgroundColor = color;
    });
  });

  // اللون الأول افتراضي
  navIndicator.style.backgroundColor = "orange";

  // التحكم في sidebar (إن وجد)
  if (sidebar && sidebarToggler) {
    sidebarToggler.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });
  }

  if (sidebar && menuToggler) {
    menuToggler.addEventListener("click", () => {
      sidebar.classList.toggle("menu-active");
    });
  }
});
