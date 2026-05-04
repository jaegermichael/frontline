import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Building2, 
  Route, 
  Zap, 
  Droplet, 
  ShieldCheck, 
  Hammer, 
  LayoutGrid, 
  Drill, 
  Fence, 
  PaintBucket, 
  Fuel, 
  Leaf,
  Award,
  Users,
  Globe,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Menu,
  X,
  Facebook,
  Twitter,
  Linkedin,
  ChevronRight,
  ExternalLink,
  History,
  Wrench,
  Sun,
  Moon,
  MessageSquare,
  Send,
  Loader2
} from 'lucide-react';

// --- Types ---

interface Service {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  category: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  client: string;
  image: string;
}

interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  location: string;
  details: string;
}

type ContactStatus = 'idle' | 'error' | 'ready';

// --- Data ---

const SERVICES: Service[] = [
  { id: '1', title: 'General Construction', description: 'Masonry, concrete, steel and composite structures for all building types. Delivering quality craftsmanship from substructure to roof completion.', icon: <Building2 className="w-6 h-6" />, category: 'Building' },
  { id: '2', title: 'Roads & Civil Works', description: 'Regravelling, resurfacing, drainage, hard stands, stone pitching, paving, earthworks, bridges and culverts.', icon: <Route className="w-6 h-6" />, category: 'Infrastructure' },
  { id: '3', title: 'Electrical & Solar', description: 'Full electrical design, installation and maintenance. Specialists in solar power, geysers and pump systems.', icon: <Zap className="w-6 h-6" />, category: 'Energy' },
  { id: '4', title: 'Plumbing & Water', description: 'Complete water, waste and gas systems. Water tank supply, installation and connection for residential and industrial properties.', icon: <Droplet className="w-6 h-6" />, category: 'Utilities' },
  { id: '5', title: 'Roofing & Waterproofing', description: 'Installation of tiles, metal sheets and solar tiles. Full waterproofing systems for flat and pitched roofs.', icon: <ShieldCheck className="w-6 h-6" />, category: 'Specialist' },
  { id: '6', title: 'Carpentry & Shop Fitting', description: 'Custom displays, shelving, cupboards, floors, ceilings, doors and furniture designed to brand specifications.', icon: <Hammer className="w-6 h-6" />, category: 'Finishes' },
  { id: '7', title: 'Fit-Out Works', description: 'High-specification commercial and airport lounge fit-outs delivered to global interior standards.', icon: <Drill className="w-6 h-6" />, category: 'Building' },
  { id: '8', title: 'Structural & Design', description: 'High-rise buildings and specialized engineering structures. Full planning, structural design and build services.', icon: <Building2 className="w-6 h-6" />, category: 'Building' },
  { id: '9', title: 'Fencing', description: 'Plain wire, barbed, razor, security and palisade fencing for government, schools, and industrial parks.', icon: <Fence className="w-6 h-6" />, category: 'Specialist' },
  { id: '10', title: 'Painting & Maintenance', description: 'Painting, decoration and 24/7 building maintenance - protecting structures against water, rust and mould.', icon: <PaintBucket className="w-6 h-6" />, category: 'Finishes' },
  { id: '11', title: 'Petroleum Site Works', description: 'Service station rebranding, demolition, reconstruction and depot refurbishments for energy majors.', icon: <Fuel className="w-6 h-6" />, category: 'Energy' },
  { id: '12', title: 'Green & Smart Buildings', description: 'Energy efficient infrastructure and intelligent buildings designed for sustainability and long-term value.', icon: <Leaf className="w-6 h-6" />, category: 'Consultancy' },
];

