/* ==========================================================
   CENTRO AUTOMOTIVO EMERSON — script principal
   1) Menu mobile  2) Header com fundo sólido ao rolar
   3) Fechar menu ao clicar em link  4) Ano dinâmico no rodapé
   5) Fade-in dos elementos ao entrar na viewport
   ========================================================== */
(function () {
  "use strict";

  // 1) Menu mobile (abre/fecha)
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("mobile-open");
  });

  // 3) Fecha o menu mobile ao clicar em qualquer link do menu
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navLinks.classList.remove("mobile-open");
    });
  });

  // 2) Header ganha fundo sólido depois de rolar um pouco a página
  var header = document.getElementById("header");
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  // 4) Atualiza o ano do copyright automaticamente
  document.getElementById("year").textContent = new Date().getFullYear();

  // 5) Fade-in suave de seções/cards ao entrar na viewport
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });
    revealEls.forEach(function (el) { observer.observe(el); });

    // Rede de segurança: caso algum elemento nunca cruze o observer
    // (ex: rolagem muito rápida, viewport atípica, navegador com bug),
    // garante que todo o conteúdo apareça de qualquer forma após um tempo.
    window.setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }, 2500);
  } else {
    // Fallback para navegadores sem suporte a IntersectionObserver: mostra tudo direto
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
