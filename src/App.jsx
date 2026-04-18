import './App.css';
import Terminal from './Terminal';
import { projects, skills, experience } from './data';

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
      <h1>
        Hi, I'm <span>Marina Mendieta</span>.<br />
        I build software.
      </h1>
      <p>
        CS student passionate about systems, full-stack development, and
        turning ideas into real things. Currently looking for SWE internships.
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
            I'm a Computer Science student who loves building things from scratch —
            whether that's a Unix shell, a web app, or a machine learning pipeline.
          </p>
          <p>
            Outside of class I TA for Data Structures, compete in hackathons,
            and contribute to open-source projects. I care a lot about clean code,
            good UX, and making technology accessible.
          </p>
          <p>
            When I'm not coding I'm probably reading, running, or watching too
            many YouTube videos about programming language design.
          </p>
        </div>
        <div className="about-info">
          <h3>Quick info</h3>
          <div className="info-row">
            <span className="info-label">Degree</span>
            <span>B.S. Computer Science</span>
          </div>
          <div className="info-row">
            <span className="info-label">Expected</span>
            <span>May 2026</span>
          </div>
          <div className="info-row">
            <span className="info-label">GPA</span>
            <span>3.8 / 4.0</span>
          </div>
          <div className="info-row">
            <span className="info-label">Status</span>
            <span style={{ color: 'var(--pink-dark)', fontWeight: 600 }}>Open to work</span>
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
      <h2 className="section-title">Projects</h2>
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
          <div key={e.role} className="timeline-item">
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
            I'm actively looking for summer 2025 internships and always happy to
            chat about cool projects, research, or opportunities.
          </p>
          <p>
            The best way to reach me is email — I typically respond within a day.
          </p>
        </div>
        <div className="contact-links">
          <a className="contact-link" href="mailto:marina@example.com">
            <span className="icon">✉</span> marina@example.com
          </a>
          <a className="contact-link" href="https://github.com/marinam" target="_blank" rel="noreferrer">
            <span className="icon">⌥</span> github.com/marinam
          </a>
          <a className="contact-link" href="https://linkedin.com/in/marinamendieta" target="_blank" rel="noreferrer">
            <span className="icon">in</span> linkedin.com/in/marinamendieta
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <TerminalSection />
      <Contact />
      <footer>
        <p>Built with React + Vite · marina mendieta · 2025</p>
      </footer>
    </>
  );
}
