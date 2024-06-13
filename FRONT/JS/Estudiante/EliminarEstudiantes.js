async function eliminar() {
    let id = document.getElementById("cod_e").value;

    let uri = "http://127.0.0.1:3000/api/estudiantes/" + id; // Cambia la URL según la estructura de tu servidor

    try {
        let respuesta = await deleteData(uri);

        let titulo = document.getElementById("titulo");
        titulo.style.visibility = "visible";

        if (respuesta.ok) {
            titulo.innerHTML = "Se eliminó el estudiante con ID: " + id;
            generarLinkDescarga({ cod_e: id });
        } else {
            let errorMessage = await respuesta.text();
            titulo.innerHTML = "Hubo un error al eliminar al estudiante con ID: " + id + ". " + errorMessage;
        }
    } catch (error) {
        console.error("Error:", error);
        let titulo = document.getElementById("titulo");
        titulo.style.visibility = "visible";
        titulo.innerHTML = "Hubo un error al eliminar al estudiante con ID: " + id + ". " + error.message;
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
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

function generarLinkDescarga(estudiante) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(estudiante));
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.setAttribute("href", dataStr);
    downloadLink.setAttribute("download", "estudiante_eliminado.json");
    downloadLink.style.display = "block";
    downloadLink.innerHTML = "Descargar JSON";
}
