document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
      // Se o login for bem-sucedido, redirecionar para a página de hub
      window.location.replace('/hub.html');
    } else {
      // Se o login falhar, exibir mensagem de erro
      const errorData = await response.json();
      alert(errorData.message);
    }
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    alert('Ocorreu um erro ao fazer login.');
  }
});

document.getElementById('cadastro-link').addEventListener('click', () => {
  // Redirecionar para a página de cadastro
  window.location.replace('/cadastro');
});

document.addEventListener("DOMContentLoaded", () => {
  // Seleciona o botão de reset de senha
  const resetSenhaLink = document.getElementById("reset-senha-link");

  // Adiciona um ouvinte de evento de clique ao botão de reset de senha
  resetSenhaLink.addEventListener("click", () => {
    // Redireciona para a página de reset de senha
    window.location.href = "reset_senha.html";
  });

  // Seleciona o formulário de login
  const loginForm = document.getElementById("login-form");

  // Adiciona um ouvinte de evento de envio do formulário de login
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        // Se o login for bem-sucedido, redirecionar para a página de hub
        window.location.replace('/hub.html');
      } else {
        // Se o login falhar, exibir mensagem de erro
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      alert('Ocorreu um erro ao fazer login.');
    }
  });
});



