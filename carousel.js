/* Glassy 3D project carousel — put this file next to index.html and load it before </body> */
(function () {
  var U = "https://images.unsplash.com/";
  var P = [
    {
      t: "MediConnect BD",
      c: "fs",
      s: "Telemedicine · WebRTC",
      d: "Doctor appointment & telemedicine platform with real-time WebRTC video, patient management and seamless booking.",
      g: ["PHP", "MySQL", "JavaScript", "WebRTC"],
      l: "https://mediconnectbd.gt.tc/public/index.php",
      r: "https://github.com/tuhin637/mediconnect",
      i: "photo-1576091160550-2173dba999ef",
      a: "#0E3B33",
      b: "#0A1114",
    },
    {
      t: "TasteKart",
      c: "fs",
      s: "Food delivery platform",
      d: "Full-stack delivery platform with authentication, menu filtering, real-time cart, order tracking and an admin panel.",
      g: ["HTML5", "CSS3", "PHP", "MySQL"],
      l: "https://tastekart.infinityfreeapp.com/",
      r: "https://github.com/tuhin637/food-website",
      i: "photo-1565299624946-b28f40a0ae38",
      a: "#4A3210",
      b: "#0A1114",
    },
    {
      t: "StudyMate AI",
      c: "fs",
      s: "AI study companion",
      d: "Gemini summarises notes, generates quizzes and answers questions, with Firebase for accounts and sessions.",
      g: ["JavaScript", "Gemini API", "Firebase"],
      l: "https://studymate-ai-mu.vercel.app/",
      r: "https://github.com/tuhin637/studymate-ai",
      i: "photo-1522202176988-66273c2fd55f",
      a: "#26205C",
      b: "#0A1114",
    },
    {
      t: "Dokan Manager",
      c: "fs",
      s: "Inventory + POS system",
      d: "POS for small shops: role-based access, Socket.io stock sync, Bengali PDF invoices and Gemini text-to-bill.",
      g: ["React", "Node.js", "MongoDB", "Socket.io"],
      l: "https://dokan-manager.vercel.app/",
      r: "https://github.com/tuhin637/dokan-manager",
      i: "photo-1766731574115-78e623815124",
      a: "#0E3B33",
      b: "#34210A",
    },
    {
      t: "Library Management",
      c: "fs",
      s: "Dual-portal + QR",
      d: "Admin catalog and fines, member QR checkout, borrowing history and smart search.",
      g: ["PHP", "MySQL", "QR Code"],
      l: "https://librasys.page.gd/?i=1",
      r: "https://github.com/tuhin637/Library-management-System",
      i: "photo-1507842217343-583bb7270b66",
      a: "#4A1034",
      b: "#0A1114",
    },
    {
      t: "ShopHub",
      c: "fe",
      s: "E-commerce UI",
      d: "Conversion-focused storefront: live filtering, slide-out cart drawer and multi-step checkout UI.",
      g: ["HTML5", "CSS3", "JavaScript"],
      l: "https://shop-hub-e-commerce-platform.vercel.app/",
      r: "https://github.com/tuhin637/ShopHub--E-Commerce-Platform",
      i: "photo-1472851294608-062f824d29cc",
      a: "#0E2F4A",
      b: "#0A1114",
    },
    {
      t: "BrewLab",
      c: "fe",
      s: "Coffee brand site",
      d: "Animation-driven landing page with parallax imagery and scroll-triggered reveals, in pure HTML/CSS/JS.",
      g: ["HTML5", "CSS3", "JavaScript"],
      l: "https://brewlab-seven.vercel.app/",
      r: "https://github.com/tuhin637/brewlab",
      i: "photo-1447933601403-0c6688de566e",
      a: "#43280E",
      b: "#0A1114",
    },
    {
      t: "BirdScape",
      c: "fe",
      s: "Nature explorer",
      d: "Nature microsite with species cards filterable by habitat and region, with smooth scroll-reveal transitions.",
      g: ["HTML5", "CSS3", "JavaScript"],
      l: "https://bird-scape-interactive-photo-carous.vercel.app/",
      r: "https://github.com/tuhin637/BirdScape---Interactive-Photo-Carousel",
      i: "photo-1444464666168-49d633b86797",
      a: "#0E3F22",
      b: "#0A1114",
    },
  ];
  function $(s) {
    return document.querySelector(s);
  }
  var view = $(".cx-view"),
    st = $(".cx-stage"),
    sr = $(".cx-sr");
  if (!view) return;
  var list = P.slice(),
    act = 0,
    els = [],
    playing = false,
    timer = null,
    liked = {},
    sx = null,
    moved = false;

  function build() {
    st.innerHTML = "";
    els = list.map(function (p, k) {
      var e = document.createElement("article");
      e.className = "cx-c";
      e.setAttribute("aria-roledescription", "slide");
      e.style.setProperty("--img", "url(" + U + p.i + "?w=900&q=80)");
      e.style.setProperty("--c1", p.a);
      e.style.setProperty("--c2", p.b);
      e.innerHTML =
        '<span class="cx-no"></span><div class="cx-gl"><h3>' +
        p.t +
        "</h3><small>" +
        p.s +
        '</small><div class="cx-more"><p>' +
        p.d +
        '</p><div class="cx-tg">' +
        p.g
          .map(function (x) {
            return "<span>" + x + "</span>";
          })
          .join("") +
        '</div><div class="cx-ac"><a href="' +
        p.l +
        '" target="_blank" rel="noopener">Live Demo</a><a href="' +
        p.r +
        '" target="_blank" rel="noopener">Source</a></div></div></div>';
      e.addEventListener("click", function (ev) {
        if (moved) return;
        if (k !== act) {
          ev.preventDefault();
          go(k);
        }
      });
      st.appendChild(e);
      return e;
    });
  }
  function layout() {
    var n = list.length;
    els.forEach(function (e, k) {
      var d = k - act;
      if (d > n / 2) d -= n;
      if (d < -n / 2) d += n;
      var a = Math.abs(d);
      e.style.setProperty("--d", d);
      e.style.setProperty("--a", a);
      e.style.zIndex = 20 - a;
      e.classList.toggle("on", d === 0);
      e.classList.toggle("hid", a > 3);
      e.setAttribute("aria-hidden", d !== 0);
      e.querySelector(".cx-no").textContent = k + 1 + " / " + n;
    });
    var p = list[act];
    $("#cxT").textContent = p.t;
    $("#cxS").textContent = p.s;
    $(".cx-th").style.background =
      "url(" +
      U +
      p.i +
      "?w=120&q=70) center/cover,linear-gradient(135deg," +
      p.a +
      "," +
      p.b +
      ")";
    $("#cxLk").classList.toggle("on", !!liked[p.t]);
    var cnt = Object.keys(liked).filter(function (x) {
        return liked[x];
      }).length,
      nb = $("#cxN");
    nb.hidden = !cnt;
    nb.textContent = cnt;
    sr.textContent = "Project " + (act + 1) + " of " + n + ": " + p.t;
  }
  function go(k) {
    act = (k + list.length) % list.length;
    layout();
  }
  function next() {
    go(act + 1);
  }
  function prev() {
    go(act - 1);
  }
  function play(on) {
    playing = on;
    clearInterval(timer);
    if (on) timer = setInterval(next, 3500);
    var b = $("#cxPlay");
    b.textContent = on ? "\u275A\u275A" : "\u25B6\uFE0E";
    b.setAttribute("aria-label", on ? "Pause autoplay" : "Start autoplay");
  }
  $("#cxNext").onclick = next;
  $("#cxPrev").onclick = prev;
  $("#cxPlay").onclick = function () {
    play(!playing);
  };
  $("#cxLk").onclick = function () {
    var t = list[act].t;
    liked[t] = !liked[t];
    layout();
  };
  document.querySelectorAll(".cx-filters button").forEach(function (b) {
    b.onclick = function () {
      document.querySelectorAll(".cx-filters button").forEach(function (x) {
        x.classList.remove("on");
        x.setAttribute("aria-pressed", "false");
      });
      b.classList.add("on");
      b.setAttribute("aria-pressed", "true");
      var f = b.dataset.f;
      list = P.filter(function (p) {
        return f === "all" || p.c === f;
      });
      act = 0;
      build();
      layout();
    };
  });
  view.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  });
  view.addEventListener("pointerdown", function (e) {
    sx = e.clientX;
    moved = false;
  });
  view.addEventListener("pointermove", function (e) {
    if (sx !== null && Math.abs(e.clientX - sx) > 8) moved = true;
  });
  view.addEventListener("pointerup", function (e) {
    if (sx === null) return;
    var dx = e.clientX - sx;
    sx = null;
    if (Math.abs(dx) > 45) {
      dx < 0 ? next() : prev();
    }
    setTimeout(function () {
      moved = false;
    }, 50);
  });
  view.addEventListener("pointercancel", function () {
    sx = null;
  });
  view.addEventListener("mouseenter", function () {
    clearInterval(timer);
  });
  view.addEventListener("mouseleave", function () {
    if (playing) {
      clearInterval(timer);
      timer = setInterval(next, 3500);
    }
  });
  build();
  layout();
  act = 2 % list.length;
  layout();
})();

/* Research expanding panels */
(function () {
  var xs = [].slice.call(document.querySelectorAll(".xp"));
  if (!xs.length) return;
  function open(el) {
    xs.forEach(function (x) {
      var on = x === el;
      x.classList.toggle("on", on);
      x.setAttribute("aria-expanded", on);
    });
  }
  var hover = matchMedia("(hover:hover) and (min-width:801px)").matches;
  xs.forEach(function (x) {
    x.addEventListener("click", function () {
      open(x);
    });
    x.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && e.target === x) {
        e.preventDefault();
        open(x);
      }
    });
    if (hover)
      x.addEventListener("mouseenter", function () {
        open(x);
      });
  });
})();

/* Optional real photo for a research panel: put an image link in data-photo="" on that .xi element.
   If the link fails to load, the drawn illustration stays. */
document.querySelectorAll(".xi[data-photo]").forEach(function (b) {
  var u = b.getAttribute("data-photo");
  if (!u) return;
  var im = new Image();
  im.alt = "";
  im.loading = "lazy";
  im.onload = function () {
    im.style.opacity = 1;
  };
  im.onerror = function () {
    im.remove();
  };
  b.appendChild(im);
  im.src = u;
});
