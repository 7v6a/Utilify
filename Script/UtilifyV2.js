// ==UserScript==
// @name         UtilifyV2 [ WWW ] 
// @namespace    dsc.gg/C2ZJCZXKTu
// @version      2.0.0
// @description  A miserable shot at rewriting Utilify. Currently buggy & lacking in features.
// @author       S
// @match        *://www.kogama.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kogama.com
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @connect      fonts.googleapis.com
// ==/UserScript==

(async function() { // profile backgrounds - KoGaMaBuddy Enhanced
    "use strict";

    const waitForElement = async (s, t = 1e4) => {
        const st = Date.now();
        while (Date.now() - st < t) {
            const e = document.querySelector(s);
            if (e) return e;
            await new Promise(r => requestAnimationFrame(r));
        }
        throw new Error(`Element ${s} not found`);
    };

    const effects = {
        blur: e => e.style.filter = "blur(5px)",
        none: e => { e.style.filter = "none"; e.style.opacity = "unset"; },
        dark: (e, i) => e.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.7)),url("${i}")`,
        rain: e => createRainEffect(e),
        snow: e => createSnowEffect(e)
    };

    const createRainEffect = (e) => {
        const bgContainer = document.createElement('div');
        Object.assign(bgContainer.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '1',
            backgroundImage: e.style.backgroundImage,
            backgroundSize: 'cover',
            filter: e.style.filter
        });

        e.style.backgroundImage = 'none';
        e.style.filter = 'none';

        const rainContainer = document.createElement('div');
        Object.assign(rainContainer.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: '2',
            overflow: 'hidden'
        });

        const createDrop = () => {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            const left = Math.random() * 100;
            const opacity = Math.random() * 0.6 + 0.4;
            const height = Math.random() * 20 + 10;
            const width = height * 0.1;
            const delay = Math.random() * 2;
            const duration = Math.random() * 0.5 + 0.5;

            Object.assign(drop.style, {
                position: 'absolute',
                background: `linear-gradient(to bottom, rgba(200, 230, 255, ${opacity}), rgba(150, 200, 255, ${opacity * 0.5}))`,
                width: `${width}px`,
                height: `${height}px`,
                left: `${left}%`,
                top: '-20px',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                transform: `translateX(${(Math.random() - 0.5) * 20}px)`,
                animation: `rain-fall ${duration}s linear ${delay}s infinite`,
                willChange: 'transform'
            });

            rainContainer.appendChild(drop);
            setTimeout(() => {
                if (drop.parentNode) {
                    drop.parentNode.removeChild(drop);
                }
            }, (duration + delay) * 1000);
        };
        for (let i = 0; i < 50; i++) {
            setTimeout(createDrop, Math.random() * 2000);
        }
        const interval = setInterval(createDrop, 100);
        rainContainer.addEventListener('DOMNodeRemovedFromDocument', () => {
            clearInterval(interval);
        });
        const style = document.createElement('style');
        style.textContent = `
        @keyframes rain-fall {
          to {
            transform: translateY(calc(100vh + 20px)) translateX(${(Math.random() - 0.5) * 50}px);
          }
        }
      `;
        document.head.appendChild(style);
        e.appendChild(bgContainer);
        e.appendChild(rainContainer);
    };

    const createSnowEffect = (e) => {
        const bgContainer = document.createElement('div');
        Object.assign(bgContainer.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '1',
            backgroundImage: e.style.backgroundImage,
            backgroundSize: 'cover',
            filter: e.style.filter
        });

        e.style.backgroundImage = 'none';
        e.style.filter = 'none';

        const snowContainer = document.createElement('div');
        Object.assign(snowContainer.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: '2',
            overflow: 'hidden'
        });
        const createFlake = () => {
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            const left = Math.random() * 100;
            const size = Math.random() * 6 + 2;
            const opacity = Math.random() * 0.7 + 0.3;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 5;
            const sway = (Math.random() * 30) + 10;
            const swaySpeed = (Math.random() * 2) + 1;

            Object.assign(flake.style, {
                position: 'absolute',
                background: `radial-gradient(circle, rgba(255, 255, 255, ${opacity}) 0%, rgba(230, 240, 255, ${opacity * 0.7}) 70%, rgba(200, 220, 255, 0) 100%)`,
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: '-10px',
                borderRadius: '50%',
                animation: `
            snow-fall ${duration}s linear ${delay}s infinite,
            snow-sway ${swaySpeed}s ease-in-out ${delay}s infinite alternate
          `,
                willChange: 'transform',
                filter: 'blur(0.5px)'
            });

            snowContainer.appendChild(flake);
            setTimeout(() => {
                if (flake.parentNode) {
                    flake.parentNode.removeChild(flake);
                }
            }, (duration + delay) * 1000);
        };
        for (let i = 0; i < 30; i++) {
            setTimeout(createFlake, Math.random() * 3000);
        }
        const interval = setInterval(createFlake, 300);
        snowContainer.addEventListener('DOMNodeRemovedFromDocument', () => {
            clearInterval(interval);
        });
        const style = document.createElement('style');
        style.textContent = `
        @keyframes snow-fall {
          to {
            transform: translateY(calc(100vh + 10px));
          }
        }
        @keyframes snow-sway {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(${(Math.random() > 0.5 ? '' : '-')}${Math.random() * 50 + 20}px);
          }
        }
      `;
        document.head.appendChild(style);

        e.appendChild(bgContainer);
        e.appendChild(snowContainer);
    };

async function applyEffects() {
    try {
        const d = await waitForElement('div._9smi2 > div.MuiPaper-root._1rJI8.MuiPaper-rounded > div._1aUa_');
        const m = /(?:\|\|)?Background:\s*(\d+)(?:,\s*filter:\s*([a-z, ]+))?;?(?:\|\|)?/i.exec(d.textContent);
        if (!m) return;

        const i = await fetchImage(m[1]);
        const b = document.querySelector('._33DXe');
        const t = () => { b.style.opacity = '1'; };

        b.style.transition = 'opacity 0.3s ease-in';
        b.style.opacity = '0';
        b.style.backgroundImage = `
            linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.3) 100%),
            url("${i}")
        `;
        b.style.backgroundSize = 'cover';
        b.style.backgroundPosition = 'center';

        setTimeout(t, 300);

        (m[2] || '').split(',').map(f => f.trim()).filter(Boolean).forEach(f => {
            if (effects[f]) effects[f](b, i);
        });
    } catch (e) { console.error(e); }
}

async function fetchImage(id) {
    const r = await fetch(`https://www.kogama.com/games/play/${id}/`);
    const h = await r.text();
    const j = JSON.parse(h.match(/options\.bootstrap = ({.*?});/s)[1]);
    return j.object?.images?.large || Object.values(j.object?.images).find(u => u.endsWith('600x240.jpg'));
}

