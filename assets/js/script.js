
/*============================My-Project====================================*/
$.ajax({
    url: "./assets/js/data/baseOrders.json", //the path of the file is replaced by File.json
    dataType: "json",
    success: function (response) {
        console.log(response); //it will return the json array
    }
});

/* ========================================================================= */
// window.onload = function(){
	
// 	localStorage.setItem()
// };
/* ===============Typed index============== */
var typed = new Typed('.typed', {
    strings: ['Décorateur','Traiteur','Photographe','Lumière','Préstataire sono','Troupe music'],
    typeSpeed: 40,
    backSpeed: 0,
    smartBackspace: true, // this is a default
    loop: true
  });
/*	Register client
/* ========================================================================= */
function verifLength(chaine, nb) {
    // if (chaine.length>= nb) {
    //     return true;
    // } else {
    //     return false;
    // }
    return (chaine.length >= nb);
}

// Cette fonction permet de verifier le format d'un email est valide ou non 
function validateEmail(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}

// Cette fonction permet de verifier le format du password est valide ou non (doit contenir des lettres majiscules et miniscules ainsi que des chiifres et le nombre de caractères doit être au moins 8 caractères)
function validatePwd(password) {
    const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regExp.test(String(password));
}

function searchUserByEmail(email) {
    // Récupération de tous les utilisateurs
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    // Parcours du tableau users
    for (let i = 0; i < users.length; i++) {
        // Recherche de l'utilisateur avec son email dans chaque case du tableau users
        if (users[i].email == email) {
            return true;
        }

    }

    return false;
}

function registerClient () {
	var name = document.getElementById('name').value;
	var email = document.getElementById('email').value;
	var tel = document.getElementById('tel').value;
	var password = document.getElementById('password').value;
	var confirmPassword = document.getElementById('confirmPassword').value;

	var verifName = verifLength(name, 5);

	if (verifName) {
        document.getElementById("nameError").innerHTML = "";
    } else {
        document.getElementById("nameError").innerHTML = "Le nom doit contenir au moins 5 caractères";
        document.getElementById("nameError").style.color = "red";
    }


    // Controle de saisie pour l'email pour vérifier si le format de l'email est valide ou non
    // Ce controle de saisie se fait par la fonction validateEmail 
    // Le retour de cette fonction sera affecté dans la variable verifEmail 
    var verifEmail = validateEmail(email);
	console.log(verifEmail)
    // Si la variable verifEmail= true on affiche pas le msg d'erreur
    if (verifEmail) {
        document.getElementById("emailError").innerHTML = "";
    }
    // Sinon on affiche le msg d'erreur dans le html dans une balise span qui a l'id=emailError
    else {
        document.getElementById("emailError").innerHTML = "Invalid Email";
        document.getElementById("emailError").style.color = "red";
    }
    // Controle de saisie pour verifier si l'email existe dejà ou non 
    // Ce controle de saisie se fait par la fonction searchUserByEmail 
    // Le retour de cette fonction sera affecté dans la variable userExist 
    var userExist = searchUserByEmail(email);
    // Si la variable userExist= true on affiche pas le msg d'erreur
    if (!userExist) {
        document.getElementById("userExistError").innerHTML = "";
    }
    // Sinon on affiche le msg d'erreur dans le html dans une balise span qui a l'id=userExistError 
    else {
        document.getElementById("userExistError").innerHTML = "Utilisateur déja existant";
        document.getElementById("userExistError").style.color = "red";
    }


    // Controle de saisie pour le password pour vérifier si le format du password est valide ou non
    var verifPassword = validatePwd(password);
    // Si la variable verifPassword= true on affiche pas le msg d'erreur
    if (verifPassword) {
        document.getElementById("passwordError").innerHTML = "";
    }
    // Sinon on affiche le msg d'erreur dans le html dans une balise span qui a l'id=passwordError 
    else {
        document.getElementById("passwordError").innerHTML = "Mot de passe invalid";
        document.getElementById("passwordError").style.color = "red";
    }

    // Controle de saisie pour verifier que le confirmPassword=password
    if (password == confirmPassword) {
        document.getElementById("confirmPasswordError").innerHTML = "";

    } else {
        document.getElementById("confirmPasswordError").innerHTML = "Vérifier mot de passe";
        document.getElementById("confirmPasswordError").style.color = "red";

    }
    // Récupération de la valeur dans l'input tel
    var tel = document.getElementById("tel").value;
    // Controle de saisie pour verifier que le tel contient 8 chiffres
    if (!isNaN(tel) && tel.length == 8) {
        document.getElementById("telError").innerHTML = "";

    } else {
        document.getElementById("telError").innerHTML = "numéro de téléphone invalid";
        document.getElementById("telError").style.color = "red";

    }
    // Si toutes les valeurs sont acceptées on passe à l'étape du sauvegarde des données de l'utilisateur dans localStorage
    if (verifName  && verifEmail && verifPassword && (password == confirmPassword) && (!isNaN(tel) && tel.length == 8) && (!userExist)) {
        // Récupération de la valeur idUser dans localStorage
        // Si la clé idUser n'existe pas dans localStorage on affecte l'id 10 pour le premier client
        var idUser = JSON.parse(localStorage.getItem("idUser") || "10");

        // Regroupement des données de l'utilisateur dans un objet user
        var user = {
            idUser,
            name,
            email,
            tel,
            password,
			'status' : false,
            'role' : "Client",
			
        };

        // Récuperation des anciennes utilisateurs dans un tableau users
        //  Si la clé users n'existe pas on retourne un tableau vide pour qu'on puisse ajouter l'objet user dans le tableau users
        var users = JSON.parse(localStorage.getItem("users") || "[]");

        // Ajout du nouveau utilisateur dans le tableau users
        users.push(user);

        // Sauvegarde du tableau des utilisateurs dans la clé users
        localStorage.setItem("users", JSON.stringify(users));
        // Incrémentation de l'idUser pour le prochain utilisateur
        localStorage.setItem("idUser", idUser + 1);
        // Après le sauvegarde on accède à la page login.html
        Swal.fire({
			position: 'center',
			icon: 'success',
			title: "Votre compte a été créé avec succès, pour y accéder l'administrateur doit l'activer!   ",
			showConfirmButton: false,
			timer: 2000
		})
		setTimeout(function() { location.replace('index.html'); }, 5000);
    }
    

}

function displayGouv() {
	
	const Gouv = ['Ariana','Béja','Ben Arous','Bizerte','Gabès',
				'Gafsa','Jendouba','Kairouan','Kasserine','Kébili',
				'Le Kef','Mahdia','La Manouba','Médenine','Monastir',
				'Nabeul','Sfax','Sidi Bouzid','Siliana','Sousse',
				'Tataouine','Tozeur','Tunis','Zaghouan'];

	const gouvContent = document.getElementById('gouvList');
	
	for (let i = 0; i < Gouv.length; i++) {
		
		gouvContent.innerHTML += `<option value="${Gouv[i]}">${Gouv[i]}</option>`;
	}
}

function displayPrestation() {
	
	const Prestations = ['Décoration','Traiteur','Photographe','Lumières','Sonorisations','Troupe musicale'];

	const prestationsContent = document.getElementById('prestationsList');
	
	for (let i = 0; i < Prestations.length; i++) {
		
		prestationsContent.innerHTML += `<option value="${Prestations[i]}">${Prestations[i]}</option>`;
	}
}

function searchById(id,key) {
    var data =  JSON.parse(localStorage.getItem(key));

    for (let i = 0; i < data.length; i++) {
        if(data[i].idUser == id){
            return data[i];
        }
        
    };

}
function searchOrderById(id,key) {
    var data =  JSON.parse(localStorage.getItem(key));

    for (let i = 0; i < data.length; i++) {
        if(data[i].idOrder == id){
            return data[i];
        }
        
    };

}
/* ========================================================================= */
/*	Register client
/* ========================================================================= */

