

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

function logout() {
	localStorage.setItem('connectedUser', null);
	location.replace('index.html');
}

function displayClientsForAdmin() {
	var users = JSON.parse(localStorage.getItem('users'));
	var clientDashboardForAdmin = document.getElementById('dashboardClients');
    var status;
    var action;
	for (let i = 0; i < users.length; i++) {
		if(users[i].role == 'Client')
		{
            if (users[i].status) {
                status = 'Activé';
                action = `<button type="button" onclick="deleteClient(${users[i].idUser})" class="btn btn-danger btn-sm">Supprimer</button>`
            }
            else{  
                status = 'Désactivé';
                action = `<button type="button" onclick="addClient(${users[i].idUser})" class="btn btn-success btn-sm">Activer</button>`
            }
                
			clientDashboardForAdmin.innerHTML +=`
        <td>${users[i].idUser}</td>
        <td>${users[i].name}</td>
        <td>${users[i].email}</td>
        <td>${users[i].tel}</td>
        <td>${users[i].password}</td>
		<td>${status}</td>
		<td>${action}</td>
        </tr>`;
		}
	}
	


}

function displayPrestatairesForAdmin() {
	var users = JSON.parse(localStorage.getItem('users'));
	var prestataireDashboardForAdmin = document.getElementById('dashboardPrestataires');
    
	var status;
    var action;
	for (let i = 0; i < users.length; i++) {
		if(users[i].role == 'Prestataire')
		{
            if (users[i].status) {
                status = 'Activé';
                action = `<button type="button" onclick="deletePrestataire(${users[i].idUser})" class="btn btn-danger btn-sm">Supprimer</button>`
            }
            else{  
                status = 'Désactivé';
                action = `<button type="button" onclick="addPrestataire(${users[i].idUser})" class="btn btn-success btn-sm">Activer</button>`
            }
            
			prestataireDashboardForAdmin.innerHTML +=`
        <td>${users[i].idUser}</td>
        <td>${users[i].name}</td>
        <td>${users[i].company}</td>
        <td>${users[i].prestation}</td>
        <td>${users[i].tel}</td>
        <td>${users[i].email}</td>
        <td>${status}</td>
        <td>${action}</td>
        </tr>`;
		}
	}

}

function displayOrdersForAdmin() {
	var orders = JSON.parse(localStorage.getItem('orders'));
	var orderDashboardForAdmin = document.getElementById('dashboardOrders');

	for (let i = 0; i < orders.length; i++) {
			orderDashboardForAdmin.innerHTML +=`
        <td>${orders[i].idOrder}</td>
        <td>${orders[i].nomPrestataire}</td>
        <td>${orders[i].category}</td>
        <td>${orders[i].nomClient}</td>
        <td>${orders[i].dateEvent}</td>
        <td>${orders[i].nbInvit}</td>
        <td>${orders[i].selectedPack}</td>
        <td>${orders[i].status}</td>
        </tr>`;
	}

}


function searchById(id,key) {
    var data =  JSON.parse(localStorage.getItem(key));

    for (let i = 0; i < data.length; i++) {
        if(data[i].idUser == id){
            return data[i];
        }
        
    };

};


function addClient(id)
{
    var client = searchById(id,'users');

    if(client.status == false)
    {
        client.status = true;
    }

    var users = JSON.parse(localStorage.getItem('users'));

    for (let i = 0; i < users.length; i++) {
        if(users[i].idUser == client.idUser)
        {
            users[i] = client;
        }
        
    }
    
    localStorage.setItem('users',JSON.stringify(users));
    location.reload();
}


function deleteClient(id) {
    
    
    var users = JSON.parse(localStorage.getItem("users"));
    
    var newUsers = users.filter(user => user.idUser != id);

    localStorage.setItem("users", JSON.stringify(newUsers));

    location.reload();
}

function addPrestataire(id)
{
    var prestataire = searchById(id,'users');

    if(prestataire.status == false)
    {
        prestataire.status = true;
    }

    var users = JSON.parse(localStorage.getItem('users'));

    for (let i = 0; i < users.length; i++) {
        if(users[i].idUser == prestataire.idUser)
        {
            users[i] = prestataire;
        }
        
    }
    
    localStorage.setItem('users',JSON.stringify(users));
    location.reload();
}


