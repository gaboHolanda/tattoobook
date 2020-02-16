# Tattobook

É um plataforma web para tatuadores, onde eles podem utilizar a ferramenta para se promoverem e gerenciar suas atividades. Já os clientes podem utilizar para achar tatuadores de seu gosto de forma mais rápida e fácil.


## Início

Estas instruções permitem que você obtenha uma cópia do projeto e configure em seu computador para desenvolvimento e testes.

### Pré-Requisitos

Para baixar, compilar e executar em seu computador, você deve ter:

- Sistema de controle de versões `git` ([https://www.git-scm.com/])
- Linguagem de programação Python  ([https://www.python.org])
- Gerenciador de pacotes Python `pip` ([https://pypi.org/project/pip/])
- Projeto Django ([https://www.djangoproject.com/download/])

### Instalação

##### Ubuntu Linux

**Importante**: É aconselhável fazer um _update_ do `apt-get`:
```sh
sudo apt-get update
```

- git

```sh
sudo apt-get install git
```

- Python 
```sh
python --version
sudo apt-get install python3
```
- pip
```sh
sudo apt-get install python3-pip
pip3 --version
```
- Django (Necessário: `git`, `python`, `pip`)

```sh
pip install virtualenv
cd ~/Documents/
mkdir django
cd django
virtualenv
source vnenv/bin/activate
pip install django
django-admin --version
django-admin startproject mysite
```

### Clonar o repositório

Para realizar um clone do projeto, execute:

```sh
git clone https://gitlab.devops.ifrn.edu.br/tads.cnat/pdsweb/2019.2/tattobook.git
cd tattobook
pip3 install -r requirements.txt
```
depois copiar o arquivo `settings-example.py` e renomear pra `settings.py`
Feito isso é necessário fazer o migrate

```sh
python3 manage.py migrate
```

E também 
```sh
python3 manage.py loaddata fixtures.json
```
O clone do git cria um diretório chamado `tattobook` se não for informado um
nome de diretório.

### Executar em modo desenvolvimento

Para executar em modo de desenvolvimento,
no diretório do projeto, digite:

```sh
python3 manage.py runserver
```

## Documentação

Verifique o diretório [`doc`](./doc/) para a documentação do sistema

## Contribuindo

Veja o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para maiores detalhes.

## Equipe de desenvolvimento

* **Gabriel Holanda** - *g.holanda@academico.ifrn.edu.br*
* **Herikle Mesquita** - *herikle.mesquita@gmail.com*
* **Paulo Alexandre** - *paulocostarn@hotmail.com*
* **Rafaela Medeiros** - *rafaela.micaela.77@gmail.com*
* **Rafael Lopes** - *rafael12__@outlook.com*

## Licença

Este projeto é licenciado pela GNU [GPL 3](LICENSE.md).


