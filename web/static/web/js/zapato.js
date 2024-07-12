

export const enviarZapato = (id,
    nombre,
    descripcion,
    img,
    modelo,
    precioReferencial,
    stock,
    detalles) =>{

        const rutaArchivoHTML = "../../../templates/zapateria/zapato.html";

        fetch(rutaArchivoHTML)
            .then(response => response.text())
            .then((html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                const nombreZapato= doc.getElementById("nombre");
                nombreZapato.textContent=nombre;

                const precioZapato=doc.getElementById("precio");
                precioZapato.textContent=precioReferencial;

                const descZapato=doc.getElementById("desc");
                descZapato.textContent=descripcion;

                for (const propiedad in detalles) {
                    const det1Zapato=doc.getElementById("detail-"+propiedad);
                    det1Zapato.textContent=`${propiedad}: ${detalles[propiedad]}`;
                    console.log(`${propiedad}: ${detalles[propiedad]}`);
                };

                const imgZapato=doc.getElementById("imgZapato");
                imgZapato.style.backgroundImage=`url(${img})`;
                imgZapato.style.left="-35px";
                imgZapato.style.height="900px";                

                const nuevoHTML= new XMLSerializer().serializeToString(doc);
                document.body.innerHTML = nuevoHTML;

                const btnComprar = document.getElementById("btnComprar");
                if (btnComprar) {
                    btnComprar.addEventListener('click', () => {
                        console.log('btnComprar clicked');
                        comprarZapato(id);
                    });
                    console.log("Listener added to btnComprar");
                } else {
                    console.log("btnComprar not found");
                }
                

                
            })        
    }



const comprarZapato = async (id) => {console.log("comprarZapato called with id:", id);
    try {
        const response = await fetch(`https://api-zapatos-arq3.onrender.com/zapatos/${id}`);
        const data = await response.json();

        console.log("Zapato data fetched:", data);

        // Verificar si hay suficiente stock
        if (data.stock > 0) {
            // Reducir el stock
            data.stock -= 1;

            // Enviar la actualización a la API
            const updateResponse = await fetch(`https://api-zapatos-arq3.onrender.com/zapatos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (updateResponse.ok) {
                alert('Compra realizada con éxito');
                // Redirigir al index o a la página que desees
                window.location.href = './index.html';
            } else {
                throw new Error('Error al actualizar el stock');
            }
        } else {
            alert('No hay suficiente stock disponible');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Error al realizar la compra: ${error.message}`);
    }
}
