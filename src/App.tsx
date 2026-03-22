/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Palette, 
  Cpu, 
  Gamepad2, 
  ChevronRight,
  Terminal,
  Layers,
  Sparkles,
  Trash2,
  Eraser,
  Download,
  ArrowRight,
  Twitter,
  Briefcase,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  stack: string[];
  description: string;
  color: string;
  details: string;
  features: string[];
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Aura Hoops",
    stack: ["React", "Framer Motion", "Tailwind"],
    description: "Experiencia de comercio electrónico de alta fidelidad con animaciones de productos cinematográficas e interacciones 3D personalizadas.",
    color: "#FF5A00",
    details: "Aura Hoops fue diseñado para desafiar los límites de las tecnologías web estándar. Cuenta con un motor de física personalizado para las interacciones con los productos y un pipeline de renderizado altamente optimizado.",
    features: ["Motor de Física Personalizado", "Transiciones Cinematográficas", "Iluminación Dinámica", "Diseño Responsivo"]
  },
  {
    id: 2,
    title: "Quantum Dashboard",
    stack: ["TypeScript", "D3.js", "Next.js"],
    description: "Plataforma de visualización de datos en tiempo real para monitorear infraestructuras de nube complejas con nodos interactivos.",
    color: "#00E5FF",
    details: "Quantum proporciona una vista panorámica de despliegues masivos en la nube. Utilizando D3.js, creamos un gráfico de fuerza que puede manejar miles de nodos en tiempo real sin perder fluidez.",
    features: ["Flujos de Datos en Tiempo Real", "Gráficos de Fuerza", "Componentes D3 Personalizados", "Monitoreo de Infraestructura"]
  },
  {
    id: 3,
    title: "Pixel Quest",
    stack: ["Phaser", "React", "WebAudio"],
    description: "Un motor de juegos RPG basado en navegador con generación de mazmorras procedimentales y estética pixel art retro.",
    color: "#FF00FF",
    details: "Pixel Quest es un tributo a la era dorada de los RPGs. Cuenta con un algoritmo de generación procedimental que asegura que cada partida sea única, combinado con una interfaz moderna en React.",
    features: ["Generación Procedimental", "Integración WebAudio", "Motor Phaser", "Estética Retro"]
  }
];

