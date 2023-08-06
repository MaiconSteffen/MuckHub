document.getElementById('cadastro-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;

  try {
    const response = await fetch('/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
      alert('Cadastro realizado com sucesso!');
      window.location.replace('/hub.html'); // Redirecionar para a página após o cadastro
    } else {
      const errorData = await response.json();
      alert(errorData.message); // Exibir mensagem de erro retornada pelo servidor
    }
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err);
    alert('Ocorreu um erro ao cadastrar o usuário.');
  }
});

document.getElementById('login-link').addEventListener('click', () => {
  window.location.replace('/'); // Redirecionar para a página de login (/)
});