function deletePrestataire(id) {
    
    
    var users = JSON.parse(localStorage.getItem("users"));
    
    var newPrestataires = users.filter(user => user.idUser != id);

    localStorage.setItem("users", JSON.stringify(newPrestataires));

    location.reload();
}

function dashboardClients() {
    var content = document.getElementById("clientsContent");
    var users = JSON.parse(localStorage.getItem('users'));
    var totalClient = 0;
    var actifClient = 0;
    var notActifClient = 0;
    for (let i = 0; i < users.length; i++) {
		if(users[i].role == 'Client')
		{
			totalClient++;
            if (users[i].status) {
                actifClient++;
            }
            else
            {
                notActifClient++;
            }
		}
	}
    content.innerHTML = `<div class="card bg-primary text-white mb-4">
    <div class="card-body"><h3 style="text-align: center;">Clients</h3></div>
    <div class="card-footer d-flex align-items-center justify-content-between">
        <h4>Total</h4>
        <h5>${totalClient}</h5>
    </div>
    <div class="card-footer d-flex align-items-center justify-content-between">
        <h4>Actif</h4>
        <h5>${actifClient}</h5>
    </div>
    <div class="card-footer d-flex align-items-center justify-content-between">
        <h4>Non Actif</h4>
        <h5>${notActifClient}</h5>
    </div>
    <div class="card-footer d-flex align-items-center justify-content-between">
        <h4></h4>
        <a style="color:white;" href="dashboardClients.html">Plus de détails</a>
    </div>
</div>
    `;

}

function dashboardPrestataires() {
    var content = document.getElementById("prestatairesContent");
    var users = JSON.parse(localStorage.getItem('users'));
    var totalPrestataire = 0;
    var actifPrestataire = 0;
    var notActifPrestataire = 0;
    for (let i = 0; i < users.length; i++) {
		if(users[i].role == 'Prestataire')
		{
			totalPrestataire++;
            if (users[i].status) {
                actifPrestataire++;
            }
            else
            {
                notActifPrestataire++;
            }
		}
	}
    content.innerHTML = `<div class="card bg-warning text-white mb-4">
    <div class="card-body"><h3 style="text-align: center;">Prestataires</h3></div>
    <div class="card-footer d-flex align-items-center justify-content-between">
        <h4>Total</h4>
        <h5>${totalPrestataire}</h5>
    </div>
    <div class="card-footer d-flex align-items-center justify-content-between">
        <h4>Actif</h4>
        <h5>${actifPrestataire}</h5>
    </div>
    <div class="card-footer d-flex align-items-center justify-content-between">
        <h4>Non Actif</h4>
        <h5>${notActifPrestataire}</h5>
    </div>
    <div class="card-footer d-flex align-items-center justify-content-between">
        <h4></h4>
        <a style="color:white;" href="dashboardPrestataires.html">Plus de détails</a>
    </div>
</div>
    `;

}

function dashboardOrders() {
    var content = document.getElementById("ordersContent");
    var orders = JSON.parse(localStorage.getItem('orders'));
    var totalOrder = orders.length;
    var confirmedOrder = 0;
    var rejectedOrder = 0;
    var pendingOrder = 0;
    for (let i = 0; i < orders.length; i++) 
    {
		if(orders[i].status == 'Confirmée')
		{
			confirmedOrder++;
        }
        else if(orders[i].status == 'Non disponible')
        {
            rejectedOrder++;
        }
        else
        {
            pendingOrder++
        }

	}

    content.innerHTML = `<div class="card bg-success text-white mb-4">
    <div class="card-body"><h3 style="text-align: center;">Demandes</h3></div>
    <div class="card-footer d-flex align-items-center justify-content-between">
        <h4>Total</h4>
        <h5>${totalOrder}</h5>
    </div>
    <div class="card-footer d-flex align-items-center justify-content-between">
        <h4>Confirmée</h4>
        <h5>${confirmedOrder}</h5>
    </div>
    <div class="card-footer d-flex align-items-center justify-content-between">
        <h4>Annulée</h4>
        <h5>${rejectedOrder}</h5>
    </div>
    <div class="card-footer d-flex align-items-center justify-content-between">
        <h4>En attente</h4>
        <h5>${pendingOrder}</h5>
    </div>
    <div class="card-footer d-flex align-items-center justify-content-between">
        <h4></h4>
        <a style="color:white;" href="dashboardOrders.html">Plus de détails</a>
    </div>
</div>
    `;

}