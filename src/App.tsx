import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Activity,
  ShieldCheck,
  TrendingUp,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Award,
  Zap,
  Clock,
  User,
  Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Mock Data ---

const DATA = {
  overview: {
    lineName: "IGBT 自动化封装线 A-04",
    manager: "张建国 (Zhang Jianguo)",
    status: "运行中",
    currentOrder: "WO-20260304-082",
    uptime: "98.5%",
    efficiency: "94.2%"
  },
  production: {
    cumulative: 1284567,
    dailyGoal: 5000,
    dailyActual: 3842
  },
  safety: {
    daysSinceAccident: 3652, // Over 10 years
    lastAccidentDate: "2016-03-01",
    safetyLevel: "AAA",
    records: "近10年无重大人身/生产安监事故"
  },
  improvements: [
    { year: 2022, title: "视觉检测系统AI升级", award: "精益生产一等奖" },
    { year: 2023, title: "真空焊接炉能效优化", award: "技术创新突破奖" },
    { year: 2024, title: "AGV自动补料调度算法", award: "数字化转型标杆" },
    { year: 2025, title: "全生命周期质量溯源平台", award: "卓越质量贡献奖" }
  ],
  plan2026: [
    { goal: "全线数字化孪生实时监控", detail: "实现毫秒级延迟的虚拟工厂映射" },
    { goal: "零缺陷(Zero-Defect)制造转型", detail: "引入预测性质量控制模型" },
    { goal: "产线碳足迹智能追踪系统", detail: "响应绿色制造国家战略" }
  ]
};

// --- Components ---

