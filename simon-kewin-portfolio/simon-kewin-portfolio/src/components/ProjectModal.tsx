import React, { useEffect } from "react";
import { X, ArrowUpRight, Github, ExternalLink, Target, Cpu, Workflow, Award, ShieldCheck, HelpCircle, Globe, Instagram, Mail, MessageCircle, Play, Pause, Volume2, VolumeX, Heart, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../data";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

function getGoogleDriveDirectLink(url: string) {
  if (url.includes("drive.google.com")) {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `/api/video-proxy?id=${match[1]}`;
    }
  }
  return url;
}

interface ReelCardProps {
  url: string;
  initialLikes: number;
  initialComments: number;
}

function ReelCard({ url, initialLikes, initialComments }: ReelCardProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [likes, setLikes] = React.useState(initialLikes);
  const [isLiked, setIsLiked] = React.useState(false);
  const [showHeartAnim, setShowHeartAnim] = React.useState(false);
  const [showShareToast, setShowShareToast] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [showPlayOverlay, setShowPlayOverlay] = React.useState(false);

  const getDriveId = (rawUrl: string) => {
    if (rawUrl.includes("drive.google.com")) {
      const match = rawUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || rawUrl.match(/id=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return match[1];
      }
    }
    return "";
  };

  const driveId = getDriveId(url);
  const directLink = driveId 
    ? `/api/video-proxy?id=${driveId}`
    : url;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log("Autoplay of Google Drive reel failed or blocked:", err);
          setIsPlaying(false);
        });
      }
    }
  }, [url]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
      setShowPlayOverlay(true);
      setTimeout(() => setShowPlayOverlay(false), 600);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 800);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      setShowHeartAnim(true);
      setTimeout(() => setShowHeartAnim(false), 800);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  };

  return (
    <div 
      onClick={togglePlay}
      onDoubleClick={handleDoubleClick}
      className="relative aspect-[9/16] bg-black rounded-3xl overflow-hidden border border-border-custom shadow-lg group select-none cursor-pointer"
    >
      <video
        key={directLink}
        ref={videoRef}
        src={directLink}
        loop
        playsInline
        autoPlay
        muted
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Play/Pause state center overlay indicator */}
      <AnimatePresence>
        {showPlayOverlay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          >
            <div className="p-4 rounded-full bg-black/60 text-white backdrop-blur-sm">
              {isPlaying ? (
                <Play className="w-8 h-8 fill-white translate-x-0.5" />
              ) : (
                <Pause className="w-8 h-8 fill-white" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Big Heart Animation */}
      <AnimatePresence>
        {showHeartAnim && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-35"
          >
            <Heart className="w-20 h-20 text-red-500 fill-red-500 drop-shadow-xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle overlay gradient to ensure action icons are readable */}
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/40 to-transparent pointer-events-none z-10" />

      {/* Action Column on Right */}
      <div className="absolute right-4 bottom-6 flex flex-col gap-4 items-center z-20">
        {/* Like */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center gap-1 pointer-events-auto group/action"
        >
          <div className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${isLiked ? 'bg-red-500 border-red-500 text-white scale-110' : 'bg-black/40 border-white/10 text-white hover:bg-red-500 hover:border-red-500'}`}>
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
          </div>
          <span className="text-[10px] text-white/90 font-bold tracking-tight drop-shadow font-mono">
            {likes}
          </span>
        </button>

        {/* Comment */}
        <div className="flex flex-col items-center gap-1">
          <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white cursor-default">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="text-[10px] text-white/90 font-bold tracking-tight drop-shadow font-mono">
            {initialComments}
          </span>
        </div>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1 pointer-events-auto"
        >
          <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-primary-accent hover:border-primary-accent transition-all">
            <Share2 className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] text-white/90 font-bold tracking-tight drop-shadow font-mono">
            Share
          </span>
        </button>
      </div>

      {/* Copy link overlay toast */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 left-4 right-4 bg-primary-accent/95 backdrop-blur-md text-white text-center py-2 px-3 rounded-xl text-[11px] font-bold tracking-wide shadow-xl border border-white/10 z-30"
          >
            Reel Link Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6" id="project-case-study-modal-overlay">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#111111]/80 backdrop-blur-md cursor-crosshair"
          />

          {/* Modal Card content wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full h-full sm:h-[90vh] max-w-[1000px] bg-warm-bg rounded-none sm:rounded-3xl border border-border-custom/50 shadow-2xl flex flex-col overflow-hidden z-10"
            id={`modal-case-study-${project.id}`}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-warm-bg/90 backdrop-blur-md z-20 px-6 sm:px-10 py-5 border-b border-border-custom flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-widest text-primary-accent uppercase">{project.category}</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary-text">{project.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-3 rounded-full bg-primary-text/5 hover:bg-primary-accent hover:text-pure-white transition-all duration-300 cursor-pointer"
                id="btn-close-modal"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 space-y-12">
              
              {/* Cover Image & Quick Highlights */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Thumbnail */}
                <div className="lg:col-span-2 relative h-[250px] sm:h-[350px] rounded-2xl overflow-hidden bg-primary-text/5 border border-border-custom shadow-inner">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {project.id !== "revengine-dashboard" && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary-accent text-pure-white text-xs font-bold tracking-wider rounded-full uppercase shadow-md">
                      Active Solution
                    </div>
                  )}
                </div>

                {/* KPI Sidebar details */}
                <div className="bg-pure-white rounded-2xl p-6 border border-border-custom/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-secondary-text mb-2">Primary Impact Metric</h4>
                    <div className="text-3xl font-black text-primary-accent tracking-tighter mb-4">
                      {project.metrics}
                    </div>
                    <div className="space-y-4 border-t border-border-custom pt-4">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-bold text-secondary-text block">Domain</span>
                        <span className="text-sm font-semibold text-primary-text">{project.domain || project.category}</span>
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-bold text-secondary-text block">
                          {project.id === "revengine-dashboard" ? "Skills" : "Build Technologies"}
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-warm-bg text-primary-text text-[11px] font-semibold rounded border border-border-custom">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2 mt-6">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 bg-primary-accent hover:bg-hover-accent text-pure-white text-xs font-bold uppercase tracking-widest rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                      >
                        Live Demo
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 bg-dark-bg hover:bg-primary-accent text-pure-white text-xs font-bold uppercase tracking-widest rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        Source Code
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Comprehensive Summary Description */}
              <div className="space-y-4">
                <h4 className="text-sm font-extrabold uppercase tracking-widest text-primary-text border-l-4 border-primary-accent pl-3">
                  {project.id === "revengine-dashboard" ? "introduction" : "Case Introduction"}
                </h4>
                <p className="text-lg leading-relaxed text-secondary-text font-medium">
                  {project.longDescription}
                </p>
              </div>

              {/* Case Study Deep Dive: Problem vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Problem */}
                <div className="p-6 bg-pure-white border border-border-custom rounded-2xl space-y-3 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-2 text-red-500">
                    <Target className="w-5 h-5" />
                    <h5 className="font-bold text-sm uppercase tracking-wide">The Challenge</h5>
                  </div>
                  <p className="text-sm leading-relaxed text-secondary-text">
                    {project.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="p-6 bg-pure-white border border-border-custom rounded-2xl space-y-3 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-2 text-emerald-500">
                    <ShieldCheck className="w-5 h-5" />
                    <h5 className="font-bold text-sm uppercase tracking-wide">
                      {project.id === "revengine-dashboard" ? "solution" : "The Architecture"}
                    </h5>
                  </div>
                  <p className="text-sm leading-relaxed text-secondary-text">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Company Channels (Website, Instagram, Email, WhatsApp) */}
              {project.id === "revengine-dashboard" && (
                <div className="p-6 bg-pure-white border border-border-custom rounded-2xl space-y-4 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-accent/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-2 text-primary-accent">
                    <Workflow className="w-5 h-5" />
                    <h5 className="font-bold text-sm uppercase tracking-wide">Official Channels & Contact</h5>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                    {/* Website */}
                    <a
                      href="https://gonautika.com/?gad_source=1&gad_campaignid=22782784722&gbraid=0AAAAA-fRMq7DAjd6dFbFwjisSu45FneBB&gclid=Cj0KCQjw9ZLSBhCcARIsAEhGKgOmy_w06tth-9rXKp01F7my_h9H-63NCklbhD-U-4QBtpY_nYoXf3AaAp2mEALw_wcB"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-warm-bg hover:bg-primary-accent/5 rounded-xl border border-border-custom transition-all group cursor-pointer"
                    >
                      <div className="p-2 bg-primary-accent/10 rounded-lg text-primary-accent group-hover:scale-110 transition-transform">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-secondary-text block">Website</span>
                        <span className="text-xs font-semibold text-primary-text truncate block">gonautika.com</span>
                      </div>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/gonautika_official/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-warm-bg hover:bg-primary-accent/5 rounded-xl border border-border-custom transition-all group cursor-pointer"
                    >
                      <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500 group-hover:scale-110 transition-transform">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-secondary-text block">Instagram</span>
                        <span className="text-xs font-semibold text-primary-text truncate block">@gonautika_official</span>
                      </div>
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:info@gonautika.com"
                      className="flex items-center gap-3 p-3 bg-warm-bg hover:bg-primary-accent/5 rounded-xl border border-border-custom transition-all group cursor-pointer"
                    >
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 group-hover:scale-110 transition-transform">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-secondary-text block">Email</span>
                        <span className="text-xs font-semibold text-primary-text truncate block">info@gonautika.com</span>
                      </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/918348821000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-warm-bg hover:bg-primary-accent/5 rounded-xl border border-border-custom transition-all group cursor-pointer"
                    >
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-secondary-text block">WhatsApp</span>
                        <span className="text-xs font-semibold text-primary-text truncate block">Chat Support</span>
                      </div>
                    </a>
                  </div>
                </div>
              )}

              {/* Playable Video Reels Showcase */}
              {project.id === "revengine-dashboard" && (
                <div className="space-y-6">
                  <div className="border-l-4 border-primary-accent pl-3 text-left">
                    <h4 className="text-sm font-extrabold uppercase tracking-widest text-primary-text">
                      Playable Campaign Reels
                    </h4>
                    <p className="text-xs text-secondary-text mt-1 font-medium">
                      High-performing short-form creative directions designed for GoNautika. Click once to play/pause, double-click to like!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4 justify-items-center">
                    <div className="w-full max-w-[280px]">
                      <ReelCard
                        url="https://drive.google.com/file/d/10_Erd7uYft1ay9F-3Gh6GEvwbRgiKZxr/view?usp=sharing"
                        initialLikes={1240}
                        initialComments={89}
                      />
                    </div>
                    <div className="w-full max-w-[280px]">
                      <ReelCard
                        url="https://drive.google.com/file/d/1vKcXfGoVg1we94SYHKeu4NnzMm9CDjMK/view?usp=sharing"
                        initialLikes={1420}
                        initialComments={104}
                      />
                    </div>
                    <div className="w-full max-w-[280px]">
                      <ReelCard
                        url="https://drive.google.com/file/d/1sD3UbE9HoIIuQnObFFzB86-reau6r8LD/view?usp=sharing"
                        initialLikes={985}
                        initialComments={72}
                      />
                    </div>
                    <div className="w-full max-w-[280px]">
                      <ReelCard
                        url="https://drive.google.com/file/d/1hweiyMleXdhTaNkDaWIm9KzGik8KJOEc/view?usp=sharing"
                        initialLikes={1150}
                        initialComments={83}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Case Study Deep Dive: Process vs Outcome */}
              {project.id !== "revengine-dashboard" && (
                <div className="space-y-6">
                  {/* Process */}
                  <div className="p-8 bg-pure-white border border-border-custom rounded-2xl space-y-4 shadow-sm">
                    <div className="flex items-center gap-2 text-primary-accent">
                      <Cpu className="w-5 h-5" />
                      <h5 className="font-bold text-base uppercase tracking-wider">Implementation Methodology & Workflow</h5>
                    </div>
                    <p className="text-sm leading-relaxed text-secondary-text">
                      {project.process}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="p-8 bg-dark-bg text-pure-white border border-white/5 rounded-2xl space-y-4 shadow-xl relative overflow-hidden">
                    <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-primary-accent/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="flex items-center gap-2 text-primary-accent">
                      <Award className="w-5 h-5" />
                      <h5 className="font-bold text-base uppercase tracking-wider">Quantifiable Business Outcome</h5>
                    </div>
                    <p className="text-sm leading-relaxed text-white/80">
                      {project.outcome}
                    </p>
                  </div>
                </div>
              )}

              {/* Lessons Learned */}
              {project.id !== "revengine-dashboard" && (
                <div className="p-6 bg-primary-accent/5 border border-primary-accent/15 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-primary-accent">
                    <HelpCircle className="w-5 h-5" />
                    <h5 className="font-bold text-sm uppercase tracking-wider">Engineering Retrospective</h5>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-secondary-text font-medium">
                    {project.lessonsLearned}
                  </p>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-warm-bg px-6 sm:px-10 py-4 border-t border-border-custom/50 flex items-center justify-between text-xs text-secondary-text">
              <span>Simon Kewin Portfolio &copy; 2026</span>
              <span>Crafted in modern React</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
