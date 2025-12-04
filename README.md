# 📊 Mapa Brasil SIOPS  
Sistema interativo para visualização e análise dos dados públicos de saúde no Brasil

![Laravel](https://img.shields.io/badge/Laravel-10.x-red?style=flat&logo=laravel)
![React](https://img.shields.io/badge/React-18.x-61dafb?style=flat&logo=react)
![InertiaJS](https://img.shields.io/badge/Inertia.js-Framework-blueviolet)
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
- Inertia.js  
- Hooks personalizados  
- PrimeReact (UI components)  
- TailwindCSS (estilização)  
- Gráficos com Chart.js e PrimeReact  
- Mapa interativo com Leaflet  

### **Banco de Dados**
- MySQL / MariaDB  

### **Outros**
- Axios  
- Vite  
- Node.js  
- PHP 8+  

---

## 🖥️ Screenshots (adicione as imagens depois)

### 📌 Tela inicial com mapa interativo  
_(adicione aqui)_  
`/public/screenshots/mapa.png`

### 📌 Painel lateral de indicadores  
_(adicione aqui)_  
`/public/screenshots/painel-indicadores.png`

### 📌 Dashboard de receitas e despesas  
_(adicione aqui)_  
`/public/screenshots/dashboard.png`

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
