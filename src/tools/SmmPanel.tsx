import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  ShoppingCart,
  Wallet,
  Globe,
  Settings,
  ShieldCheck,
  Zap,
  Search,
  Filter,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  HelpCircle,
  Layers,
  Copy,
  Check,
  ArrowUpRight,
  BarChart3,
  Users,
  DollarSign,
  Send,
  Star,
  Sparkles,
  ChevronRight,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  ExternalLink,
  Lock,
  Terminal,
  Activity,
  Award,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Types
interface Service {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  providerRate: number; // per 1000 in USD
  min: number;
  max: number;
  type: 'Default' | 'Custom Comments' | 'Package' | 'Subscriptions';
  refill: boolean;
  cancel: boolean;
  speed: string;
  isFavorite?: boolean;
  platform: 'Instagram' | 'YouTube' | 'TikTok' | 'Facebook' | 'Telegram' | 'Twitter';
}

interface Order {
  id: string;
  providerOrderId: string;
  serviceId: string;
  serviceName: string;
  platform: string;
  link: string;
  quantity: number;
  charge: number;
  startCount: number;
  remains: number;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Partial' | 'Canceled' | 'Refilling';
  date: string;
  refillEligible: boolean;
}

interface Ticket {
  id: string;
  subject: string;
  orderId?: string;
  status: 'Open' | 'Answered' | 'Closed';
  lastUpdated: string;
  messages: { sender: 'user' | 'support'; text: string; time: string }[];
}

interface Transaction {
  id: string;
  amount: number;
  method: string;
  trxId: string;
  status: 'Success' | 'Pending' | 'Failed';
  date: string;
}

// Initial Mock Services Catalog
const INITIAL_SERVICES: Service[] = [
  {
    id: '101',
    categoryId: 'ig-followers',
    categoryName: 'Instagram - Followers [High Quality]',
    name: 'Instagram Followers | Real Active | 30 Days Refill | 50K/Day',
    providerRate: 0.45,
    min: 100,
    max: 50000,
    type: 'Default',
    refill: true,
    cancel: true,
    speed: 'Instant (10K-50K/Day)',
    platform: 'Instagram'
  },
  {
    id: '102',
    categoryId: 'ig-likes',
    categoryName: 'Instagram - Likes [Instant]',
    name: 'Instagram Likes | Real Accounts | Instant Start | Max 100K',
    providerRate: 0.12,
    min: 50,
    max: 100000,
    type: 'Default',
    refill: false,
    cancel: false,
    speed: 'Instant (100K/Day)',
    platform: 'Instagram'
  },
  {
    id: '201',
    categoryId: 'yt-views',
    categoryName: 'YouTube - High Retention Views',
    name: 'YouTube Views | Non-Drop 30-60 Min Watch Time | Monetizable',
    providerRate: 1.20,
    min: 500,
    max: 1000000,
    type: 'Default',
    refill: true,
    cancel: true,
    speed: '10K-25K/Day',
    platform: 'YouTube'
  },
  {
    id: '202',
    categoryId: 'yt-subs',
    categoryName: 'YouTube - Subscribers',
    name: 'YouTube Subscribers | Organic Profile | Lifetime Guarantee',
    providerRate: 8.50,
    min: 100,
    max: 10000,
    type: 'Default',
    refill: true,
    cancel: false,
    speed: '100-500/Day Safe Speed',
    platform: 'YouTube'
  },
  {
    id: '301',
    categoryId: 'tt-followers',
    categoryName: 'TikTok - Followers & Likes',
    name: 'TikTok Followers | Worldwide Real Accounts | Fast Speed',
    providerRate: 0.85,
    min: 100,
    max: 100000,
    type: 'Default',
    refill: true,
    cancel: true,
    speed: '5K-20K/Day',
    platform: 'TikTok'
  },
  {
    id: '302',
    categoryId: 'tt-likes',
    categoryName: 'TikTok - Followers & Likes',
    name: 'TikTok Viral Video Likes | Instant Instant Delivery',
    providerRate: 0.25,
    min: 100,
    max: 200000,
    type: 'Default',
    refill: false,
    cancel: false,
    speed: 'Instant',
    platform: 'TikTok'
  },
  {
    id: '401',
    categoryId: 'fb-followers',
    categoryName: 'Facebook - Profile & Page Followers',
    name: 'Facebook Page Likes & Followers | High Quality Profiles',
    providerRate: 1.10,
    min: 200,
    max: 50000,
    type: 'Default',
    refill: true,
    cancel: true,
    speed: '2K-5K/Day',
    platform: 'Facebook'
  },
  {
    id: '501',
    categoryId: 'tg-members',
    categoryName: 'Telegram - Members & Post Views',
    name: 'Telegram Channel/Group Members | Real Accounts | Auto Refill',
    providerRate: 0.60,
    min: 100,
    max: 50000,
    type: 'Default',
    refill: true,
    cancel: false,
    speed: '10K/Day',
    platform: 'Telegram'
  }
];

