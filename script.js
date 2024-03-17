// Esta função é chamada quando a página é carregada
window.onload = function() {
  // Obtém a data e hora atuais no formato ISO e define o valor do campo 'horarioAtual' com ela
  const horarioAtualISO = new Date().toISOString().slice(0, 16);
  document.getElementById('horarioAtual').value = horarioAtualISO;
  // Define o valor do campo 'horasRemover' como 12 por padrão
  document.getElementById('horasRemoverSilo').value = 12;
  document.getElementById('horasRemoverAcido').value = 48;
  document.getElementById('horasRemoverRacao').value = 6;
};

// Função para converter o formato da data e hora
function converterFormato(dataHora) {
  // Dividir a string em partes
  const partes = dataHora.split('T');
  const data = partes[0];
  const hora = partes[1];

  // Dividir a data em ano, mês e dia
  const [ano, mes, dia] = data.split('-');

  // Formatar a data no formato DD/MM/YYYY HH:MM
  const formato = `${dia}/${mes}/${ano} ${hora}`;

  return formato;
}

// Função para converter um valor float em horas e minutos
function converterFloatParaHoras(valorFloat) {
  // Obter a parte inteira (horas)
  let horas = Math.floor(valorFloat);

  // Obter a parte decimal (fração de horas)
  let decimal = valorFloat - horas;

  // Converter a fração de horas em minutos
  let minutos = Math.round(decimal * 60);

  // Retornar o resultado formatado
  return `${horas} horas e ${minutos} minutos`;
}

// Esta função quando o botão "Copiar" é clicado
function copiar(nomeAviario, consumoHora, consumoAve, horaDiferenca, racaoTotal, racaoPedido) {
  // Concatenando os valores em uma única string
  const textoCopiado = `Identificação do aviário: ${nomeAviario}\nConsumo por hora (em quilos): ${consumoHora}\nConsumo por ave (em gramas): ${consumoAve}\nTempo de diferença: ${horaDiferenca}\nRação total necessária (em quilos): ${racaoTotal}\nRação de pedido (em quilos): ${racaoPedido}`;

  // Criando um elemento textarea para armazenar o texto copiado
  const textarea = document.createElement('textarea');
  textarea.value = textoCopiado;
  document.body.appendChild(textarea);

  // Selecionando o texto no textarea
  textarea.select();

  // Copiando o texto selecionado para a área de transferência
  document.execCommand('copy');

  // Removendo o textarea
  document.body.removeChild(textarea);

  // Exibindo uma mensagem de sucesso
  alert('Texto copiado para a área de transferência!');
}

