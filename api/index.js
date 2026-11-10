const https = require('https');
const fs = require('fs');
const path = require('path');

// In-memory cache for dynamic game catalog
let gameCatalog = [];
let lastFetchTime = 0;

function fetchGames(sid, callback) {
  const now = Date.now();
  if (gameCatalog.length > 0 && (now - lastFetchTime < 1800000)) {
    return callback(gameCatalog);
  }

  const activeSid = sid || process.env.GAMEPIX_SID || '9A5X5';
  const apiUrl = `https://feeds.gamepix.com/v1/json?sid=${encodeURIComponent(activeSid)}&pagination=96&page=1`;

  const requestOptions = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/json'
    }
  };

  https.get(apiUrl, requestOptions, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsed = JSON.parse(rawData);
        if (parsed && parsed.items && parsed.items.length > 0) {
          gameCatalog = parsed.items.map((item, idx) => {
            let gameUrl = item.url ? item.url.replace(/^http:/, 'https:') : '';
            if (gameUrl && !gameUrl.includes('sid=')) {
              gameUrl += (gameUrl.includes('?') ? '&' : '?') + `sid=${encodeURIComponent(activeSid)}`;
            }
            return {
              id: item.id || `game_${idx}`,
              title: item.title,
              description: item.description || 'Play this high-octane HTML5 game instantly on your phone or desktop!',
              category: (item.category || 'Arcade').toLowerCase(),
              image: item.image || item.banner_image,
              banner: item.banner_image || item.image,
              url: gameUrl,
              orientation: item.orientation || 'landscape',
              width: item.width || 800,
              height: item.height || 600,
              quality: item.quality_score ? Math.round(item.quality_score * 100) : 98,
              played: Math.floor(Math.random() * 25000) + 3200,
              likes: Math.floor(Math.random() * 1200) + 350
            };
          });
          lastFetchTime = now;
          return callback(gameCatalog);
        }
      } catch (e) {
        console.error('Error parsing GamePix response:', e.message);
      }
      
      // Secondary dynamic fallback to general feed if property SID feed returns empty
      fetchGeneralFeed(activeSid, callback);
    });
  }).on('error', (err) => {
    console.error('Network error fetching games:', err.message);
    fetchGeneralFeed(activeSid, callback);
  });
}

function fetchGeneralFeed(activeSid, callback) {
  const generalUrl = `https://feeds.gamepix.com/v1/json?pagination=96&page=1`;
  const requestOptions = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/json'
    }
  };

  https.get(generalUrl, requestOptions, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsed = JSON.parse(rawData);
        if (parsed && parsed.items && parsed.items.length > 0) {
          gameCatalog = parsed.items.map((item, idx) => {
            let gameUrl = item.url ? item.url.replace(/^http:/, 'https:') : '';
            if (gameUrl && !gameUrl.includes('sid=')) {
              gameUrl += (gameUrl.includes('?') ? '&' : '?') + `sid=${encodeURIComponent(activeSid)}`;
            }
            return {
              id: item.id || `game_${idx}`,
              title: item.title,
              description: item.description || 'Play this high-octane HTML5 game instantly on your phone or desktop!',
              category: (item.category || 'Arcade').toLowerCase(),
              image: item.image || item.banner_image,
              banner: item.banner_image || item.image,
              url: gameUrl,
              orientation: item.orientation || 'landscape',
              width: item.width || 800,
              height: item.height || 600,
              quality: item.quality_score ? Math.round(item.quality_score * 100) : 98,
              played: Math.floor(Math.random() * 25000) + 3200,
              likes: Math.floor(Math.random() * 1200) + 350
            };
          });
          lastFetchTime = Date.now();
          return callback(gameCatalog);
        }
      } catch (e) {
        console.error('Error parsing general feed:', e.message);
      }
      return callback([]);
    });
  }).on('error', () => {
    return callback([]);
  });
}

