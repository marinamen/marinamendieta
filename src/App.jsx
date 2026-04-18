import './App.css';
import Terminal from './Terminal';
import BinaryBlossom from './BinaryBlossom';
import { projects, skills, experience, awards } from './data';

function Nav() {
  return (
    <nav>
      <span className="logo">marina.sh</span>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#terminal">Terminal</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <p className="hero-tag">{'> hello, world!'}</p>
      <p className="hero-tag">{'> hola, mundo!'}</p>
      <p className="hero-tag">{'> ハロー, ワールド!'}</p>


      <h1>
        Hi, I'm <span>Marina Mendieta</span>.<br />
        I'm a student, researcher, & AI enthusiast.
      </h1>
      <p>
        CS student at the University of Toronto. AI researcher, published author,
        and software engineer. Born and raised in Madrid, completed highschool in Japan and currently in Toronto.
      </p>
      <div className="hero-btns">
        <a className="btn btn-primary" href="#projects">See my work</a>
        <a className="btn btn-outline" href="#contact">Get in touch</a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="page-section" id="about">
      <h2 className="section-title">About</h2>
      <div className="about-grid">
        <div className="about-text">
          <p>
            I'm a Computer Science + Math student at the University of Toronto with a
            background spanning AI research, software engineering, neuroscience,
            and linguistics. I've lived and studied in Spain, Japan, and Canada —
            which shaped my deep interest in how language and culture intersect
            with technology.
          </p>
          <p>
            My research focuses on large language models and AI safety. I've
            Co-authored work submitted to AAAI 2026, published research on
            language-specific LLMs presented at three international conferences
            in Japan, and been invited to contribute at the Barcelona
            Supercomputing Center.
          </p>
          <p>
            Outside of research, I write global news for The Varsity,represent first-year
            students at Women in Computer Science, and big socialiser.
          </p>

          <div className="awards-list">
            <h3>Awards & Recognition</h3>
            {awards.map(a => (
              <div key={a} className="award-item">✦ {a}</div>
            ))}
          </div>
        </div>
        <div className="about-info">
          <h3>Quick info</h3>
          <div className="info-row">
            <span className="info-label">Degree</span>
            <span>H.B.Sc Computer Science & Math</span>
          </div>
          <div className="info-row">
            <span className="info-label">School</span>
            <span>University of Toronto</span>
          </div>
          <div className="info-row">
            <span className="info-label">Grad</span>
            <span>2028</span>
          </div>
          <div className="info-row">
            <span className="info-label">Based in</span>
            <span>Toronto, Canada</span>
          </div>
          <div className="info-row">
            <span className="info-label">Status</span>
            <span style={{ color: 'var(--pink-dark)', fontWeight: 600 }}>Open to opportunities</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="page-section" id="skills">
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        {skills.map(s => (
          <span key={s} className="skill-tag">{s}</span>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="page-section" id="projects">
      <h2 className="section-title">Projects & Research</h2>
      <div className="projects-grid">
        {projects.map(p => (
          <div key={p.name} className="project-card">
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <div className="project-tags">
              {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
            </div>
            <div className="project-links">
              <a href={p.github}>GitHub ↗</a>
              {p.demo && <a href={p.demo}>Live demo ↗</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="page-section" id="experience">
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {experience.map(e => (
          <div key={e.role + e.org} className="timeline-item">
            <div className="timeline-header">
              <h3>{e.role}</h3>
              <span className="date">{e.date}</span>
            </div>
            <div className="org">{e.org}</div>
            <p>{e.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TerminalSection() {
  return (
    <section className="terminal-section" id="terminal">
      <h2 className="section-title">Interactive Terminal</h2>
      <p className="terminal-hint">
        Try: whoami · ls projects · cat resume · skills · experience · contact · help
      </p>
      <Terminal />
    </section>
  );
}

function Contact() {
  return (
    <section className="page-section" id="contact">
      <h2 className="section-title">Contact</h2>
      <div className="contact-grid">
        <div className="contact-text">
          <p>
            I'm always open to research collaborations, internship opportunities,
            and conversations about AI, language, and tech for social good.
          </p>
          <p>
            Best way to reach me is by email — I typically respond within a day.
          </p>
        </div>
        <div className="contact-links">
          <a className="contact-link" href="mailto:m.mendieta@utoronto.mail">
            <span className="icon">✉</span> m.mendieta@utoronto.mail
          </a>
          <a className="contact-link" href="https://github.com/marinamen" target="_blank" rel="noreferrer">
            <span className="icon">⌥</span> github.com/marinamen
          </a>
          <a className="contact-link" href="https://linkedin.com/in/marina-mendietarr" target="_blank" rel="noreferrer">
            <span className="icon">in</span> linkedin.com/in/marina-mendieta
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <BinaryBlossom />
      <div style={{ position: 'relative', zIndex: 1 }}>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <TerminalSection />
      <Contact />
      <footer>
        <p>Built with React + Vite · Marina Mendieta · 2025</p>
      </footer>
      </div>
    </>
  );
}
