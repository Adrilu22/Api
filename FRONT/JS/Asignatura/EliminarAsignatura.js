async function eliminar() {
    let id = document.getElementById("cod_a").value; // Cambié "cod_e" por "cod_a" para que coincida con el ID del input en el HTML

    let uri = "http://127.0.0.1:3000/api/asignaturas/" + id; // Corregí la URL según la estructura de tu servidor

    try {
        let respuesta = await deleteData(uri);

        console.log(respuesta);

        let titulo = document.getElementById("titulo");
        titulo.style.visibility = "visible";

        if (respuesta.status >= 200 && respuesta.status < 300) {
            titulo.innerHTML = "Se eliminó la asignatura con ID: " + id;
            generarLinkDescarga({ id: id }); // Llama a la función para generar el enlace de descarga del JSON
        } else if (respuesta.status >= 400 && respuesta.status < 500) {
            titulo.innerHTML = "Hubo un error al eliminar la asignatura con ID: " + id;
        } else {
            titulo.innerHTML = "Hubo un error al eliminar la asignatura con ID: " + id;
        }
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
            throw new Error("Hubo un problema al eliminar la asignatura");
        }

        return response;
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