function registerPrestataire () {
	var name = document.getElementById('name').value;
	var company = document.getElementById('company').value;
	var prestation = document.getElementById('prestationsList').value;
	var address = document.getElementById('gouvList').value;
	var email = document.getElementById('email').value;
	var tel = document.getElementById('tel').value;
	var password = document.getElementById('password').value;
	var confirmPassword = document.getElementById('confirmPassword').value;


	var verifName = verifLength(name, 5);

	if (verifName) {
        document.getElementById("nameError").innerHTML = "";
    } else {
        document.getElementById("nameError").innerHTML = "Le nom doit contenir au moins 5 caractères";
        document.getElementById("nameError").style.color = "red";
    }

	var verifCompany = verifLength(company, 3);

	if (verifCompany) {
        document.getElementById("campanyError").innerHTML = "";
    } else {
        document.getElementById("campanyError").innerHTML = "Le champ societé doit contenir au moins 3 caractères";
        document.getElementById("campanyError").style.color = "red";
    }

	var verifPrestation = prestation !== 'Choisir votre prestation';
	if (verifPrestation) {
        document.getElementById("prestationError").innerHTML = "";
    } else {
        document.getElementById("prestationError").innerHTML = "Le champ prestation est obligatoire";
        document.getElementById("prestationError").style.color = "red";
    }

	var verifAddress = address !== 'Choisir votre Gouvernorat';

	if (verifAddress) {
        document.getElementById("addressError").innerHTML = "";
    } else {
        document.getElementById("addressError").innerHTML = "Le champ adresse est obligatoire";
        document.getElementById("addressError").style.color = "red";
    }

    // Controle de saisie pour l'email pour vérifier si le format de l'email est valide ou non
    // Ce controle de saisie se fait par la fonction validateEmail 
    // Le retour de cette fonction sera affecté dans la variable verifEmail 
    var verifEmail = validateEmail(email);
    // Si la variable verifEmail= true on affiche pas le msg d'erreur
    if (verifEmail) {
        document.getElementById("emailError").innerHTML = "";
    }
    // Sinon on affiche le msg d'erreur dans le html dans une balise span qui a l'id=emailError
    else {
        document.getElementById("emailError").innerHTML = "Invalid Email";
        document.getElementById("emailError").style.color = "red";
    }
    // Controle de saisie pour verifier si l'email existe dejà ou non 
    // Ce controle de saisie se fait par la fonction searchUserByEmail 
    // Le retour de cette fonction sera affecté dans la variable userExist 
    var userExist = searchUserByEmail(email);
    // Si la variable userExist= true on affiche pas le msg d'erreur
    if (!userExist) {
        document.getElementById("userExistError").innerHTML = "";
    }
    // Sinon on affiche le msg d'erreur dans le html dans une balise span qui a l'id=userExistError 
    else {
        document.getElementById("userExistError").innerHTML = "Utilisateur déja existant";
        document.getElementById("userExistError").style.color = "red";
    }


    // Controle de saisie pour le password pour vérifier si le format du password est valide ou non
    var verifPassword = validatePwd(password);
    // Si la variable verifPassword= true on affiche pas le msg d'erreur
    if (verifPassword) {
        document.getElementById("passwordError").innerHTML = "";
    }
    // Sinon on affiche le msg d'erreur dans le html dans une balise span qui a l'id=passwordError 
    else {
        document.getElementById("passwordError").innerHTML = "Mot de passe invalid";
        document.getElementById("passwordError").style.color = "red";
    }

    // Controle de saisie pour verifier que le confirmPassword=password
    if (password == confirmPassword) {
        document.getElementById("confirmPasswordError").innerHTML = "";

    } else {
        document.getElementById("confirmPasswordError").innerHTML = "Vérifier mot de passe";
        document.getElementById("confirmPasswordError").style.color = "red";

    }
    // Récupération de la valeur dans l'input tel
    var tel = document.getElementById("tel").value;
    // Controle de saisie pour verifier que le tel contient 8 chiffres
    if (!isNaN(tel) && tel.length == 8) {
        document.getElementById("telError").innerHTML = "";

    } else {
        document.getElementById("telError").innerHTML = "numéro de téléphone invalid";
        document.getElementById("telError").style.color = "red";

    }
    // Si toutes les valeurs sont acceptées on passe à l'étape du sauvegarde des données de l'utilisateur dans localStorage
    if (verifName && verifAddress && verifCompany && verifPrestation && verifEmail && verifPassword && (password == confirmPassword) && (!isNaN(tel) && tel.length == 8) && (!userExist)) {
        // Récupération de la valeur idUser dans localStorage
        // Si la clé idUser n'existe pas dans localStorage on affecte l'id 10 pour le premier client
        var idUser = JSON.parse(localStorage.getItem("idUser") || "10");

        // Regroupement des données de l'utilisateur dans un objet user
        var user = {
            idUser,
			name,
			company,
			prestation,
			address,
			email,
			tel,
			password,
			'status' : false, 
			'role' : 'Prestataire'
			
        };

        // Récuperation des anciennes utilisateurs dans un tableau users
        //  Si la clé users n'existe pas on retourne un tableau vide pour qu'on puisse ajouter l'objet user dans le tableau users
        var users = JSON.parse(localStorage.getItem("users") || "[]");

        // Ajout du nouveau utilisateur dans le tableau users
        users.push(user);

        // Sauvegarde du tableau des utilisateurs dans la clé users
        localStorage.setItem("users", JSON.stringify(users));
        // Incrémentation de l'idUser pour le prochain utilisateur
        localStorage.setItem("idUser", idUser + 1);
        // Après le sauvegarde on accède à la page login.html
        Swal.fire({
			position: 'center',
			icon: 'success',
			title: "Votre compte a été créé avec succès, pour y accéder l'administrateur doit l'activer!   ",
			showConfirmButton: false,
			timer: 2000
		})
		setTimeout(function() { location.replace('index.html'); }, 5000);


}
}
/* ========================================================================= */
/*	Ajout admin
/* ========================================================================= */

function insertAdmins() {

    var admin1 = {
        id: 1,
        firstName: 'admin1',
        lastName: 'admin1',
        email: 'admin1@gmail.com',
        password: 'admin123',
        role: 'Admin'
    };

    var users = JSON.parse(localStorage.getItem("users") || '[]');
    users.push(admin1);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("adminAdded", true);

}

/* ========================================================================= */
/*	Authentification
/* ========================================================================= */


function login() {
    var users = JSON.parse(localStorage.getItem('users'));

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var findedUser;
    for (let index = 0; index < users.length; index++) {
        if (users[index].email == email && users[index].password == password) {
            findedUser = users[index];
        }

    }
    if (findedUser) {
        localStorage.setItem('connectedUser', JSON.stringify(findedUser));
        if (findedUser.role == 'Admin') {
            location.replace('dashboardIndex.html');
        }
        else if(findedUser.role == 'Prestataire') {
			
            if(findedUser.status == true)
			
			location.replace('index.html');
			else{
			document.getElementById('error').innerHTML = "Votre compte n'est pas encore activé";
        	document.getElementById('error').style.color = 'red';
			}
        }
		else{
			if(findedUser.status == true)
			location.replace('index.html');
			else{
			document.getElementById('error').innerHTML = "Votre compte n'est pas encore activé";
        	document.getElementById('error').style.color = 'red';
			}
		}
    }
    else {
        document.getElementById('error').innerHTML = 'Adresse email ou mot de passe incorrect';
        document.getElementById('error').style.color = 'red';
    }
}

