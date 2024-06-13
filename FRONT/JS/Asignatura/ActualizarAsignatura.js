
async function actualizar() {
    let formulario = document.forms["actualizarAsignatura"];

    let asignatura = {
        nom_a: formulario["nom_a"].value,
        ih: parseInt(formulario["ih"].value),
        cred: parseInt(formulario["cred"].value),
        cod_a: parseInt(formulario["cod_a"].value)
    };

    let id = formulario["cod_a"].value;
    let uri = "http://127.0.0.1:3000/api/asignaturas/" + id; // Cambia la URL según la estructura de tu servidor

    try {
        let respuesta = await putData(uri, asignatura);

        let parrafoRespuesta = document.getElementById("respuesta");
        parrafoRespuesta.innerHTML = "Se actualizó correctamente la asignatura con código " + id;

        generarLinkDescarga(asignatura);
    } catch (error) {
        console.error("Error:", error);
        let parrafoRespuesta = document.getElementById("respuesta");
        parrafoRespuesta.innerHTML = "Hubo un error al actualizar la asignatura.";
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
