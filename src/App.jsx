import React, { useState, useEffect } from 'react'
import { ArrowDown, ArrowUpRight, Camera, FlaskConical, GitFork, Mail, Monitor, User, Image as ImageIcon, GraduationCap, Video } from 'lucide-react'

const globalStyles = `
  :root { 
    --ink: #18161e; 
    --paper: #eeefda; 
    --muted: #aaa7b0; 
    --lime: #d7f15a; 
    --coral: #ff6b5b; 
    --peach: #ffba91; 
    --line: #3b3743; 
    --pixel: 'Courier New', monospace; 
    --display: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; 
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
    -webkit-font-smoothing: none; 
    
    background-color: var(--ink);
    background-image: linear-gradient(rgba(238, 239, 218, .035) 1px, transparent 1px), 
                      linear-gradient(90deg, rgba(238, 239, 218, .035) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  
  a { cursor: pointer; }
  a:focus-visible { outline: 2px solid var(--coral); outline-offset: 4px; }
  h1, h2, h3, p { margin: 0; }

  .site-shell { max-width: 1920px; margin: 0 auto; overflow: hidden; display: flex; flex-direction: column; min-height: 100vh; }
  
  .topbar { height: 76px; padding: 0 5vw; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--line); font: 11px/1 var(--pixel); letter-spacing: .12em; background: rgba(24, 22, 30, 0.9); backdrop-filter: blur(5px); position: sticky; top: 0; z-index: 50;}
  .brand, nav, nav a, .contact-link, footer a { color: var(--paper); text-decoration: none; }
  .brand { display: flex; align-items: center; gap: 12px; }
  .brand-mark { color: var(--ink); background: var(--lime); padding: 7px 6px 5px; font-size: 12px; }
  
  nav { display: flex; align-items: center; gap: 32px; }
  nav a { opacity: .65; transition: color .2s, opacity .2s; cursor: pointer; }
  nav a:hover, nav a.active { color: var(--lime); opacity: 1; }
  .contact-link { display: flex; gap: 7px; align-items: center; border: 1px solid var(--lime); padding: 11px 13px 9px; color: var(--lime) !important; opacity: 1 !important; }
  
  main { flex-grow: 1; }

  /* Hero Section */
  .hero-section { min-height: calc(100vh - 76px); padding: 50px 9vw 92px; display: grid; grid-template-columns: 1.1fr .9fr; align-items: center; gap: 50px; box-sizing: border-box; }
  .eyebrow, .project-number, .visual-code, .art-label { color: var(--lime); font: 10px/1.3 var(--pixel); letter-spacing: .12em; text-transform: uppercase; }
  .status-dot { display: inline-block; width: 7px; height: 7px; background: var(--coral); margin-right: 8px; box-shadow: 0 0 0 3px rgba(255, 107, 91, .15); }
  
  h1 { color: var(--paper); font: 76px/.9 var(--display); letter-spacing: .03em; margin: 25px 0 28px; }
  h1 span, h2 span { color: var(--lime); }
  .cursor { color: var(--coral); animation: blink 1s steps(2) infinite; }
  @keyframes blink { 50% { opacity: 0; } }
  
  .hero-intro { max-width: 360px; color: var(--muted); font-size: 16px; line-height: 1.65; margin-bottom: 32px; }
  .pixel-button { display: inline-flex; align-items: center; gap: 14px; background: var(--coral); color: var(--ink); padding: 16px 18px 14px; font: 11px/1 var(--pixel); text-decoration: none; box-shadow: 5px 5px 0 var(--lime); transition: transform .2s, box-shadow .2s; border: none; cursor: pointer; }
  .pixel-button:hover { transform: translate(3px, 3px); box-shadow: 2px 2px 0 var(--lime); }
  
  /* Hero Art */
  .hero-art { position: relative; justify-self: center; width: min(100%, 370px); aspect-ratio: 1; background: var(--coral); border: 8px solid var(--paper); box-shadow: 12px 12px 0 var(--lime); overflow: hidden; }
  .hero-art::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 35%, var(--peach) 0 18%, transparent 18.5%), linear-gradient(145deg, transparent 35%, rgba(24, 22, 30, .2) 35% 50%, transparent 50%); opacity: .8; }
  .portrait { position: absolute; inset: 17% 20% 0; background: var(--peach); box-shadow: inset 0 0 0 13px var(--ink); }
  .portrait-hair { position: absolute; width: 100%; height: 47%; top: 0; background: var(--ink); clip-path: polygon(0 0, 100% 0, 100% 75%, 88% 75%, 88% 55%, 75% 55%, 75% 85%, 58% 85%, 58% 55%, 42% 55%, 42% 70%, 25% 70%, 25% 50%, 10% 50%, 10% 70%, 0 70%); }
  .portrait-eye { position: absolute; top: 43%; width: 11%; height: 5%; background: var(--ink); }
  .eye-left { left: 24%; }.eye-right { right: 24%; }
  .portrait-mouth { position: absolute; top: 63%; left: 40%; width: 20%; height: 4%; background: var(--coral); }
  .portrait-shirt { position: absolute; left: -20%; right: -20%; bottom: -18%; height: 32%; background: var(--ink); clip-path: polygon(12% 0, 88% 0, 100% 100%, 0 100%); }
  .scanline { position: absolute; inset: 0; z-index: 2; background: repeating-linear-gradient(0deg, transparent 0 5px, rgba(24, 22, 30, .1) 5px 6px); pointer-events: none; }
  .art-label { position: absolute; z-index: 3; color: var(--ink); background: var(--lime); padding: 7px 8px 5px; }.label-top { top: 12px; left: 12px; }.label-bottom { bottom: 12px; right: 12px; }
  
  .ticker { height: 49px; display: flex; gap: 90px; align-items: center; overflow: hidden; white-space: nowrap; background: var(--lime); color: var(--ink); font: 12px/1 var(--pixel); letter-spacing: .1em; transform: rotate(-1deg) scale(1.02); margin-bottom: -20px; }
  .ticker span::before { content: '✦'; margin-right: 90px; }
  
  /* Sections */
  .page-section { padding: 80px 9vw; animation: fadeIn 0.4s ease-in-out; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  .section-heading { display: flex; justify-content: space-between; align-items: end; margin-bottom: 60px; }
  .section-heading h2 { color: var(--paper); font: 54px/.9 var(--display); letter-spacing: .03em; margin-top: 18px; }
  .accent { color: var(--coral); }
  .section-note { color: var(--muted); font: 12px/1.5 var(--pixel); text-align: right; }

  /* Works layout */
  .sub-section { margin-bottom: 70px; }
  .sub-section:last-child { margin-bottom: 0; }
  .category-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 25px; border-bottom: 1px dashed var(--line); padding-bottom: 15px; flex-wrap: wrap; gap: 15px; }
  .category-title { color: var(--paper); font: 16px/1 var(--pixel); display: flex; align-items: center; gap: 10px; letter-spacing: 0.05em; text-transform: uppercase; }
  .category-title svg { color: var(--lime); }
  
  .retro-tabs { display: flex; gap: 10px; flex-wrap: wrap; }
  .retro-tab { background: transparent; border: 1px solid var(--line); color: var(--muted); font: 11px/1 var(--pixel); padding: 10px 14px; cursor: pointer; transition: all 0.2s; text-transform: uppercase; letter-spacing: 0.1em; display: flex; align-items: center; gap: 8px;}
  .retro-tab.active { border-color: var(--lime); color: var(--lime); background: rgba(215, 241, 90, 0.05); }
  .retro-tab:hover:not(.active) { border-color: var(--muted); color: var(--paper); }

  /* Project Grid - Auto-fit for 2560x1440 Support */
  .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px; }
  .project-card { border: 1px solid var(--line); background: #211f2a; transition: transform .25s, border-color .25s; }
  .project-card:hover { transform: translateY(-7px); border-color: var(--lime); }
  
  /* Project Visuals */
  .project-visual { height: 190px; position: relative; padding: 24px; overflow: hidden; }
  .project-visual svg { color: var(--ink); position: relative; z-index: 2; }
  .project-web .project-visual { background: var(--lime); }
  .project-research .project-visual { background: var(--coral); }
  .project-photo .project-visual { background: var(--peach); }
  .project-video .project-visual { background: #8f8adf; }
  .visual-code { position: absolute; right: 18px; top: 25px; color: var(--ink); }
  
  /* Card Ornaments */
  .mini-window { position: absolute; inset: 69px 25px 25px; background: var(--ink); border: 5px solid var(--paper); box-shadow: 10px 10px 0 rgba(24, 22, 30, .22); }
  .mini-window i { display: inline-block; width: 8px; height: 8px; background: var(--coral); margin: 9px 0 0 8px; }
  .mini-window i:nth-child(2) { background: var(--lime); }
  .mini-window i:nth-child(3) { background: var(--peach); }
  
  .chart { position: absolute; right: 32px; bottom: 35px; display: flex; align-items: end; gap: 9px; height: 80px; }
  .chart b { width: 14px; background: var(--ink); }
  .chart b:nth-child(1) { height: 30%; }.chart b:nth-child(2) { height: 60%; }.chart b:nth-child(3) { height: 42%; }.chart b:nth-child(4) { height: 90%; }.chart b:nth-child(5) { height: 65%; }
  
  .photo-sun { position: absolute; width: 72px; height: 72px; right: 40px; top: 45px; background: var(--coral); }
  .photo-landscape { position: absolute; inset: 115px 0 0; background: var(--ink); clip-path: polygon(0 25%, 20% 2%, 35% 22%, 55% 5%, 75% 28%, 100% 5%, 100% 100%, 0 100%); }
  .photo-image { width: 100%; height: 100%; display: block; object-fit: cover; image-rendering: auto; }
  .video-screen { position: absolute; inset: 70px 25px 25px; display: flex; align-items: center; gap: 8px; padding: 14px; background: var(--ink); border: 5px solid var(--paper); box-shadow: 10px 10px 0 rgba(24, 22, 30, .22); }
  .video-screen span { color: var(--lime); font-size: 25px; margin-right: auto; }
  .video-screen i { width: 8px; height: 8px; background: var(--coral); }
  .video-screen i:nth-of-type(2) { background: var(--peach); }
  .video-screen i:nth-of-type(3) { background: var(--lime); }
  
  /* Project Info */
  .project-info { position: relative; min-height: 174px; padding: 22px; }
  .project-info h3 { color: var(--paper); font: 27px/.9 var(--display); letter-spacing: .04em; margin: 15px 0 13px; text-transform: uppercase; }
  .project-info p { max-width: 215px; color: var(--muted); font-size: 13px; line-height: 1.55; }
  .project-info button { position: absolute; right: 20px; bottom: 20px; color: var(--lime); background: none; border: none; cursor: pointer; padding: 5px;}
  .project-info button:hover { transform: scale(1.1); transition: transform 0.2s; }

  /* About Section */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 90px; align-items: end; margin-top: 50px; }
  .page-section h2 span { color: var(--coral); }
  .about-copy { max-width: 430px; color: var(--muted); font-size: 17px; line-height: 1.7; margin-bottom: 28px; }
  .text-link { display: inline-flex; align-items: center; gap: 8px; color: var(--lime); font: 11px/1 var(--pixel); text-decoration: none; border-bottom: 1px solid var(--lime); padding-bottom: 9px; }
  
  /* Footer */
  footer { display: flex; justify-content: space-between; align-items: center; gap: 18px; padding: 22px 9vw; border-top: 1px solid var(--line); color: var(--muted); font: 9px/1.5 var(--pixel); letter-spacing: .1em; margin-top: auto; } 
  footer a { color: var(--lime); }
  
  /* Responsive */
  @media (max-width: 760px) { 
    .topbar { height: 68px; padding: 0 20px; }
    .topbar nav a:not(.contact-link) { display: none; } 
    nav { gap: 12px; }
    .contact-link { padding: 10px 9px 8px; }
    .hero-section { min-height: auto; padding: 40px 24px 90px; grid-template-columns: 1fr; gap: 65px; }
    .hero-art { width: min(82vw, 330px); } 
    h1 { font-size: clamp(52px, 16vw, 76px); }
    .page-section { padding: 60px 24px; }
    .section-heading { align-items: start; gap: 25px; flex-direction: column; margin-bottom: 40px; }
    .section-heading h2 { font-size: 45px; }
    .section-note { text-align: left; }
    .project-grid { grid-template-columns: 1fr; gap: 25px; }
    .project-visual { height: 170px; }
    .about-grid { grid-template-columns: 1fr; gap: 35px; margin-top: 35px; }
    .about-copy { font-size: 15px; } 
    footer { padding: 22px 24px; flex-wrap: wrap; } 
    .category-header { flex-direction: column; align-items: flex-start; }
  }
`

