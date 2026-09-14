/* Dev-server client. Served at /__hmr/client.js and injected into the page by
   the dev server only — it is never part of a real build. */
(function () {
  var CONFIG = window.__HMR__ || {};
  var SCROLL_KEY = "hmr:scroll";
  var source = null;
  var offline = false;

  /* ---------- scroll position across reloads ---------- */
  function rememberScroll() {
    try {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    } catch (e) {}
  }

  function restoreScroll() {
    try {
      var saved = sessionStorage.getItem(SCROLL_KEY);
      if (saved === null) return;
      sessionStorage.removeItem(SCROLL_KEY);
      window.scrollTo(0, parseInt(saved, 10) || 0);
    } catch (e) {}
  }

  /* ---------- on-screen status ---------- */
  function badge(text, tone) {
    var el = document.getElementById("hmr-badge");
    if (!el) {
      el = document.createElement("div");
      el.id = "hmr-badge";
      el.style.cssText =
        "position:fixed;left:12px;bottom:12px;z-index:2147483646;font:500 12px/1.4 " +
        "ui-monospace,SFMono-Regular,Menlo,monospace;padding:6px 10px;border-radius:6px;" +
        "color:#fff;background:#3C5139;box-shadow:0 2px 10px rgba(0,0,0,.25);" +
        "opacity:0;transition:opacity .15s ease;pointer-events:none";
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.style.background = tone === "warn" ? "#9E2B2B" : "#3C5139";
    el.style.opacity = "1";
    clearTimeout(el._hide);
    if (tone !== "warn") {
      el._hide = setTimeout(function () {
        el.style.opacity = "0";
      }, 1200);
    }
  }

  /* ---------- build-error overlay ---------- */
  function showError(message) {
    var el = document.getElementById("hmr-overlay");
    if (!el) {
      el = document.createElement("div");
      el.id = "hmr-overlay";
      el.style.cssText =
        "position:fixed;inset:0;z-index:2147483647;background:rgba(23,27,20,.94);" +
        "color:#F5F6F1;padding:32px;overflow:auto;font:400 13px/1.6 ui-monospace," +
        "SFMono-Regular,Menlo,monospace;white-space:pre-wrap";
      document.body.appendChild(el);
    }
    el.textContent = "build failed\n\n" + message;
  }

  function clearError() {
    var el = document.getElementById("hmr-overlay");
    if (el) el.remove();
  }

  /* ---------- hot CSS swap ---------- */
  function swapCss() {
    fetch(CONFIG.cssUrl + "?t=" + Date.now(), { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("css " + res.status);
        return res.text();
      })
      .then(function (css) {
        var style = document.getElementById(CONFIG.styleId);
        if (!style) {
          style = document.createElement("style");
          style.id = CONFIG.styleId;
          document.head.appendChild(style);
        }
        style.textContent = css;
        badge("css updated");
      })
      .catch(function () {
        reload();
      });
  }

  function reload() {
    rememberScroll();
    window.location.reload();
  }

  /* ---------- event stream ---------- */
  function connect() {
    source = new EventSource(CONFIG.eventsUrl);

    source.addEventListener("open", function () {
      if (offline) {
        offline = false;
        reload();
        return;
      }
      badge("dev server connected");
    });

    source.addEventListener("css", function () {
      clearError();
      swapCss();
    });

    source.addEventListener("reload", reload);

    source.addEventListener("build-error", function (event) {
      var data = {};
      try {
        data = JSON.parse(event.data);
      } catch (e) {}
      showError(data.message || "unknown build error");
      badge("build failed", "warn");
    });

    source.addEventListener("build-ok", clearError);

    source.addEventListener("error", function () {
      // EventSource reconnects on its own; flag it so we reload on return.
      if (source.readyState === EventSource.CLOSED || source.readyState === EventSource.CONNECTING) {
        offline = true;
        badge("dev server offline", "warn");
      }
    });
  }

  window.addEventListener("beforeunload", rememberScroll);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      restoreScroll();
      connect();
    });
  } else {
    restoreScroll();
    connect();
  }

  // Late restore too: the page's own scripts may move the viewport first.
  window.addEventListener("load", restoreScroll);
})();