function setHeader() {
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    
	var headerContent = document.getElementById('headerContent');
	if (connectedUser != null) {
		headerContent.innerHTML = '';
		if (connectedUser.role == 'Client') {			
			headerContent.innerHTML = `<div class="header-area header-transparent">
			<div class="main-header header-sticky">
				<div class="container-fluid">
					<div class="menu-wrapper  ">
						<div class="left-content d-flex align-items-center justify-content-between">
							<div class="logo">
								<a href="index.html"><img src="assets/img/logo/xlogo.png.pagespeed.ic.7q74cPMyQA.png"
										alt=""></a>
							</div>

							<div class="form-box">
								<input type="text" name="Search" placeholder="Chercher" id="search_input" onkeypress="searchPr(event)">
								<div class="search-icon">
									<i class="fas fa-search"></i>
								</div>
							</div>

							<div class="main-menu d-none d-lg-block">
								<nav>
									<ul id="navigation">
										<li><a href="index.html">Accueil</a></li>
										<li><a href="nos-prestataires.html">Nos prestataires</a></li>
										<li><a href="about.html">A propos</a></li>
									</ul>
								</nav>
							</div>

							<div class="main-menu d-none d-lg-block">
								<nav>
									<ul>
										<li><a href="#"><i class="fas fa-user"></i></a>
											<ul class="submenu">
												<li><p style="color:white"> Salut ${connectedUser.name}</p></li>
												<li><a href="orders-compteClient.html">Mes demandes</a></li>
												<li><a href="edit-compteClient.html">Mon Compte</a></li>
											</ul>
										</li>
										<li><a href="#" onclick="logout()">Déconnexion</a></li>
									</ul>
								</nav>
							</div>
						</div>
					</div>

					<div class="col-12">
						<div class="mobile_menu d-block d-lg-none"></div>
					</div>
				</div>
			</div>
		</div>`;
		}
		else if(connectedUser.role == 'Prestataire')
		{
			headerContent.innerHTML =`<div class="header-area header-transparent">
			<div class="main-header header-sticky">
				<div class="container-fluid">
					<div class="menu-wrapper  ">
						<div class="left-content d-flex align-items-center justify-content-between">
							<div class="logo">
								<a href="index.html"><img src="assets/img/logo/xlogo.png.pagespeed.ic.7q74cPMyQA.png"
										alt=""></a>
							</div>

							<div  class="form-box">
								<input type="text" name="Search" placeholder="Chercher" id="search_input" onkeypress="searchPr(event)">
								<div class="search-icon">
									<i class="fas fa-search"></i>
								</div>
							</div>

							<div class="main-menu d-none d-lg-block">
								<nav>
									<ul id="navigation">
										<li><a href="index.html">Accueil</a></li>
										<li><a href="nos-prestataires.html">Nos prestataires</a></li>
										<li><a href="about.html">A propos</a></li>
									</ul>
								</nav>
							</div>

							<div class="main-menu d-none d-lg-block">
								<nav>
									<ul>
										<li><a href="#"><i class="fas fa-user"></i></a>
											<ul class="submenu">
												<li><p style="color:white"> Salut ${connectedUser.name}</p></li>
												<li><a href="orders-comptePrestataire.html">Mes demandes</a></li>
												<li><a href="edit-comptePrestataire.html">Mon Compte</a></li>
												<li><a href="edit-portfolio.html">Mon Portfolio</a></li>
											</ul>
										</li>
										<li><a href="#" onclick="logout()">Déconnexion</a></li>
									</ul>
								</nav>
							</div>
						</div>
					</div>

					<div class="col-12">
						<div class="mobile_menu d-block d-lg-none"></div>
					</div>
				</div>
			</div>
		</div>`;
		}
		else
		{
			headerContent.innerHTML =`<div class="header-area header-transparent">
			<div class="main-header header-sticky">
				<div class="container-fluid">
					<div class="menu-wrapper  ">
						<div class="left-content d-flex align-items-center justify-content-between">
							<div class="logo">
								<a href="index.html"><img src="assets/img/logo/xlogo.png.pagespeed.ic.7q74cPMyQA.png"
										alt=""></a>
							</div>

							<div class="form-box">
								<input type="text" name="Search" placeholder="Chercher" id="search_input" onkeypress="searchPr(event)">
								<div class="search-icon">
									<i class="fas fa-search"></i>
								</div>
							</div>

							<div class="main-menu d-none d-lg-block">
								<nav>
									<ul id="navigation">
										<li><a href="index.html">Accueil</a></li>
										<li><a href="nos-prestataires.html">Nos prestataires</a></li>
										<li><a href="about.html">A propos</a></li>
									</ul>
								</nav>
							</div>

							<div class="main-menu d-none d-lg-block">
								<nav>
									<ul>
										<li><a href="#"><i class="fas fa-user"></i></a>
											<ul class="submenu">
												<li><p style="color:white"> Salut ${connectedUser.firstName}</p></li>
												<li><a href="edit-comptePrestataire.html">Mon Compte</a></li>
												<li><a href="dashboardIndex.html">Dashboard</a></li>
											</ul>
										</li>
										<li><a href="#" onclick="logout()">Déconnexion</a></li>
									</ul>
								</nav>
							</div>
						</div>
					</div>

					<div class="col-12">
						<div class="mobile_menu d-block d-lg-none"></div>
					</div>
				</div>
			</div>
		</div>`;
		}
	}
	else
	{
		headerContent.innerHTML = `
		<div class="header-area header-transparent">
			<div class="main-header header-sticky">
				<div class="container-fluid">
					<div class="menu-wrapper  ">
						<div class="left-content d-flex align-items-center justify-content-between">
							<div class="logo">
								<a href="index.html"><img src="assets/img/logo/xlogo.png.pagespeed.ic.7q74cPMyQA.png"
										alt=""></a>
							</div>

							<div class="form-box">
								<input type="text" name="Search" placeholder="Chercher" id="search_input" onkeypress="searchPr(event)">
								<div class="search-icon">
									<i class="fas fa-search"></i>
								</div>
							</div>

							<div class="main-menu d-none d-lg-block">
								<nav>
									<ul id="navigation">
										<li><a href="index.html">Accueil</a></li>
										<li><a href="nos-prestataires.html">Nos prestataires</a></li>
										<li><a href="about.html">A propos</a></li>
									</ul>
								</nav>
							</div>

							<div class="main-menu d-none d-lg-block">
								<nav>
									<ul>
										<li><a href="#">S'inscrire</a>
											<ul class="submenu">
												<li><a href="register-client.html">Vous êtes Client</a></li>
												<li><a href="register-prestataire.html">Vous êtes Prestataire</a></li>
											</ul>
										</li>
										<li><a href="login.html">Connexion</a></li>
									</ul>
								</nav>
							</div>
						</div>
					</div>

					<div class="col-12">
						<div class="mobile_menu d-block d-lg-none"></div>
					</div>
				</div>
			</div>
		</div>`
	}
}

function logout() {
	localStorage.setItem('connectedUser', null);
	location.replace('index.html');
}

function getPrestataires() {
	var users = JSON.parse(localStorage.getItem('users'));
	
	var prestataires = [];
	for (let i = 0; i < users.length; i++) {
		if(users[i].role == 'Prestataire')
		{
			prestataires.push(users[i]);
		}
	}
	return prestataires;
}

function displayAllPrestataire() {
	var prestatairesContent = document.getElementById('allPrestatairesContent');
	var prestataireNumber = document.getElementById('prestatairesNumber');

	var prestataires = getPrestataires();
	prestataireNumber.innerHTML = `<span> (${prestataires.length}) Prestataires disponibles</span>`;
	
	for (let i = 0; i < prestataires.length; i++) {
		prestatairesContent.innerHTML += `<div  class="col-lg-4">
		<div class="properties properties2 pb-30">
			<div class="properties-card">
				<div class="properties-img overlay1">
				<a href="prestataire-details.html" onclick="prestataireDetails(${prestataires[i].idUser})"><img 
							src="${prestataires[i].portfolio.photoCouv}"
							alt=""></a>
					<div class="img-text" >
					<a href="result.html" onclick="addToResult('${prestataires[i].prestation.toLowerCase()}')"><span>${prestataires[i].prestation}</span></a>

					</div>
					
				</div>
				<div class="properties-caption">
					<h3>
						<a href="prestataire-details.html" onclick="prestataireDetails(${prestataires[i].idUser})">${prestataires[i].company}</a>
						<img src="assets/img/gallery/xvarified.png.pagespeed.ic.WKI_FS8TqB.png"
							alt="">
					</h3>
					<a href="result.html" onclick="addToResult('${prestataires[i].address.toLowerCase()}')"><p><i class="fas fa-map-marker-alt"></i>${prestataires[i].address}</p></a>
				</div>
				<div
					class="properties-footer d-flex justify-content-between align-items-center flex-wrap">
					<div class="restaurant-name">
						<i class="fas fa-user"></i>
						<h3><a>${prestataires[i].name}</a></h3>
					</div>
					<div class="contact">
						<ul>
							<li><i class="fas fa-phone-alt"></i></li>
							<li><i class="far fa-envelope"></i></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
		`
		
	}
}


