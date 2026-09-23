import React, { useState } from "react"
import { presentationData } from "../data"
import { ArrowUpRight, ArrowRight, Target, Lightbulb, PlayCircle, Star, Calendar, CheckCircle2, ChevronRight, FileSpreadsheet, Network, FileText, Video, Rocket, ExternalLink, AlertTriangle, ShoppingCart, Ban, RefreshCw, BarChart2, TrendingUp, DollarSign, Truck, ShieldCheck, Wrench, PhoneCall } from "lucide-react"

const themeMap: Record<string, string> = {
  "01_capa": "bg-zinc-950 text-zinc-300 border-zinc-900",
  "02_recapitulando_jornada": "bg-zinc-200 text-zinc-900 border-zinc-300",
  "03_sumario": "bg-white text-zinc-900 border-zinc-200",
  "04_divisor_secao_1": "bg-zinc-900 text-zinc-100 border-zinc-800",
  "05_analise_social": "bg-zinc-50 text-zinc-900 border-zinc-200",
  "06_analise_site": "bg-zinc-100 text-zinc-900 border-zinc-200",
  "07_analise_meta": "bg-white text-zinc-900 border-zinc-200",
  "08_diferenciais": "bg-zinc-950 text-zinc-300 border-zinc-900",
  "09_divisor_secao_2": "bg-zinc-900 text-zinc-100 border-zinc-800",
  "09b_benchmarking_armac": "bg-zinc-50 text-zinc-900 border-zinc-200",
  "10_benchmarking_mills": "bg-white text-zinc-900 border-zinc-200",
  "11_benchmarking_sotreq": "bg-zinc-100 text-zinc-900 border-zinc-200",
  "12_moodboard": "bg-zinc-200 text-zinc-900 border-zinc-300",
  "14_persona_1": "bg-zinc-900 text-zinc-300 border-zinc-800",
  "15_persona_2": "bg-zinc-950 text-zinc-300 border-zinc-900",
  "17_objetivo_smart": "bg-black text-zinc-300 border-zinc-900",
  "13_estrategia": "bg-white text-zinc-900 border-zinc-200",
  "13_estrategia_campanhas": "bg-zinc-50 text-zinc-900 border-zinc-200",
  "21_criativos": "bg-zinc-100 text-zinc-900 border-zinc-200",
  "18_drawflow_funil": "bg-zinc-900 text-zinc-100 border-zinc-800",
  "19_cronograma": "bg-white text-zinc-900 border-zinc-200",
  "20_plano_midia": "bg-zinc-50 text-zinc-900 border-zinc-200"
}

// Helper to determine section background based on type
function getSectionTheme(id: string, type: string) {
  if (themeMap[id]) return themeMap[id]
  
  if (['competitor_benchmark', 'campaign_strategy_boxes'].includes(type)) return 'bg-zinc-100 text-zinc-900 border-zinc-200'
  if (['moodboard_identity', 'spreadsheet_placeholder'].includes(type)) return 'bg-white text-zinc-900 border-zinc-200'
  if (['process_timeline', 'funnel_flow_diagram', 'visual_drawflow'].includes(type)) return 'bg-black text-zinc-300 border-zinc-900'
  if (['smart_goal_okr'].includes(type)) return 'bg-zinc-900 text-zinc-300 border-zinc-800'
  return 'bg-zinc-950 text-zinc-300 border-zinc-900'
}

