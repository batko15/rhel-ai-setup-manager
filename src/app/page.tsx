'use client'

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, Database, Monitor, Layers, Code, GitBranch, Cpu, Activity, 
  Container, Shield, Image as ImageIcon, Terminal, Search, Check, Download, 
  Settings, Play, Trash2, Info, ExternalLink, Copy, CheckCircle2,
  Zap, Star, Package, Server, HardDrive,
  FileCode, LayoutGrid, List, RefreshCw, Mic, BarChart, 
  MessageSquare, MemoryStick, Eye, Sparkles, Rocket, CpuIcon,
  ChevronRight, Filter, SortAsc, Grid3X3, LayoutDashboard, Heart,
  TrendingUp, Clock, FolderOpen, Command, Webhook, Puzzle,
  Key, Workflow, MonitorPlay, MonitorSmartphone, Smartphone, Globe,
  BookOpen, Wand2, Cog, Menu, X, Collapsible
} from 'lucide-react';
import { toolCategories, aiTools, getToolsByCategory, getPopularTools, type Tool } from '@/lib/tools-data';
import { currentSystemProfile } from '@/lib/system-profile';

export default function RHELAISetupManager() {
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid');
  const [generatedScript, setGeneratedScript] = useState('');
  const [generatedCompose, setGeneratedCompose] = useState('');
  const [showScriptDialog, setShowScriptDialog] = useState(false);
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'popular' | 'category'>('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('tools');

  // Animate on mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTools = useMemo(() => {
    let tools = aiTools;
    if (activeCategory !== 'all') {
      tools = getToolsByCategory(activeCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      tools = tools.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    // Sort
    if (sortBy === 'name') {
      tools = [...tools].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'popular') {
      tools = [...tools].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }
    return tools;
  }, [searchQuery, activeCategory, sortBy]);

  const toggleTool = (slug: string) => {
    const newSelected = new Set(selectedTools);
    if (newSelected.has(slug)) {
      newSelected.delete(slug);
    } else {
      newSelected.add(slug);
    }
    setSelectedTools(newSelected);
  };

  const selectAllPopular = () => {
    const popular = getPopularTools();
    const newSelected = new Set(selectedTools);
    popular.forEach(tool => newSelected.add(tool.slug));
    setSelectedTools(newSelected);
  };

  const selectByCategory = (categoryId: string) => {
    const categoryTools = getToolsByCategory(categoryId);
    const newSelected = new Set(selectedTools);
    categoryTools.forEach(tool => newSelected.add(tool.slug));
    setSelectedTools(newSelected);
  };

  const clearSelection = () => setSelectedTools(new Set());

  const generateInstallScript = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`/api/tools?action=generate-script&${Array.from(selectedTools).map(t => `tools=${t}`).join('&')}`);
      const data = await response.json();
      setGeneratedScript(data.script);
      setShowScriptDialog(true);
    } catch (error) {
      console.error('Failed to generate script:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateDockerCompose = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`/api/tools?action=generate-docker-compose&${Array.from(selectedTools).map(t => `tools=${t}`).join('&')}`);
      const data = await response.json();
      setGeneratedCompose(data.compose);
      setShowComposeDialog(true);
    } catch (error) {
      console.error('Failed to generate compose:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      'Brain': <Brain className="h-4 w-4" />,
      'Database': <Database className="h-4 w-4" />,
      'Monitor': <Monitor className="h-4 w-4" />,
      'Layers': <Layers className="h-4 w-4" />,
      'Code': <Code className="h-4 w-4" />,
      'GitBranch': <GitBranch className="h-4 w-4" />,
      'Cpu': <Cpu className="h-4 w-4" />,
      'Activity': <Activity className="h-4 w-4" />,
      'Container': <Container className="h-4 w-4" />,
      'Shield': <Shield className="h-4 w-4" />,
      'Image': <ImageIcon className="h-4 w-4" />,
      'Terminal': <Terminal className="h-4 w-4" />,
      'Mic': <Mic className="h-4 w-4" />,
      'BarChart': <BarChart className="h-4 w-4" />,
      'FileCode': <FileCode className="h-4 w-4" />,
      'RefreshCw': <RefreshCw className="h-4 w-4" />,
      'MessageSquare': <MessageSquare className="h-4 w-4" />,
      'Plug': <Webhook className="h-4 w-4" />,
      'Search': <Search className="h-4 w-4" />,
      'Github': <GitBranch className="h-4 w-4" />,
      'Puzzle': <Puzzle className="h-4 w-4" />,
      'Zap': <Zap className="h-4 w-4" />,
      'MonitorPlay': <MonitorPlay className="h-4 w-4" />,
      'Linux': <Monitor className="h-4 w-4" />,
      'Smartphone': <Smartphone className="h-4 w-4" />,
      'Workflow': <Workflow className="h-4 w-4" />,
      'Key': <Key className="h-4 w-4" />,
    };
    return icons[iconName] || <Package className="h-4 w-4" />;
  };

  const popularTools = getPopularTools();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,80,200,0.15),transparent_50%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-slate-900 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                BigLinux AI Setup Manager
              </h1>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                RTX 4070 • 12GB VRAM • 32GB RAM • 600+ Tools
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
              <Input
                placeholder="600+ Tools durchsuchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80 bg-slate-800/50 border-slate-700 focus:border-purple-500 focus:ring-purple-500/20 transition-all placeholder:text-slate-500"
              />
            </div>
            
            {/* Selection Badge */}
            <Badge variant="secondary" className="gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="font-semibold">{selectedTools.size}</span> ausgewählt
            </Badge>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 border border-slate-700 rounded-lg p-1 bg-slate-800/50">
              <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('grid')} className="rounded-md h-8 w-8 p-0">
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('list')} className="rounded-md h-8 w-8 p-0">
                <List className="h-4 w-4" />
              </Button>
              <Button variant={viewMode === 'compact' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('compact')} className="rounded-md h-8 w-8 p-0">
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(v: 'name' | 'popular' | 'category') => setSortBy(v)}>
              <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Beliebte</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="category">Kategorie</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Left Sidebar - Categories */}
        <aside className={`w-72 border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto transition-all duration-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <div className="space-y-5">
            {/* System Profile Card */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-4 text-white shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="h-5 w-5" />
                  <span className="font-semibold">System erkannt</span>
                </div>
                <p className="text-sm opacity-90 mb-3">{currentSystemProfile.os.name}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                    <Cpu className="h-3 w-3 mb-1" />
                    <div className="font-medium text-sm">i5-12400F</div>
                    <div className="opacity-75 text-xs">6C/12T</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                    <Activity className="h-3 w-3 mb-1" />
                    <div className="font-medium text-sm">RTX 4070</div>
                    <div className="opacity-75 text-xs">12GB VRAM</div>
                  </div>
                </div>
                <div className="mt-3 bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-xs">
                    <span className="opacity-75">RAM</span>
                    <span className="font-medium">32GB + 47GB ZRAM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                <div className="flex items-center gap-2 text-purple-400 mb-1">
                  <Package className="h-4 w-4" />
                  <span className="text-xs">Tools</span>
                </div>
                <div className="text-2xl font-bold">{aiTools.length}</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                <div className="flex items-center gap-2 text-pink-400 mb-1">
                  <Layers className="h-4 w-4" />
                  <span className="text-xs">Kategorien</span>
                </div>
                <div className="text-2xl font-bold">{toolCategories.length}</div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Kategorien
              </h3>
              <ScrollArea className="h-[280px]">
                <div className="space-y-1 pr-2">
                  <Button
                    variant={activeCategory === 'all' ? 'secondary' : 'ghost'}
                    className={`w-full justify-start gap-2 transition-all ${activeCategory === 'all' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
                    onClick={() => setActiveCategory('all')}
                  >
                    <Package className="h-4 w-4" />
                    <span className="truncate">Alle Tools</span>
                    <Badge variant="outline" className="ml-auto border-slate-600">{aiTools.length}</Badge>
                  </Button>
                  
                  {toolCategories.map((category) => {
                    const count = getToolsByCategory(category.id).length;
                    const isActive = activeCategory === category.id;
                    return (
                      <Button
                        key={category.id}
                        variant={isActive ? 'secondary' : 'ghost'}
                        className={`w-full justify-start gap-2 transition-all ${isActive ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {getCategoryIcon(category.icon)}
                        <span className="truncate text-sm">{category.name}</span>
                        <Badge variant="outline" className="ml-auto text-xs border-slate-600">{count}</Badge>
                      </Button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
            
            <Separator className="bg-slate-700" />
            
            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Schnellauswahl
              </h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 hover:bg-yellow-500/10 hover:border-yellow-500/50 hover:text-yellow-300 transition-all border-slate-700"
                  onClick={selectAllPopular}
                >
                  <Star className="h-4 w-4 text-yellow-500" />
                  Alle beliebten Tools
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-300 transition-all border-slate-700"
                  onClick={clearSelection}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  Auswahl löschen
                </Button>
              </div>
            </div>
            
            <Separator className="bg-slate-700" />
            
            {/* AI Capabilities */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                KI-Kapazitäten
              </h3>
              <div className="space-y-2">
                {[
                  { icon: Brain, label: 'LLM Inference', value: '13B Params', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  { icon: ImageIcon, label: 'Bildgenerierung', value: 'SD XL', color: 'text-pink-400', bg: 'bg-pink-500/10' },
                  { icon: Mic, label: 'Spracherkennung', value: 'Whisper V3', color: 'text-orange-400', bg: 'bg-orange-500/10' },
                  { icon: Eye, label: 'Vision Models', value: 'LLaVA', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                ].map((cap, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-md ${cap.bg}`}>
                        <cap.icon className={`h-4 w-4 ${cap.color}`} />
                      </div>
                      <span className="text-sm text-slate-300">{cap.label}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-slate-700">{cap.value}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto space-y-6">
            {/* Stats Cards */}
            <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {[
                { icon: Package, label: 'Verfügbare Tools', value: aiTools.length, gradient: 'from-purple-500 to-pink-500', bg: 'bg-purple-500/10' },
                { icon: CheckCircle2, label: 'Ausgewählt', value: selectedTools.size, gradient: 'from-green-500 to-emerald-500', bg: 'bg-green-500/10' },
                { icon: Star, label: 'Beliebte Tools', value: popularTools.length, gradient: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-500/10' },
                { icon: Layers, label: 'Kategorien', value: toolCategories.length, gradient: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-500/10' },
              ].map((stat, i) => (
                <Card key={i} className="relative overflow-hidden group hover:border-purple-500/50 transition-all bg-slate-800/50 border-slate-700">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} border border-slate-700`}>
                        <stat.icon className={`h-6 w-6 bg-gradient-to-br ${stat.gradient} bg-clip-text`} style={{ color: stat.gradient.includes('purple') ? '#a855f7' : stat.gradient.includes('green') ? '#22c55e' : stat.gradient.includes('yellow') ? '#eab308' : '#06b6d4' }} />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                        <p className="text-sm text-slate-400">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Popular Tools */}
            {activeCategory === 'all' && !searchQuery && (
              <div className={`transition-all duration-500 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Beliebte Tools
                  <Badge variant="secondary" className="ml-2 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Schnellzugriff</Badge>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {popularTools.slice(0, 12).map((tool, index) => (
                    <Card 
                      key={tool.id}
                      className={`cursor-pointer group transition-all duration-300 bg-slate-800/50 border-slate-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 ${
                        selectedTools.has(tool.slug) ? 'ring-2 ring-purple-500 bg-purple-500/10 border-purple-500/50' : ''
                      }`}
                      onClick={() => toggleTool(tool.slug)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">{tool.icon}</div>
                        <p className="font-medium text-sm truncate text-slate-200">{tool.name}</p>
                        {selectedTools.has(tool.slug) && (
                          <div className="mt-2 flex justify-center">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* RTX 4070 Recommended Models */}
            {activeCategory === 'all' && !searchQuery && (
              <div className={`transition-all duration-500 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                  <Cpu className="h-5 w-5 text-purple-400" />
                  Empfohlene Modelle für RTX 4070
                  <Badge variant="secondary" className="ml-2 bg-purple-500/20 text-purple-300 border-purple-500/30">12GB VRAM</Badge>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentSystemProfile.recommendedModels.slice(0, 8).map((model, i) => (
                    <Card key={i} className="group bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20 hover:border-purple-500/40 transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-white">{model.name}</h3>
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs">
                            {model.vramRequired}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">{model.useCase}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">{model.quantization}</span>
                          <code className="text-xs bg-slate-800 px-2 py-1 rounded font-mono text-purple-300">ollama pull</code>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Tools Grid */}
            <div className={`transition-all duration-500 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  {activeCategory === 'all' ? 'Alle Tools' : toolCategories.find(c => c.id === activeCategory)?.name}
                  <Badge variant="outline" className="ml-2 border-slate-600 text-slate-300">{filteredTools.length}</Badge>
                </h2>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTools.map((tool, index) => (
                    <Card 
                      key={tool.id}
                      className={`group transition-all duration-300 bg-slate-800/50 border-slate-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer ${
                        selectedTools.has(tool.slug) ? 'ring-2 ring-purple-500 bg-purple-500/10' : ''
                      }`}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl group-hover:scale-110 transition-transform">{tool.icon}</div>
                            <div>
                              <CardTitle className="text-base flex items-center gap-2 text-white">
                                {tool.name}
                                {tool.isPopular && <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />}
                              </CardTitle>
                              <CardDescription className="text-xs text-slate-400">{tool.category}</CardDescription>
                            </div>
                          </div>
                          <Checkbox
                            checked={selectedTools.has(tool.slug)}
                            onCheckedChange={() => toggleTool(tool.slug)}
                            className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500 border-slate-600"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-slate-400 line-clamp-2">{tool.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tool.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-slate-700/50 text-slate-300">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 gap-2">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1 border-slate-600 hover:bg-slate-700 text-slate-300">
                              <Info className="h-3 w-3 mr-1" /> Details
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="overflow-y-auto w-[400px] sm:w-[540px] bg-slate-900 border-slate-700">
                            <SheetHeader>
                              <SheetTitle className="flex items-center gap-3 text-white">
                                <span className="text-3xl">{tool.icon}</span>
                                {tool.name}
                              </SheetTitle>
                              <SheetDescription className="text-slate-400">{tool.description}</SheetDescription>
                            </SheetHeader>
                            <div className="mt-6 space-y-4">
                              {tool.longDescription && (
                                <div>
                                  <h4 className="font-semibold mb-2 text-white">Beschreibung</h4>
                                  <p className="text-sm text-slate-400">{tool.longDescription}</p>
                                </div>
                              )}
                              {tool.configOptions && tool.configOptions.length > 0 && (
                                <div>
                                  <h4 className="font-semibold mb-2 text-white">Konfiguration</h4>
                                  <div className="space-y-3">
                                    {tool.configOptions.map((opt) => (
                                      <div key={opt.key} className="space-y-1">
                                        <Label className="text-slate-300">{opt.label}</Label>
                                        {opt.type === 'select' ? (
                                          <Select defaultValue={String(opt.default || '')}>
                                            <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                              {opt.options?.map((o) => (
                                                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        ) : opt.type === 'boolean' ? (
                                          <Switch defaultChecked={opt.default === true} />
                                        ) : (
                                          <Input type={opt.type === 'number' ? 'number' : 'text'} defaultValue={String(opt.default || '')} className="bg-slate-800 border-slate-700" />
                                        )}
                                        {opt.description && <p className="text-xs text-slate-500">{opt.description}</p>}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {tool.requirements && (
                                <div>
                                  <h4 className="font-semibold mb-2 text-white">Anforderungen</h4>
                                  <div className="space-y-1 text-sm text-slate-400">
                                    {tool.requirements.ram && <div className="flex items-center gap-2"><HardDrive className="h-4 w-4" /> RAM: {tool.requirements.ram}</div>}
                                    {tool.requirements.gpu && <div className="flex items-center gap-2"><Cpu className="h-4 w-4" /> GPU: {tool.requirements.gpu}</div>}
                                    {tool.requirements.disk && <div className="flex items-center gap-2"><Database className="h-4 w-4" /> Disk: {tool.requirements.disk}</div>}
                                  </div>
                                </div>
                              )}
                              <div className="flex gap-2">
                                {tool.homepage && (
                                  <Button variant="outline" size="sm" asChild className="border-slate-700 hover:bg-slate-800">
                                    <a href={tool.homepage} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-3 w-3 mr-1" /> Website</a>
                                  </Button>
                                )}
                                {tool.repository && (
                                  <Button variant="outline" size="sm" asChild className="border-slate-700 hover:bg-slate-800">
                                    <a href={tool.repository} target="_blank" rel="noopener noreferrer"><GitBranch className="h-3 w-3 mr-1" /> GitHub</a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                        {tool.installCommand && (
                          <Button variant="default" size="sm" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                            <Download className="h-3 w-3 mr-1" /> Installieren
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : viewMode === 'list' ? (
                <div className="space-y-2">
                  {filteredTools.map((tool) => (
                    <Card 
                      key={tool.id}
                      className={`group cursor-pointer transition-all bg-slate-800/50 border-slate-700 hover:border-purple-500/50 ${
                        selectedTools.has(tool.slug) ? 'ring-2 ring-purple-500 bg-purple-500/10' : ''
                      }`}
                      onClick={() => toggleTool(tool.slug)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl group-hover:scale-110 transition-transform">{tool.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-white">{tool.name}</h3>
                              {tool.isPopular && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                            </div>
                            <p className="text-sm text-slate-400 truncate">{tool.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {tool.dockerImage && <Badge variant="outline" className="text-xs border-slate-600 text-slate-300"><Container className="h-3 w-3 mr-1" />Docker</Badge>}
                            {tool.installCommand && <Badge variant="outline" className="text-xs border-slate-600 text-slate-300"><Terminal className="h-3 w-3 mr-1" />CLI</Badge>}
                            <Checkbox checked={selectedTools.has(tool.slug)} onCheckedChange={() => toggleTool(tool.slug)} className="border-slate-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {filteredTools.map((tool) => (
                    <div 
                      key={tool.id}
                      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                        selectedTools.has(tool.slug) ? 'bg-purple-500/20 ring-1 ring-purple-500' : 'bg-slate-800/50 hover:bg-slate-700/50'
                      }`}
                      onClick={() => toggleTool(tool.slug)}
                    >
                      <span className="text-xl">{tool.icon}</span>
                      <span className="text-sm truncate text-slate-200">{tool.name}</span>
                      {selectedTools.has(tool.slug) && <Check className="h-3 w-3 text-purple-400 ml-auto" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Selected Tools */}
        <aside className={`w-80 border-l border-slate-700/50 bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto transition-all duration-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <div className="sticky top-0">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
              Ausgewählte Tools
              <Badge variant="secondary" className="ml-auto bg-purple-500/20 text-purple-300">{selectedTools.size}</Badge>
            </h3>
            
            <ScrollArea className="h-[calc(100vh-24rem)]">
              {selectedTools.size === 0 ? (
                <div className="text-center py-12">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 mx-auto mb-4">
                    <Package className="h-8 w-8 text-slate-500" />
                  </div>
                  <p className="font-medium text-slate-300">Keine Tools ausgewählt</p>
                  <p className="text-sm text-slate-500 mt-1">Klicken Sie auf Tools um sie hinzuzufügen</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {Array.from(selectedTools).map((slug) => {
                    const tool = aiTools.find(t => t.slug === slug);
                    if (!tool) return null;
                    return (
                      <div key={slug} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700 group hover:border-purple-500/50 transition-all">
                        <span className="text-2xl">{tool.icon}</span>
                        <span className="flex-1 text-sm font-medium truncate text-slate-200">{tool.name}</span>
                        <Button variant="ghost" size="sm" onClick={() => toggleTool(slug)} className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0 hover:bg-red-500/10">
                          <X className="h-3.5 w-3.5 text-red-400" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
            
            <Separator className="my-4 bg-slate-700" />
            
            <div className="space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25 text-white" 
                disabled={selectedTools.size === 0 || isGenerating}
                onClick={generateInstallScript}
              >
                {isGenerating ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <FileCode className="h-4 w-4 mr-2" />}
                Installations-Skript
              </Button>
              
              <Button 
                variant="outline"
                className="w-full hover:bg-purple-500/10 hover:border-purple-500/50 hover:text-purple-300 border-slate-700 text-slate-300" 
                disabled={selectedTools.size === 0 || isGenerating}
                onClick={generateDockerCompose}
              >
                <Container className="h-4 w-4 mr-2" />
                Docker Compose
              </Button>
              
              <Button 
                variant="secondary"
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300" 
                disabled={selectedTools.size === 0}
              >
                <Play className="h-4 w-4 mr-2" />
                Alle installieren
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm mt-auto">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Rocket className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">BigLinux AI Setup Manager</p>
              <p className="text-xs text-slate-400">{aiTools.length} Tools verfügbar • {toolCategories.length} Kategorien</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
              v2.1.0
            </Badge>
            <a href="https://github.com/batko15/rhel-ai-setup-manager" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400 transition-colors">
              <GitBranch className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Script Dialog */}
      <Dialog open={showScriptDialog} onOpenChange={setShowScriptDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <FileCode className="h-5 w-5 text-purple-400" />
              Installations-Skript
            </DialogTitle>
            <DialogDescription className="text-slate-400">Kopieren Sie dieses Skript und führen Sie es auf Ihrem System aus.</DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Button variant="outline" size="sm" className="absolute right-2 top-2 z-10 border-slate-700 hover:bg-slate-800" onClick={() => copyToClipboard(generatedScript)}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
            <pre className="p-4 bg-slate-950 rounded-lg text-sm text-green-400 overflow-x-auto border border-slate-800"><code>{generatedScript}</code></pre>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScriptDialog(false)} className="border-slate-700 hover:bg-slate-800 text-slate-300">Schließen</Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500" onClick={() => copyToClipboard(generatedScript)}>
              <Download className="h-4 w-4 mr-2" /> Herunterladen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Compose Dialog */}
      <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Container className="h-5 w-5 text-purple-400" />
              Docker Compose
            </DialogTitle>
            <DialogDescription className="text-slate-400">Speichern Sie diese Konfiguration als docker-compose.yml</DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Button variant="outline" size="sm" className="absolute right-2 top-2 z-10 border-slate-700 hover:bg-slate-800" onClick={() => copyToClipboard(generatedCompose)}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
            <pre className="p-4 bg-slate-950 rounded-lg text-sm text-blue-400 overflow-x-auto border border-slate-800"><code>{generatedCompose}</code></pre>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowComposeDialog(false)} className="border-slate-700 hover:bg-slate-800 text-slate-300">Schließen</Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500" onClick={() => copyToClipboard(generatedCompose)}>
              <Download className="h-4 w-4 mr-2" /> Herunterladen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
