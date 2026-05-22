'use client'

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Brain, Database, Monitor, Layers, Code, GitBranch, Cpu, Activity, 
  Container, Shield, Image as ImageIcon, Terminal, Search, Check, Download, 
  Settings, Play, Trash2, Info, ExternalLink, Copy, CheckCircle2,
  Zap, Star, Filter, ChevronRight, Package, Server, HardDrive,
  Cog, FileCode, Box, LayoutGrid, List, RefreshCw, Clock
} from 'lucide-react';
import { toolCategories, aiTools, getToolsByCategory, getPopularTools, type Tool, type ToolCategory, type ConfigOption } from '@/lib/tools-data';

export default function RHELAISetupManager() {
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedToolDetails, setSelectedToolDetails] = useState<Tool | null>(null);
  const [generatedScript, setGeneratedScript] = useState('');
  const [generatedCompose, setGeneratedCompose] = useState('');
  const [showScriptDialog, setShowScriptDialog] = useState(false);
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [installProgress, setInstallProgress] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);
  const [configValues, setConfigValues] = useState<Record<string, Record<string, string | number | boolean>>>({});

  // Filter tools based on search and category
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
    
    return tools;
  }, [searchQuery, activeCategory]);

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

  const clearSelection = () => {
    setSelectedTools(new Set());
  };

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
      'Brain': <Brain className="h-5 w-5" />,
      'Database': <Database className="h-5 w-5" />,
      'Monitor': <Monitor className="h-5 w-5" />,
      'Layers': <Layers className="h-5 w-5" />,
      'Code': <Code className="h-5 w-5" />,
      'GitBranch': <GitBranch className="h-5 w-5" />,
      'Cpu': <Cpu className="h-5 w-5" />,
      'Activity': <Activity className="h-5 w-5" />,
      'Container': <Container className="h-5 w-5" />,
      'Shield': <Shield className="h-5 w-5" />,
      'Image': <ImageIcon className="h-5 w-5" />,
      'Terminal': <Terminal className="h-5 w-5" />,
    };
    return icons[iconName] || <Package className="h-5 w-5" />;
  };

  const popularTools = getPopularTools();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
              <Server className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">RHEL AI Setup Manager</h1>
              <p className="text-xs text-muted-foreground">Full-Stack KI/KI-Tools für Linux</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tools durchsuchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <Badge variant="secondary" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {selectedTools.size} ausgewählt
            </Badge>
            
            <div className="flex items-center gap-1 border rounded-md p-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-muted/30 p-4 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Kategorien</h3>
              <div className="space-y-1">
                <Button
                  variant={activeCategory === 'all' ? 'secondary' : 'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveCategory('all')}
                >
                  <Package className="h-4 w-4" />
                  Alle Tools
                  <Badge variant="outline" className="ml-auto">{aiTools.length}</Badge>
                </Button>
                
                {toolCategories.map((category) => {
                  const count = getToolsByCategory(category.id).length;
                  return (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? 'secondary' : 'ghost'}
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {getCategoryIcon(category.icon)}
                      <span className="truncate">{category.name}</span>
                      <Badge variant="outline" className="ml-auto">{count}</Badge>
                    </Button>
                  );
                })}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-semibold mb-2">Schnellauswahl</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={selectAllPopular}
                >
                  <Star className="h-4 w-4 text-yellow-500" />
                  Alle beliebten Tools
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={clearSelection}
                >
                  <Trash2 className="h-4 w-4" />
                  Auswahl löschen
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-semibold mb-2">System-Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CPU</span>
                  <span>Verfügbar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RAM</span>
                  <span>Verfügbar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GPU</span>
                  <span>Erkannt</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Panel */}
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Package className="h-8 w-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">{aiTools.length}</p>
                      <p className="text-sm text-muted-foreground">Verfügbare Tools</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{selectedTools.size}</p>
                      <p className="text-sm text-muted-foreground">Ausgewählt</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold">{popularTools.length}</p>
                      <p className="text-sm text-muted-foreground">Beliebte Tools</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Layers className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{toolCategories.length}</p>
                      <p className="text-sm text-muted-foreground">Kategorien</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Popular Tools */}
            {activeCategory === 'all' && !searchQuery && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Beliebte Tools
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {popularTools.slice(0, 12).map((tool) => (
                    <Card 
                      key={tool.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedTools.has(tool.slug) ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => toggleTool(tool.slug)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">{tool.icon}</div>
                        <p className="font-medium text-sm truncate">{tool.name}</p>
                        {selectedTools.has(tool.slug) && (
                          <CheckCircle2 className="h-4 w-4 text-primary mx-auto mt-2" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Tools Grid/List */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {activeCategory === 'all' ? 'Alle Tools' : toolCategories.find(c => c.id === activeCategory)?.name}
                  <Badge variant="outline" className="ml-2">{filteredTools.length}</Badge>
                </h2>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTools.map((tool) => (
                    <Card 
                      key={tool.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedTools.has(tool.slug) ? 'ring-2 ring-primary bg-primary/5' : ''
                      }`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{tool.icon}</div>
                            <div>
                              <CardTitle className="text-base">{tool.name}</CardTitle>
                              <CardDescription className="text-xs">
                                {tool.category}
                              </CardDescription>
                            </div>
                          </div>
                          <Checkbox
                            checked={selectedTools.has(tool.slug)}
                            onCheckedChange={() => toggleTool(tool.slug)}
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {tool.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tool.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 gap-2">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Info className="h-3 w-3 mr-1" />
                              Details
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="overflow-y-auto">
                            <SheetHeader>
                              <SheetTitle className="flex items-center gap-2">
                                <span className="text-2xl">{tool.icon}</span>
                                {tool.name}
                              </SheetTitle>
                              <SheetDescription>{tool.description}</SheetDescription>
                            </SheetHeader>
                            <div className="mt-6 space-y-4">
                              {tool.longDescription && (
                                <div>
                                  <h4 className="font-semibold mb-2">Beschreibung</h4>
                                  <p className="text-sm text-muted-foreground">{tool.longDescription}</p>
                                </div>
                              )}
                              
                              {tool.configOptions && tool.configOptions.length > 0 && (
                                <div>
                                  <h4 className="font-semibold mb-2">Konfiguration</h4>
                                  <div className="space-y-3">
                                    {tool.configOptions.map((opt) => (
                                      <div key={opt.key} className="space-y-1">
                                        <Label htmlFor={opt.key}>{opt.label}</Label>
                                        {opt.type === 'select' ? (
                                          <Select defaultValue={String(opt.default || '')}>
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {opt.options?.map((o) => (
                                                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        ) : opt.type === 'boolean' ? (
                                          <Switch defaultChecked={opt.default === true} />
                                        ) : (
                                          <Input
                                            type={opt.type === 'number' ? 'number' : 'text'}
                                            defaultValue={String(opt.default || '')}
                                          />
                                        )}
                                        {opt.description && (
                                          <p className="text-xs text-muted-foreground">{opt.description}</p>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {tool.requirements && (
                                <div>
                                  <h4 className="font-semibold mb-2">Anforderungen</h4>
                                  <div className="space-y-1 text-sm">
                                    {tool.requirements.ram && (
                                      <div className="flex items-center gap-2">
                                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                                        RAM: {tool.requirements.ram}
                                      </div>
                                    )}
                                    {tool.requirements.gpu && (
                                      <div className="flex items-center gap-2">
                                        <Cpu className="h-4 w-4 text-muted-foreground" />
                                        GPU: {tool.requirements.gpu}
                                      </div>
                                    )}
                                    {tool.requirements.disk && (
                                      <div className="flex items-center gap-2">
                                        <Database className="h-4 w-4 text-muted-foreground" />
                                        Disk: {tool.requirements.disk}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex gap-2">
                                {tool.homepage && (
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={tool.homepage} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      Website
                                    </a>
                                  </Button>
                                )}
                                {tool.repository && (
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={tool.repository} target="_blank" rel="noopener noreferrer">
                                      <GitBranch className="h-3 w-3 mr-1" />
                                      GitHub
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                        
                        {tool.installCommand && (
                          <Button variant="default" size="sm" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            Installieren
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredTools.map((tool) => (
                    <Card 
                      key={tool.id}
                      className={`cursor-pointer transition-all hover:shadow-sm ${
                        selectedTools.has(tool.slug) ? 'ring-2 ring-primary bg-primary/5' : ''
                      }`}
                      onClick={() => toggleTool(tool.slug)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl">{tool.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{tool.name}</h3>
                              {tool.isPopular && <Star className="h-4 w-4 text-yellow-500" />}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{tool.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {tool.dockerImage && (
                              <Badge variant="outline" className="text-xs">
                                <Container className="h-3 w-3 mr-1" />
                                Docker
                              </Badge>
                            )}
                            {tool.installCommand && (
                              <Badge variant="outline" className="text-xs">
                                <Terminal className="h-3 w-3 mr-1" />
                                CLI
                              </Badge>
                            )}
                            <Checkbox
                              checked={selectedTools.has(tool.slug)}
                              onCheckedChange={() => toggleTool(tool.slug)}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Selected Tools */}
        <aside className="w-80 border-l bg-muted/30 p-4 overflow-y-auto">
          <div className="sticky top-0">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Ausgewählte Tools ({selectedTools.size})
            </h3>
            
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {selectedTools.size === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Keine Tools ausgewählt</p>
                  <p className="text-sm">Wählen Sie Tools aus der Liste</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {Array.from(selectedTools).map((slug) => {
                    const tool = aiTools.find(t => t.slug === slug);
                    if (!tool) return null;
                    return (
                      <div 
                        key={slug}
                        className="flex items-center gap-2 p-2 rounded-md bg-background border"
                      >
                        <span className="text-xl">{tool.icon}</span>
                        <span className="flex-1 text-sm font-medium truncate">{tool.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTool(slug)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <Button 
                className="w-full" 
                disabled={selectedTools.size === 0 || isGenerating}
                onClick={generateInstallScript}
              >
                {isGenerating ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <FileCode className="h-4 w-4 mr-2" />
                )}
                Installations-Skript
              </Button>
              
              <Button 
                variant="outline"
                className="w-full" 
                disabled={selectedTools.size === 0 || isGenerating}
                onClick={generateDockerCompose}
              >
                <Container className="h-4 w-4 mr-2" />
                Docker Compose
              </Button>
              
              <Button 
                variant="secondary"
                className="w-full" 
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
      <footer className="border-t bg-background mt-auto">
        <div className="container px-4 py-3 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            RHEL AI Full-Stack Setup Manager • {aiTools.length} Tools verfügbar
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>v1.0.0</span>
            <a href="https://github.com" className="hover:text-primary">
              <GitBranch className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Install Script Dialog */}
      <Dialog open={showScriptDialog} onOpenChange={setShowScriptDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Installations-Skript</DialogTitle>
            <DialogDescription>
              Kopieren Sie dieses Skript und führen Sie es auf Ihrem RHEL-System aus.
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="absolute right-2 top-2"
              onClick={() => copyToClipboard(generatedScript)}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto">
              <code>{generatedScript}</code>
            </pre>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScriptDialog(false)}>
              Schließen
            </Button>
            <Button onClick={() => copyToClipboard(generatedScript)}>
              <Download className="h-4 w-4 mr-2" />
              Skript herunterladen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Docker Compose Dialog */}
      <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Docker Compose</DialogTitle>
            <DialogDescription>
              Speichern Sie diese Konfiguration als docker-compose.yml
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="absolute right-2 top-2"
              onClick={() => copyToClipboard(generatedCompose)}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto">
              <code>{generatedCompose}</code>
            </pre>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowComposeDialog(false)}>
              Schließen
            </Button>
            <Button onClick={() => copyToClipboard(generatedCompose)}>
              <Download className="h-4 w-4 mr-2" />
              Compose herunterladen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
