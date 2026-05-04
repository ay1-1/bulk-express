/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  TrendingDown, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight,
  Menu,
  X,
  Search,
  ShoppingCart
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import AOS from 'aos';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000",
  drinks: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800",
  lotions: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800", // Premium lotion image
  grains: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800", // Rice/Grains
  produce: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800", // Fresh Produce
  homecare: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" // Detergents/Cleaning
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis (Smooth Scroll)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
      offset: 100
    });

    // 3. Custom Cursor GSAP
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (cursor && follower) {
      const xTo = gsap.quickSetter(cursor, "x", "px");
      const yTo = gsap.quickSetter(cursor, "y", "px");

      const onMouseMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        gsap.to(follower, {
          duration: 0.6,
          x: e.clientX,
          y: e.clientY,
          ease: "power3.out"
        });
      };

      window.addEventListener("mousemove", onMouseMove);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, []);

  useEffect(() => {
    // 4. GSAP Animations
    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(".art-of", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      }, "-=0.4")
      .from(".wholesale-word", {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      }, "-=0.8")
      .from(".excellence-word", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      }, "-=0.8")
      .from(".hero-description", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.8")
      .from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.6");

      // Parallax Background
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        yPercent: 20,
        ease: "none"
      });

      // Sticky Navbar Effect
      ScrollTrigger.create({
        start: "top -150",
        onEnter: () => {
          gsap.to(navRef.current, { 
            height: "80px", 
            backgroundColor: "rgba(0, 35, 102, 0.95)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            duration: 0.5,
            ease: "expo.out"
          });
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, { 
            height: "100px", 
            backgroundColor: "transparent",
            backdropFilter: "blur(0px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0)",
            duration: 0.5,
            ease: "expo.out"
          });
        }
      });

      // Interactive hover scaling for interactive elements
      const interactiveElements = document.querySelectorAll('button, a:not(.no-gsap), .group');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
          document.body.classList.remove('cursor-hover');
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-brand-blue font-sans selection:bg-brand-gold selection:text-brand-blue">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={followerRef} className="custom-cursor-follower hidden md:block" />

      {/* Navigation */}
      <nav 
        ref={navRef}
        className="fixed top-0 w-full z-50 flex items-center px-6 h-[100px] transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-[2px] shadow-2xl">
              <span className="text-brand-blue font-display font-black text-lg leading-none">B</span>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-display font-black text-[20px] tracking-tight text-white leading-none">
                BULK
              </h1>
              <p className="text-[7px] uppercase tracking-[0.2em] font-medium text-white/50 leading-none mt-[2px]">
                WHOLESALES & SUPERMARKET
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-10">
            {['Home', 'Wholesale', 'Beverages', 'Beauty', 'Groceries', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-brand-gold after:transition-all hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-6">
             <div className="hidden md:flex items-center space-x-6 border-r border-white/10 pr-6 mr-1">
                <Search className="w-4 h-4 cursor-pointer text-white/60 hover:text-white transition-colors" />
                <div className="relative">
                  <ShoppingCart className="w-4 h-4 cursor-pointer text-white/60 hover:text-white transition-colors" />
                </div>
             </div>
             <button className="bg-transparent border border-[#c5a059] text-white px-8 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-brand-gold hover:text-brand-blue">
                SHOP NOW
             </button>
             <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-brand-blue flex items-center justify-center p-6"
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col items-center space-y-10">
              {['Home', 'Wholesale', 'Beverages', 'Beauty', 'Groceries', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl md:text-6xl font-display font-medium text-white hover:italic transition-all tracking-tighter"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section 
        id="home" 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-blue"
      >
        <div 
          ref={bgRef}
          className="absolute inset-0 z-0 scale-110"
        >
          <img 
            src={IMAGES.hero} 
            alt="BULK XPRESS Cinematic Supermarket"
            className="w-full h-full object-cover"
          />
          {/* Deep Blue Cinematic Overlay */}
          <div className="absolute inset-0 bg-[#002366]/65 mix-blend-multiply" />
          <div className="absolute inset-0 vignette-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002366]/40 via-transparent to-[#002366]" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="hero-subtitle mb-6">
            <span className="text-brand-gold text-[10px] sm:text-[11px] font-black uppercase tracking-[0.6em] brightness-125">
              LAGOS ISLAND'S CHOICE
            </span>
          </div>
          
          <h2 className="text-[65px] sm:text-[145px] font-display font-extrabold text-white leading-[0.8] tracking-tighter mb-10">
            <span className="hero-text-line">
              <span className="art-of block">The Art of</span>
            </span>
            <span className="hero-text-line">
              <span className="wholesale-word block wholesale-text py-2">Wholesale</span>
            </span>
            <span className="hero-text-line">
              <span className="excellence-word block">Excellence</span>
            </span>
          </h2>

          <p className="hero-description text-[13px] sm:text-[15px] text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed font-normal px-4">
            Lagos Island's premier supply hub for premium supermarket staples and bulk essentials, delivered with Xpress efficiency from the heart of Sandgrouse.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 px-6">
            <button className="hero-cta group w-full sm:w-auto text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] btn-blue-glow transition-all flex items-center justify-center gap-3">
              SHOP WHOLESALE <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="hero-cta w-full sm:w-auto text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] btn-outline-gold transition-all">
              VIEW SUPERMARKET
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30">
          <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent animate-pulse" />
        </div>
      </section>

      {/* Product Categories Section */}
      <section id="wholesale" className="py-24 sm:py-32 bg-brand-blue relative px-6 sm:px-12 flex flex-col items-center">
        <div className="max-w-[1400px] w-full mb-16">
          <div className="flex items-center gap-8">
             <div className="h-[1px] bg-white/10 flex-grow"></div>
             <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-black">Shop by Category</p>
             <div className="h-[1px] bg-white/10 flex-grow"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 w-full max-w-[1400px]">
          {[
            { name: "BEVERAGES", cat: "Premium Water & Juices", img: IMAGES.drinks, delay: "0" },
            { name: "BEAUTY CARE", cat: "Artisanal Soaps & Lotion Creams", img: IMAGES.lotions, delay: "100" },
            { name: "GROCERIES", cat: "Fresh Grains & Stall Staples", img: IMAGES.grains, delay: "200" },
            { name: "FRESH PRODUCE", cat: "Sandgrouse's Finest Harvest", img: IMAGES.produce, delay: "300" },
            { name: "HOME CARE", cat: "Cleaning & Laundry Essentials", img: IMAGES.homecare, delay: "400" },
            { name: "QUICK SNACKS", cat: "Imported & Local Favorites", img: IMAGES.hero, delay: "500" }
          ].map((item) => (
            <div
              key={item.name}
              data-aos="fade-up"
              data-aos-delay={item.delay}
              className="group cursor-pointer relative"
            >
              <div className="relative h-[450px] overflow-hidden rounded-[2.5rem] transition-all duration-1000 ease-in-out shadow-2xl border border-white/5">
                <img 
                  src={item.img} 
                  alt={`${item.name} - BULK XPRESS`}
                  className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1500ms] ease-out"
                />
                <div className="absolute inset-0 bg-brand-navy/50 group-hover:bg-brand-navy/20 transition-all duration-700" />
                <div className="absolute inset-x-0 bottom-0 p-10">
                  <p className="text-white/50 text-[9px] font-black uppercase tracking-[0.3em] mb-2">{item.cat}</p>
                  <h3 className="text-white font-display text-[32px] font-extrabold tracking-tight leading-none uppercase">{item.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advantage Section */}
      <section className="bg-brand-navy py-40 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-white/5 rounded-full blur-[150px] opacity-30" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-32" data-aos="fade-up">
            <span className="text-white/30 font-bold text-[11px] uppercase tracking-[0.5em] mb-6 block">The BULK XPRESS Edge</span>
            <h2 className="text-white font-display text-5xl md:text-8xl font-extrabold mb-10 tracking-tighter uppercase">
              The <span className="font-light italic text-white/50">Lagos Island</span> Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            {[
              { 
                icon: <Truck className="w-10 h-10" />, 
                title: "Xpress Delivery", 
                desc: "Optimized logistics via Sandgrouse market hubs for guaranteed 2-hour shipping across Lagos Island districts." 
              },
              { 
                icon: <TrendingDown className="w-10 h-10" />, 
                title: "Wholesale Value", 
                desc: "Direct-from-manufacturer pricing, passed straight to your household or business for maximum savings." 
              },
              { 
                icon: <ShieldCheck className="w-10 h-10" />, 
                title: "Premium Quality", 
                desc: "From premium lotion creams to vetted grocery staples, we only stock genuine brands you trust." 
              }
            ].map((feature, idx) => (
              <div
                key={feature.title}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
                className="group text-center"
              >
                <div className="w-24 h-24 mx-auto bg-white/5 border border-white/10 shadow-2xl rounded-3xl flex items-center justify-center text-white mb-10 group-hover:bg-brand-gold group-hover:text-brand-blue group-hover:scale-110 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-white font-display text-2xl font-bold mb-6 tracking-tight uppercase">{feature.title}</h3>
                <p className="text-white/40 leading-relaxed font-light text-base max-w-xs mx-auto">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-50 pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 mb-32">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-10">
                <div className="w-12 h-12 bg-brand-blue flex items-center justify-center rounded-2xl shadow-xl">
                  <span className="text-white font-display font-bold text-2xl">B</span>
                </div>
                <h3 className="font-display font-bold text-3xl tracking-tighter text-brand-blue">
                  BULK XPRESS
                </h3>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed mb-12 max-w-sm font-medium">
                Lagos Island's premier supply hub bridging global brands with local supermarket convenience. Wholesale excellence, delivered Xpress.
              </p>
              <div className="flex space-x-6">
                {['fb', 'ig', 'tw'].map(s => (
                  <div key={s} className="w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-brand-blue hover:text-white hover:border-brand-blue cursor-pointer transition-all duration-500">
                    <span className="text-xs font-bold uppercase">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <h4 className="font-display font-bold text-slate-900 mb-10 uppercase tracking-[0.4em] text-[10px]">Aisles</h4>
              <ul className="space-y-6">
                {['Beverages', 'Lotion Creams', 'Grains & Pasta', 'Skin Care', 'Cleaning'].map(item => (
                  <li key={item} className="text-slate-400 text-sm hover:text-brand-blue transition-colors cursor-pointer font-medium">{item}</li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 pl-0 lg:pl-10">
              <h4 className="font-display font-bold text-slate-900 mb-10 uppercase tracking-[0.4em] text-[10px]">Lagos Island Hub</h4>
              <div className="space-y-10">
                <div className="flex items-start gap-4">
                  <MapPin size={24} className="text-brand-blue flex-shrink-0 mt-1" />
                  <p className="text-slate-500 text-lg leading-relaxed font-medium">
                    42 Sandgrouse Market Road,<br />
                    Lagos Island, Lagos, Nigeria.
                  </p>
                </div>
                <div className="pt-8 border-t border-slate-200 flex items-center gap-8">
                  <div>
                    <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Xpress Line</p>
                    <p className="text-brand-blue font-bold text-xl">+234 800 BULK XPR</p>
                  </div>
                  <div className="w-[1px] h-10 bg-slate-200" />
                  <div>
                    <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Inquiries</p>
                    <p className="text-brand-blue font-bold text-lg">hello@bulkxpress.co</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-slate-400 text-[9px] uppercase font-bold tracking-[0.5em]">
              © {new Date().getFullYear()} Bulk Xpress Wholesales & Supermarket. All rights reserved.
            </p>
            <div className="flex space-x-12">
              <span className="text-slate-300 text-[9px] uppercase font-bold tracking-[0.4em] italic leading-none">Wholesale Excellence. Xpress Delivery.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


