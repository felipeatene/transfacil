import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, Maximize, Monitor, Smartphone, Columns2 } from 'lucide-react';
import ReferenceApp from './ReferenceApp';
import FacialPanel from './FacialPanel';
import Totem from './Totem';
import { initialAccount, type Account } from './domain';
import './style.css';
import './replica.css';
function App(){
 const query=new URLSearchParams(location.search);
 const initialView=query.get('view');
 const [view,setView]=useState<'app'|'totem'|'both'>(initialView==='app'||initialView==='totem'?initialView:'both');
 const [recording,setRecording]=useState(query.get('record')==='1');
 const [facial,setFacial]=useState(false);
 const [account,setAccount]=useState<Account>(()=>structuredClone(initialAccount));
 const [notice,setNotice]=useState('');
 function record(next:'app'|'totem'){setView(next);setRecording(true);setFacial(false);const url=new URL(location.href);url.searchParams.set('view',next);url.searchParams.set('record','1');history.replaceState(null,'',url);}
 function exitRecording(){setRecording(false);const url=new URL(location.href);url.searchParams.delete('record');history.replaceState(null,'',url);if(document.fullscreenElement)void document.exitFullscreen();}
 return <div className={'replica-root '+(recording?'recording-root':'')}>{!recording?<header className="replica-toolbar"><div><strong>Transfácil · demonstração</strong><span>Réplica de referência + proposta facial</span></div><nav aria-label="Visualização"><button aria-pressed={view==='app'} onClick={()=>{setView('app');setFacial(false);}}><Smartphone size={16}/> App</button><button aria-pressed={view==='totem'} onClick={()=>{setView('totem');setFacial(false);}}><Monitor size={16}/> Validador</button><button aria-pressed={view==='both'} onClick={()=>{setView('both');setFacial(false);}}><Columns2 size={16}/> Ambos</button></nav><div className="replica-record-actions"><button onClick={()=>record('app')}><Maximize size={14}/> Gravar app</button><button onClick={()=>record('totem')}><Maximize size={14}/> Gravar totem</button></div></header>:<button className="record-exit" onClick={exitRecording} aria-label="Sair do modo gravação"><ArrowLeft size={15}/> Sair</button>}
 {facial?<div className="facial-panel"><button className="replica-back" onClick={()=>setFacial(false)}><ArrowLeft size={17}/> Voltar ao BHBUS+</button><h1 className="facial-title">Embarque facial</h1><p className="facial-subtitle">Proposta demonstrativa · cadastros e créditos fictícios</p><FacialPanel account={account} setAccount={setAccount}/></div>:<div className={'replica-stages view-'+view}>{view!=='totem'&&<div className="replica-phone-stage"><ReferenceApp balance={account.balance} onRecharge={()=>setAccount(a=>({...a,balance:a.balance+20}))} onFacial={()=>setFacial(true)} onQr={()=>{setNotice('QR Code demonstrativo. Nenhum bilhete ou cobrança real é gerado.');}}/>{notice&&<div className="replica-notice" role="status"><p>{notice}</p><button onClick={()=>setNotice('')}>Fechar</button></div>}</div>}{view!=='app'&&<Totem account={account} setAccount={setAccount} recording={recording}/>}</div>}
 {!recording&&!facial&&<footer className="replica-disclaimer">Demonstração independente, sem vínculo oficial. Referências reproduzidas por composição; nenhuma biometria ou cobrança real. Câmera somente local.</footer>}
 </div>
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
