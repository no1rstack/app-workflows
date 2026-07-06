import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users as UsersIcon, ShieldAlert, Terminal, Sparkles } from 'lucide-react';
import { UserSession } from '../types';

export default function Users() {
  const [sessions, setSessions] = useState<UserSession[]>([
    {
      id: 's1',
      username: 'shdwcdr@gmail.com',
      action: 'Initiated investigation on 185.220.101.5',
      targetApp: 'JUDICIUM',
      timestamp: 'Just now',
    },
    {
      id: 's2',
      username: 'cascades_daemon',
      action: 'Triggered collection pipeline #409',
      targetApp: 'CASCADES',
      timestamp: '1m ago',
    },
    {
      id: 's3',
      username: 'hexarch_node_3',
      action: 'Generated cryptographic proof of custody',
      targetApp: 'HEXARCH',
      timestamp: '2m ago',
    },
    {
      id: 's4',
      username: 'aitracer_agent',
      action: 'Flagged suspicious prompt injection attempt',
      targetApp: 'AITRACER',
      timestamp: '4m ago',
    },
  ]);

  // Periodically generate simulated cybersecurity/AI events to keep the UI active
  useEffect(() => {
    const actions = [
      { username: 'sec_analyst_04', action: 'Audited secret retrieval event', targetApp: 'INFISICAL' },
      { username: 'shdwcdr@gmail.com', action: 'Exported forensic pdf report', targetApp: 'JUDICIUM' },
      { username: 'noirai_agent_9', action: 'Resolved system anomaly alert', targetApp: 'NOIRAI' },
      { username: 'ledger_service', action: 'Invoiced client subscription', targetApp: 'LEDGERBILL' },
      { username: 'noirbot_assistant', action: 'Summarized malware sandbox results', targetApp: 'NOIRBOT' },
      { username: 'gateway_apisix', action: 'Rate-limited brute-force on auth-v1', targetApp: 'APISIX' },
    ];

    const interval = setInterval(() => {
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const newSession: UserSession = {
        id: 's-' + Math.random().toString(36).substring(2, 9),
        username: randomAction.username,
        action: randomAction.action,
        targetApp: randomAction.targetApp,
        timestamp: 'Just now',
      };

      setSessions((prev) => {
        // Keep only latest 4 sessions
        const updated = [newSession, ...prev.map(s => {
          if (s.timestamp === 'Just now') return { ...s, timestamp: '1m ago' };
          if (s.timestamp === '1m ago') return { ...s, timestamp: '2m ago' };
          if (s.timestamp === '2m ago') return { ...s, timestamp: '3m ago' };
          return { ...s, timestamp: '4m ago' };
        })];
        return updated.slice(0, 4);
      });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="live-session-stream" className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 border-b border-neutral-900 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <h5 className="font-display font-bold text-xs tracking-wider text-white uppercase">
            Live Platform Activity
          </h5>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase">
            REALTIME
          </span>
        </div>
      </div>

      <div className="space-y-3 max-h-[220px] overflow-hidden">
        <AnimatePresence initial={false}>
          {sessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="p-2.5 rounded border border-neutral-900 bg-black/60 flex flex-col gap-1 overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-medium text-neutral-400 truncate max-w-[130px]">
                  {session.username}
                </span>
                <span 
                  className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: 
                      session.targetApp === 'JUDICIUM' ? 'rgba(168, 85, 247, 0.15)' :
                      session.targetApp === 'CASCADES' ? 'rgba(34, 197, 94, 0.15)' :
                      session.targetApp === 'HEXARCH' ? 'rgba(59, 130, 246, 0.15)' :
                      session.targetApp === 'AITRACER' ? 'rgba(20, 184, 166, 0.15)' :
                      'rgba(99, 102, 241, 0.15)',
                    color:
                      session.targetApp === 'JUDICIUM' ? '#c084fc' :
                      session.targetApp === 'CASCADES' ? '#4ade80' :
                      session.targetApp === 'HEXARCH' ? '#60a5fa' :
                      session.targetApp === 'AITRACER' ? '#2dd4bf' :
                      '#818cf8',
                  }}
                >
                  {session.targetApp}
                </span>
              </div>
              
              <div className="text-[10px] font-sans text-neutral-300">
                {session.action}
              </div>

              <div className="flex justify-between items-center mt-1 text-[8px] font-mono text-neutral-600">
                <span className="flex items-center gap-1">
                  <ShieldAlert className="w-2.5 h-2.5 text-neutral-500" />
                  SECURITY EVENT VERIFIED
                </span>
                <span>{session.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