function displayAllPrestataireAbout() {
	var prestatairesContent = document.getElementById('allPrestatairesContent');

	var prestataires = getPrestataires();
	
	for (let i = 0; i < prestataires.length; i++) {
		prestatairesContent.innerHTML += `<div class="col-xl-2 col-lg-2 col-md-4 col-sm-4">
		<div class="single-location mb-30 text-center">
			<div class="location-img">
				<img src="${prestataires[i].portfolio.photoCouv}" alt="">
				<div class="location-details">
					<h4><a href="#">${prestataires[i].company}<i class="fas fa-angle-right"></i></a></h4>
				</div>
			</div>
			<h3><a href="#">${prestataires[i].prestation}</a></h3>
		</div>
	</div>`
		
	}
}

function displayComptePrestataire() {
	connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
	document.getElementById('name').value = connectedUser.name;
	document.getElementById('company').value = connectedUser.company;
	document.getElementById('email').value = connectedUser.email;
	document.getElementById('tel').value = connectedUser.tel;
}

function editPrestataire() {
	idPrestataire = JSON.parse(localStorage.getItem('connectedUser')).idUser;
	users = JSON.parse(localStorage.getItem('users'));

	newPrestation = document.getElementById('prestationsList').value;
	if (newPrestation !== 'Choisir votre prestation') {
        document.getElementById("prestationError").innerHTML = "";
    }
    // Sinon on affiche le msg d'erreur dans le html dans une balise span qui a l'id=passwordError 
    else {
        document.getElementById("prestationError").innerHTML = "Champ obligatoire";
        document.getElementById("prestationError").style.color = "red";
    }

	newAdress = document.getElementById('gouvList').value;
	
	if (newAdress !== 'Choisir votre Gouvernorat') {
        document.getElementById("addressError").innerHTML = "";
    }
    // Sinon on affiche le msg d'erreur dans le html dans une balise span qui a l'id=passwordError 
    else {
        document.getElementById("addressError").innerHTML = "Champ obligatoire";
        document.getElementById("addressError").style.color = "red";
    }

	 // Récupération de la valeur dans l'input tel
	 var newTel = document.getElementById("tel").value;
	 // Controle de saisie pour verifier que le tel contient 8 chiffres
	 if (!isNaN(newTel) && newTel.length == 8) {
		 document.getElementById("telError").innerHTML = "";
 
	 } else {
		 document.getElementById("telError").innerHTML = "numéro de téléphone invalid";
		 document.getElementById("telError").style.color = "red";
 
	 }
	
	newPassword = document.getElementById('password').value;
	var verifPassword = validatePwd(newPassword);
    // Si la variable verifPassword= true on affiche pas le msg d'erreur
    if (verifPassword) {
        document.getElementById("passwordError").innerHTML = "";
    }
    // Sinon on affiche le msg d'erreur dans le html dans une balise span qui a l'id=passwordError 
    else {
        document.getElementById("passwordError").innerHTML = "Mot de passe invalid";
        document.getElementById("passwordError").style.color = "red";
    }

	newConfirmPassword = document.getElementById('confirmPassword').value;
	// Controle de saisie pour verifier que le confirmPassword=password
    if (newPassword == newConfirmPassword) {
        document.getElementById("confirmPasswordError").innerHTML = "";

    } else {
        document.getElementById("confirmPasswordError").innerHTML = "Vérifier mot de passe";
        document.getElementById("confirmPasswordError").style.color = "red";

    }
	
	if (newPrestation !== 'Choisir votre prestation' && newAdress !== 'Choisir votre Gouvernorat' && verifPassword && (newPassword == newConfirmPassword) && (!isNaN(newTel) && newTel.length == 8)) {
		for (let i = 0; i < users.length; i++) {
				if(users[i].idUser == idPrestataire){
					users[i].prestation = newPrestation;
					users[i].address = newAdress;
					users[i].tel = newTel;
					users[i].password = newPassword;
				}
			}
		localStorage.setItem('users',JSON.stringify(users));

		let timerInterval
		Swal.fire({
			icon: 'success',
			title: 'Compte modifié avec succés',
			html: 'Vous allez être déconnecté après <b></b> millisecondes',
			timer: 10000,
			timerProgressBar: true,
			didOpen: () => {
				Swal.showLoading()
				const b = Swal.getHtmlContainer().querySelector('b')
				timerInterval = setInterval(() => {
					b.textContent = Swal.getTimerLeft()
				}, 100)
			},
			willClose: () => {
			clearInterval(timerInterval)
  			}
			}).then((result) => {
  			/* Read more about handling dismissals below */
  			if (result.dismiss === Swal.DismissReason.timer) {
    		logout();
  			}
		})



	}
}

function displayCompteClient() {
	connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
	document.getElementById('name').value = connectedUser.name;
	document.getElementById('email').value = connectedUser.email;
	document.getElementById('tel').value = connectedUser.tel;

}

function editClient() {
	idPrestataire = JSON.parse(localStorage.getItem('connectedUser')).idUser;
	users = JSON.parse(localStorage.getItem('users'));
	newPassword = document.getElementById('password').value;
	newConfirmPassword = document.getElementById('confirmPassword').value;

	var verifPassword = validatePwd(newPassword);
    // Si la variable verifPassword= true on affiche pas le msg d'erreur
    if (verifPassword) {
        document.getElementById("passwordError").innerHTML = "";
    }
    // Sinon on affiche le msg d'erreur dans le html dans une balise span qui a l'id=passwordError 
    else {
        document.getElementById("passwordError").innerHTML = "Mot de passe invalid";
        document.getElementById("passwordError").style.color = "red";
    }

    // Controle de saisie pour verifier que le confirmPassword=password
    if (newPassword == newConfirmPassword) {
        document.getElementById("confirmPasswordError").innerHTML = "";

    } else {
        document.getElementById("confirmPasswordError").innerHTML = "Vérifier mot de passe";
        document.getElementById("confirmPasswordError").style.color = "red";

    }
    // Récupération de la valeur dans l'input tel
    var newTel = document.getElementById("tel").value;
    // Controle de saisie pour verifier que le tel contient 8 chiffres
    if (!isNaN(newTel) && newTel.length == 8) {
        document.getElementById("telError").innerHTML = "";

    } else {
        document.getElementById("telError").innerHTML = "numéro de téléphone invalid";
        document.getElementById("telError").style.color = "red";

    }
	if (verifPassword && (newPassword == newConfirmPassword) && (!isNaN(newTel) && newTel.length == 8)) {
		
		for (let i = 0; i < users.length; i++) {
			if(users[i].idUser == idPrestataire)
			{
				users[i].tel = newTel;
				users[i].password = newPassword;
			}
		}
		localStorage.setItem('users',JSON.stringify(users));

		let timerInterval
		Swal.fire({
			icon: 'success',
			title: 'Compte modifié avec succés',
			html: 'Vous allez être déconnecté après <b></b> millisecondes',
			timer: 10000,
			timerProgressBar: true,
			didOpen: () => {
				Swal.showLoading()
				const b = Swal.getHtmlContainer().querySelector('b')
				timerInterval = setInterval(() => {
					b.textContent = Swal.getTimerLeft()
				}, 100)
			},
			willClose: () => {
			clearInterval(timerInterval)
  			}
			}).then((result) => {
  			/* Read more about handling dismissals below */
  			if (result.dismiss === Swal.DismissReason.timer) {
    		logout();
  			}
		})
	}
}