// --- Components ---

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);
    const moveCursor = (e: MouseEvent) => {
      if (dotRef.current && outlineRef.current) {
        const { clientX, clientY } = e;
        dotRef.current.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
        outlineRef.current.style.transform = `translate(${clientX - 20}px, ${clientY - 20}px)`;
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div 
        ref={outlineRef} 
        className={`cursor-outline transition-all duration-300 ${isHovering ? 'scale-[2] bg-brand/10 border-brand' : 'scale-100'}`} 
      />
    </>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-bg/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="glass w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-8 md:p-12 relative border-white/10"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 sm:w-12 sm:h-12 glass rounded-full flex items-center justify-center hover:bg-brand hover:text-black transition-all z-20"
        >
          <X size={20} />
        </button>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <span className="font-pixel text-[10px] text-brand mb-4 block">PROJECT_DETAILS</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4">{project.title}</h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map(s => (
                  <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-brand">{s}</span>
                ))}
              </div>
            </div>
            
            <p className="text-white/60 text-base sm:text-lg leading-relaxed">{project.details}</p>
            
            <div className="space-y-4">
              <h4 className="font-bold text-white/40 uppercase tracking-widest text-xs">Key Features</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {project.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex-1 py-4 bg-brand text-black font-bold rounded-full hover:scale-[1.02] transition-all text-sm sm:text-base">Live Demo</button>
              <button className="flex-1 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all text-sm sm:text-base">Source Code</button>
            </div>
          </div>

          <div className="aspect-square bg-surface rounded-[1.5rem] sm:rounded-[2rem] relative overflow-hidden flex items-center justify-center order-first lg:order-last">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <Code2 size={120} style={{ color: project.color }} className="opacity-20 sm:w-[160px] sm:h-[160px]" />
            <div className="absolute inset-0 animate-scanline bg-gradient-to-b from-transparent via-brand/5 to-transparent h-20 opacity-30"></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PageTransition = ({ targetSection }: { targetSection: string }) => {
  const getTransitionText = (id: string) => {
    switch (id) {
      case 'hero': return 'Cargando entorno principal...';
      case 'about': return 'Analizando perfil...';
      case 'projects': return 'Renderizando proyectos...';
      case 'lab': return 'Iniciando entorno experimental...';
      case 'pixel': return 'Inicializando canvas...';
      case 'contact': return 'Abriendo canal de contacto...';
      default: return 'Actualizando sistema...';
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] bg-brand flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 bg-grain opacity-10"></div>
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-pixel text-black text-sm mb-4 tracking-widest"
        >
          {getTransitionText(targetSection)}
        </motion.div>
        <div className="w-64 h-1 bg-black/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="h-full bg-black"
          />
        </div>
      </div>
    </motion.div>
  );
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center p-6"
    >
      <div className="absolute inset-0 bg-grain pointer-events-none"></div>
      <div className="relative w-full max-w-md">
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-1">
            <p className="font-pixel text-[8px] text-brand animate-pulse uppercase">Inicializando interfaz creativa...</p>
            <p className="text-xs text-white/40 font-mono">VERSIÓN_SISTEMA: 2.0.26</p>
          </div>
          <p className="font-pixel text-xs text-brand">{progress}%</p>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
          <motion.div 
            className="h-full bg-brand"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-8 grid grid-cols-4 gap-2 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-1 bg-white rounded-full"></div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = ({ onNavigate }: { onNavigate: (id: string) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll
      const sections = ['hero', 'about', 'projects', 'lab', 'pixel', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    onNavigate(id);
  };

  const navLinks = [
    { id: 'about', label: 'Sobre mí' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'lab', label: 'Lab' },
  ];

  const mobileLinks = [
    { id: 'hero', label: 'Inicio' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'lab', label: 'Lab' },
    { id: 'pixel', label: 'Pixel Art' },
    { id: 'contact', label: 'Contacto' },
  ];

  const getSectionLabel = (id: string) => {
    switch(id) {
      case 'hero': return 'Inicio';
      case 'about': return 'Perfil';
      case 'projects': return 'Proyectos';
      case 'lab': return 'Lab';
      case 'pixel': return 'Canvas';
      case 'contact': return 'Contacto';
      default: return '';
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 sm:px-6 py-4 sm:py-6 ${scrolled ? 'bg-bg/80 backdrop-blur-xl border-b border-white/5 py-3 sm:py-4' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          <a href="#" onClick={(e) => handleClick(e, 'hero')} className="flex items-center gap-2 sm:gap-3 group relative z-[110]">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-brand rounded-lg flex items-center justify-center text-black font-black group-hover:rotate-12 transition-transform text-sm sm:text-base">V</div>
            <span className="font-bold tracking-tighter text-lg sm:text-xl hidden xs:block uppercase">VALE<span className="text-brand">.</span></span>
          </a>

          {/* Mobile Section Indicator (Discrete) */}
          <div className="md:hidden absolute left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-300" style={{ opacity: scrolled && !isOpen ? 1 : 0 }}>
            <span className="font-pixel text-[8px] text-white/20 uppercase tracking-widest">{getSectionLabel(activeSection)}</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">
            {navLinks.map(link => (
              <a 
                key={link.id} 
                href={`#${link.id}`} 
                onClick={(e) => handleClick(e, link.id)} 
                className={`transition-colors hover:text-brand ${activeSection === link.id ? 'text-brand' : ''}`}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => handleClick(e, 'contact')} 
              className={`px-5 py-2 glass rounded-full transition-all ${activeSection === 'contact' ? 'bg-brand text-black' : 'text-white hover:bg-brand hover:text-black'}`}
            >
              Contacto
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:text-brand transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-bg z-[200] flex flex-col md:hidden overflow-hidden"
          >
            <div className="absolute inset-0 bg-grain opacity-5 pointer-events-none"></div>
            
            {/* Overlay Header */}
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-brand rounded-lg flex items-center justify-center text-black font-black text-sm sm:text-base">V</div>
                <span className="font-bold tracking-tighter text-lg sm:text-xl uppercase">VALE<span className="text-brand">.</span></span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-white hover:text-brand transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Overlay Links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8">
              {mobileLinks.map((link, i) => (
                <motion.a 
                  key={link.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                  href={`#${link.id}`} 
                  onClick={(e) => handleClick(e, link.id)} 
                  className={`text-4xl sm:text-5xl font-black uppercase tracking-tighter transition-all hover:text-brand hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(0,255,156,0.3)] ${activeSection === link.id ? 'text-brand' : 'text-white'}`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Overlay Footer */}
            <div className="p-8 flex justify-center opacity-20">
              <span className="font-pixel text-[8px] tracking-[0.3em] uppercase">SISTEMA_NAVEGACION_V2.0</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.button>
  );
};

const PixelArtPaint = () => {
  const GRID_SIZE = 16;
  const [grid, setGrid] = useState<string[][]>(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('transparent')));
  const [color, setColor] = useState('#00FF9C');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colors = ['#00FF9C', '#FF00FF', '#00E5FF', '#FFD700', '#FF4D4D', '#FFFFFF', '#000000'];

  const handlePaint = (r: number, c: number) => {
    const newGrid = [...grid];
    newGrid[r][c] = color;
    setGrid(newGrid);
  };

  const clearCanvas = () => {
    setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('transparent')));
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = 20;
    canvas.width = GRID_SIZE * scale;
    canvas.height = GRID_SIZE * scale;

    grid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell !== 'transparent') {
          ctx.fillStyle = cell;
          ctx.fillRect(c * scale, r * scale, scale, scale);
        }
      });
    });

    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <section className="py-24 px-6 bg-surface/30 relative overflow-hidden">
      <canvas ref={canvasRef} className="hidden" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="font-pixel text-[10px] text-brand mb-4 block uppercase">MINI_HERRAMIENTA_V1.0</span>
          <h2 className="text-5xl font-black tracking-tighter mb-6 uppercase">PIXEL ART <br /> <span className="text-white/20">STUDIO.</span></h2>
          <p className="text-white/50 mb-10 max-w-md leading-relaxed text-lg">
            Un pequeño lienzo interactivo para demostrar la gestión de estado y la interacción creativa. Pinta algo simple y descárgalo.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {colors.map(c => (
              <button 
                key={c}
                onClick={() => setColor(c)}
                className={`w-12 h-12 rounded-xl border-2 transition-all hover:scale-110 ${color === c ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
              />
            ))}
            <button 
              onClick={() => setColor('transparent')}
              className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center glass transition-all hover:scale-110 ${color === 'transparent' ? 'border-white scale-110' : 'border-transparent'}`}
            >
              <Eraser size={20} />
            </button>
            <button 
              onClick={clearCanvas}
              className="w-12 h-12 rounded-xl border-2 border-transparent flex items-center justify-center glass hover:bg-red-500/20 transition-all hover:scale-110"
            >
              <Trash2 size={20} />
            </button>
            <button 
              onClick={downloadImage}
              className="w-12 h-12 rounded-xl border-2 border-transparent flex items-center justify-center glass hover:bg-brand/20 transition-all hover:scale-110"
            >
              <Download size={20} />
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative group w-full max-w-md mx-auto lg:max-w-none"
        >
          <div className="absolute -inset-4 bg-brand/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="relative glass p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] shadow-2xl">
            <div className="overflow-x-auto pb-4 md:pb-0">
              <div 
                className="grid gap-px bg-white/5 p-px rounded-xl overflow-hidden min-w-[280px]"
                style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
                onMouseDown={() => setIsDrawing(true)}
                onMouseUp={() => setIsDrawing(false)}
                onMouseLeave={() => setIsDrawing(false)}
              >
                {grid.map((row, r) => row.map((cell, c) => (
                  <div 
                    key={`${r}-${c}`}
                    onMouseEnter={() => isDrawing && handlePaint(r, c)}
                    onMouseDown={() => handlePaint(r, c)}
                    className="aspect-square w-full cursor-crosshair transition-colors duration-100"
                    style={{ backgroundColor: cell === 'transparent' ? 'rgba(255,255,255,0.02)' : cell }}
                  />
                )))}
              </div>
            </div>
          </div>
          
          {/* Isometric Preview */}
          <div className="absolute -bottom-6 md:-bottom-12 -right-6 md:-right-12 w-32 md:w-48 h-32 md:h-48 glass rounded-2xl p-2 md:p-4 hidden sm:block rotate-[15deg] shadow-2xl pointer-events-none">
            <p className="text-[6px] md:text-[8px] font-pixel text-white/20 mb-1 md:mb-2 uppercase">ISO_PREVIEW</p>
            <div 
              className="grid gap-[1px] opacity-80"
              style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
            >
              {grid.map((row, r) => row.map((cell, c) => (
                <div 
                  key={`iso-${r}-${c}`}
                  className="aspect-square w-full"
                  style={{ backgroundColor: cell === 'transparent' ? 'rgba(255,255,255,0.05)' : cell }}
                />
              )))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CreativeLab = () => {
  return (
    <section id="lab" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-pixel text-[10px] text-brand mb-4 block uppercase">EXPERIMENTOS_LAB</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase">LABORATORIO <br /> <span className="text-white/20">CREATIVO.</span></h2>
          </div>
          <p className="max-w-md text-white/40 text-sm leading-relaxed">
            Una colección de experimentos de UI, pruebas de animación y prototipos interactivos donde exploro los límites de lo posible en el navegador.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { 
              icon: Sparkles, 
              title: "Fuerza Magnética", 
              desc: "Interacción de botones basada en física que atrae el cursor dentro de un rango específico.",
              component: (
                <div className="h-40 flex items-center justify-center bg-white/5 rounded-2xl border border-white/5">
                  <MagneticButton className="px-8 py-4 glass rounded-full text-brand font-bold border-brand/20 uppercase tracking-widest text-xs">
                    Atráeme
                  </MagneticButton>
                </div>
              )
            },
            { 
              icon: Layers, 
              title: "Seguidor de Brillo", 
              desc: "Una fuente de luz dinámica que sigue al cursor, iluminando el contenido con una caída realista.",
              component: (
                <div className="h-40 relative overflow-hidden rounded-2xl bg-white/5 flex items-center justify-center group/glow border border-white/5">
                  <div className="absolute inset-0 opacity-0 group-hover/glow:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(0,255,156,0.15)_0%,transparent_70%)]" 
                    style={{ '--x': '50%', '--y': '50%' } as any}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      e.currentTarget.style.setProperty('--x', `${x}%`);
                      e.currentTarget.style.setProperty('--y', `${y}%`);
                    }}
                  />
                  <span className="text-[10px] font-pixel text-white/20 uppercase tracking-widest">Hover para iluminar</span>
                </div>
              )
            },
            { 
              icon: Terminal, 
              title: "Vale CLI", 
              desc: "Un emulador de terminal funcional construido con React y lógica de procesamiento de comandos personalizada.",
              component: (
                <div className="h-40 bg-black/40 rounded-2xl p-4 font-mono text-[10px] overflow-hidden border border-white/5">
                  <p className="text-brand">vale@portfolio:~$ <span className="text-white">init --creative</span></p>
                  <p className="text-white/40 mt-1">Cargando módulos...</p>
                  <p className="text-white/40">Éxito: 128 módulos cargados.</p>
                  <p className="text-brand">vale@portfolio:~$ <span className="animate-pulse">_</span></p>
                </div>
              )
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeInOut" }}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-[2.5rem] group cursor-pointer flex flex-col h-full hover:border-brand/30 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-6 group-hover:scale-110 group-hover:bg-brand group-hover:text-black transition-all duration-500">
                <item.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 uppercase tracking-tight">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-8">{item.desc}</p>
              
              <div className="mt-auto">
                {item.component}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = ({ onSelectProject }: { onSelectProject: (p: Project) => void }) => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16 px-4">
          <span className="font-pixel text-[8px] md:text-[10px] text-brand mb-4 block uppercase">TRABAJOS_SELECCIONADOS</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">PROYECTOS <br /> <span className="text-white/20">DESTACADOS.</span></h2>
        </div>

        <div className="space-y-20 md:space-y-32 px-4">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 md:gap-16 items-center`}
            >
              <div className="flex-1 w-full">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl"
                  onClick={() => onSelectProject(project)}
                >
                  <div className="aspect-[16/9] bg-surface relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-1000">
                      <Code2 size={120} className="md:w-[160px] md:h-[160px]" style={{ color: project.color }} />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <div className="px-6 md:px-8 py-3 md:py-4 glass rounded-full font-bold flex items-center gap-3 uppercase tracking-wider text-xs md:text-sm">
                        Ver Caso de Estudio <ExternalLink size={18} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex-1 space-y-6 md:space-y-8 w-full text-center lg:text-left">
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {project.stack.map(s => (
                    <span key={s} className="px-3 md:px-4 py-1 md:py-1.5 bg-white/5 border border-white/10 rounded-full text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest">{s}</span>
                  ))}
                </div>
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight">{project.title}</h3>
                <p className="text-white/50 leading-relaxed text-base md:text-xl max-w-2xl mx-auto lg:mx-0">{project.description}</p>
                <div className="pt-4 md:pt-6 flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                  <button className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white text-black font-bold rounded-full hover:bg-brand hover:text-black transition-all uppercase tracking-wider text-sm">Demo en Vivo</button>
                  <button 
                    onClick={() => onSelectProject(project)}
                    className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 glass text-white font-bold rounded-full hover:bg-white/10 transition-all uppercase tracking-wider text-sm"
                  >
                    Caso de Estudio
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Hero = ({ onNavigate }: { onNavigate: (id: string) => void }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-bg pointer-events-none"></div>
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-20"></div>
      
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-brand/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-pixel text-[8px] md:text-[10px] text-brand mb-6 md:mb-8 block tracking-[0.2em] uppercase"
          >
            DISEÑADOR _ DESARROLLADOR _ CREATIVO
          </motion.span>
          <h1 className="text-[14vw] sm:text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-tighter mb-8 uppercase">
            CREANDO <br /> <span className="text-white/20">VALOR</span> <br /> <span className="text-glow">DIGITAL.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/40 text-base md:text-xl leading-relaxed mb-10 md:mb-12 px-4">
            Especializado en ingeniería frontend de alto rendimiento, diseño de interfaces inmersivas y narrativa visual interactiva.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4">
            <button 
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto group relative px-8 md:px-10 py-4 md:py-5 bg-brand text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 uppercase text-sm">Ver Proyectos <ArrowRight size={18} /></span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 glass text-white font-bold rounded-full hover:bg-white/10 transition-all uppercase text-sm"
            >
              Contactar
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Pixel Accents */}
      <div className="absolute bottom-12 left-12 hidden lg:block opacity-20">
        <div className="font-pixel text-[8px] space-y-2">
          <p>X: 128.42</p>
          <p>Y: 892.11</p>
          <p>ESTADO: ACTIVO</p>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const experiences = [
    {
      period: "Enero 2024 – 2026",
      role: "Desarrollador Web",
      company: "Monarca Joyería",
      description: "Desarrollé y optimicé el sitio web de la empresa utilizando WordPress, enfocándome en el rendimiento, la estabilidad y la experiencia de usuario. Implementé mejoras en la interfaz y estructura del sitio, optimicé tiempos de carga y gestioné actualizaciones continuas para garantizar un funcionamiento eficiente y una navegación fluida.",
      current: true
    },
    {
      period: "2023 – 2024",
      role: "Desarrollador Web Freelance",
      company: "Independiente",
      description: "Desarrollé y personalicé sitios web en WordPress según las necesidades de cada cliente, adaptando diseño y funcionalidad a distintos tipos de negocio. Me encargué de la optimización, mantenimiento y mejora continua de los proyectos, asegurando rendimiento, usabilidad y calidad en la experiencia final.",
      current: false
    }
  ];

  const skills = [
    { name: "WordPress", level: 90 },
    { name: "Elementor", level: 90 },
    { name: "HTML", level: 75 },
    { name: "CSS", level: 75 },
    { name: "Tailwind CSS", level: 70 },
    { name: "Python", level: 65 },
    { name: "Three.js", level: 40 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-24 px-6 bg-surface/30">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center"
      >
        <motion.div variants={itemVariants} className="relative">
          <div className="aspect-square glass rounded-[3rem] p-8 relative group">
            <div className="absolute inset-0 bg-brand/5 rounded-[3rem] group-hover:scale-105 transition-transform duration-700"></div>
            <div className="relative h-full w-full border border-white/5 rounded-[2rem] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 animate-scanline bg-gradient-to-b from-transparent via-brand/10 to-transparent h-20 opacity-30"></div>
              <Cpu size={120} className="text-brand opacity-20" />
            </div>
          </div>
          {/* Decorative Blocks */}
          <div className="absolute -top-6 -right-6 w-24 h-24 glass rounded-2xl hidden md:flex items-center justify-center rotate-12">
            <Palette size={32} className="text-brand" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 glass rounded-2xl hidden md:flex items-center justify-center -rotate-12">
            <Gamepad2 size={32} className="text-brand" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
          <span className="font-pixel text-[10px] text-brand block uppercase">NÚCLEO_IDENTIDAD</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight uppercase">
            Cerrando la brecha entre <span className="text-white/20">Código y Creatividad.</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg leading-relaxed">
            Soy un desarrollador frontend con una profunda obsesión por el detalle visual y la interacción. Mi trabajo vive en la intersección del diseño de alto nivel y la ingeniería robusta.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4">
            <div className="p-6 glass rounded-2xl group hover:border-brand/30 transition-colors">
              <h4 className="font-bold text-brand mb-2 uppercase text-sm">Detalle de Diseño</h4>
              <p className="text-xs md:text-sm text-white/40">Enfoque obsesivo en tipografía, espaciado y curvas de movimiento.</p>
            </div>
            <div className="p-6 glass rounded-2xl group hover:border-brand/30 transition-colors">
              <h4 className="font-bold text-brand mb-2 uppercase text-sm">Rigor Técnico</h4>
              <p className="text-xs md:text-sm text-white/40">Arquitectura limpia y escalable utilizando stacks modernos.</p>
            </div>
          </div>
        </motion.div>

        {/* Experiencia Laboral Section */}
        <motion.div variants={itemVariants} className="lg:col-span-2 mt-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand">
              <Briefcase size={24} />
            </div>
            <div>
              <span className="font-pixel text-[10px] text-brand block uppercase">TRAYECTORIA_PROFESIONAL</span>
              <h3 className="text-3xl font-black tracking-tighter uppercase">Experiencia Laboral</h3>
            </div>
          </div>

          <div className="grid gap-6 md:gap-8">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.01 }}
                className={`relative p-6 md:p-8 glass rounded-[2rem] md:rounded-[2.5rem] border border-white/5 transition-all duration-500 group ${exp.current ? 'border-brand/20 bg-brand/[0.02]' : 'hover:border-white/10'}`}
              >
                {exp.current && (
                  <div className="absolute top-6 md:top-8 right-6 md:right-8 flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 bg-brand/10 border border-brand/20 rounded-full">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-brand rounded-full animate-pulse"></span>
                    <span className="text-[8px] md:text-[10px] font-bold text-brand uppercase tracking-widest">Actual</span>
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 mb-4 md:mb-6">
                  <div>
                    <h4 className="text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-brand transition-colors">
                      {exp.role} <span className="text-white/20 mx-1 md:mx-2">—</span> {exp.company}
                    </h4>
                    <span className="text-brand/60 font-mono text-xs md:text-sm uppercase tracking-wider">{exp.period}</span>
                  </div>
                </div>

                <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-4xl">
                  {exp.description}
                </p>
                
                {/* Decorative line for timeline feel */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-brand/20 rounded-r-full group-hover:bg-brand transition-all duration-500 hidden sm:block"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Habilidades Section */}
        <motion.div variants={itemVariants} className="lg:col-span-2 mt-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand">
              <Code2 size={24} />
            </div>
            <div>
              <span className="font-pixel text-[10px] text-brand block uppercase">ARSENAL_TÉCNICO</span>
              <h3 className="text-3xl font-black tracking-tighter uppercase">Habilidades</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="space-y-3 group cursor-default"
              >
                <div className="flex justify-between items-end px-1">
                  <span className="text-sm font-bold uppercase tracking-wider text-white/80 group-hover:text-brand transition-colors">
                    {skill.name}
                  </span>
                  <span className="font-pixel text-[10px] text-brand/60">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/5 relative group-hover:border-brand/30 group-hover:shadow-[0_0_15px_rgba(0,255,156,0.1)] transition-all duration-500">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: index * 0.1 }}
                    className="h-full bg-brand rounded-full relative"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-brand blur-sm opacity-40"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="glass rounded-[2rem] sm:rounded-[4rem] p-6 sm:p-12 md:p-20 relative overflow-hidden border border-white/5"
        >
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-brand/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div className="space-y-8">
              <div>
                <span className="font-pixel text-[10px] text-brand mb-4 block uppercase tracking-widest">INICIO_TRANSMISION</span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter mb-6 uppercase leading-[0.9]">
                  CONSTRUYAMOS <br className="hidden sm:block" /> 
                  <span className="text-white/20">ALGO</span> <br className="hidden sm:block" /> 
                  <span className="text-glow">LEGENDARIO.</span>
                </h2>
                <p className="text-white/50 text-base sm:text-lg max-w-md leading-relaxed">
                  Actualmente abierto a nuevas oportunidades y colaboraciones creativas. Envía un mensaje y hablemos sobre tu próxima gran idea.
                </p>
              </div>
              
              <div className="space-y-8">
                <a 
                  href="mailto:samueldavidmolina@gmail.com" 
                  className="flex items-center gap-4 group w-full"
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 glass rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-brand group-hover:text-black transition-all duration-500">
                    <Mail size={18} className="sm:w-6 sm:h-6" />
                  </div>
                  <span className="font-bold text-sm sm:text-xl group-hover:text-brand transition-colors break-all">
                    samueldavidmolina@gmail.com
                  </span>
                </a>
                
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {[Github, Linkedin, Twitter].map((Icon, i) => (
                    <a 
                      key={i} 
                      href="#" 
                      className="w-10 h-10 sm:w-14 sm:h-14 glass rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-brand hover:text-black transition-all duration-500"
                    >
                      <Icon size={18} className="sm:w-6 sm:h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <form className="space-y-5 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">Nombre Completo</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl px-5 sm:px-6 py-4 sm:py-5 focus:outline-none focus:border-brand transition-all text-sm" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl px-5 sm:px-6 py-4 sm:py-5 focus:outline-none focus:border-brand transition-all text-sm" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">Mensaje</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl px-5 sm:px-6 py-4 sm:py-5 focus:outline-none focus:border-brand transition-all resize-none text-sm" 
                  placeholder="Cuéntame sobre tu proyecto..."
                ></textarea>
              </div>
              <button className="w-full py-5 sm:py-6 bg-brand text-black font-bold rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(0,255,156,0.2)] uppercase tracking-widest text-xs sm:text-sm">
                ENVIAR TRANSMISIÓN
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-brand rounded flex items-center justify-center text-black font-black text-xs">V</div>
        <span className="text-xs font-bold tracking-widest text-white/40 uppercase">Vale Portfolio © 2026</span>
      </div>
      <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
        <a href="#" className="hover:text-white transition-colors">Términos</a>
        <a href="#" className="hover:text-white transition-colors">Cookies</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetSection, setTargetSection] = useState('');

  const handleNavigate = (id: string) => {
    setTargetSection(id);
    setIsTransitioning(true);
    
    // Smooth scroll after transition is halfway
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800);

    // End transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-bg selection:bg-brand selection:text-black">
      <CustomCursor />
      
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {isTransitioning && <PageTransition targetSection={targetSection} />}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar onNavigate={handleNavigate} />
          <main>
            <Hero onNavigate={handleNavigate} />
            <About />
            <Projects onSelectProject={setSelectedProject} />
            <CreativeLab />
            <PixelArtPaint />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
