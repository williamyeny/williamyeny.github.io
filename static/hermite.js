setTimeout(() => {
  const root = document.querySelector(".post-content");
  if (!root) return;

  const markerHost = document.createElement("div");
  markerHost.style.height = "100px";
  markerHost.style.paddingTop = "200px";
  markerHost.style.paddingBottom = "400px";
  root.appendChild(markerHost);

  const makeDot = (x, y) => {
    const el = document.createElement("div");
    el.style.position = "relative";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.width = "20px";
    el.style.height = "20px";
    el.style.background = "#2a7ae2";
    el.style.borderRadius = "50%";
    el.style.border = "2px solid #fff";
    el.style.boxSizing = "border-box";
    return el;
  };

  const leftDot = makeDot(0, 0);
  const rightDot = makeDot(root.offsetWidth - 20, 100);
  markerHost.append(leftDot, rightDot);

  const wrapTextNodesWithSpans = (el) => {
    if (!el) return;
    Array.from(el.childNodes).forEach((n) => {
      if (n.nodeType !== Node.TEXT_NODE) return;
      const words = n.textContent.split(/\s+/);
      const frag = document.createDocumentFragment();
      words.forEach((w, i) => {
        if (w) {
          const span = document.createElement("span");
          span.textContent = w;
          frag.appendChild(span);
        }
        if (i < words.length - 1)
          frag.appendChild(document.createTextNode(" "));
      });
      n.parentNode.replaceChild(frag, n);
    });
  };

  const spanifyParagraphs = (parentSelector) => {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;
    Array.from(parent.children).forEach((child) => {
      if (child.tagName === "P") wrapTextNodesWithSpans(child);
    });
  };

  const inViewport = (el) => {
    const r = el.getBoundingClientRect();
    return (
      r.top < window.innerHeight &&
      r.bottom > 0 &&
      r.left < window.innerWidth &&
      r.right > 0
    );
  };

  const slopeToTangent = (m, len) => {
    if (!Number.isFinite(m)) return { x: 0, y: Math.sign(m) * (len || 0) };
    const vx = 1,
      vy = m;
    const s = len / (Math.hypot(vx, vy) || 1);
    return { x: vx * s, y: vy * s };
  };

  const hermite = (t, p0, p1, t0, t1) => {
    const t2 = t * t,
      t3 = t2 * t;
    const h00 = 2 * t3 - 3 * t2 + 1;
    const h10 = t3 - 2 * t2 + t;
    const h01 = -2 * t3 + 3 * t2;
    const h11 = t3 - t2;
    return {
      x: h00 * p0.x + h10 * t0.x + h01 * p1.x + h11 * t1.x,
      y: h00 * p0.y + h10 * t0.y + h01 * p1.y + h11 * t1.y,
    };
  };

  const SPAN_SELECTOR = ".post-header > p span, .post-content > p span";

  const interpolateSpans = (aDot, bDot) => {
    const spans = document.querySelectorAll(SPAN_SELECTOR);

    const a = {
      x: aDot.offsetLeft + aDot.offsetWidth / 2,
      y: aDot.offsetTop + aDot.offsetHeight / 2,
    };
    const b = {
      x: bDot.offsetLeft + bDot.offsetWidth / 2,
      y: bDot.offsetTop + bDot.offsetHeight / 2,
    };

    const d = Math.hypot(b.x - a.x, b.y - a.y);
    const L = d * 5;
    const tStart = slopeToTangent(-10, L);
    const tEnd = slopeToTangent(-2, L);

    spans.forEach((span, i) => {
      if (span.closest(".katex") || span.querySelector(".katex")) return;
      const t = spans.length > 1 ? i / (spans.length - 1) : 0;
      const p = hermite(t, a, b, tStart, tEnd);
      const dx = p.x - span.offsetLeft;
      const dy = p.y - span.offsetTop;
      span.style.display = "inline-block";
      span.style.transition = "transform 0.3s ease-out";
      span.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  };

  root.style.position = "relative";
  let splitApplied = false;

  const onScroll = () => {
    if (inViewport(leftDot)) {
      if (!splitApplied) {
        spanifyParagraphs(".post-content");
        splitApplied = true;
      }
      interpolateSpans(leftDot, rightDot);
    } else {
      document.querySelectorAll(SPAN_SELECTOR).forEach((span) => {
        if (span.closest(".katex") || span.querySelector(".katex")) return;
        span.style.transform = "translate(0px, 0px)";
      });
    }
  };

  window.addEventListener("scroll", onScroll);
}, 2000);