document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', applyEffects)
    : applyEffects();
})();
(async()=>{ // Profile Banner & Gradient - Utilify Exclusive
    "use strict";
    const wait=(s)=>new Promise(r=>{const f=()=>document.querySelector(s)?r(document.querySelector(s)):requestAnimationFrame(f);f()});

    (async()=>{
    try{
    const d=await wait("div._9smi2 > div.MuiPaper-root._1rJI8.MuiPaper-rounded > div._1aUa_");
    const u=await wait("div._2IqY6 > h1");
    const txt=d.textContent;

    // Banner
    const m=/(?:banner:\s*['"]([^'"]+)['"],\s*#([0-9a-f]{6});)/i.exec(txt);
    if(m){
        const b=document.createElement("div");
        b.style.cssText="display:flex;align-items:center;margin:1px 0 10px";

        const l=document.createElement("div");
        l.textContent="|";
        l.style.cssText=`color:#${m[2]};font-size:.75em;display:inline-block;margin-right:5px`;

        const t=document.createElement("div");
        t.textContent=m[1];
        t.style.cssText=`color:#${m[2]};text-shadow:2px 2px 4px rgba(0,0,0,0.3);font-weight:600;font-size:.75em`;

        b.append(l,t);
        u.closest('div._2IqY6')?.insertBefore(b,u.nextSibling);
    }

    // global Linear gradient
    const g=/(?:linear-gradient\((?:\d+deg, )?(#[0-9a-f]{6}, #[0-9a-f]{6}(?: \d+%)?)\))/i.exec(txt);
    if(g){
        const el=document.querySelector('#root-page-mobile');
        if(el){
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.5s ease, background-image 1.3s ease-in';
            setTimeout(() => {
                el.style.backgroundImage = g[0];
                el.style.opacity = '1';
            }, 100);
        }
    }
    }catch(e){console.error(e)}
    })();
})();
(function() { // Copy Description - Utilify Exclusive
    let observer;
    let buttonAdded = false;
    function addCopyButton() {
        if (buttonAdded) return;
        const bioContainer = document.querySelector('.MuiPaper-root h2');
        if (!bioContainer || !bioContainer.textContent.includes('Bio') || bioContainer.querySelector('.aero-copy-btn')) {
            return;
        }
        const btn = document.createElement('button');
        btn.className = 'aero-copy-btn';
        btn.innerHTML = '⎘';
        btn.title = 'Copy Bio';
        btn.style.cssText = `
            margin-left: 12px;
            width: 26px;
            height: 26px;
            border: none;
            border-radius: 4px;
            background: rgba(255,255,255,0.85);
            backdrop-filter: blur(8px);
            color: #333;
            font-size: 14px;
            font-family: 'Segoe UI', system-ui, sans-serif;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            vertical-align: middle;
            transition: all 0.2s ease;
            box-shadow:
                0 1px 1px rgba(0,0,0,0.1),
                inset 0 1px 1px rgba(255,255,255,0.7);
            position: relative;
            top: -1px;
        `;
        btn.onmouseenter = () => {
            btn.style.background = 'rgba(220,240,255,0.95)';
            btn.style.boxShadow = '0 1px 3px rgba(0,120,215,0.3)';
        };
        btn.onmouseleave = () => {
            btn.style.background = 'rgba(255,255,255,0.85)';
            btn.style.boxShadow = `
                0 1px 1px rgba(0,0,0,0.1),
                inset 0 1px 1px rgba(255,255,255,0.7)
            `;
        };
        btn.onclick = async () => {
            const bioContent = document.querySelector('div[itemprop="description"]')?.innerText.trim() || '';
            try {
                await navigator.clipboard.writeText(bioContent);
                showAeroNotification('Bio copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        };
        bioContainer.style.display = 'inline-flex';
        bioContainer.style.alignItems = 'center';
        bioContainer.appendChild(btn);
        buttonAdded = true;
        if (observer) {
            observer.disconnect();
        }
    }

    function showAeroNotification(message) {
        const notif = document.createElement('div');
        notif.textContent = message;
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 6px 20px;
            background: rgba(240,248,255,0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.8);
            border-radius: 20px;
            box-shadow:
                0 2px 10px rgba(0,0,0,0.15),
                inset 0 1px 1px rgba(255,255,255,0.5);
            color: #333;
            font: 13px 'Segoe UI', system-ui, sans-serif;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(notif);
        setTimeout(() => { notif.style.opacity = '1'; }, 10);
        setTimeout(() => {
            notif.style.opacity = '0';
            setTimeout(() => notif.remove(), 300);
        }, 2000);
    }
    addCopyButton();
    if (!buttonAdded) {
        observer = new MutationObserver(addCopyButton);
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        setTimeout(() => {
            if (observer) {
                observer.disconnect();
            }
        }, 10000);
    }
})();
(() => { // Last Created, Last Seen, Last Played Game, InternetArchive
    'use strict';

    const enhance = () => {
        const container = document.querySelector('._13UrL ._23KvS ._1jTCU');
        const span = container?.querySelector('span._20K92');
        if (!container || !span || span.dataset.enhanced) return false;
        container.style.zIndex = '9';

        const script = [...document.scripts].find(s => s.textContent.includes('options.bootstrap = {'));
        if (!script) return false;

        try {
            const {object: {created, last_ping}} = JSON.parse(script.textContent.match(/options\.bootstrap = (\{.*?\});/s)[1]);
            const gameInfo = JSON.parse(localStorage.getItem('__amplify__cache:game:last-played') || '{}')?.data;
            const formatCompactDate = d => new Date(d).toLocaleDateString([], {month: 'short', day: 'numeric', year: 'numeric'});

            const formatVerbose = d => {
                const date = new Date(d);
                const day = date.getDate();
                const daySuffix = (day % 100 >= 11 && day % 100 <= 13) ? 'th' : ['st', 'nd', 'rd'][day % 10 - 1] || 'th';
                const month = ['January','February','March','April','May','June','July','August','September','October','November','December'][date.getMonth()];
                const tzOffset = -date.getTimezoneOffset();
                return `${day}${daySuffix} of ${month} ${date.getFullYear()}, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} GMT${tzOffset >= 0 ? '+' : '-'}${Math.floor(Math.abs(tzOffset) / 60)}`;
            };

            const timeAgo = d => {
                const sec = Math.floor((Date.now() - new Date(d)) / 1000);
                const intervals = [31536000, 2592000, 86400, 3600, 60];
                const units = ['y', 'm', 'd', 'h', 'min'];
                for (let i = 0; i < intervals.length; i++) {
                    const val = Math.floor(sec / intervals[i]);
                    if (val >= 1) return `${val}${units[i]}`;
                }
                return 'now';
            };
            const createToggleInfo = (icon, compact, full) => {
                const container = document.createElement('div');
                container.style.cssText = `
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    margin: 0 8px 0 0;
                    font-size: 12px;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: all 0.3s ease;
                    max-width: 200px;
                    overflow: hidden;
                `;

                const iconSpan = document.createElement('span');
                iconSpan.textContent = icon;
                iconSpan.style.opacity = '0.7';

                const compactSpan = document.createElement('span');
                compactSpan.textContent = compact;
                compactSpan.style.transition = 'all 0.3s ease';

                const fullSpan = document.createElement('span');
                fullSpan.textContent = full;
                fullSpan.style.display = 'none';
                fullSpan.style.transition = 'all 0.3s ease';

                container.appendChild(iconSpan);
                container.appendChild(compactSpan);
                container.appendChild(fullSpan);

                container.addEventListener('click', () => {
                    const isExpanded = fullSpan.style.display === 'inline';

                    if (isExpanded) {
                        fullSpan.style.display = 'none';
                        compactSpan.style.display = 'inline';
                        container.style.maxWidth = '200px';
                    } else {
                        fullSpan.style.display = 'inline';
                        compactSpan.style.display = 'none';
                        container.style.maxWidth = '400px';
                    }
                });

                return container;
            };
            const wrapper = document.createElement('div');
            wrapper.style.cssText = `
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                margin-top: 4px;
                opacity: 0;
                transition: opacity 0.3s ease;
                gap: 6px;
            `;
            wrapper.appendChild(createToggleInfo('📅', formatCompactDate(created), formatVerbose(created)));
            wrapper.appendChild(createToggleInfo('👁️', timeAgo(last_ping), formatVerbose(last_ping)));

            if (gameInfo?.id) {
                const game = document.createElement('a');
                game.href = `https://www.kogama.com/games/play/${gameInfo.id}/`;
                game.textContent = '🎮 ' + (gameInfo.name.length > 15 ? gameInfo.name.substring(0, 15) + '...' : gameInfo.name);
                game.style.cssText = `
                    margin: 0;
                    font-size: 12px;
                    color: #8ab4f8;
                    text-decoration: none;
                    white-space: nowrap;
                `;
                wrapper.appendChild(game);
            }

            const archive = document.createElement('a');
            archive.href = `https://web.archive.org/web/*/${location.href}`;
            archive.textContent = '📜 Archive';
            archive.style.cssText = `
                margin: 0;
                font-size: 12px;
                color: #f8b38a;
                text-decoration: none;
                white-space: nowrap;
            `;
            wrapper.appendChild(archive);

            span.dataset.enhanced = 'true';
            span.innerHTML = '';
            span.appendChild(wrapper);
            setTimeout(() => wrapper.style.opacity = '1', 400);
            return true;
        } catch (e) {
            console.error('Profile Enhancer error:', e);
            return false;
        }
    };
    setTimeout(() => {
        if (!enhance()) {
            const observer = new MutationObserver((_, obs) => enhance() && obs.disconnect());
            observer.observe(document.body, {childList: true, subtree: true});
            setTimeout(() => observer.disconnect(), 5000);
        }
    }, 400);
})();

// Display information about player-type within the game.
// Original credits/code @ https://kogama.freeforums.net/thread/32019/userscript-game-avatar-model-analytics
// I have gotten an official permisssion to source & improve features as I see fit. => https://i.imgur.com/4KebF7f.png
(() => {
    if (!location.pathname.includes('/games/play/')) return;

    const observer = new MutationObserver(() => {
        const playerChip = document.querySelector('.MuiChip-colorPrimary');
        if (!playerChip || playerChip.dataset.kogalytics) return;

        fetch(location.href)
            .then(r => r.text())
            .then(html => {
                let members = 0, tourists = 0;
                const data = html.match(/playing_now_members["']:\s*(\d+).*?playing_now_tourists["']:\s*(\d+)/s);

                if (data) {
                    members = +data[1];
                    tourists = +data[2];
                }

                const total = members + tourists;
                playerChip.dataset.kogalytics = true;
                const icon = playerChip.querySelector('svg')?.cloneNode(true) || document.createElement('span');

                playerChip.innerHTML = '';
                Object.assign(playerChip.style, {
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '4px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                });

                const globalSpan = document.createElement('span');
                globalSpan.innerHTML = `<span style="color: #a5d8ff; font-weight: 500;">Global:</span> ${total}`;

                const playersSpan = document.createElement('span');
                playersSpan.innerHTML = `<span style="color: #b2f2bb; font-weight: 500;">Players:</span> ${members}`;

                const touristsSpan = document.createElement('span');
                touristsSpan.innerHTML = `<span style="color: #ffc9c9; font-weight: 500;">Tourists:</span> ${tourists}`;

                const separator = document.createElement('span');
                separator.style.opacity = '0.3';
                separator.textContent = '|';

                playerChip.append(
                    icon,
                    globalSpan,
                    separator.cloneNode(),
                    playersSpan,
                    separator.cloneNode(),
                    touristsSpan
                );
            })
            .catch(error => {
                console.error('Error fetching player data:', error);
                playerChip.dataset.kogalytics = true;
                const icon = playerChip.querySelector('svg')?.cloneNode(true) || document.createElement('span');

                playerChip.innerHTML = '';
                Object.assign(playerChip.style, {
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '4px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                });

                const globalSpan = document.createElement('span');
                globalSpan.innerHTML = `<span style="color: #a5d8ff; font-weight: 500;">Global:</span> 0`;

                const playersSpan = document.createElement('span');
                playersSpan.innerHTML = `<span style="color: #b2f2bb; font-weight: 500;">Players:</span> 0`;

                const touristsSpan = document.createElement('span');
                touristsSpan.innerHTML = `<span style="color: #ffc9c9; font-weight: 500;">Tourists:</span> 0`;

                const separator = document.createElement('span');
                separator.style.opacity = '0.3';
                separator.textContent = '|';

                playerChip.append(
                    icon,
                    globalSpan,
                    separator.cloneNode(),
                    playersSpan,
                    separator.cloneNode(),
                    touristsSpan
                );
            });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();

(() => {
    'use strict';
    const style = document.createElement('style');
    style.textContent = `
        ._2mwlM > div:first-child > button,
        ._3RptD:not(:has(a[href="/games/"])):not(:has(a[href="/build/"])):not(:has(a[href="/marketplace/"])) {
            display: none !important;
        }
        ._21Sfe { display: none !important; }
    `;
    document.head.appendChild(style);

    function modifyLogo() {
        const logoContainer = document.querySelector('._2Jlgl');
        if (!logoContainer) return false;
        const logoLink = logoContainer.querySelector('a[title="KoGaMa"]');
        if (logoLink) {
            logoLink.title = "UtilifyV2 by Skull <3";
            logoLink.href = "https://github.com/7v6a";
            const logoImg = logoLink.querySelector('img');
            if (logoImg) {
                logoImg.src = "https://avatars.githubusercontent.com/u/143356794?v=4";
                logoImg.alt = "Gargoyle powered by BruteCat";
            }
            return true;
        }
        return false;
    }
    if (modifyLogo()) return;
    const observer = new MutationObserver(() => {
        if (modifyLogo()) {
            observer.disconnect();
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();

// Allow Paste : Obfuscate Dots (fix DisallowURLInput)
(() => {
    'use strict';
    const WHITELISTED_DOMAINS = [
        'youtube.com',
        'kogama.com',
        'google.com',
        // maybe more domains soon to sort it out, for now its an experimental feature
    ];

    // all the url regex of sorts and stuff (It's not that good I;m just coping :3 )
    const URL_REGEX = /(?:https?:\/\/)?(?:www\.)?([\w-]+(?:\.[\w-]+)+)(?:\/[\w-./?%=&]*)?/gi;

    function isWhitelisted(domain) {
        return WHITELISTED_DOMAINS.some(whitelisted =>
            domain === whitelisted ||
            domain.endsWith('.' + whitelisted)
        );
    }

    function obfuscateDotsInUrls(text) {
        return text.replace(URL_REGEX, (fullMatch, domain) => {
            if (isWhitelisted(domain)) {
                return fullMatch;
            }
            return fullMatch.replace(/\./g, '%2E');
        });
    }

    function handlePaste(e) {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text');
        document.execCommand('insertText', false, obfuscateDotsInUrls(text));
    }

    function handleInput(e) {
        if (e.inputType !== 'insertText' || !e.data) return;
        const target = e.target;
        const start = target.selectionStart;
        const end = target.selectionEnd;
        const newValue = obfuscateDotsInUrls(target.value);

        if (newValue !== target.value) {
            const beforeSelection = target.value.substring(0, start);
            const afterChanges = obfuscateDotsInUrls(beforeSelection);
            const cursorOffset = afterChanges.length - beforeSelection.length;

            target.value = newValue;
            target.setSelectionRange(start + cursorOffset, end + cursorOffset);
        }
    }

    document.addEventListener('paste', handlePaste, true);
    document.addEventListener('input', handleInput, true);
    document.querySelectorAll('input, textarea').forEach(el => {
        el.value = obfuscateDotsInUrls(el.value);
    });
})();



(function() {
    'use strict';
    GM_addStyle(`
        .custom-settings-container {
            margin-right: 8px;
            display: flex;
            align-items: center;
            position: relative;
            z-index: 1001 !important;
        }
        .custom-settings-button {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
            z-index: 1001 !important;
            position: relative;
        }
        .custom-settings-button:hover {
            transform: rotate(30deg) !important;
            filter: drop-shadow(0 0 4px rgba(139, 195, 74, 0.5));
        }
        .custom-gear-icon {
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .custom-settings-button:hover .custom-gear-icon {
            transform: rotate(330deg);
        }

        .settings-panel {
            position: fixed;
            top: 100px;
            left: 100px;
            width: 500px;
            height: 400px;
            background: #2b2a2a;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            z-index: 9999;
            display: none;
            overflow: hidden;
            border: 1px solid #3a3a3a;
            font-family: 'Segoe UI', Roboto, sans-serif;
            color: #e0e0e0;
            transition: all 0.3s ease;
        }
        .settings-panel.visible {
            display: flex;
        }
        .settings-panel-header {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 40px;
            background: linear-gradient(90deg, #3a3a3a, #2b2a2a);
            display: flex;
            align-items: center;
            padding: 0 15px;
            cursor: move;
            border-bottom: 1px solid #1e1e1e;
            user-select: none;
            z-index: 2;
        }
        .settings-panel-title {
            flex-grow: 1;
            font-weight: 600;
            color: #8bc34a;
            text-shadow: 0 0 5px rgba(139, 195, 74, 0.3);
        }
        .settings-panel-close {
            cursor: pointer;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            transition: background 0.2s;
        }
        .settings-panel-close:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        .settings-panel-body {
            display: flex;
            width: 100%;
            height: 100%;
            padding-top: 40px;
        }
        .settings-tabs {
            width: 120px;
            background: #252525;
            border-right: 1px solid #1e1e1e;
            padding: 10px 0;
        }
        .settings-tab {
            padding: 12px 15px;
            cursor: pointer;
            transition: all 0.2s;
            border-left: 3px solid transparent;
            font-size: 13px;
        }
        .settings-tab:hover {
            background: rgba(255, 255, 255, 0.05);
        }
        .settings-tab.active {
            background: rgba(139, 195, 74, 0.1);
            border-left: 3px solid #8bc34a;
            color: #8bc34a;
        }
        .settings-content {
            flex-grow: 1;
            padding: 7px;
            overflow-y: auto;
        }
        .settings-tab-content {
            display: none;
        }
        .settings-tab-content.active {
            display: block;
        }

        /* Specific tab styles */
        .gradient-controls {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .color-picker-row {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .color-preview {
            width: 30px;
            height: 30px;
            border-radius: 4px;
            border: 1px solid #444;
            cursor: pointer;
        }
        .slider-container {
            margin: 15px 0;
        }
        .slider-label {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }
        .slider {
            width: 100%;
            height: 6px;
            -webkit-appearance: none;
            background: #444;
            border-radius: 3px;
            outline: none;
        }
        .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #8bc34a;
            cursor: pointer;
        }

         .privacy-description {
            font-size: 12px;
            color: #aaa;
            margin-top: 16px;
            margin-bottom: 15px;
        }
        .privacy-option {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        .privacy-toggle {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 20px;
            margin-right: 10px;
        }
        .privacy-toggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .privacy-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #444;
            transition: .4s;
            border-radius: 20px;
        }
        .privacy-slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        input:checked + .privacy-slider {
            background-color: #8bc34a;
        }
        input:checked + .privacy-slider:before {
            transform: translateX(20px);
        }

        .style-option {
            margin-bottom: 15px;
        }
        .style-select {
            width: 100%;
            padding: 8px;
            background: #333;
            border: 1px solid #444;
            border-radius: 4px;
            color: #e0e0e0;
            margin-top: 5px;
        }

        .font-option {
            margin-bottom: 15px;
        }
        .font-preview {
            padding: 10px;
            border: 1px solid #444;
            border-radius: 4px;
            margin-top: 10px;
            background: #333;
        }
        .online-font-input {
            width: 100%;
            padding: 8px;
            background: #333;
            border: 1px solid #444;
            border-radius: 4px;
            color: #e0e0e0;
            margin-top: 5px;
            font-family: inherit;
            transition: border-color 0.3s;
        }
        .online-font-input.valid {
            border-color: #8bc34a;
        }
        .online-font-description {
            font-size: 12px;
            color: #aaa;
            margin-top: 5px;
        }
        .font-disclaimer {
            font-size: 12px;
            color: #ff9800;
            margin-top: 15px;
            padding: 8px;
            background: rgba(255, 152, 0, 0.1);
            border-radius: 4px;
        }
        .color-hex-input {
            padding: 5px;
            background: #333;
            border: 1px solid #444;
            border-radius: 4px;
            color: #e0e0e0;
            font-family: inherit;
        }
        .gradient-text-input {
            width: 100%;
            padding: 8px;
            background: #333;
            border: 1px solid #444;
            border-radius: 4px;
            color: #e0e0e0;
            margin-top: 10px;
            font-family: inherit;
        }
        .gradient-buttons-container {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        .gradient-action-btn {
            padding: 8px 12px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
        }
        .gradient-action-btn:hover {
            background: rgba(255,255,255,0.2);
        }
                .style-option {
            margin-bottom: 15px;
        }
        .style-select {
            width: 100%;
            padding: 8px;
            background: #333;
            border: 1px solid #444;
            border-radius: 4px;
            color: #e0e0e0;
            margin-top: 5px;
        }

        /* New styles for our enhanced options */
        .glass-panel-controls {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-top: 15px;
        }
        .control-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .slider-with-input {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
        }
        .slider-with-input input[type="range"] {
            flex-grow: 1;
        }
        .slider-with-input input[type="number"] {
            width: 60px;
            padding: 5px;
            background: #333;
            border: 1px solid #444;
            border-radius: 4px;
            color: #e0e0e0;
        }
        .css-input-area {
            width: 100%;
            height: 150px;
            padding: 8px;
            background: #333;
            border: 1px solid #444;
            border-radius: 4px;
            color: #e0e0e0;
            resize: vertical;
            font-family: monospace;
            margin-top: 5px;
        }
        .css-input-area.valid {
            border-color: #8bc34a;
        }
        .url-input-area {
            width: 100%;
            height: 80px;
            padding: 8px;
            background: #333;
            border: 1px solid #444;
            border-radius: 4px;
            color: #e0e0e0;
            resize: vertical;
            font-family: monospace;
            margin-top: 5px;
        }
        .url-input-area.valid {
            border-color: #8bc34a;
        }
    `);

    function createSettingsPanel() {
        const panel = document.createElement('div');
        panel.className = 'settings-panel';
        panel.innerHTML = `
<div class="settings-panel-header">
    <div class="settings-panel-title">UtilifyV2 Config Menu</div>
    <div class="settings-panel-close">✕</div>
</div>
<div class="settings-panel-body">
    <div class="settings-tabs">
        <div class="settings-tab active" data-tab="gradient">Gradient</div>
        <div class="settings-tab" data-tab="privacy">Privacy</div>
        <div class="settings-tab" data-tab="styles">Styles</div>
        <div class="settings-tab" data-tab="fonts">Fonts</div>
    </div>
    <div class="settings-content">
        <div class="settings-tab-content active" id="gradient-tab">
            <h3>Gradient Customization</h3>
            <div class="gradient-controls">
                <div class="slider-container">
                    <div class="slider-label">
                        <span>Gradient Angle</span>
                        <span id="angle-value">45°</span>
                    </div>
                    <input type="range" min="0" max="360" value="45" class="slider" id="gradient-angle">
                </div>
                <div class="color-picker-row">
                    <span>Start Color:</span>
                    <div class="color-preview" id="start-color" style="background: #3a3a3a;"></div>
                    <input type="text" class="color-hex-input" placeholder="#HEX">
                    <input type="color" id="start-color-picker" value="#3a3a3a" style="display: none;">
                </div>
                <div class="color-picker-row">
                    <span>End Color:</span>
                    <div class="color-preview" id="end-color" style="background: #2b2a2a;"></div>
                    <input type="text" class="color-hex-input" placeholder="#HEX">
                    <input type="color" id="end-color-picker" value="#2b2a2a" style="display: none;">
                </div>
                <input type="text" class="gradient-text-input" id="custom-gradient-input" placeholder="linear-gradient(45deg, #3a3a3a, #2b2a2a)">
                <div class="gradient-buttons-container">
                    <button class="gradient-action-btn">Copy Gradient</button>
                    <button class="gradient-action-btn">Clear Gradient</button>
                </div>
            </div>
        </div>

        <div class="settings-tab-content" id="privacy-tab">
            <h3>Privacy Settings</h3>
            <div class="privacy-option">
                <label class="privacy-toggle">
                    <input type="checkbox" id="disable-friendslist">
                    <span class="privacy-slider"></span>
                </label>
                <span>Disable Friendslist</span>
            </div>
            <div class="privacy-option">
                <label class="privacy-toggle">
                    <input type="checkbox" id="blur-sensitive">
                    <span class="privacy-slider"></span>
                </label>
                <span>Blur sensitive content</span>
                <div class="privacy-description">This feature is currently broken.</div>
            </div>
            <div class="privacy-option">
                <label class="privacy-toggle">
                    <input type="checkbox" id="blur-comments">
                    <span class="privacy-slider"></span>
                </label>
                <span>Blur comments</span>
            </div>
            <div class="privacy-option">
                <label class="privacy-toggle">
                    <input type="checkbox" id="disable-infobar">
                    <span class="privacy-slider"></span>
                </label>
                <span>Disable WebGL ProfileNav</span>
            </div>
        </div>

        <div class="settings-tab-content" id="styles-tab">
            <h3>Style Customization</h3>
            <div class="style-option">
                <label class="privacy-toggle">
                    <input type="checkbox" id="glass-panels-toggle" checked>
                    <span class="privacy-slider"></span>
                </label>
                <span>Glass Panels</span>
                <div class="glass-panel-controls">
                    <div class="control-row">
                        <span>Border Radius:</span>
                        <input type="number" id="glass-radius" min="0" max="50" value="8">
                    </div>
                    <div class="control-row">
                        <span>Hue:</span>
                        <div class="slider-with-input">
                            <input type="range" id="glass-hue" min="0" max="360" value="270">
                            <span id="glass-hue-value">270</span>
                        </div>
                    </div>
                    <div class="control-row">
                        <span>Transparency:</span>
                        <div class="slider-with-input">
                            <input type="range" id="glass-alpha" min="1" max="50" value="16">
                            <span id="glass-alpha-value">16</span>%
                        </div>
                    </div>
                </div>
            </div>
            <div class="style-option">
                <label class="privacy-toggle">
                    <input type="checkbox" id="invisible-avatars-toggle">
                    <span class="privacy-slider"></span>
                </label>
                <span>Invisible Avatar Backgrounds</span>
            </div>
            <div class="style-option">
                <label>Online Styles (URLs)</label>
                <textarea class="url-input-area" id="online-styles-input" placeholder="Enter one CSS URL per line (e.g., https://example.com/style.css)"></textarea>
            </div>
            <div class="style-option">
                <label>Custom CSS</label>
                <textarea class="css-input-area" id="custom-css-input" placeholder="Enter your custom CSS here"></textarea>
            </div>
        </div>

        <div class="settings-tab-content" id="fonts-tab">
            <h3>Font Customization</h3>
            <div class="font-option">
                <label>Main Font</label>
                <select class="style-select" id="main-font">
                    <option value="default">Default (Segoe UI)</option>
                    <option value="roboto">Roboto</option>
                    <option value="open-sans">Open Sans</option>
                    <option value="montserrat">Montserrat</option>
                    <option value="poppins">Poppins</option>
                    <option value="comfortaa">Comfortaa</option>
                    <option value="online">Online Font</option>
                </select>
                <div class="font-preview" style="font-family: 'Segoe UI'">
                    The quick brown fox jumps over the lazy dog
                </div>
            </div>
            <div class="font-option">
                <label>Online Font URL</label>
                <input type="text" class="online-font-input" id="online-font-url" placeholder="https://fonts.googleapis.com/css2?family=FontName">
                <div class="online-font-description">
                    Supports Google Fonts (copy the CSS URL) or direct .ttf/.woff URLs.
                    Only one online font can be active at a time.
                </div>
            </div>
            <div class="font-option">
                <label>Font Size</label>
                <select class="style-select" id="font-size">
                    <option value="default">Default</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </div>
            <div class="font-disclaimer">
                Note: Only one online font can be active at a time. The input border will turn green when your online font is successfully loaded.
            </div>
        </div>
    </div>
</div>

        `;

        document.body.appendChild(panel);
        return panel;
    }

    function makeDraggable(panel) {
        const header = panel.querySelector('.settings-panel-header');
        let isDragging = false;
        let offsetX, offsetY;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - panel.getBoundingClientRect().left;
            offsetY = e.clientY - panel.getBoundingClientRect().top;
            panel.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            const maxX = window.innerWidth - panel.offsetWidth;
            const maxY = window.innerHeight - panel.offsetHeight;

            panel.style.left = `${Math.min(Math.max(0, x), maxX)}px`;
            panel.style.top = `${Math.min(Math.max(0, y), maxY)}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            panel.style.cursor = '';
        });
    }

    function setupTabs(panel) {
        const tabs = panel.querySelectorAll('.settings-tab');
        const contents = panel.querySelectorAll('.settings-tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }
    function setupGradientTab(panel) {
        const angleSlider = panel.querySelector('#gradient-angle');
        const angleValue = panel.querySelector('#angle-value');
        const startColorPreview = panel.querySelector('#start-color');
        const startColorPicker = panel.querySelector('#start-color-picker');
        const endColorPreview = panel.querySelector('#end-color');
        const endColorPicker = panel.querySelector('#end-color-picker');
        const startColorHex = panel.querySelectorAll('.color-hex-input')[0];
        const endColorHex = panel.querySelectorAll('.color-hex-input')[1];
        const customGradientInput = panel.querySelector('#custom-gradient-input');
        const copyButton = panel.querySelectorAll('.gradient-action-btn')[0];
        const clearButton = panel.querySelectorAll('.gradient-action-btn')[1];
        function parseGradient(gradient) {
            if (!gradient) return null;

            const match = gradient.match(/linear-gradient\((\d+)deg,\s*(#[0-9a-f]+|rgba?\([^)]+\)),\s*(#[0-9a-f]+|rgba?\([^)]+\))/i);
            if (match) {
                return {
                    angle: match[1],
                    color1: match[2],
                    color2: match[3]
                };
            }
            return null;
        }
        function isValidHex(hex) {
            return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
        }
        function updateColorFromHex(input, picker, preview) {
            const hex = input.value.trim();
            if (hex && isValidHex(hex)) {
                picker.value = hex;
                preview.style.background = hex;
                updateGradient();
            }
        }
        function loadGradient() {
            const savedConfig = GM_getValue('UConfig', {});
            const savedGradient = savedConfig.gradient || 'linear-gradient(45deg, #3a3a3a, #2b2a2a)';
            document.body.style.background = savedGradient;
            document.body.style.backgroundAttachment = 'fixed';
            const parsed = parseGradient(savedGradient);
            if (parsed) {
                angleSlider.value = parsed.angle;
                angleValue.textContent = `${parsed.angle}°`;
                startColorPicker.value = parsed.color1;
                startColorPreview.style.background = parsed.color1;
                startColorHex.value = parsed.color1;
                endColorPicker.value = parsed.color2;
                endColorPreview.style.background = parsed.color2;
                endColorHex.value = parsed.color2;
                customGradientInput.value = savedGradient;
            }
        }
        function updateGradient() {
            const angle = angleSlider.value;
            const color1 = startColorPicker.value;
            const color2 = endColorPicker.value;
            const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
            startColorPreview.style.background = color1;
            startColorHex.value = color1;
            endColorPreview.style.background = color2;
            endColorHex.value = color2;
            angleValue.textContent = `${angle}°`;
            customGradientInput.value = gradient;
            document.body.style.background = gradient;
            document.body.style.backgroundAttachment = 'fixed';
            const currentConfig = GM_getValue('UConfig', {});
            currentConfig.gradient = gradient;
            GM_setValue('UConfig', currentConfig);
        }

        function handleCustomGradient(e) {
            const value = e.target.value.trim();
            if (value.includes('linear-gradient')) {
                document.body.style.background = value;
                document.body.style.backgroundAttachment = 'fixed';
                const parsed = parseGradient(value);
                if (parsed) {
                    angleSlider.value = parsed.angle;
                    angleValue.textContent = `${parsed.angle}°`;
                    startColorPicker.value = parsed.color1;
                    startColorPreview.style.background = parsed.color1;
                    startColorHex.value = parsed.color1;
                    endColorPicker.value = parsed.color2;
                    endColorPreview.style.background = parsed.color2;
                    endColorHex.value = parsed.color2;
                }
                const currentConfig = GM_getValue('UConfig', {});
                currentConfig.gradient = value;
                GM_setValue('UConfig', currentConfig);
            }
        }
        function clearGradient() {
            document.body.style.background = '';
            customGradientInput.value = '';
            const currentConfig = GM_getValue('UConfig', {});
            delete currentConfig.gradient;
            GM_setValue('UConfig', currentConfig);
        }

        function copyGradient() {
            const gradient = customGradientInput.value ||
                             `linear-gradient(${angleSlider.value}deg, ${startColorPicker.value}, ${endColorPicker.value})`;

            navigator.clipboard.writeText(gradient).then(() => {
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy gradient: ', err);
            });
        }
        angleSlider.addEventListener('input', updateGradient);
        startColorPicker.addEventListener('input', updateGradient);
        endColorPicker.addEventListener('input', updateGradient);
        startColorPreview.addEventListener('click', () => startColorPicker.click());
        endColorPreview.addEventListener('click', () => endColorPicker.click());
        startColorHex.addEventListener('change', () => updateColorFromHex(startColorHex, startColorPicker, startColorPreview));
        endColorHex.addEventListener('change', () => updateColorFromHex(endColorHex, endColorPicker, endColorPreview));
        customGradientInput.addEventListener('input', handleCustomGradient);
        copyButton.addEventListener('click', copyGradient);
        clearButton.addEventListener('click', clearGradient);
        loadGradient();
    }


    function setupFontTab(panel) {
        const fontSelect = panel.querySelector('#main-font');
        const fontPreview = panel.querySelector('.font-preview');
        const onlineFontInput = panel.querySelector('#online-font-url');
        let currentFontLink = null;
        let currentFontStyle = null;

        const fontMap = {
            'default': "'Segoe UI', sans-serif",
            'roboto': "'Roboto', sans-serif",
            'open-sans': "'Open Sans', sans-serif",
            'montserrat': "'Montserrat', sans-serif",
            'poppins': "'Poppins', sans-serif",
            'comfortaa': "'Comfortaa', sans-serif",
            'online': "var(--custom-font), sans-serif"
        };

        function loadComfortaa() {
            const link = document.createElement('link');
            link.href = 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;700&display=swap';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }

        function loadOnlineFont(url) {
            if (currentFontLink) {
                document.head.removeChild(currentFontLink);
                currentFontLink = null;
            }

            if (!url) {
                onlineFontInput.classList.remove('valid');
                return;
            }
            try {
                new URL(url);
            } catch (e) {
                onlineFontInput.classList.remove('valid');
                return;
            }

            const link = document.createElement('link');
            link.href = url;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
            currentFontLink = link;

            let fontFamily = 'CustomFont';
            if (url.includes('fonts.googleapis.com')) {
                const match = url.match(/family=([^&:]+)/);
                if (match) fontFamily = match[1].replace(/\+/g, ' ');
            }

            if (!currentFontStyle) {
                currentFontStyle = document.createElement('style');
                document.head.appendChild(currentFontStyle);
            }
            currentFontStyle.textContent = `:root { --custom-font: "${fontFamily}"; }`;

            onlineFontInput.classList.add('valid');

            const currentConfig = GM_getValue('UConfig', {});
            currentConfig.onlineFont = url;
            GM_setValue('UConfig', currentConfig);
        }

        function applyGlobalFont(fontValue) {
            const oldStyle = document.getElementById('global-font-style');
            if (oldStyle) oldStyle.remove();

            const style = document.createElement('style');
            style.id = 'global-font-style';
            style.textContent = `* { font-family: ${fontValue} !important; }`;
            document.head.appendChild(style);
        }

        fontSelect.addEventListener('change', (e) => {
            const selectedFont = e.target.value;

            if (selectedFont === 'online') {
                const savedConfig = GM_getValue('UConfig', {});
                const savedFont = savedConfig.onlineFont;
                if (savedFont) {
                    loadOnlineFont(savedFont);
                    onlineFontInput.value = savedFont;
                    applyGlobalFont(fontMap[selectedFont]);
                    fontPreview.style.fontFamily = fontMap[selectedFont].replace('var(--custom-font), ', '').replace('sans-serif', '');
                }
            } else {
                if (selectedFont === 'comfortaa') loadComfortaa();
                applyGlobalFont(fontMap[selectedFont]);
                fontPreview.style.fontFamily = fontMap[selectedFont];

                const currentConfig = GM_getValue('UConfig', {});
                currentConfig.fontFamily = selectedFont;
                if (currentConfig.onlineFont) {
                    delete currentConfig.onlineFont;
                    onlineFontInput.value = '';
                    onlineFontInput.classList.remove('valid');
                }
                GM_setValue('UConfig', currentConfig);
            }
        });

        onlineFontInput.addEventListener('change', (e) => {
            if (fontSelect.value === 'online') {
                loadOnlineFont(e.target.value.trim());
                if (e.target.value.trim()) {
                    applyGlobalFont(fontMap.online);
                    fontPreview.style.fontFamily = fontMap.online.replace('var(--custom-font), ', '').replace('sans-serif', '');
                }
            }
        });

        const savedConfig = GM_getValue('UConfig', {});
        if (savedConfig.fontFamily) {
            fontSelect.value = savedConfig.fontFamily;
            if (savedConfig.fontFamily === 'comfortaa') loadComfortaa();
            if (savedConfig.fontFamily === 'online' && savedConfig.onlineFont) {
                onlineFontInput.value = savedConfig.onlineFont;
                loadOnlineFont(savedConfig.onlineFont);
                applyGlobalFont(fontMap.online);
                fontPreview.style.fontFamily = fontMap.online.replace('var(--custom-font), ', '').replace('sans-serif', '');
            } else {
                applyGlobalFont(fontMap[savedConfig.fontFamily] || fontMap.default);
                fontPreview.style.fontFamily = fontMap[savedConfig.fontFamily] || fontMap.default;
            }
        }
    }

    function setupPrivacyTab(panel) {
        const disableFriendslist = panel.querySelector('#disable-friendslist');
        const blurSensitive = panel.querySelector('#blur-sensitive');
        const blurComments = panel.querySelector('#blur-comments');
        const disableInfobar = panel.querySelector('#disable-infobar');
        let privacyStyle = document.createElement('style');
        privacyStyle.id = 'kogama-privacy-styles';
        document.head.appendChild(privacyStyle);
        function updatePrivacyStyles() {
            let css = '';

            if (disableFriendslist.checked) {
                css += `._1Yhgq { display: none !important; transition: all 0.3s ease-in-out;}`;
            }
            if (blurSensitive.checked) {
                css += `.css-k9ok3b { filter: blur(5px) !important;transition: filter 0.3s ease !important; }.css-k9ok3b:focus {filter: none !important; }`;
            }
            if (blurComments.checked) {
                css += `._3Wsxf  {
                    filter: blur(5px) !important;
                    transition: all 0.7s ease !important;
                }
                ._3Wsxf:hover {
                    filter: none !important;
                }`;
            }
            if (disableInfobar.checked) {
                css += `._3i_24 { display: none !important; }`;
            }

            privacyStyle.textContent = css;
        }
        function loadPrivacySettings() {
            const savedConfig = GM_getValue('UConfig', {});

            if (savedConfig.disableFriendslist) disableFriendslist.checked = true;
            if (savedConfig.blurSensitive) blurSensitive.checked = true;
            if (savedConfig.blurComments) blurComments.checked = true;
            if (savedConfig.disableInfobar) disableInfobar.checked = true;

            updatePrivacyStyles();
        }
        function handlePrivacyToggle() {
            const currentConfig = GM_getValue('UConfig', {});

            currentConfig.disableFriendslist = disableFriendslist.checked;
            currentConfig.blurSensitive = blurSensitive.checked;
            currentConfig.blurComments = blurComments.checked;
            currentConfig.disableInfobar = disableInfobar.checked;

            GM_setValue('UConfig', currentConfig);
            updatePrivacyStyles();
        }
        disableFriendslist.addEventListener('change', handlePrivacyToggle);
        blurSensitive.addEventListener('change', handlePrivacyToggle);
        blurComments.addEventListener('change', handlePrivacyToggle);
        disableInfobar.addEventListener('change', handlePrivacyToggle);
        loadPrivacySettings();
    }
        function setupStylesTab(panel) {
        const glassPanelsToggle = panel.querySelector('#glass-panels-toggle');
        const glassRadiusInput = panel.querySelector('#glass-radius');
        const glassHueSlider = panel.querySelector('#glass-hue');
        const glassHueValue = panel.querySelector('#glass-hue-value');
        const glassAlphaSlider = panel.querySelector('#glass-alpha');
        const glassAlphaValue = panel.querySelector('#glass-alpha-value');
        const invisibleAvatarsToggle = panel.querySelector('#invisible-avatars-toggle');
        const onlineStylesInput = panel.querySelector('#online-styles-input');
        const customCSSInput = panel.querySelector('#custom-css-input');


        let dynamicStyle = document.createElement('style');
        dynamicStyle.id = 'kogama-enhanced-styles';
        document.head.appendChild(dynamicStyle);

        function updateGlassPanelStyles() {
            const enabled = glassPanelsToggle.checked;
            const radius = glassRadiusInput.value;
            const hue = glassHueSlider.value;
            const alpha = glassAlphaSlider.value / 100;

            if (!enabled) {
                dynamicStyle.textContent = dynamicStyle.textContent.replace(/\/\* GLASS PANELS START \*\/[\s\S]*?\/\* GLASS PANELS END \*\//g, '');
                return;
            }

            const glassCSS = `/* GLASS PANELS START */
            ._1q4mD ._1sUGu ._1u05O { background-color: transparent !important; }
                .css-1udp1s3, .css-zslu1c, .css-1rbdj9p {
                    background-color: hsla(${hue}, 68%, 43%, ${alpha}) !important;
                    backdrop-filter: blur(4px) !important;
                    border-radius: ${radius}px !important;
                }
                ._3TORb {
                    background-color: hsla(${hue}, 68%, 43%, ${alpha}) !important;
                    border-radius: ${radius}px !important;
                }
                .zUJzi, .uwn5j, ._2BvOT, ._375XK {
                    border: none !important;
                    background-color: hsla(${hue}, 68%, 43%, ${alpha}) !important;
                }
                ._375XK textarea {
                    border: none !important;
                    background-color: hsla(${hue}, 68%, 43%, ${alpha * 5.6}) !important;
                }
                ._1q4mD {
                background-color: hsla(${hue}, 68%, 43%, ${alpha}) !important;
                 backdrop-filter: blur(4px) !important;
                 }

            /* GLASS PANELS END */`;
            dynamicStyle.textContent = dynamicStyle.textContent.replace(/\/\* GLASS PANELS START \*\/[\s\S]*?\/\* GLASS PANELS END \*\//g, '');

            dynamicStyle.textContent += glassCSS;
        }
        function toggleInvisibleAvatars(enabled) {
            if (enabled) {
                const script = document.createElement('script');
                script.textContent = `(${removeBlueBackgrounds.toString()})();`;
                document.body.appendChild(script);
            } else {
                // This would need a way to revert the changes, which is complex
                // For now, we'll just reload the page
                window.location.reload();
            }
        }

        function removeBlueBackgrounds() {
            "use strict";

            function removeBlueBackground(imageUrl, callback) {
                const img = new Image();
                img.crossOrigin = "Anonymous";
                img.onload = function() {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];

                        if (b > 150 && b > r && b > g) {
                            data[i + 3] = 0;
                        }
                    }
                    ctx.putImageData(imageData, 0, 0);
                    callback(canvas.toDataURL());
                };
                img.src = imageUrl;
            }

            function processImages() {
                document.querySelectorAll("image._3tYRU").forEach((imageElement) => {
                    removeBlueBackground(imageElement.getAttribute("xlink:href"), (newImageUrl) => {
                        imageElement.setAttribute("xlink:href", newImageUrl);
                    });
                });
            }

            window.addEventListener("load", processImages);
        }

        function loadOnlineCSS(urls) {
            document.querySelectorAll('link[data-kogama-enhanced="online-style"]').forEach(el => el.remove());

            if (!urls) return;

            const urlList = urls.split('\n').filter(url => url.trim().length > 0);

            urlList.forEach(url => {
                if (url.startsWith('http')) {
                    const link = document.createElement('link');
                    link.href = url;
                    link.rel = 'stylesheet';
                    link.dataset.kogamaEnhanced = 'online-style';
                    link.onload = () => onlineStylesInput.classList.add('valid');
                    link.onerror = () => onlineStylesInput.classList.remove('valid');
                    document.head.appendChild(link);
                }
            });
        }
        function applyCustomCSS(css) {
            let customStyle = document.getElementById('kogama-custom-css');
            if (!customStyle) {
                customStyle = document.createElement('style');
                customStyle.id = 'kogama-custom-css';
                document.head.appendChild(customStyle);
            }
            customStyle.textContent = css;
        }
        function loadStylesSettings() {
            const savedConfig = GM_getValue('UConfig', {});
            if (savedConfig.glassPanels !== undefined) {
                glassPanelsToggle.checked = savedConfig.glassPanels.enabled;
                glassRadiusInput.value = savedConfig.glassPanels.radius || 8;
                glassHueSlider.value = savedConfig.glassPanels.hue || 270;
                glassHueValue.textContent = savedConfig.glassPanels.hue || 270;
                glassAlphaSlider.value = (savedConfig.glassPanels.alpha || 0.16) * 100;
                glassAlphaValue.textContent = Math.round((savedConfig.glassPanels.alpha || 0.16) * 100);
            } else {
                // default ig
                glassPanelsToggle.checked = true;
                glassRadiusInput.value = 8;
                glassHueSlider.value = 270;
                glassHueValue.textContent = 270;
                glassAlphaSlider.value = 16;
                glassAlphaValue.textContent = 16;
            }

            if (savedConfig.invisibleAvatars !== undefined) {
                invisibleAvatarsToggle.checked = savedConfig.invisibleAvatars;
            }

            if (savedConfig.onlineStyles) {
                onlineStylesInput.value = savedConfig.onlineStyles;
            }

            if (savedConfig.customCSS) {
                customCSSInput.value = savedConfig.customCSS;
            }
            updateGlassPanelStyles();
            if (invisibleAvatarsToggle.checked) {
                toggleInvisibleAvatars(true);
            }
            loadOnlineCSS(onlineStylesInput.value);
            applyCustomCSS(customCSSInput.value);
        }
        function saveStylesSettings() {
            const currentConfig = GM_getValue('UConfig', {});

            currentConfig.glassPanels = {
                enabled: glassPanelsToggle.checked,
                radius: parseInt(glassRadiusInput.value),
                hue: parseInt(glassHueSlider.value),
                alpha: parseInt(glassAlphaSlider.value) / 100
            };

            currentConfig.invisibleAvatars = invisibleAvatarsToggle.checked;
            currentConfig.onlineStyles = onlineStylesInput.value;
            currentConfig.customCSS = customCSSInput.value;

            GM_setValue('UConfig', currentConfig);
        }
        glassPanelsToggle.addEventListener('change', () => {
            updateGlassPanelStyles();
            saveStylesSettings();
        });

        glassRadiusInput.addEventListener('input', () => {
            updateGlassPanelStyles();
            saveStylesSettings();
        });

        glassHueSlider.addEventListener('input', () => {
            glassHueValue.textContent = glassHueSlider.value;
            updateGlassPanelStyles();
            saveStylesSettings();
        });

        glassAlphaSlider.addEventListener('input', () => {
            glassAlphaValue.textContent = glassAlphaSlider.value;
            updateGlassPanelStyles();
            saveStylesSettings();
        });

        invisibleAvatarsToggle.addEventListener('change', () => {
            toggleInvisibleAvatars(invisibleAvatarsToggle.checked);
            saveStylesSettings();
        });

        onlineStylesInput.addEventListener('change', () => {
            loadOnlineCSS(onlineStylesInput.value);
            saveStylesSettings();
        });

        customCSSInput.addEventListener('change', () => {
            applyCustomCSS(customCSSInput.value);
            saveStylesSettings();
        });

        loadStylesSettings();
    }
    function initSettingsPanel() {
        const panel = createSettingsPanel();
        makeDraggable(panel);
        setupTabs(panel);
        setupGradientTab(panel);
        setupFontTab(panel);
        setupPrivacyTab(panel);
        setupStylesTab(panel);
        panel.querySelector('.settings-panel-close').addEventListener('click', () => {
            panel.classList.remove('visible');
        });

        return panel;
    }

    function createSettingsButton() {
        const gearSVG = `
            <svg class="custom-gear-icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path>
            </svg>
        `;

        const settingsButton = document.createElement('button');
        settingsButton.className = 'MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall custom-settings-button css-rebkop';
        settingsButton.setAttribute('tabindex', '0');
        settingsButton.setAttribute('type', 'button');
        settingsButton.innerHTML = gearSVG;

        const container = document.createElement('div');
        container.className = 'custom-settings-container';
        container.appendChild(settingsButton);

        const listItem = document.createElement('li');
        listItem.className = '_3WhKY';
        listItem.appendChild(container);

        return { button: settingsButton, element: listItem };
    }

    function initialize() {
        const panel = initSettingsPanel();
        const { button, element } = createSettingsButton();
        const notificationItem = document.querySelector('li._3WhKY:has(button.fodSP)');
        if (notificationItem) {
            notificationItem.parentNode.insertBefore(element, notificationItem);
            button.addEventListener('click', () => {
                panel.classList.toggle('visible');
            });
        } else {
            const observer = new MutationObserver(() => {
                const notificationItem = document.querySelector('li._3WhKY:has(button.fodSP)');
                if (notificationItem) {
                    notificationItem.parentNode.insertBefore(element, notificationItem);
                    button.addEventListener('click', () => {
                        panel.classList.toggle('visible');
                    });
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            setTimeout(() => {
                const notificationItem = document.querySelector('li._3WhKY:has(button.fodSP)');
                if (notificationItem) {
                    notificationItem.parentNode.insertBefore(element, notificationItem);
                    button.addEventListener('click', () => {
                        panel.classList.toggle('visible');
                    });
                }
                observer.disconnect();
            }, 5000);
        }
    }
    if (document.readyState === 'complete') {
        initialize();
    } else {
        window.addEventListener('load', initialize);
    }
})();
