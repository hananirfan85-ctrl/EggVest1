import React, { useState } from 'react';
import { Code2, Play, CheckCircle2, Copy, Check, X, Server, Database } from 'lucide-react';

interface RESTApiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RESTApiModal: React.FC<RESTApiModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeEndpoint, setActiveEndpoint] = useState<string>('/api/health');
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');
  const [requestBody, setRequestBody] = useState<string>('{\n  "prompt": "What is the daily egg crate yield for 500 layer hens?"\n}');
  const [responseLog, setResponseLog] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    { method: 'GET', url: '/api/health', name: 'Health Check API' },
    { method: 'GET', url: '/api/docs', name: 'OpenAPI Schema Spec' },
    { method: 'POST', url: '/api/ai/advise', name: 'AI Livestock Advisor REST Endpoint' },
  ];

  const handleTestAPI = async () => {
    setLoading(true);
    setResponseLog(null);
    try {
      let res;
      if (method === 'GET') {
        res = await fetch(activeEndpoint);
      } else {
        res = await fetch(activeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody
        });
      }
      const data = await res.json();
      setResponseLog(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setResponseLog(JSON.stringify({ error: e.message || "Failed request" }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (responseLog) {
      navigator.clipboard.writeText(responseLog);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-950 text-slate-100 rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-800 overflow-hidden relative font-mono text-xs">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">OvumYield REST API Console & OpenAPI Spec</h3>
              <p className="text-slate-400 text-[11px] font-sans">Live JSON API tester for backend service endpoints</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Endpoint Selector */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-sans">
              Select REST Endpoint
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {endpoints.map((ep, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveEndpoint(ep.url);
                    setMethod(ep.method as any);
                  }}
                  className={`p-2.5 rounded-lg border text-left transition cursor-pointer flex items-center gap-2 ${
                    activeEndpoint === ep.url
                      ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-850'
                  }`}
                >
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${ep.method === 'GET' ? 'bg-emerald-950 text-emerald-400' : 'bg-blue-950 text-blue-400'}`}>
                    {ep.method}
                  </span>
                  <span className="truncate text-[11px] font-sans">{ep.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Request Config */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${method === 'GET' ? 'bg-emerald-900 text-emerald-300' : 'bg-blue-900 text-blue-300'}`}>
                {method}
              </span>
              <input
                type="text"
                readOnly
                value={activeEndpoint}
                className="flex-1 bg-slate-950 px-3 py-1.5 border border-slate-800 rounded text-slate-200 text-xs font-mono"
              />
              <button
                onClick={handleTestAPI}
                disabled={loading}
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold font-sans rounded flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute</span>
              </button>
            </div>

            {method === 'POST' && (
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-sans mb-1">JSON Payload Body</label>
                <textarea
                  rows={3}
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-amber-300 font-mono text-xs focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Response Console */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                HTTP Response Payload (JSON)
              </label>
              {responseLog && (
                <button
                  onClick={handleCopy}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] font-sans cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                </button>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 h-52 overflow-y-auto text-emerald-400 font-mono leading-relaxed text-[11px]">
              {loading ? (
                <div className="text-slate-400 flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <span>Executing HTTP Request...</span>
                </div>
              ) : responseLog ? (
                <pre>{responseLog}</pre>
              ) : (
                <span className="text-slate-600 italic">Click "Execute" to run API query and observe response JSON payload.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