function savePortfolio() {
	idUser = JSON.parse(localStorage.getItem('connectedUser')).idUser;
	users = JSON.parse(localStorage.getItem('users') || "[]");

	var slogon = document.getElementById('slogon').value;
	if (slogon !== '') {
        document.getElementById("slogonError").innerHTML = "";
    } else {
        document.getElementById("slogonError").innerHTML = "Le champ slogon est obligatoire";
        document.getElementById("slogonError").style.color = "red";
    }
	var description = document.getElementById('description').value;
	var verifDescription = verifLength(description, 30);

	if (verifDescription) {
        document.getElementById("descriptionError").innerHTML = "";
    } else {
        document.getElementById("descriptionError").innerHTML = "La description doit contenir au moins 30 caractères";
        document.getElementById("descriptionError").style.color = "red";
    }
	
	var siteWeb = document.getElementById('siteWeb').value;
	var fb = document.getElementById('fb').value;

	var silverPack = document.getElementById('silverPack').value;
	if (silverPack !== '') {
        document.getElementById("silverPackError").innerHTML = "";
		if (silverPack <= 0 ) {
			document.getElementById("silverPackError").innerHTML = "Merci de choisir un nombre positif";
        	document.getElementById("silverPackError").style.color = "red";
		}
    } else {
        document.getElementById("silverPackError").innerHTML = "Le champ silver pack est obligatoire";
        document.getElementById("silverPackError").style.color = "red";
    }
	var goldPack = document.getElementById('goldPack').value;
	if (goldPack !== '') {
        document.getElementById("goldPackError").innerHTML = "";
		if (goldPack <= 0 ) {
			document.getElementById("goldPackError").innerHTML = "Merci de choisir un nombre positif";
        	document.getElementById("goldPackError").style.color = "red";
		}
    } else {
        document.getElementById("goldPackError").innerHTML = "Le champ gold pack est obligatoire";
        document.getElementById("goldPackError").style.color = "red";
    }
	var platiniumPack = document.getElementById('platiniumPack').value;
	if (platiniumPack !== '') {
        document.getElementById("platiniumPackError").innerHTML = "";
		if (platiniumPack <= 0 ) {
			document.getElementById("platiniumPackError").innerHTML = "Merci de choisir un nombre positif";
        	document.getElementById("platiniumPackError").style.color = "red";
		}
    } else {
        document.getElementById("platiniumPackError").innerHTML = "Le champ platinium pack est obligatoire";
        document.getElementById("platiniumPackError").style.color = "red";
    }
	

	var fakepathCouv = document.getElementById('imageCouv').value;
	var fakepathPhoto1 = document.getElementById('image1').value;
	var fakepathPhoto2 = document.getElementById('image2').value;
	var fakepathPhoto3 = document.getElementById('image3').value;
	var fakepathPhoto4 = document.getElementById('image4').value;

    function replaceCh(ch) {
        var newCh = ch.replace(/\\/g, "/");
        var res = newCh.replace("fakepath", "Users/Marouen/Desktop/gricklo/assets/img/portfolio");
        return res;
    }


    var photoCouv = replaceCh(fakepathCouv);
    var photo1 = replaceCh(fakepathPhoto1);
    var photo2 = replaceCh(fakepathPhoto2);
    var photo3 = replaceCh(fakepathPhoto3);
    var photo4 = replaceCh(fakepathPhoto4);

	if (slogon !== '' && verifDescription && silverPack !== '' && silverPack > 0 &&  goldPack !== '' && goldPack > 0 && platiniumPack !== '' && platiniumPack > 0) {
		
		var portfolio = {
			slogon,
			description,
			photoCouv,
			siteWeb,
			fb,
			silverPack,
			goldPack,
			platiniumPack,
			photo1,
			photo2,
			photo3,
			photo4
		}
		var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
		for (let i = 0; i < users.length; i++) {
			if(idUser == users[i].idUser)
			{
				users[i].portfolio = portfolio;
				connectedUser.portfolio = portfolio;
			}
			
		}
		localStorage.setItem('users',JSON.stringify(users));
		localStorage.setItem('connectedUser',JSON.stringify(connectedUser));
		
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Votre portfolio a été modifié avec succés ',
			showConfirmButton: false,
			timer: 2000
		})
		setTimeout(function() { location.replace('index.html'); }, 3000);
	}

}

function editPortfolio() {
	var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
	if(connectedUser.portfolio != undefined)
	{
	document.getElementById('slogon').value = connectedUser.portfolio.slogon;
	document.getElementById('description').value = connectedUser.portfolio.description;
	document.getElementById('siteWeb').value = connectedUser.portfolio.siteWeb;
	document.getElementById('fb').value = connectedUser.portfolio.fb;
	document.getElementById('silverPack').value = connectedUser.portfolio.silverPack;
	document.getElementById('goldPack').value = connectedUser.portfolio.goldPack;
	document.getElementById('platiniumPack').value = connectedUser.portfolio.platiniumPack;
	}

}

function prestataireDetails(id) {
	localStorage.setItem('idPrestataireToShow',JSON.stringify(id));
}

