// Função chamada quando o formulário é enviado
function submitForm2() {
    const pokemonName = document.getElementById('pokemon2').value; // Obtém o valor do campo de entrada do Pokémon
    window.location.href = `pokemon.html?pokemon=${pokemonName}`; // Redireciona para a página de resultados
    return false; // Impede o envio do formulário
}

// Função para habilitar ou desabilitar o botão de busca
function toggleButton() {
    const inputField = document.getElementById('pokemon2'); // Obtém o campo de entrada
    const submitButton = document.getElementById('submitButton2'); // Obtém o botão de busca

    // Habilita o botão se houver 3 ou mais caracteres no campo de entrada
    if (inputField.value.length >= 3) {
        submitButton.disabled = false; // Habilita o botão
    } else {
        submitButton.disabled = true; // Desabilita o botão
    }
}

// Função chamada ao carregar a página
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search); // Obtém os parâmetros da URL
    const pokemonName = urlParams.get('pokemon'); // Extrai o nome do Pokémon da URL

    if (pokemonName) {
        fetchPokemonData(pokemonName); // Busca dados do Pokémon se o nome estiver presente
    }
}

// Função para buscar dados do Pokémon na PokéAPI
async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`); // Faz a requisição à PokéAPI
        if (!response.ok) throw new Error('Pokémon não encontrado'); // Lança um erro se a resposta não for OK
        const pokemonData = await response.json(); // Converte a resposta em JSON

        // Preenche as informações do Pokémon na página
        document.getElementById('pokemon-name').textContent = pokemonData.name; // Nome do Pokémon
        document.getElementById('pokemon-id').textContent = pokemonData.id; // ID do Pokémon
        document.getElementById('pokemon-height').textContent = pokemonData.height / 10; // Altura em metros
        document.getElementById('pokemon-weight').textContent = pokemonData.weight / 10; // Peso em kg
        
        // Usando a imagem do sprite em alta qualidade (se disponível)
        const spriteUrl = pokemonData.sprites.other['official-artwork']['front_default']; // Versão de arte oficial
        document.getElementById('pokemon-sprite').src = spriteUrl; // Atualiza a imagem no HTML

        // Busca dados da Pokémon TCG
        fetchCardData(pokemonData.name);
        
        // Exibe a seção de informações
        document.getElementById('pokemon-info').style.display = 'block';
    } catch (error) {
        console.error(error); // Exibe erro no console
        document.getElementById('error-message').style.display = 'block'; // Exibe mensagem de erro
    }
}

// Função para buscar dados do Pokémon na Pokémon TCG API
async function fetchCardData(pokemonName) {
    try {
        const cardResponse = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`);
        const cardData = await cardResponse.json();

        // Verifica se há cartas disponíveis
        if (cardData.data.length > 0) {
            // Usando a imagem da carta em alta qualidade
            const cardUrl = cardData.data[0].images.large; // Aqui, 'large' pode fornecer uma imagem de melhor qualidade
            document.getElementById('card-image').src = cardUrl; // Atualiza a imagem no HTML
        } else {
            // Mensagem ou lógica se não houver carta
            console.log('Nenhuma carta encontrada para este Pokémon.');
        }
    } catch (error) {
        console.error(error); // Exibe erro no console
    }
}

// Função para voltar à página anterior
function goBack() {
    window.history.back(); // Volta para a página anterior
}