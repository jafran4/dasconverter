import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Info, ArrowLeft, Globe, Shield, Cpu, Layout, Languages, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BrowserInfo = () => {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    const getBrowser = () => {
      const ua = navigator.userAgent;
      let tem;
      let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
      }
      if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
      M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
      if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
      return M.join(' ');
    };

    const getOS = () => {
      const userAgent = window.navigator.userAgent;
      const platform = (window.navigator as any).platform;
      const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
      const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
      const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
      let os = null;

      if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'macOS';
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
      } else if (/Android/.test(userAgent)) {
        os = 'Android';
      } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
      }

      return os || 'Unknown OS';
    };

    setInfo({
      browser: getBrowser(),
      os: getOS(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages.join(', '),
      cookiesEnabled: navigator.cookieEnabled ? 'Yes' : 'No',
      online: navigator.onLine ? 'Online' : 'Offline',
      platform: (navigator as any).platform,
      hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      doNotTrack: navigator.doNotTrack === '1' ? 'Enabled' : 'Disabled',
    });
  }, []);

  if (!info) return null;

  const infoCards = [
    { icon: Globe, label: 'Browser', value: info.browser },
    { icon: Layout, label: 'Operating System', value: info.os },
    { icon: Languages, label: 'Language', value: info.language },
    { icon: Shield, label: 'Cookies Enabled', value: info.cookiesEnabled },
    { icon: Cpu, label: 'CPU Cores', value: info.hardwareConcurrency },
    { icon: Clock, label: 'Timezone', value: info.timezone },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Info className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Browser Info Checker</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Detailed information about your browser, operating system, and device settings.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {infoCards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3 text-zinc-500">
              <card.icon className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">{card.label}</span>
            </div>
            <p className="text-lg font-bold text-zinc-900 truncate">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <h2 className="text-xl font-bold text-zinc-900 mb-6">Advanced Details</h2>
        <div className="space-y-4">
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
            <p className="text-xs font-bold text-zinc-400 uppercase mb-1">User Agent String</p>
            <p className="text-sm font-mono text-zinc-600 break-all">{info.userAgent}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
              <p className="text-xs font-bold text-zinc-400 uppercase mb-1">Platform</p>
              <p className="text-sm font-medium text-zinc-700">{info.platform}</p>
            </div>
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
              <p className="text-xs font-bold text-zinc-400 uppercase mb-1">Do Not Track</p>
              <p className="text-sm font-medium text-zinc-700">{info.doNotTrack}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">Why Check Browser Information?</h2>
        <p className="text-zinc-600 mb-6">
          Knowing your browser details is crucial for troubleshooting website issues, ensuring security updates are installed, and understanding how websites see your device. Developers use this info to debug compatibility problems and optimize user experiences.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Key Information Points</h3>
            <ul className="space-y-2 text-zinc-600 text-sm">
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <strong>User Agent:</strong> A string that identifies your browser and OS to web servers.
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <strong>Cookies:</strong> Small pieces of data stored by websites to remember your preferences.
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <strong>Hardware Concurrency:</strong> The number of logical processors available on your device.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 mb-3">Security & Privacy</h3>
            <p className="text-zinc-600 text-sm mb-4">
              Modern browsers include privacy features like "Do Not Track" and the ability to disable third-party cookies. Our tool helps you verify if these settings are active.
            </p>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800">
              <strong>Tip:</strong> Always keep your browser updated to the latest version to protect yourself from the latest security vulnerabilities.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Is my information private?</h3>
            <p className="text-zinc-600">Yes. This tool runs entirely on your device. We do not transmit or store any of your browser or system information on our servers.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">What is a User Agent?</h3>
            <p className="text-zinc-600">A User Agent is a short string that tells a website which browser and operating system you are using. It helps the site deliver the correct version of its content.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">Why is my OS reported as Linux?</h3>
            <p className="text-zinc-600">Android and ChromeOS are based on the Linux kernel, so they are often reported as "Linux" in the platform property of the browser.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 mb-2">What is Hardware Concurrency?</h3>
            <p className="text-zinc-600">It indicates the number of logical CPU cores your computer has. This allows web applications to run background tasks more efficiently using Web Workers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