function displayPrestataireDetails() {
	idPrestataire = JSON.parse(localStorage.getItem('idPrestataireToShow'));
	var prestataires = getPrestataires();
	var findedPrestataire = []

	for (let i = 0; i < prestataires.length; i++) {
		if(prestataires[i].idUser == idPrestataire)
		{
			findedPrestataire = prestataires[i];
		}
	}
	prestataireContent = document.getElementById('prestataireDetails');
	var couv = findedPrestataire.portfolio.photoCouv.slice(33);
	if(JSON.parse(localStorage.getItem('connectedUser')) == null) 
	{
		prestataireContent.innerHTML = `<div style="background-image: url(${couv});
		background-size: cover;
		background-repeat: no-repeat;" class="slider-area" >
	<div class="single-slider hero-overly slider-height3 d-flex align-items-end">
		<div class="container">
			<div class="directory-details-head pb-40">
				<div class="wants-wrapper w-padding3">
					<div class="row align-items-center justify-content-between">
						<div class="col-xxl-8 col-xl-6 col-lg-6">
							<div class="details-cap d-flex">
								
								<div class="properties__caption">
									<h3><a href="#">${findedPrestataire.company}</a></h3>
									<p>${findedPrestataire.portfolio.slogon}</p>
									<div class="img-text">
									<a href="result.html" onclick="addToResult('${findedPrestataire.prestation.toLowerCase()}')"><span>${findedPrestataire.prestation}</span></a>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xxl-4 col-xl-6 col-lg-6">
							<div class="double-btn f-right  d-flex flex-wrap">
								<a href="${findedPrestataire.portfolio.siteWeb}" target="_blank" class="border-btn w-btn wantToWork-btn"><i
										class="fas fa-globe"></i>Website</a>
								<a href="${findedPrestataire.portfolio.fb}" target="_blank" class="btn w-btn wantToWork-btn  ml-20"><i
									 class="fab fa-facebook-f"></i>Facebook</a>
								<a href="tel:+216${findedPrestataire.tel}" class="btn w-btn wantToWork-btn  ml-20"><i
									 class="fas fa-phone-alt"></i>Appeler</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>

	<div class="directory-details section-padding">
	<div class="container">
		<div class="row">
			<div class="col-lg-8">
				<div class="small-tittle mb-20">
					<h2>Description</h2>
				</div>
				<div class="directory-cap mb-40">
					<p>${findedPrestataire.portfolio.description}</p>
				</div>
				<div class="small-tittle mb-20">
					<h2>Gallery</h2>
				</div>
				<div class="gallery-img">
					<div class="row">
						<div class="col-lg-6 col-md-6 col-sm-6">
							<img src="${findedPrestataire.portfolio.photo1}"
								class="mb-30" alt="">
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6">
							<img src="${findedPrestataire.portfolio.photo2}"
								class="mb-30" alt="">
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6">
							<img src="${findedPrestataire.portfolio.photo3}"
								class="mb-30" alt="">
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6">
							<img src="${findedPrestataire.portfolio.photo4}"
								class="mb-30" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>`;
	}

	else if (JSON.parse(localStorage.getItem('connectedUser')).role == 'Client') {
		prestataireContent.innerHTML = `<div style="background-image: url(${couv});
		background-size: cover;
		background-repeat: no-repeat;" class="slider-area" >
	<div class="single-slider hero-overly slider-height3 d-flex align-items-end">
		<div class="container">
			<div class="directory-details-head pb-40">
				<div class="wants-wrapper w-padding3">
					<div class="row align-items-center justify-content-between">
						<div class="col-xxl-8 col-xl-6 col-lg-6">
							<div class="details-cap d-flex">
								<div class="properties__caption">
									<h3><a href="#">${findedPrestataire.company}</a></h3>
									<p>${findedPrestataire.portfolio.slogon}</p>
									<div class="img-text">
									<a href="result.html" onclick="addToResult('${findedPrestataire.prestation.toLowerCase()}')"><span>${findedPrestataire.prestation}</span></a>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xxl-4 col-xl-6 col-lg-6">
							<div class="double-btn f-right  d-flex flex-wrap">
								<a href="${findedPrestataire.portfolio.siteWeb}" target="_blank" class="border-btn w-btn wantToWork-btn"><i
										class="fas fa-globe"></i>Website</a>
								<a href="${findedPrestataire.portfolio.fb}" target="_blank" class="btn w-btn wantToWork-btn  ml-20"><i
									 class="fab fa-facebook-f"></i>Facebook</a>
								<a href="tel:+216${findedPrestataire.tel}" class="btn w-btn wantToWork-btn  ml-20"><i
									 class="fas fa-phone-alt"></i>Appeler</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>

	<div class="directory-details section-padding">
	<div class="container">
		<div class="row">
			<div class="col-lg-8">
				<div class="small-tittle mb-20">
					<h2>Description</h2>
				</div>
				<div class="directory-cap mb-40">
					<p>${findedPrestataire.portfolio.description}</p>
				</div>
				<div class="small-tittle mb-20">
					<h2>Gallery</h2>
				</div>
				<div class="gallery-img">
					<div class="row">
						<div class="col-lg-6 col-md-6 col-sm-6">
							<img src="${findedPrestataire.portfolio.photo1}"
								class="mb-30" alt="">
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6">
							<img src="${findedPrestataire.portfolio.photo2}"
								class="mb-30" alt="">
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6">
							<img src="${findedPrestataire.portfolio.photo3}"
								class="mb-30" alt="">
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6">
							<img src="${findedPrestataire.portfolio.photo4}"
								class="mb-30" alt="">
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="form-wrapper2 pt-30">
					<div class="row ">
						<div class="col-xl-12">
							<div class="small-tittle mb-30">
								<h2>Contact</h2>
							</div>
						</div>
					</div>
					<div id="contact-form2">
						<div class="row">
							<div class="col-lg-7">
								<div class="form-box email-icon mb-15">
									<label for="dateEvent">Date de l'événement:</label>
									<input type="date" id="dateEvent" name="dateEvent">
									<span id="dateEventError"></span>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="form-box email-icon mb-15">
									<label for="number">Nombre des invités</label>
									<input type="number" name="nbInvit" id="nbInvit">
									<span id="nbInvitError"></span>
								</div>
							</div>
							<div class="col-lg-12"> 
								<p>Packs</p>
								<div class="row">

									<div class="form-check col-md-4">
										<input class="form-check-input" type="radio" name="pack" value="${findedPrestataire.portfolio.silverPack}">
										<label class="form-check-label" for="pack">
										<strong>${findedPrestataire.portfolio.silverPack}</strong> TND  [50-100] invités
										</label>
									</div>
									<div class="form-check col-md-4">
										<input class="form-check-input" type="radio" name="pack" value="${findedPrestataire.portfolio.goldPack}">
										<label class="form-check-label" for="pack">
										<strong>${findedPrestataire.portfolio.goldPack}</strong> TND [100-300] invités
										</label>
									</div>
									<div class="form-check col-md-4 mb-15">
										<input class="form-check-input" type="radio" name="pack" value="${findedPrestataire.portfolio.platiniumPack}">
										<label class="form-check-label" for="pack">
										<strong>${findedPrestataire.portfolio.platiniumPack}</strong> TND Plus de 300 invités
										</label>
									</div>
									<span id="packError"></span>
								</div>
								
							</div>
							
							<button class="submit-btn2 mt-2" onclick="addOrder(${findedPrestataire.idUser})">Réserver</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>`;
	}
	else 
	{
		prestataireContent.innerHTML = `<div style="background-image: url(${couv});
		background-size: cover;
		background-repeat: no-repeat;" class="slider-area" >
	<div class="single-slider hero-overly slider-height3 d-flex align-items-end">
		<div class="container">
			<div class="directory-details-head pb-40">
				<div class="wants-wrapper w-padding3">
					<div class="row align-items-center justify-content-between">
						<div class="col-xxl-8 col-xl-6 col-lg-6">
							<div class="details-cap d-flex">
								
								<div class="properties__caption">
									<h3><a href="#">${findedPrestataire.company}</a></h3>
									<p>${findedPrestataire.portfolio.slogon}</p>
									<div class="img-text">
									<a href="result.html" onclick="addToResult('${findedPrestataire.prestation.toLowerCase()}')"><span>${findedPrestataire.prestation}</span></a>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xxl-4 col-xl-6 col-lg-6">
							<div class="double-btn f-right  d-flex flex-wrap">
								<a href="${findedPrestataire.portfolio.siteWeb}" target="_blank" class="border-btn w-btn wantToWork-btn"><i
										class="fas fa-globe"></i>Website</a>
								<a href="${findedPrestataire.portfolio.fb}" target="_blank" class="btn w-btn wantToWork-btn  ml-20"><i
									 class="fab fa-facebook-f"></i>Facebook</a>
								<a href="tel:+216${findedPrestataire.tel}" class="btn w-btn wantToWork-btn  ml-20"><i
									 class="fas fa-phone-alt"></i>Appeler</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>

	<div class="directory-details section-padding">
	<div class="container">
		<div class="row">
			<div class="col-lg-8">
				<div class="small-tittle mb-20">
					<h2>Description</h2>
				</div>
				<div class="directory-cap mb-40">
					<p>${findedPrestataire.portfolio.description}</p>
				</div>
				<div class="small-tittle mb-20">
					<h2>Gallery</h2>
				</div>
				<div class="gallery-img">
					<div class="row">
						<div class="col-lg-6 col-md-6 col-sm-6">
							<img src="${findedPrestataire.portfolio.photo1}"
								class="mb-30" alt="">
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6">
							<img src="${findedPrestataire.portfolio.photo2}"
								class="mb-30" alt="">
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6">
							<img src="${findedPrestataire.portfolio.photo3}"
								class="mb-30" alt="">
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6">
							<img src="${findedPrestataire.portfolio.photo4}"
								class="mb-30" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>`;
	}
	

}

