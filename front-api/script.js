const API_URL = "https://jsonplaceholder.typicode.com/posts";

const posts = document.getElementById("posts");
const novosPosts = document.getElementById("novos-posts");
const loading = document.getElementById("loading");
const erro = document.getElementById("erro");
const formulario = document.getElementById("formulario");

let proximoId = 6;

// Mostra ou esconde o "Carregando..."
function carregarLoading(mostrar) {
  if (mostrar) {
    loading.style.display = "block";
  } else {
    loading.style.display = "none";
  }
}


async function buscarPosts() {
  carregarLoading(true);
  erro.textContent = "";
  try {
    const resposta = await axios.get(API_URL + "?_limit=5");

    posts.innerHTML = "";

    resposta.data.forEach(function (post) {
      const corpoApi = document.createElement("corpoApi");

      corpoApi.className = "post";

      corpoApi.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <small>ID: ${post.id}</small>
      `;

      posts.appendChild(corpoApi);
    });

  } catch (error) {
    erro.textContent = "Não foi possível carregar os posts.";
    console.error(error);

  } finally {
    carregarLoading(false);
  }
}


formulario.addEventListener("submit", async function (event) {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const corpo = document.getElementById("corpo").value;

  carregarLoading(true);
  erro.textContent = "";

  try {
    const resposta = await axios.post(API_URL, {
      title: titulo,
      body: corpo
    });

    formulario.reset();

    const envio = document.createElement("envio");

    envio.className = "new-post";

    envio.innerHTML = `
      <h3>${resposta.data.title}</h3>
      <p>${resposta.data.body}</p>
      <small>ID: ${proximoId} (novo)</small>
    `;

    novosPosts.prepend(envio);

    alert("Post enviado com sucesso!");

    proximoId++;

  } catch (error) {
    erro.textContent = "Erro ao enviar o post.";
    alert("Erro ao enviar o post.");
    console.error(error);

  } finally {
    carregarLoading(false);
  }
});


buscarPosts();