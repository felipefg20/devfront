const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4040;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Rota principal para listar os Pokémon
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        res.render('index', { pokemons: response.data.results });
    } catch (error) {
        res.send('Erro ao carregar os dados dos Pokémon.');
    }
});

// Rota para exibir detalhes de um Pokémon específico
app.get('/pokemon/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`);
        res.render('pokemon', { pokemon: response.data });
    } catch (error) {
        res.send('Erro ao carregar os detalhes do Pokémon.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
