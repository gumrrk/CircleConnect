import { principalUser, posts, suggestUsers } from "./database.js"

// Função que renderiza o card do usuário ativo;
function renderPrincipalUser(ul, array) {
    let userPost = document.querySelector('#' + ul);

    let div = document.createElement('div');
    div.classList.add('div_userPost')

    let div1 = document.createElement('div');
    div1.classList.add('div_userPost-1');

    let img = document.createElement('img');
    img.classList.add('img_userPost');
    img.src = array.img;
    img.alt = 'Foto de Perfil';

    let div2 = document.createElement('div');
    div2.classList.add('div_userPost-2');

    let p1 = document.createElement('p');
    p1.classList.add('name_userPost');
    p1.innerHTML = `${array.user}`;

    let p2 = document.createElement('p');
    p2.classList.add('stack_userPost');
    p2.innerHTML = `${array.stack}`;

    div1.appendChild(img);
    div2.append(p1, p2);
    div.append(div1, div2);
    userPost.appendChild(div);
}
renderPrincipalUser('user_userPost', principalUser)

// Função que renderiza as sugestões
function renderSuggestions(array) {
    let listSuggestions = document.querySelector('#ul_suggestions')
    for (let i = 0; i < array.length; i++) {
        let element = array[i];

        let li = document.createElement('li');
        li.classList.add('li_suggestions');

        let div = document.createElement('div');
        div.classList.add('div_userPost');

        let div1 = document.createElement('div');
        div1.classList.add('div_userPost-1');

        let img = document.createElement('img');
        img.classList.add('img_userPost');
        img.src = element.img;
        img.alt = 'Foto de Perfil';

        let div2 = document.createElement('div');
        div2.classList.add('div_userPost-2');

        let p1 = document.createElement('p');
        p1.classList.add('name_userPost');
        p1.innerHTML = `${element.user}`;

        let p2 = document.createElement('p');
        p2.classList.add('stack_userPost');
        p2.innerHTML = `${element.stack}`;

        let button = document.createElement('button');
        button.classList.add('follow_user');
        button.innerHTML = 'Seguir';

        div1.appendChild(img);
        div2.append(p1, p2);
        div.append(div1, div2);
        li.append(div, button);
        listSuggestions.appendChild(li)
    }
}
renderSuggestions(suggestUsers)

// Função que renderiza os posts
function renderPosts(array) {
    const ulPosts = document.querySelector('#ul_posts')
    for (let i = 0; i < array.length; i++) {
        const element = array[i];

        let article = document.createElement('article');
        article.classList.add('article-post')
        article.id = `post-${element.id}`;

        let div1 = document.createElement('div');
        div1.classList.add('div-post-1');

        let div2 = document.createElement('div');
        div2.classList.add('div-post-2');

        let ul = document.createElement('ul');
        ul.id = `ul_${element.id}`;
        ul.classList.add('ul-posts')

        let h2 = document.createElement('h2');
        h2.innerHTML = `${element.title}`;
        h2.classList.add('h2-post');

        let p = document.createElement('p');
        p.innerHTML = `${element.text}`;
        p.classList.add('p-post');

        let button = document.createElement('button');
        button.classList.add('button-post');
        button.innerText = 'Abrir post';

        let divLikes = document.createElement('div');
        divLikes.classList.add('div-likes');

        let img = document.createElement('img');
        img.classList.add('svg-post')
        img.src = './src/assets/img/deslike.svg';

        let likes = document.createElement('p');
        likes.classList.add('likes-post')
        likes.innerText = `${element.likes}`;

        ulPosts.appendChild(article)
        article.append(div1, h2, p, div2);
        div1.appendChild(ul);
        renderPrincipalUser(ul.id, element);
        divLikes.append(img, likes)
        div2.append(button, divLikes)
    }
}
renderPosts(posts);

