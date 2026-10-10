import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Globe2,
  Instagram,
  Linkedin,
  Menu,
  MessageCircle,
  Minus,
  PhoneCall,
  Plus,
  Stethoscope,
  X,
  Youtube,
} from 'lucide-react';

type Review = { name: string; text: string };

type Condition = { title: string; description: string; number: string };

const conditions: Condition[] = [
  { number: '01', title: 'Piles', description: 'Swollen veins in the anus that cause pain, bleeding and itching, treated with modern minimally invasive options.' },
  { number: '02', title: 'Fissure', description: 'A small tear in the anal lining that causes sharp pain and bleeding during bowel movements.' },
  { number: '03', title: 'Fistula', description: 'An abnormal tunnel near the anus that keeps causing pain and discharge until it is treated.' },
  { number: '04', title: 'Hernia', description: 'A bulge where tissue pushes through a weak spot in the abdominal wall, repaired with surgery.' },
  { number: '05', title: 'Gallbladder', description: 'Gallstones and infection cause upper abdominal pain and are removed with keyhole surgery.' },
  { number: '06', title: 'Thyroid & Breast', description: 'Lumps and swellings, such as cysts, fibroadenoma and cancer, are assessed and treated.' },
  { number: '07', title: 'Appendix', description: 'An inflamed appendix causes sudden belly pain and needs prompt removal, usually by keyhole surgery.' },
  { number: '08', title: 'Abdominal & GI', description: 'Stomach and bowel problems that need surgical care, from diagnosis through to operation.' },
];

const reviews: Review[] = [
  { name: 'Misbah Ullah', text: 'I came from Russia for cholecystectomy. I found a doctor on YouTube. Dr imtiaz is very competent and humble person. He is well experienced surgeon. His hospital is very good and staff is well behaved and services are top-notch. It was a wonderful experience and i highly recommend him for the surgery. Anybody who has gallbladder problems he can contact him.' },
  { name: 'R Touqeer', text: 'Dr. Imtiaz is an exceptional surgeon who maintains thorough telephonic contact after operations and provides detailed answers to all questions. This level of care greatly helps patients navigate complications and facilitates speedy recovery. I recently underwent a perianal abscess and fissure operation with him, and within 6 weeks, I have seen a 70% improvement.' },
  { name: 'Dr Farooq', text: 'Dr. Imtiaz is one of the most skilled and reliable surgeons in town. His surgical expertise is exceptional, and his attentive post-operative care is something every patient appreciates. Truly commendable and highly recommended.' },
  { name: 'Peter Athwal', text: 'Excellent surgeon. Very good surgical hand. We had a very satisfying experience and our patient got cured. Thank you Surgeon Dr Imtiaz Hussain Gold Medalist.' },
  { name: 'Amaz Sadiq', text: 'Dr. Imtiaz is very brilliant surgeon. He has 100% operative accuracy in all type of surgeries. Had a very good experience with him.' },
];

const faqs = [
  ['Is piles surgery painful?', 'Modern laser and minimally invasive techniques keep pain much lower than older open surgery, and pain relief is prescribed afterwards. Many patients return to light daily activities within a few days, depending on the stage of the piles.'],
  ['How long is recovery?', 'It depends on the procedure. Keyhole gallbladder and hernia surgery usually allow a faster return to routine than open surgery, while piles, fissure and fistula healing can take a few weeks. You get a clear timeline after your examination.'],
  ['Can I travel after treatment?', 'Short local travel is usually fine once you feel comfortable. For long journeys or flights, check with the doctor first, and he will advise a safe date based on your procedure.'],
  ['What does a consultation cost?', 'The fee depends on your condition and any tests needed. Message on WhatsApp or book an appointment, and the fee will be confirmed before your visit.'],
];

