import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cloud, Cpu, Server, Shield, Radio, Layers, 
  Terminal, CheckCircle, Code, Copy, Check, Globe, HelpCircle 
} from 'lucide-react';

type PlatformId = 'aws' | 'azure' | 'gcp' | 'kubernetes' | 'docker' | 'bare_metal' | 'air_gapped' | 'edge' | 'sovereign_cloud';

interface DeploymentPlatform {
  id: PlatformId;
  name: string;
  icon: string;
  category: 'cloud' | 'orchestration' | 'sovereign';
  status: string;
  latency: string;
  setupSnippet: string;
  details: string;
}

export default function DeploymentHub() {
  const [activePlatform, setActivePlatform] = useState<PlatformId>('kubernetes');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const platforms: Record<PlatformId, DeploymentPlatform> = {
    aws: {
      id: 'aws',
      name: 'AWS Cloud',
      icon: '☁ AWS',
      category: 'cloud',
      status: 'Ready / AWS EKS',
      latency: '< 1ms inter-AZ',
      details: 'Deploy across Amazon Web Services using AWS EKS clusters, leveraging AWS HSM, KMS keys, and RDS Multi-AZ storage instances.',
      setupSnippet: `# Provision AWS Secure Cloud Workspace via AWS CLI
aws eks create-cluster \\
  --name noir-prod-cluster \\
  --region us-east-1 \\
  --node-type r6i.2xlarge \\
  --secrets-encryption-key arn:aws:kms:us-east-1:123456789:key/noir-hsm-key`
    },
    azure: {
      id: 'azure',
      name: 'Microsoft Azure',
      icon: '☁ Azure',
      category: 'cloud',
      status: 'Ready / AKS',
      latency: '< 1ms inter-region',
      details: 'Integrate natively with Microsoft Azure utilizing AKS (Azure Kubernetes Service), Key Vault secrets, and Sovereign Region enclaves.',
      setupSnippet: `# Azure CLI provisioning script for AKS
az aks create \\
  --resource-group NoirStackSecurity \\
  --name noir-aks-prod \\
  --node-count 5 \\
  --node-vm-size Standard_D8s_v5 \\
  --enable-addons monitoring,azure-keyvault-secrets-provider`
    },
    gcp: {
      id: 'gcp',
      name: 'Google Cloud (GCP)',
      icon: '☁ GCP',
      category: 'cloud',
      status: 'Ready / GKE Autopilot',
      latency: '< 1ms GKE',
      details: 'Streamlined container architecture utilizing GKE (Google Kubernetes Engine) with Cloud Run serverless triggers and Cloud SQL backups.',
      setupSnippet: `# Create GKE Autopilot cluster for secure Noir instances
gcloud container clusters create-auto noir-gke-production \\
  --region=us-central1 \\
  --project=noirstack-corp-401 \\
  --scopes=https://www.googleapis.com/auth/cloud-platform`
    },
    kubernetes: {
      id: 'kubernetes',
      name: 'Kubernetes Cluster',
      icon: '□ Kubernetes',
      category: 'orchestration',
      status: 'Ready / Helm v3',
      latency: 'Auto-orchestrated',
      details: 'Production-ready declarative orchestration utilizing the official Helm Chart with automated rolling updates, persistent volume bindings, and custom HPA (Horizontal Pod Autoscalers).',
      setupSnippet: `# Deploy official Helm Chart in your namespace
helm repo add noirstack-charts https://charts.noirstack.com
helm install noir-operator noirstack-charts/noirstack-operator \\
  --namespace noirstack-system \\
  --create-namespace \\
  --set global.hsmProvider=vault \\
  --set replicas=5`
    },
    docker: {
      id: 'docker',
      name: 'Docker Engine',
      icon: '□ Docker',
      category: 'orchestration',
      status: 'Ready / Compose',
      latency: 'Single-node daemon',
      details: 'Deploy standard local sandbox development environments using container-ready Docker Compose specifications.',
      setupSnippet: `# docker-compose.prod.yaml
version: '3.8'
services:
  control-plane:
    image: noirstack/control-plane-os:latest
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - HSM_MODE=local-ephemeral
      - DATA_PATH=/var/lib/noir/data
    volumes:
      - noir-data:/var/lib/noir/data`
    },
    bare_metal: {
      id: 'bare_metal',
      name: 'Bare Metal Servers',
      icon: '□ Bare Metal',
      category: 'orchestration',
      status: 'Ready / systemd',
      latency: 'Raw physical speed',
      details: 'Deploy directly on local physical servers (Dell PowerEdge, HPE ProLiant) to eliminate virtualization and hypervisor overhead.',
      setupSnippet: `# Install raw deb/rpm binary bundle
wget https://get.noirstack.com/release/noirstack-control-plane_4.1.0_amd64.deb
sudo dpkg -i noirstack-control-plane_4.1.0_amd64.deb

# Enable and start raw host systemd unit
sudo systemctl enable --now noirstack-control-plane`
    },
    air_gapped: {
      id: 'air_gapped',
      name: 'Air-Gapped Facilities',
      icon: '□ Air Gapped',
      category: 'sovereign',
      status: 'Ready / Offline Bundle',
      latency: 'No public egress',
      details: 'Designed for high-security environments (defense, banking). Boot up isolated instances without active internet connection using static tape backups or local flash mounts.',
      setupSnippet: `# Unpack static self-contained tarball bundle
tar -xvf noirstack-airgap-bundle-v4.1.0.tar.gz -C /opt/noirstack
cd /opt/noirstack

# Initialize offline offline-first setup sequence
./scripts/initialize-offline.sh \\
  --compliance=fips-140-3 \\
  --offline-keys=/mnt/hardware-hsm/keys.pem`
    },
    edge: {
      id: 'edge',
      name: 'Distributed Edge',
      icon: '□ Edge',
      category: 'sovereign',
      status: 'Ready / lightweight',
      latency: '< 5ms field deployment',
      details: 'Lightweight binary distributions with stripped dependencies optimized for small-footprint field IoT systems and satellite receivers.',
      setupSnippet: `# Launch resource-constrained edge agent daemon
noir-edge-agent \\
  --parent-endpoint=https://gateway.noirstack.corp \\
  --local-db=sqlite3:///tmp/noir-edge.db \\
  --max-memory=512MB \\
  --stream-compression=lz4`
    },
    sovereign_cloud: {
      id: 'sovereign_cloud',
      name: 'Sovereign Cloud',
      icon: '□ Sovereign Cloud',
      category: 'sovereign',
      status: 'Ready / Isolated',
      latency: 'Geographically fenced',
      details: 'Host in geographically bounded datacenters compliant with stringent country-specific residency mandates (such as EU Sovereign Cloud or US FedRAMP High).',
      setupSnippet: `# Declare localized geographical binding config
./noir-admin-cli configure-residency \\
  --country-code=EU \\
  --datacenter-id=eu-de-fra-09 \\
  --restrict-crossborder-egress=true \\
  --encrypt-data-at-rest=true`
    }
  };

  const activeData = platforms[activePlatform];

  return (
    <div id="deployment-hub" className="relative rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6 md:p-8 backdrop-blur-md overflow-hidden">
      
      {/* Background visual indicators */}
      <div className="absolute top-0 left-10 w-48 h-48 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-48 h-48 bg-[#ff7a1a]/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Decorative cyber corner ticks */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/30" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ff7a1a]/30" />

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-neutral-900 pb-4 mb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#ff7a1a] font-bold uppercase block">
            DEVOPS & DISTRIBUTED TOPOLOGY
          </span>
          <h3 className="font-display font-extrabold text-base md:text-lg text-white uppercase mt-0.5 tracking-wider">
            DEPLOY ANYWHERE
          </h3>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 bg-black/40 px-3 py-1 rounded border border-neutral-900">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>FIPS 140-3 SECURITY STANDARD COMPLIANT</span>
        </div>
      </div>

      <p className="text-xs md:text-sm text-neutral-400 mb-8 max-w-3xl leading-relaxed">
        Noir Stack is architected to operate flawlessly on any environment. Run isolated on public clouds, scale dynamically using microservices, or isolate entirely inside air-gapped secure military centers.
      </p>

      {/* Grid: 9 Platforms Selector vs. Active deployment console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Platforms selection menu (Col-span 5) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Cloud Platforms */}
          <div className="space-y-2">
            <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">
              ☁ Public Cloud Gateways
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['aws', 'azure', 'gcp'] as PlatformId[]).map((pid) => {
                const item = platforms[pid];
                const isSelected = activePlatform === pid;
                return (
                  <button
                    key={pid}
                    onClick={() => setActivePlatform(pid)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[64px] ${
                      isSelected 
                        ? 'bg-neutral-900/60 border-neutral-700 text-white shadow-[0_0_8px_rgba(6,182,212,0.05)]' 
                        : 'bg-black/55 border-neutral-900/80 text-neutral-400 hover:text-white hover:border-neutral-800'
                    }`}
                  >
                    <span className="text-xs font-bold font-sans tracking-wide block">{item.icon.split(' ')[1]}</span>
                    <span className="text-[8px] font-mono text-neutral-500 mt-1 uppercase block">CLOUD</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Orchestration */}
          <div className="space-y-2">
            <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">
              □ Orchestration & Containers
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['kubernetes', 'docker', 'bare_metal'] as PlatformId[]).map((pid) => {
                const item = platforms[pid];
                const isSelected = activePlatform === pid;
                return (
                  <button
                    key={pid}
                    onClick={() => setActivePlatform(pid)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[64px] ${
                      isSelected 
                        ? 'bg-neutral-900/60 border-neutral-700 text-white shadow-[0_0_8px_rgba(6,182,212,0.05)]' 
                        : 'bg-black/55 border-neutral-900/80 text-neutral-400 hover:text-white hover:border-neutral-800'
                    }`}
                  >
                    <span className="text-[10px] font-bold font-sans tracking-tight block">{item.name.replace(' Cluster', '').replace(' Servers', '')}</span>
                    <span className="text-[8px] font-mono text-neutral-500 mt-1 uppercase block">HOST</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* High Security / Sovereign / Specialized */}
          <div className="space-y-2">
            <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">
              ⊞ Sovereign & Secure Environments
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['air_gapped', 'edge', 'sovereign_cloud'] as PlatformId[]).map((pid) => {
                const item = platforms[pid];
                const isSelected = activePlatform === pid;
                return (
                  <button
                    key={pid}
                    onClick={() => setActivePlatform(pid)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[64px] ${
                      isSelected 
                        ? 'bg-neutral-900/60 border-neutral-700 text-white shadow-[0_0_8px_rgba(255,122,26,0.05)]' 
                        : 'bg-black/55 border-neutral-900/80 text-neutral-400 hover:text-white hover:border-neutral-800'
                    }`}
                  >
                    <span className="text-[10px] font-bold font-sans tracking-tight block leading-tight">{item.name.replace(' Facilities', '')}</span>
                    <span className="text-[8px] font-mono text-[#ff7a1a] mt-1 uppercase block">ISOLATED</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick specs list */}
          <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-900/60 text-[10px] font-mono space-y-1 text-neutral-500">
            <div className="flex justify-between">
              <span>SECURITY CERTIFICATION:</span>
              <span className="text-emerald-400 font-bold">FIPS-140-3 LEVEL 4</span>
            </div>
            <div className="flex justify-between">
              <span>ZERO-TRUST AGENT COMPLIANCE:</span>
              <span className="text-white font-bold">100% COMPLETE</span>
            </div>
            <div className="flex justify-between">
              <span>REGIONAL GEODATA RESIDENCY:</span>
              <span className="text-[#ff7a1a] font-bold">CONFIGURABLE</span>
            </div>
          </div>
        </div>

        {/* Deployment manifest console (Col-span 7) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-neutral-900 bg-neutral-950/80 overflow-hidden relative min-h-[350px]">
          
          {/* Top terminal bar */}
          <div className="bg-neutral-950 px-4 py-2 border-b border-neutral-900/60 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest font-semibold">
                Deployment Node: {activeData.name}
              </span>
            </div>

            <button
              onClick={() => handleCopy(activeData.setupSnippet, activeData.id)}
              className="text-neutral-500 hover:text-white transition-colors flex items-center gap-1 text-[9px] font-mono uppercase bg-black/40 px-2 py-0.5 rounded border border-neutral-900 cursor-pointer"
            >
              {copiedText === activeData.id ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1"><Check className="w-3 h-3" /> Copied</span>
              ) : (
                <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> Copy config</span>
              )}
            </button>
          </div>

          {/* Terminal details */}
          <div className="p-4 flex-1 flex flex-col justify-between bg-black/40">
            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-bold text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                  {activeData.status}
                </span>
                <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950/10 border border-cyan-900/20 px-2 py-0.5 rounded">
                  {activeData.latency}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                {activeData.details}
              </p>
            </div>

            {/* Code view box */}
            <div className="relative bg-neutral-950 p-4 rounded-lg border border-neutral-900/80 overflow-auto max-h-[190px] scrollbar-thin">
              <pre className="font-mono text-[9.5px] text-cyan-300 leading-normal">
                <code>{activeData.setupSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Footers */}
          <div className="bg-neutral-950 px-4 py-2 border-t border-neutral-900/60 flex items-center justify-between text-[8px] font-mono text-neutral-600">
            <span>PLATFORM BLUEPRINT SECURED BY AES-256-GCM</span>
            <span className="text-neutral-500">DAEMON SERVICE_PORT: 3000</span>
          </div>

        </div>

      </div>

    </div>
  );
}
