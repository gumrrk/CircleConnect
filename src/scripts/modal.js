// Funcão que renderiza o Modal de acordo com seu ID, removendo algumas partes desnecessárias e aplicando um novo estilo à div
function renderModal() {
    const buttons = document.querySelectorAll('.button-post');
    const modalContainer = document.querySelector('#modalContainer');
    const dialog = document.querySelector('.modalDialog');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            const postId = this.id.replace('button-', 'post-');
            const postContent = document.querySelector(`#${postId}`).innerHTML;

            const postContainer = document.createElement('div');
            postContainer.innerHTML = postContent;
            const postButtons = postContainer.querySelectorAll('.button-post');
            const postLikes = postContainer.querySelectorAll('.div-likes');

            if (postButtons.length) {
                for (let j = 0; j < postButtons.length; j++) {
                    postButtons[j].remove();
                }
            }

            if (postLikes.length) {
                for (let j = 0; j < postLikes.length; j++) {
                    postLikes[j].remove();
                }
            }

            modalContainer.innerHTML = postContainer.innerHTML;

            // Funcionalidade que renderiza um botão para fechar o modal
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '&#x2716;';
            closeButton.addEventListener('click', function () {
                dialog.close();
                modalContainer.classList.remove('div-post-full');
            });

            modalContainer.appendChild(closeButton);
            modalContainer.classList.add('div-post-full');
            dialog.showModal();
            document.body.style.overflow = 'hidden';

            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            document.body.appendChild(overlay);
        });
    }

    dialog.addEventListener('close', function () {
        document.body.style.overflow = 'auto';
        const overlay = document.querySelector('.overlay');
        document.body.removeChild(overlay);
    });
}
renderModal();