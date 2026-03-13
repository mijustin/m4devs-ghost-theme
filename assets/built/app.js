(()=>{var e=()=>{document.querySelectorAll("[data-theme-toggle]").forEach(e=>{e.addEventListener("click",()=>{var e=document.documentElement.classList.toggle("dark");localStorage.setItem("devbook-theme",e?"dark":"light")})}),(()=>{let t=document.querySelector("[data-menu-toggle]"),o=document.querySelector("[data-mobile-menu]");t&&o&&(t.addEventListener("click",()=>{var e=o.classList.toggle("is-open");t.setAttribute("aria-expanded",e),document.body.classList.toggle("menu-open",e)}),document.addEventListener("click",e=>{o.contains(e.target)||t.contains(e.target)||(o.classList.remove("is-open"),t.setAttribute("aria-expanded","false"),document.body.classList.remove("menu-open"))}),document.addEventListener("keydown",e=>{"Escape"===e.key&&o.classList.contains("is-open")&&(o.classList.remove("is-open"),t.setAttribute("aria-expanded","false"),document.body.classList.remove("menu-open"))}))})(),document.querySelectorAll('.gh-content iframe[src*="youtube.com"], .gh-content iframe[src*="vimeo.com"]').forEach(e=>{var t;e.parentElement.classList.contains("video-wrapper")||((t=document.createElement("div")).className="video-wrapper",t.style.cssText="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;",e.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 100%;",e.parentNode.insertBefore(t,e),t.appendChild(e))}),document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(e){var t=this.getAttribute("href");t.startsWith("#/portal")||(t=document.querySelector(t))&&(e.preventDefault(),t.scrollIntoView({behavior:"smooth",block:"start"}))})}),(()=>{let o=document.querySelector(".db-header");if(o){let t;window.addEventListener("scroll",()=>{var e=window.pageYOffset;10<e?o.classList.add("is-scrolled"):o.classList.remove("is-scrolled"),t=e},{passive:!0})}})(),document.querySelectorAll('.gh-content a[href^="http"]').forEach(e=>{e.href.includes(window.location.hostname)||(e.setAttribute("target","_blank"),e.setAttribute("rel","noopener noreferrer"))}),document.querySelectorAll(".gh-content img:not(.kg-bookmark-thumbnail)").forEach(n=>{n.style.cursor="zoom-in",n.addEventListener("click",()=>{let e=document.createElement("div");e.className="db-lightbox",e.style.cssText=`
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    cursor: zoom-out;
                    padding: 2rem;
                `;var t=n.cloneNode();t.style.cssText=`
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    border: none;
                `,e.appendChild(t),document.body.appendChild(e),document.body.style.overflow="hidden";let o=()=>{e.remove(),document.body.style.overflow=""};e.addEventListener("click",o),document.addEventListener("keydown",function e(t){"Escape"===t.key&&(o(),document.removeEventListener("keydown",e))})})}),document.querySelectorAll(".gh-content pre").forEach(t=>{var e=document.createElement("div");e.className="code-block-wrapper",e.style.position="relative";let o=document.createElement("button");o.className="copy-code-btn",o.innerHTML="Copy",o.style.cssText=`
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                padding: 0.25rem 0.5rem;
                font-family: var(--font-mono);
                font-size: 0.75rem;
                background: var(--color-bg);
                border: 1px solid var(--color-border);
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.2s;
            `,t.parentNode.insertBefore(e,t),e.appendChild(t),e.appendChild(o),e.addEventListener("mouseenter",()=>{o.style.opacity="1"}),e.addEventListener("mouseleave",()=>{o.style.opacity="0"}),o.addEventListener("click",async()=>{var e=t.querySelector("code")?.textContent||t.textContent;try{await navigator.clipboard.writeText(e),o.innerHTML="Copied!",setTimeout(()=>{o.innerHTML="Copy"},2e3)}catch(e){o.innerHTML="Error"}})})};"loading"===document.readyState?document.addEventListener("DOMContentLoaded",e):e()})();
//# sourceMappingURL=app.js.map