const PROJECTS: Project[] = [
  { id: 'p1', title: 'Total Energies Avonlea', category: 'Petroleum - Construction', description: 'Demolition & Reconstruction of a premium service hub reaching global standards.', client: 'Total Energies Zimbabwe', image: '/frontline-images/site-works.jpg' },
  { id: 'p2', title: 'Site Rebranding Programme', category: 'Petroleum - Rebranding', description: 'Large-scale rebranding of Total Energies Service Station sites across Zimbabwe.', client: 'Total Energies Zimbabwe', image: '/frontline-images/project-267.jpg' },
  { id: 'p3', title: 'ZESA Hard Stand Chegutu', category: 'Civil Works', description: 'Construction of a critical 2000m2 hard stand facility in Chegutu.', client: 'ZESA Enterprises', image: '/frontline-images/civil-works.jpg' },
  { id: 'p4', title: 'Probottlers Plant Extension', category: 'Industrial - Civil', description: 'Plant Extension & Drainage Works for a leading beverage manufacturer.', client: 'Probottlers Zimbabwe', image: '/frontline-images/infrastructure.jpg' },
  { id: 'p5', title: 'Zuva Chinhoyi Depot', category: 'Petroleum - Refurbishment', description: 'Comprehensive refurbishment of Zuva Petroleum\'s Chinhoyi Depot.', client: 'Zuva Petroleum', image: '/frontline-images/outdoor-works.jpg' },
  { id: 'p6', title: 'Shelter ZW Drainage', category: 'Civil - Social Housing', description: 'Advanced drainage works and stone pitching for residential infrastructure.', client: 'Shelter Zimbabwe', image: '/frontline-images/project-wa0213.jpg' },
  { id: 'p7', title: 'Airport Lounge Fit-Out', category: 'Fit-Out Works', description: 'High-specification interior works for RGM International Airport Lounges.', client: 'Aviation Sector', image: '/frontline-images/tiling-project.jpg' },
  { id: 'p8', title: 'MTC Perimeter Wall', category: 'Construction - Civil', description: 'Extensive perimeter wall and paving for Mashonaland Tobacco Company.', client: 'Mashonaland Tobacco Co.', image: '/frontline-images/houses.jpg' },
  { id: 'p9', title: 'Polyaok Drainage', category: 'Industrial - Civil', description: 'Structural drainage works for large-scale industrial facility.', client: 'Polyaok Zimbabwe', image: '/frontline-images/construction-equipment.jpg' },
  { id: 'p10', title: 'Gutu Zvavahera Road', category: 'Roads - Civil Works', description: 'Major regravelling and resurfacing project for national infrastructure.', client: 'Ministry of Transport', image: '/frontline-images/infrastructure.jpg' },
  { id: 'p11', title: 'RAHA Norton Depot', category: 'Roads - Paving', description: 'Specialized roads regravelling and paving for the Norton Depot.', client: 'RAHA', image: '/frontline-images/civil-works.jpg' },
  { id: 'p12', title: 'Westwood Girls\' Hostel', category: 'Social Infrastructure', description: 'Construction of a multi-storey hostel for the Red Cross Society.', client: 'Red Cross Zimbabwe', image: '/frontline-images/houses.jpg' },
];

const CLIENTS = [
  'Total Energies', 'Zuva Petroleum', 'ZESA Enterprises', 'ZESA Holdings', 'Probottlers Zimbabwe',
  'Polyaok Zimbabwe', 'Shelter Zimbabwe', 'NAS', 'Old Mutual', 'CABS', 'FBC Bank', 'OK Zimbabwe',
  'ZINARA', 'GMB', 'Red Cross Zimbabwe', 'Ruwa Local Board', 'ZRP', 'Mashonaland Tobacco Co.',
  'Ministry of Transport', 'RAHA', 'Zimbabwe Power Company', 'ZINWA', 'City Councils', 'FAO Zimbabwe'
];

const CSR_INITIATIVES = [
  'Paying school fees for disadvantaged students at Ruvheneko Secondary School, Damofalls',
  'Mentoring and sub-contracting opportunities for emerging businesses and marginalised firms',
  'Stringent waste management, site cleanliness, and dust suppression on all projects',
  'Local procurement preference - supporting Zimbabwean suppliers and artisans',
  'Partnering with Zimbabwe Red Cross Society on humanitarian and social infrastructure projects'
];

const CORE_VALUES = [
  { title: 'Integrity', desc: 'We do the right thing and do what we say - every time, without exception.' },
  { title: 'Excellence', desc: 'A can-do mindset focused on delivering global standards in local conditions.' },
  { title: 'Sustainability', desc: 'Green practices, community investment, and responsible material sourcing.' },
  { title: 'Empowerment', desc: 'Mentoring emerging contractors and supporting marginalised entrepreneurs.' },
  { title: 'Value', desc: 'Transparent pricing and high-quality results for a fair return.' },
  { title: 'Trust', desc: 'We listen to our clients and stand behind every structure we build.' },
  { title: 'Collaboration', desc: 'Integrating the best expertise to deliver complex engineering projects.' }
];

const TESTIMONIALS = [
  { quote: "Your team was extremely professional throughout the project. We value so much all your attention to detail. We will certainly contract with you again.", author: "Mr. Gagano", role: "Client" },
  { quote: "Frontline did a wonderful job at our local Board, completing work to a satisfactory standard and demonstrating real commitment to quality throughout.", author: "Ruwa Local Board", role: "Public Sector" },
  { quote: "Frontline demonstrated a character of good standing when they carried out construction of the Zimbabwe Red Cross Society Westwood Girls' Hostel.", author: "Zimbabwe Red Cross Society", role: "NGO" }
];

const WHY_CHOOSE_US = [
  { title: 'Integrity', desc: 'We do the right thing for our clients and employees. We do what we say - every time, without exception.', icon: <Users className="w-5 h-5" /> },
  { title: 'Strategic Partnership', desc: 'We integrate quickly and operate as a trusted partner. We identify problems early and are always up for a challenge.', icon: <Zap className="w-5 h-5" /> },
  { title: 'State-of-the-Art Equipment', desc: 'Modern vehicles, plant and machinery giving our clients maximum flexibility and driving project efficiency.', icon: <Wrench className="w-5 h-5" /> },
  { title: 'Safety-First Culture', desc: 'No task is so important we cannot find a safe way to do it. All staff hold current competency and safety certifications.', icon: <ShieldCheck className="w-5 h-5" /> },
  { title: 'Procurement Ready', desc: 'Full documentation available: Insurance certificates, method statements, risk assessments and H&S policies.', icon: <Award className="w-5 h-5" /> }
];

