import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, GraduationCap, ClipboardList, BarChart3, Download, Printer, User, School, MapPin, Phone, GraduationCap as BoardIcon } from 'lucide-react';

// --- Sub-Components ---

const RegistrationForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    district: '',
    mobile: '',
    board: 'SSLC',
    consent: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.consent) {
      onNext(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card max-w-lg mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <Rocket className="text-primary-neon w-8 h-8" />
        <h2 className="neon-text text-2xl">Mission Registration</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label><User className="inline w-4 h-4 mr-2" />Full Name</label>
          <input
            type="text"
            required
            className="input-glass"
            placeholder="Guardian of the Galaxy..."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label><School className="inline w-4 h-4 mr-2" />School</label>
            <input
              type="text"
              required
              className="input-glass"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
            />
          </div>
          <div>
            <label><MapPin className="inline w-4 h-4 mr-2" />District</label>
            <input
              type="text"
              required
              className="input-glass"
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label><Phone className="inline w-4 h-4 mr-2" />Mobile</label>
            <input
              type="tel"
              required
              className="input-glass"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
          </div>
          <div>
            <label><BoardIcon className="inline w-4 h-4 mr-2" />Board</label>
            <select
              className="input-glass bg-slate-900"
              value={formData.board}
              onChange={(e) => setFormData({ ...formData, board: e.target.value })}
            >
              <option value="SSLC" className="bg-slate-900">SSLC (Karnataka)</option>
              <option value="CBSE" className="bg-slate-900">CBSE</option>
              <option value="ICSE" className="bg-slate-900">ICSE</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-4">
          <input
            type="checkbox"
            id="consent"
            required
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          />
          <label htmlFor="consent" className="mb-0 text-sm">
            I agree to participate in this career guidance session.
          </label>
        </div>

        <button type="submit" className="neon-button w-full mt-6">
          Start Assessment
        </button>
      </form>
    </motion.div>
  );
};

import questionsData from './questions.json';
import axios from 'axios';

const API_BASE = 'http://localhost:8000';

