import { useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  Compass,
  FileCheck2,
  FileText,
  Layers3,
  Mail,
  Menu,
  MoveUpRight,
  Phone,
  Ruler,
  ShieldCheck,
  X,
} from 'lucide-react';
import { UsMap } from '@/components/us-map';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const permitEngineeringLogo = '/images/logo.svg';
const austinPortrait = '/images/team/austin-foos.jpeg';
const zacharyPortrait = '/images/team/zachary-alexander.jpeg';
const financialManagerPortrait = '/images/team/jordan-bryant.jpeg';
const engineerPortrait = '/images/team/richard-meyer.jpeg';

const services = [
  {
    number: '01',
    title: 'Civil engineering',
    text: 'Site-focused plans and supporting documentation shaped around project conditions and submission needs.',
    icon: Compass,
    detail: 'Civil plans · Site documentation · Project coordination',
  },
  {
    number: '02',
    title: 'Architectural documentation',
    text: 'Clear, coordinated drawing sets that help reviewers understand the intent and scope of your project.',
    icon: Building2,
    detail: 'Plans · Elevations · Permit drawing packages',
  },
  {
    number: '03',
    title: 'Structural design',
    text: 'Structural plans and calculation reports prepared to support review of the proposed work.',
    icon: Ruler,
    detail: 'Structural plans · Calculation reports · Design support',
  },
  {
    number: '04',
    title: 'MEP plans',
    text: 'Mechanical, electrical, and plumbing documentation coordinated to fit the wider package.',
    icon: Layers3,
    detail: 'Mechanical · Electrical · Plumbing',
  },
  {
    number: '05',
    title: 'Letters & supporting documents',
    text: 'Project-specific engineering letters and supplemental documents, prepared as applicable to scope.',
    icon: FileText,
    detail: 'Engineering letters · Supporting documentation',
  },
  {
    number: '06',
    title: 'Sealed documents',
    text: 'When required, document sealing is handled only by appropriately licensed professionals for the applicable jurisdiction, discipline, and scope, following review.',
    icon: BadgeCheck,
    detail: 'Jurisdiction-aware · Discipline-specific · Reviewed',
  },
];

const team = [
  { name: 'Austin Foos', role: 'Owner', image: austinPortrait, number: '01' },
  { name: 'Zachary Alexander', role: 'Project Manager', image: zacharyPortrait, number: '02' },
  { name: 'Jordan Bryant', role: 'Financial Manager', image: financialManagerPortrait, number: '03' },
  { name: 'Richard Meyer', role: 'Professional Engineer', image: engineerPortrait, number: '04' },
];

const consultationServiceOptions = [
  {
    group: 'Engineering services',
    options: [
      'Civil Engineering',
      'Structural Engineering',
      'Architectural Design',
      'Electrical Engineering',
      '3D Modeling & Drafting',
      'Permitting & Compliance',
      'Mechanical Engineering',
      'Plumbing Engineering',
      'Fire Protection Engineering',
      'Security Engineering',
      'Renewable Energy Engineering',
      'Energy Efficiency Engineering',
      'Environmental Engineering',
      'Transportation Engineering',
      'Water Resources Engineering',
    ],
  },
  {
    group: 'Reports & coordination',
    options: [
      'Calculation Report',
      'Engineering Letter',
      'Jurisdiction-Specific Sealed Documents',
      'Multi-Discipline Package / Not Sure Yet',
    ],
  },
];

const contactDetails = {
  email: 'consultations@permit-engineering-packages.example',
  phone: '+1 (800) 555-0142',
  phoneHref: '+18005550142',
};

function toLocalDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatPreferredDate(date?: Date) {
  if (!date) return 'Choose a date';
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

const steps = [
  {
    no: '01',
    title: 'Share the project',
    text: 'Tell us where the project is, what is being built or changed, and what the permit office has requested.',
  },
  {
    no: '02',
    title: 'Define the package',
    text: 'We clarify the disciplines, available background documents, and the scope needed for the submission.',
  },
  {
    no: '03',
    title: 'Coordinate the work',
    text: 'Documentation is developed and coordinated around the project requirements and review context.',
  },
  {
    no: '04',
    title: 'Prepare for review',
    text: 'You receive the agreed documents to support your next step with the permitting authority.',
  },
];

const faqs = [
  {
    question: 'Do you work with projects outside one local market?',
    answer:
      'Permit-Engineering Packages coordinates project documentation across the United States. Requirements vary by jurisdiction, so the applicable location and review process are part of defining each project scope.',
  },
  {
    question: 'Can documents be sealed?',
    answer:
      'Where a seal is required, it is applied only by an appropriately licensed professional for the applicable jurisdiction, discipline, and scope, and only following their review. Availability and requirements are confirmed for each project; no universal licensure or approval is implied.',
  },
  {
    question: 'What should I have ready before I reach out?',
    answer:
      'A project address or jurisdiction, a short description of the work, any permit comments or submittal checklist, and existing drawings or site information are useful starting points. You can use the project brief checklist below to organize what you have.',
  },
  {
    question: 'Does a document package guarantee permit approval?',
    answer:
      'No. Permit decisions are made by the authority having jurisdiction. A coordinated package supports review, but requirements, review comments, and outcomes are determined by the relevant authority.',
  },
];

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand-lockup ${light ? 'brand-light' : ''}`}>
      <span className="brand-symbol" aria-hidden="true">
        <img className="brand-logo-image" src={permitEngineeringLogo} alt="" />
      </span>
      <span className="brand-name">
        <strong>PERMIT-ENGINEERING</strong>
        <small>PACKAGES LLC</small>
      </span>
    </span>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const [consultationFeedback, setConsultationFeedback] = useState('');
  const [calendarStartDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  });
  const [selectedConsultationDate, setSelectedConsultationDate] = useState<Date>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [preferredDateError, setPreferredDateError] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);
  const copyBrief = async () => {
    const text = [
      'PROJECT BRIEF',
      'Project location / jurisdiction:',
      'Type of work:',
      'Permit review stage / comments:',
      'Disciplines needed:',
      'Existing drawings or documents:',
      'Target submission date (if known):',
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const prepareConsultationEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!selectedConsultationDate) {
      setPreferredDateError(true);
      setCalendarOpen(true);
      return;
    }
    const values = new FormData(form);
    const entries = [
      ['Name', values.get('name')],
      ['Email', values.get('email')],
      ['Phone', values.get('phone')],
      ['Service', values.get('service')],
      ['Preferred date', values.get('date')],
      ['Project description', values.get('description')],
    ];
    const body = entries.map(([label, value]) => `${label}: ${String(value ?? '')}`).join('\n');
    const subject = encodeURIComponent('Consultation request — Permit-Engineering Packages');
    const encodedBody = encodeURIComponent(body);
    setConsultationFeedback('Your email app should open with a draft addressed to the email listed in Contact details. Review it before sending. This website does not store or deliver your information; your preferred date is not a booking and availability must be confirmed.');
    window.setTimeout(() => {
      window.location.href = `mailto:${contactDetails.email}?subject=${subject}&body=${encodedBody}`;
    }, 180);
  };

  return (
    <div className="site-shell">
      <div className="announcement">
        <div className="section-wrap announcement-inner">
          <span className="announcement-dot" />
          <span className="announcement-copy">Permit documentation, coordinated around the project.</span>
          <div className="announcement-contact" aria-label="Contact details">
            <a
              href={`mailto:${contactDetails.email}`}
              className="announcement-contact-link announcement-email focus-ring"
              aria-label={`Email ${contactDetails.email}`}
              title={contactDetails.email}
              data-testid="link-announcement-email"
            >
              <Mail size={12} aria-hidden="true" />
              <span>{contactDetails.email}</span>
            </a>
            <a
              href={`tel:${contactDetails.phoneHref}`}
              className="announcement-contact-link announcement-phone focus-ring"
              aria-label={`Call ${contactDetails.phone}`}
              title={contactDetails.phone}
              data-testid="link-announcement-phone"
            >
              <Phone size={12} aria-hidden="true" />
              <span>{contactDetails.phone}</span>
            </a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="section-wrap header-inner">
          <a href="#top" className="brand-anchor focus-ring" aria-label="Permit-Engineering Packages home">
            <BrandMark light />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a className="nav-link" href="#services">Capabilities</a>
            <a className="nav-link" href="#approach">Our approach</a>
            <a className="nav-link" href="#jurisdictions">Jurisdictions</a>
            <a className="nav-link" href="#team">Our team</a>
            <a className="nav-link" href="#questions">Questions</a>
          </nav>
          <a className="header-cta focus-ring" href="#consultation" data-testid="link-schedule-consultation">
            Schedule consultation <ArrowUpRight size={15} />
          </a>
          <button
            className="mobile-menu-button focus-ring"
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((value) => !value)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#services" onClick={closeMenu}>Capabilities <ArrowRight size={15} /></a>
            <a href="#approach" onClick={closeMenu}>Our approach <ArrowRight size={15} /></a>
            <a href="#jurisdictions" onClick={closeMenu}>Jurisdictions <ArrowRight size={15} /></a>
            <a href="#team" onClick={closeMenu}>Our team <ArrowRight size={15} /></a>
            <a href="#questions" onClick={closeMenu}>Questions <ArrowRight size={15} /></a>
            <a href="#consultation" onClick={closeMenu}>Schedule consultation <ArrowRight size={15} /></a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-image" role="img" aria-label="Modern architectural pavilion with precise drawing overlays" />
          <div className="hero-grain" />
          <div className="section-wrap hero-content">
            <div className="hero-copy">
              <div className="hero-kicker reveal"><span /> ENGINEERING DOCUMENTATION · NATIONWIDE COORDINATION</div>
              <h1 className="display reveal reveal-delay-1">
                The right plans.<br />
                <em>The next step.</em>
              </h1>
              <p className="hero-intro reveal reveal-delay-2">
                Engineering and architectural documentation for projects moving toward permit review. Thoughtfully scoped, clearly coordinated, ready for what comes next.
              </p>
              <div className="hero-actions reveal reveal-delay-3">
                <a href="#consultation" className="button button-primary focus-ring" data-testid="link-hero-consultation">
                  Schedule consultation <ArrowRight size={16} />
                </a>
                <a href="#services" className="button button-secondary focus-ring">
                  See how we can help <ArrowRight size={16} />
                </a>
                <a href="#approach" className="text-action focus-ring">
                  How it works <ArrowDown size={15} />
                </a>
              </div>
            </div>
            <div className="hero-index" aria-hidden="true">
              <span className="index-line" />
              <span>01 / 04</span>
            </div>
            <div className="hero-caption">
              <span className="caption-marker">FIG. 01</span>
              <span>Clarity at every scale.</span>
            </div>
          </div>
          <div className="hero-bottom-rule" />
        </section>

        <section className="trust-band" aria-label="Who we support">
          <div className="section-wrap trust-inner">
            <p className="eyebrow">A steady partner for</p>
            <div className="trust-items">
              <span>Property owners</span><i />
              <span>Contractors</span><i />
              <span>Architects</span><i />
              <span>Builders</span>
            </div>
            <span className="trust-note"><ShieldCheck size={16} /> Clear scope. Careful coordination.</span>
          </div>
        </section>

        <section className="intro-section section-wrap">
          <div className="intro-label">
            <span className="eyebrow">01 — THE WORK</span>
            <span className="intro-vertical">BUILT FOR THE REVIEW PROCESS</span>
          </div>
          <div className="intro-body">
            <h2 className="display">Good projects deserve<br />a <em>clear path</em> to review.</h2>
            <div className="intro-columns">
              <p>Permitting can ask a lot of a project: multiple disciplines, clear documentation, and answers that connect the dots. We bring those pieces into focus.</p>
              <p>From a focused engineering letter to a coordinated multi-discipline package, our work begins with understanding what the project and its jurisdiction actually require.</p>
            </div>
          </div>
          <div className="intro-stamp" aria-hidden="true">
            <span>PROJECT</span><strong>↗</strong><span>READY</span>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="section-wrap">
            <div className="section-heading">
              <div>
                <span className="eyebrow section-eyebrow">02 — CAPABILITIES</span>
                <h2 className="display">The pieces that<br /><em>move it forward.</em></h2>
              </div>
              <p className="section-heading-note">A coordinated scope can bring the right expertise together without losing sight of the details.</p>
            </div>
            <div className="service-grid">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article className="service-card" key={service.number} data-testid={`card-service-${service.number}`}>
                    <div className="service-topline"><span>{service.number} / 06</span><Icon size={20} strokeWidth={1.5} /></div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <div className="service-detail">{service.detail}</div>
                    <span className="service-corner" aria-hidden="true"><MoveUpRight size={16} /></span>
                  </article>
                );
              })}
            </div>
            <p className="services-footnote"><span className="footnote-cross">+</span> Exact deliverables depend on project scope and applicable jurisdiction requirements.</p>
          </div>
        </section>

        <section className="process-section" id="approach">
          <div className="process-grid-paper" />
          <div className="section-wrap process-inner">
            <div className="process-heading">
              <span className="eyebrow">03 — OUR APPROACH</span>
              <h2 className="display">From first details<br />to <em>submission-ready.</em></h2>
              <p>Thoughtful coordination starts before the first line is drawn.</p>
              <a href="#project-brief" className="button button-outline focus-ring">Prepare your project brief <ArrowRight size={15} /></a>
            </div>
            <div className="steps-list">
              {steps.map((step) => (
                <article className="step-row" key={step.no}>
                  <span className="step-no">{step.no}</span>
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                  <ArrowUpRight className="step-arrow" size={18} strokeWidth={1.5} aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
          <div className="process-side-mark" aria-hidden="true">PEP / 24</div>
        </section>

        <section className="jurisdiction-section" id="jurisdictions">
          <div className="section-wrap jurisdiction-inner">
            <div className="jurisdiction-copy">
              <span className="eyebrow">04 — WHERE WE WORK</span>
              <h2 className="display">One project.<br /><em>Many jurisdictions.</em></h2>
              <p>We support permit submissions across the United States through project-specific coordination. Local requirements are never assumed: location, authority, discipline, and scope all matter.</p>
              <div className="jurisdiction-callout">
                <span className="callout-icon"><FileCheck2 size={17} /></span>
                <p><strong>Seals are specific.</strong> Where required, documents are sealed only by appropriately licensed professionals for the applicable jurisdiction, discipline, and scope, following review.</p>
              </div>
            </div>
            <div className="jurisdiction-visual">
              <div className="map-topline"><span>COORDINATION / UNITED STATES</span><span>50 STATES</span></div>
              <UsMap />
              <div className="map-bottomline"><span><i /> PROJECT-BY-PROJECT REVIEW</span><span>ALASKA &amp; HAWAII INSET</span></div>
              <div className="map-stamp" aria-hidden="true"><span>LOCAL</span><strong>↔</strong><span>NATIONAL</span></div>
            </div>
          </div>
        </section>

        <section className="team-section" id="team" aria-labelledby="team-title">
          <div className="team-grid-paper" aria-hidden="true" />
          <div className="section-wrap team-inner">
            <div className="team-heading">
              <div>
                <span className="eyebrow">05 — THE PEOPLE</span>
                <h2 className="display" id="team-title">A considered team.<br /><em>Clear responsibility.</em></h2>
              </div>
              <p>Meet the people behind Permit-Engineering Packages. Each role is part of bringing project documentation into focus.</p>
            </div>
            <div className="team-roster">
              {team.map((person) => (
                <article className={`team-member team-member-${person.number}`} key={person.number} data-testid={`card-team-${person.number}`}>
                  <div className="team-photo">
                    <img src={person.image} alt={`Portrait of ${person.name}`} loading="lazy" />
                    <span className="team-photo-index" aria-hidden="true">PEP / {person.number}</span>
                  </div>
                  <div className="team-caption">
                    <span className="team-role">{person.role}</span>
                    <h3>{person.name}</h3>
                    <span className="team-caption-rule" aria-hidden="true" />
                  </div>
                </article>
              ))}
            </div>
            <div className="team-footline">
              <span>PEP / PEOPLE & RESPONSIBILITIES</span>
              <span>UNITED STATES · PROJECT-BY-PROJECT</span>
            </div>
          </div>
        </section>

        <section className="scope-section">
          <div className="section-wrap scope-inner">
            <div className="scope-mark"><ClipboardCheck size={27} strokeWidth={1.35} /></div>
            <div className="scope-main">
              <span className="eyebrow">A NOTE ON EXPECTATIONS</span>
              <h2 className="display">Designed to support review.<br /><em>Not promise an outcome.</em></h2>
              <p>Permit requirements and decisions belong to the authority having jurisdiction. Our role is to help define and coordinate the documentation needed for a project’s review path. Requirements, review comments, and approval outcomes can vary.</p>
            </div>
            <a className="scope-link focus-ring" href="#questions">Read common questions <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section className="faq-section section-wrap" id="questions">
          <div className="faq-intro">
            <span className="eyebrow">06 — GOOD TO KNOW</span>
            <h2 className="display">A few clear<br /><em>answers.</em></h2>
            <p>Every project is different. Here are a few things worth knowing upfront.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <article className={`faq-item ${isOpen ? 'faq-open' : ''}`} key={faq.question}>
                  <button
                    type="button"
                    className="faq-question focus-ring"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    data-testid={`button-faq-${index + 1}`}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown size={18} />
                  </button>
                  {isOpen && <p className="faq-answer">{faq.answer}</p>}
                </article>
              );
            })}
          </div>
        </section>

        <section className="consultation-section" id="consultation">
          <div className="section-wrap consultation-inner">
            <div className="consultation-intro">
              <span className="eyebrow">07 — A CONVERSATION</span>
              <h2 className="display">Let's start with<br /><em>the project.</em></h2>
              <p>Share a few details so the right scope can be discussed. Your preferred date is a request only—not a confirmed booking.</p>
              <div className="consultation-contact">
                <span className="eyebrow">CONTACT DETAILS</span>
                <p><strong>Email</strong><br />{contactDetails.email}</p>
                <p><strong>Phone</strong><br />{contactDetails.phone}</p>
              </div>
            </div>
            <form className="consultation-form" onSubmit={prepareConsultationEmail} data-testid="form-consultation">
              <div className="form-heading">
                <span className="eyebrow">CONSULTATION REQUEST</span>
                <span className="form-required">All fields required</span>
              </div>
              <div className="form-grid">
                <label className="form-field">
                  <span>Name</span>
                  <input name="name" type="text" autoComplete="name" required maxLength={120} data-testid="input-consultation-name" />
                </label>
                <label className="form-field">
                  <span>Email</span>
                  <input name="email" type="email" autoComplete="email" required maxLength={254} data-testid="input-consultation-email" />
                </label>
                <label className="form-field">
                  <span>Phone</span>
                  <input name="phone" type="tel" autoComplete="tel" required maxLength={40} data-testid="input-consultation-phone" />
                </label>
                <label className="form-field">
                  <span>Service</span>
                  <select name="service" defaultValue="" required data-testid="select-consultation-service">
                    <option value="" disabled>Select a service</option>
                    {consultationServiceOptions.map((group) => (
                      <optgroup key={group.group} label={group.group}>
                        {group.options.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </label>
                <div className="form-field form-field-date">
                  <span id="preferred-date-label">Preferred date</span>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <button
                        id="preferred-date-picker"
                        type="button"
                        className="date-picker-trigger"
                        aria-labelledby="preferred-date-label preferred-date-value"
                        aria-haspopup="dialog"
                        aria-expanded={calendarOpen}
                        aria-invalid={preferredDateError}
                        aria-describedby={preferredDateError ? 'preferred-date-error' : undefined}
                        onClick={() => setPreferredDateError(false)}
                        data-testid="button-consultation-date"
                      >
                        <CalendarDays size={17} aria-hidden="true" />
                        <span
                          id="preferred-date-value"
                          className={selectedConsultationDate ? '' : 'date-picker-placeholder'}
                        >
                          {formatPreferredDate(selectedConsultationDate)}
                        </span>
                        <ChevronDown className="date-picker-chevron" size={15} aria-hidden="true" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="date-picker-popover"
                      align="start"
                      sideOffset={8}
                      aria-label="Choose a preferred consultation date"
                    >
                      <div className="date-picker-heading">
                        <span className="eyebrow">SELECT A DATE</span>
                        <span>Request only</span>
                      </div>
                      <Calendar
                        mode="single"
                        selected={selectedConsultationDate}
                        onSelect={(date) => {
                          if (!date) return;
                          setSelectedConsultationDate(date);
                          setPreferredDateError(false);
                          setCalendarOpen(false);
                        }}
                        disabled={{ before: calendarStartDate }}
                        startMonth={calendarStartDate}
                        showOutsideDays={false}
                        className="date-calendar"
                        classNames={{
                          day: 'date-calendar-cell',
                          today: 'date-calendar-today',
                          selected: 'date-calendar-selected',
                        }}
                      />
                      <p className="date-picker-note">Past dates aren’t available. Your team will confirm availability.</p>
                    </PopoverContent>
                  </Popover>
                  <input
                    type="hidden"
                    name="date"
                    value={selectedConsultationDate ? toLocalDateValue(selectedConsultationDate) : ''}
                    data-testid="input-consultation-date"
                  />
                  {preferredDateError && (
                    <span className="date-picker-error" id="preferred-date-error" role="alert">
                      Choose a preferred date to continue.
                    </span>
                  )}
                </div>
                <label className="form-field form-field-wide">
                  <span>Project description</span>
                  <textarea name="description" required minLength={10} maxLength={2500} rows={4} placeholder="Project location or jurisdiction, work involved, and any permit review notes." data-testid="input-consultation-description" />
                </label>
              </div>
              <p className="form-disclosure">Submitting prepares an email draft addressed to the email listed in Contact details. Nothing is stored or sent by this website. Please review and send the draft yourself; availability for your preferred date must be confirmed.</p>
              <button className="button button-primary consultation-submit focus-ring" type="submit" data-testid="button-submit-consultation">
                Prepare email draft <ArrowRight size={16} />
              </button>
              {consultationFeedback && <p className="form-feedback" role="status" data-testid="status-consultation-feedback">{consultationFeedback}</p>}
            </form>
          </div>
        </section>

        <section className="brief-section" id="project-brief">
          <div className="brief-grid" />
          <div className="section-wrap brief-inner">
            <div className="brief-meta"><span className="eyebrow">08 — YOUR NEXT STEP</span><span className="brief-index">PEP / 001</span></div>
            <div className="brief-content">
              <div>
                <h2 className="display">Start with what<br /><em>you know.</em></h2>
                <p>A few project details are enough to begin defining the right documentation scope.</p>
              </div>
              <div className="brief-card">
                <div className="brief-card-head"><span>PROJECT BRIEF / CHECKLIST</span><span className="brief-card-dot" /></div>
                <ul>
                  <li><span>01</span> Project location or jurisdiction</li>
                  <li><span>02</span> Description of the work</li>
                  <li><span>03</span> Permit comments or submittal list</li>
                  <li><span>04</span> Existing drawings and site information</li>
                  <li><span>05</span> Disciplines you expect to need</li>
                </ul>
                <button type="button" className="copy-brief focus-ring" onClick={copyBrief} data-testid="button-copy-brief">
                  {copied ? <><Check size={15} /> Copied to clipboard</> : <>Copy a brief template <ArrowRight size={15} /></>}
                </button>
              </div>
            </div>
            <div className="brief-bottom">
              <span>Permit-Engineering Packages LLC</span>
              <span>Clear documentation. Considered coordination.</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-wrap footer-main">
          <a href="#top" className="footer-brand focus-ring" aria-label="Return to top"><BrandMark light /></a>
          <div className="footer-intro">
            <p>Engineering and architectural documentation<br />for projects moving toward permit review.</p>
            <div className="footer-contact" aria-label="Contact details">
              <a href={`mailto:${contactDetails.email}`} className="focus-ring">
                <Mail size={13} aria-hidden="true" />
                <span>{contactDetails.email}</span>
              </a>
              <a href={`tel:${contactDetails.phoneHref}`} className="focus-ring">
                <Phone size={13} aria-hidden="true" />
                <span>{contactDetails.phone}</span>
              </a>
            </div>
          </div>
          <div className="footer-links">
            <a href="#services">Capabilities <ArrowUpRight size={13} /></a>
            <a href="#approach">Approach <ArrowUpRight size={13} /></a>
            <a href="#consultation">Schedule consultation <ArrowUpRight size={13} /></a>
            <a href="#project-brief">Project brief <ArrowUpRight size={13} /></a>
          </div>
        </div>
        <div className="section-wrap footer-legal">
          <span>© {new Date().getFullYear()} Permit-Engineering Packages LLC</span>
          <span>Seals, where required, are jurisdiction-, discipline-, and scope-specific and follow professional review.</span>
          <a href="#top" aria-label="Back to top" className="back-top focus-ring">Back to top <ArrowDown size={13} /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