export const SmmPanel: React.FC = () => {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'new-order' | 'services' | 'orders' | 'add-funds' | 'tickets' | 'api-docs' | 'admin'>('new-order');

  // User State & Wallet
  const [userBalance, setUserBalance] = useState<number>(() => {
    const saved = localStorage.getItem('smm_user_balance');
    return saved ? parseFloat(saved) : 45.80;
  });

  const [totalSpent, setTotalSpent] = useState<number>(() => {
    const saved = localStorage.getItem('smm_total_spent');
    return saved ? parseFloat(saved) : 182.40;
  });

  // Profit Markup Config (Admin Settings)
  const [profitType, setProfitType] = useState<'percentage' | 'fixed'>('percentage');
  const [markupValue, setMarkupValue] = useState<number>(30); // 30% profit markup default
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now (RBPanel v2 Connected)');

  // Services State
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [searchServiceQuery, setSearchServiceQuery] = useState<string>('');

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('smm_user_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [
      {
        id: 'ORD-98210',
        providerOrderId: 'RB-881920',
        serviceId: '101',
        serviceName: 'Instagram Followers | Real Active | 30 Days Refill',
        platform: 'Instagram',
        link: 'https://instagram.com/my_brand_official',
        quantity: 2000,
        charge: 1.17,
        startCount: 1420,
        remains: 0,
        status: 'Completed',
        date: '2026-08-01 14:20',
        refillEligible: true
      },
      {
        id: 'ORD-98211',
        providerOrderId: 'RB-881921',
        serviceId: '201',
        serviceName: 'YouTube Views | Non-Drop 30-60 Min Watch Time',
        platform: 'YouTube',
        link: 'https://youtu.be/dQw4w9WgXcQ',
        quantity: 5000,
        charge: 7.80,
        startCount: 12500,
        remains: 1200,
        status: 'In Progress',
        date: '2026-08-01 18:45',
        refillEligible: true
      }
    ];
  });

  // New Order Form State
  const [selectedCategory, setSelectedCategory] = useState<string>('ig-followers');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('101');
  const [orderLink, setOrderLink] = useState<string>('');
  const [orderQuantity, setOrderQuantity] = useState<number>(1000);
  const [customComments, setCustomComments] = useState<string>('');
  const [dripFeed, setDripFeed] = useState<boolean>(false);
  const [runs, setRuns] = useState<number>(2);
  const [interval, setInterval] = useState<number>(10);
  const [orderNotification, setOrderNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Deposit Form State
  const [depositMethod, setDepositMethod] = useState<'bKash' | 'Nagad' | 'Rocket' | 'SSLCommerz' | 'Crypto'>('bKash');
  const [depositAmount, setDepositAmount] = useState<string>('10.00');
  const [trxNumber, setTrxNumber] = useState<string>('');
  const [depositSuccessMsg, setDepositSuccessMsg] = useState<string | null>(null);

  // Tickets State
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'TCK-1029',
      subject: 'Order #ORD-98211 Slow Delivery',
      orderId: 'ORD-98211',
      status: 'Answered',
      lastUpdated: '10 mins ago',
      messages: [
        { sender: 'user', text: 'Hello, order #ORD-98211 is taking a bit long to start. Can you check?', time: '2 hours ago' },
        { sender: 'support', text: 'Hi! YouTube system undergoes minor updates today. Your order has been prioritized with provider RBPanel.', time: '10 mins ago' }
      ]
    }
  ]);
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [newTicketOrderId, setNewTicketOrderId] = useState('');

  // API Key state for docs
  const [apiKey, setApiKey] = useState<string>('smm_live_9f823a109c82b419827e81002931');
  const [copiedKey, setCopiedKey] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('smm_user_balance', userBalance.toString());
    localStorage.setItem('smm_total_spent', totalSpent.toString());
    localStorage.setItem('smm_user_orders', JSON.stringify(orders));
  }, [userBalance, totalSpent, orders]);

  // Calculate sell rate per 1000 for a service based on markup settings
  const calculateSellRate = (providerRate: number): number => {
    if (profitType === 'percentage') {
      return providerRate * (1 + markupValue / 100);
    } else {
      return providerRate + markupValue;
    }
  };

  // Get current active service selected in order form
  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];
  const calculatedRatePer1000 = calculateSellRate(currentService.providerRate);
  const totalOrderCharge = (calculatedRatePer1000 * (orderQuantity || 0)) / 1000;

  // Sync with RBPanel Simulator
  const triggerAutoSync = () => {
    setLastSyncTime('Syncing with RBPanel API v2...');
    setTimeout(() => {
      setLastSyncTime(`Synced at ${new Date().toLocaleTimeString()} (8 Services Updated)`);
    }, 1200);
  };

  // Handle placing a new order
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderLink.trim()) {
      setOrderNotification({ type: 'error', message: 'Please enter a valid target URL or profile link.' });
      return;
    }

    if (orderQuantity < currentService.min || orderQuantity > currentService.max) {
      setOrderNotification({
        type: 'error',
        message: `Quantity must be between ${currentService.min.toLocaleString()} and ${currentService.max.toLocaleString()}.`
      });
      return;
    }

    if (userBalance < totalOrderCharge) {
      setOrderNotification({
        type: 'error',
        message: `Insufficient balance! You need $${totalOrderCharge.toFixed(2)} USD. Please deposit funds.`
      });
      return;
    }

    // Process Order
    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      providerOrderId: `RB-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceId: currentService.id,
      serviceName: currentService.name,
      platform: currentService.platform,
      link: orderLink.trim(),
      quantity: orderQuantity,
      charge: parseFloat(totalOrderCharge.toFixed(2)),
      startCount: Math.floor(100 + Math.random() * 5000),
      remains: orderQuantity,
      status: 'Pending',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      refillEligible: currentService.refill
    };

    setUserBalance((prev) => parseFloat((prev - totalOrderCharge).toFixed(2)));
    setTotalSpent((prev) => parseFloat((prev + totalOrderCharge).toFixed(2)));
    setOrders((prev) => [newOrder, ...prev]);

    setOrderNotification({
      type: 'success',
      message: `Order #${newOrder.id} placed successfully! Provider ID: ${newOrder.providerOrderId}`
    });

    setOrderLink('');
  };

  // Handle Refill Request
  const handleRequestRefill = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Refilling' } : o))
    );
    alert(`Refill task dispatched to RBPanel provider for Order ${orderId}!`);
  };

  // Handle Add Funds Simulation
  const handleAddFunds = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(depositAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    setUserBalance((prev) => parseFloat((prev + amountNum).toFixed(2)));
    setDepositSuccessMsg(`Successfully credited $${amountNum.toFixed(2)} USD via ${depositMethod}! Transaction ID: ${trxNumber || 'TX-' + Math.floor(Math.random() * 9000000)}`);
    setTrxNumber('');

    setTimeout(() => setDepositSuccessMsg(null), 4000);
  };

  // Handle New Support Ticket
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim() || !newTicketMessage.trim()) return;

    const newTck: Ticket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: newTicketSubject,
      orderId: newTicketOrderId || undefined,
      status: 'Open',
      lastUpdated: 'Just now',
      messages: [{ sender: 'user', text: newTicketMessage, time: 'Just now' }]
    };

    setTickets([newTck, ...tickets]);
    setNewTicketSubject('');
    setNewTicketMessage('');
    setNewTicketOrderId('');
  };

  // Filtered Services
  const filteredServices = services.filter((s) => {
    const matchesPlatform = selectedPlatform === 'All' || s.platform === selectedPlatform;
    const matchesQuery = s.name.toLowerCase().includes(searchServiceQuery.toLowerCase()) ||
                         s.categoryName.toLowerCase().includes(searchServiceQuery.toLowerCase());
    return matchesPlatform && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-sans text-zinc-900">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 mb-2 transition-colors group">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Back to All Tools
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight flex items-center gap-2">
                SMM Panel Pro
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-100 text-purple-700 border border-purple-200 uppercase">
                  RBPanel v2 Connected
                </span>
              </h1>
              <p className="text-xs text-zinc-500">Automated Social Media Marketing Reseller & Service Hub</p>
            </div>
          </div>
        </div>

        {/* User Stats Quick Bar */}
        <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="px-3.5 py-1.5 bg-purple-50 border border-purple-100 rounded-xl">
            <div className="text-[10px] uppercase tracking-wider font-bold text-purple-600">Balance</div>
            <div className="text-sm font-extrabold text-purple-900">${userBalance.toFixed(2)} USD</div>
          </div>
          <div className="px-3.5 py-1.5 bg-zinc-50 border border-zinc-200/60 rounded-xl">
            <div className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Total Spent</div>
            <div className="text-sm font-bold text-zinc-800">${totalSpent.toFixed(2)}</div>
          </div>
          <button
            onClick={() => setActiveTab('add-funds')}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-purple-600/20 active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            Add Funds
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center gap-1 bg-zinc-100/80 p-1.5 rounded-2xl border border-zinc-200/80 mb-6 overflow-x-auto">
        {[
          { id: 'new-order', label: 'New Order', icon: ShoppingCart },
          { id: 'services', label: 'Services Catalog', icon: Layers },
          { id: 'orders', label: 'Order History', icon: Clock },
          { id: 'add-funds', label: 'Add Funds', icon: Wallet },
          { id: 'tickets', label: 'Support Tickets', icon: HelpCircle },
          { id: 'api-docs', label: 'API v2 Docs', icon: Terminal },
          { id: 'admin', label: 'Admin Panel', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-white text-purple-700 shadow-sm border border-zinc-200/60'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-zinc-500'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: NEW ORDER FORM */}
      {activeTab === 'new-order' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-950 mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-purple-600" />
              Place Social Media Order
            </h2>

            {orderNotification && (
              <div
                className={`p-4 rounded-2xl mb-6 text-xs font-medium flex items-center justify-between border ${
                  orderNotification.type === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-red-50 text-red-900 border-red-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {orderNotification.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{orderNotification.message}</span>
                </div>
                <button
                  onClick={() => setOrderNotification(null)}
                  className="text-zinc-400 hover:text-zinc-600 text-base font-bold ml-2"
                >
                  ×
                </button>
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-5">
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    const firstInCat = services.find((s) => s.categoryId === e.target.value);
                    if (firstInCat) setSelectedServiceId(firstInCat.id);
                  }}
                  className="w-full p-3.5 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 text-sm"
                >
                  <option value="ig-followers">Instagram - Followers [High Quality]</option>
                  <option value="ig-likes">Instagram - Likes [Instant]</option>
                  <option value="yt-views">YouTube - High Retention Views</option>
                  <option value="yt-subs">YouTube - Subscribers</option>
                  <option value="tt-followers">TikTok - Followers & Likes</option>
                  <option value="fb-followers">Facebook - Profile & Page Followers</option>
                  <option value="tg-members">Telegram - Members & Views</option>
                </select>
              </div>

              {/* Service Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  Service
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full p-3.5 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 text-sm"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      [{s.id}] {s.name} - ${calculateSellRate(s.providerRate).toFixed(2)} / 1000
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Info Box */}
              <div className="p-4 bg-purple-50/60 border border-purple-100 rounded-2xl text-xs space-y-2">
                <div className="flex items-center justify-between text-purple-950 font-bold">
                  <span>Speed: {currentService.speed}</span>
                  <span>Min: {currentService.min.toLocaleString()} | Max: {currentService.max.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-3 text-purple-800">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {currentService.refill ? 'Auto Refill Enabled (30 Days)' : 'No Refill'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    {currentService.cancel ? 'Cancel Button Supported' : 'No Cancel'}
                  </span>
                </div>
              </div>

              {/* Link Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  Link / Profile URL *
                </label>
                <input
                  type="text"
                  required
                  value={orderLink}
                  onChange={(e) => setOrderLink(e.target.value)}
                  placeholder="https://instagram.com/username or video URL"
                  className="w-full p-3.5 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 text-sm"
                />
              </div>

              {/* Quantity Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2 flex justify-between">
                  <span>Quantity *</span>
                  <span className="text-zinc-500 font-normal">
                    Rate: ${calculatedRatePer1000.toFixed(2)} USD per 1,000
                  </span>
                </label>
                <input
                  type="number"
                  required
                  min={currentService.min}
                  max={currentService.max}
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(parseInt(e.target.value) || 0)}
                  className="w-full p-3.5 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 font-bold focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 text-sm"
                />
              </div>

              {/* Custom Comments field if applicable */}
              {currentService.type === 'Custom Comments' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    Custom Comments (1 line per comment)
                  </label>
                  <textarea
                    rows={4}
                    value={customComments}
                    onChange={(e) => {
                      setCustomComments(e.target.value);
                      const lines = e.target.value.split('\n').filter((l) => l.trim().length > 0);
                      setOrderQuantity(lines.length || 1);
                    }}
                    placeholder="Great post!&#10;Loved this content!&#10;Awesome keep it up"
                    className="w-full p-3.5 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 text-sm"
                  />
                </div>
              )}

              {/* Charge Summary Box & Submit */}
              <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-zinc-500 font-semibold">Total Charge:</div>
                  <div className="text-2xl font-black text-purple-700">
                    ${totalOrderCharge.toFixed(2)} USD
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  Submit Order
                </button>
              </div>
            </form>
          </div>

          {/* Right Panel Widget - Provider API Status */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-zinc-900 to-purple-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                  Provider Health
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  API ONLINE
                </span>
              </div>

              <h3 className="text-xl font-black text-white mb-2">RBPanel.com v2</h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                Direct API endpoint integration. Orders dispatch automatically with instant provider order IDs.
              </p>

              <div className="space-y-2 text-xs bg-black/40 p-3 rounded-xl border border-white/10 font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Endpoint:</span>
                  <span className="text-purple-300">rbpanel.com/api/v2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Response Time:</span>
                  <span className="text-emerald-400">140ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Provider Balance:</span>
                  <span className="text-amber-300">$1,420.50 USD</span>
                </div>
              </div>
            </div>

            {/* Platform Shortcuts */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-3">Popular Platforms</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { name: 'Instagram', icon: Instagram, color: 'text-pink-600 bg-pink-50' },
                  { name: 'YouTube', icon: Youtube, color: 'text-red-600 bg-red-50' },
                  { name: 'Facebook', icon: Facebook, color: 'text-blue-600 bg-blue-50' },
                  { name: 'TikTok', icon: Zap, color: 'text-purple-600 bg-purple-50' }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setSelectedPlatform(item.name);
                        setActiveTab('services');
                      }}
                      className="p-3 rounded-xl border border-zinc-200/80 hover:border-purple-300 flex items-center gap-2 transition-all cursor-pointer text-left"
                    >
                      <div className={`p-1.5 rounded-lg ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-zinc-800">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SERVICES CATALOG */}
      {activeTab === 'services' && (
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-600" />
                Services & Pricing Catalog ({filteredServices.length})
              </h2>
              <p className="text-xs text-zinc-500 mt-1">Real-time provider rates with profit margin preview.</p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchServiceQuery}
                  onChange={(e) => setSearchServiceQuery(e.target.value)}
                  placeholder="Search service name..."
                  className="pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
                {['All', 'Instagram', 'YouTube', 'TikTok', 'Facebook', 'Telegram'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPlatform(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedPlatform === p ? 'bg-white text-purple-700 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-700">
              <thead className="bg-zinc-100/80 text-zinc-800 uppercase font-extrabold border-b border-zinc-200">
                <tr>
                  <th className="p-3.5 rounded-tl-xl">ID</th>
                  <th className="p-3.5">Service Name</th>
                  <th className="p-3.5">Rate / 1000</th>
                  <th className="p-3.5">Min / Max</th>
                  <th className="p-3.5">Features</th>
                  <th className="p-3.5 rounded-tr-xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium">
                {filteredServices.map((s) => {
                  const sellRate = calculateSellRate(s.providerRate);
                  return (
                    <tr key={s.id} className="hover:bg-purple-50/30 transition-colors">
                      <td className="p-3.5 font-bold font-mono text-purple-700">{s.id}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-zinc-900">{s.name}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">{s.categoryName}</div>
                      </td>
                      <td className="p-3.5 font-bold text-zinc-900">
                        ${sellRate.toFixed(2)} USD
                        <span className="block text-[10px] text-zinc-400 font-normal">Provider: ${s.providerRate.toFixed(2)}</span>
                      </td>
                      <td className="p-3.5 text-zinc-600 font-mono">
                        {s.min.toLocaleString()} / {s.max.toLocaleString()}
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          {s.refill && <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Refill</span>}
                          {s.cancel && <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">Cancel</span>}
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            setSelectedCategory(s.categoryId);
                            setSelectedServiceId(s.id);
                            setActiveTab('new-order');
                          }}
                          className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          Order Now
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORDER HISTORY */}
      {activeTab === 'orders' && (
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                My Orders History ({orders.length})
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">Track status, provider logs, and trigger refills.</p>
            </div>
            <button
              onClick={() => setActiveTab('new-order')}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 cursor-pointer"
            >
              + Create Order
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-700">
              <thead className="bg-zinc-100 text-zinc-800 uppercase font-extrabold border-b border-zinc-200">
                <tr>
                  <th className="p-3.5 rounded-tl-xl">Order ID</th>
                  <th className="p-3.5">Service Details</th>
                  <th className="p-3.5">Link</th>
                  <th className="p-3.5">Qty / Charge</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-tr-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-zinc-900 font-mono">{o.id}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">Provider: {o.providerOrderId}</div>
                    </td>
                    <td className="p-3.5 max-w-[240px]">
                      <div className="font-bold text-zinc-900 truncate">{o.serviceName}</div>
                      <div className="text-[10px] text-zinc-400">{o.date}</div>
                    </td>
                    <td className="p-3.5 max-w-[180px]">
                      <a href={o.link} target="_blank" rel="noreferrer" className="text-purple-600 hover:underline flex items-center gap-1 truncate font-mono">
                        {o.link}
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </td>
                    <td className="p-3.5 font-bold text-zinc-900">
                      {o.quantity.toLocaleString()} pcs
                      <div className="text-[10px] text-purple-700">${o.charge.toFixed(2)} USD</div>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        o.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        o.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        o.status === 'Refilling' ? 'bg-purple-100 text-purple-800 animate-pulse' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {o.refillEligible && (
                        <button
                          onClick={() => handleRequestRefill(o.id)}
                          className="px-3 py-1 bg-zinc-900 text-white rounded text-[11px] font-bold hover:bg-purple-600 transition-colors cursor-pointer"
                        >
                          Refill
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: ADD FUNDS / WALLET */}
      {activeTab === 'add-funds' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-950 mb-2 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-purple-600" />
              Add Deposit Funds
            </h2>
            <p className="text-xs text-zinc-500 mb-6">Select your preferred payment gateway for instant wallet top-up.</p>

            {depositSuccessMsg && (
              <div className="p-4 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-2xl text-xs font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                {depositSuccessMsg}
              </div>
            )}

            <form onSubmit={handleAddFunds} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  Payment Gateway
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['bKash', 'Nagad', 'Rocket', 'SSLCommerz', 'Crypto'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDepositMethod(m as any)}
                      className={`p-3 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                        depositMethod === m
                          ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-xs'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  Amount in USD ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full p-3.5 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 font-extrabold text-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  Transaction Code / Reference ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. BLM7X9K2P1"
                  value={trxNumber}
                  onChange={(e) => setTrxNumber(e.target.value)}
                  className="w-full p-3.5 bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 uppercase"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-purple-600/30 cursor-pointer active:scale-95"
              >
                Deposit ${parseFloat(depositAmount || '0').toFixed(2)} USD
              </button>
            </form>
          </div>

          <div className="bg-zinc-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-zinc-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Deposit Instructions
            </h3>
            <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
              <div className="p-3.5 bg-zinc-800/80 rounded-2xl border border-zinc-700">
                <span className="font-bold text-amber-300 block mb-1">bKash / Nagad / Rocket Merchant:</span>
                Send money to Personal/Merchant number: <code className="text-white font-bold font-mono">01712345678</code>
              </div>
              <p>
                1. Transfer exact amount converted at 1 USD = ৳ 120 BDT.<br />
                2. Enter your Transaction ID (TrxID) in the form.<br />
                3. Click Deposit button for instant wallet verification.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SUPPORT TICKETS */}
      {activeTab === 'tickets' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-950 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-600" />
              Open Support Ticket
            </h2>
            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  placeholder="e.g. Order speed inquiry"
                  className="w-full p-3 bg-zinc-50 border border-zinc-300 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Order ID (Optional)</label>
                <input
                  type="text"
                  value={newTicketOrderId}
                  onChange={(e) => setNewTicketOrderId(e.target.value)}
                  placeholder="ORD-98211"
                  className="w-full p-3 bg-zinc-50 border border-zinc-300 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={newTicketMessage}
                  onChange={(e) => setNewTicketMessage(e.target.value)}
                  placeholder="Describe your question or issue..."
                  className="w-full p-3 bg-zinc-50 border border-zinc-300 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 text-white font-extrabold rounded-xl hover:bg-purple-700 cursor-pointer"
              >
                Send Ticket
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-950 mb-4">Tickets History ({tickets.length})</h3>
            <div className="space-y-4">
              {tickets.map((t) => (
                <div key={t.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-zinc-900 text-sm flex items-center gap-2">
                      <span>{t.subject}</span>
                      <span className="text-xs font-mono text-purple-700">[{t.id}]</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-100 text-purple-800">
                      {t.status}
                    </span>
                  </div>

                  <div className="space-y-2 mt-3 pt-3 border-t border-zinc-200 text-xs">
                    {t.messages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl ${
                          m.sender === 'user' ? 'bg-purple-50 text-purple-950 ml-6' : 'bg-white border border-zinc-200 text-zinc-800 mr-6'
                        }`}
                      >
                        <div className="font-bold text-[10px] uppercase text-zinc-500 mb-1">
                          {m.sender === 'user' ? 'You' : 'Support Agent'} • {m.time}
                        </div>
                        <p>{m.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: API DOCS */}
      {activeTab === 'api-docs' && (
        <div className="bg-zinc-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-zinc-800 font-mono text-xs">
          <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-purple-400" />
                SMM Panel REST API v2 Specifications
              </h2>
              <p className="text-zinc-400 font-sans mt-0.5">Integration guide for reselling SMM services via API.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 font-sans">API Key:</span>
              <code className="bg-black p-2 rounded border border-zinc-800 text-purple-300 font-bold">{apiKey}</code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(apiKey);
                  setCopiedKey(true);
                  setTimeout(() => setCopiedKey(false), 2000);
                }}
                className="p-2 bg-purple-600 text-white rounded hover:bg-purple-500 cursor-pointer"
              >
                {copiedKey ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-amber-400 font-bold mb-1">HTTP POST Endpoint:</div>
              <div className="p-3 bg-black rounded-xl border border-zinc-800 text-emerald-400">
                POST https://rbpanel.com/api/v2
              </div>
            </div>

            <div>
              <div className="text-purple-300 font-bold mb-2">1. Add Order Parameters (action=add):</div>
              <pre className="p-4 bg-black rounded-xl border border-zinc-800 text-zinc-300 overflow-x-auto">
{`curl -X POST https://rbpanel.com/api/v2 \\
  -d "key=${apiKey}" \\
  -d "action=add" \\
  -d "service=101" \\
  -d "link=https://instagram.com/my_profile" \\
  -d "quantity=1000"`}
              </pre>
            </div>

            <div>
              <div className="text-purple-300 font-bold mb-2">2. Check Order Status (action=status):</div>
              <pre className="p-4 bg-black rounded-xl border border-zinc-800 text-zinc-300 overflow-x-auto">
{`curl -X POST https://rbpanel.com/api/v2 \\
  -d "key=${apiKey}" \\
  -d "action=status" \\
  -d "order=98210"`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: ADMIN PANEL */}
      {activeTab === 'admin' && (
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-600" />
                Admin Panel Settings
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">Configure profit margins, auto service sync, and RBPanel provider API key.</p>
            </div>
            <button
              onClick={triggerAutoSync}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Sync Services Now
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-purple-50/50 border border-purple-100 rounded-2xl space-y-4">
              <h3 className="font-bold text-purple-950 text-sm">Profit Markup Engine</h3>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-2">Markup Calculation Mode</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setProfitType('percentage')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                      profitType === 'percentage' ? 'bg-purple-600 text-white' : 'bg-white border border-zinc-200 text-zinc-700'
                    }`}
                  >
                    Percentage Markup (%)
                  </button>
                  <button
                    onClick={() => setProfitType('fixed')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                      profitType === 'fixed' ? 'bg-purple-600 text-white' : 'bg-white border border-zinc-200 text-zinc-700'
                    }`}
                  >
                    Fixed Markup ($)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Value ({profitType === 'percentage' ? '%' : 'USD $'})
                </label>
                <input
                  type="number"
                  value={markupValue}
                  onChange={(e) => setMarkupValue(parseFloat(e.target.value) || 0)}
                  className="w-full p-3 bg-white border border-zinc-300 rounded-xl font-extrabold text-purple-900"
                />
              </div>
            </div>

            <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-4">
              <h3 className="font-bold text-zinc-900 text-sm">Provider Sync Log</h3>
              <div className="text-xs text-zinc-600 space-y-2">
                <div className="flex justify-between">
                  <span>Last Sync Status:</span>
                  <span className="font-bold text-emerald-600">{lastSyncTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Provider Target:</span>
                  <span className="font-mono text-purple-700 font-bold">RBPanel v2</span>
                </div>
                <div className="flex justify-between">
                  <span>Sync Interval:</span>
                  <span className="font-bold">Every 30 Minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
