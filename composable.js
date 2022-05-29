$(document).ready( function () {

    async function getProduct(link) {
        let url = link;
        try {
            let res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }

    async function renderPizzaOrComposable(link, product) {
        let users = await getProduct(link);

        let html = '';
        if(product=="pizza"){

        users.forEach(user => {
            let htmlSegment = `
        <div>
            <option value="${user.name}">${user.name}</option>

        </div>
        `
            html += htmlSegment;


        });
        let container = document.querySelector('#pizza-select');
        container.innerHTML = html;
    }
    else if(product=="composable"){

        users.forEach(user => {
            let htmlSegment = `
                <div>
                    <input type="checkbox" id="${user.name}" name="${user.name}">
                    <label for="${user.name}">${user.name} ${user.price}€</label>
                </div>
                `
            html += htmlSegment;


        });
        let container = document.querySelector('#composable-select');
        container.innerHTML = html;
    }
    }
    
    // Affichage des produits

    renderPizzaOrComposable("http://localhost:3000/produit/pizza", "pizza"); 
    renderPizzaOrComposable("http://localhost:3000/produit/composable", "composable"); 





});


