async function actualizar() {
    let formulario = document.forms["actualizarProfesor"];

    let profesor = {
        nom_p: formulario["nom_p"].value,
        profesion: formulario["profesion"].value,
        tel_p: formulario["tel_p"].value,
        id_p: parseInt(formulario["id_p"].value)
    };

    let id = formulario["id_p"].value;

    console.log(profesor);

    let uri = "http://127.0.0.1:3000/api/profesores/" + id; // Corregido el URI

    try {
        let respuesta = await putData(uri, profesor);

        let parrafoRespuesta = document.getElementById("respuesta");

        parrafoRespuesta.innerHTML = "Se actualizó correctamente el profesor con ID " + id;

        generarLinkDescarga(profesor); // Generar el enlace de descarga del JSON
    } catch (error) {
        console.error("Error:", error);
        let parrafoRespuesta = document.getElementById("respuesta");
        parrafoRespuesta.innerHTML = "Hubo un error al actualizar el profesor.";
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
        console.log("Respuesta:", result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

function generarLinkDescarga(data) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute("href", dataStr);
    downloadLink.setAttribute("download", "profesor.json");
    downloadLink.innerHTML = "Descargar JSON";
    document.body.appendChild(downloadLink);
}
