document.addEventListener("DOMContentLoaded", function() {

    let bebidas = [
        { nombre: 'Martini', precio: 2550 },
        { nombre: 'Cappuccino', precio: 1370 },
        { nombre: 'Latte', precio: 1350 },
        { nombre: 'Mojito', precio: 2290 }
    ];

    let comidas = [
        {
            nombre: 'Insalata di riso',
            descripcion: "L'insalata di riso é un classico delle ricette estive. Veloce e facile da preparare, l'insalata di riso si pub insaporire con gli ingredienti più vari.",
            precio: 6750,
            imagen: 'https://luccispizzaandpasta.com/wp-content/uploads/2017/03/11-1-600x600.png'
        },
        {
            nombre: 'Insalata ai cipollotti',
            descripcion: "Più delicati delle cipolle, i cipollotti sono perfetti in insalata, sul pesce e sulla carne.",
            precio: 5990,
            imagen:'https://martinokitchen.com/wp-content/uploads/2017/03/12-1.png'
        },
        {
            nombre: 'Insalata caprese',
            descripcion: "Questo piatto è un culto della città partenopea dove la mozzarella è protagonista di moltissimi piatti.",
            precio: 8250,
            imagen:'https://www.lilvienna.com/wp-content/uploads/Recipe-Classic-Italian-Caprese-Salad.jpg'
        }
    ];

    let listaBebestible = document.getElementById('bebidas-lista');
    let listaComida = document.getElementById('menu-lista');
    let cuentaLista = document.getElementById('cuentaTotal');
    let totalCuenta = 0;

    function formatearMoneda(cantidad) {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(cantidad);
    }

    function agregarItemAlTotal(nombre, precio) {
        let cuentaItem = document.createElement('div');
        cuentaItem.classList.add('cuenta-item');
        cuentaItem.innerHTML = `<span>${nombre}</span><span>${formatearMoneda(precio)}</span>`;
        cuentaLista.insertBefore(cuentaItem, document.getElementById('fila2'));
        totalCuenta += precio;
        actualizarTotal();
    }

    function removerItemDelTotal(nombre, precio) {
        let items = cuentaLista.querySelectorAll('.cuenta-item');
        items.forEach(item => {
            if (item.firstChild.textContent === nombre) {
                cuentaLista.removeChild(item);
                totalCuenta -= precio;
            }
        });
        actualizarTotal();
    }

    function actualizarTotal() {
        document.getElementById('totalAmount').textContent = formatearMoneda(totalCuenta);
    }

    bebidas.forEach((bebida, index) => {
        let bebidaItem = document.createElement('li');
        bebidaItem.classList.add('list-group-item', 'bebida-item');
        bebidaItem.innerHTML = `
            <input type="checkbox" class="form-check-input-bebidas" id="beber${index}">
            <label class="form-check-label" for="beber${index}">${bebida.nombre}</label>
            <p class="precio-bebida"><strong>${formatearMoneda(bebida.precio)}</strong></p>`;
        listaBebestible.appendChild(bebidaItem);

        document.getElementById(`beber${index}`).addEventListener('change', function() {
            if (this.checked) {
                agregarItemAlTotal(bebida.nombre, bebida.precio);
            } else {
                removerItemDelTotal(bebida.nombre, bebida.precio);
            }
        });
    });

    comidas.forEach((comida, index) => {
        let comidaItem = document.createElement('li');
        comidaItem.classList.add('list-group-item', 'comida-item');
        comidaItem.innerHTML = `
        <div class="item-content">
            <input type="checkbox" class="form-check-input" id="comida${index}">
            <label class="form-check-label" for="comida${index}"></label>
            <div class="text-content">
                <h5 id="tituloComida${index}">${comida.nombre}</h5>
                <p id="descripcionComida${index}" class="descripcion">${comida.descripcion}</p>
                <p id="precioComida${index}" class="precio"><strong>${formatearMoneda(comida.precio)}</strong></p>
            </div>
            <img src="${comida.imagen}" alt="${comida.nombre}">
        </div>`;
        listaComida.appendChild(comidaItem);

        document.getElementById(`comida${index}`).addEventListener('change', function() {
            if (this.checked) {
                agregarItemAlTotal(comida.nombre, comida.precio);
            } else {
                removerItemDelTotal(comida.nombre, comida.precio);
            }
        });
    });

    actualizarTotal(); 

});

