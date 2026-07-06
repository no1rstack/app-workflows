import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, Terminal, Layers, FileCode, Cpu, ShieldAlert, 
  Copy, Check, ExternalLink, RefreshCw, Radio, Settings, Box
} from 'lucide-react';

type IntegrationType = 'rest' | 'graphql' | 'sdk' | 'cli' | 'terraform' | 'webhooks' | 'openapi' | 'events';

interface IntegrationDetail {
  id: IntegrationType;
  title: string;
  badge: string;
  desc: string;
  icon: React.ComponentType<any>;
  lang: string;
  snippet: string;
  endpoint?: string;
  headers?: Record<string, string>;
}

export default function DeveloperSuite() {
  const [activeTab, setActiveTab] = useState<IntegrationType>('sdk');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const integrations: Record<IntegrationType, IntegrationDetail> = {
    sdk: {
      id: 'sdk',
      title: 'Type-Safe SDK',
      badge: '@noirstack/sdk',
      desc: 'Connect applications with strict type safety, automatic retries, and in-memory caching.',
      icon: Code,
      lang: 'typescript',
      snippet: `import { NoirClient } from '@noirstack/sdk';

const noir = new NoirClient({
  apiKey: process.env.NOIR_API_KEY || 'nr_live_8f0a29bb892',
  environment: 'production',
  maxRetries: 3
});

// Stream unified ingestion stream
const response = await noir.cascades.dispatch('Workflow.Started', {
  caseId: 'case_981a2',
  priority: 'CRITICAL',
  metadata: { source: 'api-gateway' }
});

console.log('Trace Token Synced:', response.traceId);`
    },
    rest: {
      id: 'rest',
      title: 'REST API',
      badge: 'POST /v1/cascades',
      desc: 'Fully compliant JSON-over-HTTPS REST endpoints with standard bearer authentication.',
      icon: GlobeIcon,
      lang: 'bash',
      endpoint: 'https://api.noirstack.com/v1/cascades/dispatch',
      headers: {
        'Authorization': 'Bearer nr_live_8f0a29bb892c5567a102',
        'Content-Type': 'application/json'
      },
      snippet: `curl -X POST https://api.noirstack.com/v1/cascades/dispatch \\
  -H "Authorization: Bearer nr_live_8f0a29bb892c5567a102" \\
  -H "Content-Type: application/json" \\
  -d '{
    "event": "Workflow.Started",
    "caseId": "case_981a2",
    "priority": "CRITICAL",
    "payload": {
      "source": "automated-phishing-scan"
    }
  }'`
    },
    graphql: {
      id: 'graphql',
      title: 'GraphQL API',
      badge: 'POST /v1/graphql',
      desc: 'Query relational entity layers, fetch metrics, and build customized analytics views.',
      icon: NetworkIcon,
      lang: 'graphql',
      snippet: `mutation DispatchWorkflow($input: CascadeDispatchInput!) {
  dispatchCascade(input: $input) {
    traceId
    status
    timestamp
    activeNode {
      name
      loadFactor
    }
  }
}

# Variables payload
{
  "input": {
    "event": "Workflow.Started",
    "caseId": "case_981a2",
    "priority": "CRITICAL"
  }
}`
    },
    cli: {
      id: 'cli',
      title: 'Noir CLI Tool',
      badge: 'npm i -g @noirstack/cli',
      desc: 'Manage tunnels, execute remote diagnostics, and push workflow blueprints via CLI.',
      icon: Terminal,
      lang: 'bash',
      snippet: `# Connect local daemon to Sovereign Cloud
noir auth login --token nr_live_8f0a29bb892

# Establish secure telemetry tunnels on local port
noir dev tunnel --port 3000 --expose

# Push active rule configurations to HexArch
noir deploy --config noir.yaml --production --force`
    },
    terraform: {
      id: 'terraform',
      title: 'Terraform Provider',
      badge: 'noirstack/noirstack',
      desc: 'Declare and provision spaces, data pipelines, and RBAC rules as immutable code.',
      icon: FileCode,
      lang: 'hcl',
      snippet: `terraform {
  required_providers {
    noirstack = {
      source  = "noirstack/noirstack"
      version = "~> 2.1.0"
    }
  }
}

resource "noir_workspace" "sec_ops" {
  name           = "threat_intelligence"
  retention_days = 90
}

resource "noir_pipeline" "ingest" {
  workspace_id = noir_workspace.sec_ops.id
  name         = "automated_phishing_pipeline"
  source       = "cascades"
  destination  = "judicium"
}`
    },
    webhooks: {
      id: 'webhooks',
      title: 'Webhooks',
      badge: 'HTTP POST callback',
      desc: 'Receive cryptographically signed events in real-time as state transitions execute.',
      icon: Settings,
      lang: 'javascript',
      headers: {
        'X-Noir-Signature-256': 't=1658392019,v1=sha256_8a7dfa819b98c392fa',
        'User-Agent': 'NoirStack-Webhook-Dispatcher/2.0'
      },
      snippet: `// Express.js hook handler with signature validation
app.post('/webhooks/noir', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-noir-signature-256'];
  const payload = req.body;
  
  try {
    const verifiedEvent = noir.webhooks.constructEvent(payload, signature, process.env.WEBHOOK_SECRET);
    console.log('Verified webhook event received:', verifiedEvent.type);
    res.status(200).send({ received: true });
  } catch (err) {
    res.status(400).send('Webhook Signature Verification Failed');
  }
});`
    },
    openapi: {
      id: 'openapi',
      title: 'OpenAPI Spec',
      badge: 'v3.0.3 yaml',
      desc: 'Download raw Swagger schemas to autogenerate custom multi-language SDK clients.',
      icon: Layers,
      lang: 'yaml',
      snippet: `openapi: 3.0.3
info:
  title: Noir Stack API Specification
  version: 4.1.0
paths:
  /v1/cascades/dispatch:
    post:
      summary: Dispatch new operational workflow
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CascadePayload'`
    },
    events: {
      id: 'events',
      title: 'Async Events',
      badge: 'Cloudevents spec',
      desc: 'Stream standardized, cloud-native event envelopes directly onto your messaging queue.',
      icon: Radio,
      lang: 'json',
      snippet: `{
  "specversion": "1.0",
  "type": "com.noirstack.events.workflow.started",
  "source": "/cascades/dispatch-handler",
  "id": "evt_wf_9A7D3F",
  "time": "2026-07-03T18:19:53Z",
  "datacontenttype": "application/json",
  "data": {
    "workflow_id": "wf_case_731093",
    "case_id": "case_981a2",
    "priority": "CRITICAL"
  }
}`
    }
  };

  const activeData = integrations[activeTab];
  const IconComponent = activeData.icon;

  return (
    <div id="developer-suite" className="relative rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6 md:p-8 backdrop-blur-md">
      {/* Visual cyber mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.02),transparent_60%)] pointer-events-none" />

      {/* Decorative Accent border */}
      <div className="absolute top-0 right-12 w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* Grid: 8 Selector buttons vs. interactive payload monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left selector menu (Col-span 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-[#ff7a1a] font-bold uppercase block">
              Omnichannel Integration Surface
            </span>
            <h4 className="font-display font-extrabold text-sm text-neutral-200 uppercase tracking-wider">
              How Do You Want to Integrate?
            </h4>
            <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
              Noir Stack provides comprehensive, first-class parity across 8 operational developer interfaces to support diverse engineering pipelines.
            </p>
          </div>

          {/* Interactive Bento grid of buttons */}
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(integrations) as IntegrationType[]).map((key) => {
              const item = integrations[key];
              const TabIcon = item.icon;
              const isSelected = activeTab === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between min-h-[72px] ${
                    isSelected 
                      ? 'bg-neutral-900/60 border-neutral-700 shadow-[0_0_12px_rgba(6,182,212,0.05)]' 
                      : 'bg-black/55 border-neutral-900/80 hover:border-neutral-850'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <div 
                      className="p-1 rounded bg-neutral-950 border"
                      style={{ borderColor: isSelected ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.03)' }}
                    >
                      <TabIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-neutral-500'}`} />
                    </div>
                    <span className={`text-[10px] font-mono font-bold tracking-tight ${isSelected ? 'text-white' : 'text-neutral-400'}`}>
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-neutral-600 truncate uppercase mt-1">
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-neutral-900/60 flex items-center justify-between text-[10px] font-mono text-neutral-500">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              100% API Cover parity
            </span>
            <span className="text-cyan-400">REST v4.1.0</span>
          </div>
        </div>

        {/* Right payload terminal (Col-span 8) */}
        <div className="lg:col-span-8 flex flex-col rounded-xl border border-neutral-900 bg-neutral-950/80 overflow-hidden relative">
          
          {/* Header */}
          <div className="bg-neutral-950 px-4 py-2.5 border-b border-neutral-900/60 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
              <span className="text-[9px] font-mono text-neutral-400 ml-3 uppercase tracking-wider font-semibold">
                {activeData.title} Specifications
              </span>
            </div>

            <button
              onClick={() => handleCopy(activeData.snippet, activeData.id)}
              className="text-neutral-500 hover:text-white transition-colors flex items-center gap-1 text-[9px] font-mono uppercase bg-black/40 px-2 py-0.5 rounded border border-neutral-900 cursor-pointer"
            >
              {copiedText === activeData.id ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1"><Check className="w-3 h-3" /> Copied!</span>
              ) : (
                <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> Copy Snippet</span>
              )}
            </button>
          </div>

          {/* Body */}
          <div className="p-4 flex-1 flex flex-col justify-between bg-black/30">
            
            {/* Description & metadata */}
            <div className="mb-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold text-white bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800 text-cyan-400">
                  {activeData.badge}
                </span>
                <span className="text-[9px] font-sans text-neutral-400 leading-tight">
                  {activeData.desc}
                </span>
              </div>

              {/* Endpoint or Headers if present */}
              {activeData.endpoint && (
                <div className="mt-2.5 p-2 bg-neutral-950 rounded border border-neutral-900 flex items-center justify-between text-[10px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-extrabold uppercase">POST</span>
                    <span className="text-neutral-400">{activeData.endpoint}</span>
                  </div>
                  <span className="text-[8px] text-neutral-500">PUBLIC ROUTE</span>
                </div>
              )}

              {activeData.headers && (
                <div className="mt-2 p-2 bg-neutral-950 rounded border border-neutral-900 space-y-1 text-[9px] font-mono">
                  <span className="text-[8px] text-neutral-500 uppercase tracking-widest font-semibold block">Request Headers</span>
                  {Object.entries(activeData.headers).map(([key, val]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-neutral-400">{key}:</span>
                      <span className="text-[#ff7a1a] font-medium truncate max-w-[280px]">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Code Highlight box */}
            <div className="relative bg-neutral-950 p-4 rounded-lg border border-neutral-900/80 overflow-auto max-h-[310px] scrollbar-thin">
              <pre className="font-mono text-[10px] text-neutral-200 leading-relaxed">
                <code>{activeData.snippet}</code>
              </pre>
            </div>
          </div>

          {/* Footnotes */}
          <div className="bg-neutral-950 px-4 py-2 border-t border-neutral-900/60 flex items-center justify-between text-[9px] font-mono text-neutral-600">
            <span>SCHEMAS SYNCED TO OPENAPI V3</span>
            <span className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer">
              Read Docs <ExternalLink className="w-2.5 h-2.5" />
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

// Inline icons to bypass import errors
function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
  );
}

function NetworkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M12 8v8"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/></svg>
  );
}