// Função chamada quando o botão 'Calcular' é clicado
function calcularRacao() {
  // Obtém os valores dos campos do formulário
  const nomeAviario = document.getElementById('nomeAviario').value;
  let horarioAtual = document.getElementById('horarioAtual').value;
  let horarioApanha = document.getElementById('horarioApanha').value;

  const avesVivas = document.getElementById('avesVivas').value;
  const racaoAtual = parseFloat(document.getElementById('racaoAtual').value);
  const consumoAviario = parseFloat(document.getElementById('consumoAviario').value);

  const horasRemoverSilo = parseFloat(document.getElementById('horasRemoverSilo').value) || 12;
  const horasRemoverAcido = parseFloat(document.getElementById('horasRemoverAcido').value) || 48;
  const horasRemoverRacao = parseFloat(document.getElementById('horasRemoverRacao').value) || 6;

  // Calcula o consumo por hora
  const consumoPorHora = consumoAviario / 24;
  // Consumo por ave
  const consumoPorAve = (consumoAviario / avesVivas) * 1000;

  // Verificar se os campos obrigatórios estão vazios
  if (nomeAviario === '' || horarioAtual === '' || horarioApanha === '' || avesVivas === '' ||
    isNaN(racaoAtual) || isNaN(consumoAviario)) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Verifica se o valor já existe na primeira coluna da tabela
  const tabela = document.getElementById("tabelaOrdem");
  const rows = tabela.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    if (cells.length > 0 && cells[0].innerHTML === nomeAviario) {
      alert("Este aviário já foi adicionado, edite a 'Identificação do aviário'.");
      return;
    }
  }

  // Converte o formato das datas e horas
  horarioApanha = converterFormato(horarioApanha);
  horarioAtual = converterFormato(horarioAtual);

  const [apanhaData, apanhaHora] = horarioApanha.split(' ');
  const [atualData, atualHora] = horarioAtual.split(' ');

  const apanhaDataSplit = apanhaData.split('/');
  const atualDataSplit = atualData.split('/');

  // Verifica se as datas são válidas
  if (apanhaDataSplit.length !== 3 || atualDataSplit.length !== 3) {
    alert('Por favor, insira datas válidas.');
    return;
  }

  const [apanhaDia, apanhaMes, apanhaAno] = apanhaDataSplit;
  const [atualDia, atualMes, atualAno] = atualDataSplit;

  const horarioApanhaObj = new Date(apanhaAno, apanhaMes - 1, apanhaDia, apanhaHora.split(':')[0], apanhaHora.split(':')[1]);
  const horarioAtualObj = new Date(atualAno, atualMes - 1, atualDia, atualHora.split(':')[0], atualHora.split(':')[1]);

  const novoHorarioApanhaObj = new Date(horarioApanhaObj.getTime() - (horasRemoverSilo * 3600000));
  const horasDiferenca = (novoHorarioApanhaObj - horarioAtualObj) / 3600000;

  const racaoTotal = horasDiferenca * consumoPorHora;
  const racaoPedido = racaoTotal - racaoAtual;
  const horasDiferencaTratado = converterFloatParaHoras(horasDiferenca);

  //Mostrar tarefas
  const blocoTarefas = document.getElementById('blocoTarefas');
  blocoTarefas.style.display = 'block';

  // Define o HTML do resultado
  const resultado = `
    <div class='row rowFlex'>
      <h2>Resultados</h2>
 <button class="button copiar" onclick="copiar('${nomeAviario}', '${consumoPorHora.toFixed(2).replace(".", ",")}', '${consumoPorAve.toFixed(2).replace(".", ",")}', '${horasDiferencaTratado}', '${racaoTotal.toFixed(2).replace(".", ",")}', '${racaoPedido.toFixed(2).replace(".", ",")}')">Copiar</button>
    </div>
    <table>
      <tr>
        <th>Identificação do aviário</th>
        <td>${nomeAviario}</td>
      </tr>
      <tr>
        <th>Consumo por hora <span class='spanTable'>(em quilos)</span></th>
        <td>${consumoPorHora.toFixed(2).replace('.', ',')}</td>
      </tr>
      <tr>
        <th>Consumo por ave <span class='spanTable'>(em gramas)</span></th>
        <td>${consumoPorAve.toFixed(2).replace('.', ',')}</td>
      </tr>
      <tr>
        <th>Tempo de diferença</th>
        <td>${horasDiferencaTratado}</td>
      </tr>
      <tr>
        <th>Ração total necessária <span class='spanTable'>(em quilos)</span></th>
        <td>${racaoTotal.toFixed(2).replace('.', ',')}</td>
      </tr>
      <tr>
        <th>Ração de pedido <span class='spanTable'>(em quilos)</span></th>
        <td id='racaoPedidoCell'>${racaoPedido.toFixed(2).replace('.', ',')}</td>
      </tr>
    </table>
  `;

  // Define o HTML do resultado
  document.getElementById('resultado').innerHTML = resultado;

  // Obtém a célula da tabela para racaoPedido
  const racaoPedidoCell = document.getElementById('racaoPedidoCell');

  // Edita com background caso valor for negativo
  if (racaoPedido < 0) {
    racaoPedidoCell.style.backgroundColor = '#ff7575';
  } else {
    racaoPedidoCell.style.backgroundColor = '';
  }

  // Exibe ou oculta a div de resultado conforme necessário
  const resultadoDiv = document.getElementById('resultado');
  if (resultado === '') {
    resultadoDiv.style.display = 'none';
  } else {
    resultadoDiv.style.display = 'block';
  }

  calcularTarefas(nomeAviario, horarioApanhaObj, horasRemoverSilo, horasRemoverAcido, horasRemoverRacao)
}

