window.addEventListener("DOMContentLoaded", () => {
  const welcomeText = document.getElementById("welcomeText");
  const introSection = document.getElementById("introSection");
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggler = document.querySelector(".sidebar-toggler");
  const menuToggler = document.querySelector(".menu-toggler");

  // إخفاء كل العناصر قبل الترحيب
  if (introSection) introSection.classList.add("hidden");
  if (sidebar) sidebar.classList.add("hidden");
  if (welcomeText) welcomeText.style.display = "block";

  // بعد 5 ثواني: إظهار المحتوى
  setTimeout(() => {
    if (welcomeText) welcomeText.style.display = "none";
    if (introSection) introSection.classList.remove("hidden");
    if (sidebar) sidebar.classList.remove("hidden");
  }, 5000);

  // التحكم في sidebar
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
