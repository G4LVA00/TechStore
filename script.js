// Substitua pelas suas credenciais reais do Supabase (Settings > API)
const SUPABASE_URL = 'https://SEU-PROJETO.supabase.co';
const SUPABASE_ANON_KEY = 'SUA-CHAVE-ANON-AQUI';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const formulario = document.getElementById('formCadastro');
const btnEnviar = document.getElementById('btnEnviar');
const divMensagem = document.getElementById('mensagem');

function mostrarMensagem(texto, tipo) {
    divMensagem.textContent = texto;
    divMensagem.className = 'mensagem ' + tipo;

    setTimeout(function() {
        divMensagem.className = 'mensagem';
    }, 5000);
}

formulario.addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    if (!nome || !email) {
        mostrarMensagem('Por favor, preencha nome e e-mail.', 'erro');
        return;
    }

    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';

    try {
        const { data, error } = await supabase
            .from('cadastros')
            .insert([{ nome: nome, email: email, telefone: telefone }])
            .select();

        if (error) {
            console.error('Erro do Supabase:', error);
            mostrarMensagem('Erro ao cadastrar: ' + error.message, 'erro');
        } else {
            console.log('Cadastro realizado:', data);
            mostrarMensagem('✅ Cadastro realizado com sucesso!', 'sucesso');
            formulario.reset();
        }

    } catch (erro) {
        console.error('Erro inesperado:', erro);
        mostrarMensagem('Erro de conexão. Verifique sua internet.', 'erro');
    }

    btnEnviar.disabled = false;
    btnEnviar.textContent = 'Cadastrar';
});