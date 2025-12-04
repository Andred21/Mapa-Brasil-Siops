# 📊 Mapa Brasil SIOPS  
Sistema interativo para visualização e análise dos dados públicos de saúde no Brasil

![Laravel](https://img.shields.io/badge/Laravel-10.x-red?style=flat&logo=laravel)
![React](https://img.shields.io/badge/React-18.x-61dafb?style=flat&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?style=flat&logo=tailwindcss)
![MySQL](https://img.shields.io/badge/MySQL-8.x-005C84?style=flat&logo=mysql)
![Leaflet](https://img.shields.io/badge/Leaflet-Map-199900?style=flat&logo=leaflet)

---

## 🧭 Sobre o Projeto

O **Mapa Brasil SIOPS** é um sistema web interativo criado para **visualizar, explorar e analisar dados públicos de saúde** a partir da API oficial do **SIOPS – Sistema de Informações sobre Orçamentos Públicos em Saúde**.

Este projeto apresenta:

- Mapa interativo do Brasil com seleção de estados e municípios  
- Painéis laterais com indicadores financeiros, populacionais e históricos  
- Gráficos dinâmicos e comparativos  
- Análise de séries históricas  
- Indicadores calculados em tempo real  
- Dashboard completo para cada ente federativo  

O objetivo é **tornar os dados públicos mais acessíveis, compreensíveis e úteis**, tanto para pesquisadores, jornalistas, gestores como para o cidadão comum.

---

## 📑 Contexto Acadêmico (TCC)

Este sistema foi desenvolvido como parte do **Trabalho de Conclusão de Curso (TCC)** em Ciência da Computação.  
Tema: **"Sistema Web Interativo para Visualização e Análise de Indicadores de Saúde com Integração ao SIOPS"**

Objetivos principais:

- Facilitar a compreensão dos dados públicos  
- Criar um mapa interativo funcional  
- Desenvolver dashboards completos com séries históricas  
- Unificar dados populacionais, financeiros e orçamentários  
- Democratizar o acesso à informação

---

## 🚀 Tecnologias Utilizadas

### **Backend (Laravel)**
- Laravel 10  
- Services e Repositories  
- Jobs e Requests  
- Integração com a API SIOPS  
- Controllers e validações  
- APIs internas para o frontend

### **Frontend (React + Inertia.js)**
- React 18  
- Hooks personalizados  
- PrimeReact (UI components)  
- TailwindCSS (estilização)  
- Gráficos com Chart.js e PrimeReact  
- Mapa interativo com Leaflet  

### **Banco de Dados**
- MySQL 

### **Outros**
- Axios  
- Vite  
- Node.js  
- PHP 8+  

---

## 🖥️ Screenshots 

### 📌 Tela inicial com mapa interativo  
<img width="1918" height="920" alt="Página Inicial Sistema" src="https://github.com/user-attachments/assets/d0da72b0-3ced-4b75-9f1a-3455accdc82f" />

### 📌 Painel lateral de indicadores  

<img width="574" height="840" alt="Menu Lateral com os dados do munici ou uf selecionado" src="https://github.com/user-attachments/assets/1587f55e-420e-4035-87bf-886a12e07910" />

### 📌 Dashboard de receitas e despesas  

<img width="1632" height="767" alt="Painel Receitas Inicio" src="https://github.com/user-attachments/assets/1a6bdc5e-bac0-40b5-bbd9-0aa90c4e1fab" />

<img width="1634" height="781" alt="Painel Saúde Inicial" src="https://github.com/user-attachments/assets/e0ee8ff1-5600-4101-a218-1de0eaa4efe0" />

---

## 📂 Estrutura do Projeto

```txt
├── app
│   ├── Http
│   │   ├── Controllers
│   ├── Services
│   │   ├── SiopsService.php      # Integração completa com a API SIOPS
│   ├── Models
│
├── database
│   ├── migrations
│
├── resources
│   ├── js
│   │   ├── Pages
│   │   ├── Components
│   │   ├── hooks
│   │   ├── mapas (Leaflet)
│
├── public
│   ├── screenshots
│
├── routes
│   ├── web.php
│
├── package.json
├── composer.json
└── README.md

---

## ⚙️ **Instalação Completa**

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/Andred21/Mapa-Brasil-Siops.git
cd Mapa-Brasil-Siops

### 2️⃣ Configurar o Backend (Laravel)
composer install

**Criar arquivo .env**: cp .env.example .env

**Gerar key da aplicação**: php artisan key:generate

**Configurar banco de dados no .env** 

**rodar migrations**:php artisan migrate 
**Iniciar servidor Laravel**: php artisan serve

**O backend ficará acessível em**:http://localhost:8000

### 3️⃣ Configurar o Frontend (React + Inertia)

**Instalar dependências**:npm install
**Rodar em modo de desenvolvimento**:npm run dev

### ▶️ Como Usar a Aplicação

**Acesse o navegador em**: http://localhost:8000

---

## 🔧 Scripts Úteis (Frontend + Backend)

**Limpar caches**: php artisan optimize:clear


**Atualizar autoload**: composer dump-autoload


**Rodar servidor**: php artisan serve

---

## 👥 Autores

Enrico Beltrame Lara
João Victor de Batalha Andreoli
Marcos Vinicius Jeronimo dos Santos

---


