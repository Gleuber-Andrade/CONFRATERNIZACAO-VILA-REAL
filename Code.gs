/**
 * Confraternização Vila Real Futsal - recebe as confirmações do formulário
 * e grava cada uma como uma linha na aba "Confirmações" desta planilha.
 *
 * Como usar: veja o LEIA-ME.md.
 */

const ABA = 'Confirmações';
const VALOR_ADULTO = 30;
const CABECALHO = [
  'Data/hora', 'Responsáveis', 'Alunos', 'Presença',
  'Qtd. adultos', 'Valor PIX (R$)', 'PIX recebido?'
];

function obterAba_() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(ABA);
  if (!aba) {
    aba = planilha.insertSheet(ABA);
  }
  if (aba.getLastRow() === 0) {
    aba.appendRow(CABECALHO);
    aba.getRange(1, 1, 1, CABECALHO.length).setFontWeight('bold').setBackground('#0f7a3e').setFontColor('#ffffff');
    aba.setFrozenRows(1);
    aba.getRange('F:F').setNumberFormat('R$ #,##0.00');
  }
  return aba;
}

function limpar_(texto, max) {
  return String(texto || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max || 120);
}

function doPost(e) {
  const trava = LockService.getScriptLock();
  trava.waitLock(10000);
  try {
    const dados = JSON.parse(e.postData.contents);

    const responsaveis = (dados.responsaveis || []).map(n => limpar_(n)).filter(Boolean).slice(0, 10);
    const alunos = (dados.alunos || []).map(n => limpar_(n)).filter(Boolean).slice(0, 10);
    const vai = dados.presenca === 'sim';

    if (!responsaveis.length || !alunos.length) {
      return resposta_({ ok: false, erro: 'Informe ao menos um responsável e um aluno.' });
    }

    // O valor é calculado aqui, não confia no que veio da página.
    const qtd = vai ? responsaveis.length : 0;
    const valor = qtd * VALOR_ADULTO;

    obterAba_().appendRow([
      new Date(),
      responsaveis.join(', '),
      alunos.join(', '),
      vai ? 'Sim' : 'Não',
      qtd,
      valor,
      vai ? 'Não' : '-'
    ]);

    return resposta_({ ok: true, qtd: qtd, valor: valor });
  } catch (err) {
    return resposta_({ ok: false, erro: 'Não foi possível registrar. Tente novamente.' });
  } finally {
    trava.releaseLock();
  }
}

function doGet() {
  return resposta_({ ok: true, status: 'Formulário da confraternização ativo' });
}

function resposta_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