// Render Legal Pages with Modern UI & Semantic SEO Tags
function renderLegalPage(title, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Nexus Arcade</title>
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://nexus-arcade-delta.vercel.app/${title.toLowerCase().replace(/\s+/g, '-')}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6274986466107893"
     crossorigin="anonymous"></script>
  <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-NGCTKNT7"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  </script>
  <style>
    :root {
      --bg-dark: #0a0b12;
      --bg-card: #121524;
      --text-main: #f0f3ff;
      --text-muted: #8c96b5;
      --accent-cyan: #00f2fe;
      --accent-purple: #7f00ff;
      --border-color: rgba(255, 255, 255, 0.08);
      --radius: 16px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Outfit', sans-serif;
      background-color: var(--bg-dark);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      background: rgba(10, 11, 18, 0.9);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-color);
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: var(--text-main);
      font-weight: 900;
      font-size: 1.4rem;
    }
    .brand-icon {
      width: 40px; height: 40px;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      color: #000; font-size: 1.2rem;
      box-shadow: 0 0 15px rgba(0, 242, 254, 0.4);
    }
    .brand span {
      background: linear-gradient(135deg, var(--accent-cyan), #00c6ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .back-btn {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.9rem;
      display: inline-flex; align-items: center; gap: 0.4rem;
    }
    .back-btn:hover { color: var(--accent-cyan); }
    main {
      flex: 1;
      max-width: 850px;
      margin: 2rem auto;
      padding: 0 1.25rem;
      width: 100%;
    }
    .legal-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 2rem;
      line-height: 1.7;
    }
    h1 { font-size: 1.8rem; margin-bottom: 1.2rem; color: var(--text-main); font-weight: 800; }
    h2 { font-size: 1.2rem; margin: 1.5rem 0 0.6rem; color: var(--accent-cyan); font-weight: 700; }
    p { margin-bottom: 1rem; color: var(--text-muted); font-size: 0.95rem; }
    ul { margin-bottom: 1rem; padding-left: 1.25rem; color: var(--text-muted); }
    li { margin-bottom: 0.4rem; }
    footer {
      border-top: 1px solid var(--border-color);
      padding: 1.5rem;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.85rem;
      background: var(--bg-card);
      margin-top: auto;
    }
    .footer-links {
      display: flex; justify-content: center; gap: 1.25rem; margin-bottom: 0.75rem; flex-wrap: wrap;
    }
    .footer-links a { color: var(--text-muted); text-decoration: none; font-size: 0.85rem; }
    .footer-links a:hover { color: var(--accent-cyan); }
  </style>
</head>
<body>
  <header>
    <a href="/" class="brand">
      <div class="brand-icon"><i class="fa-solid fa-gamepad"></i></div>
      Nexus <span>Arcade</span>
    </a>
    <a href="/" class="back-btn"><i class="fa-solid fa-arrow-left"></i> Back to Games</a>
  </header>
  <main>
    <article class="legal-card">
      ${content}
    </article>
  </main>
  <footer>
    <nav class="footer-links">
      <a href="/about-us">About Us</a>
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/terms-of-service">Terms of Service</a>
      <a href="/contact-us">Contact Us</a>
    </nav>
    Nexus Arcade &copy; 2026. All rights reserved.
  </footer>
