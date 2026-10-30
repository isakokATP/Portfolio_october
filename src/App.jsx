import React, { useState, useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight, Camera, FlaskConical, House, Mail, Monitor, User, Image as ImageIcon, GraduationCap, Video, Book, Sun, Moon } from 'lucide-react'
import researchImage from './assets/research/iait2026-8-fig1.jpg'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:wght@400;700&display=swap');

  :root { 
    --ink: #18161e; 
    --paper: #eeefda; 
    --muted: #aaa7b0; 
    --lime: #d7f15a; 
    --coral: #ff6b5b; 
    --peach: #ffba91; 
    --line: #3b3743; 
    --pixel: 'Space Mono', 'Courier New', monospace; 
    --display: 'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; 
    --card: #211f2a;
    --bar: rgba(24, 22, 30, .9);
    --grid: rgba(238, 239, 218, .035);
    /* Fixed colors: do NOT change with theme (used on top of colored backgrounds) */
    --dark: #18161e;
    --cream: #eeefda;
  }
  :root[data-theme="light"] {
    --ink: #f4f2e8;
    --paper: #18161e;
    --muted: #5f5b69;
    --line: #d4cfbf;
    --lime: #7a9400;
    --card: #ffffff;
    --bar: rgba(244, 242, 232, .9);
    --grid: rgba(24, 22, 30, .05);
  }
  
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  
  body { 
    margin: 0; 
    min-width: 320px; 
    font: 16px/1.4 var(--pixel); 
    color: var(--paper); 
    font-synthesis: none; 
    text-rendering: optimizeLegibility; 
    
    background-color: var(--ink);
    background-image: linear-gradient(var(--grid) 1px, transparent 1px), 
                      linear-gradient(90deg, var(--grid) 1px, transparent 1px);
    background-size: 48px 48px;
    transition: background-color .3s, color .3s;
  }
  
  a { cursor: pointer; }
  a:focus-visible, button:focus-visible { outline: 2px solid var(--coral); outline-offset: 4px; }
  h1, h2, h3, p { margin: 0; }

  /* overflow-x: clip (not hidden) so the sticky top bar keeps working */
  .site-shell { max-width: 1920px; margin: 0 auto; overflow-x: clip; display: flex; flex-direction: column; min-height: 100vh; padding-bottom: 90px; }
  
  /* Top bar: brand + contact only (navigation lives in the dock) */
  .topbar { min-height: 76px; padding: 12px 5vw; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; border-bottom: 1px solid var(--line); font: 12px/1 var(--pixel); letter-spacing: .08em; background: var(--bar); backdrop-filter: blur(5px); position: sticky; top: 0; z-index: 50; }
  .brand, .contact-link, footer a { color: var(--paper); text-decoration: none; }
  .brand { display: flex; align-items: center; gap: 12px; }
  .brand-mark { color: var(--dark); background: var(--lime); padding: 7px 6px 5px; font-size: 12px; }
  .contact-link { display: flex; gap: 7px; align-items: center; border: 1px solid var(--lime); padding: 11px 13px 9px; color: var(--lime); transition: background .2s, color .2s; }
  .contact-link:hover { background: var(--lime); color: var(--dark); }
  
  main { flex-grow: 1; }

  .eyebrow, .project-number, .visual-code { color: var(--lime); font: 12px/1.3 var(--pixel); letter-spacing: .08em; text-transform: uppercase; }
  .status-dot { display: inline-block; width: 7px; height: 7px; background: var(--coral); margin-right: 8px; box-shadow: 0 0 0 3px rgba(255, 107, 91, .15); }
  
  h1 { color: var(--paper); font: 76px/.9 var(--display); letter-spacing: .03em; margin: 25px 0 28px; }
  h1 span, h2 span { color: var(--lime); }
  .cursor { color: var(--coral); animation: blink 1s steps(2) infinite; }
  @keyframes blink { 50% { opacity: 0; } }
  
  .pixel-button { display: inline-flex; align-items: center; gap: 14px; background: var(--coral); color: var(--dark); padding: 16px 18px 14px; font: 12px/1 var(--pixel); text-decoration: none; box-shadow: 5px 5px 0 var(--lime); transition: transform .2s, box-shadow .2s; border: none; cursor: pointer; }
  .pixel-button:hover { transform: translate(3px, 3px); box-shadow: 2px 2px 0 var(--lime); }
  
  /* Ticker (scrolling marquee) */
  .ticker { height: 49px; display: flex; align-items: center; overflow: hidden; white-space: nowrap; background: var(--lime); color: var(--dark); font: 12px/1 var(--pixel); letter-spacing: .1em; transform: rotate(-1deg) scale(1.02); margin-bottom: -20px; }
  .ticker-track { display: flex; width: max-content; animation: marquee 40s linear infinite; }
  .ticker span { padding-right: 90px; }
  .ticker span::before { content: '✦'; margin-right: 90px; }
  @keyframes marquee { to { transform: translateX(-50%); } }
  
  /* Sections */
  .page-section { padding: 80px 9vw; animation: fadeIn 0.4s ease-in-out; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  .home-profile { min-height: 590px; padding: 75px 9vw 65px; display: grid; grid-template-columns: 1.1fr .9fr; align-items: center; gap: 70px; }
  .home-copy h1 { font-size: clamp(54px, 6vw, 82px); }
  .home-intro { max-width: 520px; color: var(--muted); font-size: 15px; line-height: 1.75; margin-bottom: 28px; }
  .home-education { max-width: 520px; border-left: 2px solid var(--lime); padding: 5px 0 5px 18px; margin: 0 0 30px; }
  .home-education h2 { color: var(--paper); font: 22px/1.1 var(--display); letter-spacing: .03em; margin: 8px 0; }
  .home-education p:last-child { color: var(--muted); font-size: 13px; line-height: 1.6; }
  .home-portrait { position: relative; justify-self: center; width: min(100%, 370px); border: 8px solid var(--paper); background: var(--coral); box-shadow: 12px 12px 0 var(--lime); transform: rotate(2deg); }
  .home-portrait img { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: center 30%; filter: saturate(.9) contrast(1.05); }
  .home-portrait::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, transparent 0 5px, rgba(24, 22, 30, .12) 5px 6px); }
  .home-portrait-label { position: absolute; z-index: 2; left: 12px; bottom: 12px; padding: 7px 8px 5px; color: var(--dark); background: var(--lime); font: 12px/1.3 var(--pixel); letter-spacing: .08em; }
  .home-tech { padding: 65px 9vw 80px; }
  .tech-stack-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 14px; }
  .tech-card { min-height: 135px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 18px 10px; border: 1px solid var(--line); background: var(--card); text-align: center; transition: transform .2s, border-color .2s, background .3s; }
  .tech-card:hover { transform: translateY(-4px); border-color: var(--lime); }
  .tech-card img { width: 42px; height: 42px; object-fit: contain; }
  .tech-card span { color: var(--paper); font: 12px/1.4 var(--pixel); }
  .home-experience { padding: 20px 9vw 65px; }
  .home-projects { padding: 35px 9vw 100px; }
  .home-projects .section-heading h2 { color: var(--paper); font: 54px/.9 var(--display); letter-spacing: .03em; margin-top: 18px; }
  .home-projects .project-info p { max-width: 260px; }
  .home-projects-link { margin-top: 35px; }

  .section-heading { display: flex; justify-content: space-between; align-items: end; margin-bottom: 60px; }
  .section-heading h2 { color: var(--paper); font: 54px/.9 var(--display); letter-spacing: .03em; margin-top: 18px; }
  .accent { color: var(--coral); }
  .section-note { color: var(--muted); font: 12px/1.5 var(--pixel); text-align: right; }

  /* Works layout */
  .sub-section { margin-bottom: 70px; }
  .sub-section:last-child { margin-bottom: 0; }
  .experience-entry { display: grid; grid-template-columns: minmax(180px, .7fr) 1.3fr; gap: 30px; padding: 26px; border: 1px solid var(--line); background: var(--card); transition: background .3s; }
  .experience-meta { display: flex; flex-direction: column; gap: 10px; }
  .experience-meta h3 { color: var(--paper); font: 25px/.95 var(--display); letter-spacing: .03em; text-transform: uppercase; }
  .experience-meta p { color: var(--lime); font: 12px/1.5 var(--pixel); }
  .experience-description { color: var(--muted); font: 13px/1.7 var(--pixel); }
  .category-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 25px; border-bottom: 1px dashed var(--line); padding-bottom: 15px; flex-wrap: wrap; gap: 15px; }
  .category-title { color: var(--paper); font: 16px/1 var(--pixel); display: flex; align-items: center; gap: 10px; letter-spacing: 0.05em; text-transform: uppercase; }
  .category-title svg { color: var(--lime); }
  
  .retro-tabs { display: flex; gap: 10px; flex-wrap: wrap; }
  .retro-tab { background: transparent; border: 1px solid var(--line); color: var(--muted); font: 12px/1 var(--pixel); padding: 10px 14px; cursor: pointer; transition: all 0.2s; text-transform: uppercase; letter-spacing: 0.08em; display: flex; align-items: center; gap: 8px;}
  .retro-tab.active { border-color: var(--lime); color: var(--lime); background: rgba(215, 241, 90, 0.05); }
  .retro-tab:hover:not(.active) { border-color: var(--muted); color: var(--paper); }

  /* Project Grid - Auto-fit for 2560x1440 Support */
  .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px; }
  .project-grid-single { grid-template-columns: minmax(0, 680px); justify-content: center; }
  .project-card { border: 1px solid var(--line); background: var(--card); transition: transform .25s, border-color .25s, background .3s; }
  .project-card:hover { transform: translateY(-7px); border-color: var(--lime); }
  .project-card-link { display: block; color: inherit; text-decoration: none; }
  .project-card-link:focus-visible { outline: 2px solid var(--coral); outline-offset: 4px; }
  
  /* Project Visuals (colored backgrounds, so text/icons use fixed --dark) */
  .project-visual { height: 190px; position: relative; padding: 24px; overflow: hidden; }
  .project-visual svg { color: var(--dark); position: relative; z-index: 2; }
  .project-card-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .project-web .project-visual { background: var(--lime); }
  .project-research .project-visual { background: var(--coral); }
  .project-photo .project-visual { background: var(--peach); }
  .project-video .project-visual { background: #8f8adf; }
  .visual-code { position: absolute; right: 18px; top: 25px; color: var(--dark); }
  
  /* Card Ornaments */
  .mini-window { position: absolute; inset: 69px 25px 25px; background: var(--dark); border: 5px solid var(--cream); box-shadow: 10px 10px 0 rgba(24, 22, 30, .22); }
  .mini-window i { display: inline-block; width: 8px; height: 8px; background: var(--coral); margin: 9px 0 0 8px; }
  .mini-window i:nth-child(2) { background: #d7f15a; }
  .mini-window i:nth-child(3) { background: var(--peach); }
  
  .chart { position: absolute; right: 32px; bottom: 35px; display: flex; align-items: end; gap: 9px; height: 80px; }
  .chart b { width: 14px; background: var(--dark); }
  .chart b:nth-child(1) { height: 30%; }.chart b:nth-child(2) { height: 60%; }.chart b:nth-child(3) { height: 42%; }.chart b:nth-child(4) { height: 90%; }.chart b:nth-child(5) { height: 65%; }
  
  .photo-sun { position: absolute; width: 72px; height: 72px; right: 40px; top: 45px; background: var(--coral); }
  .photo-landscape { position: absolute; inset: 115px 0 0; background: var(--dark); clip-path: polygon(0 25%, 20% 2%, 35% 22%, 55% 5%, 75% 28%, 100% 5%, 100% 100%, 0 100%); }
  .photo-image { width: 100%; height: 100%; display: block; object-fit: cover; image-rendering: auto; }
  .video-screen { position: absolute; inset: 70px 25px 25px; display: flex; align-items: center; gap: 8px; padding: 14px; background: var(--dark); border: 5px solid var(--cream); box-shadow: 10px 10px 0 rgba(24, 22, 30, .22); }
  .video-screen span { color: #d7f15a; font-size: 25px; margin-right: auto; }
  .video-screen i { width: 8px; height: 8px; background: var(--coral); }
  .video-screen i:nth-of-type(2) { background: var(--peach); }
  .video-screen i:nth-of-type(3) { background: #d7f15a; }
  
  /* Project Info */
  .project-info { position: relative; min-height: 174px; padding: 22px; }
  .project-info h3 { color: var(--paper); font: 27px/.9 var(--display); letter-spacing: .04em; margin: 15px 0 13px; text-transform: uppercase; }
  .project-info p { max-width: 215px; color: var(--muted); font-size: 13px; line-height: 1.55; }
  .project-research .project-info p { max-width: none; padding-right: 30px; }
  .project-info button { position: absolute; right: 20px; bottom: 20px; color: var(--lime); background: none; border: none; cursor: pointer; padding: 5px;}
  .project-card-action { position: absolute; right: 20px; bottom: 20px; color: var(--lime); }
  .project-info button:hover { transform: scale(1.1); transition: transform 0.2s; }

  /* About Section */
  .about-grid { display: grid; grid-template-columns: .9fr .8fr 1fr; gap: 70px; align-items: center; margin-top: 50px; }
  .page-section h2 span { color: var(--coral); }
  .about-portrait { position: relative; width: min(100%, 340px); justify-self: center; border: 8px solid var(--paper); background: var(--coral); box-shadow: 12px 12px 0 var(--lime); transform: translateY(18px) rotate(-2deg); }
  .about-portrait img { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: center 30%; filter: saturate(.9) contrast(1.05); }
  .about-portrait::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, transparent 0 5px, rgba(24, 22, 30, .12) 5px 6px); }
  .about-portrait-label { position: absolute; z-index: 2; left: 12px; bottom: 12px; padding: 7px 8px 5px; color: var(--dark); background: var(--lime); font: 12px/1.3 var(--pixel); letter-spacing: .08em; }
  .about-copy { max-width: 470px; color: var(--muted); font-size: 15px; line-height: 1.75; margin-bottom: 28px; }
  .about-lede { color: var(--paper); font: 21px/1.35 var(--pixel); margin-bottom: 20px; }
  .about-meta { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 28px; }
  .about-meta span { border: 1px solid var(--line); padding: 7px 9px 5px; color: var(--lime); font: 12px/1.2 var(--pixel); letter-spacing: .06em; }
  .text-link { display: inline-flex; align-items: center; gap: 8px; color: var(--lime); font: 12px/1 var(--pixel); text-decoration: none; border-bottom: 1px solid var(--lime); padding-bottom: 9px; }
  
  /* Footer */
  footer { display: flex; justify-content: space-between; align-items: center; gap: 18px; padding: 22px 9vw; border-top: 1px solid var(--line); color: var(--muted); font: 12px/1.5 var(--pixel); letter-spacing: .06em; margin-top: auto; } 

  /* Tablet */
  @media (max-width: 1100px) {
    .tech-stack-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }
  
  /* Responsive */
  @media (max-width: 760px) { 
    .topbar { padding: 12px 20px; }
    .contact-link { padding: 10px 9px 8px; }
    h1 { font-size: clamp(52px, 16vw, 76px); }
    .home-profile { min-height: auto; padding: 55px 24px 65px; grid-template-columns: 1fr; gap: 50px; }
    .home-copy h1 { font-size: clamp(48px, 13vw, 70px); }
    .home-portrait { width: min(78vw, 330px); }
    .home-tech { padding: 45px 24px 60px; }
    .tech-stack-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    .tech-card { min-height: 120px; }
    .home-experience { padding: 10px 24px 45px; }
    .home-projects { padding: 35px 24px 75px; }
    .home-projects .section-heading { align-items: start; gap: 25px; flex-direction: column; margin-bottom: 40px; }
    .home-projects .section-heading h2 { font-size: 45px; }
    .page-section { padding: 60px 24px; }
    .section-heading { align-items: start; gap: 25px; flex-direction: column; margin-bottom: 40px; }
    .section-heading h2 { font-size: 45px; }
    .section-note { text-align: left; }
    .experience-entry { grid-template-columns: 1fr; gap: 18px; padding: 20px; }
    .project-grid { grid-template-columns: 1fr; gap: 25px; }
    .project-grid-single { grid-template-columns: minmax(0, 1fr); }
    .project-visual { height: 170px; }
    .about-grid { grid-template-columns: 1fr; gap: 45px; margin-top: 35px; }
    .about-portrait { width: min(78vw, 320px); order: 2; transform: rotate(-2deg); }
    .about-grid > div:last-child { order: 3; }
    .about-copy { font-size: 14px; }
    .about-lede { font-size: 18px; }
    footer { padding: 22px 24px; flex-wrap: wrap; } 
    .category-header { flex-direction: column; align-items: flex-start; }
  }

  /* Floating Dock */
  .floating-dock {
    --d-bg: rgba(24, 22, 30, .8);
    --d-border: var(--line);
    --d-btn: #2b2834;
    --d-btn-border: #3b3743;
    --d-fg: var(--muted);
    --d-fg-hover: #fff;
    --d-active-bg: #d7f15a;
    --d-active-fg: #18161e;
    --d-divider: var(--line);

    position: fixed; bottom: 24px; left: 50%;
    transform: translateX(-50%);
    display: flex; align-items: center; gap: 12px;
    padding: 10px 16px;
    background: var(--d-bg);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--d-border);
    border-radius: 999px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, .18);
    z-index: 100;
    max-width: calc(100vw - 32px);
    transition: transform .4s cubic-bezier(.2, .8, .2, 1), opacity .3s, background .3s, border-color .3s;
    animation: dockIn .6s cubic-bezier(.2, .8, .2, 1);
  }
  :root[data-theme="light"] .floating-dock {
    --d-bg: rgba(255, 255, 255, .85);
    --d-border: #ececec;
    --d-btn: #fff;
    --d-btn-border: #e3e3e3;
    --d-fg: #555;
    --d-fg-hover: #111;
    --d-active-bg: #111;
    --d-active-fg: #fff;
    --d-divider: #dcdcdc;
  }
  .floating-dock.is-hidden { transform: translate(-50%, 160%); opacity: 0; pointer-events: none; }
  @keyframes dockIn {
    from { opacity: 0; transform: translate(-50%, 30px); }
    to   { opacity: 1; transform: translate(-50%, 0); }
  }

  .dock-btn {
    position: relative;
    display: flex; align-items: center; justify-content: center;
    width: 46px; height: 46px; border-radius: 50%;
    border: 1px solid var(--d-btn-border);
    background: var(--d-btn); color: var(--d-fg);
    cursor: pointer; text-decoration: none; padding: 0;
    transform-origin: center bottom;
    will-change: transform;
    transition: transform .15s ease-out, background .2s, color .2s, border-color .2s;
  }
  .dock-btn:hover, .dock-btn:focus-visible { color: var(--d-fg-hover); }
  .dock-btn.active { background: var(--d-active-bg); color: var(--d-active-fg); border-color: var(--d-active-bg); }
  .dock-divider { width: 1px; height: 28px; background: var(--d-divider); margin: 0 2px; }

  .dock-tip {
    position: absolute; bottom: calc(100% + 10px); left: 50%;
    transform: translateX(-50%) translateY(4px);
    padding: 5px 9px; border-radius: 8px;
    background: var(--paper); color: var(--ink);
    font: 12px/1 var(--pixel); white-space: nowrap;
    opacity: 0; pointer-events: none;
    transition: opacity .15s, transform .15s;
  }
  .dock-btn:hover .dock-tip, .dock-btn:focus-visible .dock-tip {
    opacity: 1; transform: translateX(-50%) translateY(0);
  }

  @media (max-width: 420px) {
    .floating-dock { gap: 8px; padding: 8px 10px; }
    .dock-btn { width: 40px; height: 40px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .floating-dock, .dock-btn { transition: none; animation: none; }
    .ticker-track { animation: none; }
  }
`

// Brand icons (lucide-react removed them in newer versions)
function GitHubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const photographyAssets = import.meta.glob('./assets/photography/**/*.{jpg,jpeg,JPG,JPEG,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

// profile data
const profileImage = photographyAssets['./assets/photography/Aboutme/IMG_7289.JPG'];

const techStack = [
  { name: 'Java', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'JavaScript', icon: 'javascript', color: 'F7DF1E' },
  { name: 'Nuxt.js', icon: 'nuxt', color: '00DC82' },
  { name: 'Nest.js', icon: 'nestjs', color: 'E0234E' },
  { name: 'Vue.js', icon: 'vuedotjs', color: '4FC08D' },
  { name: 'React', icon: 'react', color: '61DAFB' },
  { name: 'Spring Boot', icon: 'springboot', color: '6DB33F' },
  { name: 'MySQL', icon: 'mysql', color: '4479A1' },
  { name: 'PostgreSQL', icon: 'postgresql', color: '4169E1' },
  { name: 'MongoDB', icon: 'mongodb', color: '47A248' },
  { name: 'Docker', icon: 'docker', color: '2496ED' },
  { name: 'Nginx', icon: 'nginx', color: '009639' },
];

const workExperience = [
  {
    role: 'Technician Spacalist',
    organization: 'FreeDom Solutions Co., Ltd.',
    period: 'Oct 2026 — present',
    description: 'as a Network Engineer and Technician Specialist. My core expertise includes configuring network switches, executing server migrations, and managing both servers and corporate workstations.',
  },
  {
    role: 'Software Engineer',
    organization: 'DevForward Co., Ltd.',
    period: 'Jun 2026 — Jul 2026',
    description: 'Develpoped "Wongnine", a Full-stack Web application using Nuxt.js and Nest.js to streamline lunchtime restaurant discovery for employees based on Office building. Designed responsive UX/UI with nuxt Ui and optimized backend data management using TypeORM and PostgreSQL.',
  },
  {
    role: 'Front-end Developer',
    organization: 'Somkidvittaya School',
    period: 'Jan 2026 - Apr 2026',
    description: 'Developed a responsive school website using Vue.js and Nuxt.js, enhancing user experience and accessibility. Implemented dynamic content management features, allowing staff to easily update school information and events.',
  }
];

const photoProjects = (folder, code) => Object.entries(photographyAssets)
  .filter(([path]) => path.includes(`/photography/${folder}/`))
  .map(([, image], index) => {
    const title = `${folder.toUpperCase()} ${String(index + 1).padStart(2, '0')}`;
    return {
      id: `${folder}-${index + 1}`,
      title,
      desc: `${folder.charAt(0).toUpperCase() + folder.slice(1)} photography from the personal archive.`,
      image,
      num: `FRAME_${folder.slice(0, 3).toUpperCase()}${String(index + 1).padStart(2, '0')}`,
      colorClass: 'project-photo',
      code,
    };
  });

const portfolioData = {
  research: [
    { 
      id: 'R1', 
      title: '3DFoodColorMatch', 
      desc: 'This research addresses the challenge of color discrepancy in 3Dfood printing by developing a specialized 3DFoodMatch color function embedded within a 3DFoodMatch Graphical User Interface (GUI), presented as an early laboratory demo.', 
      num: 'MISSION_R01', 
      colorClass: 'project-research', 
      icon: <FlaskConical size={35} strokeWidth={1.5} />, 
      code: 'Aug 2025 - May 2026',
      image: researchImage,
      url: 'https://dl.acm.org/doi/full/10.1145/3816713.3816758',
    }
  ],
  websites: [
    {
      id: 'W1',
      title: 'SOMKIDVITTAYA SCHOOL',
      desc: 'Bilingual kindergarten and primary school in Rayong, Thailand.',
      num: 'MISSION_W03',
      colorClass: 'project-web',
      icon: <Monitor size={35} strokeWidth={1.5} />,
      code: '<LIVE SITE />',
      url: 'https://somkidvittaya.ac.th/',
    }
  ],
  photography: {
    portrait: photoProjects('portrait', 'FRAME / PRT'),
    landscape: photoProjects('landscape', 'FRAME / LND'),
    graduation: photoProjects('graduation', 'FRAME / GRD'),
  },
  videos: [
    { id: 'V1', title: 'CITY MOTION', desc: 'A short visual story about movement and city life.', num: 'REEL_V01', colorClass: 'project-video', code: 'REEL / 001' },
    { id: 'V2', title: 'MAKER STORIES', desc: 'Short interviews with people making things by hand.', num: 'REEL_V02', colorClass: 'project-video', code: 'REEL / 002' },
    { id: 'V3', title: 'FINAL CUT', desc: 'Editing, color, and sound design for a creative campaign.', num: 'REEL_V03', colorClass: 'project-video', code: 'REEL / 003' },
  ]
};

const renderVisualOrnaments = (colorClass) => {
  if (colorClass === 'project-web') return <div className="mini-window"><i /><i /><i /></div>;
  if (colorClass === 'project-research') return <div className="chart"><b /><b /><b /><b /><b /></div>;
  if (colorClass === 'project-photo') return <><div className="photo-sun" /><div className="photo-landscape" /></>;
  return null;
};


// --- HOME PAGE ---
function Home({ navigate }) {
  const featuredProjects = [
    portfolioData.websites[0],
    portfolioData.research[0],
    portfolioData.photography.portrait[0],
  ];

  return (
    <main>
      <section className="home-profile" aria-labelledby="hero-title">
        <div className="home-copy">
          <p className="eyebrow"><span className="status-dot" /> PLAYER 01 / CREATIVE DEVELOPER</p>
          <h1 id="hero-title">SHISANUCHA<br /><span>CHENGSAMO</span><span className="cursor">_</span></h1>
          <p className="home-intro">I work across system analysis, full-stack development, and database design, connecting user needs to useful products. My toolkit includes JavaScript, Vue, Spring Boot, and Nest.js, shaped by Agile team environments.</p>
          <div className="home-education">
            <p className="eyebrow">EDUCATION / 01</p>
            <h2>INFORMATION TECHNOLOGY</h2>
            <p>King Mongkut's University of Technology Thonburi (KMUTT)</p>
          </div>
          <button className="pixel-button" onClick={() => navigate('work')}>
            EXPLORE MY WORK <ArrowDown size={17} aria-hidden="true" />
          </button>
        </div>
        <div className="home-portrait">
          <img src={profileImage} alt="Portrait of Shisanucha Chengsamo" />
          <span className="home-portrait-label">PLAYER_01 / PROFILE</span>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i}>PROFILE / EDUCATION / SELECTED WORK</span>
          ))}
        </div>
      </div>

      <section className="home-tech" aria-labelledby="tech-stack-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / TOOLS OF THE TRADE</p>
            <h2 id="tech-stack-title">MY TECH STACK<span className="accent">.</span></h2>
          </div>
          <p className="section-note">The tools I use<br />to bring ideas to life.</p>
        </div>
        <div className="tech-stack-grid">
          {techStack.map((tech) => (
            <div className="tech-card" key={tech.name}>
              <img src={tech.image || `https://cdn.simpleicons.org/${tech.icon}/${tech.color}`} alt="" aria-hidden="true" />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="home-experience" aria-labelledby="experience-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / CAREER LOG</p>
            <h2 id="experience-title">WORK EXPERIENCE<span className="accent">.</span></h2>
          </div>
          <p className="section-note">Roles, contributions,<br />and things I’ve learned.</p>
        </div>
        {workExperience.map((experience) => (
          <article className="experience-entry" key={`${experience.organization}-${experience.role}`}>
            <div className="experience-meta">
              <h3>{experience.role}</h3>
              <p>{experience.organization}</p>
              <p>{experience.period}</p>
            </div>
            <p className="experience-description">{experience.description}</p>
          </article>
        ))}
      </section>

      <section className="home-projects" aria-labelledby="home-projects-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / A FEW THINGS I'VE MADE</p>
            <h2 id="home-projects-title">SELECTED WORK<span className="accent">.</span></h2>
          </div>
          <p className="section-note">A selection from<br />the project archive.</p>
        </div>
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <article key={project.id} className={`project-card ${project.colorClass}`}>
              <div className="project-visual">
                {project.image
                  ? <img className="photo-image" src={project.image} alt="" />
                  : project.icon}
                <span className="visual-code">{project.code}</span>
                {!project.image && renderVisualOrnaments(project.colorClass)}
              </div>
              <div className="project-info">
                <span className="project-number">{project.num}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <button aria-label={`View ${project.title}`} onClick={() => navigate('work')}><ArrowUpRight size={21} /></button>
              </div>
            </article>
          ))}
        </div>
        <button className="pixel-button home-projects-link" onClick={() => navigate('work')}>
          VIEW ALL PROJECTS <ArrowUpRight size={17} aria-hidden="true" />
        </button>
      </section>
    </main>
  );
}

