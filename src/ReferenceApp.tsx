import { useState, type ComponentType } from 'react';
import {
  ArrowLeft, ArrowRight, BusFront, ChevronDown, CircleHelp, CreditCard,
  Eye, EyeOff, FileCheck2, Headphones, Heart, Info, MapPin, MapPinned, Plus, QrCode,
  Route, ScanFace, ShieldCheck, UserRound, WalletCards,
} from 'lucide-react';
import './reference-app.css';

interface ReferenceAppProps {
  onFacial: () => void;
  onQr: () => void;
  balance?: number;
  onRecharge?: () => void;
}

type Tile = { label: string; icon: ComponentType<{ size?: number; strokeWidth?: number }>; action?: 'qr' | 'lgpd' | 'facial' };
const tiles: Tile[] = [
  { label: 'QR Code', icon: QrCode, action: 'qr' },
  { label: 'Favoritos', icon: Heart },
  { label: 'Cartões de crédito', icon: CreditCard },
  { label: 'Pontos de recarga', icon: WalletCards },
  { label: 'Linhas e estações', icon: BusFront },
  { label: 'Rotas', icon: Route },
  { label: 'Pontos de ônibus', icon: MapPin },
  { label: 'Perguntas frequentes', icon: CircleHelp },
  { label: 'Fale conosco', icon: Headphones },
  { label: 'LGPD', icon: ShieldCheck, action: 'lgpd' },
  { label: 'Política de privacidade', icon: FileCheck2 },
  { label: 'Termos de uso', icon: MapPinned },
  { label: 'Embarque facial', icon: ScanFace, action: 'facial' },
];

export default function ReferenceApp({ onFacial, onQr, balance = 35, onRecharge }: ReferenceAppProps) {
  const [page, setPage] = useState<'home' | 'lgpd'>('home');
  const [notice, setNotice] = useState('');
  const [balanceVisible, setBalanceVisible] = useState(true);
  function activate(tile: Tile) {
    setNotice('');
    if (tile.action === 'qr') return onQr();
    if (tile.action === 'facial') return onFacial();
    if (tile.action === 'lgpd') return setPage('lgpd');
    setNotice(`${tile.label}: tela de referência nesta demonstração.`);
  }
  if (page === 'lgpd') {
    return <div className="reference-app reference-lgpd">
      <header className="reference-page-header">
        <button aria-label="Voltar ao início" onClick={() => { setPage('home'); setNotice(''); }}><ArrowLeft size={25} /></button>
        <h1>LGPD</h1>
      </header>
      <div className="reference-lgpd-content">
        <section className="reference-lgpd-card" aria-label="Informações sobre proteção de dados">
          <div className="reference-lgpd-intro"><Info size={24} strokeWidth={1.6} /><p>Para assuntos relacionados à proteção de dados pessoais, entre em contato:</p><a href="mailto:lgpd@transfacil.com.br">lgpd@transfacil.com.br</a></div>
          <div className="reference-lgpd-copy">
            <h2>Lei Geral de Proteção de Dados</h2>
            <p>A Lei Geral de Proteção de Dados Pessoais (LGPD), Lei nº 13.709/2018, estabelece regras para o tratamento de dados pessoais, garantindo mais transparência e proteção à sua privacidade.</p>
            <p>Conheça seus direitos e saiba mais sobre o tratamento dos seus dados pessoais no Portal da Privacidade.</p>
            <button className="reference-privacy-button" onClick={() => setNotice('Portal da privacidade: navegação externa não disponível nesta demonstração.')}>Portal da privacidade</button>
          </div>
        </section>
        <div className="reference-transfacil-logo" aria-label="Transfácil, movendo pessoas"><span className="reference-transfacil-symbol">t</span><div><strong>transfácil</strong><span>movendo pessoas</span></div></div>
        {notice && <p className="reference-notice" role="status">{notice}</p>}
      </div>
    </div>;
  }
  return <div className="reference-app reference-home">
    <div className="reference-orange-zone">
      <header className="reference-home-header">
        <div className="reference-bhbus-logo" aria-label="BHBUS mais">BHBUS<span>+</span></div>
        <button className="reference-user" onClick={() => setNotice('Perfil Demo. Nenhum dado pessoal está vinculado a esta demonstração.')} aria-label="Perfil Demo"><span>Demo</span><UserRound size={26} strokeWidth={1.7}/></button>
      </header>
      <div className="reference-account-tabs"><button className="active" onClick={() => setNotice('Seus cartões de demonstração aparecem abaixo.')}>Cartões BH Bus</button><button onClick={onQr}>QR Codes</button></div>
      <div className="reference-card-intro"><h1>Meus cartões BHBus</h1><p>Adicione cartões, recarregue e veja seu<br/>histórico de recargas</p></div>
      <div className="reference-wallet-row">
        <section className="reference-wallet" aria-label="Cartão BHBus fictício">
          <div className="reference-wallet-main"><div className="reference-wallet-brand">BHBUS</div><div className="reference-wallet-balance"><span>Saldo fictício</span><strong>{balanceVisible ? balance.toLocaleString('pt-BR', {style:'currency', currency:'BRL'}) : '••••••'}</strong></div><button aria-label={balanceVisible?'Ocultar saldo':'Mostrar saldo'} onClick={() => setBalanceVisible(value => !value)}>{balanceVisible?<Eye size={19}/>:<EyeOff size={19}/>}</button></div>
          <div className="reference-wallet-actions"><button onClick={() => setNotice('Cartão de demonstração. Nenhum cartão real está vinculado.')}>Detalhes <ChevronDown size={17}/></button><button onClick={() => { if(onRecharge) onRecharge(); setNotice('R$ 20 fictícios adicionados à demonstração.'); }}>Recarregar</button></div>
        </section>
        <button className="reference-add-card" onClick={() => setNotice('Adicionar cartão: use o cadastro fictício de embarque facial nesta demonstração.')}><span><Plus size={23}/></span><strong>Adicionar<br/>cartão</strong></button>
      </div>
    </div>
    <div className="reference-home-content">
      <button className="reference-banner" onClick={() => setNotice('Banner de referência: consulte os canais oficiais para informações reais de linhas e rotas.')}><span>Confira as mudanças<br/>de rotas no nosso<br/><strong>Instagram</strong><small>Saiba Mais <ArrowRight size={15}/></small></span><span className="reference-banner-portrait" aria-hidden="true"><UserRound size={78} strokeWidth={1.2}/></span></button>
      <nav className="reference-tile-grid" aria-label="Serviços BHBUS mais">
        {tiles.map(tile => <button className="reference-tile" key={tile.label} onClick={() => activate(tile)}><tile.icon size={35} strokeWidth={1.65}/><span>{tile.label}</span></button>)}
      </nav>
      {notice && <p className="reference-notice" role="status">{notice}</p>}
      <footer className="reference-app-footer"><span className="reference-footer-symbol" aria-label="Transfácil">t</span><span>Versão 3.9.3</span></footer>
    </div>
  </div>;
}
