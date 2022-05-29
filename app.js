$(document).ready(function () {



    async function getProduct(link) {
        let url = link;
        try {
            let res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }

    async function renderProduct(link, produit) {
        let users = await getProduct(link);
        let html = '';

        if (produit === "pizza") {
            users.forEach(user => {
                let htmlSegment = `
                            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <img src="${user.path_img}" width=100 height=100>
                            <p id="description" name="${user.name}">${user.name}</p>
                            <p id="description" name="description">${user.description}</p>
                            <button type="button" id="personnaliser" id="personnaliser"
                                class="btn btn-outline-secondary">Personnaliser</button>
                            <button type="button" id="add"  name="${user.name}" price="${user.price}" id="add"
                                class="btn btn-outline-success">Ajouter au panier ${user.price}€</button>
                            </div>`
                html += htmlSegment;


            });
            let container = document.querySelector('#section');
            container.innerHTML = html;
            $('button[id^="personnaliser"]').click(function () {
                window.location.href = 'compose'
            });

            $('button[id^="add"]').click(function () {
                var x = $(this).attr('name');
                var x2 = $(this).attr('price');
                addPanier(x, x2);

                //showPanier(x, x2);
                showTab(panierFinal, prixFinal)


            });
        }
        else if (produit == "menu") {

            users.forEach(user => {
                let htmlSegment = `
                            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <a id="${user.size}" cursor: pointer;>
                            <img src="${user.path_img}" width=100 height=100 /></a>
                            <p id="description" size="${user.size}"name="${user.name}">${user.name}</p>
                            <p id="description" name="description">${user.description}</p>
                            
                        </div>`
                html += htmlSegment;


            });

            let container = document.querySelector('#section');
            container.innerHTML = html;
            $('a[id^="petit"').click(function () {
                addPanier("Petit Menu", "5");

                //showPanier(x, x2);
                showTab(panierFinal, prixFinal)
                window.location.href = 'menu'


            });
            $('a[id^="moyen"').click(function () {
                addPanier("Moyen Menu", "7");

                //showPanier(x, x2);
                showTab(panierFinal, prixFinal)
                window.location.href = 'menu'

            });
            $('a[id^="grand"').click(function () {
                //panierFinal.push("Grand Menu")
                //prixFinal.push("10");


                addPanier("Grand Menu", "10");

                //showPanier(x, x2);
                showTab(panierFinal, prixFinal)
                window.location.href = 'menu'

            });

        }
        else {

            users.forEach(user => {
                let htmlSegment = `
                            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <img src="${user.path_img}" width=100 height=100>
                            <p id="description" name="${user.name}">${user.name}</p>
                            <p id="description" name="description">${user.description}</p>
                            <button type="button" id="add"  name="${user.name}" price="${user.price}" id="add"
                                class="btn btn-outline-success">Ajouter au panier ${user.price}€</button>
                        </div>`
                html += htmlSegment;


            });
            let container = document.querySelector('#section');
            container.innerHTML = html;
            $('button[id^="add"]').click(function () {
                var x = $(this).attr('name');
                var x2 = $(this).attr('price');
                addPanier(x, x2);

                //showPanier(x, x2);
                showTab(panierFinal, prixFinal)


            });

        }



    }

    const prod = ["menu", "pizza", "entree", "sauce", "dessert", "boisson"];

    // Affichage des produits
    prod.forEach(o =>
        $("#" + o + "-click").click(function () { renderProduct("http://localhost:3000/produit/" + o, o); }))
    prod.forEach(o =>
        $("#" + o + "-click2").click(function () { renderProduct("http://localhost:3000/produit/" + o, o); }))



    let panierFinal = [];
    let prixFinal = [];
    let total = 0;


    function addPanier(produit, price) {
        panierFinal.push(produit);
        prixFinal.push(price);
        localStorage.setItem("Panier", panierFinal);
        localStorage.setItem('Prix', prixFinal);

        console.log(panierFinal);
    }




    function showTab(tab, tabprice) {
        $('article').empty();

        for (let i = 0; i < tab.length; i++) {
            if(tabprice[i]==0){
                $('article').append(tab[i] + ' ' +
                '<button type="button" id="' + tab[i] + '" class="btn-danger">x</button><br>');
            $('button[id^="' + tab[i] + '"]').click(function () {

                console.log('Removal of product ' + tab[i]);
                deletePanier(tab[i]);


            });

            }else{
                $('article').append(tab[i] + ' ' + tabprice[i] + ' € ' +
                '<button type="button" id="' + tab[i] + '" class="btn-danger">x</button><br>');
            $('button[id^="' + tab[i] + '"]').click(function () {

                console.log('Removal of product ' + tab[i]);
                deletePanier(tab[i]);


            });
            }
            
        }
        var total = 0;
        for (let i = 0; i < prixFinal.length; i++) {
            total += parseInt(prixFinal[i]);
        }
        localStorage.setItem("Total", total);

        $('#price').text('Total : ' + total + ' €');



    }

    function deletePanier(product) {
        let cpt = 0;
        var newTab = []
        var newTabprix = [];
        var c = 0;
        for (let i = 0; i < panierFinal.length; i++) {
            if (panierFinal[i] == product && c == 0) {
                cpt++;
                c = 1;
            }
            else {
                newTab.push(panierFinal[i]);
                newTabprix.push(prixFinal[i])
            }
        }
        panierFinal = newTab;
        prixFinal = newTabprix
        console.log("NEWTAB ");
        console.log(newTab);
        $('article').empty();

        showTab(panierFinal, prixFinal);
        localStorage.setItem("Panier", panierFinal);
        localStorage.setItem('Prix', prixFinal);
    }






    $('#envoie').click(function () {
        localStorage.clear();
    })

    
    console.log(localStorage.getItem('Panier'));
    let cpt=0;
    var str="";
    for(var i=0; i<localStorage.getItem("Panier").length; i++) {
        if(localStorage.getItem("Panier").charAt(i)==","){
            str="";
            cpt++;
        }else{
            str+=localStorage.getItem("Panier").charAt(i)
            panierFinal[cpt]=str;
        }
    }
    cpt=0;
    str="";
    for(var i=0; i<localStorage.getItem("Prix").length; i++) {
        if(localStorage.getItem("Prix").charAt(i)==","){
            str="";
            cpt++;
        }else{
            str+=localStorage.getItem("Prix").charAt(i)
            prixFinal[cpt]=str;
        }
    }
    console.log("PANIER ");
    console.log(prixFinal);
    showTab(panierFinal,prixFinal);


    $('button[id^="commande"]').click(function () {
        console.log("commande");
        window.location.href = 'form'
        
        
    })

    async function renderProduct2(link, product) {
        let users = await getProduct(link);
        let html = '';
      
        users.forEach(user => {
          let htmlSegment = `
       
            <img src="${user.path_img}" width=200 height=200
            
            <button type="button" id="add"  name="${user.name}" price="${user.price}" id="add"
            class="btn btn-outline-info"></button> 
            </img>
      
            `
      
          html += htmlSegment;
      
      
        });
        let container = document.querySelector('#' + product);
        container.innerHTML = html;
        $('img[id^="add"]').click(function () {
      
          if (take != 1) {
            var x = "[Menu] " + $(this).attr('name');
            
            addPanier(x, 0);
      
            //showPanier(x, x2);
            showTab(panierFinal, prixFinal)
            take++;
          }
      
        });
      }
      
      var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;

    if (content.style.display === "inline") {
      console.log(take);
      content.style.display = "none";
    } else {
      content.style.display = "inline";
      renderProduct2('http://localhost:3000/produit/pizza', 'pizza');
      take = 0;
      renderProduct2('http://localhost:3000/produit/entree', 'entree');
      take = 0;
      renderProduct2('http://localhost:3000/produit/boisson', 'boisson');
      take = 0;
      renderProduct2('http://localhost:3000/produit/sauce', 'sauce');
      take = 0;
      renderProduct2('http://localhost:3000/produit/dessert', 'dessert');


    }
  });
}
      
 var Tot=0;
        for (let i = 0; i < prixFinal.length; i++) {
            Tot += parseInt(prixFinal[i]);
        }

    $.ajax({
        url: '/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            panierFinal,
            prixFinal,
            Tot
        })
    }
    )   // console.log(priceToServer);
});