// --- WORK PAGE ---
function Work() {
  const [photoTab, setPhotoTab] = useState('portrait');
  const [mediaTab, setMediaTab] = useState('photo');

  return (
    <main className="page-section" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / SELECTED MISSIONS</p>
          <h2 id="work-title">THE WORK<span className="accent">.</span></h2>
        </div>
        <p className="section-note">Three disciplines.<br />One curious mind.</p>
      </div>

      {/* Research */}
      <div className="sub-section">
        <div className="category-header">
          <h3 className="category-title"><FlaskConical size={18} /> RESEARCH_LOGS</h3>
        </div>
        <div className={`project-grid ${portfolioData.research.length === 1 ? 'project-grid-single' : ''}`}>
          {portfolioData.research.map((project) => (
            <a key={project.id} className={`project-card project-card-link ${project.colorClass}`} href={project.url} target="_blank" rel="noreferrer" aria-label={`Read the publication for ${project.title}`}>
              <div className="project-visual">
                {project.image
                  ? <img className="project-card-image" src={project.image} alt={project.title} />
                  : project.icon}
                <span className="visual-code">{project.code}</span>
                {!project.image && renderVisualOrnaments(project.colorClass)}
              </div>
              <div className="project-info">
                <span className="project-number">{project.num}</span>
                <h3>{project.title.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}</h3>
                <p>{project.desc}</p>
                <span className="project-card-action" aria-hidden="true"><ArrowUpRight size={21} /></span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Website */}
      <div className="sub-section">
        <div className="category-header">
          <h3 className="category-title"><Monitor size={18} /> WEB_DEPLOYMENTS</h3>
        </div>
        <div className={`project-grid ${portfolioData.websites.length === 1 ? 'project-grid-single' : ''}`}>
          {portfolioData.websites.map((project) => {
            const cardContent = (
              <>
                <div className="project-visual">
                  {project.image
                    ? <img className="project-card-image" src={project.image} alt={project.title} />
                    : project.icon}
                  <span className="visual-code">{project.code}</span>
                  {!project.image && renderVisualOrnaments(project.colorClass)}
                </div>
                <div className="project-info">
                  <span className="project-number">{project.num}</span>
                  <h3>{project.title.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br /></React.Fragment>)}</h3>
                  <p>{project.desc}</p>
                  <span className="project-card-action" aria-hidden="true"><ArrowUpRight size={21} /></span>
                </div>
              </>
            );

            return project.url
              ? <a key={project.id} className={`project-card project-card-link ${project.colorClass}`} href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title} website`}>{cardContent}</a>
              : <article key={project.id} className={`project-card ${project.colorClass}`}>{cardContent}</article>;
          })}
        </div>
      </div>

      {/* Photography and video */}
      <div className="sub-section">
        <div className="category-header">
          <h3 className="category-title"><Camera size={18} /> MEDIA_ARCHIVE</h3>
          <div className="retro-tabs media-tabs">
            <button className={`retro-tab ${mediaTab === 'photo' ? 'active' : ''}`} onClick={() => setMediaTab('photo')}>
              <Camera size={14} /> PHOTO
            </button>
            <button className={`retro-tab ${mediaTab === 'video' ? 'active' : ''}`} onClick={() => setMediaTab('video')}>
              <Video size={14} /> VIDEO
            </button>
          </div>
        </div>

        {mediaTab === 'photo' ? (
          <>
            <div className="retro-tabs photo-tabs">
              <button className={`retro-tab ${photoTab === 'portrait' ? 'active' : ''}`} onClick={() => setPhotoTab('portrait')}>
                <User size={14} /> PORTRAIT
              </button>
              <button className={`retro-tab ${photoTab === 'landscape' ? 'active' : ''}`} onClick={() => setPhotoTab('landscape')}>
                <ImageIcon size={14} /> LANDSCAPE
              </button>
              <button className={`retro-tab ${photoTab === 'graduation' ? 'active' : ''}`} onClick={() => setPhotoTab('graduation')}>
                <GraduationCap size={14} /> GRADUATION
              </button>
            </div>
            <div className={`project-grid ${portfolioData.photography[photoTab].length === 1 ? 'project-grid-single' : ''}`}>
              {portfolioData.photography[photoTab].map((project) => (
                <article key={project.id} className={`project-card ${project.colorClass}`}>
                  <div className="project-visual">
                    {project.image ? <img className="photo-image" src={project.image} alt={project.title} /> : renderVisualOrnaments(project.colorClass)}
                    <span className="visual-code">{project.code}</span>
                  </div>
                  <div className="project-info"><span className="project-number">{project.num}</span><h3>{project.title.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br /></React.Fragment>)}</h3><p>{project.desc}</p><button aria-label={`View ${project.title}`}><ArrowUpRight size={21} /></button></div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className={`project-grid ${portfolioData.videos.length === 1 ? 'project-grid-single' : ''}`}>
            {portfolioData.videos.map((project) => (
              <article key={project.id} className={`project-card ${project.colorClass}`}>
                <div className="project-visual"><Video size={35} strokeWidth={1.5} /><span className="visual-code">{project.code}</span><div className="video-screen"><span>▶</span><i /><i /><i /></div></div>
                <div className="project-info"><span className="project-number">{project.num}</span><h3>{project.title.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br /></React.Fragment>)}</h3><p>{project.desc}</p><button aria-label={`View ${project.title}`}><ArrowUpRight size={21} /></button></div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// --- ABOUT PAGE ---
function About() {
  return (
    <main className="page-section" id="about" aria-labelledby="about-title">
      <p className="eyebrow">02 / PLAYER PROFILE</p>
      <div className="about-grid">
        <div>
          <h2 id="about-title">A LITTLE<br /><span>ABOUT ME</span></h2>
        </div>
        <div className="about-portrait">
          <img src={profileImage} alt="Portrait of the portfolio owner" />
          <span className="about-portrait-label">PLAYER_01 / PROFILE</span>
        </div>
        <div>
          <p className="about-lede">Hi, I'm Shisanucha Chengsamo. I turn complex problems into clear, memorable digital experiences.</p>
          <p className="about-copy">I work across system analysis, full-stack development, and database design, connecting user needs to useful products. My toolkit includes JavaScript, Vue, Springboot, and Nest.js, shaped by Agile team environments.</p>
          <div className="about-meta" aria-label="Skills and interests"><span>IT / KMUTT</span><span>FULL-STACK</span><span>PHOTO + VIDEO</span></div>
          <a className="text-link" href="mailto:shisanucha.chengsamo@gmail.com">START A CONVERSATION <ArrowUpRight size={17} /></a>
        </div>
      </div>
    </main>
  );
}


// --- FLOATING DOCK ---
const MAX_SCALE = 1.4;   // how big the closest icon gets
const RANGE = 110;       // px of influence around the cursor

function Dock({ currentPath, navigate, theme, toggleTheme }) {
  const itemRefs = useRef({});
  const [hidden, setHidden] = useState(false);

  // Hide when scrolling down, show when scrolling up
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 8) return;
      setHidden(y > lastY && y > 120);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Magnify icons based on cursor distance (direct style updates, no re-renders)
  const handleMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    Object.values(itemRefs.current).forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const distance = Math.abs(e.clientX - (rect.left + rect.width / 2));
      const t = Math.max(0, 1 - distance / RANGE);
      const eased = t * t * (3 - 2 * t);
      const scale = 1 + (MAX_SCALE - 1) * eased;
      el.style.transform = `translateY(${-(scale - 1) * 14}px) scale(${scale})`;
    });
  };

  const handleLeave = () => {
    Object.values(itemRefs.current).forEach((el) => { if (el) el.style.transform = ''; });
  };

  const reg = (key) => (el) => { itemRefs.current[key] = el; };

  return (
    <div
      className={`floating-dock ${hidden ? 'is-hidden' : ''}`}
      role="navigation"
      aria-label="Quick navigation"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <button ref={reg('home')} className={`dock-btn ${currentPath === 'home' ? 'active' : ''}`} onClick={() => navigate('home')} aria-label="Home">
        <House size={20} /><span className="dock-tip">Home</span>
      </button>
      <button ref={reg('work')} className={`dock-btn ${currentPath === 'work' ? 'active' : ''}`} onClick={() => navigate('work')} aria-label="Work">
        <Book size={20} /><span className="dock-tip">Work</span>
      </button>
      <button ref={reg('about')} className={`dock-btn ${currentPath === 'about' ? 'active' : ''}`} onClick={() => navigate('about')} aria-label="About">
        <User size={20} /><span className="dock-tip">About</span>
      </button>

      <div className="dock-divider" aria-hidden="true" />

      <a ref={reg('github')} className="dock-btn" href="https://github.com/isakokATP" target="_blank" rel="noreferrer" aria-label="GitHub">
        <GitHubIcon size={20} /><span className="dock-tip">GitHub</span>
      </a>
      <a ref={reg('linkedin')} className="dock-btn" href="https://www.linkedin.com/in/shisanucha-chengsamo-a2868226b/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <LinkedInIcon size={20} /><span className="dock-tip">LinkedIn</span>
      </a>

      <div className="dock-divider" aria-hidden="true" />

      <button ref={reg('theme')} className="dock-btn" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        <span className="dock-tip">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
      </button>
    </div>
  );
}


function App() {
  // State-based router (จำลองการแบ่งหน้า)
  const [currentPath, setCurrentPath] = useState('home');

  // Theme (saved in localStorage)
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'dark'; } catch { return 'dark'; }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  // ดักจับการเปลี่ยนแปลง URL (เช่น เวลากด Back ในเบราว์เซอร์)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPath(hash);
    };
    
    // เซ็ตค่าเริ่มต้นเมื่อโหลดหน้าแรก
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ฟังก์ชันเปลี่ยนหน้า
  const navigate = (path) => {
    window.location.hash = path;
    window.scrollTo(0, 0); // เลื่อนกลับไปบนสุดเมื่อเปลี่ยนหน้า
  };

  // เรนเดอร์หน้าจอตามพาร์ทที่เลือก
  const renderPage = () => {
    switch (currentPath) {
      case 'work':
        return <Work />;
      case 'about':
        return <About />;
      case 'home':
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div className="site-shell">
        
        {/* Top bar: brand + contact (navigation is in the dock) */}
        <header className="topbar">
          <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); navigate('home'); }} aria-label="Shisanucha portfolio home">
            <span className="brand-mark" aria-hidden="true">SP</span>
            <span>SHISANUCHA_PORTFOLIO</span>
          </a>
          <a className="contact-link" href="mailto:shisanucha.chengsamo@gmail.com">
            <Mail size={15} aria-hidden="true" /> CONTACT
          </a>
        </header>

        {/* Dynamic Page Content */}
        {renderPage()}

        {/* Footer */}
        <footer id="contact">
          <span>© 2026 / Shisanucha chengsamo / @aimese_isakok</span>
          <span>BUILT WITH CURIOSITY + CAFFEINE</span>
        </footer>

      </div>

      {/* Keep the fixed dock outside the clipped page shell. */}
      <Dock currentPath={currentPath} navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
    </>
  )
}

export default App
