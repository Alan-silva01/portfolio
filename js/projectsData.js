const projectsData = {
    'zapdin': {
        tag: 'PROJETO SAAS',
        title: 'ZAPDIN',
        subtitle: 'Seu assistente financeiro direto no WhatsApp',
        description: 'O Zapdin é um robô de IA que vive dentro do seu WhatsApp. Ele registra seus gastos por texto ou áudio, cria lembretes inteligentes e sincroniza tudo com uma dashboard exclusiva.',
        features: [
            'Registro de gastos por áudio ou texto',
            'Lembretes inteligentes de compromissos',
            'Dashboard analítica integrada com app mobile',
            'IA que entende contextos financeiros complexos'
        ],
        mockup: 'https://res.cloudinary.com/ddhlqymvf/video/upload/v1770582706/Design_3375x6000_3_v2uqol.mp4',
        type: 'video'
    },
    'rapidus': {
        tag: 'SISTEMA',
        title: 'RAPIDUS EXPRESS',
        subtitle: 'Sistema Inteligente de Delivery & Logística',
        description: 'Um ecossistema completo para delivery. Agente de WhatsApp que automatiza pedidos, consulta fretes por bairro automaticamente e gerencia toda a logística de entregadores.',
        features: [
            'Agente de IA para captação de pedidos',
            'Cálculo automático de fretes por bairro',
            'App para entregadores com notificações em tempo real',
            'Dashboard de gestão (Pagos, Em Rota, Finalizados)'
        ],
        mockup: 'https://res.cloudinary.com/ddhlqymvf/video/upload/v1770583027/Rapidus_1_tgfhyz.mp4',
        type: 'video'
    },
    'upzy': {
        tag: 'PROJETO SAAS',
        title: 'UPZY',
        subtitle: 'Gestão de Vendas & Metas Mobile',
        description: 'Plataforma completa para lojistas gerenciarem times de vendas. Permite o cadastro de vendedores com logins individuais, acompanhamento de metas da loja e de cada colaborador em tempo real, com barras de progresso dinâmicas e rankings de performance.',
        features: [
            'Logins individuais para vendedores',
            'Gestão de metas por loja e por vendedor',
            'Ranking de performance e melhores clientes',
            'Barras de progresso de vendas em tempo real'
        ],
        mockup: 'https://res.cloudinary.com/ddhlqymvf/video/upload/v1770642880/Rapidus_3375x6000_suqout.mp4',
        type: 'video'
    },
    'nero-crm': {
        tag: 'SISTEMA',
        title: 'NERO CRM',
        subtitle: 'CRM de Atendimento & Gestão de Leads',
        description: 'Um CRM completo com métricas de atendimento, agendamentos e gráficos de leads por coluna do Kanban. Possui etiquetas, disparo de mensagens e controle de velocidade de resposta, permitindo pausar ou ativar a IA de forma manual.',
        features: [
            'Kanban com métricas de leads por coluna',
            'Dashboard analítica com gráficos de atendimento',
            'Mensageria com disparo em massa e etiquetas',
            'Controle de IA (Pausar/Ativar) e velocidade de resposta'
        ],
        mockup: 'https://res.cloudinary.com/ddhlqymvf/video/upload/v1770583878/copy_A5739476-9606-43DB-AF1E-30E03A2C9865_wcuhkf.mov',
        type: 'video',
        displayType: 'desktop'
    },

    'clinic-ai': {
        tag: 'AGENTE IA E AUTOMACAO',
        title: 'ClinicAI',
        subtitle: 'Agente de Clínicas Humanizado',
        description: 'Agente de clínicas que atende de forma humanizada (entende texto, áudio e imagem). Envia áudios personalizados e humanos. Faz follow-up e upsell (ex: reativação de limpeza após 6 meses). Integrado com gateway de pagamentos Asaas e Google Calendar. Notifica humanos com um resumo detalhado quando a intervenção é necessária.',
        features: [
            'Atendimento Humanizado (Texto, Áudio, Imagem)',
            'Envio de Áudios Personalizados',
            'Follow-up & Upsell Automático (ex: Recall de 6 meses)',
            'Integração Asaas (Pagamentos) & Google Calendar',
            'Notificação para Humano com Resumo de Contexto'
        ],
        gallery: [
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770660534/Captura_de_Tela_2026-02-09_a%CC%80s_3.07.48_PM_luxhfs.png',
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770660533/Captura_de_Tela_2026-02-09_a%CC%80s_3.07.57_PM_urxq5d.png',
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770660534/Captura_de_Tela_2026-02-09_a%CC%80s_3.08.05_PM_ezmvpx.png',
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770660534/Captura_de_Tela_2026-02-09_a%CC%80s_3.08.22_PM_y2csyo.png',
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770660534/Captura_de_Tela_2026-02-09_a%CC%80s_3.08.29_PM_rhzwxp.png'
        ],
        type: 'image',
        displayType: 'desktop'
    },
    'rastrei-ai': {
        tag: 'AGENTE IA E AUTOMACAO',
        title: 'RastreiAI',
        subtitle: 'Automação para Rastreamento Veicular',
        description: 'Agente especializado em captação de dados, quebra de objeções, agendamento de instalação e manutenção. Gera pagamentos de mensalidades via Asaas, faz follow-up inteligente e integra-se ao Google Calendar. Notifica humanos com um resumo detalhado quando a intervenção é necessária.',
        features: [
            'Captação de Dados & Quebra de Objeções',
            'Agendamento de Instalação/Manutenção (Google Calendar)',
            'Gestão de Mensalidades & Cobrança (Asaas)',
            'Follow-up Inteligente (Leads Incompletos)',
            'Transbordo para Humano com Resumo Contextual'
        ],
        gallery: [
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770722041/Captura_de_Tela_2026-02-10_a%CC%80s_8.12.55_AM_xrv6j9.png',
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770722041/Captura_de_Tela_2026-02-10_a%CC%80s_8.13.13_AM_o1ql8v.png',
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770722041/Captura_de_Tela_2026-02-10_a%CC%80s_8.13.29_AM_bpvhfb.png',
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770722041/Captura_de_Tela_2026-02-10_a%CC%80s_8.13.05_AM_zml5ap.png',
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770722041/Captura_de_Tela_2026-02-10_a%CC%80s_8.13.22_AM_u79g0p.png'
        ],
        type: 'image',
        displayType: 'desktop'
    },
    'convert-ai': {
        tag: 'AGENTE IA E AUTOMACAO',
        title: 'ConvertAI',
        subtitle: 'Agente SDR de Alta Performance',
        description: 'Agente especializado em qualificação de leads, captação de dados e quebra de objeções. Atendimento 100% humanizado com suporte a áudio, imagem e texto. Realiza follow-up inteligente e transbordo para humanos quando detecta oportunidade real.',
        features: [
            'Qualificação de Leads & Captação',
            'Quebra de Objeções em Tempo Real',
            'Atendimento Humanizado (Áudio, Texto e Imagem)',
            'Follow-up Inteligente e Persistente',
            'Intervenção Humana sob demanda'
        ],
        gallery: [
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770723193/Captura_de_Tela_2026-02-10_a%CC%80s_8.32.49_AM_ntelp5.png',
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770723149/Captura_de_Tela_2026-02-10_a%CC%80s_8.30.37_AM_zhpprt.png',
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770723149/Captura_de_Tela_2026-02-10_a%CC%80s_8.30.31_AM_hb9zor.png',
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770723149/Captura_de_Tela_2026-02-10_a%CC%80s_8.30.43_AM_y7i9su.png'
        ],
        type: 'image',
        displayType: 'desktop'
    },
    'imob-ai': {
        tag: 'AGENTE IA E AUTOMACAO',
        title: 'ImobAi',
        subtitle: 'Inteligência para Imobiliárias',
        description: 'Agente especializado em qualificação de leads imobiliários. Identifica o perfil de busca, consulta o banco de dados em tempo real e envia opções com fotos. Possui sistema de alerta: se um imóvel compatível entrar no banco depois, o agente reativa o lead automaticamente. Realiza follow-up e agendamento com consultores.',
        features: [
            'Qualificação Profunda de Perfil',
            'Busca Automatizada em Banco de Dados',
            'Envio de Fotos & Ficha Técnica via WhatsApp',
            'Alertas de Novos Imóveis (Reativação de Leads)',
            'Agendamento com Consultores Responsáveis'
        ],
        gallery: [
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770723616/Captura_de_Tela_2026-02-10_a%CC%80s_8.38.16_AM_gfizuq.png',
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770723616/Captura_de_Tela_2026-02-10_a%CC%80s_8.36.49_AM_vawl9q.png',
            'https://res.cloudinary.com/ddhlqymvf/image/upload/v1770723616/Captura_de_Tela_2026-02-10_a%CC%80s_8.39.43_AM_gyhvda.png'
        ],
        type: 'image',
        displayType: 'desktop'
    }
};

export default projectsData;
