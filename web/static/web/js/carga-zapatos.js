import { enviarZapato } from "./zapato.js";

export const obtenerZapatos = async () => {
    try {
        const response = await fetch("https://api-zapatos-arq3.onrender.com/zapatos");
        const data = response.json();
        return data;
    } catch (error) {
        console.log(`el error es ${error}`);
    }
};

const crearTodasCards = (zapatos) => {
    let ZapatosRow = document.getElementById("ZapatosRow");
    
    zapatos.map((zapato) => {
        const {
            id,
            nombre,
            descripcion,
            img,
            modelo,
            precioReferencial,
            stock,
            detalles
        } = zapato;

        // Card completo
        const zapatoCard = document.createElement("div");
        zapatoCard.classList.add("card");
        zapatoCard.classList.add("color-bg-5");
        zapatoCard.classList.add("kanit-light");

        const divZapatoYName = document.createElement("div");
        divZapatoYName.classList.add("text-center");

        const divImgZapato = document.createElement("div");
        divImgZapato.classList.add("img");

        const aImgZapato = document.createElement("button");
        aImgZapato.classList.add("btn");
        aImgZapato.addEventListener("click",()=>{
            enviarZapato(id,
                nombre,
                descripcion,
                img,
                modelo,
                precioReferencial,
                stock,
                detalles)
        });

        const imgZapato = document.createElement("img");
        imgZapato.src = img;
        imgZapato.width = 200;

        const h2NameZapato = document.createElement("h2");
        h2NameZapato.classList.add("product-name");
        h2NameZapato.textContent = nombre;

        const divPrecioYStock = document.createElement("div");
        divPrecioYStock.classList.add("d-flex");
        divPrecioYStock.classList.add("justify-content-evenly");

        const h3ProductPrice = document.createElement("h3");
        h3ProductPrice.classList.add("product-price");
        h3ProductPrice.textContent = `$${precioReferencial}`;

        const h3ProductStock = document.createElement("h3");
        h3ProductStock.classList.add("product-stock");
        h3ProductStock.textContent = `#${stock}`;

        const pDescripcionProducto = document.createElement("p");
        pDescripcionProducto.classList.add("product-desc");
        pDescripcionProducto.textContent = `Descripcion: ${descripcion}`;

        const ulDetalles = document.createElement("ul");
        ulDetalles.textContent = `Detalles:`;

        for (const propiedad in detalles) {
            const liDetalle = document.createElement("li");
            liDetalle.textContent=`${propiedad}: ${detalles[propiedad]}`;
            ulDetalles.appendChild(liDetalle);
        }
        pDescripcionProducto.appendChild(ulDetalles);

        divPrecioYStock.appendChild(h3ProductPrice);
        divPrecioYStock.appendChild(h3ProductStock);

        aImgZapato.appendChild(imgZapato);
        divImgZapato.appendChild(aImgZapato);
        
        divZapatoYName.appendChild(divImgZapato);
        divZapatoYName.appendChild(h2NameZapato);

        zapatoCard.appendChild(divZapatoYName);
        zapatoCard.appendChild(divPrecioYStock);
        zapatoCard.appendChild(pDescripcionProducto);

        ZapatosRow.appendChild(zapatoCard);
    });
};

obtenerZapatos().then((zapatos) => {
    crearTodasCards(zapatos);
});
