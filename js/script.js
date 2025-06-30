document.addEventListener('DOMContentLoaded', () => {
    // Instancia os modais do Bootstrap APENAS SE EXISTIREM NO DOM
    let authModalInstance;
    const authModalElement = document.getElementById('authModal');
    if (authModalElement) {
        authModalInstance = new bootstrap.Modal(authModalElement);
    }

    let loginModalInstance;
    const loginModalElement = document.getElementById('loginModal');
    if (loginModalElement) {
        loginModalInstance = new bootstrap.Modal(loginModalElement);
    }

    // NOVO: Instância do Modal de Cadastro
    let cadastroModalInstance;
    const cadastroModalElement = document.getElementById('cadastroModal');
    if (cadastroModalElement) {
        cadastroModalInstance = new bootstrap.Modal(cadastroModalElement);
    }

    // Adiciona evento de clique para botões/links que abrem modais
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o comportamento padrão do link
            const targetModalId = btn.getAttribute('data-bs-target');
            if (targetModalId === '#authModal' && authModalInstance) {
                authModalInstance.show();
            } else if (targetModalId === '#loginModal' && loginModalInstance) {
                loginModalInstance.show();
            } else if (targetModalId === '#cadastroModal' && cadastroModalInstance) { // NOVO
                cadastroModalInstance.show();
            }
        });
    });

    // Lógica para alternar entre modais de login e escolha/cadastro
    const linkLoginModal = document.getElementById('link-login-modal'); // Link "Faça Login" no modal #authModal
    if (linkLoginModal && authModalInstance && loginModalInstance) {
        linkLoginModal.addEventListener('click', (e) => {
            e.preventDefault();
            authModalInstance.hide(); // Fecha o modal atual (escolha)
            loginModalInstance.show(); // Abre o modal de login
        });
    }

    const linkCadastroModal = document.getElementById('link-cadastro-modal'); // Link "Cadastre-se aqui" no modal #loginModal
    if (linkCadastroModal && loginModalInstance && cadastroModalInstance) {
        linkCadastroModal.addEventListener('click', (e) => {
            e.preventDefault();
            loginModalInstance.hide(); // Fecha o modal atual (login)
            cadastroModalInstance.show(); // Abre o novo modal de cadastro
        });
    }

    // NOVO: Lógica para o link "Faça Login aqui" no modal de cadastro
    const linkLoginFromCadastroModal = document.getElementById('link-login-from-cadastro-modal');
    if (linkLoginFromCadastroModal && cadastroModalInstance && loginModalInstance) {
        linkLoginFromCadastroModal.addEventListener('click', (e) => {
            e.preventDefault();
            cadastroModalInstance.hide(); // Fecha o modal de cadastro
            loginModalInstance.show(); // Abre o modal de login
        });
    }

    // Simular navegação para as páginas de perfil/dashboard a partir do modal de escolha
    const btnModalProfissional = document.getElementById('btn-modal-profissional');
    if (btnModalProfissional) {
        btnModalProfissional.addEventListener('click', () => {
            if (authModalInstance) authModalInstance.hide();
            window.location.href = 'profissional.html'; // Redirecionamento para a página do profissional
            // alert('Simulação: Redirecionando para o Painel do Profissional. (Página em construção)');
        });
    }

    const btnModalRecrutador = document.getElementById('btn-modal-recrutador');
    if (btnModalRecrutador) {
        btnModalRecrutador.addEventListener('click', () => {
            if (authModalInstance) authModalInstance.hide();
            window.location.href = 'recrutador.html';
            // alert('Simulação: Redirecionando para o Painel do Recrutador. (Página em construção)');
        });
    }

    // NOVO: Lógica para os botões de tipo de usuário dentro do modal de cadastro
    // Idealmente, esta escolha influenciaria o tipo de conta a ser criada
    let userType = ''; // Variável para armazenar o tipo de usuário selecionado

    const btnCadastroProfissional = document.getElementById('btn-cadastro-profissional');
    if (btnCadastroProfissional) {
        btnCadastroProfissional.addEventListener('click', () => {
            userType = 'profissional';
            btnCadastroProfissional.classList.add('active'); // Adiciona classe 'active' para estilização visual
            if (btnCadastroRecrutador) btnCadastroRecrutador.classList.remove('active'); // Garante que o outro botão não esteja ativo
            alert('Você escolheu ser um Profissional!');
        });
    }

    const btnCadastroRecrutador = document.getElementById('btn-cadastro-recrutador');
    if (btnCadastroRecrutador) {
        btnCadastroRecrutador.addEventListener('click', () => {
            userType = 'recrutador';
            btnCadastroRecrutador.classList.add('active'); // Adiciona classe 'active' para estilização visual
            if (btnCadastroProfissional) btnCadastroProfissional.classList.remove('active'); // Garante que o outro botão não esteja ativo
            alert('Você escolheu ser um Recrutador!');
        });
    }

    // Simulação de Login com credenciais de teste
    const loginForm = document.querySelector('#loginModal form');
    if (loginForm && loginModalInstance) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio real do formulário
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Credenciais simuladas para demonstração
            if (email === 'profissional@empregaaki.ao' && password === 'senha123') {
                loginModalInstance.hide();
                alert('Login de Profissional bem-sucedido! Bem-vindo(a) de volta, Profissional!');
                window.location.href = 'profissional.html'; // Redirecionar para a página do profissional
            } else if (email === 'recrutador@empregaaki.ao' && password === 'senha123') {
                loginModalInstance.hide();
                alert('Login de Recrutador bem-sucedido! Bem-vindo(a) de volta, Recrutador!');
                window.location.href = 'recrutador.html'; // Redirecionar para o painel do recrutador
            } else {
                alert('Credenciais inválidas. Por favor, use: profissional@empregaaki.ao / senha123 OU recrutador@empregaaki.ao / senha123');
            }
        });
    }

    // Simulação de Cadastro
    const cadastroForm = document.querySelector('#cadastroModal form');
    if (cadastroForm && cadastroModalInstance) {
        cadastroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('cadastroFullName').value;
            const email = document.getElementById('cadastroEmail').value;
            const password = document.getElementById('cadastroPassword').value;
            const confirmPassword = document.getElementById('cadastroConfirmPassword').value;

            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }

            if (!userType) { // Verifica se um tipo de usuário foi selecionado
                alert('Por favor, selecione se você é um Profissional ou um Recrutador.');
                return;
            }

            // Você pode adicionar validações mais robustas aqui (ex: formato de email, complexidade da senha)

            alert(`Cadastro de ${fullName} (${email}) como ${userType} realizado com sucesso! Você será redirecionado para o login.`);
            cadastroModalInstance.hide();
            loginModalInstance.show(); // Após cadastro, direciona para o login
        });
    }

    // --- Lógicas específicas para Profissional.html e Recrutador.html ---
    // (Estas partes do código são para serem usadas nas suas páginas de painel,
    // caso existam e usem a mesma estrutura de sidebar e paginação de vagas).

    // Gerenciamento de Seções/Abas da Sidebar
    const sidebarLinks = document.querySelectorAll('.nav-link-custom-sidebar');
    const mainContentSections = document.querySelectorAll('.main-content-section');
    const mainSectionTitleElement = document.querySelector('main h1.h2'); // Título principal da seção

    function showSection(sectionId) {
        if (!mainContentSections.length) return; // Garante que há seções para manipular

        mainContentSections.forEach(section => {
            section.style.display = 'none'; // Oculta todas as seções
        });

        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.style.display = 'block'; // Mostra a seção ativa

            let newTitle = '';
            // Define o título da seção com base no ID
            if (sectionId === 'buscar-vagas-section') {
                newTitle = 'Vagas Recentes';
            } else if (sectionId === 'vagas-salvas-section') {
                newTitle = 'Minhas Vagas Salvas';
            } else if (sectionId === 'candidaturas-section') {
                newTitle = 'Minhas Candidaturas';
            } else if (sectionId === 'tendencias-section') {
                newTitle = 'Tendências de Mercado';
            } else if (sectionId === 'configuracoes-section') {
                newTitle = 'Configurações da Conta';
            }
            // Adicione mais casos para as seções do recrutador.html se aplicável
            else if (sectionId === 'overview') {
                newTitle = 'Visão Geral do Recrutador';
            } else if (sectionId === 'my-jobs') {
                newTitle = 'Minhas Vagas Publicadas';
            } else if (sectionId === 'post-job') {
                newTitle = 'Publicar Nova Vaga';
            } else if (sectionId === 'candidates') {
                newTitle = 'Candidaturas Recebidas';
            } else if (sectionId === 'reports') {
                newTitle = 'Relatórios e Estatísticas';
            }


            if (mainSectionTitleElement) {
                mainSectionTitleElement.textContent = newTitle; // Atualiza o título
            }
        }
    }

    // Adiciona event listeners para os links da sidebar
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove a classe 'active' de todos os links e adiciona ao clicado
            sidebarLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            const targetSectionId = link.getAttribute('data-target-section');
            if (targetSectionId) {
                showSection(targetSectionId); // Mostra a seção correspondente

                // Se voltar para a seção de vagas, reinicia a busca e paginação (para profissional.html)
                if (targetSectionId === 'buscar-vagas-section') {
                    const jobSearchInput = document.getElementById('jobSearchInput');
                    if (jobSearchInput) {
                        jobSearchInput.value = ''; // Limpa o campo de busca
                    }
                    if (typeof filterJobs === 'function') { // Verifica se a função existe no escopo
                        filterJobs(); // Reinicia os filtros para mostrar todos os cards
                    }
                    currentPage = 1; // Volta para a primeira página
                    if (typeof renderPagination === 'function') {
                        renderPagination(); // Regenera a paginação com base nos cards visíveis
                    }
                    if (typeof displayPage === 'function') {
                        displayPage(currentPage); // Exibe a primeira página
                    }
                }
            }
        });
    });

    // Inicializa a seção correta ao carregar a página
    // É importante que o `body` das suas páginas (profissional.html, recrutador.html)
    // tenha uma classe como `profissional-page-body` ou `recrutador-page-body`
    // para que esta lógica funcione corretamente.
    if (document.body.classList.contains('profissional-page-body')) {
        // Ativa o primeiro link da sidebar e mostra a seção inicial para profissionais
        const initialLink = document.querySelector('.nav-link-custom-sidebar[data-target-section="buscar-vagas-section"]');
        if (initialLink) {
            initialLink.classList.add('active');
            showSection('buscar-vagas-section');
        }
    } else if (document.body.classList.contains('recrutador-page-body')) {
        // Ativa o primeiro link da sidebar e mostra a seção inicial para recrutadores
        const initialLink = document.querySelector('.nav-link-custom-sidebar[data-target-section="overview"]');
        if (initialLink) {
            initialLink.classList.add('active');
            showSection('overview');
        }
    }


    // 2. Paginação Funcional (Simulada)
    const jobCardsContainer = document.getElementById('job-cards-container');
    // Pega todos os cards de vaga dentro do container.
    let allJobCards = jobCardsContainer ? Array.from(jobCardsContainer.getElementsByClassName('job-card')) : [];
    const paginationList = document.getElementById('pagination-list');

    const cardsPerPage = 6; // Quantidade de cards por página
    let currentPage = 1;
    let currentlyFilteredCards = []; // Armazena os cards que passaram pelo filtro de busca

    function displayPage(page) {
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;

        // Itera sobre os cards atualmente filtrados (ou todos, se não houver filtro)
        currentlyFilteredCards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'block'; // Mostra o card
            } else {
                card.style.display = 'none'; // Oculta o card
            }
        });
    }

    function renderPagination() {
        if (!paginationList) return;

        paginationList.innerHTML = ''; // Limpa a paginação existente
        const totalPages = Math.ceil(currentlyFilteredCards.length / cardsPerPage);

        // Se não há cards ou apenas uma página, não mostra a paginação
        if (totalPages <= 1) {
            paginationList.style.display = 'none';
            return;
        } else {
            paginationList.style.display = 'flex'; // Garante que a paginação é visível
        }

        // Botão "Anterior"
        const prevItem = document.createElement('li');
        prevItem.classList.add('page-item');
        if (currentPage === 1) prevItem.classList.add('disabled');
        prevItem.innerHTML = `<a class="page-link page-link-custom" href="#" tabindex="-1" aria-disabled="${currentPage === 1 ? 'true' : 'false'}">Anterior</a>`;
        prevItem.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                displayPage(currentPage);
                renderPagination();
            }
        });
        paginationList.appendChild(prevItem);

        // Números das páginas
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            if (i === currentPage) pageItem.classList.add('active');
            pageItem.innerHTML = `<a class="page-link page-link-custom" href="#">${i}</a>`;
            pageItem.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                displayPage(currentPage);
                renderPagination();
            });
            paginationList.appendChild(pageItem);
        }

        // Botão "Próxima"
        const nextItem = document.createElement('li');
        nextItem.classList.add('page-item');
        if (currentPage === totalPages) nextItem.classList.add('disabled');
        nextItem.innerHTML = `<a class="page-link page-link-custom" href="#">Próxima</a>`;
        nextItem.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                displayPage(currentPage);
                renderPagination();
            }
        });
        paginationList.appendChild(nextItem);
    }

    // 3. Simulação de Busca/Filtro
    const jobSearchInput = document.getElementById('jobSearchInput');
    const searchButton = document.getElementById('searchButton');

    function filterJobs() {
        // Verifica se jobSearchInput existe para evitar erros
        const searchTerm = jobSearchInput ? jobSearchInput.value.toLowerCase().trim() : '';
        currentlyFilteredCards = []; // Reseta a lista de cards filtrados

        // Itera sobre *todos* os cards originais para filtrar
        allJobCards.forEach(card => {
            const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const company = card.querySelector('.card-subtitle')?.textContent.toLowerCase() || '';
            const location = card.querySelector('.card-text.text-light-slate-muted')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.card-text.text-dark-slate-small')?.textContent.toLowerCase() || '';

            // Verifica se o termo de busca está presente em qualquer parte do card
            if (title.includes(searchTerm) || company.includes(searchTerm) || location.includes(searchTerm) || description.includes(searchTerm)) {
                currentlyFilteredCards.push(card); // Adiciona o card aos filtrados
            }
            // Não escondemos ou mostramos os cards aqui. Isso é feito por displayPage().
        });

        // Atualiza a paginação e exibe a primeira página dos resultados filtrados
        currentPage = 1;
        renderPagination();
        displayPage(currentPage);
    }

    // Inicializa a lista de cards filtrados com todos os cards e renderiza a paginação inicial
    // IMPORTANTE: Só executa se o container de cards e o input de busca existirem
    if (jobCardsContainer && jobSearchInput) {
        currentlyFilteredCards = [...allJobCards];
        renderPagination(); // Renderiza a paginação inicial
        displayPage(currentPage); // Exibe a primeira página

        // Adiciona event listeners para a busca
        searchButton.addEventListener('click', filterJobs); // Chama a função de filtro ao clicar no botão

        jobSearchInput.addEventListener('keyup', (e) => { // Filtra ao digitar e também ao apertar "Enter"
            filterJobs(); // Chama a função de filtro
        });
    }


    // Opcional: Adicionar funcionalidade para o botão "Ver Detalhes" dos cards
    document.querySelectorAll('.btn-outline-light-custom-job').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const cardTitle = e.target.closest('.card-body').querySelector('.card-title').textContent;
            alert(`Simulação: Você clicou em "Ver Detalhes" para a vaga: "${cardTitle}".`);
            // Aqui você redirecionaria para uma página de detalhes da vaga ou abriria um modal.
        });
    });

});