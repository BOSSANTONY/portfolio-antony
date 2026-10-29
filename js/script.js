document.addEventListener("DOMContentLoaded", () => {
  const projects = [
    {name:"BudgetFlow",category:"APPLICATION WEB",description:"Application de gestion financière personnelle pour suivre les revenus, les dépenses et le budget depuis une interface claire.",url:"https://bossantony.github.io/budgetflow/",github:"https://github.com/BOSSANTONY/budgetflow",technologies:["HTML","CSS","JavaScript"],icon:"bi-wallet2"},
    {name:"CitoyenActif",category:"PLATEFORME WEB",description:"Projet de plateforme numérique conçue pour présenter une solution web destinée aux citoyens.",url:"https://antonychristmab.pythonanywhere.com/",github:"https://bossantony.github.io/citoyenactif/",technologies:["Python","Django","HTML","CSS"],icon:"bi-people"},
    {name:"TaskFlow",category:"ORGANISATION",description:"Plateforme web pour présenter, organiser et consulter des tâches dans un contexte de travail en équipe.",url:"https://taskflow-f5xx.onrender.com/",github:"https://bossantony.github.io/taskflow/",technologies:["HTML","CSS","JavaScript"],icon:"bi-kanban"},
    {name:"BEJART-METEO",category:"APPLICATION MÉTÉO",description:"Interface météo réalisée avec des technologies web modernes pour consulter des informations météorologiques.",url:"https://meteosama.vercel.app/",github:"https://bossantony.github.io/meteosama/",technologies:["React","Next.js","Tailwind CSS"],icon:"bi-cloud-sun"}
  ];
  const container = document.getElementById("projects-container");
  const safe = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  if (container) {
    projects.forEach(project => {
      const card = document.createElement("article");
      card.className = "project-card reveal";
      const tech = project.technologies.map(item => `<span>${safe(item)}</span>`).join("");
      card.innerHTML = `
        <div class="project-preview">
          <div class="project-placeholder"><i class="bi ${safe(project.icon)}"></i><span>${safe(project.name)}</span></div>
          <div class="project-preview-overlay"><a class="project-open" href="${safe(project.url)}" target="_blank" rel="noopener noreferrer"><i class="bi bi-box-arrow-up-right"></i> Ouvrir le projet</a></div>
        </div>
        <div class="project-body">
          <div class="project-top"><span class="project-category">${safe(project.category)}</span><a class="project-icon-link" href="${safe(project.github)}" target="_blank" rel="noopener noreferrer" aria-label="Code source de ${safe(project.name)}"><i class="bi bi-github"></i></a></div>
          <h3>${safe(project.name)}</h3><p>${safe(project.description)}</p>
          <div class="project-technologies">${tech}</div>
          <a class="project-button" href="${safe(project.url)}" target="_blank" rel="noopener noreferrer">Voir le projet <i class="bi bi-arrow-up-right"></i></a>
        </div>`;
      container.appendChild(card);
    });
  }

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      menuToggle.innerHTML = `<i class="bi ${open ? "bi-x-lg" : "bi-list"}"></i>`;
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Ouvrir le menu");
      menuToggle.innerHTML = '<i class="bi bi-list"></i>';
    }));
  }

  const contactForm = document.getElementById("contact-form");
  const confirmation = document.getElementById("confirmation-message");
  if (contactForm && confirmation) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      if (!name || !email || !message) {
        confirmation.textContent = "Veuillez remplir tous les champs.";
        confirmation.className = "confirmation-message error";
        return;
      }
      const subject = encodeURIComponent(`Contact Portfolio — ${name}`);
      const body = encodeURIComponent(`Bonjour Antony,\n\n${message}\n\nNom : ${name}\nEmail : ${email}`);
      confirmation.textContent = "Votre application de messagerie va s’ouvrir avec le message préparé.";
      confirmation.className = "confirmation-message success";
      window.location.href = `mailto:mantonych7@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll(".skill-card,.office-card,.experience-card,.project-card,.profile-code,.contact-panel");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    }), {threshold: 0.12});
    revealItems.forEach(element => { element.classList.add("reveal"); observer.observe(element); });
  } else {
    revealItems.forEach(element => element.classList.add("show"));
  }
});