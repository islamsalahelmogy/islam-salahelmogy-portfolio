import { type FormEvent, type MouseEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  Gauge,
  Github,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Moon,
  ServerCog,
  Send,
  Sparkles,
  Sun,
  Terminal,
  Twitter,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const services = [
  {
    number: '01',
    title: 'Custom web applications',
    description: 'Focused products built around the way your team actually works — not a template with your logo on it.',
    icon: Code2,
  },
  {
    number: '02',
    title: 'Design to code',
    description: 'Careful, responsive implementation from Figma or a rough idea, with the details that make it feel finished.',
    icon: Layers3,
  },
  {
    number: '03',
    title: 'API & backend architecture',
    description: 'Reliable PHP and Node.js services with clear contracts, practical data models, and room to grow.',
    icon: ServerCog,
  },
  {
    number: '04',
    title: 'Performance & SEO',
    description: 'A faster path to the useful thing: technical audits, Core Web Vitals, metadata, and search-ready structure.',
    icon: Gauge,
  },
];

const projects = [
  {
    id: 'aws-deploy-project',
    name: 'Atlas Deploy',
    category: 'Cloud deployment',
    language: 'TypeScript',
    description: "An AWS deployment workflow with a TypeScript codebase and a repeatable application delivery structure.",
    tech: ['TypeScript', 'AWS', 'Deployment'],
    art: 'art-aws',
  },
  {
    id: 'Store-front-nodejs-webService',
    name: 'Souq Commerce',
    category: 'Commerce API',
    language: 'JavaScript',
    description: "A Node.js storefront service that brings commerce workflows behind a dedicated REST API.",
    tech: ['Node.js', 'JavaScript', 'REST'],
    art: 'art-store',
  },
  {
    id: 'Image-processing-api-nodejs',
    name: 'PixelServe',
    category: 'Media infrastructure',
    language: 'TypeScript',
    description: "A TypeScript image-processing service that gives web applications a dedicated API for image operations.",
    tech: ['TypeScript', 'Node.js', 'API'],
    art: 'art-image',
  },
  {
    id: 'laravel-pusher-realtime-chat',
    name: 'Relay Chat',
    category: 'Real-time communication',
    language: 'Laravel',
    description: "A Laravel messaging application using Pusher events for real-time conversation updates.",
    tech: ['Laravel', 'Pusher', 'PHP'],
    art: 'art-chat',
  },
  {
    id: 'kuwaiti-elearning',
    name: 'Manara Learning',
    category: 'Learning platform',
    language: 'Blade',
    description: "An e-learning web interface built with Laravel Blade, organized around educational content.",
    tech: ['Blade', 'Laravel', 'UI'],
    art: 'art-learning',
  },
  {
    id: 'EB-World-website',
    name: 'EB World',
    category: 'Business website',
    language: 'Blade',
    description: "A Laravel Blade website with structured pages and a dedicated presentation layer.",
    tech: ['Blade', 'Laravel', 'Web'],
    art: 'art-world',
  },
  {
    id: 'HMS-hospital-management-system',
    name: 'Medora HMS',
    category: 'Healthcare system',
    language: 'JavaScript',
    description: "A hospital management system concept exploring how clinical operations can be organized in a web application.",
    tech: ['JavaScript', 'Management', 'Web app'],
    art: 'art-hospital',
  },
  {
    id: 'Department-Api',
    name: 'OrgCore API',
    category: 'Organization backend',
    language: 'PHP',
    description: "A PHP service that exposes department-oriented data through a focused backend API.",
    tech: ['PHP', 'API', 'Backend'],
    art: 'art-api',
  },
];

type FormValues = {
  name: string;
  email: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

function ExternalAnchor({
  href,
  children,
  className,
  testId,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  testId: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noreferrer"
      data-testid={testId}
    >
      {children}
    </a>
  );
}

function SectionHeading({
  kicker,
  title,
  detail,
  id,
}: {
  kicker: string;
  title: React.ReactNode;
  detail?: string;
  id?: string;
}) {
  return (
    <div className="section-topline">
      <div>
        <div className="section-kicker" id={id}>{kicker}</div>
        <h2 className="section-heading">{title}</h2>
        {detail ? <p className="section-intro">{detail}</p> : null}
      </div>
    </div>
  );
}

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('islam-portfolio-theme');
    setDarkMode(storedTheme === 'dark');
    const timer = window.setTimeout(() => setProjectsLoading(false), 420);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    window.localStorage.setItem('islam-portfolio-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const updateField = (field: keyof FormValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};
    if (!formValues.name.trim()) nextErrors.name = 'Please add your name.';
    if (!formValues.email.trim()) nextErrors.email = 'Please add an email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) nextErrors.email = 'That email needs a quick check.';
    if (!formValues.service) nextErrors.service = 'Choose the closest fit.';
    if (formValues.message.trim().length < 12) nextErrors.message = 'A little more context would help (12 characters minimum).';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrors({});
    setFormValues({ name: '', email: '', service: '', message: '' });
  };

  const scrollTo = (event: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    const target = event.currentTarget.getAttribute('href');
    if (target?.startsWith('#')) {
      event.preventDefault();
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-shell page-grid min-h-[100dvh]" id="top">
      <header className="site-header">
        <div className="header-inner">
          <a href="#top" className="brand" onClick={scrollTo} data-testid="link-brand">
            <span className="brand-mark">IS</span>
            <span className="brand-copy">
              Islam Salah Elmogy
              <small>web developer / cairo</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#services" className="nav-link" onClick={scrollTo} data-testid="link-nav-services">Services</a>
            <a href="#work" className="nav-link" onClick={scrollTo} data-testid="link-nav-work">Work</a>
            <a href="#about" className="nav-link" onClick={scrollTo} data-testid="link-nav-about">About</a>
            <a href="#concepts" className="nav-link" onClick={scrollTo}>Lab</a>
            <a href="#contact" className="nav-link" onClick={scrollTo} data-testid="link-nav-contact">Contact</a>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              type="button"
              onClick={() => setDarkMode((value) => !value)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              data-testid="button-theme-toggle"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="#contact" className="button button-primary" onClick={scrollTo} data-testid="button-header-contact">
              Start a project <ArrowUpRight size={15} />
            </a>
            <button
              className="menu-button"
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
          <a href="#services" className="mobile-nav-link" onClick={scrollTo} data-testid="link-mobile-services">Services</a>
          <a href="#work" className="mobile-nav-link" onClick={scrollTo} data-testid="link-mobile-work">Selected work</a>
          <a href="#about" className="mobile-nav-link" onClick={scrollTo} data-testid="link-mobile-about">About</a>
          <a href="#contact" className="mobile-nav-link" onClick={scrollTo} data-testid="link-mobile-contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="content-width hero-layout">
            <div className="reveal">
              <div className="eyebrow"><span className="live-dot" /> Independent developer / available for select work</div>
              <h1 className="display" id="hero-title">
                Building digital<br />
                products with <em>gravity.</em>
              </h1>
              <p className="hero-summary">
                I&apos;m Islam — a Cairo-based developer turning complex backend logic into web experiences that feel precise, fast, and ready to grow.
              </p>
              <div className="hero-ctas">
                <a href="#work" className="button button-primary" onClick={scrollTo} data-testid="button-view-work">
                  View my work <ArrowDownRight size={16} />
                </a>
                <a href="#contact" className="button button-ghost" onClick={scrollTo} data-testid="button-get-in-touch">
                  Get in touch <ArrowUpRight size={15} />
                </a>
              </div>
              <div className="hero-links">
                <ExternalAnchor href="https://github.com/islamsalahelmogy" testId="link-hero-github">
                  <Github size={14} /> GitHub / source code
                </ExternalAnchor>
                <ExternalAnchor href="https://twitter.com/Islam_Elmougy" testId="link-hero-twitter">
                  <Twitter size={14} /> X / Twitter
                </ExternalAnchor>
              </div>
              <div className="hero-proof" aria-label="Development focus">
                <span><strong>Backend</strong> systems</span>
                <span><strong>Frontend</strong> craft</span>
                <span><strong>Product</strong> thinking</span>
              </div>
            </div>
            <div className="hero-stage reveal delay-2">
              <div className="stage-orbit orbit-one" />
              <div className="stage-orbit orbit-two" />
              <div className="status-chip"><span className="live-dot" /> Building from Cairo</div>
              <div className="floating-note note-top"><Sparkles size={15} /><span>product-minded<br />engineering</span></div>
              <div className="floating-note note-bottom"><span className="note-number">04</span><span>tools in<br />the core stack</span></div>
            <div className="code-window" aria-label="Developer profile code preview" data-testid="card-code-preview">
              <div className="window-bar">
                <div className="window-dots"><i /><i /><i /></div>
                <span>islam.config.ts</span>
                <span>01 / 01</span>
              </div>
              <div className="code-content">
                <span className="code-line"><span className="code-num">01</span><span className="code-key">const</span> developer = {'{'}</span>
                <span className="code-line"><span className="code-num">02</span>&nbsp;&nbsp;name: <span className="code-string">&quot;Islam Salah Elmogy&quot;</span>,</span>
                <span className="code-line"><span className="code-num">03</span>&nbsp;&nbsp;role: <span className="code-string">&quot;BackEnd Developer&quot;</span>,</span>
                <span className="code-line"><span className="code-num">04</span>&nbsp;&nbsp;basedIn: <span className="code-string">&quot;Cairo, EG&quot;</span>,</span>
                <span className="code-line"><span className="code-num">05</span>&nbsp;&nbsp;company: <span className="code-string">&quot;Freelance&quot;</span>,</span>
                <span className="code-line"><span className="code-num">06</span>&nbsp;&nbsp;stack: [</span>
                <span className="code-line"><span className="code-num">07</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-value">&quot;PHP&quot;</span>, <span className="code-value">&quot;Laravel&quot;</span>,</span>
                <span className="code-line"><span className="code-num">08</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-value">&quot;Node.js&quot;</span>, <span className="code-value">&quot;TypeScript&quot;</span></span>
                <span className="code-line"><span className="code-num">09</span>&nbsp;&nbsp;],</span>
                <span className="code-line"><span className="code-num">10</span>&nbsp;&nbsp;principle: <span className="code-string">&quot;make it useful&quot;</span>,</span>
                <span className="code-line"><span className="code-num">11</span>{'}'}<span className="code-cursor" /></span>
              </div>
            </div>
            </div>
          </div>
        </section>

        <section className="signal-strip" aria-label="Technology highlights">
          <div className="signal-track"><span>Laravel</span><i /> <span>TypeScript</span><i /> <span>Node.js</span><i /> <span>REST APIs</span><i /> <span>MySQL</span><i /> <span>Cloud-ready</span></div>
        </section>

        <section className="section" id="services" aria-labelledby="services-heading">
          <div className="content-width">
            <SectionHeading kicker="What I do / 01" id="services-heading" title={<>Systems with a clear<br /><span>reason to exist.</span></>} detail="From the first technical decision to the last responsive detail, every layer has a job to do." />
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.number} data-testid={`card-service-${service.number}`}>
                  <div className="service-index">{service.number}</div>
                  <service.icon className="service-icon" size={22} strokeWidth={1.5} />
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark" id="work" aria-labelledby="work-heading">
          <div className="content-width">
            <SectionHeading kicker="Selected work / 02" id="work-heading" title={<>A small window into<br /><span>how I build.</span></>} detail="Web applications, backend services, and digital experiences — presented around the problems they address." />
            {projectsLoading ? (
              <div className="project-loading" aria-label="Loading projects" data-testid="status-project-loading">
                <div className="skeleton" /><div className="skeleton" /><div className="skeleton" />
              </div>
            ) : (
              <div className="project-list" data-testid="list-featured-projects">
                {projects.map((project, index) => (
                  <article className="project-card" key={project.id} data-testid={`card-project-${project.id}`}>
                    <div className={`project-art ${project.art}`} aria-hidden="true" />
                    <div className="project-body">
                      <div className="project-meta">
                        <span className="project-number">0{index + 1} / {project.language}</span>
                        <ExternalAnchor href={`https://github.com/islamsalahelmogy/${project.id}`} testId={`link-repo-${project.id}`}>
                          <Github size={17} />
                        </ExternalAnchor>
                      </div>
                      <div className="project-category">{project.category}</div>
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <div className="project-tags">
                        {project.tech.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                      </div>
                      <div className="project-actions">
                        <ExternalAnchor href={`https://github.com/islamsalahelmogy/${project.id}`} className="text-link" testId={`link-view-repo-${project.id}`}>
                          View repository <ExternalLink size={13} />
                        </ExternalAnchor>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
            <div className="hero-links" style={{ marginTop: '28px' }}>
              <ExternalAnchor href="https://github.com/islamsalahelmogy" testId="link-all-github">
                Explore GitHub <ArrowUpRight size={14} />
              </ExternalAnchor>
              <span className="mono" style={{ color: 'hsl(var(--sidebar-foreground) / .45)' }}>Selected applications & services</span>
            </div>
          </div>
        </section>

        <section className="section" id="concepts" aria-labelledby="concepts-heading">
          <div className="content-width">
            <SectionHeading kicker="Product lab / concepts" id="concepts-heading" title={<>Ideas for <span>what comes next.</span></>} detail="Proposed portfolio additions. These product concepts are not yet implemented or deployed." />
            <div className="concept-grid">
              {[
                { name: 'StockPilot', category: 'Inventory & purchasing', text: 'A proposed workspace for stock levels, supplier orders, and low-stock alerts.', scope: 'Stock ledger / Suppliers / Purchase orders' },
                { name: 'DeskFlow', category: 'Customer support', text: 'A proposed service desk for handling support requests, assigning owners, and tracking resolutions.', scope: 'Ticket inbox / Assignment / Status tracking' },
                { name: 'Bookora', category: 'Appointments & scheduling', text: 'A proposed booking portal for service businesses to manage availability and appointments.', scope: 'Availability / Booking / Customer portal' },
              ].map((concept) => (
                <article className="service-card concept-card" key={concept.name}>
                  <span className="concept-status">Planned concept</span>
                  <div className="project-category">{concept.category}</div>
                  <h3>{concept.name}</h3>
                  <p>{concept.text}</p>
                  <div className="concept-scope">{concept.scope}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about" aria-labelledby="about-heading">
          <div className="content-width">
            <div className="skills-layout">
              <div className="skills-copy">
                <div className="section-kicker" id="about-heading">The toolkit / 03</div>
                <h2 className="section-heading">Enough tools<br />to stay <span>curious.</span></h2>
                <p className="section-intro">I work comfortably across the stack, but I start with the problem — the best tool is the one that leaves the next person a clear path forward.</p>
              </div>
              <div className="skill-groups">
                <div className="skill-group">
                  <h3>Backend</h3>
                  <div className="skill-list">
                    {['PHP', 'Laravel', 'Node.js', 'REST APIs', 'MySQL'].map((skill) => <span className="skill-pill" key={skill} data-testid={`badge-skill-${skill.toLowerCase().replace('.', '-')}`}>{skill}</span>)}
                  </div>
                </div>
                <div className="skill-group">
                  <h3>Frontend</h3>
                  <div className="skill-list">
                    {['JavaScript', 'TypeScript', 'React', 'HTML / CSS', 'Blade'].map((skill) => <span className="skill-pill" key={skill} data-testid={`badge-skill-${skill.toLowerCase().replace(/[ /]/g, '-')}`}>{skill}</span>)}
                  </div>
                </div>
                <div className="skill-group">
                  <h3>Infrastructure</h3>
                  <div className="skill-list">
                    {['Git', 'AWS', 'Pusher', 'Linux'].map((skill) => <span className="skill-pill" key={skill} data-testid={`badge-skill-${skill.toLowerCase()}`}>{skill}</span>)}
                  </div>
                </div>
                <div className="skill-group">
                  <h3>Good habits</h3>
                  <div className="skill-list">
                    {['Clear contracts', 'Readable code', 'Fast feedback'].map((skill) => <span className="skill-pill" key={skill} data-testid={`badge-habit-${skill.toLowerCase().replace(/ /g, '-')}`}>{skill}</span>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="process-grid" aria-label="Working process">
              <div className="process-item"><strong>01 / Understand</strong><h3>Ask better questions.</h3><p>We define the actual job to be done, the constraints, and what a useful first version looks like.</p></div>
              <div className="process-item"><strong>02 / Build</strong><h3>Make the shape visible.</h3><p>Small milestones, honest trade-offs, and working software early enough to react to it.</p></div>
              <div className="process-item"><strong>03 / Refine</strong><h3>Remove the rough edges.</h3><p>Performance, accessibility, responsive behavior, and the quiet details that earn trust over time.</p></div>
            </div>
          </div>
        </section>

        <section className="section section-dark" id="contact" aria-labelledby="contact-heading">
          <div className="content-width contact-layout">
            <div className="contact-copy">
              <div className="section-kicker" id="contact-heading">Start a conversation / 04</div>
              <h2 className="section-heading">Have a problem<br />worth <span>solving?</span></h2>
              <p className="section-intro">Tell me what you&apos;re trying to make, fix, or untangle. I&apos;ll reply with a useful next step — not a sales sequence.</p>
              <div className="contact-details">
                <div className="contact-detail"><MapPin size={16} /> Cairo, Egypt / UTC+02:00</div>
                <div className="contact-detail"><Mail size={16} /> Open to freelance collaborations</div>
                <div className="contact-detail"><Terminal size={16} /> PHP by trade, product-minded by default</div>
              </div>
            </div>
            <div className="contact-form" data-testid="card-contact-form">
              {submitted ? (
                <div className="form-success" role="status" data-testid="status-form-success">
                  <div className="success-mark"><Check size={23} /></div>
                  <h3>Message received.</h3>
                  <p>Thanks, {formValues.name || 'there'}. This form is a frontend demo, but your note made it through this interaction perfectly.</p>
                  <button type="button" className="button button-ghost" onClick={resetForm} data-testid="button-send-another">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-grid">
                    <div className="field">
                      <label htmlFor="name">Name</label>
                      <input id="name" value={formValues.name} onChange={(event) => updateField('name', event.target.value)} aria-invalid={Boolean(errors.name)} data-testid="input-name" />
                      {errors.name ? <span className="field-error">{errors.name}</span> : null}
                    </div>
                    <div className="field">
                      <label htmlFor="email">Email</label>
                      <input id="email" type="email" value={formValues.email} onChange={(event) => updateField('email', event.target.value)} aria-invalid={Boolean(errors.email)} data-testid="input-email" />
                      {errors.email ? <span className="field-error">{errors.email}</span> : null}
                    </div>
                    <div className="field field-full">
                      <label htmlFor="service">Service needed</label>
                      <select id="service" value={formValues.service} onChange={(event) => updateField('service', event.target.value)} aria-invalid={Boolean(errors.service)} data-testid="select-service">
                        <option value="">Select a service</option>
                        {services.map((service) => <option value={service.title} key={service.title}>{service.title}</option>)}
                        <option value="Something else">Something else</option>
                      </select>
                      {errors.service ? <span className="field-error">{errors.service}</span> : null}
                    </div>
                    <div className="field field-full">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" value={formValues.message} onChange={(event) => updateField('message', event.target.value)} placeholder="A sentence or two about the project, the snag, or the deadline…" aria-invalid={Boolean(errors.message)} data-testid="textarea-message" />
                      {errors.message ? <span className="field-error">{errors.message}</span> : null}
                    </div>
                  </div>
                  <button className="button button-primary form-submit" type="submit" data-testid="button-submit-contact">
                    Send message <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content-width footer-inner">
          <div className="footer-copy">© {new Date().getFullYear()} Islam Salah Elmogy. Built with care.</div>
          <div className="footer-links">
            <ExternalAnchor href="https://github.com/islamsalahelmogy" testId="link-footer-github">GitHub</ExternalAnchor>
            <ExternalAnchor href="https://twitter.com/Islam_Elmougy" testId="link-footer-twitter">X / Twitter</ExternalAnchor>
          </div>
          <div className="footer-location"><MapPin size={12} /> Cairo, Egypt</div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