const getAssistantReply = (message: string) => {
  const text = message.toLowerCase();

  if (text.includes('contact') || text.includes('phone') || text.includes('email') || text.includes('address')) {
    return 'You can reach Frontline Contracting at info@frontlinecontracting.net or +263 242 797 241/3. Our Harare HQ is on the 9th Floor, BARD House, 69 Samora Machel Ave. We also operate from Johannesburg and Lusaka.';
  }

  if (text.includes('service') || text.includes('build') || text.includes('construction') || text.includes('road') || text.includes('solar') || text.includes('plumb')) {
    return `We handle ${SERVICES.slice(0, 6).map(service => service.title).join(', ')}, plus fit-out works, petroleum site works, fencing, structural design, maintenance, and green building systems. The contact form can route your enquiry by service.`;
  }

  if (text.includes('project') || text.includes('client') || text.includes('portfolio') || text.includes('work')) {
    return `Featured work includes ${PROJECTS.slice(0, 4).map(project => `${project.title} for ${project.client}`).join('; ')}. Our client list includes Total Energies, Zuva Petroleum, ZESA, Old Mutual, ZINARA, Red Cross Zimbabwe, and public-sector partners.`;
  }

  if (text.includes('safety') || text.includes('quality') || text.includes('risk') || text.includes('h&s')) {
    return 'Safety and quality are built into delivery: RAMS review before work starts, site-specific inductions, daily toolbox talks, PPE compliance, material verification, and staged milestone inspections.';
  }

  if (text.includes('where') || text.includes('country') || text.includes('operate') || text.includes('location')) {
    return 'Frontline Contracting operates across Zimbabwe, South Africa, and Zambia, with headquarters in Harare and regional presence in Johannesburg and Lusaka.';
  }

  return 'I can help with services, projects, safety standards, operating regions, and contact details. For pricing or timelines, send the project scope through the contact form and the team can follow up directly.';
};

const initialContactForm: ContactFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  location: '',
  details: '',
};

// --- Components ---

