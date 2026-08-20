<div align="center">
  # ALAN SILVA - PORTFÓLIO OFICIAL
  
  **Plataforma Web de Apresentação de Soluções Empresariais, Automação de Processos e Inteligência Artificial**

  [![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/)
  [![Three.js](https://img.shields.io/badge/Three.js-3D%20Graphics-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
  [![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/)
  [![CSS3](https://img.shields.io/badge/CSS3-Custom%20Properties-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/)
  [![Vercel](https://img.shields.io/badge/Vercel-Production-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://www.alansilva.site)
  [![Live Website](https://img.shields.io/badge/Live%20Website-alansilva.site-00C7B7?style=for-the-badge&logo=googlechrome&logoColor=white)](https://www.alansilva.site)

</div>

---

## Visão Geral do Projeto

O **Portfólio Oficial de Alan Silva** (disponível em [alansilva.site](https://www.alansilva.site)) é uma plataforma web de alta performance construída para apresentar soluções tecnológicas empresariais, automações de fluxos operacionais e ecossistemas de software proprietários.

Desenvolvido em **Vanilla JavaScript** e **Three.js**, o site combina recursos visuais imersivos em 3D, carregamento assíncrono de modelos gráficos, layout responsivo avançado e alta velocidade de renderização sem a sobrecarga de frameworks pesados.

---

## Demonstração da Interface (Screenshots)

<div align="center">

| Seção Hero e Experiência 3D | Apresentação de Serviços e Proposta |
|:---:|:---:|
| <img src="https://res.cloudinary.com/ddhlqymvf/image/upload/v1787241664/Captura_de_Tela_2026-08-20_a%CC%80s_12.59.34_PM_gaogke.png" width="450" alt="Hero 3D" /> | <img src="https://res.cloudinary.com/ddhlqymvf/image/upload/v1787241665/Captura_de_Tela_2026-08-20_a%CC%80s_12.59.44_PM_x3bvxo.png" width="450" alt="Serviços" /> |

| Vitrine de Projetos e Casos de Uso | Formulário de Contato e Chamada para Ação |
|:---:|:---:|
| <img src="https://res.cloudinary.com/ddhlqymvf/image/upload/v1787241660/Captura_de_Tela_2026-08-20_a%CC%80s_12.59.57_PM_wibhbi.png" width="450" alt="Projetos" /> | <img src="https://res.cloudinary.com/ddhlqymvf/image/upload/v1787241724/Captura_de_Tela_2026-08-20_a%CC%80s_1.00.14_PM_pcrvtz.png" width="450" alt="Contato" /> |

</div>

---

## Qualificações e Formação

- **Investigação Forense e Perícia Criminal**: Graduação focada em análise lógica, investigação de dados e solução de problemas complexos.
- **Automação Industrial**: Formação técnica em controle de processos, eficiência operacional e sistemas integrados.
- **Parceiro Certificado BotConversar**: Especialização em fluxos conversacionais e automação de atendimento via WhatsApp.
- **Comunidade Sem Codar (Renato Asse)**: Capacitação avançada em desenvolvimento rápido de sistemas web e SaaS.
- **Comunidade Dinastia (Guilherme Reis)**: Formação em engenharia de soluções e negócios de tecnologia.

---

## Ecossistema de Soluções Apresentadas

A plataforma serve como hub central para apresentação de ecossistemas desenvolvidos em produção:

1. **NERO CRM**: Plataforma Enterprise de gestão de leads, pipeline de vendas e atendimento omnichannel com agentes de IA.
2. **Espetinho Vitória**: Ecossistema de gestão de restaurantes, cardápio digital PWA, Kanban de cozinha em tempo real e impressão térmica.
3. **Intelflux Concursos**: Plataforma EdTech de simulados inteligentes e correção de redação com inteligência artificial.
4. **ZAPDIN e UPZY**: Soluções de automação e gestão financeira de produtos digitais.

---

## Arquitetura e Decisões de Engenharia

- **Zero-Dependency Core**: Construção baseada em HTML5 semântico e CSS3 modular para minimizar o peso do bundle e garantir taxas elevadas no Google Lighthouse.
- **Renderização 3D com Three.js**: Inclusão de modelos tridimensionais com suporte a fallback de renderização e carregadores assíncronos em múltiplos caminhos de produção na Vercel.
- **Arquitetura de Animações**: Transições suaves baseadas em Intersection Observer API para alta taxa de quadros (60 FPS) em dispositivos móveis e desktop.
- **SEO e Acessibilidade**: Estruturação completa de meta tags OpenGraph, dados estruturados JSON-LD e contraste ajustado para leitura.

---

## Tecnologias e Stack

### Frontend
- **JavaScript (ES6+)**: Programação orientada a objetos e módulos JS nativos.
- **Three.js**: Engine de renderização de gráficos 3D no navegador via WebGL.
- **HTML5**: Estrutura semântica otimizada para buscadores.
- **CSS3**: Design System baseado em variáveis CSS, Flexbox e CSS Grid.

### Infraestrutura e Deploy
- **Vercel**: Hospedagem global em rede Edge CDN com suporte a HTTPS e compactação Brotli.
- **Domínio Personalizado**: Resolução DNS direta em `alansilva.site`.

---

## Estrutura do Projeto

```text
portfolio/
├── assets/             # Modelos 3D (.gltf / .glb), imagens e texturas
├── css/                # Folhas de estilo modulares (main.css, responsive.css, animations.css)
├── js/                 # Lógica de scripts (main.js, three-scene.js, animations.js)
├── index.html          # Ponto de entrada HTML semântico
├── vercel.json         # Configurações de rotas e headers de cache da Vercel
└── package.json        # Manifesto do projeto e dependências estáticas
```

---

## Instalação e Execução Local

### Pré-requisitos
- Servidor web estático (ex: **Live Server**, **Vite**, **Python http.server** ou **Node.js**)

### Passos para Execução

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/Alan-silva01/portfolio.git
   cd portfolio
   ```

2. **Executar Servidor Local:**
   Usando Python:
   ```bash
   python3 -m http.server 8000
   ```
   Ou usando `npx serve`:
   ```bash
   npx serve .
   ```

3. **Acessar no Navegador:**
   Abra `http://localhost:8000` no navegador.

---

<div align="center">
  <p>Desenvolvido por <strong>Alan Silva</strong> | Soluções em Automação e Software Empresarial</p>
</div>
