// pages/NewLandingPage.tsx
import { DomainsCarousel } from "@/components/new-ui/DomainsCarousel";
import FloatingNavbar from "@/components/new-ui/FloatingNavbar";
import Footer from "@/components/new-ui/Footer";
import TestimonialsCarousel from "@/components/new-ui/TestimonialsCarousel";
import WhyPilotcrew from "@/components/new-ui/WhyPilotcrew";
import WhyPilotcrewMobile from "@/components/new-ui/WhyPilotecrewMobile";
import { useRef, useState } from "react";
import agent from "../assets/agent.png";
import backdropVideo from "../assets/backdrop-video-compressed.mp4";
import expert from "../assets/expert.png";
import fallbackImage from "../assets/fallback-image.png";
import butterfly from "../assets/logo.png";
import matchingJobs from "../assets/matching-jobs.png";
import quoteUp from "../assets/quote-up.png";

export default function NewLandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ——— Slider section state & refs ———
  const cards = [
    { title: "Expert Insights", subtitle: "Real‑world domain experts" },
    { title: "Global Talent",   subtitle: "Cost‑effective expert pool" },
    { title: "API Integration", subtitle: "Integrate via API for validation feedback" },
    { title: "GDPR Compliant",  subtitle: "Enterprise‑ready data handling" },
  ];

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#040713] overflow-x-hidden">
      {/* Top “spheres” */}
      <div className="absolute -top-16 -left-16 w-[400px] h-[400px] rounded-full bg-[#006FFF] blur-[550px] z-0" />
      <div className="absolute -top-16 -right-16 w-[400px] h-[400px] rounded-full bg-[#006FFF] blur-[550px] z-0" />

      {/* Navbars */}
      <FloatingNavbar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        desktopWrapperClassName="hidden lg:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[80vw] max-w-6xl"
        mobileWrapperClassName="lg:hidden w-full bg-transparent"
      />

      {/* Hero Section with Video Background and Text Overlay */}
      <div className="relative w-full h-[100vh] flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {/* Fallback Image */}
          <img
            src={fallbackImage}
            alt="Background"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-0' : 'opacity-70'
            }`}
            style={{ zIndex: 1 }}
          />
          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-90' : 'opacity-0'
            }`}
            preload="auto"
            onLoadedData={handleVideoLoad}
            style={{ zIndex: 2 }}
          >
            <source src={backdropVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Text Overlay */}
        <div className="relative z-10 flex flex-col items-center px-8 text-center">
          <h1 className="font-eudoxus-extrabold text-5xl md:text-6xl text-white leading-tight max-w-5xl">
            Validate Your AI with{" "}
            <span className="text-[#e9a855] font-eudoxus-extrabold">
              Real Human Expertise.
            </span>
          </h1>
          <p className="mt-8 text-white text-lg md:text-xl font-inter max-w-2xl">
            Pilotcrew.ai connects businesses building AI systems with qualified human reviewers
            to ensure accuracy, safety, and compliance.
          </p>
        </div>
      </div>

      {/* Clients & Experts */}
      <div className="w-full max-w-6xl mx-auto mt-12 md:mt-24 flex flex-col gap-12 px-8 md:px-4">
        {/* For Clients */}
        <div className="flex flex-col md:flex-row md:justify-between gap-12 px-0">
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="font-eudoxus-bold text-3xl mb-6 text-[#e9a855]">
              For Clients
            </h2>
            <ul className="text-white text-lg font-inter list-disc pl-4 space-y-3">
              <li>Submit your AI outputs and validation criteria</li>
              <li>Get matched with vetted domain experts</li>
              <li>Receive annotated, trustworthy feedback</li>
            </ul>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img
              src={agent}
              alt="Agent"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
        </div>
        {/* For Experts */}
        <div className="flex flex-col md:flex-row-reverse md:justify-between gap-12 px-0">
          <div className="flex-1 flex flex-col justify-center items-start text-left">
            <h2 className="font-eudoxus-bold text-3xl mb-6 text-[#e9a855]">
              For Experts
            </h2>
            <ul className="text-white text-lg font-inter list-disc pl-4 space-y-3">
              <li>Create a profile and get certified</li>
              <li>Get matched with AI validation jobs</li>
              <li>Earn income while ensuring ethical AI</li>
            </ul>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img
              src={expert}
              alt="Expert"
              className="w-full h-full object-contain"
              style={{ transform: 'scaleX(-1)' }}
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Domains carousel */}
      <div className="w-full overflow-hidden">
        <DomainsCarousel />
      </div>

      {/* Why Pilotcrew.ai? Slider */}
      <div className="block md:hidden">
        <WhyPilotcrewMobile cards={cards} />
      </div>
      <div className="hidden md:block">
        <WhyPilotcrew cards={cards} />
      </div>

      {/* Matching & Oversight System */}
      <section className="w-full max-w-8xl mx-auto mt-20 mb-10 md:mt-32 px-8 md:px-4 flex flex-col md:flex-row-reverse items-stretch gap-12">
        <div className="flex-1 md:w-1/4 md:flex md:items-center">
          <div>
            <h2 className="font-eudoxus-bold text-4xl text-white mb-6 text-center md:text-left">
              Matching &amp; Oversight System
            </h2>
            <p className="text-white text-lg text-center md:text-left">
              We use AI‑driven matching + human QA oversight to route tasks to the best
              validators.
            </p>
          </div>
        </div>
        <div className="flex-1 md:w-3/4 flex items-center justify-center hidden md:flex">
          <img
            src={matchingJobs}
            alt="Matching Jobs"
            className="w-full h-auto object-contain"
            draggable={false}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-6xl mx-auto mt-32 px-4 py-16">
        <h2 className="font-eudoxus-bold text-center text-4xl text-white mb-16">
          Testimonials
        </h2>
        <div>
          <TestimonialsCarousel quoteIcon={<img src={quoteUp} alt="Quote" className="w-14 h-14 ml-0" />} />
        </div>
      </section>

      {/* Metrics & Impact */}
      <section className="w-full max-w-6xl mx-auto mt-18 px-4 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left: 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-1">
          <div className="border border-white/20 rounded-xl p-8">
            <h3 className="font-eudoxus-bold text-3xl text-white mb-2">100K+</h3>
            <p className="text-white text-lg">outputs reviewed</p>
          </div>
          <div className="border border-white/20 rounded-xl p-8">
            <h3 className="font-eudoxus-bold text-3xl text-white mb-2">1200+</h3>
            <p className="text-white text-lg">expert validators onboarded</p>
          </div>
          <div className="border border-white/20 rounded-xl p-8">
            <h3 className="font-eudoxus-bold text-3xl text-white mb-2">97.8%</h3>
            <p className="text-white text-lg">validator agreement rate</p>
          </div>
          <div className="border border-white/20 rounded-xl p-8">
            <h3 className="font-eudoxus-bold text-3xl text-white mb-2">3.4&nbsp;hrs</h3>
            <p className="text-white text-lg">average turnaround</p>
          </div>
        </div>
        {/* Right: heading + butterfly */}
        <div className="flex-1 flex flex-col items-center justify-center mb-8 md:mb-0">
          <h2 className="font-eudoxus-bold text-4xl text-white mb-6 text-center md:text-left">
            Metrics &amp; Impact
          </h2>
          <img
            src={butterfly}
            alt="Butterfly"
            className="w-16 h-16"
            style={{ filter: "drop-shadow(0 0 15px rgba(233,168,85,0.6))" }}
          />
        </div>
      </section>

      {/* Resources / Blog */}
      <section className="w-full mt-32 flex flex-col items-center gap-8">
        <h2 className="font-eudoxus-bold text-4xl text-white text-center mb-8">
          Resources / Blog
        </h2>
        <div
          className="w-full flex justify-center items-center"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255, 216, 134, 0.3) 0%, #040713 100%)",
            minHeight: "260px",
          }}
        >
          <ul className="text-white font-eudoxus-medium text-lg md:text-xl list-disc list-inside space-y-6 max-w-2xl mx-auto" style={{ textShadow: '0 0.5px 4px #0004, 0 1px 1px #0003' }}>
            <li>AI Safety &amp; HITL Guidelines</li>
            <li>EU AI Act Explained</li>
            <li>RLHF vs. RLAIF</li>
            <li>Webinars & Whitepapers</li>
          </ul>
        </div>
      </section>

      {/* Empty footer */}
      <footer className="w-full h-28 md:h-[20vh]" />
      <Footer />
      <div style={{ height: '3vh' }} />
    </div>
  );
}