const photographyAssets = import.meta.glob('./assets/photography/**/*.{jpg,jpeg,JPG,JPEG,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

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
      id: 'R1', title: 'MEDICAL AI', desc: 'Study of AI for medical imaging analysis.', 
      num: 'MISSION_R01', colorClass: 'project-research', icon: <FlaskConical size={35} strokeWidth={1.5} />, code: 'DATA / FIELD' 
    },
    { 
      id: 'R2', title: 'USER TRENDS', desc: 'Digital consumer behavior survey in 2024.', 
      num: 'MISSION_R02', colorClass: 'project-research', icon: <FlaskConical size={35} strokeWidth={1.5} />, code: 'DATA / FIELD' 
    },
    { 
      id: 'R3', title: 'SOFT SIGNALS', desc: 'Researching how small rituals shape digital belonging.', 
      num: 'MISSION_R03', colorClass: 'project-research', icon: <FlaskConical size={35} strokeWidth={1.5} />, code: 'DATA / FIELD' 
    }
  ],
  websites: [
    { 
      id: 'W1', title: 'GOOD NEIGHBORS', desc: 'A warm, fast website for a community-first studio.', 
      num: 'MISSION_W01', colorClass: 'project-web', icon: <Monitor size={35} strokeWidth={1.5} />, code: '<BUILD />' 
    },
    { 
      id: 'W2', title: 'LANDING PAGE', desc: 'Fast and responsive company website.', 
      num: 'MISSION_W02', colorClass: 'project-web', icon: <Monitor size={35} strokeWidth={1.5} />, code: '<BUILD />' 
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
  return (
    <main>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> PLAYER 01 / CREATIVE DEVELOPER</p>
          <h1 id="hero-title">MAKING<br /><span>IDEAS</span><br />PLAYABLE<span className="cursor">_</span></h1>
          <p className="hero-intro">I build expressive digital worlds at the intersection of code, curiosity, and culture.</p>
          <button className="pixel-button" onClick={() => navigate('work')}>
            ENTER THE ARCHIVE <ArrowDown size={17} aria-hidden="true" />
          </button>
        </div>
        <div className="hero-art" aria-label="Pixel art portrait illustration" role="img">
          <div className="scanline" />
          <div className="portrait">
            <div className="portrait-hair" />
            <div className="portrait-face" />
            <div className="portrait-eye eye-left" />
            <div className="portrait-eye eye-right" />
            <div className="portrait-mouth" />
            <div className="portrait-shirt" />
          </div>
          <span className="art-label label-top">REC // 001</span>
          <span className="art-label label-bottom">CREATIVE MODE: ON</span>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <span>SELECT YOUR PATH</span>
        <span>SELECT YOUR PATH</span>
        <span>SELECT YOUR PATH</span>
        <span>SELECT YOUR PATH</span>
        <span>SELECT YOUR PATH</span>
      </div>
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
        <div className="project-grid">
          {portfolioData.research.map((project) => (
            <article key={project.id} className={`project-card ${project.colorClass}`}>
              <div className="project-visual">
                {project.icon}
                <span className="visual-code">{project.code}</span>
                {renderVisualOrnaments(project.colorClass)}
              </div>
              <div className="project-info">
                <span className="project-number">{project.num}</span>
                <h3>{project.title.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}</h3>
                <p>{project.desc}</p>
                <button aria-label={`View ${project.title}`}><ArrowUpRight size={21} /></button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Website */}
      <div className="sub-section">
        <div className="category-header">
          <h3 className="category-title"><Monitor size={18} /> WEB_DEPLOYMENTS</h3>
        </div>
        <div className="project-grid">
          {portfolioData.websites.map((project) => (
            <article key={project.id} className={`project-card ${project.colorClass}`}>
              <div className="project-visual">
                {project.icon}
                <span className="visual-code">{project.code}</span>
                {renderVisualOrnaments(project.colorClass)}
              </div>
              <div className="project-info">
                <span className="project-number">{project.num}</span>
                <h3>{project.title.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}</h3>
                <p>{project.desc}</p>
                <button aria-label={`View ${project.title}`}><ArrowUpRight size={21} /></button>
              </div>
            </article>
          ))}
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
            <div className="project-grid">
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
          <div className="project-grid">
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
        <div>
          <p className="about-copy">I’m a multidisciplinary maker who likes turning complex questions into clear, memorable experiences. My toolkit moves between frontend development, qualitative research, and a camera with too many photos on it.</p>
          <a className="text-link" href="mailto:hello@yourname.dev">START A CONVERSATION <ArrowUpRight size={17} /></a>
        </div>
      </div>
    </main>
  );
}


function App() {
  // State-based router (จำลองการแบ่งหน้า)
  const [currentPath, setCurrentPath] = useState('home');

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
        
        {/* Navigation Bar */}
        <header className="topbar">
          <a className="brand" onClick={() => navigate('home')} aria-label="Pixel archive home">
            <span className="brand-mark" aria-hidden="true">PX</span>
            <span>PIXEL_ARCHIVE</span>
          </a>
          <nav aria-label="Main navigation">
            <a 
              className={currentPath === 'work' ? 'active' : ''} 
              onClick={() => navigate('work')}
            >
              WORK
            </a>
            <a 
              className={currentPath === 'about' ? 'active' : ''} 
              onClick={() => navigate('about')}
            >
              ABOUT
            </a>
            <a className="contact-link" href="mailto:hello@yourname.dev">
              <Mail size={15} aria-hidden="true" /> CONTACT
            </a>
          </nav>
        </header>

        {/* Dynamic Page Content */}
        {renderPage()}

        {/* Footer */}
        <footer id="contact">
          <span>© 2026 / Shisanucha chengsamo / @aimese_isakok</span>
          <span>BUILT WITH CURIOSITY + CAFFEINE</span>
          <a href="https://github.com/isakokATP" target="_blank" rel="noreferrer"><GitFork size={17} aria-label="GitHub" /></a>
        </footer>
        
      </div>
    </>
  )
}

export default App