const steps = [
  ['Consultation', 'Meet the doctor, describe your symptoms and share any reports you already have.'],
  ['Diagnosis', 'An examination and any needed tests find the exact cause, and your options are explained in plain language.'],
  ['Procedure', 'Laser proctology or laparoscopic surgery, chosen for your condition with a faster recovery in mind.'],
  ['Recovery', 'Follow-up care, including phone contact after surgery, helps you heal comfortably and safely.'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal:not(.visible)').forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => setReviewIndex((index) => (index + 1) % reviews.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const visibleReviews = useMemo(() => reviews.map((_, offset) => reviews[(reviewIndex + offset) % reviews.length]), [reviewIndex]);
  const scrollToBooking = () => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  const whatsappUrl = 'https://wa.me/923001234567?text=Hello%20Dr.%20Imtiaz%2C%20I%20would%20like%20to%20book%20an%20appointment.';

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#home" aria-label="Dr. Imtiaz Hussain home">
          <span className="brand-mark">IH</span><span>Dr. Imtiaz Hussain</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {['Home', 'Services', 'About', 'Doctor Booking', 'Blog', 'Dr Shop', 'Contact'].map((item) => <a href={item === 'Home' ? '#home' : item === 'Doctor Booking' ? '#booking' : `#${item.toLowerCase().split(' ')[0]}`} key={item}>{item}</a>)}
        </nav>
        <button className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={22} /></button>
      </header>

      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
      <aside className={`mobile-panel ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-panel-head"><span className="eyebrow">Navigation</span><button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={22} /></button></div>
        <nav>{['Home', 'Services', 'About', 'Doctor Booking', 'Blog', 'Dr Shop', 'Contact'].map((item) => <a href={item === 'Home' ? '#home' : item === 'Doctor Booking' ? '#booking' : `#${item.toLowerCase().split(' ')[0]}`} onClick={() => setMenuOpen(false)} key={item}>{item}<ArrowUpRight size={17} /></a>)}</nav>
        <div className="panel-note"><Stethoscope size={20} /><p>Specialist surgical care, explained clearly and delivered with compassion.</p></div>
      </aside>

      <main>
        <section className="hero section-dark" id="home">
          <div className="hero-glow" />
          <div className="hero-grid" />
          <div className="container hero-content reveal visible">
            <p className="eyebrow cyan">GENERAL & LAPAROSCOPIC SURGEON · LAHORE</p>
            <h1>Pakistan's Best Surgeon in General Surgery <span>&amp; Laparoscopy</span></h1>
            <p className="hero-copy">Certified Piles, Fissure &amp; Fistula Specialist. Over a decade of experience, with qualifications from Pakistan, the USA, Germany and Australia.</p>
            <button className="button button-primary" onClick={scrollToBooking}>Book appointment <ArrowRight size={17} /></button>
            <div className="trust-row"><span><Check size={15} /> Gold Medalist</span><span><Check size={15} /> <strong>10+</strong> years</span><span><Globe2 size={15} /> Patients from UK, USA, Australia, Canada, Europe</span></div>
          </div>
          <div className="hero-scroll">Scroll to explore <span /></div>
        </section>

        <section className="section conditions" id="services">
          <div className="blue-blob" />
          <div className="container">
            <div className="section-heading reveal"><p className="eyebrow">SPECIALIST CARE</p><h2>What we treat</h2><p>Clear answers and modern surgical options for conditions that affect everyday life.</p></div>
            <div className="condition-grid">{conditions.map((condition) => <a className="condition-card reveal" href="#booking" key={condition.title}><span className="card-number">{condition.number}</span><h3>{condition.title}</h3><p>{condition.description}</p><span className="card-link">Explore condition <ArrowUpRight size={16} /></span></a>)}</div>
          </div>
        </section>

        <section className="section process section-tint" id="process">
          <div className="dot-pattern" />
          <div className="container">
            <div className="section-heading reveal"><p className="eyebrow">A CLEARER PATH FORWARD</p><h2>From first visit to recovery</h2><p>Every step is explained in plain language, so you know what to expect.</p></div>
            <div className="steps-grid">{steps.map(([title, description], index) => <div className="step reveal" key={title}><div className="step-marker">0{index + 1}</div><h3>{title}</h3><p>{description}</p></div>)}</div>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="container about-grid">
            <div className="portrait-wrap reveal"><div className="portrait-label">THE SURGEON</div><img src="/images/image.png" alt="Dr. Imtiaz Hussain, General and Laparoscopic Surgeon" loading="lazy" /></div>
            <div className="about-copy reveal"><p className="eyebrow">ABOUT DR. IMTIAZ HUSSAIN</p><h2>Expertise you can trust</h2><p className="lead">As a dedicated Specialist Surgeon with extensive experience in general and laparoscopic surgery, I am committed to providing exceptional surgical care tailored to each patient's unique needs.</p><div className="credential-list">{['MBBS', 'FCPS', 'FACS (USA)', 'Diploma in Laparoscopy (Germany)', 'CHPE (Medical Educationist)', 'ATLS Trauma Course (American College of Surgeons)'].map((credential) => <span key={credential}>{credential}</span>)}</div><a className="button button-outline" href="#contact">Read full profile <ArrowRight size={17} /></a></div>
          </div>
        </section>

        <section className="section reviews section-tint" id="reviews">
          <div className="container">
            <div className="review-top"><div className="section-heading reveal"><p className="eyebrow">PATIENT EXPERIENCES</p><h2>What patients say</h2></div><div className="review-controls"><button className="circle-button" onClick={() => setReviewIndex((reviewIndex - 1 + reviews.length) % reviews.length)} aria-label="Previous review"><ChevronLeft size={20} /></button><button className="circle-button" onClick={() => setReviewIndex((reviewIndex + 1) % reviews.length)} aria-label="Next review"><ChevronRight size={20} /></button></div></div>
            <div className="reviews-window" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={() => setPaused(true)}>{visibleReviews.slice(0, 3).map((review) => <article className="review-card" key={review.name}><div className="quote-mark">“</div><p>{review.text}</p><div className="review-author"><div className="avatar">{review.name.charAt(0)}</div><div><strong>{review.name}</strong><small>Google review · a year ago</small></div></div></article>)}</div>
            <div className="review-dots">{reviews.map((review, index) => <button className={index === reviewIndex ? 'active' : ''} key={review.name} onClick={() => setReviewIndex(index)} aria-label={`Show review ${index + 1}`} />)}</div>
          </div>
        </section>

        <section className="section abroad section-dark" id="abroad">
          <div className="container abroad-grid"><div className="abroad-copy reveal"><p className="eyebrow cyan">CARE BEYOND BORDERS</p><h2>Treating patients from the UK, USA, Australia, Canada and Europe</h2><p>Start with a remote consultation, share your reports securely, and receive a clear plan before you travel.</p><button className="button button-primary" onClick={scrollToBooking}>Book appointment <ArrowRight size={17} /></button></div><div className="globe-wrap reveal"><div className="globe"><div className="globe-line line-one" /><div className="globe-line line-two" /><span className="pin pin-uk">UK</span><span className="pin pin-usa">USA</span><span className="pin pin-canada">CA</span><span className="pin pin-aus">AU</span><span className="pin pin-eu">EU</span></div><span className="globe-caption">Patients welcome from around the world</span></div></div>
        </section>

        <section className="section faq-blog" id="blog">
          <div className="container faq-blog-grid"><div><div className="section-heading reveal"><p className="eyebrow">NEED TO KNOW</p><h2>Common questions</h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span>{openFaq === index ? <Minus size={19} /> : <Plus size={19} />}</button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></div><div className="blog-column"><div className="section-heading reveal"><p className="eyebrow">INSIGHTS &amp; GUIDANCE</p><h2>From the blog</h2></div><div className="blog-grid"><a className="blog-card" href="#blog"><div className="image-placeholder"><span>IMAGE PLACEHOLDER</span><ArrowUpRight size={18} /></div><h3>Understanding your options for piles treatment</h3><small>Patient guide · 5 min read</small></a><a className="blog-card" href="#blog"><div className="image-placeholder alt"><span>IMAGE PLACEHOLDER</span><ArrowUpRight size={18} /></div><h3>What to expect from laparoscopic surgery</h3><small>Patient guide · 4 min read</small></a></div><a className="button button-outline" href="#blog">View all posts <ArrowRight size={17} /></a></div></div>
        </section>

        <section className="section booking section-tint" id="booking">
          <div className="blue-blob small" /><div className="container booking-grid"><div className="booking-copy reveal"><p className="eyebrow">YOUR NEXT STEP</p><h2>Book an appointment</h2><p className="lead">Simple form plus WhatsApp. Tell us what you need help with and the team will guide you from there.</p><div className="booking-actions"><a className="button button-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Chat on WhatsApp</a><a className="button button-emergency" href="#booking"><PhoneCall size={17} /> Emergency cases</a></div><div className="availability"><Clock3 size={18} /><span><strong>Open 24 hours</strong><br />Saturday to Friday</span></div></div><form className="booking-form reveal" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><div className="form-row"><label>Name<input required name="name" placeholder="Your full name" /></label><label>Phone<input required name="phone" type="tel" placeholder="03XX XXXXXXX" /></label></div><label>Condition<select required name="condition" defaultValue=""><option value="" disabled>Select a condition</option>{conditions.map((condition) => <option key={condition.title}>{condition.title}</option>)}</select></label><label>Message <span>(optional)</span><textarea name="message" rows={4} placeholder="How can we help?" /></label>{submitted ? <div className="form-success"><Check size={18} /> Thank you. Your appointment request is ready for the team.</div> : <button className="button button-primary" type="submit">Request appointment <ArrowRight size={17} /></button>}</form></div>
        </section>
      </main>

      <footer className="site-footer" id="contact"><div className="container"><div className="footer-grid"><div className="footer-intro"><a className="brand footer-brand" href="#home"><span className="brand-mark">IH</span><span>Dr. Imtiaz Hussain</span></a><p>Specialist surgical care with clarity, skill and compassion.</p></div><div><h3>Services</h3><a href="#services">Piles</a><a href="#services">Fissure</a><a href="#services">Fistula</a><a href="#services">Hernia</a><a href="#services">Gallbladder</a></div><div><h3>Contact</h3><p>2 Sanda Road, College, near MAO, Rewaz Gardens, Lahore 54000</p></div><div><h3>Hours</h3>{['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => <div className="hours-row" key={day}><span>{day}</span><span>Open 24 hours</span></div>)}</div></div><div className="footer-bottom"><div className="footer-links"><a href="#home">Home</a><a href="#services">Services</a><a href="#about">About</a><a href="#blog">Blog</a><a href="#contact">Contact</a></div><div className="socials"><a href="#contact" aria-label="Instagram"><Instagram size={17} /></a><a href="#contact" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="#contact" aria-label="YouTube"><Youtube size={17} /></a></div><small>© 2024 Dr. Imtiaz Hussain. All rights reserved.</small></div></div></footer>
      <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={25} /></a>
    </div>
  );
}

export default App;
