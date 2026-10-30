import { useEffect, useRef, useState } from 'react';
import { Copy, Download, X } from 'lucide-react';
import { composeCaseArticle, type RideRecord } from './article';
import type { Account } from './domain';

export default function CaseArticle({
  account,
  history,
  onClose,
}: {
  account: Account;
  history: RideRecord[];
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [copyMessage, setCopyMessage] = useState('O texto descreve a sessão atual e deixa explícito que a identidade é simulada.');
  const article = composeCaseArticle({ account, history, date: new Date() });

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(article);
      setCopyMessage('Artigo copiado. Cole onde for publicar.');
    } catch {
      setCopyMessage('Não foi possível copiar. Selecione o texto abaixo e copie manualmente.');
    }
  }

  function download() {
    const blob = new Blob([article], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'case-embarque-facial.md';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <dialog ref={dialog} className="case-dialog" aria-labelledby="case-title" onClose={onClose}>
      <div className="case-heading">
        <h2 id="case-title">Artigo do case</h2>
        <button type="button" onClick={onClose} aria-label="Fechar artigo"><X size={18} /></button>
      </div>
      <p className="case-status" role="status">{copyMessage}</p>
      <div className="case-actions">
        <button type="button" onClick={() => void copy()}><Copy size={15} /> Copiar</button>
        <button type="button" onClick={download}><Download size={15} /> Baixar .md</button>
      </div>
      <pre className="case-preview">{article}</pre>
    </dialog>
  );
}