</body>
</html>`;
}

function renderPortalHTML(games, currentSid) {
  const categories = Array.from(new Set(games.map(g => g.category))).sort();
  const featured = games.slice(0, 5);

  // Multi-Schema JSON-LD Graph (WebSite, Organization, FAQPage, VideoGame)
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://nexus-arcade-delta.vercel.app/#website",
        "url": "https://nexus-arcade-delta.vercel.app/",
        "name": "Nexus Arcade",
        "description": "Play thousands of free online HTML5 games instantly on mobile and desktop without downloads.",
        "publisher": {
          "@id": "https://nexus-arcade-delta.vercel.app/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://nexus-arcade-delta.vercel.app/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://nexus-arcade-delta.vercel.app/#organization",
        "name": "Nexus Arcade",
        "url": "https://nexus-arcade-delta.vercel.app/",
        "logo": featured[0] ? featured[0].image : "https://img.gamepix.com/games/prism-match-3d/icon/prism-match-3d.png?w=105"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Are all games on Nexus Arcade 100% free to play?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Every game on Nexus Arcade is 100% free to play. There are no subscriptions, paywalls, or hidden charges."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to download or install any apps to play?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No downloads are required. All games run instantly inside your mobile or desktop web browser using high-performance HTML5 technology."
            }
          },
          {
            "@type": "Question",
            "name": "Can I play Nexus Arcade games on my mobile phone?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! Nexus Arcade is optimized for mobile touchscreens on iPhone, iPad, Android, and tablets as well as desktop computers."
            }
          }
        ]
      }
    ]
  };

  const heroGame = featured[0] || {
    id: "default",
    title: "Play Free HTML5 Games",
    description: "Instant browser games on mobile & PC",
    image: "",
    banner: ""
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Nexus Arcade - Play Free Mobile & Desktop HTML5 Online Games</title>
  <meta name="description" content="Play top free HTML5 online games on Nexus Arcade. Instant browser games for mobile & PC with zero downloads. Action, 3D puzzle, racing & arcade games.">
  <meta name="keywords" content="html5, html5 games, nexus arcade, nexus arcade games, online, free, canvas, affiliate, play, play free online games, unblocked games, browser games, no download games, instant play games, 3d puzzle games, arcade games, driving games, shooting games, multiplayer games, io games, crazy games online, poki games online, mobile html5 games, webgl canvas games">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="https://nexus-arcade-delta.vercel.app/">
  <meta name="google-site-verification" content="EpI17QtW0KFq48SSio1vSdtznke_tKStpFusSNkGSyU" />
  <meta name="msvalidate.01" content="F5B4B6FAA21B402038710837D53F8F27" />
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6274986466107893"
     crossorigin="anonymous"></script>
  <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-NGCTKNT7"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  </script>
  
  <!-- PERFORMANCE & DNS PRECONNECTS -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://img.gamepix.com">
  <link rel="preconnect" href="https://play.gamepix.com">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">

  <!-- OPENGRAPH / FACEBOOK META TAGS -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Nexus Arcade">
  <meta property="og:url" content="https://nexus-arcade-delta.vercel.app/">
  <meta property="og:title" content="Nexus Arcade - Play Free Online HTML5 Games">
  <meta property="og:description" content="Instant play thousands of high quality HTML5 games on Nexus Arcade. Zero downloads required.">
  <meta property="og:image" content="${heroGame.banner || heroGame.image}">
  <meta property="og:image:alt" content="Nexus Arcade Featured Online Games">

  <!-- TWITTER CARD META TAGS -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://nexus-arcade-delta.vercel.app/">
  <meta name="twitter:title" content="Nexus Arcade - Play Free Online HTML5 Games">
  <meta name="twitter:description" content="Instant play thousands of high quality HTML5 games on Nexus Arcade. Zero downloads required.">
  <meta name="twitter:image" content="${heroGame.banner || heroGame.image}">

  <!-- MULTI-SCHEMA JSON-LD GRAPH -->
  <script type="application/ld+json">
    ${JSON.stringify(jsonLdGraph)}
  </script>

  <!-- PERFORMANCE PRELOADS -->
  <link rel="preload" as="image" href="${heroGame.banner || heroGame.image}" fetchpriority="high">

  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></noscript>
  
  <style>
    :root {
      --bg-dark: #0a0b12;
      --bg-card: #121524;
      --bg-card-hover: #1b1e33;
      --bg-header: rgba(10, 11, 18, 0.88);
      --text-main: #f0f3ff;
      --text-muted: #8c96b5;
      
      --accent-cyan: #00f2fe;
      --accent-purple: #7f00ff;
      --accent-pink: #ff007f;
      --accent-green: #00e676;
      --glow-cyan: rgba(0, 242, 254, 0.35);
      --glow-purple: rgba(127, 0, 255, 0.35);
      
      --border-color: rgba(255, 255, 255, 0.08);
      --radius: 16px;
      --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    [data-theme="light"] {
      --bg-dark: #f0f3fc;
      --bg-card: #ffffff;
      --bg-card-hover: #e8ecfa;
      --bg-header: rgba(240, 243, 252, 0.92);
      --text-main: #0d111d;
      --text-muted: #5e6680;
      --border-color: rgba(0, 0, 0, 0.08);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }

    body {
      font-family: 'Outfit', sans-serif;
      background-color: var(--bg-dark);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      padding-bottom: 70px;
    }

    @media (min-width: 769px) {
      body { padding-bottom: 0; }
    }

    header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--bg-header);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-color);
      padding: 0.75rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      text-decoration: none;
      color: var(--text-main);
      font-weight: 900;
      font-size: 1.4rem;
      letter-spacing: -0.5px;
      flex-shrink: 0;
    }

    .brand-icon {
      width: 42px;
      height: 42px;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-size: 1.25rem;
      box-shadow: 0 0 20px var(--glow-cyan);
    }

    .brand span {
      background: linear-gradient(135deg, var(--accent-cyan), #00c6ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .search-container {
      flex: 1;
      max-width: 460px;
      position: relative;
    }

    .search-container i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .search-input {
      width: 100%;
      padding: 0.65rem 1rem 0.65rem 2.6rem;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 30px;
      color: var(--text-main);
      font-size: 0.9rem;
      font-family: inherit;
      transition: var(--transition);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--accent-cyan);
      box-shadow: 0 0 15px var(--glow-cyan);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .btn-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition);
    }

    .btn-icon:hover {
      border-color: var(--accent-cyan);
      color: var(--accent-cyan);
      box-shadow: 0 0 12px var(--glow-cyan);
    }

    .hero-container { padding: 1.25rem 1.5rem 0.5rem; }

    .hero-banner {
      position: relative;
      border-radius: 20px;
      height: 320px;
      overflow: hidden;
      background: #000;
      border: 1px solid var(--border-color);
      box-shadow: 0 12px 35px rgba(0,0,0,0.5);
      display: flex;
      align-items: flex-end;
    }

    .hero-bg {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      object-fit: cover;
      opacity: 0.5;
      filter: blur(2px) scale(1.02);
    }

    .hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(10,11,18,0.98) 15%, rgba(10,11,18,0.4) 65%, transparent);
    }

    .hero-content {
      position: relative;
      z-index: 2;
      padding: 1.75rem;
      max-width: 600px;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.3rem 0.8rem;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      color: #000;
      font-size: 0.75rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      border-radius: 20px;
      margin-bottom: 0.6rem;
    }

    .hero-title {
      font-size: 2rem;
      font-weight: 900;
      line-height: 1.2;
      margin-bottom: 0.4rem;
      color: #fff;
    }

    .hero-desc {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.65rem 1.4rem;
      border-radius: 30px;
      font-weight: 800;
      font-size: 0.9rem;
      cursor: pointer;
      border: none;
      transition: var(--transition);
      text-decoration: none;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      color: #000;
      box-shadow: 0 0 20px var(--glow-cyan);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 30px var(--glow-cyan);
    }

    .categories-bar {
      padding: 1rem 1.5rem;
      display: flex;
      gap: 0.6rem;
      overflow-x: auto;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }
    .categories-bar::-webkit-scrollbar { display: none; }

    .chip {
      padding: 0.5rem 1.2rem;
      border-radius: 30px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: var(--transition);
      text-transform: capitalize;
    }

    .chip.active, .chip:hover {
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      color: #000;
      border-color: transparent;
      box-shadow: 0 0 15px var(--glow-cyan);
    }

    main { padding: 0 1.5rem 2.5rem; flex: 1; }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }

    .section-title {
      font-size: 1.3rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .section-title i { color: var(--accent-cyan); }

    .games-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
      gap: 1.1rem;
    }

    .game-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      overflow: hidden;
      transition: var(--transition);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .game-card:hover {
      transform: translateY(-5px) scale(1.01);
      border-color: var(--accent-cyan);
      box-shadow: 0 10px 30px var(--glow-cyan);
    }

    .card-thumb {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      overflow: hidden;
      background: #000;
    }

    .card-thumb img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .game-card:hover .card-thumb img { transform: scale(1.08); }

    .play-overlay {
      position: absolute; inset: 0;
      background: rgba(10, 11, 18, 0.6);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: var(--transition);
    }

    .game-card:hover .play-overlay { opacity: 1; }

    .play-icon-btn {
      width: 48px; height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      box-shadow: 0 0 20px var(--glow-cyan);
    }

    .card-info {
      padding: 0.8rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      flex: 1;
    }

    .card-title {
      font-size: 0.95rem;
      font-weight: 800;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .card-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .card-cat {
      text-transform: capitalize;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.15rem 0.5rem;
      border-radius: 6px;
      font-weight: 600;
    }

    /* FAQ SECTION FOR GENERATIVE ENGINE OPTIMIZATION (GEO) & GOOGLE RICH SNIPPETS */
    .faq-section {
      margin-top: 3rem;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 2rem;
    }

    .faq-title {
      font-size: 1.3rem;
      font-weight: 800;
      margin-bottom: 1.25rem;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .faq-title i { color: var(--accent-cyan); }

    .faq-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .faq-item {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.1rem;
    }

    .faq-question {
      font-size: 1rem;
      font-weight: 700;
      color: var(--accent-cyan);
      margin-bottom: 0.4rem;
    }

    .faq-answer {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    .modal-backdrop {
      position: fixed; inset: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.92);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      padding: 1rem;
    }

    .modal-backdrop.active {
      opacity: 1;
      pointer-events: auto;
    }

    .modal-container {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      width: 100%;
      max-width: 960px;
      height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.8);
      position: relative;
    }

    .modal-header {
      padding: 0.85rem 1.25rem;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(10,11,18,0.9);
    }

    .modal-title {
      font-size: 1.1rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .close-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.4rem;
      cursor: pointer;
      padding: 0.2rem 0.5rem;
    }

    .close-btn:hover { color: var(--accent-cyan); }

    .modal-body {
      flex: 1;
      display: flex;
      background: #000;
      position: relative;
    }

    .iframe-wrapper {
      width: 100%;
      height: 100%;
      border: none;
    }

    footer {
      border-top: 1px solid var(--border-color);
      padding: 1.5rem;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.85rem;
      background: var(--bg-card);
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 1.25rem;
      margin-bottom: 0.75rem;
      flex-wrap: wrap;
    }

    .footer-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.85rem;
      transition: var(--transition);
    }

    .footer-links a:hover {
      color: var(--accent-cyan);
    }

    .mobile-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 999;
      background: rgba(10, 11, 18, 0.95);
      backdrop-filter: blur(16px);
      border-top: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0.5rem 0;
    }

    @media (min-width: 769px) {
      .mobile-nav { display: none; }
    }

    .mobile-nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.7rem;
      font-weight: 700;
      background: none;
      border: none;
      cursor: pointer;
    }

    .mobile-nav-item i {
      font-size: 1.1rem;
    }

    .mobile-nav-item.active, .mobile-nav-item:hover {
      color: var(--accent-cyan);
    }

    @media (max-width: 768px) {
      header { padding: 0.6rem 1rem; }
      .brand-title { display: none; }
      .search-container { max-width: 100%; }
      .hero-container { padding: 0.75rem 1rem 0.25rem; }
      .hero-banner { height: 240px; border-radius: 16px; }
      .hero-content { padding: 1.25rem; }
      .hero-title { font-size: 1.4rem; }
      .hero-desc { font-size: 0.82rem; -webkit-line-clamp: 2; margin-bottom: 0.75rem; }
      .btn { padding: 0.5rem 1rem; font-size: 0.82rem; }
      .categories-bar { padding: 0.75rem 1rem; }
      main { padding: 0 1rem 2rem; }
      .games-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.8rem;
      }
      .modal-backdrop { padding: 0; }
      .modal-container { height: 100vh; max-width: 100vw; border-radius: 0; }
    }

    @media (max-width: 480px) {
      .games-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.65rem;
      }
      .card-info { padding: 0.6rem; }
      .card-title { font-size: 0.85rem; }
      .card-meta { font-size: 0.7rem; }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header>
    <a href="/" class="brand" title="Nexus Arcade Home">
      <div class="brand-icon"><i class="fa-solid fa-gamepad"></i></div>
      <span class="brand-title">Nexus <span>Arcade</span></span>
    </a>

    <div class="search-container">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input type="text" id="searchInput" class="search-input" placeholder="Search free online games..." aria-label="Search games catalog">
    </div>

    <div class="nav-actions">
      <button class="btn-icon" id="themeToggle" title="Toggle Dark/Light Mode" aria-label="Toggle dark mode">
        <i class="fa-solid fa-moon"></i>
      </button>
    </div>
  </header>

  <!-- HERO SLIDER -->
  <section class="hero-container">
    <div class="hero-banner" id="heroBanner">
      <img id="heroImg" class="hero-bg" src="${heroGame.banner || heroGame.image}" alt="${heroGame.title} - Featured Game" fetchpriority="high" decoding="async">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-badge"><i class="fa-solid fa-fire"></i> Featured HTML5 Game</span>
        <h2 class="hero-title" id="heroTitle">${heroGame.title}</h2>
        <p class="hero-desc" id="heroDesc">${heroGame.description}</p>
        <button class="btn btn-primary" onclick="playGame('${heroGame.id}')">
          <i class="fa-solid fa-play"></i> PLAY NOW
        </button>
      </div>
    </div>
  </section>

  <!-- CATEGORY CHIPS NAV -->
  <nav class="categories-bar" id="categoriesBar" aria-label="Game categories navigation">
    <button class="chip active" onclick="filterCategory('all', this)">All Games</button>
    ${categories.map(cat => `<button class="chip" onclick="filterCategory('${cat}', this)">${cat}</button>`).join('')}
  </nav>

  <!-- MAIN GAMES GRID -->
  <main>
    <div class="section-header">
      <h1 class="section-title"><i class="fa-solid fa-bolt"></i> Play Free HTML5 Online Games</h1>
      <span style="color: var(--text-muted); font-size: 0.85rem;" id="gameCount">${games.length} games</span>
    </div>

    <div class="games-grid" id="gamesGrid">
      ${games.map(game => `
        <article class="game-card" data-category="${game.category}" data-title="${game.title.toLowerCase()}" onclick="playGame('${game.id}')">
          <div class="card-thumb">
            <img src="${game.image}" alt="Play ${game.title} Online Free" loading="lazy" width="190" height="190">
            <div class="play-overlay">
              <div class="play-icon-btn"><i class="fa-solid fa-play"></i></div>
            </div>
          </div>
          <div class="card-info">
            <h3 class="card-title">${game.title}</h3>
            <div class="card-meta">
              <span class="card-cat">${game.category}</span>
              <span><i class="fa-solid fa-star" style="font-size: 0.7rem; color: #ffca28;"></i> ${(game.quality / 10).toFixed(1)}</span>
            </div>
          </div>
        </article>
      `).join('')}
    </div>

    <!-- FAQ SECTION FOR GEO & GOOGLE RICH SNIPPETS -->
    <section class="faq-section">
      <h2 class="faq-title"><i class="fa-solid fa-circle-question"></i> Frequently Asked Questions</h2>
      <div class="faq-grid">
        <div class="faq-item">
          <h3 class="faq-question">Are all games on Nexus Arcade 100% free to play?</h3>
          <p class="faq-answer">Yes! Every game on Nexus Arcade is completely free to play with no hidden subscriptions, paywalls, or account registrations required.</p>
        </div>
        <div class="faq-item">
          <h3 class="faq-question">Do I need to download or install software to play?</h3>
          <p class="faq-answer">No downloads are needed. All games run directly inside your mobile or desktop browser using fast HTML5 web technology.</p>
        </div>
        <div class="faq-item">
          <h3 class="faq-question">Can I play Nexus Arcade games on my mobile device?</h3>
          <p class="faq-answer">Yes! Nexus Arcade is fully responsive and touch-optimized for smartphones (iPhone, Android) and tablets as well as desktop PCs.</p>
        </div>
      </div>
    </section>
  </main>

  <!-- GAME PLAY MODAL -->
  <div class="modal-backdrop" id="gameModal" role="dialog" aria-label="Game player modal">
    <div class="modal-container">
      <div class="modal-header">
        <div class="modal-title" id="modalTitle">
          <i class="fa-solid fa-gamepad" style="color: var(--accent-cyan);"></i> Playing Game
        </div>
        <button class="close-btn" onclick="closeModal()" aria-label="Close game"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <iframe id="gameIframe" class="iframe-wrapper" allowfullscreen allow="autoplay; fullscreen; payment; focus-without-user-activation; geolocation; gyroscope; accelerometer" referrerpolicy="origin-when-cross-origin" frameborder="0"></iframe>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <footer>
    <nav class="footer-links">
      <a href="/about-us">About Us</a>
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/terms-of-service">Terms of Service</a>
      <a href="/contact-us">Contact Us</a>
    </nav>
    <p>Nexus Arcade &copy; 2026. All rights reserved. Free HTML5 Gaming Portal.</p>
  </footer>

  <!-- MOBILE NAVIGATION BAR -->
  <nav class="mobile-nav" aria-label="Mobile main navigation">
    <button class="mobile-nav-item active" onclick="scrollToTop()">
      <i class="fa-solid fa-house"></i> Home
    </button>
    <button class="mobile-nav-item" onclick="focusSearch()">
      <i class="fa-solid fa-magnifying-glass"></i> Search
    </button>
    <button class="mobile-nav-item" onclick="filterCategory('all', document.querySelector('.chip'))">
      <i class="fa-solid fa-gamepad"></i> Games
    </button>
    <a href="/about-us" class="mobile-nav-item">
      <i class="fa-solid fa-circle-info"></i> About
    </a>
  </nav>

  <script>
    const gamesData = ${JSON.stringify(games)};
    
    function playGame(gameId) {
      const game = gamesData.find(g => g.id === gameId);
      if (!game) return;

      document.getElementById('modalTitle').innerHTML = '<i class="fa-solid fa-gamepad" style="color: var(--accent-cyan);"></i> ' + game.title;
      document.getElementById('gameIframe').src = game.url;
      document.getElementById('gameModal').classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      document.getElementById('gameModal').classList.remove('active');
      document.getElementById('gameIframe').src = '';
      document.body.style.overflow = '';
    }

    function filterCategory(cat, btn) {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      if (btn) btn.classList.add('active');

      const cards = document.querySelectorAll('.game-card');
      let visibleCount = 0;

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      document.getElementById('gameCount').textContent = visibleCount + ' games';
    }

    function focusSearch() {
      const input = document.getElementById('searchInput');
      input.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.getElementById('searchInput').addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.game-card');
      let visibleCount = 0;

      cards.forEach(card => {
        const title = card.getAttribute('data-title');
        const cat = card.getAttribute('data-category');
        if (title.includes(query) || cat.includes(query)) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      document.getElementById('gameCount').textContent = visibleCount + ' games found';
    });

    document.getElementById('themeToggle').addEventListener('click', () => {
      const isDark = document.body.getAttribute('data-theme') !== 'light';
      document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
      document.querySelector('#themeToggle i').className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  </script>
</body>
</html>`;
}