function addOrder(idPrestataire) {

	var idClient = JSON.parse(localStorage.getItem('connectedUser')).idUser;
	var dateEvent = document.getElementById('dateEvent').value;
	if (dateEvent !== '') {
        document.getElementById("dateEventError").innerHTML = "";
    } else {
        document.getElementById("dateEventError").innerHTML = "Le champ date de l'event est obligatoire";
        document.getElementById("dateEventError").style.color = "red";
    }
	var nbInvit = document.getElementById('nbInvit').value;
	if (nbInvit !== '') {
        document.getElementById("nbInvitError").innerHTML = "";
		if (nbInvit <= 0 ) {
			document.getElementById("nbInvitError").innerHTML = "Merci de choisir un nombre positif";
        	document.getElementById("nbInvitError").style.color = "red";
		}
    } else {
        document.getElementById("nbInvitError").innerHTML = "Le champ nombre des invités est obligatoire";
        document.getElementById("nbInvitError").style.color = "red";
    }
	var packs = document.getElementsByName('pack');
	
	var prestataire = searchById(idPrestataire,'users');
	var company = prestataire.company;
	var category = prestataire.prestation;
	var nomPrestataire = prestataire.name;
	var telPrestataire = prestataire.tel;

	var client = searchById(idClient,'users');
	var nomClient = client.name;
	var telClient = client.tel;

	var selectedPack = ''; 
	for (var i = 0; i < packs.length; i++) {
		if (packs[i].checked) {
		  // do whatever you want with the checked radio
		  selectedPack = packs[i].value;
			console.log(selectedPack)
		  // only one radio can be logically checked, don't check the rest
		  break;
		}
	  }


	  if (selectedPack !== '') {
        document.getElementById("packError").innerHTML = "";
    } else {
        document.getElementById("packError").innerHTML = "Merci de choisir un pack";
        document.getElementById("packError").style.color = "red";
    }
	
	if (dateEvent !== '' && nbInvit !== '' && nbInvit > 0 && selectedPack !== '') 
	{
		
	
		var idOrder = JSON.parse(localStorage.getItem('idOrder') || '10');

		var order = {
			idOrder,
			idPrestataire,
			idClient,
			company,
			category,
			nomPrestataire,
			telPrestataire,
			nomClient,
			telClient,
			dateEvent,
			nbInvit,
			selectedPack,
			'status' : 'En attente'
		}

		var orders = JSON.parse(localStorage.getItem('orders') || '[]');
		orders.push(order);
		

		localStorage.setItem('idOrder',idOrder + 1);
		localStorage.setItem('orders',JSON.stringify(orders));
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'La demande a été envoyée ',
			showConfirmButton: false,
			timer: 2000
		})
		setTimeout(function() { location.replace('index.html'); }, 3000);

		
	}
}

function displayOrdersClient() {
	var orders = JSON.parse(localStorage.getItem('orders') || "[]");
	var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
	var ordersClient = document.getElementById('ordersClient');
	


	var myOrders = [];
	for (let i = 0; i < orders.length; i++) {
		if(orders[i].idClient == connectedUser.idUser)
		myOrders.push(orders[i]);	
	}


	for (let i = 0; i < myOrders.length; i++) {
		ordersClient.innerHTML +=`
        <td>${myOrders[i].company}</td>
        <td>${myOrders[i].category}</td>
        <td>${myOrders[i].nomPrestataire}</td>
        <td>${myOrders[i].telPrestataire}</td>
        <td>${myOrders[i].dateEvent}</td>
        <td>${myOrders[i].nbInvit}</td>
        <td>${myOrders[i].selectedPack} DT</td>
        <td>${myOrders[i].status}</td>
		<td style="border-bottom-width: 0px;" class="d-flex align-items-center justify-content-between">
		<a href="#editOrderForm" style="padding-left: 5px;padding-right: 5px;" onclick="editOrder(${myOrders[i].idOrder})" class="genric-btn info-border small" >Editer</a>
        <a href="#" style="padding-left: 5px;padding-right: 5px;"onclick=" deleteOrder(${myOrders[i].idOrder})" class="genric-btn danger-border small">Annuler</a>
		</td>
        </tr>`;

	}

}

function displayOrdersPrestataire() {
	var orders = JSON.parse(localStorage.getItem('orders') || "[]");
	var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
	var ordersPrestataire = document.getElementById('ordersPrestataire');
	


	var myOrders = [];
	for (let i = 0; i < orders.length; i++) {
		if(orders[i].idPrestataire == connectedUser.idUser)
		myOrders.push(orders[i]);	
	}


	for (let i = 0; i < myOrders.length; i++) {
		ordersPrestataire.innerHTML +=`
        <td>${myOrders[i].nomClient}</td>
        <td>${myOrders[i].telClient}</td>
        <td>${myOrders[i].dateEvent}</td>
        <td>${myOrders[i].nbInvit}</td>
        <td>${myOrders[i].selectedPack} DT</td>
        <td>${myOrders[i].status}</td>
		<td style="border-bottom-width: 0px;" class="d-flex align-items-center justify-content-around">
		<a href="#" style="padding-left: 5px;padding-right: 5px; " onclick="confirmOrder(${myOrders[i].idOrder})" class="genric-btn info-border small" disabled >Accepter</a>
        <a href="#" style="padding-left: 5px;padding-right: 5px;"onclick="refuserOrder(${myOrders[i].idOrder})" class="genric-btn danger-border small">Refuser</a>
		</td>
        </tr>`;

	}
}

function deleteOrder(id) {

	Swal.fire({
		title: 'Voulez vous supprimer cette demande?',
		text: "Vous ne pourrez pas revenir en arrière !",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Oui, supprimer'
	  }).then((result) => {
		if (result.isConfirmed) {
			var orders = JSON.parse(localStorage.getItem("orders") || "[]");
			var posOrder;
			for (let i = 0; i < orders.length; i++) {
				if(orders[i].idOrder == id)
				{
					posOrder = i;
				}
				
			}
			// Suppression de l'objet dans le tableau Tab à travers la fonction splice qui prend en paramètres la position de l'élément à supprimer et le nombre des éléments à supprimer à partir de cette position
			orders.splice(posOrder, 1);
			// Sauvegarde du tabelau dans localStoage après la mise à jour
			localStorage.setItem('orders', JSON.stringify(orders));
		  	Swal.fire(
			'Supprimée',
			'Votre demande a été supprimée',
			'success'
		  )
		  setTimeout(function() { location.reload(); }, 3000);
		}
	  })
	
}

function editOrder(id) {

    var order = searchOrderById(id, "orders");

	var findedPrestataire = searchById(order.idPrestataire, "users");
    // Affichage des anciennes valeurs dans chaque input à travers l'attribut value=""
    var editOrderForm = `
    <div class="col-lg-6" style="margin-left:30%">
					<div class="login_form_inner">
						<h3 class="mt-3">Modifier la préstataion</h3>
                        <div>
							         
                            <div class="col-md-12 form-group">
								<input type="date" class="form-control" id="dateEvent" name="dateEvent" value=${order.dateEvent} placeholder="date de l'événement" onfocus="this.placeholder = ''" onblur="this.placeholder = 'date de l'événement'">
								<span id="dateEventError"></span>
							</div>
							<div class="col-md-12 form-group">
								<input type="text" class="form-control" id="nbInvit" value=${order.nbInvit} name="nbInvit" placeholder="Nombre des invités" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nombre des invités'">
								<span id="nbInvitError"></span>
							</div>
							<div class="col-md-12"> 
								<p>Packs</p>
								<div class="row">
									<div class="form-check col-md-4">
										<input class="form-check-input" type="radio" name="pack" value="${findedPrestataire.portfolio.silverPack}">
										<label class="form-check-label" for="pack">
										  ${findedPrestataire.portfolio.silverPack} DT
										</label>
									</div>
									<div class="form-check col-md-4">
										<input class="form-check-input" type="radio" name="pack" value="${findedPrestataire.portfolio.goldPack}">
										<label class="form-check-label" for="pack">
										  ${findedPrestataire.portfolio.goldPack} DT
										</label>
									</div>
									<div class="form-check col-md-4 mb-15">
										<input class="form-check-input" type="radio" name="pack" value="${findedPrestataire.portfolio.platiniumPack}">
										<label class="form-check-label" for="pack">
										  ${findedPrestataire.portfolio.platiniumPack} DT
										</label>
									</div>
								</div>								
							</div>
							<span id="packError"></span>
							
							<div class="col-md-12 form-group text-center">
							<a  onclick="validateEditOrder(${order.idOrder})" class="genric-btn info" >Editer</a>
								
							</div>
						</div>
					</div>
				</div>
    `;

    // Envoi du code html du js vers le html à travers innerHTML
    document.getElementById("editOrderForm").innerHTML = editOrderForm;
}