function calcularTarefas(nomeAviario, horarioApanhaObj, horasRemoverSilo, horasRemoverAcido, horasRemoverRacao) {
  inserirTabela(nomeAviario, horarioApanhaObj, horasRemoverSilo, horasRemoverAcido, horasRemoverRacao);
  ordenarTabela();
}

function inserirTabela(nomeAviario, horarioApanhaObj, horasRemoverSilo, horasRemoverAcido, horasRemoverRacao) {
  function formatarData(data) {
    var dataObj = new Date(data);
    var dia = dataObj.getDate();
    var mes = dataObj.getMonth() + 1; // Mês é base 0, então adicionamos 1
    var ano = dataObj.getFullYear();
    var hora = dataObj.getHours();
    var minutos = dataObj.getMinutes();

    // Adiciona zero à esquerda se for necessário
    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;
    hora = hora < 10 ? '0' + hora : hora;
    minutos = minutos < 10 ? '0' + minutos : minutos;

    // Retorna a string formatada
    return dia + '/' + mes + '/' + ano + ' ' + hora + ':' + minutos;
  }

  var dataValorTar1 = new Date(horarioApanhaObj);
  var dataValorTar2 = new Date(horarioApanhaObj);
  var dataValorTar3 = new Date(horarioApanhaObj);

  // //Calcular horasRemoverSilo - 6 (desligamento do silo 6h antes do horário de apanha)
  // var horasRemoverSilo = horasRemoverSilo - 6;

  dataValorTar1.setHours(dataValorTar1.getHours() - horasRemoverSilo);
  var dataFormatadaTar1 = formatarData(dataValorTar1);

  dataValorTar2.setHours(dataValorTar2.getHours() - horasRemoverAcido);
  var dataFormatadaTar2 = formatarData(dataValorTar2);

  dataValorTar3.setHours(dataValorTar3.getHours() - horasRemoverRacao);
  var dataFormatadaTar3 = formatarData(dataValorTar3);

  var tabelaOrdem = document.getElementById('tabelaOrdem');

  var tar1 = document.createElement('tr');
  tar1.innerHTML = `
    <td>${nomeAviario}</td>
    <td>Desligar silo de ração</td>
    <td>${dataFormatadaTar1}</td>
  `;
  var tar2 = document.createElement('tr');
  tar2.innerHTML = `
    <td>${nomeAviario}</td>
    <td>Inserir ácido</td>
    <td>${dataFormatadaTar2}</td>
  `;
  var tar3 = document.createElement('tr');
  tar3.innerHTML = `
    <td>${nomeAviario}</td>
    <td>Erguer linhas de ração</td>
    <td>${dataFormatadaTar3}</td>
  `;

  tabelaOrdem.appendChild(tar1);
  tabelaOrdem.appendChild(tar2);
  tabelaOrdem.appendChild(tar3);
}

function ordenarTabela() {
  var tabela, linhas, troca, i, x, y, deveTrocar, direcao, contadorTroca = 0;
  tabela = document.getElementById('tabela');
  troca = true;
  direcao = 'asc';
  while (troca) {
    troca = false;
    linhas = tabela.rows;
    for (i = 1; i < (linhas.length - 1); i++) {
      deveTrocar = false;
      x = linhas[i].getElementsByTagName('TD')[2].innerHTML;
      y = linhas[i + 1].getElementsByTagName('TD')[2].innerHTML;
      var dataHoraX = new Date(x.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'));
      var dataHoraY = new Date(y.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'));
      if (direcao == 'desc') {
        if (dataHoraX > dataHoraY) {
          deveTrocar = true;
          break;
        }
      } else if (direcao == 'asc') {
        if (dataHoraX > dataHoraY) {
          deveTrocar = true;
          break;
        }
      }
    }
    if (deveTrocar) {
      linhas[i].parentNode.insertBefore(linhas[i + 1], linhas[i]);
      troca = true;
      contadorTroca++;
    } else {
      if (contadorTroca == 0 && direcao == 'desc') {
        direcao = 'desc';
        troca = true;
      }
    }
  }
}