const SectionHeading = ({ badge, title, description, dark = false }: { badge: string; title: string; description?: string; dark?: boolean }) => (
  <div className="mb-12">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${dark ? 'bg-white/10 text-white' : 'bg-brand-purple/10 text-brand-purple'}`}
    >
      <Award className="w-3 h-3" />
      {badge}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-text-secondary text-lg max-w-2xl"
      >
        {description}
      </motion.p>
    )}
  </div>
);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello! I am your Frontline assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    window.setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: getAssistantReply(userMessage) }]);
      setIsLoading(false);
    }, 350);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bento-card w-[90vw] md:w-[400px] h-[500px] mb-4 flex flex-col shadow-2xl overflow-hidden bg-bg-secondary border-brand-purple/20"
          >
            <div className="p-4 bg-brand-purple text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm">Frontline Assistant</div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-bg-primary/30">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-brand-purple text-white rounded-tr-none' 
                      : 'bg-bg-secondary text-text-primary border border-border-primary rounded-tl-none shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-bg-secondary border border-border-primary p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin text-brand-gold" />
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Assistant is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border-primary bg-bg-secondary">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about our services..."
                  className="flex-grow bg-bg-primary border border-border-primary rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-brand-purple transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-brand-purple text-white p-2 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-purple text-white rounded-full flex items-center justify-center shadow-xl shadow-purple-950/20 relative z-10"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState<ContactFormState>(initialContactForm);
  const [contactStatus, setContactStatus] = useState<ContactStatus>('idle');
  const [contactError, setContactError] = useState('');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true;
  });
  const heroRef = useRef(null);
  const mailtoBody = [
    `Name: ${contactForm.firstName} ${contactForm.lastName}`,
    `Email: ${contactForm.email}`,
    `Phone: ${contactForm.phone || 'Not provided'}`,
    `Company: ${contactForm.company || 'Not provided'}`,
    `Service: ${contactForm.service || 'Not selected'}`,
    `Location: ${contactForm.location || 'Not provided'}`,
    '',
    'Project details:',
    contactForm.details,
  ].join('\n');
  const enquiryMailto = `mailto:info@frontlinecontracting.net?subject=${encodeURIComponent(`Project enquiry from ${contactForm.firstName} ${contactForm.lastName}`)}&body=${encodeURIComponent(mailtoBody)}`;

  const updateContactField = (field: keyof ContactFormState, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
    if (contactStatus !== 'idle') {
      setContactStatus('idle');
    }
  };

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!contactForm.firstName.trim() || !contactForm.lastName.trim() || !contactForm.email.trim() || !contactForm.details.trim()) {
      setContactError('Please complete your name, email address, and project details.');
      setContactStatus('error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      setContactError('Please enter a valid email address.');
      setContactStatus('error');
      return;
    }

    setContactError('');
    setContactStatus('ready');
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className={`min-h-screen bg-bg-primary text-text-primary relative font-sans transition-colors duration-300`}>
      <div className="fixed inset-0 bg-grid pointer-events-none" />
      
      {/* --- Navigation --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-bg-secondary/80 backdrop-blur-lg border-border-primary' : 'bg-transparent border-transparent'}`}>
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white p-1.5 shadow-sm border border-border-primary flex items-center justify-center">
              <img src="/frontline-images/frontline-logo.png" alt="Frontline Contracting logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tighter">
              Frontline <span className="font-light text-text-secondary">Contracting</span>
            </span>
          </div>
          <div className="hidden lg:flex gap-8 text-xs font-black uppercase tracking-widest text-text-secondary">
            {[
              { label: 'Services', href: '#services' },
              { label: 'Projects', href: '#projects' },
              { label: 'About', href: '#about' },
              { label: 'Contact', href: '#contact' },
            ].map((item) => (
              <a key={item.label} href={item.href} className="hover:text-brand-gold transition-colors">{item.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl bg-bg-secondary border border-border-primary hover:border-brand-purple transition-all active:scale-90"
            >
              {isDark ? <Sun className="w-5 h-5 text-brand-gold" /> : <Moon className="w-5 h-5 text-brand-gold" />}
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden sm:block bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-purple-950/20"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-20 pt-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
          
          {/* Main Hero Card */}
          <motion.div 
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ rotateX: -2, rotateY: 3, translateZ: 10 }}
            className="md:col-span-8 md:row-span-3 bento-card min-h-[500px] flex flex-col justify-end p-10 relative preserve-3d"
            style={{ perspective: 1000 }}
          >
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px]">
              <motion.img 
                src="/frontline-images/project-267.jpg" 
                alt="Construction Site" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                style={{ y: heroY }}
              />
              <div className="absolute inset-0 bg-slate-950/55" />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 award-badge px-4 py-1.5 rounded-full text-[10px] uppercase font-black tracking-widest text-white shadow-xl shadow-orange-950/20">
                ISCMZ Construction Sector Excellence 2022
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[0.95] tracking-tight text-white">
                Frontline Contracting <br/>
                <span className="accent-text text-3xl md:text-5xl block mt-2">Zimbabwe's Award-Winning Construction & Civil Engineering Company.</span>
              </h1>
              <p className="text-gray-200 max-w-xl text-sm leading-relaxed">
                From Harare to Johannesburg and Lusaka - we deliver general construction, civil works, roads, fit-out and specialist projects to global standards. Serving Total Energies, Zuva Petroleum, Old Mutual, ZESA, ZINARA and Zimbabwe's most trusted brands.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-brand-purple text-white px-8 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-brand-purple/20"
                >
                  Request a Quote
                </button>
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-black px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg"
                >
                  View Our Projects
                </button>
                <a 
                  href="https://www.frontlinecontracting.net/company-profile.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/20 bg-white/10 backdrop-blur-md px-8 py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors flex items-center justify-center text-white"
                >
                  Company Profile <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Experience Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ rotateX: -5, rotateY: 8, translateZ: 25 }}
            className="md:col-span-4 md:row-span-1 bento-card p-6 flex flex-col justify-between border-brand-purple/30 preserve-3d"
            style={{ perspective: 1000 }}
          >
            <div className="flex justify-between items-start">
              <div className="text-3xl"> - </div>
              <div className="text-right">
                <div className="text-[10px] text-brand-gold font-black uppercase tracking-widest mb-1">Est. 2014</div>
                <div className="text-xl font-bold">10 Years Strong</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-bg-primary rounded-full overflow-hidden">
                <div className="h-full bg-brand-purple w-[95%]" />
              </div>
              <div className="flex justify-between text-[10px] text-text-secondary font-black uppercase tracking-tighter">
                <span>Safety Culture</span>
                <span>100% Certified</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ rotateX: 5, rotateY: -8, translateZ: 25 }}
            className="md:col-span-4 md:row-span-1 bento-card p-8 bg-bg-secondary preserve-3d"
            style={{ perspective: 1000 }}
          >
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div className="text-left border-l-2 border-brand-gold/50 pl-4">
                <div className="text-3xl font-bold tracking-tighter">300+</div>
                <div className="text-[10px] text-text-secondary uppercase font-black tracking-widest">Projects</div>
              </div>
              <div className="text-left border-l-2 border-brand-gold/50 pl-4">
                <div className="text-3xl font-bold tracking-tighter">3</div>
                <div className="text-[10px] text-text-secondary uppercase font-black tracking-widest">Countries</div>
              </div>
            </div>
            <div className="border-t border-border-primary pt-6 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px] text-text-secondary font-bold uppercase tracking-widest">Active Sites: Harare, JHB, Lusaka</span>
            </div>
          </motion.div>

          {/* Expertise List Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ rotateX: -3, rotateY: 5, translateZ: 15 }}
            className="md:col-span-4 md:row-span-2 bento-card p-8 preserve-3d"
            style={{ perspective: 1000 }}
          >
            <h3 className="text-xl font-bold mb-8 flex items-center justify-between">
              Expertise <span className="text-xs font-mono font-normal text-text-secondary">01/12</span>
            </h3>
            <ul className="space-y-4">
              {SERVICES.slice(0, 4).map((s, idx) => (
                <li key={s.id} className="flex items-center gap-4 border-b border-border-primary pb-4 group cursor-pointer hover:bg-black/5 pr-4 rounded-r-lg transition-colors">
                  <span className="text-brand-purple font-mono text-xs font-bold leading-none translate-y-[2px]">0{idx + 1}</span>
                  <span className="font-semibold text-sm">{s.title}</span>
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </li>
              ))}
              <li className="pt-4 flex justify-center">
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-brand-gold transition-colors"
                >
                  View All {SERVICES.length} Services
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Latest Project Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ rotateX: 2, rotateY: -4, translateZ: 20 }}
            className="md:col-span-4 md:row-span-2 bento-card p-8 group hover:border-brand-purple/50 cursor-pointer preserve-3d"
            style={{ perspective: 1000 }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-black text-text-secondary tracking-widest uppercase">Latest Success</span>
              <span className="text-green-400 text-[10px] font-bold px-2 py-0.5 glass rounded uppercase">Complete</span>
            </div>
            <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 border border-border-primary relative">
              <img 
                src="/frontline-images/site-works.jpg" 
                alt="Total Energies" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-black/20" />
            </div>
            <h4 className="font-bold text-lg mb-1 group-hover:text-brand-purple transition-colors">Total Energies Avonlea</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Full demolition & reconstruction of a premium petroleum service hub reaching global standards.
            </p>
          </motion.div>

          {/* CTA Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ rotateX: -8, rotateY: -2, translateZ: 30, scale: 1.02 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="md:col-span-4 md:row-span-1 bento-card p-8 bg-brand-purple flex items-center justify-between text-white border-none group cursor-pointer preserve-3d shadow-xl shadow-purple-950/30"
            style={{ perspective: 1000 }}
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1 block">Ready to Build?</span>
              <span className="text-xl font-black tracking-tight leading-none">Start Your Project</span>
            </div>
            <div className="bg-white/20 p-4 rounded-full group-hover:bg-white group-hover:text-brand-purple transition-all duration-300">
              <ChevronRight className="w-6 h-6" strokeWidth={3} />
            </div>
          </motion.div>

          {/* Trusted Brands Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ rotateX: 5, rotateY: 5, translateZ: 15 }}
            className="md:col-span-4 md:row-span-1 bento-card p-8 flex items-center gap-6 preserve-3d"
            style={{ perspective: 1000 }}
          >
            <div className="flex -space-x-3 shrink-0">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-bg-secondary bg-bg-primary flex items-center justify-center text-[10px] font-bold text-text-secondary">
                  {['TE', 'ZP', 'OM'][i-1]}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-4 border-bg-secondary bg-brand-purple flex items-center justify-center text-[10px] font-bold text-white">
                +22
              </div>
            </div>
            <div className="text-[10px] font-black text-text-secondary uppercase tracking-widest leading-relaxed">
              Serving Zimbabwe's <br/> Most Trusted Brands
            </div>
          </motion.div>

        </div>

        {/* --- Featured Projects Grid --- */}
        <section id="projects" className="mt-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="flex-grow">
              <SectionHeading 
                badge="PORTFOLIO" 
                title="Featured Projects" 
                description="Delivering massive engineering feats and specialized infrastructure works across Southern Africa."
              />
            </div>
            <motion.a 
              href="#contact"
              whileHover={{ x: 10 }}
              className="group flex items-center gap-3 bg-brand-purple/10 hover:bg-brand-purple text-brand-purple hover:text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all mb-12"
            >
              Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ rotateX: -3, rotateY: 4, translateZ: 20, y: -4 }}
                className="bento-card group flex flex-col h-full hover:border-brand-purple/40 transition-all preserve-3d"
                style={{ perspective: 1000 }}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-4 left-4 glass px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest text-brand-gold border border-brand-gold/30">
                    {project.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1 h-1 rounded-full bg-brand-gold" />
                    <span className="text-[10px] font-black text-brand-gold uppercase tracking-widest">{project.client}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-brand-purple transition-colors">{project.title}</h4>
                  <p className="text-text-secondary text-xs mb-6 leading-relaxed line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-primary">
                    <span className="text-[9px] font-bold text-text-secondary uppercase tracking-[0.2em] leading-none">View Case Study</span>
                    <ArrowRight className="w-4 h-4 text-brand-gold opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 p-6 bento-card flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] max-w-xl">
              Also notable: GMB Pothole Patching - ZRP Consec Suspended Ceilings - Old Mutual Tiling - Ruwa Local Board - Ruvheneko School Classrooms - Doctor Kadumbu Residence - Mutual House Electrical - Kwekwe Ceiling Renovations - City Council Projects
            </div>
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-gold hover:gap-3 transition-all whitespace-nowrap"
            >
              All Projects <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* --- Why Choose Us Section --- */}
        <section className="mt-20">
          <SectionHeading 
            badge="WHY CHOOSE US" 
            title="At the Frontline of Every Build" 
            description="Award-winning expertise transforming the built environment since 2014, with local projects delivered to global standards."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {WHY_CHOOSE_US.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, rotateX: 2, rotateY: -2 }}
                className="bento-card p-6 flex flex-col items-center text-center preserve-3d"
                style={{ perspective: 1000 }}
              >
                <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center text-brand-gold mb-6">
                  {item.icon}
                </div>
                <h4 className="font-bold text-sm mb-3">{item.title}</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Services Section --- */}
        <section id="services" className="mt-20">
          <SectionHeading badge="CAPABILITIES" title="All Services" description="Detailed engineering solutions tailored for individual, corporate, institutional and government clients." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div 
                key={s.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative h-[280px] p-8 rounded-[32px] overflow-hidden bg-bg-secondary border border-border-primary hover:border-brand-purple/40 transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-14 h-14 bg-bg-primary text-brand-purple rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-purple group-hover:text-white transition-all duration-500 shadow-sm">
                    {s.icon}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-brand-purple/40 group-hover:text-brand-purple transition-colors">0{i + 1}</span>
                      <h5 className="font-extrabold text-lg text-text-primary tracking-tight">{s.title}</h5>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{s.description}</p>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary/50 group-hover:text-brand-purple transition-colors">{s.category}</span>
                    <div className="w-8 h-8 rounded-full bg-brand-purple/10 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">
                      <ArrowRight className="w-4 h-4 text-brand-purple" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Clients Section --- */}
        <section id="clients" className="mt-20">
          <SectionHeading 
            badge="TRUSTED PARTNERS" 
            title="Our Clients" 
            description="Serving the most respected brands in energy, finance, retail, and government."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CLIENTS.map((client, i) => (
              <motion.div
                key={client}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                whileHover={{ scale: 1.05, rotateZ: 1, translateZ: 10 }}
                className="bento-card p-4 flex items-center justify-center text-center font-bold text-[10px] text-text-secondary hover:text-text-primary hover:bg-bg-primary transition-all cursor-default grayscale hover:grayscale-0 border-border-primary preserve-3d"
                style={{ perspective: 1000 }}
              >
                {client}
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Testimonials Section --- */}
        <section className="mt-20">
          <SectionHeading 
            badge="TESTIMONIALS" 
            title="What Clients Say" 
            description="Our commitment to excellence reflected in the words of those we serve."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ rotateX: 5, rotateY: -3, translateZ: 15 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bento-card p-10 flex flex-col justify-between preserve-3d"
                style={{ perspective: 1000 }}
              >
                <div className="text-4xl text-brand-gold/30 font-serif leading-none mb-6">"</div>
                <p className="text-sm font-medium leading-relaxed italic mb-8 italic text-text-primary">
                  {t.quote}
                </p>
                <div>
                  <div className="font-extrabold text-text-primary text-xs uppercase tracking-widest">{t.author}</div>
                  <div className="text-[10px] text-brand-gold font-bold uppercase tracking-tighter mt-1">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- CSR & Core Values Section --- */}
        <section id="community" className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* CSR Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ rotateX: -2, rotateY: 5, translateZ: 20 }}
              className="md:col-span-12 lg:col-span-5 bento-card p-10 flex flex-col justify-center bg-gradient-to-br from-brand-purple to-indigo-950 text-white border-none relative overflow-hidden preserve-3d"
              style={{ perspective: 1000 }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/20">
                  Building More Than Structures
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[0.95]">
                  Community <br/>& Responsibility.
                </h2>
                <div className="space-y-4">
                  {CSR_INITIATIVES.map((item, i) => (
                    <div key={i} className="flex gap-3 items-start group">
                      <CheckCircle2 className="w-5 h-5 text-white/70 shrink-0 mt-0.5 group-hover:text-white transition-colors" />
                      <span className="text-xs font-semibold leading-relaxed text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Core Values Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ rotateX: 2, rotateY: -3, translateZ: 15 }}
              className="md:col-span-12 lg:col-span-7 bento-card p-10 bg-bg-secondary preserve-3d"
              style={{ perspective: 1000 }}
            >
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-bold">Our Core Values</h3>
                <div className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">Principles of Excellence</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                {CORE_VALUES.map((value, i) => (
                  <div key={i} className="group">
                    <div className="text-brand-gold font-black text-[10px] mb-2 uppercase tracking-[0.2em] flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-brand-gold group-hover:scale-150 transition-transform" />
                       {value.title}
                    </div>
                    <div className="text-text-secondary text-xs leading-relaxed group-hover:text-text-primary transition-colors">{value.desc}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 p-6 glass rounded-2xl border-brand-purple/20 flex flex-col md:flex-row items-center gap-6 group hover:border-brand-purple/40 transition-colors">
                <div className="w-14 h-14 bg-brand-purple/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-brand-purple group-hover:text-white transition-all">
                  <Award className="w-7 h-7 text-brand-gold group-hover:text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold mb-1">Safety-First Culture</div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    No task is so important we cannot find a safe way to do it. We are recognized as a leader for our commitment to safety, health and environmental management.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Safety & Quality Section --- */}
        <section id="safety" className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
               whileHover={{ y: -5 }}
               className="bento-card p-10 flex flex-col justify-between border-l-4 border-l-brand-purple bg-bg-secondary"
            >
              <div>
                <div className="text-brand-purple font-black text-[10px] uppercase tracking-widest mb-4">Safety First</div>
                <h3 className="text-2xl font-bold mb-4">Health, Safety & Environment</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-6">
                  No task is so important that we cannot find a safe way to do it. All work commences only after full Risk Assessment and Method Statement (RAMS) review.
                </p>
                <ul className="space-y-3">
                  {['Site-specific safety inductions', 'Daily toolbox talks & hazard reviews', 'Full PPE compliance on all sites', 'Certified Health & Safety Officers'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] font-bold text-text-primary">
                      <div className="w-1 h-1 rounded-full bg-brand-gold" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-border-primary">
                 <a href="mailto:info@frontlinecontracting.net?subject=Health%20and%20Safety%20Data%20Sheet%20Request" className="text-[10px] font-black uppercase tracking-widest text-brand-purple">Request H&S Data Sheet</a>
              </div>
            </motion.div>

            <motion.div 
               whileHover={{ y: -5 }}
               className="bento-card p-10 flex flex-col justify-between border-l-4 border-l-brand-purple bg-bg-secondary"
            >
              <div>
                <div className="text-brand-purple font-black text-[10px] uppercase tracking-widest mb-4">Standards</div>
                <h3 className="text-2xl font-bold mb-4">Quality Assurance</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-6">
                  Every Frontline project is managed under a structured QA framework, ensuring material verification and staged milestone inspections.
                </p>
                <ul className="space-y-3">
                  {['Pre-construction specification review', 'Materials testing & certification', 'Staged milestone site inspections', 'Client sign-off on every project'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] font-bold text-text-primary">
                      <div className="w-1 h-1 rounded-full bg-brand-gold" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-border-primary">
                 <a href="mailto:info@frontlinecontracting.net?subject=Quality%20Assurance%20Framework%20Request" className="text-[10px] font-black uppercase tracking-widest text-brand-purple">Request QA Framework</a>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
             <motion.div 
               whileHover={{ rotateY: 5, translateZ: 10 }}
               className="md:col-span-4 bento-card p-8 space-y-6 preserve-3d"
               style={{ perspective: 1000 }}
             >
                <h3 className="text-2xl font-bold">Contact Info</h3>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
                    <div>
                      <div className="text-[10px] font-black uppercase text-slate-500 mb-1">Harare HQ</div>
                      <div className="text-sm font-medium">9th Floor BARD House, 69 Samora Machel Ave, Harare</div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Globe className="w-5 h-5 text-brand-gold shrink-0" />
                    <div>
                      <div className="text-[10px] font-black uppercase text-slate-500 mb-1">Regional Offices</div>
                      <div className="text-sm font-bold">Johannesburg, South Africa</div>
                      <div className="text-sm font-bold">Lusaka, Zambia</div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                    <div>
                      <div className="text-[10px] font-black uppercase text-text-secondary mb-1">Call Us</div>
                      <div className="text-xs font-bold">+263 242 797 241/3</div>
                      <div className="text-xs font-bold">+263 715 887 199</div>
                      <div className="text-xs font-bold">+263 714 755 022</div>
                      <div className="text-xs font-bold">+263 734 176 488</div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Clock className="w-5 h-5 text-brand-gold shrink-0" />
                    <div>
                      <div className="text-[10px] font-black uppercase text-text-secondary mb-1">Business Hours</div>
                      <div className="text-sm font-medium">Mon - Fri: 08:00 - 17:00</div>
                    </div>
                  </div>
                </div>
             </motion.div>
             <motion.div 
               whileHover={{ rotateY: -3, translateZ: 5 }}
               className="md:col-span-8 bento-card p-10 bg-bg-secondary preserve-3d"
               style={{ perspective: 1000 }}
             >
                <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-1">
                      <label htmlFor="firstName" className="text-[10px] font-black text-text-secondary uppercase tracking-widest">First Name</label>
                      <input id="firstName" required value={contactForm.firstName} onChange={(event) => updateContactField('firstName', event.target.value)} className="w-full bg-bg-primary border border-border-primary rounded-xl p-3 text-sm focus:outline-none focus:border-brand-purple transition-colors" placeholder="John" />
                   </div>
                   <div className="space-y-1">
                      <label htmlFor="lastName" className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Last Name</label>
                      <input id="lastName" required value={contactForm.lastName} onChange={(event) => updateContactField('lastName', event.target.value)} className="w-full bg-bg-primary border border-border-primary rounded-xl p-3 text-sm focus:outline-none focus:border-brand-purple transition-colors" placeholder="Smith" />
                   </div>
                   <div className="space-y-1">
                      <label htmlFor="email" className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Email Address</label>
                      <input id="email" type="email" required value={contactForm.email} onChange={(event) => updateContactField('email', event.target.value)} className="w-full bg-bg-primary border border-border-primary rounded-xl p-3 text-sm focus:outline-none focus:border-brand-purple transition-colors" placeholder="john@company.com" />
                   </div>
                   <div className="space-y-1">
                      <label htmlFor="phone" className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Phone Number</label>
                      <input id="phone" type="tel" value={contactForm.phone} onChange={(event) => updateContactField('phone', event.target.value)} className="w-full bg-bg-primary border border-border-primary rounded-xl p-3 text-sm focus:outline-none focus:border-brand-purple transition-colors" placeholder="+263 7XX XXX XXX" />
                   </div>
                   <div className="space-y-1">
                      <label htmlFor="company" className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Company / Organisation</label>
                      <input id="company" value={contactForm.company} onChange={(event) => updateContactField('company', event.target.value)} className="w-full bg-bg-primary border border-border-primary rounded-xl p-3 text-sm focus:outline-none focus:border-brand-purple transition-colors" placeholder="Your company name" />
                   </div>
                   <div className="space-y-1">
                      <label htmlFor="service" className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Service Required</label>
                      <select id="service" value={contactForm.service} onChange={(event) => updateContactField('service', event.target.value)} className="w-full bg-bg-primary border border-border-primary rounded-xl p-3 text-sm focus:outline-none focus:border-brand-purple transition-colors appearance-none">
                        <option value="">Select a service...</option>
                        {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                      </select>
                   </div>
                   <div className="col-span-1 md:col-span-2 space-y-1">
                      <label htmlFor="location" className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Project Location</label>
                      <input id="location" value={contactForm.location} onChange={(event) => updateContactField('location', event.target.value)} className="w-full bg-bg-primary border border-border-primary rounded-xl p-3 text-sm focus:outline-none focus:border-brand-purple transition-colors" placeholder="e.g. Harare, Bulawayo, Chitungwiza..." />
                   </div>
                   <div className="col-span-1 md:col-span-2 space-y-1">
                      <label htmlFor="details" className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Project Details</label>
                      <textarea id="details" required value={contactForm.details} onChange={(event) => updateContactField('details', event.target.value)} className="w-full bg-bg-primary border border-border-primary rounded-xl p-3 text-sm focus:outline-none focus:border-brand-purple h-32 transition-colors" placeholder="Tell us about your project - scope, size, budget range, timeline..." />
                   </div>
                   <div className="col-span-1 md:col-span-2">
                     <button type="submit" className="w-full bg-brand-purple p-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:scale-[1.01] active:scale-[0.98] transition-all shadow-lg shadow-purple-950/20 text-white">Prepare Enquiry</button>
                     {contactStatus === 'error' && (
                       <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-bold text-red-600 dark:text-red-300 mt-4 text-center">
                         {contactError}
                       </p>
                     )}
                     {contactStatus === 'ready' && (
                       <div className="rounded-xl border border-brand-gold/40 bg-brand-gold/10 p-4 mt-4 text-center">
                         <p className="text-xs font-bold text-text-primary mb-3">Your enquiry is ready to send to Frontline Contracting.</p>
                         <a href={enquiryMailto} className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-gold px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-950">
                           Open email draft <Mail className="w-3 h-3" />
                         </a>
                       </div>
                     )}
                     <p className="text-[10px] text-text-secondary mt-4 text-center leading-relaxed">
                        Preparing the enquiry opens your email client. Your details are not sent until you choose to send the email.
                     </p>
                   </div>
                </form>
             </motion.div>
          </div>
          <ChatBot />
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bento-card p-12 bg-bg-secondary grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 flex flex-col items-center md:items-start gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-2 shadow-sm border border-border-primary flex items-center justify-center">
                <img src="/frontline-images/frontline-logo.png" alt="Frontline Contracting logo" className="h-full w-full object-contain" />
              </div>
              <span className="text-2xl font-bold tracking-tighter">Frontline Contracting</span>
            </div>
            <p className="text-sm text-text-secondary font-medium leading-relaxed max-w-md">
              Zimbabwe's award-winning construction and civil engineering company. Delivering local projects to global standards since 2014 - from Harare to Johannesburg and Lusaka.
            </p>
            <div className="flex gap-4">
               {[
                 { label: 'Email Frontline', href: 'mailto:info@frontlinecontracting.net', icon: Mail },
                 { label: 'Call Frontline', href: 'tel:+263242797241', icon: Phone },
                 { label: 'Visit Website', href: 'https://www.frontlinecontracting.net', icon: Globe },
               ].map(({ label, href, icon: Icon }) => (
                 <a key={label} aria-label={label} href={href} className="w-10 h-10 bento-card !rounded-xl flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all text-text-secondary hover:text-white border-border-primary">
                   <Icon className="w-4 h-4" />
                 </a>
               ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-text-primary">Services</h4>
            <div className="flex flex-col gap-3 text-[11px] font-bold text-text-secondary uppercase tracking-widest">
              {['General Construction', 'Roads & Civil Works', 'Electrical & Solar', 'Fit-out Works', 'Petroleum works'].map(link => (
                <a key={link} href="#services" className="hover:text-brand-gold transition-colors">{link}</a>
               ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-text-primary">Company</h4>
            <div className="flex flex-col gap-3 text-[11px] font-bold text-text-secondary uppercase tracking-widest">
              <a href="#about" className="hover:text-brand-gold transition-colors">About Us</a>
              <a href="#projects" className="hover:text-brand-gold transition-colors">Projects</a>
              <a href="#safety" className="hover:text-brand-gold transition-colors">Safety</a>
              <a href="#community" className="hover:text-brand-gold transition-colors">CSR</a>
              <a href="https://www.frontlinecontracting.net/company-profile.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Company Profile PDF</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-[9px] text-slate-600 font-bold uppercase tracking-[0.4em] flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-800/10 pt-8">
          <span>(c) 2026 Frontline Contracting. All rights reserved.</span>
          <span>Harare - Johannesburg - Lusaka</span>
          <span className="text-slate-500">www.frontlinecontracting.net</span>
        </div>
      </footer>
    </div>
  );
}