module.exports = (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const sid = parsedUrl.searchParams.get('sid') || process.env.GAMEPIX_SID || '9A5X5';

  // Dynamic robots.txt
  if (pathname === '/robots.txt') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(200).send(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /docs

Sitemap: https://nexus-arcade-delta.vercel.app/sitemap.xml`);
  }

  // Dynamic sitemap.xml - Clean, essential URLs only
  if (pathname === '/sitemap.xml') {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nexus-arcade-delta.vercel.app/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://nexus-arcade-delta.vercel.app/about-us</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://nexus-arcade-delta.vercel.app/privacy-policy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://nexus-arcade-delta.vercel.app/terms-of-service</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://nexus-arcade-delta.vercel.app/contact-us</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`);
  }

  // Serve ads.txt for GamePix / AdSense verification
  if (pathname === '/ads.txt') {
    const adsFilePath = path.join(__dirname, '../ads.txt');
    if (fs.existsSync(adsFilePath)) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return fs.createReadStream(adsFilePath).pipe(res);
    }
  }

  // Legal Pages for Google AdSense Approval
  if (pathname === '/privacy-policy') {
    const content = `
      <h1>Privacy Policy</h1>
      <p>Last updated: July 26, 2026</p>
      <p>Welcome to <strong>Nexus Arcade</strong>. We value your privacy and are committed to protecting your personal data when you use our online gaming platform.</p>
      
      <h2>1. Information We Collect</h2>
      <p>Nexus Arcade does not require registration or personal account creation to play free HTML5 games. We may collect non-personal device information, browser type, IP address, and game activity logs to improve user experience.</p>
      
      <h2>2. Cookies & Advertising</h2>
      <p>Nexus Arcade uses cookies and similar tracking technologies to deliver personalized content, save game progress preferences, and analyze traffic. We partner with Google AdSense and GamePix to display advertisements.</p>
      <p>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.</p>
      <p>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" style="color: var(--accent-cyan);">Google Ad Settings</a>.</p>
      
      <h2>3. Third-Party Links & Game Embeds</h2>
      <p>Our website contains embedded HTML5 games hosted by licensed game distributors (such as GamePix). Playing these games may involve third-party analytics or cookies controlled by their respective publishers.</p>

      <h2>4. Data Security</h2>
      <p>We implement strict technical measures to safeguard your navigation data against unauthorized access, loss, or alteration.</p>

      <h2>5. Contact Us</h2>
      <p>If you have questions regarding this Privacy Policy, please contact us at <a href="/contact-us" style="color: var(--accent-cyan);">Contact Us</a>.</p>
    `;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(renderLegalPage('Privacy Policy', content));
  }

  if (pathname === '/terms-of-service') {
    const content = `
      <h1>Terms of Service</h1>
      <p>Last updated: July 26, 2026</p>
      <p>By accessing or using <strong>Nexus Arcade</strong>, you agree to comply with and be bound by these Terms of Service.</p>
      
      <h2>1. Use of Platform</h2>
      <p>Nexus Arcade provides instant free online HTML5 games for entertainment purposes. All games on this website are provided for personal, non-commercial use only.</p>
      
      <h2>2. Intellectual Property</h2>
      <p>All game titles, trademarks, graphics, and logos displayed on Nexus Arcade belong to their respective creators and licensors. Nexus Arcade displays games via legitimate publisher feeds and licensed embed permissions.</p>

      <h2>3. User Conduct</h2>
      <p>You agree not to modify, reverse engineer, bypass advertising, or automate bot access to any part of our platform or game streams.</p>

      <h2>4. Disclaimer of Warranties</h2>
      <p>Nexus Arcade is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind. We do not guarantee uninterrupted or error-free access to all games.</p>

      <h2>5. Limitation of Liability</h2>
      <p>Nexus Arcade and its operators shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the platform.</p>
    `;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(renderLegalPage('Terms of Service', content));
  }

  if (pathname === '/about-us') {
    const content = `
      <h1>About Us</h1>
      <p>Welcome to <strong>Nexus Arcade</strong>, your destination for high-quality, instant-play free HTML5 games!</p>
      <p>Our mission is to deliver fast, responsive, and engaging browser games across all devices — without forcing user registration, heavy downloads, or intrusive popups.</p>
      
      <h2>Why Play on Nexus Arcade?</h2>
      <ul>
        <li><strong>Instant Play:</strong> Click and play games instantly in your web browser or mobile phone.</li>
        <li><strong>Curated Categories:</strong> Action, Puzzle, Arcade, Racing, Simulation, and Strategy games.</li>
        <li><strong>Cross-Platform Compatibility:</strong> Optimized for smartphones, tablets, laptops, and desktops.</li>
        <li><strong>Safe & Secure:</strong> Clean, family-friendly gaming environment.</li>
      </ul>

      <p>Thank you for choosing Nexus Arcade. Have fun playing!</p>
    `;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(renderLegalPage('About Us', content));
  }

  if (pathname === '/contact-us') {
    const content = `
      <h1>Contact Us</h1>
      <p>Have questions, feedback, or game recommendations? We'd love to hear from you!</p>
      
      <h2>Get in Touch</h2>
      <p>For support, inquiries, or feedback, please reach out to our team:</p>
      <ul>
        <li><strong>Email:</strong> support@nexus-arcade.com</li>
        <li><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM (EST)</li>
        <li><strong>Feedback:</strong> We respond to all user inquiries within 24-48 business hours.</li>
      </ul>

      <p>Return to <a href="/" style="color: var(--accent-cyan);">Nexus Arcade Home</a> to explore our latest games.</p>
    `;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(renderLegalPage('Contact Us', content));
  }

  // Main Route: Game Portal
  if (pathname === '/' || pathname === '/index.html') {
    fetchGames(sid, (games) => {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400');
      res.status(200).send(renderPortalHTML(games, sid));
    });
    return;
  }

  res.status(404).send('<h1>404 - Page Not Found</h1><p>Return to <a href="/">Nexus Arcade</a></p>');
};
