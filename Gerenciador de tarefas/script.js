// VARIAVEIS GLOBAIS
var taskId = 0;
var taskIdForm;         
var taskName;       
var taskResponsible;
var taskDescription;
var taskDate;       
var taskPriority;   
var taskStatus;

this.setTaskId();

function setTaskId() {
    this.taskId ++;
    $('#task_id').val(this.taskId);
}

function logar() {
    const usuario = 'Curso';
    const senha = '123';

    var name = document.getElementById('name').value;    
    var pass = document.getElementById('password').value;

    if (usuario === name && senha === pass) {    
        var nameUser = document.getElementById('nameUser');
        nameUser.textContent = name;
        
        document.getElementById('name').classList.add('d-none');
        document.getElementById('password').classList.add('d-none');
        document.getElementById('btnLogin').classList.add('d-none');
        document.getElementById('nameUser').classList.remove('d-none');
        document.getElementById('btnLogout').classList.remove('d-none');

        document.getElementById('name').value = "";
        document.getElementById('password').value = "";

        document.getElementById('new_task').classList.remove('d-none');
    } else {
        document.getElementById('name').style.border = "solid 2px red";
        document.getElementById('password').style.border = "solid 2px red";
        alert('Usuário ou senha incorretos.')
    }
}

jQuery(document.body).on('keypress', function(event){
    if(event.keyCode === 13) {
        event.preventDefault();
        $('#btnLogin').trigger('click');
    }    
});

function deslogar() {
    document.getElementById('nameUser').classList.add('d-none');    
    document.getElementById('btnLogout').classList.add('d-none');

    document.getElementById('name').classList.remove('d-none');
    document.getElementById('password').classList.remove('d-none');
    document.getElementById('btnLogin').classList.remove('d-none');

    document.getElementById('new_task').classList.add('d-none');
}

function saveTask() {
    taskId          = $('#task_id').val();
    taskName        = $('#task_name').val();
    taskResponsible = $('#task_responsible').val();
    taskDescription = $('#task_description').val();
    taskDate        = $('#task_date').val();
    taskPriority    = $('#task_priority').val();
    taskStatus      = $('#task_status').val();

    var statusId = taskStatus;
    var taskPriorityId = taskPriority;

    var validate = this.formValidate(taskName, taskDate, taskPriority, taskStatus);
    this.formatInputs(taskDate, taskPriority, taskStatus);

    var taskCard =
    " <div class='card mb-4 text-left p-3 border-0' id='card_"+ taskId +"'> " +
    "   <input class='d-none' id='id_card_"+ taskId +"' value="+ taskId +"> " +
    "   <div class='d-flex align-items-center justify-content-between pb-3'>" +
    "       <div class=''> " +
    "           <a href='#' class='text-decoration-none'>" + taskName + "</a> " +
    "           <input class='d-none' id='name_"+ taskId +"' value='" + taskName + "'> " +
    "       </div> " +
    "       <div class='action-icon'>" +
    "           <i class='fa fa-pencil pe-2' data-bs-toggle='modal' data-bs-target='#modal_edit_task' onclick=editTask("+ taskId +")></i>" +
    "           <i class='fa fa-trash-can' data-bs-toggle='modal' data-bs-target='#modal_delete_task' onclick='deleteTask("+ taskId +")'></i>" +
    "       </div>" +
    "   </div> " +
    "   <div class='pb-3 d-none'> " +
    "       <input id='description_"+ taskId +"' value='" +taskDescription + "'> " +
    "   </div> " +
    "   <div class='pb-2'> " +
    "       <i class='fa fa-calendar pe-2'></i> " +taskDate +"   </div> " +
    "       <input class='d-none' id='date_"+ taskId +"' value="+ taskDate +"> " +
    "   <div class='pb-3'> " +
    "       <i class='fa fa-user pe-2'></i> " + taskResponsible +
    "       <input class='d-none' id='responsible_"+ taskId +"' value='" + taskResponsible + "'> " +
    "   </div> " +
    "   <div> " + taskPriority +"   </div> " +
    "   <input id='priority_"+ taskId +"' value='"+ taskPriorityId +"' class='d-none'> " +
    "   <input id='status_"+ taskId +"' value='"+ statusId +"' class='d-none'> " +
    " </div>";

    if (validate) {
        this.setTaskCard(statusId, taskCard)
    }
    this.setTaskId();

}