// Função que altera o estilo do botão 'Seguir' quando clicado
function followUser() {
    const buttons = document.querySelectorAll('.follow_user');

    buttons.forEach(botao => {
        botao.addEventListener('click', function () {
            this.classList.toggle('follow_user--followed');
            if (this.classList.contains('follow_user--followed')) {
                botao.innerHTML = "Seguindo";
            } else {
                botao.innerHTML = "Seguir";
            }
        });
    });
}
followUser();

// Função que altera o svg da img deslike.svg (cinza) para like.svg (vermelho)
function likePost() {
    const imgs = document.querySelectorAll('.svg-post');
    imgs.forEach((img) => {
        img.addEventListener('click', function () {
            const srcAtual = this.getAttribute('src');
            const srcNovo = (srcAtual === './src/assets/img/deslike.svg') ? './src/assets/img/like.svg' : './src/assets/img/deslike.svg';
            this.setAttribute('src', srcNovo);

            // Funcionalidade que aumenta e diminui o contador de "likes"
            const likesCount = this.parentNode.querySelector('.likes-post');
            let count = parseInt(likesCount.textContent);
            if (srcNovo === './src/assets/img/like.svg') {
                count += 1;
            } else {
                count -= 1;
            }
            likesCount.textContent = count;
        });
    });
}
likePost();

// Função que aplica um ID único a cada botão (em ordem crescente)
function apllyID() {
    const buttons = document.querySelectorAll('.button-post');
    let contador = 1;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('id', 'button-' + contador);
        contador++;
    }
}
apllyID()

// Função responsável por alterar o tema da página entre claro e escuro
function changeMode() {
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
        // Modo claro
        document.documentElement.style.setProperty('--color-grey-0', '#0A0C0D');
        document.documentElement.style.setProperty('--color-grey-1', '#212529');
        document.documentElement.style.setProperty('--color-grey-2', '#495057');
        document.documentElement.style.setProperty('--color-grey-3', '#868E96');
        document.documentElement.style.setProperty('--color-grey-4', '#DEE2E6');
        document.documentElement.style.setProperty('--color-grey-opacity', 'rgba(33, 37, 41, 0.5)');
        document.documentElement.style.setProperty('--color-grey-header', '#212529');
        document.documentElement.style.setProperty('--color-white-header', '#FFFFFF');
        document.documentElement.style.setProperty('--color-black', '#000000');
        document.documentElement.style.setProperty('--color-white', '#FFFFFF');
        document.documentElement.style.setProperty('--color-brand-1', '#4263EB');
        document.documentElement.style.setProperty('--color-brand-2', '#364FC7');
        document.getElementById("dark-button").innerHTML = "🌙";
        body.classList.remove('dark-mode');
    } else {
        // Modo escuro
        document.documentElement.style.setProperty('--color-grey-0', '#F2F2F2');
        document.documentElement.style.setProperty('--color-grey-1', '#F8F9FA');
        document.documentElement.style.setProperty('--color-grey-2', '#CED4DA');
        document.documentElement.style.setProperty('--color-grey-3', '#868E96');
        document.documentElement.style.setProperty('--color-grey-4', '#DEE2E6');
        document.documentElement.style.setProperty('--color-grey-opacity', 'rgba(33, 37, 41, 0.5)');
        document.documentElement.style.setProperty('--color-grey-header', '#181818');
        document.documentElement.style.setProperty('--color-white-header', '#FFFFFF');
        document.documentElement.style.setProperty('--color-black', '#FFFFFF');
        document.documentElement.style.setProperty('--color-white', '#222222');
        document.documentElement.style.setProperty('--color-brand-1', '#6C63FF');
        document.documentElement.style.setProperty('--color-brand-2', '#4D4CA8');
        document.getElementById("dark-button").innerHTML = "☀️";
        body.classList.add('dark-mode');
    }
}

// Função que adiciona a função anterior ao botão de mudar tema no HTML
function addDarkButton() {
    const button = document.querySelector('#dark-button')
    button.addEventListener('click', changeMode)
}
addDarkButton()