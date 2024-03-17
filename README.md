<div align="center">
    <img width="100" src="/assets/favicon.png">
</div>

### Introdução

**Frangooo!** é ferramenta para auxiliar produtores e criadores de aves a calcular a quantidade de ração necessária para alimentar suas aves de forma eficiente e precisa. 

Com nossa calculadora, você pode inserir informações como o nome do aviário, o horário de alimentação, o consumo de ração por dia, o horário atual e a quantidade de ração atualmente disponível. Com base nessas informações, a calculadora determinará a quantidade total de ração necessária e a quantidade que precisa ser adicionada ou removida para garantir um suprimento adequado.

A calculadora é fácil de usar e oferece resultados precisos, ajudando você a planejar e gerenciar a alimentação de suas aves de forma eficiente.

<div align="left">
    <a href="https://bill1300.github.com/frangooo">
      <img width="175" src="https://i.imgur.com/G1kCG6X.png">
    </a>
</div>

### Parâmetros de entrada

Campo | Descrição
----|----
Identificação de aviário | Utilizado para identificar o aviário na apresentação do resultado na tabela gerada.
Horário atual | Indica o horário (dia/hora) de verificação da quantidade de ração armazenada ainda disponível. O valor padrão é o horário atual.
Horário de apanha | Indica o horário (dia/hora) agendado para o carregamento dos frangos pela empresa/cooperativa.
Número de aves vivas | Este campo indica a contagem de aves no aviário.
Ração armazenada (por quilo) | Quantidade de ração ainda armazenada no silo do aviário, medida em quilos.
Consumo de ração diária (em quilos) | Consumo diário de ração pelas aves no aviário, medido em quilos.
Tempo de inserção de ácido (em horas) | Tempo em horas necessário para a aplicação de ácido. O valor padrão é de 48 horas.
Tempo de desligamento de silo (em horas) | Tempo em horas para o desligamento do silo de ração antes do jejum das aves antes do carregamento. O valor padrão é de 12 horas.
Tempo para levantamento de linhas de ração (em horas) | Tempo em horas para levantamento das linhas de ração. O valor padrão é de 6 horas.

### Parâmetros de saída

Campo | Descrição
----|----
Identificação de aviário | Este campo apenas apresenta a identificação no aviário para facilitar a leitura, usando as informações do campo: `Identificação de aviário`.
Consumo por hora (em quilos) | Este campo mostra a média de consumo (em quilos) por hora do aviário, usando as informações do campo: `Consumo de ração diária`.
Consumo por AVE (em gramas) | Este campo mostra a média de consumo (em gramas) por ave, usando as informações dos campos: `Número de aves vivas` e `Consumo de ração diária`.
Tempo de diferença | Este campo apresenta o tempo (em dia/hora) do horário atual até o de desligamento de silo, usando as informações dos campos: `Horário atual` e `Horário de apanha`.
Ração total  necessária (em quilos) | Este campo representa a quantidade total de ração necessária (em quilos) até o término do lote, usando as informações dos campos: `Horário atual`, `Horário de apanha` e `Consumo de ração diária`.
Ração de pedido (em quilos) | Este campo mostra a quantidade necessária do pedido de ração (em quilos) até o término do lote, usando as informações dos campos: `Horário atual`, `Horário de apanha`, `Consumo de ração diária` e `Ração armazenada`.

### Tarefas

O bloco de 'Tarefas' ordena com as informações enviadas de modo cronológico as tarefas de: 
- **Inserir ácido**: Na criação de aves, o uso de ácidos orgânicos está aumentando porque alguns países que compram produtos de aves estão colocando mais regras sobre o uso de medicamentos contra bactérias. Esses ácidos são feitos naturalmente por plantas, animais e pequenos organismos e têm papéis importantes nas suas digestões e metabolismo.
- **Desligar silo de ração**: Essa tarefa deve ser realizada para evitar o excesso de ração nos pratos antes da captura dos frangos, o que pode levar ao desperdício de alimento e afetar a eficiência da produção avícola.
- **Erguer linhas de ração**: Para limpar os intestinos das aves antes da captura, é importante erguer os pratos de ração para evitar que elas se alimentem horas antes do processo. Isso ajuda a garantir uma melhor limpeza intestinal durante o manejo.

### Feedback
Você teve algum problema ao executar? Alguma ideia de funcionalidade nova? [Escreva aqui ➜](https://forms.gle/Z7XZFXTctJ6mgRF46)

<hr>
Frangooo © 2024 de Gabriel Ângelo Cerutti está licenciado sob CC BY-NC-ND 4.0. Para visualizar uma cópia desta licença, visite http://creativecommons.org/licenses/by-nc-nd/4.0/ 