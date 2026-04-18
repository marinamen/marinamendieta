import { useState, useRef, useEffect } from 'react';
import { projects, skills, experience } from './data';

const PROMPT = 'marina@portfolio:~$';

const HELP_TEXT = `Available commands:
  whoami       — about me
  ls projects  — list my projects
  cat resume   — view my resume summary
  skills       — print my skill set
  experience   — work & activities
  contact      — how to reach me
  clear        — clear the terminal
  help         — show this message`;

const WELCOME = [
  { text: 'Welcome to marina.sh  ✦', cls: 'pink' },
  { text: 'Type  help  to see available commands.', cls: 'muted' },
  { text: '', cls: '' },
];

function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();

  if (cmd === 'help') return [{ text: HELP_TEXT, cls: 'info' }];

  if (cmd === 'whoami') return [
    { text: 'Marina Mendieta Rodriguez Ramos', cls: 'output' },
    { text: 'CS student @ University of Toronto · AI researcher · builder', cls: '' },
    { text: 'Published AI researcher (AAAI 2026), ex-YC intern, IB 40/45.', cls: '' },
    { text: 'From Madrid → Japan → Toronto. Passionate about LLMs,', cls: '' },
    { text: 'AI safety, NLP, and tech for social good.', cls: '' },
  ];

  if (cmd === 'ls projects' || cmd === 'ls') return [
    { text: `Found ${projects.length} projects:\n`, cls: 'info' },
    ...projects.map((p, i) => ({ text: `  [${i + 1}] ${p.name}  —  ${p.tags.join(', ')}`, cls: 'output' })),
    { text: '\nRun  cat project <1-' + projects.length + '>  for details.', cls: 'muted' },
  ];

  const projMatch = cmd.match(/^cat project (\d+)$/);
  if (projMatch) {
    const idx = parseInt(projMatch[1]) - 1;
    const p = projects[idx];
    if (!p) return [{ text: `project ${projMatch[1]} not found. Try  ls projects`, cls: 'error' }];
    return [
      { text: `=== ${p.name} ===`, cls: 'pink' },
      { text: p.desc, cls: '' },
      { text: `\nStack: ${p.tags.join(' · ')}`, cls: 'info' },
      { text: `GitHub: ${p.github}`, cls: 'output' },
      ...(p.demo ? [{ text: `Demo:   ${p.demo}`, cls: 'output' }] : []),
    ];
  }

  if (cmd === 'cat resume') return [
    { text: '=== Marina Mendieta Rodriguez Ramos ===', cls: 'pink' },
    { text: 'marina.mendietarr@gmail.com  ·  Toronto, Canada', cls: 'muted' },
    { text: '', cls: '' },
    { text: 'Education:', cls: 'info' },
    { text: '  B.S. Computer Science  |  University of Toronto  |  2025–2028', cls: '' },
    { text: '  IB Diploma  |  UWC ISAK Japan  |  40/45', cls: '' },
    { text: '', cls: '' },
    { text: 'Experience:', cls: 'info' },
    ...experience.map(e => ({ text: `  • ${e.role} @ ${e.org}  (${e.date})`, cls: '' })),
    { text: '', cls: '' },
    { text: 'Awards:', cls: 'info' },
    { text: '  AAAI 2026 · TKS×Microsoft Scholar · UWC Davis Scholar', cls: '' },
    { text: '  Inspirit AI Winner · Technovation Girls Semifinalist', cls: '' },
    { text: '', cls: '' },
    { text: 'Run  experience  for details, or  skills  for tech stack.', cls: 'muted' },
  ];

  if (cmd === 'skills') return [
    { text: 'Skills:', cls: 'info' },
    { text: skills.join('  ·  '), cls: 'output' },
  ];

  if (cmd === 'experience') return [
    { text: 'Experience & Activities:', cls: 'info' },
    { text: '', cls: '' },
    ...experience.flatMap(e => [
      { text: `${e.role}  @  ${e.org}`, cls: 'pink' },
      { text: `${e.date}`, cls: 'muted' },
      { text: e.desc, cls: '' },
      { text: '', cls: '' },
    ]),
  ];

  if (cmd === 'contact') return [
    { text: 'Contact:', cls: 'info' },
    { text: '  Email:    marina.mendietarr@gmail.com', cls: 'output' },
    { text: '  GitHub:   github.com/marinamen', cls: 'output' },
    { text: '  LinkedIn: linkedin.com/in/marinamendieta', cls: 'output' },
    { text: '  Phone:    +1 942 288 1044', cls: 'output' },
  ];

  if (cmd === 'clear') return null;

  if (cmd === '') return [];

  return [{ text: `command not found: ${raw}. Type  help  for options.`, cls: 'error' }];
}

export default function Terminal() {
  const [lines, setLines] = useState(WELCOME);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  function submit(e) {
    e.preventDefault();
    const cmd = input.trim();
    const result = runCommand(cmd);

    if (result === null) {
      setLines(WELCOME);
    } else {
      setLines(prev => [
        ...prev,
        { text: `${PROMPT} ${input}`, cls: 'prompt' },
        ...result,
      ]);
    }

    if (cmd) setHistory(prev => [cmd, ...prev]);
    setInput('');
    setHistIdx(-1);
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
    }
  }

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-titlebar">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="terminal-title">marina.sh — bash</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {lines.map((l, i) => (
          <div key={i} className={`terminal-line ${l.cls || ''}`}>{l.text}</div>
        ))}
      </div>
      <form className="terminal-input-row" onSubmit={submit}>
        <span className="terminal-prompt-label">{PROMPT}</span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
          aria-label="terminal input"
        />
      </form>
    </div>
  );
}
