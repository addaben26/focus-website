import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { Monitor, Mic, Copy, Apple, Wind, Sparkles, Download, CheckCircle, Command } from 'lucide-react';

// --- CONSTANTES & ASSETS ---
const ASSETS = {
  video: "https://res.cloudinary.com/do5zemcrk/video/upload/v1772732043/121524-724709996_medium_pq1gdx.mp4",
  logo: "https://res.cloudinary.com/do5zemcrk/image/upload/v1772738814/ChatGPT_Image_5_mars_2026_20_26_30_rjlepf.png"
};

// --- HOOKS ---
const useOS = () => {
  const [os, setOs] = useState<'mac' | 'win' | 'mobile' | 'unknown'>('unknown');
  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (/android|iphone|ipad|ipod/.test(ua)) setOs('mobile');
    else if (ua.includes('mac')) setOs('mac');
    else if (ua.includes('win')) setOs('win');
  }, []);
  return os;
};

// --- COMPOSANTS UI PREMIUM ---

// 1. Titre avec apparition fluide (Clipping Mask)
const RevealText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => (
  <div className="overflow-hidden pb-2">
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={`inline-block ${className}`}
    >
      {text}
    </motion.div>
  </div>
);

// 2. Bouton magnétique principal
const PrimaryButton = ({ onClick, children, icon: Icon }: { onClick?: any, children: React.ReactNode, icon?: any }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-sm tracking-wide overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <span className="relative z-10 flex items-center gap-3">
      {Icon && <Icon size={18} className="group-hover:translate-x-1 transition-transform" />}
      {children}
    </span>
  </motion.button>
);

// 3. Carte Bento (Design asymétrique)
const BentoCard = ({ className, children, glow = false }: { className?: string, children: React.ReactNode, glow?: boolean }) => (
  <div className={`relative group overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors ${className}`}>
    {glow && (
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-[50px] group-hover:bg-indigo-500/30 transition-colors duration-700" />
    )}
    <div className="relative z-10 h-full p-8 md:p-10 flex flex-col">
      {children}
    </div>
  </div>
);

