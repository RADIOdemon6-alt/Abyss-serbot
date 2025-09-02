window.addEventListener("DOMContentLoaded", () => {
  const welcomeText = document.getElementById("welcomeText");
  const introSection = document.getElementById("introSection");
  const navItems = document.querySelectorAll(".nav-item");
  const navIndicator = document.querySelector(".nav-indicator");
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggler = document.querySelector(".sidebar-toggler");
  const menuToggler = document.querySelector(".menu-toggler");
  const homeContainer = document.querySelector(".home-container");

  // إخفاء كل العناصر أولًا قبل الترحيب
  if (introSection) introSection.classList.add("hidden");
  if (sidebar) sidebar.classList.add("hidden");
  if (homeContainer) homeContainer.style.opacity = "0";

  // بعد 5 ثواني: إخفاء الترحيب وعرض باقي المحتوى
  setTimeout(() => {
    if (welcomeText) welcomeText.style.display = "none";
    if (introSection) introSection.classList.remove("hidden");
    if (sidebar) sidebar.classList.remove("hidden");
    if (homeContainer) {
      homeContainer.style.transition = "opacity 0.5s ease-in";
      homeContainer.style.opacity = "1";
    }
  }, 5000);

  // التنقل بين التابات
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((el) => el.classList.remove("is-active"));
      item.classList.add("is-active");

      // تغيير لون المؤشر
      const color = item.dataset.color;
      if (navIndicator) navIndicator.style.backgroundColor = color;
    });
  });

  // اللون الأول افتراضي
  if (navIndicator) navIndicator.style.backgroundColor = "orange";

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
