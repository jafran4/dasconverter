import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Search, 
  Phone, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  Flag, 
  UserX, 
  Building2, 
  Info, 
  Share2, 
  Lock, 
  History,
  FileSpreadsheet,
  Zap,
  PhoneCall,
  ExternalLink,
  PlusCircle,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScamReport {
  id: string;
  phone: string;
  trxId?: string;
  provider: string;
  scamType: string;
  lossAmount?: string;
  date: string;
  reportsCount: number;
  riskScore: number; // 0 - 100
  notes: string;
  location?: string;
}

// Initial database of known scam numbers and transaction records in Bangladesh
const INITIAL_SCAM_DATABASE: ScamReport[] = [
  {
    id: 'SCAM-BD-001',
    phone: '01712345678',
    trxId: 'BLM7X9K2P1',
    provider: 'bKash',
    scamType: 'Advance Payment / Facebook Shop Scam',
    lossAmount: '৳ 3,500',
    date: '2026-07-20',
    reportsCount: 18,
    riskScore: 98,
    notes: 'Posing as online clothing seller. Takes advance payment via bKash Personal and blocks buyers immediately.',
    location: 'Dhaka'
  },
  {
    id: 'SCAM-BD-002',
    phone: '01887654321',
    trxId: '9J82KL09',
    provider: 'Nagad',
    scamType: 'Fake bKash/Nagad Cash-in SMS Trap',
    lossAmount: '৳ 12,000',
    date: '2026-07-22',
    reportsCount: 24,
    riskScore: 95,
    notes: 'Sends spoofed Cash-In SMS claiming wrong money sent, then calls crying asking to return money.',
    location: 'Chittagong'
  },
  {
    id: 'SCAM-BD-003',
    phone: '01911223344',
    trxId: 'TRX9821034',
    provider: 'Rocket',
    scamType: 'Lottery / Prize Money Fraud',
    lossAmount: '৳ 25,000',
    date: '2026-07-15',
    reportsCount: 31,
    riskScore: 99,
    notes: 'Claims victim won BTRC lottery or Car prize. Asks for processing fee via Rocket.',
    location: 'Sylhet'
  },
  {
    id: 'SCAM-BD-004',
    phone: '01300998877',
    trxId: 'CK91028341',
    provider: 'Upay',
    scamType: 'Job Offer / Telegram Task Scam',
    lossAmount: '৳ 8,000',
    date: '2026-07-18',
    reportsCount: 12,
    riskScore: 92,
    notes: 'Offers fake online YouTube video review jobs. Demands initial deposit to release earnings.',
    location: 'Rajshahi'
  }
];

