# Documento de visão
# TattoBook
## 1. Introdução
### 1.1 Resumo

O TattoBook é um sistema que facilita a interação entre clientes e tatuadores, para assim diminuir a baixa visibilidade de novos profissionais do ramo da tatuagem. Nosso produto melhora a procura por serviços de tatuadores e permite uma melhor divulgação de profissionais.

### 1.2 Escopo

O TattoBook é uma plataforma de divulgação e busca, ele irá cuidar da divulgação de trabalhos de profissionais, terá uma ferramenta de busca de tatuadores e terá a capacidade de criar o contato entre tatuador e cliente por meio de envios de mensagem pelo sistema.

O sistema não irá realizar transações bancárias e não irá conter a venda de produtos e acessórios de tatuagem. O sistema também não será responsável por juntar o cliente e o tatuador fisicamente, eles irão se comunicar e decidir um ponto de encontro entre si. O sistema não fornece a garantia do produto final.

## 2. Requisitos

### 2.1 Requisitos Funcionais

### 2.1 Requisitos Funcionais

| Cod. | Nome | Descrição | Categoria |
| -------- | -------- | -------- | -------- |
| F01 | Gerenciar Perfil |	O sistema permite o gerenciamento do perfil para mudanças de dados e exclusões de contas |	Evidente|
| F02 | CRUD publicações |	O sistema permite ao tatuador fazer CRUD de puiblicações |	Evidente|
| F03 | Busca |	O sistema permite a busca de tatuagens, tatuadores e eventos |	Evidente|
| F04 | Avaliação |	Os usuários (tanto cliente quanto tatuador) poderão avaliar um ao outro |	Evidente|
| F05 | CRUD mensagens |	O sistema permite o CRUD de mensagens. |	Evidente|
| F06 | Denuncia |	O sistema permite a denuncia de clientes e tatuadores. |	Evidente|



### 2.2 Requisitos não funcionais

| Cod. | Nome | Descrição | Categoria |
| -------- | -------- | -------- | -------- |
| NF01 | Personalização de Perfil |	O tatuador poderá personalizar seu perfil, mudando capas e outros layouts |	Desejável |
| NF02 | Mudar tipo de visualização da caixa de mensagem |	O usuário poderá mudar a ordem que suas mensagens são mostradas, mais recentes, lidas, não lidas, etc |	Desejável |

### 2.3 Tabela de Referência - Requisitos

| | NF01 | NF02 | NF03 |NF04 |
| -------- | -------- | -------- | -------- |-------- |
| F01 | X | X |-|-|
| F02 | X | X |-|-|
| F03 | X | X |-|-|
| F04 | X | X |-|-|
| F05 | X | X |-|-|
| F06 | X | X |-|-|
| F07 | X | X |-|-|
| F08 | X | X |-|-|
| F09 | X | X |-|-|
| F10 | X | X |-|-|
| F11 | X | X |-|-|
| F12 | X | X |-|-|


### 2.4 Diagrama Geral de Casos de Uso

![Diagrama de casos de uso](https://gitlab.devops.ifrn.edu.br/tads.cnat/pdsweb/2019.2/tattobook/raw/patch-6/doc/DiagramaCDU01.png)
### 2.5. Casos de Uso

| Cod. | Caso de Uso | Descrição | Classificação |
| -------- | -------- | -------- | -------- |
| UC01 | Gerenciar Perfil |	O usuário gerencia seu perfil, podendo atualizar dados ou excluir sua conta |	Primário |
| UC02 | Visualizar Tatuagens |	O tatuador verifica suas publicações, podendo alterar ou adicionar elas por lá. |	Primário |
| UC03 | Criar Tatuagem |	O tatuador entrará em seu perfil e poderá upar uma nova foto para o seu portfólio. |	Primário |
| UC04 | Buscar Tatuagem |	O ator irá clicar na barra de busca, irá especificar que quer buscar uma tatuagem, e irá digitar o qual deseja buscar. |	Primário |
| UC05 | Buscar Tatuador |	O ator irá clicar na barra de busca, irá especificar que quer buscar um tatuador, e irá digitar o qual deseja buscar. |	Primário |
| UC06 | Enviar Mensagem |	O cliente, no perfil de um tatuador, escolhe a opção de enviar mensagem. Após isso, irá escrever a mensagem que deseja enviar |	Primário |
| UC07 | Visualizar caixa de mensagem |	O usuário clicará em sua caixa de mensagem e visualizará todas as mensagens que foram enviadas a ele. |	Primário |
| UC08 | Adicionar Promoção |	O tatuador irá adicionar uma promoção nova, preenchendo dados com preços, enviando fotos do que deseja tatuar e especificando quantas pessoas poderão adquirir essa promoção. |	Secundário |
| UC09 | Excluir cadastro de usuário |	O usuário poderá solicitar a exclusão de sua conta. |	Secundário |
| UC10 | Fazer Cadastro |	O usuário criará sua conta no sistema, especificando se será um cliente normal ou um profissional. |	Primário |
| UC11 | Fazer Login |	O usuário se autentica no sistema. |	Primário |
| UC12 | Solicitar Impulsionamento |	O tatuador, em seu perfil, seleciona a opção de impulsionar suas publicações. |	Secundário |
| UC13 | Editar cadastro de usuário |	O usuário já cadastrado pode fazer alteração das sua informações |	Secundário |
| UC14 | Cancelar promoção |	O sistema permite a exclusão de uma promoção |	Secundário |
| UC15 | RUD Tatuagem |	O sistema permite que o tatuador possa excluir uma tatuagem |	Secundário |


### 2.6. Tabela de Referência - Casos de uso & Requisitos

|  | F01 | F02 | F03 | F04 | F05 | F06 | NF01 |NF02 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |-------- |-------- |
| UC01 | x | - | - | - | - | - | - | - |
| UC02 | - | X | - | - | - | - | - | - |
| UC03 | - | X | - | - | - | - | - | - |
| UC04 | - | - | x | - | - | - | - | - |
| UC05 | - | - | x | - | - | - | - | - |
| UC06 | - | - | - | - | x | - | - | - |
| UC07 | x | - | - | - | x | - | - | - |
| UC08 | - | - | - | x | - | - | - | - |
| UC09 | - | x | - | - | - | - | - | - |
| UC10 | - | - | - | - | - | - | - | - |
| UC11 | - | - | - | - | - | - | - | - |
| UC12 | x | x | - | - | - | - | - | - |
| UC13 | x | - | - | - | - | - | - | - |
| UC14 | x | - | - | - | - | - | - | - |
| UC15 | - | x | - | - | - | - | - | - |
| UC16 | x | x | - | - | - | - | - | - |
| UC17 | - | x | - | - | - | - | - | - |




### 2.7. Atores

| Ator | Descrição |
| -------- | -------- |
|Tatuador |O tatuador é o profissional que irá ter uma página dedicada |  
|Cliente |O cliente busca tatuadores e entra em contato com eles |  

## 3. Clientes

	Usuário Tatuador:
O tatuador utilizará o sistema para criar o seu perfil, colocar seu portfólio e sua média de preço e escolherá se pagará ou não por um impulsionamento em suas publicações, para alcançar maior visibilidade. Ele também poderá responder mensagens enviadas por clientes.

	Usuário "Cliente":
O cliente criará um perfil básico, poderá buscar por estilos de tatuagens ou tatuadores em região x e também poderá enviar uma mensagem para o tatuador que ele se interessar, para ver preços e marcar sessões. Após tudo certo ele poderá avaliar o tatuador.