const Questionnaire = ({ onComplete }) => {
  const [responses, setResponses] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const questionsPerPage = 10;

  const totalSections = Math.ceil(questionsData.length / questionsPerPage);
  const currentQuestions = questionsData.slice(
    currentSection * questionsPerPage,
    (currentSection + 1) * questionsPerPage
  );

  const handleScore = (id, score) => {
    setResponses({ ...responses, [id]: score });
  };

  const isSectionComplete = currentQuestions.every(q => responses[q.id]);
  const isAllComplete = questionsData.every(q => responses[q.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div className="glass-card mb-8 text-center py-6">
        <h2 className="neon-text text-xl mb-2">Phase {currentSection + 1} of {totalSections}</h2>
        <div className="w-full bg-slate-800 rounded-full h-2 mt-4">
          <div
            className="bg-primary-neon h-2 rounded-full transition-all duration-300"
            style={{ width: `${(Object.keys(responses).length / questionsData.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-secondary-neon text-xs mt-3 uppercase tracking-widest">
          {Object.keys(responses).length} / {questionsData.length} Responses Synced
        </p>
      </div>

      <div className="space-y-6">
        {currentQuestions.map((q) => (
          <motion.div
            key={q.id}
            className="glass-card"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <p className="text-lg mb-6">{q.id}. {q.text}</p>
            <div className="scale-options">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  className={`scale-btn ${responses[q.id] === val ? 'active' : ''}`}
                  onClick={() => handleScore(q.id, val)}
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-secondary-neon uppercase font-bold tracking-[0.2em] opacity-60">
              <span>Strongly Disagree</span>
              <span>Neutral</span>
              <span>Strongly Agree</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-4 pb-20">
        {currentSection > 0 && (
          <button
            className="neon-button secondary flex-1"
            onClick={() => { setCurrentSection(s => s - 1); window.scrollTo(0, 0); }}
          >
            Previous
          </button>
        )}

        {currentSection < totalSections - 1 ? (
          <button
            className="neon-button flex-1"
            disabled={!isSectionComplete}
            onClick={() => { setCurrentSection(s => s + 1); window.scrollTo(0, 0); }}
          >
            Next Phase
          </button>
        ) : (
          <button
            className="neon-button flex-1"
            disabled={!isAllComplete}
            onClick={() => onComplete(responses)}
          >
            Finalize Mission
          </button>
        )}
      </div>
    </motion.div>
  );
};

const Results = ({ studentData, reportId }) => {
  const [scores, setScores] = useState(null);
  const [dominant, setDominant] = useState('');

  useEffect(() => {
    if (studentData?.scores && typeof studentData.scores === 'object') {
      setScores(studentData.scores);
      setDominant(studentData.dominant_trait || 'General');
    }
  }, [studentData]);

  const downloadPDF = () => {
    window.open(`${API_BASE}/api/report/${reportId}`, '_blank');
  };

  if (!scores) return <div className="text-center neon-text py-20">Analyzing Mission Data...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto space-y-8 pb-10"
    >
      <div className="glass-card text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <GraduationCap className="text-secondary-neon w-12 h-12 opacity-20" />
        </div>
        <h1 className="neon-text text-3xl mb-2">Career Guidance Report</h1>
        <p className="text-secondary-neon uppercase tracking-[0.2em]">Sophia Academy Assessment</p>

        <div className="grid grid-cols-2 mt-8 text-left border-t border-glass-border pt-6">
          <div>
            <p className="text-xs text-text-secondary">STUDENT NAME</p>
            <p className="font-bold text-xl">{studentData.name}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-secondary">MISSION DATE</p>
            <p className="font-bold">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card">
          <h3 className="neon-text text-lg mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" /> RIASEC Trait Profile
          </h3>
          <div className="space-y-4">
            {Object.entries(scores).map(([trait, score], i) => (
              <div key={trait}>
                <div className="flex justify-between mb-1 text-sm">
                  <span>{trait}</span>
                  <span className="text-primary-neon font-bold">{score.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    className={`h-full bg-gradient-to-r ${score > 70 ? 'from-cyan-400 to-blue-600' : 'from-purple-500 to-pink-500'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card flex flex-col justify-between">
          <div>
            <h3 className="neon-text text-lg mb-4">Recommended Pathway</h3>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-primary-neon/30 text-center">
              <Rocket className="w-12 h-12 mx-auto mb-2 text-primary-neon" />
              <h2 className="text-2xl font-bold uppercase tracking-tight">{dominant} Dominant</h2>
              <p className="text-text-secondary text-sm mt-3 leading-relaxed">
                You exhibit strong characteristics in the <strong>{dominant}</strong> domain.
                We recommend exploring streams that align with this trait.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary-neon/5 rounded-lg border border-primary-neon/20">
            <p className="text-xs text-primary-neon font-bold uppercase mb-1">Expert Suggestion</p>
            <p className="text-sm">Based on your SSLC profile, consider <strong>Science</strong> or <strong>Technical Vocational</strong> courses.</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={downloadPDF}
          className="neon-button flex-1 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" /> Download Branded PDF
        </button>
        <button
          onClick={() => window.print()}
          className="neon-button secondary flex-1 flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4" /> Print Results
        </button>
      </div>
    </motion.div>
  );
};

// --- Main App ---

function App() {
  const [step, setStep] = useState(0);
  const [studentData, setStudentData] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStart = (data) => {
    setStudentData(data);
    setStep(1);
    window.scrollTo(0, 0);
  };

  const handleComplete = async (responses) => {
    setLoading(true);
    try {
      const payload = {
        student_info: studentData,
        responses: responses
      };

      const res = await axios.post(`${API_BASE}/api/submit`, payload);
      setStudentData({ ...studentData, scores: res.data.scores, dominant_trait: res.data.dominant_trait });
      setReportId(res.data.id);
      setStep(2);
    } catch (err) {
      console.error("Submission failed", err);
      alert("Mission Control Error: Failed to sync data with HQ.");
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 bg-gradient-to-br from-primary-neon to-secondary-neon rounded-lg flex items-center justify-center">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <h1 className="neon-text text-xl tracking-tighter">SOPHIA ACADEMY</h1>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs text-text-secondary uppercase tracking-widest">SSLC Career Guidance</p>
          <div className="h-1 bg-secondary-neon mt-1 blur-[3px]"></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-40"
            >
              <div className="w-16 h-16 border-4 border-primary-neon border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="neon-text animate-pulse">Processing Cosmic Data...</p>
            </motion.div>
          ) : (
            <>
              {step === 0 && (
                <RegistrationForm key="reg" onNext={handleStart} />
              )}
              {step === 1 && (
                <Questionnaire key="ques" onComplete={handleComplete} />
              )}
              {step === 2 && (
                <Results key="res" studentData={studentData} reportId={reportId} />
              )}
            </>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-20 text-center text-text-secondary text-xs pb-10">
        © 2026 Sophia Academy • Career Guidance AI Platform • V1.0 • Built with Passion
      </footer>
    </div>
  );
}

export default App;
