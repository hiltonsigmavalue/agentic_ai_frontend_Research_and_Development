"use client";

import React, { useState } from "react";
import Link from "next/link";

interface AgentModule {
  id: string;
  name: string;
  category: "Analytics" | "Spatial" | "Data" | "Workflow";
  route: string;
  folderPath: string;
  backendPath: string;
  description: string;
  subModules: string[];
  color: string;
  iconSvg: React.ReactNode;
}

const AGENT_MODULES: AgentModule[] = [
  {
    id: "valuation",
    name: "Valuation Agent",
    category: "Analytics",
    route: "/valuation",
    folderPath: "app/valuation",
    backendPath: "agents/valuation",
    description: "Property automated valuation, comp selection, yield forecasting, and valuation reporting.",
    subModules: ["agent-one", "stage-calculator", "listing-audit", "comparable-search"],
    color: "from-blue-500 to-indigo-600",
    iconSvg: (
      <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: "feasibility",
    name: "Feasibility Agent",
    category: "Analytics",
    route: "/feasibility",
    folderPath: "app/feasibility",
    backendPath: "api/routes/feasibility",
    description: "Financial feasibility analysis, investor IRR modeling, construction timetable, and revenue projections.",
    subModules: ["investor-irr", "construction-table", "revenue-projection", "osm-logic", "parking-logic"],
    color: "from-emerald-500 to-teal-600",
    iconSvg: (
      <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "visualization",
    name: "Geospatial & Visualization Agent",
    category: "Spatial",
    route: "/visualization_agent",
    folderPath: "app/visualization_agent",
    backendPath: "agents/visualization_agent",
    description: "Map overlay visualizations, spatial insights, 3D terrain elevation, and interactive layer controls.",
    subModules: ["spatial-insight", "workflow-canvas", "map-overlays", "elevation-3d"],
    color: "from-violet-500 to-purple-600",
    iconSvg: (
      <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    id: "market_research",
    name: "Market Research Agent",
    category: "Analytics",
    route: "/market_research",
    folderPath: "app/market_research",
    backendPath: "api/routes/market_research",
    description: "Real estate market intelligence, supply-demand analysis, competitor tracking, and price trends.",
    subModules: ["trend-analysis", "project-intelligence", "competitor-matrix", "migration-router"],
    color: "from-amber-500 to-orange-600",
    iconSvg: (
      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "web_search",
    name: "Web Search & Scraping Agent (v2)",
    category: "Data",
    route: "/web_search_v2",
    folderPath: "app/web_search_v2",
    backendPath: "agents/web_search_v2",
    description: "Multi-step web search planning, autonomous web scraping, snippet extraction, and URL crawling.",
    subModules: ["search-planner", "scraper-strategies", "content-parser", "query-expansion"],
    color: "from-cyan-500 to-blue-600",
    iconSvg: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: "data_retrieval",
    name: "Data Retrieval Agent",
    category: "Data",
    route: "/data_retrieval",
    folderPath: "app/data_retrieval",
    backendPath: "agents/data_retrieval",
    description: "RAG document retrieval, database grounding, transaction indexing, and portfolio data extraction.",
    subModules: ["portfolio-retrieval", "project-retrieval", "db-grounding", "pdf-extractor"],
    color: "from-indigo-500 to-sky-600",
    iconSvg: (
      <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    id: "connector",
    name: "Connector & Orchestration Agent",
    category: "Workflow",
    route: "/connector",
    folderPath: "app/connector",
    backendPath: "agents/connector",
    description: "Agent pipeline connector, graph workflow orchestration, execution triggers, and API bindings.",
    subModules: ["workflow-builder", "google-api", "service-bindings", "node-runner"],
    color: "from-rose-500 to-pink-600",
    iconSvg: (
      <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "ui_creation",
    name: "UI Generation Agent",
    category: "Workflow",
    route: "/ui_creation",
    folderPath: "app/ui_creation",
    backendPath: "agents/ui_generation_agent",
    description: "Dynamic frontend card generation, component layout synthesis, and user prompt UI builders.",
    subModules: ["layout-generator", "widget-registry", "canvas-renderer", "component-themes"],
    color: "from-fuchsia-500 to-pink-600",
    iconSvg: (
      <svg className="w-6 h-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    id: "user_input",
    name: "User Input & Intent Agent",
    category: "Workflow",
    route: "/user_input",
    folderPath: "app/user_input",
    backendPath: "agents/intent_schema_agent",
    description: "User prompt processing, intent classification, schema validation, and dialogue routing.",
    subModules: ["intent-schema", "prompt-parser", "dialogue-router", "context-state"],
    color: "from-teal-500 to-emerald-600",
    iconSvg: (
      <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Analytics", "Spatial", "Data", "Workflow"];

  const filteredAgents = AGENT_MODULES.filter((agent) => {
    const matchesCategory =
      activeCategory === "All" || agent.category === activeCategory;
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.folderPath.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-bold text-white text-lg">Σ</span>
            </div>
            <div>
              <h1 className="font-bold text-base text-slate-100 tracking-tight flex items-center gap-2">
                Sigmavalue OS <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30">Skeleton R&D</span>
              </h1>
              <p className="text-xs text-slate-400">Multi-Agent Sandbox Development Workspace</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Structure Ready
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-8">
        {/* Banner Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/20 p-8 shadow-2xl">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider">
              ⚡ Developer Sandbox Template
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Multi-Agent Architecture Skeleton
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              This repository contains the empty directory structure for all Sigmavalue AI Agent modules. 
              Engineers & R&D team members can develop new agent features in isolation inside their respective folders.
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search agent modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="group relative rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-indigo-500/50 p-6 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Icon & Tag */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50 group-hover:bg-slate-800 transition-colors">
                    {agent.iconSvg}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                    {agent.category}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {agent.description}
                  </p>
                </div>

                {/* Sub-modules list */}
                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Replicated Subdirectories:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.subModules.map((sub, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-mono"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Path Badges & Action */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 space-y-3">
                <div className="text-[10px] font-mono text-slate-500 space-y-1">
                  <div className="truncate"><span className="text-slate-400">Frontend:</span> {agent.folderPath}</div>
                  <div className="truncate"><span className="text-slate-400">Backend:</span> {agent.backendPath}</div>
                </div>

                <div className="pt-1">
                  <span className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-300 bg-indigo-950/40 border border-indigo-800/40 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all duration-150">
                    Agent Skeleton Ready
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/40 py-6 text-center text-xs text-slate-500">
        Sigmavalue AI Multi-Agent Platform • R&D Skeleton Template Workspace
      </footer>
    </div>
  );
}
