// Preenche o ano atual no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

const form = document.getElementById("form-contato");
const feedback = document.getElementById("feedback");
const botao = form.querySelector("button[type='submit']");

// Regras de validação: cada campo tem uma função que devolve a mensagem de erro (ou "" se estiver correto)
const regras = {
  nome: (v) => (v.trim().length < 3 ? "Informe seu nome (mínimo 3 caracteres)." : ""),
  email: (v) => {
    if (v.trim() === "") return "Informe seu e-mail.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Digite um e-mail válido, como nome@exemplo.com.";
  },
  mensagem: (v) => (v.trim().length < 10 ? "Escreva uma mensagem com pelo menos 10 caracteres." : "")
};

// Valida um campo e mostra/limpa o erro abaixo dele
function validarCampo(nome) {
  const campo = form.elements[nome];
  const erro = regras[nome](campo.value);
  document.getElementById("erro-" + nome).textContent = erro;
  campo.classList.toggle("invalid", erro !== "");
  campo.setAttribute("aria-invalid", erro !== "");
  return erro === "";
}

// Valida ao sair do campo e revalida enquanto o usuário corrige
Object.keys(regras).forEach((nome) => {
  form.elements[nome].addEventListener("blur", () => validarCampo(nome));
  form.elements[nome].addEventListener("input", () => {
    if (form.elements[nome].classList.contains("invalid")) validarCampo(nome);
  });
});

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  feedback.textContent = "";
  feedback.className = "feedback";

  // Valida todos os campos (sem parar no primeiro erro)
  const resultados = Object.keys(regras).map(validarCampo);
  if (resultados.includes(false)) {
    const primeiroInvalido = form.querySelector(".invalid");
    if (primeiroInvalido) primeiroInvalido.focus();
    return;
  }

  // Simulação de envio: aguarda 1 segundo e mostra a confirmação na tela
  botao.disabled = true;
  botao.textContent = "Enviando...";
  setTimeout(() => {
    const nome = form.elements.nome.value.trim().split(" ")[0];
    feedback.textContent = "Obrigada, " + nome + "! Sua mensagem foi enviada com sucesso.";
    feedback.classList.add("success");
    form.reset();
    botao.disabled = false;
    botao.textContent = "Enviar mensagem";
  }, 1000);
});
