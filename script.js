let input = document.querySelector('#inputNovaTarefa');
let btnAdd = document.querySelector('#btnAddTarefa');
let lista = document.querySelector('#listaTarefas');
let janelaEdit = document.querySelector('#janelaEdit');
let janelaEditFundo = document.querySelector('#janelaEditFundo');
let janelaEditBtnFechar = document.querySelector('#janelaEditBtnFechar');
let btnAtt = document.querySelector('#btnAtt');
let idTarefaEdit = document.querySelector("#idEdit");
let inputEdit = document.querySelector("#inputTarefaEdit");


input.addEventListener('keypress', (e) => {

    if(e.keyCode == 13) {
        let tarefa = {
            nome: input.value,
            id: gerarId(),
        }
        adicionarTarefa(tarefa);
    }

});

janelaEditBtnFechar.addEventListener('click', (e) => {
    alternarJanelaEdicao();
});

btnAdd.addEventListener('click',(e) => {


    let tarefa = {
        nome: input.value,
        id: gerarId(),
    }
    adicionarTarefa(tarefa)
    

});

btnAtt.addEventListener('click', (e) => {

    e.preventDefault(); // para prevenir o butão submeter os dados pra dentro da mesma pagina
    let idTarefaEditt = idTarefaEdit.innerHTML.replace('#', '');

    let tarefa = {
        nome: inputEdit.value,
        id: idTarefaEditt
    }

    let tarefaAtual = document.getElementById('' + idTarefaEditt + '');

    if(tarefaAtual) {
        let li = criarTagLI(tarefa);
        lista.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    } else {
        alert('Elemento html não encontrado')
    }

});

inputEdit.addEventListener('keypress', (e) => {
    if(e.keyCode == 13) {
        e.preventDefault(); // para prevenir o butão submeter os dados pra dentro da mesma pagina
        let idTarefaEditt = idTarefaEdit.innerHTML.replace('#', '');

        let tarefa = {
            nome: inputEdit.value,
            id: idTarefaEditt
        }

        let tarefaAtual = document.getElementById('' + idTarefaEditt + '');

        if(tarefaAtual) {
            let li = criarTagLI(tarefa);
            lista.replaceChild(li, tarefaAtual);
            alternarJanelaEdicao();
        } else {
            alert('Elemento html não encontrado')
        }
    }
})

function gerarId() {
    return Math.floor(Math.random() * 3000);
}

function adicionarTarefa(tarefa) {
    if (inputNovaTarefa.value == "") {
        alert('Adicione uma tarefa');
    } else {
        let li = criarTagLI(tarefa)
        lista.appendChild(li);
        input.value = "";
    }
}

function criarTagLI(tarefa) {
    let li = document.createElement('li');
    li.id = tarefa.id;
    
    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome; //aparecer no contúdo html o nome da tarefa


    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');


    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);

    return li;

}

function editar(idTarefa) {
    
    let li = document.getElementById(''+ idTarefa + '');
    if(li) {
        idTarefaEdit.innerHTML = '#' + idTarefa;
        inputEdit.value = li.innerText;
        alternarJanelaEdicao();
    } else {
        alert('Elemento html não encontrado')
    }
}

function excluir(idTarefa) {
    let confirm = window.confirm('Tem certeza que quer excluir?');
    if(confirm) {
        let li = document.getElementById(''+ idTarefa + '');
        if(li) {
            lista.removeChild(li);
        } else {
            alert('Elemento html não encontrado')
        }
    }
}

function alternarJanelaEdicao() {
    janelaEdit.classList.toggle('abrir');
    janelaEditFundo.classList.toggle('abrir');
}