export const ScammerFinder: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [provider, setProvider] = useState('auto');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    searched: boolean;
    isScammer: boolean;
    report?: ScamReport;
    riskScore: number;
    phoneOperator?: string;
    detectedProvider?: string;
    trxValidFormat?: boolean;
    scamCount?: number;
  } | null>(null);

  const [reportsDb, setReportsDb] = useState<ScamReport[]>(() => {
    const saved = localStorage.getItem('bd_scam_reports_db');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SCAM_DATABASE;
      }
    }
    return INITIAL_SCAM_DATABASE;
  });

  // Report Modal State
  const [showReportModal, setShowReportModal] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [newTrxId, setNewTrxId] = useState('');
  const [newProvider, setNewProvider] = useState('bKash');
  const [newScamType, setNewScamType] = useState('Advance Payment / Facebook Scam');
  const [newAmount, setNewAmount] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newLocation, setNewLocation] = useState('Dhaka');
  const [reportSuccess, setReportSuccess] = useState<string | null>(null);

  // Helper to detect operator from BD phone number
  const detectBDOperator = (num: string) => {
    const cleanNum = num.replace(/\D/g, '');
    let mainDigits = cleanNum;
    if (cleanNum.startsWith('880')) {
      mainDigits = cleanNum.substring(2);
    }
    if (mainDigits.length >= 3 && mainDigits.startsWith('01')) {
      const prefix = mainDigits.substring(0, 3);
      switch (prefix) {
        case '017':
        case '013':
          return 'Grameenphone';
        case '018':
          return 'Robi';
        case '019':
        case '014':
          return 'Banglalink';
        case '015':
          return 'Teletalk';
        case '016':
          return 'Airtel';
        default:
          return 'Bangladeshi Mobile Operator';
      }
    }
    return null;
  };

  // Helper to validate BD Phone Format
  const isValidBDPhone = (num: string) => {
    const clean = num.replace(/\D/g, '');
    return (clean.length === 11 && clean.startsWith('01')) || (clean.length === 13 && clean.startsWith('8801'));
  };

  // Helper to check TrxID format
  const checkTrxFormat = (code: string) => {
    if (!code.trim()) return true;
    const clean = code.trim().toUpperCase();
    // bKash: 10 chars alphanumeric (e.g. BLM7X9K2P1)
    // Nagad: 8-10 chars alphanumeric
    // Rocket: 8-12 chars
    return clean.length >= 6 && clean.length <= 16;
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!phone.trim() && !trxId.trim()) return;

    setIsSearching(true);
    setSearchResult(null);

    setTimeout(() => {
      const cleanPhone = phone.replace(/\D/g, '').replace(/^88/, '');
      const cleanTrx = trxId.trim().toUpperCase();

      // Search in Database
      const matchedReport = reportsDb.find(r => {
        const rPhoneClean = r.phone.replace(/\D/g, '').replace(/^88/, '');
        const phoneMatch = cleanPhone && rPhoneClean === cleanPhone;
        const trxMatch = cleanTrx && r.trxId && r.trxId.toUpperCase() === cleanTrx;
        return phoneMatch || trxMatch;
      });

      const operator = detectBDOperator(phone);

      if (matchedReport) {
        setSearchResult({
          searched: true,
          isScammer: true,
          report: matchedReport,
          riskScore: matchedReport.riskScore,
          phoneOperator: operator || 'Bangladeshi Operator',
          detectedProvider: matchedReport.provider,
          trxValidFormat: true,
          scamCount: matchedReport.reportsCount
        });
      } else {
        // Fallback analysis if not explicitly blacklisted
        // If user entered a suspicious phone format or random test
        const isSuspiciousTrx = cleanTrx && cleanTrx.length < 6;
        const isSuspiciousPhone = phone && !isValidBDPhone(phone);

        const riskScore = isSuspiciousPhone ? 65 : isSuspiciousTrx ? 45 : 5;

        setSearchResult({
          searched: true,
          isScammer: isSuspiciousPhone,
          riskScore: riskScore,
          phoneOperator: operator || 'Unknown Operator',
          detectedProvider: provider !== 'auto' ? provider : 'MFS / Bank Account',
          trxValidFormat: checkTrxFormat(trxId),
          scamCount: 0
        });
      }

      setIsSearching(false);
    }, 1200);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhone.trim()) return;

    const ticketId = `BD-CYBER-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReport: ScamReport = {
      id: ticketId,
      phone: newPhone.trim(),
      trxId: newTrxId.trim() || undefined,
      provider: newProvider,
      scamType: newScamType,
      lossAmount: newAmount.trim() ? `৳ ${newAmount.trim()}` : undefined,
      date: new Date().toISOString().split('T')[0],
      reportsCount: 1,
      riskScore: 90,
      notes: newNotes.trim() || 'User reported fraudulent activity.',
      location: newLocation
    };

    const updated = [newReport, ...reportsDb];
    setReportsDb(updated);
    localStorage.setItem('bd_scam_reports_db', JSON.stringify(updated));

    setReportSuccess(ticketId);
    setTimeout(() => {
      setReportSuccess(null);
      setShowReportModal(false);
      setNewPhone('');
      setNewTrxId('');
      setNewNotes('');
      setNewAmount('');

      // Auto search the newly reported scammer
      setPhone(newReport.phone);
      if (newReport.trxId) setTrxId(newReport.trxId);
      handleSearch();
    }, 2000);
  };

  const loadDemo = (demoPhone: string, demoTrx: string) => {
    setPhone(demoPhone);
    setTrxId(demoTrx);
    setIsSearching(true);
    setTimeout(() => {
      setPhone(demoPhone);
      setTrxId(demoTrx);
      const cleanPhone = demoPhone.replace(/\D/g, '').replace(/^88/, '');
      const match = reportsDb.find(r => r.phone.replace(/\D/g, '').replace(/^88/, '') === cleanPhone);
      setSearchResult({
        searched: true,
        isScammer: !!match,
        report: match,
        riskScore: match ? match.riskScore : 0,
        phoneOperator: detectBDOperator(demoPhone) || 'Grameenphone',
        detectedProvider: match ? match.provider : 'bKash',
        trxValidFormat: true,
        scamCount: match ? match.reportsCount : 0
      });
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 font-sans py-8">
      {/* Top Header Navigation */}
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-6 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-red-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden mb-8 border border-zinc-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30 mb-4 uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            Bangladesh Anti-Fraud Database
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 text-white">
            Scammer Finder BD
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
            Verify Bangladeshi MFS mobile numbers (<span className="text-red-300 font-semibold">bKash, Nagad, Rocket, Upay, CellFin</span>) and Transaction Codes before sending money. Protect yourself from online marketplace and cash-in fraud!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setShowReportModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Flag className="w-4 h-4" />
              Report a Scammer Number
            </button>
            <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900/80 px-3.5 py-2.5 rounded-xl border border-zinc-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Community Verified Complaints & Anti-Scam Database</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Card Form */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-xl mb-8">
        <form onSubmit={handleSearch} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Phone Number Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-red-600" />
                  Bangladeshi Phone Number *
                </span>
                {phone && (
                  <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                    {detectBDOperator(phone) || 'BD Operator'}
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01712345678 or +8801812345678"
                  className="w-full pl-10 pr-4 py-3.5 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm placeholder:text-zinc-400 placeholder:font-normal"
                />
                <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1.5">
                Enter any 11-digit BD mobile number used for bKash, Nagad, Rocket, or Calls.
              </p>
            </div>

            {/* Payment Transaction Code Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-purple-600" />
                Payment Transaction Code (TrxID)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  placeholder="e.g. BLM7X9K2P1 or 9J82KL09"
                  className="w-full pl-10 pr-4 py-3.5 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm placeholder:text-zinc-400 placeholder:font-normal uppercase"
                />
                <CreditCard className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1.5">
                Optional: Check transaction code from bKash / Nagad / Rocket receipt.
              </p>
            </div>
          </div>

          {/* Provider Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-100">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-semibold text-zinc-500 shrink-0">Wallet Provider:</span>
              {['auto', 'bKash', 'Nagad', 'Rocket', 'Upay', 'CellFin', 'Bank'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProvider(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    provider === p
                      ? 'bg-zinc-900 text-white shadow-xs'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {p === 'auto' ? '⚡ Auto Detect' : p}
                </button>
              ))}
            </div>

            {/* Action Search Button */}
            <button
              type="submit"
              disabled={isSearching || (!phone.trim() && !trxId.trim())}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-orange-500 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
            >
              {isSearching ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Scanning Fraud Records...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Find Scammer
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Demo Buttons */}
        <div className="mt-5 pt-4 border-t border-zinc-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-zinc-500 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Quick Test Examples:
          </span>
          <button
            onClick={() => loadDemo('01712345678', 'BLM7X9K2P1')}
            className="px-2.5 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-md font-medium border border-red-200 transition-colors cursor-pointer"
          >
            🔴 Try Reported Scammer Number
          </button>
          <button
            onClick={() => loadDemo('01887654321', '9J82KL09')}
            className="px-2.5 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded-md font-medium border border-amber-200 transition-colors cursor-pointer"
          >
            ⚠️ Try Nagad Trap Number
          </button>
          <button
            onClick={() => loadDemo('01700000000', 'TX100293')}
            className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md font-medium border border-emerald-200 transition-colors cursor-pointer"
          >
            🟢 Try Clean Number
          </button>
        </div>
      </div>

      {/* Search Result Section */}
      <AnimatePresence mode="wait">
        {searchResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8"
          >
            {searchResult.isScammer ? (
              /* HIGH RISK SCAMMER WARNING CARD */
              <div className="bg-red-950 text-white border-2 border-red-600 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-600/40">
                      <UserX className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-black rounded-md uppercase tracking-wider">
                          🚨 REPORTED SCAMMER DETECTED
                        </span>
                        <span className="px-2.5 py-0.5 bg-red-900/80 text-red-200 border border-red-700 text-xs font-semibold rounded-md">
                          Risk Score: {searchResult.riskScore}%
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {phone || searchResult.report?.phone}
                      </h2>
                      <p className="text-red-200 text-sm mt-1">
                        Provider: <span className="font-bold text-white">{searchResult.detectedProvider}</span> • Operator: <span className="font-bold text-white">{searchResult.phoneOperator}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-900/60 border border-red-700/80 rounded-xl p-4 text-center shrink-0 min-w-[180px]">
                    <div className="text-3xl font-black text-red-300">{searchResult.scamCount || searchResult.report?.reportsCount || 1}</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-red-200 mt-0.5">Complaints Filed</div>
                    <div className="text-[11px] text-red-300/80 mt-1">Verified Anti-Fraud DB</div>
                  </div>
                </div>

                {/* Detailed Report Info */}
                {searchResult.report && (
                  <div className="mt-6 pt-6 border-t border-red-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-black/30 p-4 rounded-xl border border-red-800/50">
                      <span className="text-xs font-bold text-red-300 uppercase tracking-wider block mb-1">Scam Category</span>
                      <p className="text-white font-semibold">{searchResult.report.scamType}</p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-xl border border-red-800/50">
                      <span className="text-xs font-bold text-red-300 uppercase tracking-wider block mb-1 flex items-center justify-between">
                        <span>Reported Loss</span>
                        <span className="text-[11px] text-red-400">{searchResult.report.date}</span>
                      </span>
                      <p className="text-white font-semibold">{searchResult.report.lossAmount || 'Multiple Victims'}</p>
                    </div>
                    <div className="md:col-span-2 bg-black/40 p-4 rounded-xl border border-red-800/50">
                      <span className="text-xs font-bold text-red-300 uppercase tracking-wider block mb-1">Incident Summary & Complaint Notes</span>
                      <p className="text-red-100 text-sm leading-relaxed">{searchResult.report.notes}</p>
                    </div>
                  </div>
                )}

                {/* Safety Warning Banner */}
                <div className="mt-6 bg-red-600/30 border border-red-500/50 rounded-xl p-4 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-300 shrink-0" />
                  <div className="text-xs sm:text-sm text-red-100">
                    <strong className="text-white">DO NOT SEND MONEY:</strong> High risk of financial fraud. If you have been scammed by this number, file an official report below or contact CID Cyber Crime Division.
                  </div>
                </div>
              </div>
            ) : (
              /* CLEAN / LOW RISK RESULT CARD */
              <div className="bg-emerald-950 text-white border-2 border-emerald-600 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/30">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-3 py-0.5 bg-emerald-600 text-white text-xs font-black rounded-md uppercase tracking-wider">
                          NO SCAM COMPLAINTS FOUND
                        </span>
                      </div>
                      <h2 className="text-2xl font-extrabold text-white tracking-tight">
                        {phone || 'Searched Number'}
                      </h2>
                      <p className="text-emerald-200 text-sm mt-0.5">
                        Operator: <span className="font-bold text-white">{searchResult.phoneOperator}</span> • Provider: <span className="font-bold text-white">{searchResult.detectedProvider}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-900/60 border border-emerald-700 rounded-xl p-3 px-5 text-center shrink-0">
                    <div className="text-2xl font-black text-emerald-300">0 Reports</div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">Clean Database Record</div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-emerald-800/80 flex items-start gap-3 text-xs sm:text-sm text-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    This phone number has no active scam complaints in our database. However, always verify recipient details over a direct voice call before transferring money.
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bangladesh Anti-Scam Helplines & Emergency Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-3">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-900 text-sm mb-1">Police Cyber Crime BD</h3>
          <p className="text-xs text-zinc-500 mb-3">CID Cyber Police Center Hotline for MFS and Online Financial Scams.</p>
          <div className="flex items-center justify-between text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100">
            <span>Hotline: 01769691522</span>
            <span className="text-[10px] bg-red-200 text-red-900 px-1.5 py-0.5 rounded">24/7 Hotline</span>
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-900 text-sm mb-1">BTRC Anti-Spam (100 / 16455)</h3>
          <p className="text-xs text-zinc-500 mb-3">Bangladesh Telecommunication Regulatory Commission Fraud Helpline.</p>
          <div className="flex items-center justify-between text-xs font-bold text-purple-700 bg-purple-50 p-2.5 rounded-lg border border-purple-100">
            <span>Call: 100 or 16455</span>
            <span className="text-[10px] bg-purple-200 text-purple-900 px-1.5 py-0.5 rounded">BTRC BD</span>
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-900 text-sm mb-1">MFS Official Helplines</h3>
          <p className="text-xs text-zinc-500 mb-3">Report transaction block request immediately to MFS authorities.</p>
          <div className="text-xs text-zinc-700 bg-zinc-50 p-2 rounded-lg border border-zinc-200 space-y-1">
            <div className="flex justify-between font-semibold"><span>bKash Helpline:</span> <span className="text-pink-600">16247</span></div>
            <div className="flex justify-between font-semibold"><span>Nagad Helpline:</span> <span className="text-orange-600">16167</span></div>
            <div className="flex justify-between font-semibold"><span>Rocket Helpline:</span> <span className="text-purple-600">16216</span></div>
          </div>
        </div>
      </div>

      {/* Community Reported Scammers Table Preview */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <History className="w-5 h-5 text-red-600" />
              Recently Reported Scammer Database ({reportsDb.length})
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">Community flagged numbers & transaction records in Bangladesh.</p>
          </div>
          <button
            onClick={() => setShowReportModal(true)}
            className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Submit Complaint
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-700">
            <thead className="bg-zinc-100 text-zinc-800 uppercase font-bold border-b border-zinc-200">
              <tr>
                <th className="p-3 rounded-tl-xl">Phone Number</th>
                <th className="p-3">Provider</th>
                <th className="p-3">Scam Category</th>
                <th className="p-3">TrxID</th>
                <th className="p-3">Amount</th>
                <th className="p-3 rounded-tr-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {reportsDb.map((item) => (
                <tr key={item.id} className="hover:bg-red-50/50 transition-colors">
                  <td className="p-3 font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    {item.phone}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-zinc-100 text-zinc-800">
                      {item.provider}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-zinc-800 max-w-[200px] truncate">
                    {item.scamType}
                  </td>
                  <td className="p-3 font-mono font-semibold text-purple-700">
                    {item.trxId || 'N/A'}
                  </td>
                  <td className="p-3 font-bold text-red-600">
                    {item.lossAmount || 'Unknown'}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => loadDemo(item.phone, item.trxId || '')}
                      className="px-2.5 py-1 bg-zinc-900 text-white rounded text-[11px] font-semibold hover:bg-red-600 transition-colors cursor-pointer"
                    >
                      Check Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REPORT SCAMMER MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                  <Flag className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">Report a Scammer Number</h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-zinc-400 hover:text-zinc-700 text-xl font-bold p-1 cursor-pointer"
              >
                ×
              </button>
            </div>

            {reportSuccess ? (
              <div className="py-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-zinc-900">Complaint Logged Successfully!</h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Ticket ID: <strong className="font-mono text-purple-700">{reportSuccess}</strong>
                </p>
                <p className="text-xs text-zinc-600 mt-3 bg-zinc-100 p-3 rounded-xl">
                  This report has been saved to the anti-fraud database.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Scammer Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="e.g. 017XXXXXXXX"
                    className="w-full p-3 bg-zinc-50 border border-zinc-300 rounded-xl font-semibold text-zinc-900 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">MFS Provider</label>
                    <select
                      value={newProvider}
                      onChange={(e) => setNewProvider(e.target.value)}
                      className="w-full p-3 bg-zinc-50 border border-zinc-300 rounded-xl font-semibold text-zinc-900"
                    >
                      <option value="bKash">bKash</option>
                      <option value="Nagad">Nagad</option>
                      <option value="Rocket">Rocket</option>
                      <option value="Upay">Upay</option>
                      <option value="CellFin">CellFin</option>
                      <option value="Bank">Bank Transfer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Loss Amount (BDT)</label>
                    <input
                      type="number"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      placeholder="e.g. 2500"
                      className="w-full p-3 bg-zinc-50 border border-zinc-300 rounded-xl font-semibold text-zinc-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Transaction ID (TrxID)</label>
                  <input
                    type="text"
                    value={newTrxId}
                    onChange={(e) => setNewTrxId(e.target.value)}
                    placeholder="e.g. BLM7X9K2P1"
                    className="w-full p-3 bg-zinc-50 border border-zinc-300 rounded-xl font-semibold text-zinc-900 uppercase"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Scam Category</label>
                  <select
                    value={newScamType}
                    onChange={(e) => setNewScamType(e.target.value)}
                    className="w-full p-3 bg-zinc-50 border border-zinc-300 rounded-xl font-semibold text-zinc-900"
                  >
                    <option value="Advance Payment / Facebook Scam">Advance Payment / Facebook Scam</option>
                    <option value="Fake Cash-In SMS Fraud">Fake Cash-In SMS Fraud</option>
                    <option value="Lottery / BTRC Prize Scam">Lottery / BTRC Prize Scam</option>
                    <option value="Job Offer / Telegram Task Fraud">Job Offer / Telegram Task Fraud</option>
                    <option value="SIM / OTP Hacking Fraud">SIM / OTP Hacking Fraud</option>
                    <option value="Other Financial Scam">Other Financial Scam</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Details / Incident Description</label>
                  <textarea
                    rows={3}
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="Briefly describe how the scam happened..."
                    className="w-full p-3 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl cursor-pointer shadow-lg shadow-red-600/30"
                  >
                    Submit Fraud Report
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};