function setTaskCard(statusId, taskCard) {
    var card;

    switch(statusId) {
        case '1':
            card = $('#do_card_content').append(taskCard);
            break;
        case '2':
            card = $('#doing_card_content').append(taskCard);
            break;
        case '3':
            card = $('#done_card_content').append(taskCard);
            break;
        default:
            alert('ERRO');
            break;
    }

    return card;
}

function formValidate(taskName, taskDate, taskPriority, taskStatus) {
    var result = true;

    if (taskName === '') {
        alert('Digite um nome para tarefa');
        result = false;
    }

    if (taskDate === '') {
        alert('Digite uma data para tarefa');
        result = false;
    }

    if (taskPriority === '') {
        alert('Informe uma prioridade');
        result = false;
    }

    if (taskStatus === '') {
        alert('Informe um status');
        result = false;
    }

   return result;
}

function formatInputs(taskDate, taskPriority, taskStatus) {
    this.taskDate     = taskDate.split('-').reverse().join('/');
    this.taskPriority = this.getPriorityName(taskPriority);
    this.taskStatus   = this.getStatusName(taskStatus);
}

// Função para pegar texto da prioridade
function getPriorityName(idPriority) {
    var priorityName;
    var classColor;

    switch(idPriority) {
        case '1':
            priorityName = 'Baixa';
            classColor   = 'lowPriority';
            break;
        case '2':
            priorityName = 'Media';
            classColor   = 'mediumPriority';
            break;
        case '3':
            priorityName = 'Alta';
            classColor   = 'highPriority';
            break;
        default:
            priorityName = 'Não definida';
            break;
    }

    return "<span class='badge " + classColor + " '> " + priorityName +" </span>";
}

function getStatusName(taskStatus) {
    switch(taskStatus) {
        case '1':
            return 'Fazer';            
        case '2':
            return 'Fazendo';            
        case '3':
            return 'Finalizada';
        default:
            return 'Não definido';
    }
}

let deleteTaskId = '';
function deleteTask(task) {
    deleteTaskId = task;
    document.getElementById('idTask').innerHTML = task;
}

function confirmDelete(result) {
    console.log(deleteTaskId);
    if (result === 'S') {
        document.getElementById('card_' + deleteTaskId).remove();        
    }
}



/** */
function editTask(task) {     
    let idCard          = $("#card_"+ task).val();
    let taskName        = $('#name_'+ task).val();
    let taskDescription = $('#description_'+ task).val();
    let taskDate        = $('#date_'+ task).val();
    let taskResponsible = $('#responsible_'+ task).val();
    let taskStatus      = $("#status_"+ task).val();
    let taskPriority    = $("#priority_"+ task).val();//document.getElementById('priority_'+ task).value;
    console.log(taskName);
    console.log(taskDescription);
    console.log(taskDate);
    console.log(taskResponsible);
    //let taskDateY = "2023-08-25";

    const date = taskDate.split("/");
    console.log(date);
    let newDate = date[2] + '-' + date[1] + '-' + date[0];
    document.getElementById('task_id_edit').value               = idCard;
    document.getElementById('task_name_edit').value             = taskName;
    document.getElementById('task_responsible_edit').value      = taskResponsible;
    document.getElementById('task_date_edit').value             = newDate; //'2023-03-01';
    document.getElementById('task_description_edit').value      = taskDescription;
    document.getElementById('task_status_edit').selectedIndex   = taskStatus;
    document.getElementById('task_priority_edit').selectedIndex = taskPriority;
}