// --- PAGE PRINCIPALE ---
export default function App() {
  const containerRef = useRef(null);
  const os = useOS();
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Colle le lien GitHub que tu viens de copier juste ici :
    const windowsUrl = "https://github.com/addaben26/electron/releases/download/v1.0.0/Focus.exe"; 
    
    const macUrl = "#"; // On garde ça prêt pour la future version Mac
    const downloadUrl = os === 'mac' ? macUrl : windowsUrl;
    
    // Force la redirection vers le fichier
    window.location.href = downloadUrl;
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 2 }}>
      {/* CSS GLOBAL : Fonts & Textures */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { 
          background-color: #000; 
          color: #fff; 
          font-family: 'Plus Jakarta Sans', sans-serif; 
          overflow-x: hidden; 
        }
        ::selection { background: rgba(99, 102, 241, 0.3); }
        ::-webkit-scrollbar { display: none; }
        
        /* Texture de grain photographique (Le secret des sites premium) */
        .noise-bg {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none; z-index: 9999; opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      <div className="noise-bg" />

      {/* AMBIANCE LUMINEUSE GLOBALE */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-rose-900/10 blur-[120px] rounded-full pointer-events-none" />

      <main ref={containerRef} className="relative z-10">
        
        {/* NAVIGATION MINIMALISTE */}
        <nav className="fixed top-0 w-full z-50 border-b border-white/[0.04] bg-black/50 backdrop-blur-2xl backdrop-saturate-150">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={ASSETS.logo} alt="Focus" className="w-8 h-8 object-contain" />
              <span className="font-extrabold tracking-tight text-lg">Focus.</span>
            </div>
            <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
              <span className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors"><Apple size={15}/> macOS</span>
              <span className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors"><Wind size={15}/> Windows</span>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-35 px-6 overflow-hidden">
          <motion.div style={{ y: yParallax, opacity: opacityFade }} className="w-full max-w-5xl mx-auto text-center flex flex-col items-center z-10">

            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-[1.1] mb-8 mt-10 md:mt-0 flex flex-col items-center">
  <RevealText text="Le seul assistant" delay={0.1} />
  {/* Le margin-top négatif (-mt-2 ou -mt-4) permet de resserrer parfaitement les lignes */}
  <RevealText 
    text="Intégré à votre bureau." 
    delay={0.2} 
    className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-400 to-gray-700 -mt-2 md:-mt-4" 
  />
</h1>

            <motion.p 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }}
              className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl text-balance leading-relaxed mb-12"
            >
              Plus qu'un simple chat web. Focus est un utilitaire natif qui observe votre écran, écoute votre voix et tape à votre place. L'expérience IA ultime, ancrée dans votre bureau.
            </motion.p>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.8 }} id="download">
              {os === 'mobile' ? (
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-left max-w-sm">
                  <Monitor className="text-indigo-400 mb-3" />
                  <p className="font-bold text-white mb-1">Passez sur ordinateur</p>
                  <p className="text-sm text-gray-400">Focus est une application de bureau native. Ouvrez ce lien sur PC ou Mac pour l'installer.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <PrimaryButton onClick={handleDownload} icon={Download}>
                    Télécharger pour {os === 'mac' ? 'Mac' : 'Windows'}
                  </PrimaryButton>
                  <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
                    <CheckCircle size={12} /> Gratuit et prêt à l'emploi
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* APERÇU VIDÉO FLOTTANT */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl mx-auto mt-20 relative z-20"
          >
            <div className="aspect-[16/9] md:aspect-[21/9] bg-[#050505] rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)] overflow-hidden relative group">
              {/* Remplacer cette div par la balise vidéo finale */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 backdrop-blur-md group-hover:scale-110 transition-transform">
                  <Command className="text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-400 tracking-widest uppercase">Espace Vidéo UI</p>
              </div>
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 mix-blend-screen" src={ASSETS.video} />
            </div>
          </motion.div>
        </section>

        {/* BENTO GRID (Fonctionnalités) */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Oubliez le copier-coller.</h2>
            <p className="text-gray-400 mt-4 text-lg max-w-xl">Focus fusionne avec votre système d'exploitation pour réduire la friction entre la pensée et l'action.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
            
            {/* Bento 1: Vision (Prend 2 colonnes) */}
            <BentoCard className="md:col-span-2" glow>
              <div className="mb-auto">
                <Monitor className="w-8 h-8 text-indigo-400 mb-6" />
                <h3 className="text-2xl font-bold mb-2">Conscience de l'écran</h3>
                <p className="text-gray-400 leading-relaxed max-w-md">Focus analyse ce que vous regardez. Mails, code, PDF ou tableurs : donnez-lui le contexte sans jamais quitter votre fenêtre.</p>
              </div>
              <div className="absolute bottom-0 right-0 w-2/3 h-1/2 bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-tl-3xl border-t border-l border-white/5" />
            </BentoCard>

            {/* Bento 2: Voix */}
            <BentoCard>
              <Mic className="w-8 h-8 text-rose-400 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Saisie vocale</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Pensez à voix haute. L'IA transcrit, corrige et structure vos pensées en temps réel.</p>
            </BentoCard>

            {/* Bento 3: Brouillon */}
            <BentoCard>
              <Copy className="w-8 h-8 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Brouillon natif</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Le texte est généré dans un widget de verre dépoli, prêt à être copié d'un seul clic.</p>
            </BentoCard>

            {/* Bento 4: Discrétion (Prend 2 colonnes) */}
            <BentoCard className="md:col-span-2 bg-gradient-to-br from-[#0a0a0a] to-[#111]">
              <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="flex-1">
                  <div className="inline-flex px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white mb-6">Minimaliste</div>
                  <h3 className="text-2xl font-bold mb-2">Conçu pour s'effacer</h3>
                  <p className="text-gray-400 leading-relaxed max-w-sm">Une simple pilule flottante sur votre bureau. Elle s'anime quand elle vous écoute, et disparaît quand vous travaillez.</p>
                </div>
                {/* Visual mockup de la pilule */}
                <div className="w-full md:w-64 h-16 rounded-full border border-white/20 bg-black/50 backdrop-blur-xl flex items-center px-4 gap-4 relative overflow-hidden shadow-2xl">
                  <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50" src={ASSETS.video} />
                  <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse relative z-10" />
                  <div className="w-32 h-2 bg-white/10 rounded-full relative z-10" />
                </div>
              </div>
            </BentoCard>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-32 border-t border-white/5 bg-[#020202]">
          <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-8">Prêt à changer de dimension ?</h2>
            <PrimaryButton onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}>
              Installer Focus maintenant
            </PrimaryButton>
            
            <div className="w-full h-px bg-white/5 my-16" />
            
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <img src={ASSETS.logo} className="w-5 h-5 grayscale opacity-50" alt="" />
                <span>© 2026 Focus App.</span>
              </div>
              <div className="flex gap-6">
                <span>Développé sur Electron</span>
                <span>Propulsé par Google Gemini</span>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </ReactLenis>
  );
}