const SlideWrapper: React.FC<{ children: React.ReactNode; title: string; icon: React.ElementType }> = ({ children, title, icon: Icon }) => (
  <div className="h-full w-full flex flex-col p-8 bg-[#0A0A0B] text-[#E0E0E0] border border-[#1A1A1C] shadow-2xl relative overflow-hidden">
    {/* Background Decorative Elements */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent opacity-50" />
    <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#00F5FF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

    <header className="flex justify-between items-end mb-12 relative z-10">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[#1A1A1C] border border-[#333] rounded-lg">
          <Icon className="w-8 h-8 text-[#00F5FF]" />
        </div>
        <div>
          <h2 className="text-4xl font-black tracking-tighter uppercase italic text-[#00F5FF]">{title}</h2>
          <p className="text-xs tracking-[0.3em] text-[#666] uppercase mt-1">Industrial Intelligence / Real-time Data</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-mono font-bold text-[#FF6B00]">14:35:22</div>
        <div className="text-[10px] tracking-widest text-[#444] uppercase">2026.03.04 WED</div>
      </div>
    </header>

    <main className="flex-1 relative z-10">
      {children}
    </main>

    <footer className="mt-8 flex justify-between items-center text-[10px] tracking-widest text-[#333] uppercase border-t border-[#1A1A1C] pt-4">
      <div>DeepMind Industrial Solution v4.5</div>
      <div>Status: Connected / High Priority Sync</div>
    </footer>
  </div>
);

const LineOverview = () => (
  <SlideWrapper title="Line Overview" icon={Activity}>
    <div className="grid grid-cols-2 gap-8 h-full">
      <div className="space-y-6">
        <div className="bg-[#111] border-l-4 border-[#00F5FF] p-6">
          <label className="text-xs text-[#555] block mb-2 uppercase tracking-widest">Line Identity</label>
          <div className="text-3xl font-bold">{DATA.overview.lineName}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#111] p-4 border border-[#222]">
            <label className="text-[10px] text-[#555] block mb-1 uppercase tracking-widest">Manager</label>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#00F5FF]" />
              <span className="font-semibold">{DATA.overview.manager}</span>
            </div>
          </div>
          <div className="bg-[#111] p-4 border border-[#222]">
            <label className="text-[10px] text-[#555] block mb-1 uppercase tracking-widest">Status</label>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-semibold text-green-500">{DATA.overview.status}</span>
            </div>
          </div>
        </div>
        <div className="bg-[#111] p-6 border border-[#222] relative overflow-hidden group">
          <div className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-12 transition-transform group-hover:scale-110">
            <Hash size={120} />
          </div>
          <label className="text-xs text-[#555] block mb-2 uppercase tracking-widest">Current Job Order</label>
          <div className="text-4xl font-mono text-[#00F5FF]">{DATA.overview.currentOrder}</div>
        </div>
      </div>
      <div className="grid grid-rows-2 gap-6">
        <div className="bg-[#111] border border-[#222] p-6 flex flex-col justify-center items-center relative">
          <div className="text-6xl font-black text-[#E0E0E0]">{DATA.overview.uptime}</div>
          <div className="text-xs text-[#555] mt-2 uppercase tracking-[0.2em]">Overall Uptime</div>
          <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-[#00F5FF]/10 to-transparent" />
        </div>
        <div className="bg-[#111] border border-[#222] p-6 flex flex-col justify-center items-center relative">
          <div className="text-6xl font-black text-[#FF6B00]">{DATA.overview.efficiency}</div>
          <div className="text-xs text-[#555] mt-2 uppercase tracking-[0.2em]">OEE Efficiency</div>
          <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-[#FF6B00]/10 to-transparent" />
        </div>
      </div>
    </div>
  </SlideWrapper>
);

const ProductionCounter = () => {
  const [count, setCount] = useState(DATA.production.cumulative - 100);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SlideWrapper title="Cumulative Output" icon={TrendingUp}>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-[12rem] font-black font-mono leading-none tracking-tighter text-[#E0E0E0] relative">
          {count.toLocaleString()}
          <div className="absolute -top-8 right-0 text-sm font-bold text-[#00F5FF] flex items-center gap-1">
            <TrendingUp size={16} /> +12.4% vs LAST MONTH
          </div>
        </div>
        <div className="w-2/3 h-4 bg-[#111] border border-[#222] mt-12 overflow-hidden rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(DATA.production.dailyActual / DATA.production.dailyGoal) * 100}%` }}
            className="h-full bg-gradient-to-r from-[#00F5FF] to-[#00A3FF]"
          />
        </div>
        <div className="flex justify-between w-2/3 mt-4">
          <div className="text-left">
            <span className="text-[10px] text-[#555] block">DAILY ACTUAL</span>
            <span className="text-2xl font-bold">{DATA.production.dailyActual}</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-[#555] block">PROGRESS</span>
            <span className="text-2xl font-bold">{Math.round((DATA.production.dailyActual / DATA.production.dailyGoal) * 100)}%</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#555] block">DAILY GOAL</span>
            <span className="text-2xl font-bold">{DATA.production.dailyGoal}</span>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
};

const SafetyRecord = () => (
  <SlideWrapper title="Safety Excellence" icon={ShieldCheck}>
    <div className="grid grid-cols-5 gap-8 h-full items-center">
      <div className="col-span-3 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1C] border border-[#333] rounded-full w-fit mb-6">
          <div className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping" />
          <span className="text-xs font-bold text-[#FF6B00] tracking-widest">CRITICAL SAFETY MONITOR</span>
        </div>
        <h3 className="text-4xl font-bold mb-4">连续安全生产天数</h3>
        <div className="text-[10rem] font-black font-mono text-[#00F5FF] leading-none mb-4">
          {DATA.safety.daysSinceAccident}
        </div>
        <div className="p-6 bg-[#111] border-l-4 border-[#FF6B00] max-w-xl">
          <p className="text-xl text-[#AAA] leading-relaxed italic">
            "{DATA.safety.records}"
          </p>
          <div className="mt-4 flex gap-8">
            <div>
              <span className="text-[10px] text-[#555] block uppercase">Safety Grade</span>
              <span className="text-2xl font-bold text-white">{DATA.safety.safetyLevel}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#555] block uppercase">Zero Incident Since</span>
              <span className="text-2xl font-bold text-white">{DATA.safety.lastAccidentDate}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <div className="relative">
          <div className="w-80 h-80 rounded-full border-8 border-[#1A1A1C] flex items-center justify-center relative">
            <ShieldCheck size={160} className="text-[#00F5FF] opacity-20 absolute" />
            <div className="text-center z-10">
              <div className="text-7xl font-black italic">10Y+</div>
              <div className="text-xs text-[#555] tracking-widest uppercase">Safe Record</div>
            </div>
            {/* Pulsing decorative rings */}
            <div className="absolute inset-0 rounded-full border border-[#00F5FF] opacity-20 animate-ping" style={{ animationDuration: '3s' }} />
          </div>
        </div>
      </div>
    </div>
  </SlideWrapper>
);

const ImprovementTimeline = () => (
  <SlideWrapper title="Quality Journey" icon={Award}>
    <div className="relative h-full py-12 px-20">
      {/* Central Line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#222]" />

      <div className="space-y-24">
        {DATA.improvements.map((item, index) => (
          <div key={item.year} className={`flex items-center gap-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
            <div className={`flex-1 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
              <div className="text-5xl font-black text-[#00F5FF] mb-2">{item.year}</div>
              <div className="text-2xl font-bold text-white mb-2">{item.title}</div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1C] border border-[#333] rounded">
                <Award size={14} className="text-[#FF6B00]" />
                <span className="text-xs text-[#AAA] uppercase tracking-widest">{item.award}</span>
              </div>
            </div>
            <div className="relative z-10">
              <div className="w-6 h-6 rounded-full bg-[#0A0A0B] border-4 border-[#00F5FF] flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            <div className="flex-1" />
          </div>
        ))}
      </div>
    </div>
  </SlideWrapper>
);

const Plan2026 = () => (
  <SlideWrapper title="2026 Future Roadmap" icon={Zap}>
    <div className="grid grid-cols-3 gap-8 h-full items-center">
      {DATA.plan2026.map((item, index) => (
        <div key={index} className="bg-[#111] border border-[#222] p-8 h-[400px] flex flex-col justify-between group hover:border-[#00F5FF] transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
            <div className="text-9xl font-black italic">{index + 1}</div>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#1A1A1C] border border-[#333] flex items-center justify-center rounded-lg mb-8 text-[#00F5FF]">
              <Zap size={24} />
            </div>
            <h3 className="text-3xl font-black mb-6 leading-tight uppercase italic">{item.goal}</h3>
          </div>
          <div className="bg-[#1A1A1C] p-4 border-l-2 border-[#FF6B00]">
            <p className="text-[#777] leading-relaxed">
              {item.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  </SlideWrapper>
);

// --- Main App ---

export default function EKanbanApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [intervalTime, setIntervalTime] = useState(10); // seconds
  const [isLocked, setIsLocked] = useState(false);

  const slides = useMemo(() => [
    <LineOverview />,
    <ProductionCounter />,
    <SafetyRecord />,
    <ImprovementTimeline />,
    <Plan2026 />
  ], []);

  const nextSlide = useCallback(() => {
    if (!isLocked) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  }, [isLocked, slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying && !isLocked) {
      timer = setInterval(nextSlide, intervalTime * 1000);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [isPlaying, intervalTime, nextSlide, isLocked]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col font-sans select-none cursor-crosshair">
      {/* Top Progress Bar */}
      <div className="h-1 bg-[#1A1A1C] w-full flex">
        {slides.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-full relative"
          >
            <motion.div
              className={`h-full ${i === currentSlide ? 'bg-[#00F5FF]' : 'bg-transparent'}`}
              initial={false}
              animate={{
                width: i === currentSlide && isPlaying && !isLocked ? '100%' : '100%',
                opacity: i === currentSlide ? 1 : 0
              }}
              transition={{ duration: intervalTime, ease: "linear" }}
            />
          </div>
        ))}
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="absolute inset-0"
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Overlay - Hidden by default, visible on hover at bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center gap-6 bg-black/80 backdrop-blur-md border border-[#333] px-8 py-4 rounded-2xl z-50">
        <button onClick={prevSlide} className="text-[#666] hover:text-[#00F5FF]"><ChevronLeft size={24} /></button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full bg-[#1A1A1C] flex items-center justify-center text-white hover:bg-[#333]"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={nextSlide} className="text-[#666] hover:text-[#00F5FF]"><ChevronRight size={24} /></button>

        <div className="w-px h-8 bg-[#333]" />

        <div className="flex items-center gap-4">
          <label className="text-[10px] text-[#555] uppercase tracking-widest">Interval</label>
          <select
            value={intervalTime}
            onChange={(e) => setIntervalTime(Number(e.target.value))}
            className="bg-[#111] border border-[#333] text-xs px-2 py-1 outline-none"
          >
            <option value={5}>5s</option>
            <option value={10}>10s</option>
            <option value={20}>20s</option>
            <option value={60}>60s</option>
          </select>
        </div>

        <button
          onClick={() => setIsLocked(!isLocked)}
          className={`flex items-center gap-2 px-4 py-2 border rounded transition-colors ${isLocked ? 'border-[#FF6B00] text-[#FF6B00]' : 'border-[#333] text-[#666]'}`}
        >
          <Settings size={16} />
          <span className="text-[10px] uppercase font-bold tracking-widest">{isLocked ? 'PINNED' : 'AUTO'}</span>
        </button>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-1 transition-all duration-500 ${i === currentSlide ? 'h-12 bg-[#00F5FF]' : 'h-4 bg-[#333] hover:bg-[#666]'}`}
          />
        ))}
      </div>
    </div>
  );
}
