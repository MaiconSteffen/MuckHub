document.addEventListener("DOMContentLoaded", () => {
    // Seleciona o formulário de reset de senha
    const resetSenhaForm = document.getElementById("reset-senha-form");
  
    // Adiciona um ouvinte de evento de envio do formulário de reset de senha
    resetSenhaForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
  
      try {
        // Envie o email do usuário para o servidor para o processo de reset de senha
        const response = await fetch('/reset_senha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        if (response.ok) {
          // Exibir mensagem de sucesso ou redirecionar para a página de login
          alert('Instruções de reset de senha enviadas para o email.');
          window.location.replace('/login.html');
        } else {
          // Se ocorrer um erro, exibir mensagem de erro
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (err) {
        console.error('Erro ao resetar a senha:', err);
        alert('Ocorreu um erro ao resetar a senha.');
      }
    });
  });
  