function SectionWrapper({ children, themeClass }: { children: React.ReactNode; themeClass: string; key?: React.Key }) {
  return (
    <section className={`w-full min-h-[60vh] flex flex-col justify-center px-8 md:px-24 py-24 ${themeClass} transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
        {children}
      </div>
    </section>
  )
}

function RenderBlock({ slide }: { slide: any }) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const type = slide.slide_type
  const d = slide.content_slots
  const themeClass = getSectionTheme(slide.id, type)
  const isLight = themeClass.includes('bg-white') || themeClass.includes('bg-zinc-50') || themeClass.includes('bg-zinc-100') || themeClass.includes('bg-zinc-200')

  let titleColor = isLight ? "text-zinc-900" : "text-white"
  let subtitleColor = isLight ? "text-zinc-600" : "text-zinc-400"
  let cardBg = isLight ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-900 border-zinc-800"

  if (type === 'cover') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
        <h3 className="text-xl md:text-2xl font-serif text-amber-500 tracking-widest uppercase font-bold">{d.logo_agencia}</h3>
        <h1 className="text-5xl md:text-7xl font-bold text-white max-w-4xl leading-tight tracking-tight">
          {d.titulo_principal}
        </h1>
        <div className="h-1 w-24 bg-amber-500 my-8"></div>
        <h2 className="text-3xl md:text-4xl font-light text-zinc-300 font-serif italic">
          {d.subtitulo}
        </h2>
      </div>
    )
  }

  if (type === 'process_timeline') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} mb-16 text-center`}>{d.titulo}</h2>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 top-4 bottom-0 w-px bg-zinc-300 md:hidden" />
          <div className="absolute top-4 left-0 right-0 h-px bg-zinc-300 hidden md:block" />
          
          {d.etapas_timeline?.map((etapa: string, i: number) => {
            const isCurrent = etapa === d.etapa_atual_destacada
            return (
              <div key={i} className="relative z-10 flex flex-col items-center gap-4 flex-1 px-2 my-4 md:my-0">
                <div className="h-8 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center relative z-10 ${isCurrent ? 'border-red-600 bg-white shadow-lg' : 'border-zinc-300 bg-white'}`}>
                    {isCurrent && <div className="w-2.5 h-2.5 rounded-full bg-red-600" />}
                  </div>
                </div>
                <span className={`text-sm md:text-base font-bold text-center ${isCurrent ? 'text-red-600' : subtitleColor}`}>
                  {etapa}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (type === 'agenda_toc') {
    return (
      <div className="flex flex-col md:flex-row gap-12 items-start max-w-5xl mx-auto w-full">
        <div className="w-full md:w-1/3 pt-4">
           <h2 className={`text-4xl font-bold ${titleColor} sticky top-32`}>{d.titulo}</h2>
        </div>
        <div className={`w-full md:w-2/3 flex flex-col gap-3 border-l ${isLight ? 'border-zinc-200' : 'border-zinc-800'} pl-8 md:pl-12`}>
          {d.itens_agenda?.map((item: string, i: number) => (
            <div key={i} className="flex gap-6 group items-center transition-colors">
              <span className="text-xl font-bold text-red-600 font-mono w-6 text-right opacity-80">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`text-xl font-medium ${titleColor} opacity-80 group-hover:opacity-100 transition-opacity`}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'section_divider') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
        <Target className={`w-16 h-16 text-red-600 mb-8 opacity-80`} />
        <h2 className={`text-5xl font-bold ${titleColor} max-w-3xl leading-tight`}>{d.titulo_secao}</h2>
      </div>
    )
  }

  if (type === 'diagnostic_analysis') {
    return (
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col h-full justify-center">
          <h2 className={`text-4xl font-bold ${titleColor} mb-8`}>{d.titulo_slide}</h2>
          <div className="w-16 h-1 bg-red-600 mb-8"></div>
          
          {/* Imagem / Print */}
          {(d.imagem_url || d.image_placeholder) && (
            <div className="flex flex-col gap-4">
              <div className={`mt-4 w-full rounded-2xl border-2 ${d.imagem_url ? (isLight ? 'border-zinc-200 shadow-xl' : 'border-zinc-800 shadow-2xl') : (isLight ? 'border-dashed border-zinc-300 bg-zinc-50' : 'border-dashed border-zinc-800 bg-zinc-900/50')} overflow-hidden flex items-center justify-center relative`}>
                 {d.imagem_url ? (
                    <img 
                      src={d.imagem_url} 
                      alt="Print do Ativo" 
                      className="w-full h-auto object-contain cursor-pointer transition-transform hover:scale-[1.02]" 
                      style={{ maxHeight: '650px' }} 
                      onClick={() => setExpandedImage(d.imagem_url)}
                    />
                 ) : (
                    <div className="flex flex-col items-center justify-center text-center p-12 opacity-50 min-h-[250px]">
                       <Target className="w-12 h-12 mb-4" />
                       <p className="font-bold text-lg">{d.image_placeholder}</p>
                       <p className="text-sm mt-2">Área reservada para ativo de campo</p>
                    </div>
                 )}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6">
          {d.insights_estruturados ? d.insights_estruturados.map((insight: any, i: number) => {
            const isPositivo = insight.tipo === 'positivo';
            const isObservacao = insight.tipo === 'observacao' || insight.tipo === 'neutro';
            
            let Icon = Lightbulb;
            let iconColor = 'text-amber-500';
            let borderColor = isLight ? 'border-amber-200 bg-amber-50' : 'border-amber-900/50 bg-amber-950/20';
            let titleColorStyle = 'text-amber-600 dark:text-amber-400';

            if (isPositivo) {
              Icon = CheckCircle2;
              iconColor = 'text-emerald-500';
              borderColor = isLight ? 'border-emerald-200 bg-emerald-50' : 'border-emerald-900/50 bg-emerald-950/20';
              titleColorStyle = 'text-emerald-700 dark:text-emerald-400';
            } else if (isObservacao) {
              Icon = ArrowRight;
              iconColor = 'text-sky-500';
              borderColor = isLight ? 'border-sky-200/80 bg-sky-50/60' : 'border-sky-900/40 bg-sky-950/20';
              titleColorStyle = 'text-sky-700 dark:text-sky-400';
            }
            
            return (
              <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl border ${borderColor}`}>
                <Icon className={`w-6 h-6 shrink-0 mt-1 ${iconColor}`} />
                <div>
                   {insight.titulo && <span className={`font-bold ${titleColorStyle} block mb-1 uppercase text-sm`}>{insight.titulo}</span>}
                   <p className={`text-[17px] leading-relaxed ${titleColor}`}>{insight.texto}</p>
                </div>
              </div>
            )
          }) : d.insights_bullets?.map((bullet: string, i: number) => (
            <div key={i} className={`flex items-start gap-4 p-6 rounded-2xl border ${cardBg}`}>
              <ArrowUpRight className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <p className={`text-lg leading-relaxed ${titleColor}`}>{bullet}</p>
            </div>
          ))}
        </div>

        {/* Modal / Lightbox */}
        {expandedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-12 animate-in fade-in duration-300"
            onClick={() => setExpandedImage(null)}
          >
            <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
              <img 
                src={expandedImage} 
                alt="Fullscreen" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300" 
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  if (type === 'moodboard_identity') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} mb-16 text-center`}>{d.titulo}</h2>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div>
              <h4 className={`text-sm font-bold ${isLight ? 'text-zinc-500' : 'text-zinc-400'} uppercase tracking-widest mb-4`}>Tipografia Principal</h4>
              <p className={`text-5xl font-sans font-black ${titleColor} mb-2`}>{d.tipografia_principal}</p>
              <p className={`text-2xl font-sans ${subtitleColor}`}>Google Sans Black / Impact</p>
            </div>
            <div>
              <h4 className={`text-sm font-bold ${isLight ? 'text-zinc-500' : 'text-zinc-400'} uppercase tracking-widest mb-4`}>Tipografia Secundária</h4>
              <p className={`text-4xl font-sans font-bold ${titleColor} mb-2`}>{d.tipografia_secundaria}</p>
              <p className={`text-xl font-sans ${subtitleColor}`}>System UI / Roboto / Inter</p>
            </div>
          </div>
          <div>
            <h4 className={`text-sm font-bold ${isLight ? 'text-zinc-500' : 'text-zinc-400'} uppercase tracking-widest mb-6`}>Paleta de Cores (Linha Amarela & Força)</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {d.paleta_cores?.map((cor: string, i: number) => (
                <div key={i} className="flex flex-col gap-2">
                  <div 
                    className={`w-full aspect-square rounded-2xl shadow-inner border ${isLight ? 'border-zinc-200' : 'border-zinc-800'}`}
                    style={{ backgroundColor: cor }}
                  />
                  <span className={`text-sm font-mono ${subtitleColor} text-center uppercase`}>{cor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'vertical_feature_list') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} text-center mb-16`}>{d.titulo}</h2>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {d.features?.map((f: any, i: number) => (
            <div key={i} className={`p-8 rounded-2xl border ${cardBg} flex flex-col md:flex-row gap-8 items-start hover:border-red-500/50 transition-colors`}>
              <div className={`w-16 h-16 shrink-0 rounded-2xl ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-950 border-zinc-800'} flex items-center justify-center shadow-inner`}>
                <span className="text-2xl font-bold text-red-600">0{i + 1}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className={`text-2xl font-bold ${titleColor}`}>{f.titulo}</h3>
                <p className={`text-lg ${subtitleColor} leading-relaxed`}>{f.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'persona_profile') {
    return (
      <div className={`p-8 md:p-12 rounded-3xl border ${cardBg}`}>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isLight ? 'bg-red-100' : 'bg-red-950/30'} text-red-500 font-bold mb-6`}>
              <Target className="w-5 h-5" /> Persona {d.numero_persona}
            </div>
            <h2 className={`text-3xl font-bold ${titleColor} mb-8 leading-tight`}>{d.nome_persona}</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              <div className={`px-4 py-2 rounded-xl text-sm font-bold border ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'}`}>
                 <span className="text-zinc-500 block text-xs uppercase mb-1">Dispositivo</span>
                 <span className={titleColor}>{d.dispositivo}</span>
              </div>
              <div className={`px-4 py-2 rounded-xl text-sm font-bold border ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'}`}>
                 <span className="text-zinc-500 block text-xs uppercase mb-1">Canais</span>
                 <span className={titleColor}>{d.canais}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className={`flex justify-between border-b ${isLight ? 'border-zinc-200' : 'border-zinc-800'} pb-2`}>
                <span className={subtitleColor}>Local</span>
                <span className={`${titleColor} text-right font-medium`}>{d.local}</span>
              </div>
              <div className={`flex justify-between border-b ${isLight ? 'border-zinc-200' : 'border-zinc-800'} pb-2`}>
                <span className={subtitleColor}>Idade</span>
                <span className={titleColor}>{d.idade}</span>
              </div>
              <div className={`flex justify-between border-b ${isLight ? 'border-zinc-200' : 'border-zinc-800'} pb-2`}>
                <span className={subtitleColor}>Renda / Porte</span>
                <span className={`${titleColor} text-right font-medium`}>{d.renda}</span>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 flex flex-col justify-center gap-6">
            <div className={`p-6 rounded-2xl border ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950 border-zinc-800'}`}>
              <h4 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">Dores</h4>
              <ul className="space-y-3">
                {d.dores_bullets?.map((item: string, i: number) => (
                  <li key={i} className={`flex gap-3 text-base md:text-[17px] ${subtitleColor} leading-relaxed`}><span className="text-red-600 mt-1.5 shrink-0">•</span> <span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className={`p-6 rounded-2xl border ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950 border-zinc-800'}`}>
              <h4 className="text-lg font-bold text-emerald-500 mb-4 flex items-center gap-2">Desejos</h4>
              <ul className="space-y-3">
                {d.desejos_bullets?.map((item: string, i: number) => (
                  <li key={i} className={`flex gap-3 text-base md:text-[17px] ${subtitleColor} leading-relaxed`}><span className="text-emerald-600 mt-1.5 shrink-0">•</span> <span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className={`p-6 rounded-2xl border ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950 border-zinc-800'}`}>
              <h4 className="text-lg font-bold text-amber-500 mb-4 flex items-center gap-2">Objeções de Compra</h4>
              <ul className="space-y-3">
                {d.objecoes_bullets?.map((item: string, i: number) => (
                  <li key={i} className={`flex gap-3 text-base md:text-[17px] ${subtitleColor} leading-relaxed`}><span className="text-amber-600 mt-1.5 shrink-0">•</span> <span>{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'smart_goal_okr') {
    return (
      <div className={`p-10 md:p-14 rounded-3xl border border-red-900/50 bg-gradient-to-br from-zinc-950 via-zinc-900 to-red-950/20 shadow-2xl`}>
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{d.titulo}</h2>
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-sans bg-black/40 p-6 rounded-2xl border border-zinc-800">{d.objetivo_geral}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((num) => (
            <div key={num} className="bg-black/60 border border-red-900/40 p-6 rounded-2xl flex flex-col gap-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-950 border border-red-700 flex items-center justify-center text-red-400 font-bold font-mono">KR{num}</div>
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Resultado-Chave</span>
              </div>
              <p className="text-base text-zinc-200 leading-relaxed">{d[`kr${num}_texto`]}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'campaign_strategy_boxes') {
    return (
      <div>
        <h2 className={`text-4xl font-bold ${titleColor} text-center mb-16`}>{d.titulo}</h2>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {d.boxes?.map((box: any, i: number) => (
            <div key={i} className={`flex-1 ${cardBg} border rounded-2xl p-8 flex flex-col shadow-sm hover:-translate-y-1 transition-transform`}>
              <span className="text-5xl font-bold text-red-600 mb-4">{box.percentual}</span>
              <h3 className={`text-2xl font-bold ${titleColor} mb-4`}>{box.nome}</h3>
              <p className={`text-lg ${subtitleColor} leading-relaxed`}>{box.detalhes}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'creative_workflow') {
    const icons: any = { FileText, CheckCircle2, Video, Rocket };

    return (
      <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
        <h2 className={`text-4xl font-bold ${titleColor} mb-4 text-center`}>{d.titulo}</h2>
        <p className={`text-xl ${subtitleColor} mb-16 text-center max-w-2xl`}>{d.subtitulo}</p>

        {/* Horizontal Workflow timeline */}
        <div className="flex flex-col md:flex-row items-center w-full justify-between relative mb-16 px-4">
           {/* Connecting Line */}
           <div className={`hidden md:block absolute top-8 left-12 right-12 h-1 -translate-y-1/2 rounded-full ${isLight ? 'bg-zinc-200' : 'bg-zinc-800'} z-0`} />

           {d.passos?.map((passo: any, i: number) => {
             const Icon = icons[passo.icone] || FileText;
             return (
               <div key={i} className="flex flex-col items-center text-center gap-4 group relative z-10 mb-8 md:mb-0 w-32">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-xl transition-all duration-300 group-hover:-translate-y-2 
                    ${isLight ? 'bg-white border-zinc-200 shadow-zinc-200/50' : 'bg-zinc-950 border-zinc-800 shadow-black/50'}`}>
                    <Icon className="w-7 h-7 text-red-500" />
                  </div>
                  <h4 className={`font-bold ${titleColor} leading-tight text-sm`}>{passo.titulo}</h4>
               </div>
             )
           })}
        </div>

        <div className={`w-full mt-6 p-8 rounded-3xl border ${cardBg} flex flex-col items-center text-center gap-4 shadow-xl`}>
           <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-1">
              <Video className="w-6 h-6 text-red-500" />
           </div>
           <h3 className={`text-2xl font-bold ${titleColor}`}>Captação Prática e Humanizada no Pátio de Palmas</h3>
           <p className={`${subtitleColor} max-w-2xl text-base`}>
             Jean e Rodrigo gravam vídeos diretos pelo celular com base nos roteiros enviados pelo Squad V4: apresentação de bombas hidráulicas, testes de giro, banco de horas e detalhes das máquinas prontas para entrega.
           </p>
        </div>
      </div>
    )
  }

  if (type === 'meta_ads_analysis') {
    return (
      <div className="flex flex-col h-full gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <h2 className={`text-4xl font-bold ${titleColor}`}>{d.titulo}</h2>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-widest self-start md:self-auto shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Estratégia em Desenvolvimento
          </div>
        </div>
        
        {/* Top 3 KPI Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className={`${cardBg} p-6 rounded-2xl shadow-lg border-l-4 border-amber-500 flex flex-col gap-2`}>
            <span className={`text-sm font-semibold ${subtitleColor}`}>Investimento Prévio em Tráfego</span>
            <span className="text-3xl font-black text-amber-500">{d.investimento}</span>
            <span className="text-xs text-zinc-400">2 gestores anteriores (Meta Ads genérico)</span>
          </div>
          <div className={`${cardBg} p-6 rounded-2xl shadow-lg border-l-4 border-red-500 flex flex-col gap-2`}>
            <span className={`text-sm font-semibold ${subtitleColor}`}>Qualificação de Leads Anterior</span>
            <span className="text-3xl font-black text-red-600">Zero Vendas</span>
            <span className="text-xs text-red-500 font-semibold">Leads curiosos e sem capacidade financeira</span>
          </div>
          <div className={`${cardBg} p-6 rounded-2xl shadow-lg border-l-4 border-emerald-500 flex flex-col gap-2`}>
            <span className={`text-sm font-semibold ${subtitleColor}`}>Novo Direcionamento V4</span>
            <span className="text-3xl font-black text-emerald-500">Google + CRM</span>
            <span className="text-xs text-emerald-600 font-semibold">Foco em intenção de compra ativa e qualificação</span>
          </div>
        </div>

        {/* 2 Bottom Columns: O que funcionou vs O que não funcionou */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* O que funcionou */}
          <div className={`${isLight ? 'bg-emerald-50' : 'bg-emerald-950/20'} p-8 rounded-2xl border border-emerald-200/50 flex flex-col`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500 rounded-xl text-white shadow-md shadow-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">Ativos Validados da Dellatorre</h3>
                <p className={`text-sm ${subtitleColor}`}>Fundamentos sólidos para alavancar no digital</p>
              </div>
            </div>
            <ul className="flex flex-col gap-4">
              {d.funcionou.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className={`text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* O que nao funcionou */}
          <div className={`${isLight ? 'bg-red-50' : 'bg-red-950/20'} p-8 rounded-2xl border border-red-200/50 flex flex-col`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-500 rounded-xl text-white shadow-md shadow-red-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400">Erros das Gestões Anteriores (Eliminar)</h3>
                <p className={`text-sm ${subtitleColor}`}>Causas do desperdício anterior sem conversão</p>
              </div>
            </div>
            <ul className="flex flex-col gap-4">
              {d.nao_funcionou.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span className={`text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'visual_drawflow') {
    return (
      <div className="flex flex-col items-center py-8 w-full overflow-x-auto">
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className={`text-4xl font-bold ${titleColor}`}>{d.titulo}</h2>
          </div>
        </div>
        
        <div className="min-w-[920px] w-full flex flex-col items-center relative">
          {/* Top Node */}
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-2 border-zinc-700 text-white font-extrabold px-10 py-4 rounded-2xl flex items-center gap-3 shadow-2xl z-10">
            <DollarSign className="w-6 h-6 text-amber-400" />
            <div className="flex flex-col text-left">
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Orçamento Total de Mídia</span>
              <span className="text-2xl text-amber-400 font-black">{d.orcamento_total || "R$ 2.000 a R$ 2.500 / mês"}</span>
            </div>
          </div>

          {/* Vertical line from Top */}
          <div className={`h-10 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'}`} />
          
          {/* Horizontal span line covering all 3 branches */}
          <div className={`w-[85%] h-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'}`} />
          
          {/* 3 Dropdown lines */}
          <div className="flex w-[85%] justify-between">
            <div className={`h-10 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'} relative`}>
              <ChevronRight className={`absolute -bottom-2 -left-2.5 w-5 h-5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'} rotate-90`} />
            </div>
            <div className={`h-10 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'} relative`}>
              <ChevronRight className={`absolute -bottom-2 -left-2.5 w-5 h-5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'} rotate-90`} />
            </div>
            <div className={`h-10 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'} relative`}>
              <ChevronRight className={`absolute -bottom-2 -left-2.5 w-5 h-5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'} rotate-90`} />
            </div>
          </div>

          {/* 3 Campaign Branch Nodes */}
          <div className="flex w-full justify-between gap-6 px-4 mt-2 z-10">
            
            {/* Branch 1: Google Ads (70%) */}
            <div className={`flex-[1.2] ${cardBg} p-6 rounded-2xl text-left shadow-xl border-2 border-amber-500/60 relative flex flex-col justify-between overflow-hidden`}>
              <div className="absolute top-0 right-0 bg-amber-500 text-zinc-950 font-black text-xs px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                70% da Verba
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Motor Primário</span>
                </div>
                <h4 className={`font-black text-xl mb-1 ${titleColor}`}>Google Ads (Search)</h4>
                <p className="text-2xl font-black text-amber-500 mb-3">R$ 1.400 a R$ 1.750 <span className="text-xs font-semibold text-zinc-500">/mês</span></p>
                <div className={`text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-300'} space-y-1.5`}>
                  <p className="text-amber-700 dark:text-amber-400 font-medium">⚡ Geolocalizado: TO, Matopiba, MT, PA e GO</p>
                </div>
              </div>
            </div>

            {/* Branch 2: Meta Ads (20%) */}
            <div className={`flex-[1] ${cardBg} p-6 rounded-2xl text-left shadow-xl border-2 border-red-500/60 relative flex flex-col justify-between overflow-hidden`}>
              <div className="absolute top-0 right-0 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                20% da Verba
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">Autoridade & Estoque</span>
                </div>
                <h4 className={`font-black text-xl mb-1 ${titleColor}`}>Meta Ads (Vídeos & Feed)</h4>
                <p className="text-2xl font-black text-red-500 mb-3">R$ 400 a R$ 500 <span className="text-xs font-semibold text-zinc-500">/mês</span></p>
                <div className={`text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-300'} space-y-1.5`}>
                  <p className="text-red-700 dark:text-red-400 font-medium">🎯 Vídeos no pátio e prova social de entregas</p>
                </div>
              </div>
            </div>

            {/* Branch 3: Remarketing & Consignados (10%) */}
            <div className={`flex-[0.9] ${cardBg} p-6 rounded-2xl text-left shadow-xl border-2 border-indigo-500/60 relative flex flex-col justify-between overflow-hidden`}>
              <div className="absolute top-0 right-0 bg-indigo-500 text-white font-black text-xs px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                10% da Verba
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 text-indigo-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Reengajamento</span>
                </div>
                <h4 className={`font-black text-xl mb-1 ${titleColor}`}>Remarketing & Consignação</h4>
                <p className="text-2xl font-black text-indigo-500 mb-3">R$ 200 a R$ 250</p>
                <div className={`text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-400'} space-y-1`}>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">🔄 Captação de máquinas consignadas para expandir inventário.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Convergence Paths (Lines to Landing Pages & WhatsApp) */}
          <div className="flex w-full justify-between px-4 mt-0">
            <div className="flex-1 flex flex-col items-center relative pt-6">
              <div className="flex w-[75%] justify-between absolute top-0">
                <div className={`h-8 w-px bg-amber-500`} />
                <div className={`h-8 w-px bg-red-500`} />
                <div className={`h-8 w-px bg-indigo-500`} />
              </div>
              <div className={`w-[75%] h-0.5 bg-gradient-to-r from-amber-500 via-red-500 to-indigo-500 mt-8`} />
              <div className={`h-8 w-px bg-red-600 relative`}>
                <ChevronRight className="absolute -bottom-2 -left-2.5 w-5 h-5 text-red-600 rotate-90" />
              </div>
              
              {/* Landing Page Central Node */}
              <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 text-white font-bold p-6 rounded-2xl shadow-2xl border-2 border-amber-500 flex items-center justify-between gap-6 mt-2 z-10 w-full max-w-2xl">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-amber-500/20 rounded-xl border border-amber-500/40">
                    <Truck className="w-8 h-8 text-amber-500" />
                  </div>
                  <div>
                    <span className="text-2xl font-black block">Landing Page por Categoria + WhatsApp</span>
                    <span className="text-sm font-normal text-zinc-300">Páginas enxutas para Pás, Retros, Tratores e Caminhões com fotos reais e botão direto de WhatsApp</span>
                  </div>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-xl text-right shrink-0">
                  <span className="text-xs uppercase block text-amber-400 font-bold">Contato Rápido</span>
                  <span className="text-base font-black text-white">Rodrigo / Jean</span>
                </div>
              </div>
            </div>
          </div>

          {/* Connector from Landing Page to CRM Comercial */}
          <div className="w-full relative h-12 flex justify-center">
            <div className={`h-12 w-px ${isLight ? 'bg-zinc-300' : 'bg-zinc-700'} relative`}>
              <ChevronRight className={`absolute -bottom-2 -left-2.5 w-5 h-5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'} rotate-90`} />
            </div>
          </div>

          {/* Final CRM & Commercial Closure node */}
          <div className="flex w-full flex-col items-center mt-2 relative z-10">
            <div className={`${isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400'} border-2 px-10 py-5 rounded-2xl flex items-center gap-4 shadow-xl max-w-xl w-full justify-center`}>
              <ShieldCheck className="w-7 h-7 text-emerald-500 shrink-0" />
              <div className="text-left">
                <span className="text-lg font-black block">Processo Comercial, CRM & Fechamento Pix</span>
                <span className={`text-xs ${isLight ? 'text-emerald-700' : 'text-emerald-300'}`}>Triagem MQL/SQL • Chamada de Vídeo ao Vivo • Frete de Retorno Otimizado • Contrato & Pix</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  if (type === 'media_projection') {
    return (
      <div className="flex flex-col h-full items-center justify-center py-8">
        <h2 className={`text-4xl font-bold ${titleColor} mb-2`}>{d.titulo}</h2>
        <p className={`text-xl ${subtitleColor} mb-12`}>Orçamento de Mídia: <strong className="text-amber-500">{d.orcamento}</strong></p>

        <div className="w-full max-w-5xl grid md:grid-cols-3 gap-8 mb-12">
          {d.cenarios.map((cenario: any, i: number) => {
            let color = 'text-zinc-500';
            let bg = isLight ? 'bg-zinc-100' : 'bg-zinc-800';
            let border = 'border-zinc-200 dark:border-zinc-700';
            
            if (i === 0) { color = 'text-amber-500'; bg = isLight ? 'bg-amber-50' : 'bg-amber-950/30'; border = 'border-amber-200 dark:border-amber-900/50'; }
            if (i === 1) { color = 'text-emerald-500'; bg = isLight ? 'bg-emerald-50' : 'bg-emerald-950/30'; border = 'border-emerald-200 dark:border-emerald-900/50'; }
            if (i === 2) { color = 'text-indigo-500'; bg = isLight ? 'bg-indigo-50' : 'bg-indigo-950/30'; border = 'border-indigo-200 dark:border-indigo-900/50'; }

            return (
              <div key={i} className={`${cardBg} rounded-3xl p-8 border-2 ${border} shadow-xl flex flex-col items-center text-center relative overflow-hidden`}>
                 <div className={`absolute top-0 inset-x-0 h-2 ${color.replace('text', 'bg')}`} />
                 <h4 className={`text-lg font-bold uppercase tracking-wider ${color} mb-6`}>{cenario.nome}</h4>
                 <div className="flex flex-col items-center gap-2 mb-6">
                   <span className="text-5xl font-black">{cenario.pedidos}</span>
                   <span className={`text-sm font-medium ${subtitleColor}`}>máquinas / mês</span>
                 </div>
                 <div className={`mt-auto ${bg} px-6 py-3 rounded-xl w-full`}>
                   <span className={`font-bold text-xs ${color}`}>{cenario.cpa}</span>
                 </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (type === 'spreadsheet_placeholder') {
    return (
      <div>
         <div className="flex items-center gap-4 mb-12">
           <FileSpreadsheet className="w-10 h-10 text-red-600" />
           <h2 className={`text-4xl font-bold ${titleColor}`}>{d.titulo}</h2>
         </div>
         
         <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
           <div className="grid md:grid-cols-4 gap-6">
             <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
               <span className="text-xs text-amber-500 font-bold uppercase tracking-wider block mb-2">Semanas 1 e 2 (Outubro)</span>
               <h4 className="font-bold text-white mb-2">Onboarding & Setup</h4>
               <p className="text-xs text-zinc-400 leading-relaxed">Coleta de acessos Google Ads/Meta, criação da conta de anúncios, definição de palavras-chave geolocalizadas e estruturação das Landing Pages de categorias.</p>
             </div>
             <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
               <span className="text-xs text-amber-500 font-bold uppercase tracking-wider block mb-2">Semanas 3 e 4 (Outubro)</span>
               <h4 className="font-bold text-white mb-2">Lançamento de Campanhas</h4>
               <p className="text-xs text-zinc-400 leading-relaxed">Publicação das Landing Pages, início dos anúncios de busca no Google Ads, primeiros vídeos gravados por Jean/Rodrigo rodando no Meta Ads e integração do CRM.</p>
             </div>
             <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
               <span className="text-xs text-amber-500 font-bold uppercase tracking-wider block mb-2">Novembro de 2026</span>
               <h4 className="font-bold text-white mb-2">Otimização & MQL/SQL</h4>
               <p className="text-xs text-zinc-400 leading-relaxed">Ajuste fino de termos negativos no Google, cadência de atendimento via WhatsApp, rotação de vídeos de estoque e validação do CPL e custo por oportunidade.</p>
             </div>
             <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800">
               <span className="text-xs text-amber-500 font-bold uppercase tracking-wider block mb-2">Dezembro de 2026</span>
               <h4 className="font-bold text-white mb-2">Consolidação & Pré-Escala</h4>
               <p className="text-xs text-zinc-400 leading-relaxed">Fechamento do trimestre com todos os indicadores consolidados, validação de metas de 5 a 6 máquinas/mês e planejamento de escala para R$ 5.200/mês e expansão de verba.</p>
             </div>
           </div>
         </div>
      </div>
    )
  }

  // Fallback for missing types
  return (
    <div className={`p-8 border border-red-500 ${cardBg} text-red-500`}>
      <p>⚠️ Missing renderer for slide type: {type}</p>
    </div>
  )
}

export default function ReportViewer() {
  const { slides } = presentationData

  return (
    <div className="min-h-screen bg-zinc-950 selection:bg-red-500/30 font-sans">
      {slides.map((slide, index) => {
        const themeClass = getSectionTheme(slide.id, slide.slide_type)
        return (
          <SectionWrapper key={slide.id || index} themeClass={themeClass}>
            <RenderBlock slide={slide} />
          </SectionWrapper>
        )
      })}
    </div>
  )
}
