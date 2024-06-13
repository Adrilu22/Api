async function actualizar() {
    let formulario = document.forms["actualizarEstudiante"];

    let estudiante = {
        nom_e: formulario["nom_e"].value,
        dir_e: formulario["dir_e"].value,
        tel_e: formulario["tel_e"].value,
        fech_nac: formulario["fech_nac"].value,
        cod_e: parseInt(formulario["cod_e"].value)
    };

    let id = formulario["cod_e"].value;
    let uri = "http://127.0.0.1:3000/api/estudiantes/" + id; // Cambia la URL según la estructura de tu servidor

    try {
        let respuesta = await putData(uri, estudiante);

        let parrafoRespuesta = document.getElementById("respuesta");
        parrafoRespuesta.innerHTML = "Se actualizó correctamente el estudiante con código " + id;

        generarLinkDescarga(estudiante);
    } catch (error) {
        console.error("Error:", error);
        let parrafoRespuesta = document.getElementById("respuesta");
        parrafoRespuesta.innerHTML = "Hubo un error al actualizar el estudiante.";
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

function generarLinkDescarga(estudiante) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(estudiante));
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.setAttribute("href", dataStr);
    downloadLink.setAttribute("download", "estudiante.json");
    downloadLink.style.display = "block";
    downloadLink.innerHTML = "Descargar JSON";
}
