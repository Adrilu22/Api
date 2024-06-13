async function actualizar() {
    let formulario = document.forms["actualizarImparte"];

    let imparte = {
        id_p: formulario["id_p"].value,
        cod_a: parseInt(formulario["cod_a"].value),
        grupo: parseInt(formulario["grupo"].value),
        horario: parseInt(formulario["horario"].value)
    };

    let id = formulario["id_p"].value;
    let uri = "http://127.0.0.1:3000/api/imparte/" + id; // Cambia la URL según la estructura de tu servidor

    try {
        let respuesta = await putData(uri, imparte);

        let parrafoRespuesta = document.getElementById("respuesta");
        parrafoRespuesta.innerHTML = "Se actualizó correctamente la asignatura con código " + id;

        generarLinkDescarga(imparte);
    } catch (error) {
        console.error("Error:", error);
        let parrafoRespuesta = document.getElementById("respuesta");
        parrafoRespuesta.innerHTML = "Hubo un error al actualizar imparte.";
    }
}

async function putData(url, data) {
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const result = await response.json();
        console.log("Respuesta:", result); // Puedes quitar esto si no quieres imprimir en la consola
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

function generarLinkDescarga(asignatura) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(asignatura));
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.setAttribute("href", dataStr);
    downloadLink.setAttribute("download", "asignatura.json");
    downloadLink.style.display = "block";
    downloadLink.innerHTML = "Descargar JSON";
}
