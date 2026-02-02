
import React, { useState, useEffect, useRef } from 'react';
import { GroqService } from './services/groq';

// --- Utils ---
/**
 * Decodes base64 string to Uint8Array.
 */
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Encodes Uint8Array to base64 string.
 */
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Decodes raw PCM audio data into an AudioBuffer.
 */
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- Components ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-navy/95 py-4 shadow-2xl backdrop-blur-md' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 bg-gold-shiny rounded-lg flex items-center justify-center text-navy font-black text-2xl transform group-hover:rotate-12 transition-transform">F</div>
          <div>
            <span className={`text-2xl font-black tracking-tight block leading-none ${isScrolled || window.innerWidth < 768 ? 'text-white' : 'text-navy'}`}>FALCON GROUP</span>
            <span className="text-[10px] text-gold-shiny font-extrabold tracking-[0.4em] uppercase">International</span>
          </div>
        </div>
        <div className={`hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] ${isScrolled ? 'text-blue-100' : 'text-navy'}`}>
          <a href="#services" className="hover:text-gold-shiny transition-colors">Portfolio</a>
          <a href="#dna" className="hover:text-gold-shiny transition-colors">Philosophy</a>
          <a href="#advisor" className="hover:text-gold-shiny transition-colors">AI Advisor</a>
        </div>
        <button className="bg-gold-shiny text-navy px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
          Connect
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-gold-shiny opacity-[0.07] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-navy opacity-[0.05] rounded-full blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10 animate-in fade-in slide-in-from-left-10 duration-1000">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-navy text-white text-[10px] font-black tracking-[0.3em] uppercase border border-gold-shiny/30 shadow-lg">
            <span className="w-2 h-2 bg-gold-shiny rounded-full animate-pulse"></span>
            Sovereign Digital Infrastructure
          </div>
          <h1 className="text-7xl md:text-[92px] font-black text-navy leading-[0.85] tracking-tighter">
            Architecting <br />
            <span className="text-gold-shiny">The Invincible.</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed max-w-lg font-medium">
            Falcon Group International delivers elite-tier consulting for global enterprises. We secure digital sovereignty through uncompromising engineering and board-ready risk management.
          </p>
          <div className="flex flex-wrap gap-6 pt-6">
            <a href="#advisor" className="bg-navy text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-950 transition-all flex items-center gap-3 shadow-2xl gold-pulse-vibrant">
              Start AI Consultation
              <svg className="w-5 h-5 text-gold-shiny" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 014-4h.01a4 4 0 013.99 4z" /></svg>
            </a>
            <a href="#services" className="px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all">
              Our Services
            </a>
          </div>
        </div>
        
        <div className="relative floating">
          <div className="absolute inset-0 bg-gold-shiny rounded-[3rem] blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
              alt="Elite Cybersecurity" 
              className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10">
               <div className="p-6 glass-dark rounded-2xl border-gold-shiny/20">
                  <div className="text-3xl font-black text-gold-shiny mb-1">$2.4B+</div>
                  <p className="text-[10px] font-bold text-blue-100/70 uppercase tracking-widest">Client Assets Secured Yearly</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    { title: 'Cloud Infrastructure', icon: '☁️', desc: 'Landing zones and multi-cloud orchestration for high-compliance sectors.', usp: 'Sovereign-Grade Engineering.' },
    { title: 'Cybersecurity & Risk', icon: '🛡️', desc: 'Zero Trust architecture and proactive shield services for the modern threat landscape.', usp: 'Offensive Defense Mindset.' },
    { title: 'Digital Transformation', icon: '🚀', desc: 'Modernizing legacy core systems to be AI-ready and operationally autonomous.', usp: 'Scalable Innovation Cycles.' },
    { title: 'Managed Services', icon: '⚙️', desc: '24/7 sovereign-compliant operations with 99.999% availability guarantees.', usp: 'Invisible Excellence.' },
  ];

  return (
    <section id="services" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-gold-shiny font-black text-xs uppercase tracking-[0.4em] mb-4">Service Portfolio</h2>
            <h3 className="text-5xl md:text-6xl font-black text-navy tracking-tight leading-none">Engineering <br />Digital Resilience.</h3>
          </div>
          <p className="text-slate-500 font-medium max-w-sm">Detailed advisory frameworks built for CIOs, CISOs, and enterprise boards who demand uncompromising quality.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, idx) => (
            <div key={idx} className="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-gold-shiny hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500">
              <div className="text-5xl mb-8 bg-white w-20 h-20 flex items-center justify-center rounded-3xl shadow-sm group-hover:bg-gold-shiny transition-colors duration-500">{s.icon}</div>
              <h4 className="text-2xl font-black text-navy mb-3">{s.title}</h4>
              <p className="text-[10px] font-black text-gold-shiny uppercase tracking-[0.2em] mb-5">{s.usp}</p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AIAdvisor = () => {
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [synth, setSynth] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [interactionMode, setInteractionMode] = useState<'chat' | 'audio' | null>(null);
  const [conversationHistory, setConversationHistory] = useState<Array<{type: 'user' | 'ai', text: string}>>([]);

  const stopSession = () => {
    setIsLiveActive(false);
    setResponse("");
    setInputText("");
    setConversationHistory([]);
    setInteractionMode(null);
  };

  const startLiveSession = async () => {
    try {
      setError(null);
      if (!import.meta.env.VITE_GROQ_API_KEY) {
        setError("Groq API Key is missing. Get your free key at https://console.groq.com and add it to .env");
        return;
      }

      // Initialize speech recognition
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        setIsSpeechSupported(true);
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = async (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          setIsListening(false);
          
          // In audio mode, automatically send the query
          if (interactionMode === 'audio') {
            await processAudioQuery(transcript);
          }
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          setError('Speech recognition failed. Please try again.');
        };

        setRecognition(recognitionInstance);
      } else {
        setIsSpeechSupported(false);
        console.log('Speech recognition not supported in this browser');
      }

      // Initialize speech synthesis for audio responses
      if ('speechSynthesis' in window) {
        const synthInstance = window.speechSynthesis;
        setSynth(synthInstance);
      }

      setIsLiveActive(true);
      setResponse("Welcome to Falcon Group International AI Consultation. Please select your preferred interaction mode below.");
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Could not start consultation session.");
      setIsLiveActive(false);
    }
  };

  const selectInteractionMode = (mode: 'chat' | 'audio') => {
    setInteractionMode(mode);
    setResponse(mode === 'chat' 
      ? "Chat mode selected. Type your strategic question below." 
      : "Audio mode selected. Click the microphone to begin speaking."
    );
  };

  const processAudioQuery = async (query: string) => {
    if (!query.trim()) return;

    try {
      setError(null);
      setResponse("🔄 Processing your inquiry...");
      
      const groq = GroqService.getInstance();
      const result = await groq.consultStrategy(query);
      
      setResponse(result);
      setConversationHistory(prev => [...prev, { type: 'user', text: query }, { type: 'ai', text: result }]);
      
      // Automatically speak the response in audio mode
      setTimeout(() => {
        if (synth && !isSpeaking) {
          speakResponse();
        }
      }, 1000);
      
      setInputText("");
    } catch (e: any) {
      console.error("Groq API Error:", e);
      setError(e.message || "An error occurred during the consultation. Make sure you've added your Groq API key to .env");
      setIsLiveActive(false);
    }
  };

  const sendConsultationQuery = async () => {
    if (!inputText.trim()) {
      setError("Please enter a consultation query.");
      return;
    }

    try {
      setError(null);
      setResponse("🔄 Processing your inquiry...");
      
      const groq = GroqService.getInstance();
      const result = await groq.consultStrategy(inputText);
      
      setResponse(result);
      setConversationHistory(prev => [...prev, { type: 'user', text: inputText }, { type: 'ai', text: result }]);
      setInputText("");
    } catch (e: any) {
      console.error("Groq API Error:", e);
      setError(e.message || "An error occurred during the consultation. Make sure you've added your Groq API key to .env");
      setIsLiveActive(false);
    }
  };

  const startVoiceInput = () => {
    if (recognition && !isListening && interactionMode === 'audio') {
      setIsListening(true);
      recognition.start();
    }
  };

  const speakResponse = () => {
    if (!synth || !response || isSpeaking) return;

    // Cancel any existing speech
    synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1.1; // Slightly higher pitch for clarity
    utterance.volume = 0.8;
    
    // Find a good voice
    const voices = synth.getVoices();
    const voice = voices.find(v => v.name.includes('Google') || v.name.includes('US')) || voices[0];
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      // In audio mode, prompt for next input after response finishes
      if (interactionMode === 'audio') {
        setTimeout(() => {
          setResponse("Your response has been delivered. Please speak your next question or say 'end session' to conclude.");
        }, 1000);
      }
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setError('Audio response failed. Please try again.');
    };

    synth.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synth) {
      synth.cancel();
      setIsSpeaking(false);
    }
  };

  const endSessionWithSummary = () => {
    const summary = conversationHistory
      .map((item, index) => `${index + 1}. ${item.type === 'user' ? 'You' : 'AI'}: ${item.text}`)
      .join('\n\n');
    
    setResponse(`Session Summary:\n\n${summary}\n\nPlease provide your contact information to receive this summary via email.`);
    setShowEmailForm(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) {
      setError("Please provide either an email address or phone number.");
      return;
    }

    try {
      // Send email to administrator
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          phone: phone,
          subject: 'New Falcon Group International Sales Lead',
          message: `New consultation request from:\nEmail: ${email}\nPhone: ${phone}\n\nConversation Summary:\n${conversationHistory.map((item, index) => `${index + 1}. ${item.type === 'user' ? 'User' : 'AI'}: ${item.text}`).join('\n\n')}\n\nPlease follow up with this potential client.`,
        }),
      });

      if (response.ok) {
        setShowEmailForm(false);
        setEmail('');
        setPhone('');
        setResponse("Thank you! Your consultation summary has been sent to your email/phone. A member of our team will follow up shortly.");
        setTimeout(() => {
          stopSession();
        }, 3000);
      } else {
        setError("Failed to submit contact information. Please try again or contact us directly.");
      }
    } catch (error) {
      console.error('Email submission error:', error);
      setError("Network error. Please try again later.");
    }
  };

  const requestEmailCopy = () => {
    endSessionWithSummary();
  };

  return (
    <section id="advisor" className="py-32 bg-navy relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-shiny opacity-[0.03] skew-x-12 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <h2 className="text-gold-shiny font-black text-xs uppercase tracking-[0.4em] mb-4">Strategic Intelligence</h2>
          <h3 className="text-6xl font-black text-white tracking-tight leading-[0.9]">Institutional <br />AI Consultation.</h3>
          <p className="text-blue-100/70 text-lg leading-relaxed max-w-lg font-medium">
            Direct access to our proprietary AI framework. Speak in real-time to analyze infrastructure debt, risk vectors, or transformation readiness.
          </p>
          <div className="grid grid-cols-2 gap-6">
             <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="text-gold-shiny font-black text-2xl mb-1">ZERO</div>
                <p className="text-[10px] text-blue-200 uppercase font-bold tracking-widest">Latency Response</p>
             </div>
             <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="text-gold-shiny font-black text-2xl mb-1">AES</div>
                <p className="text-[10px] text-blue-200 uppercase font-bold tracking-widest">Sovereign Encryption</p>
             </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gold-shiny opacity-20 blur-[100px] animate-pulse"></div>
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 text-center shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)]">
             <div className={`mx-auto w-40 h-40 rounded-full border-4 flex items-center justify-center transition-all duration-700 mb-10 ${isLiveActive ? 'border-gold-shiny scale-110 gold-pulse-vibrant bg-gold-shiny/20' : 'border-white/10'}`}>
                {isLiveActive ? (
                  <div className="flex items-end gap-1.5 h-12">
                     {[1,2,3,4,3,2,1,3,2,4,1].map((h, i) => (
                       <div key={i} className="w-1.5 bg-gold-shiny rounded-full animate-bounce" style={{ height: `${h * 15}%`, animationDelay: `${i * 0.1}s` }}></div>
                     ))}
                  </div>
                ) : (
                  <svg className="w-16 h-16 text-gold-shiny opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 00-3 3v10a3 3 0 006 0V3a3 3 0 00-3-3z" /></svg>
                )}
             </div>
             
             <h4 className="text-3xl font-black text-white mb-4">
               {isLiveActive ? 'Secure Channel Open' : 'Executive Voice Interface'}
             </h4>
             <p className="text-blue-200/60 text-sm mb-12 max-w-xs mx-auto font-medium">
               Authorized personnel only. Audio data is processed within sovereign boundaries.
             </p>

             {error && <p className="text-red-400 text-xs font-bold mb-6 bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</p>}

             {response && (
               <div className="mb-8 p-6 bg-white/5 border border-gold-shiny/30 rounded-2xl text-blue-100 text-sm leading-relaxed font-medium max-h-64 overflow-y-auto">
                 {response}
               </div>
             )}

             {isLiveActive && (
               <div className="mb-6 space-y-4">
                 {/* Mode Selection */}
                 {!interactionMode && (
                   <div className="grid grid-cols-2 gap-4 mb-6">
                     <button
                       onClick={() => selectInteractionMode('chat')}
                       className="bg-gold-shiny text-navy px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform"
                     >
                       <div className="flex items-center justify-center gap-3">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                         </svg>
                         Chat Mode
                       </div>
                       <span className="text-xs opacity-75 mt-1 block">Type your questions</span>
                     </button>
                     <button
                       onClick={() => selectInteractionMode('audio')}
                       className="bg-gold-shiny text-navy px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform"
                     >
                       <div className="flex items-center justify-center gap-3">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                         </svg>
                         Audio Mode
                       </div>
                       <span className="text-xs opacity-75 mt-1 block">Speak naturally</span>
                     </button>
                   </div>
                 )}

                 {/* Chat Mode Interface */}
                 {interactionMode === 'chat' && (
                   <div className="space-y-4">
                     <div className="flex gap-3">
                       <input
                         type="text"
                         value={inputText}
                         onChange={(e) => setInputText(e.target.value)}
                         onKeyPress={(e) => e.key === 'Enter' && sendConsultationQuery()}
                         placeholder="Ask your strategic question..."
                         className="flex-1 bg-white/10 border border-gold-shiny/30 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 text-sm focus:outline-none focus:border-gold-shiny transition-colors"
                       />
                       <button
                         onClick={sendConsultationQuery}
                         className="bg-gold-shiny text-navy px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                       >
                         Send
                       </button>
                     </div>
                   </div>
                 )}

                 {/* Audio Mode Interface */}
                 {interactionMode === 'audio' && (
                   <div className="space-y-4">
                     <div className="flex gap-3">
                       <button
                         onClick={startVoiceInput}
                         disabled={isListening}
                         className={`flex-1 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                           isListening 
                             ? 'bg-red-500 text-white animate-pulse' 
                             : 'bg-gold-shiny text-navy hover:scale-105'
                         }`}
                       >
                         {isListening ? (
                           <span className="flex items-center justify-center gap-2">
                             <div className="w-3 h-3 bg-navy rounded-full animate-bounce"></div>
                             Listening...
                           </span>
                         ) : (
                           <span className="flex items-center justify-center gap-2">
                             <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                             </svg>
                             Speak Now
                           </span>
                         )}
                       </button>
                       
                       <button
                         onClick={() => {
                           if (recognition && isListening) {
                             recognition.stop();
                           }
                         }}
                         disabled={!isListening}
                         className="px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest bg-gold-shiny text-navy hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-transform"
                       >
                         Stop
                       </button>
                     </div>
                     <p className="text-blue-200/50 text-xs text-center">
                       Speak naturally. Your response will be automatically spoken back.
                     </p>
                   </div>
                 )}
                 
                 {/* Email Copy Button */}
                 {response && (
                   <button
                     onClick={requestEmailCopy}
                     className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-gold-shiny text-navy hover:scale-105 transition-transform"
                   >
                     End Session & Get Summary
                   </button>
                 )}
                 
                 {!isSpeechSupported && (
                   <p className="text-blue-300/50 text-xs text-center">
                     Voice input not supported in this browser. Please use Chrome or Edge for speech recognition.
                   </p>
                 )}
               </div>
             )}

             <button 
               onClick={isLiveActive ? stopSession : startLiveSession}
               className={`w-full py-6 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all duration-300 ${isLiveActive ? 'bg-red-500 hover:bg-red-600 text-white shadow-2xl' : 'bg-gold-shiny text-navy hover:scale-[1.03] shadow-gold-shiny/30'}`}
             >
               {isLiveActive ? 'Close Advisory Session' : 'Initialize Advisory Session'}
             </button>
             
             <div className="mt-8 flex justify-center gap-6 text-[9px] text-blue-300/40 font-black tracking-[0.3em] uppercase">
                <span className="flex items-center gap-1.5"><div className={`w-1.5 h-1.5 rounded-full ${isLiveActive ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div> {isLiveActive ? 'LIVE' : 'READY'}</span>
                <span>SECURE</span>
                <span>AUDITED</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DNASection = () => {
  return (
    <section id="dna" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
           {[
             { title: 'The Mission', label: 'Resilience', color: 'bg-white', text: 'text-navy', desc: 'Empowering digital foundations through uncompromising engineering excellence.' },
             { title: 'The Vision', label: 'Sovereignty', color: 'bg-navy', text: 'text-white', desc: 'Bridging legacy core systems to a fully autonomous, secure digital future.' },
             { title: 'The Core', label: 'Precision', color: 'bg-white', text: 'text-navy', desc: 'Bulletproofing enterprise scale with boardroom-ready financial risk models.' }
           ].map((item, i) => (
             <div key={i} className={`${item.color} p-12 rounded-[3rem] border border-slate-200 shadow-sm space-y-6 transition-transform hover:-translate-y-2`}>
                <span className="text-gold-shiny font-black text-[10px] tracking-[0.4em] uppercase">{item.label}</span>
                <h4 className={`text-3xl font-black ${item.text} leading-none`}>{item.title}</h4>
                <p className={`text-base font-medium leading-relaxed ${item.text === 'text-white' ? 'text-blue-100/70' : 'text-slate-500'}`}>{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-white py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16">
        <div className="col-span-2 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center text-gold-shiny font-black">F</div>
            <span className="text-2xl font-black text-navy tracking-tight">FALCON GROUP <span className="text-[10px] text-gold-shiny font-black uppercase tracking-[0.4em] block">International</span></span>
          </div>
          <p className="text-slate-500 max-w-sm leading-relaxed font-medium">
            Global Headquarters: 1200 Avenue of the Americas, NY. <br />
            Delivery Nodes: Zurich, London, Singapore.
          </p>
        </div>
        <div>
          <h5 className="font-black text-navy mb-8 uppercase tracking-[0.3em] text-[10px]">Ecosystem</h5>
          <ul className="space-y-4 text-sm text-slate-400 font-bold uppercase tracking-widest">
            <li><a href="#" className="hover:text-gold-shiny transition-colors">Sovereign Labs</a></li>
            <li><a href="#" className="hover:text-gold-shiny transition-colors">Client Gateway</a></li>
            <li><a href="#" className="hover:text-gold-shiny transition-colors">Executive Ops</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-black text-navy mb-8 uppercase tracking-[0.3em] text-[10px]">Compliance</h5>
          <ul className="space-y-4 text-sm text-slate-400 font-bold uppercase tracking-widest">
            <li><a href="#" className="hover:text-gold-shiny transition-colors">Data Privacy</a></li>
            <li><a href="#" className="hover:text-gold-shiny transition-colors">Legal Shield</a></li>
            <li><a href="#" className="hover:text-gold-shiny transition-colors">Governance</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-24 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">
        <p>&copy; 2025 Falcon Group International. Sovereign. Resilient. Transparent.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#">LinkedIn</a>
          <a href="#">X / Twitter</a>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="relative selection:bg-gold-shiny selection:text-navy">
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <AIAdvisor />
        <DNASection />
      </main>
      <Footer />
    </div>
  );
}
