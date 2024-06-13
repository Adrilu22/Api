async function eliminar() {
    let id = document.getElementById("id_p").value;

    let uri = "http://127.0.0.1:3000/api/profesores/" + id; // Cambia la URL según la estructura de tu servidor

    try {
        let respuesta = await deleteData(uri);

        console.log(respuesta);

        let titulo = document.getElementById("titulo");
        titulo.style.visibility = "visible";

        if (respuesta.status >= 200 && respuesta.status < 300) {
            titulo.innerHTML = "Se eliminó el profesor con ID: " + id;
        } else if (respuesta.status >=400 && respuesta.status < 500) {
            titulo.innerHTML = "Hubo un error al eliminar al profesor con ID: " + id;
        } else {
            titulo.innerHTML = "Hubo un error al eliminar al profesor con ID: " + id;
        }

        generarLinkDescarga({ id_p: id }); // Generar el enlace de descarga del JSON
    } catch (error) {
        console.error("Error:", error);
    }
}

async function deleteData(url) {
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Hubo un problema al eliminar el profesor");
        }

        return response;
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