function validateEditOrder(idOrder) {


	var orders = JSON.parse(localStorage.getItem("orders") || "[]");
	var dateEvent = document.getElementById('dateEvent').value;
	if (dateEvent !== '') {
        document.getElementById("dateEventError").innerHTML = "";
    } else {
        document.getElementById("dateEventError").innerHTML = "Le champ date de l'event est obligatoire";
        document.getElementById("dateEventError").style.color = "red";
    }
	var nbInvit = document.getElementById('nbInvit').value;
	if (nbInvit !== '') {
        document.getElementById("nbInvitError").innerHTML = "";
		if (nbInvit <= 0 ) {
			document.getElementById("nbInvitError").innerHTML = "Merci de choisir un nombre positif";
        	document.getElementById("nbInvitError").style.color = "red";
		}
    } else {
        document.getElementById("nbInvitError").innerHTML = "Le champ nombre des invités est obligatoire";
        document.getElementById("nbInvitError").style.color = "red";
    }
	var packs = document.getElementsByName('pack');
	var selectedPack = '';
	for (var i = 0; i < packs.length; i++) {
		if (packs[i].checked) {
		  // do whatever you want with the checked radio
		  selectedPack = packs[i].value;
	  
		  // only one radio can be logically checked, don't check the rest
		  break;
		}
	}

	if (selectedPack !== '') {
        document.getElementById("packError").innerHTML = "";
    } else {
        document.getElementById("packError").innerHTML = "Merci de choisir un pack";
        document.getElementById("packError").style.color = "red";
    }
	
	if (dateEvent !== '' && nbInvit !== '' && nbInvit > 0 && selectedPack !== '') 
	{
		for (let i = 0; i < orders.length; i++) {
			if (orders[i].idOrder == idOrder) {
				orders[i].dateEvent = dateEvent;
				orders[i].nbInvit = nbInvit;
				orders[i].selectedPack = selectedPack;
				orders[i].status = 'En attente';
			}
			
		}

		localStorage.setItem('orders',JSON.stringify(orders));
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Votre demande a été modifiée ',
			showConfirmButton: false,
			timer: 2000
		})
		setTimeout(function() { location.reload(); }, 3000);
	}	
}

function confirmOrder(id) {
	// Récuperation du tableau dans localStorage
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
	
	for (let i = 0; i < orders.length; i++) {
		if(orders[i].idOrder == id)
		{
			orders[i].status  = 'Confirmée';
		}
		
	}
    // Sauvegarde du tabelau dans localStoage après la mise à jour
    localStorage.setItem('orders', JSON.stringify(orders));
    

    Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'La demande a été acceptée ',
		showConfirmButton: false,
		timer: 2000
	})
	setTimeout(function() { location.reload(); }, 3000);

	
}

function refuserOrder(id) {
	// Récuperation du tableau dans localStorage
    
    

	Swal.fire({
		title: 'Voulez vous supprimer cette demande?',
		text: "Vous ne pourrez pas revenir en arrière !",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Oui, supprimer'
	  }).then((result) => {
		if (result.isConfirmed) {
			var orders = JSON.parse(localStorage.getItem("orders") || "[]");
	
			for (let i = 0; i < orders.length; i++) {
				if(orders[i].idOrder == id)
				{
					orders[i].status  = 'Non disponible';
				}
		
			}
    		// Sauvegarde du tabelau dans localStoage après la mise à jour
    		localStorage.setItem('orders', JSON.stringify(orders));
		  	Swal.fire(
			'Supprimée',
			'La demande a été supprimée',
			'success'
		  	)
		  setTimeout(function() { location.reload(); }, 3000);
		}
	  })
	
}

function searchPr(e) {
    // Récupération du code du bouton cliqué du clavier
    var code = e.keyCode;

    // Si le code =13 c'est à dire c'est le code du bouton entrée 
    if (code == 13) {
        // Donc on récupere la valeur à rechercher
        var search = document.getElementById("search_input").value.toLowerCase();
        // Stockage de la valeur dans une clé categoryToSearch
        localStorage.setItem("valueTosearch",search);
        // Vers la page result.html pour afficher le résultat de recherche     
        location.replace("result.html");

    }
}

function searchGouv(e) {
    // Récupération du code du bouton cliqué du clavier
    var code = e.keyCode;

    // Si le code =13 c'est à dire c'est le code du bouton entrée 
    if (code == 13) {
        // Donc on récupere la valeur à rechercher
        var search = document.getElementById("search_gouv").value.toLowerCase();
        // Stockage de la valeur dans une clé categoryToSearch
        localStorage.setItem("valueTosearch",search);
        // Vers la page result.html pour afficher le résultat de recherche     
        location.replace("result.html");

    }
}

function searchCategory(e) {
    // Récupération du code du bouton cliqué du clavier
    var code = e.keyCode;

    // Si le code =13 c'est à dire c'est le code du bouton entrée 
    if (code == 13) {
        // Donc on récupere la valeur à rechercher
        var search = document.getElementById("search_category").value.toLowerCase();
        // Stockage de la valeur dans une clé categoryToSearch
        localStorage.setItem("valueTosearch",search);
        // Vers la page result.html pour afficher le résultat de recherche     
        location.replace("result.html");

    }
}

function addToResult(category) {
	localStorage.setItem("valueTosearch",category);
}

function displayResult() {
	var prestatairesContent = document.getElementById('allPrestatairesContent');
	var valueToSearch = localStorage.getItem("valueTosearch");
	var resultNumber = document.getElementById('resultNumber');
	var prestataires = getPrestataires();
	
	var prestatairesFounded = [];
	var regex = new RegExp("(" + valueToSearch + ")");
	
	prestataires.forEach(element => {
		
		if (regex.test(element.name.toLowerCase())|| regex.test(element.address.toLowerCase()) || regex.test(element.company.toLowerCase()) || regex.test(element.prestation.toLowerCase())) {
			prestatairesFounded.push(element)	
		}
	});
	resultNumber.innerHTML = `<span> (${prestatairesFounded.length}) Prestataires disponibles</span>`;

	
	for (let i = 0; i < prestatairesFounded.length; i++) {
		prestatairesContent.innerHTML += `<div  class="col-lg-4">
		<div class="properties properties2 pb-30">
			<div class="properties-card">
				<div class="properties-img overlay1">
				<a href="prestataire-details.html" onclick="prestataireDetails(${prestatairesFounded[i].idUser})"><img 
						src="${prestatairesFounded[i].portfolio.photoCouv}"
				 		alt=""></a>
					<div class="img-text">
					<a href="result.html" onclick="addToResult('${prestatairesFounded[i].prestation.toLowerCase()}')"><span>${prestatairesFounded[i].prestation}</span></a>
					</div>
					
				</div>
				<div class="properties-caption">
					<h3>
						<a href="prestataire-details.html" onclick="prestataireDetails(${prestatairesFounded[i].idUser})">${prestatairesFounded[i].company}</a>
						<img src="assets/img/gallery/xvarified.png.pagespeed.ic.WKI_FS8TqB.png"
							alt="">
					</h3>
					<a href="result.html" onclick="addToResult('${prestatairesFounded[i].address.toLowerCase()}')"><p><i class="fas fa-map-marker-alt"></i>${prestatairesFounded[i].address}</p></a>
				</div>
				<div
					class="properties-footer d-flex justify-content-between align-items-center flex-wrap">
					<div class="restaurant-name">
						<i class="fas fa-user"></i>
						<h3><a>${prestatairesFounded[i].name}</a></h3>
					</div>
					<div class="contact">
						<ul>
							<li><i class="fas fa-phone-alt"></i></li>
							<li><i class="far fa-envelope"></i></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
		`
		
	}
}