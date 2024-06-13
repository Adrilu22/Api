async function adicionar() {
    let formulario = document.forms["adicionarEstudiante"];

    let estudiante = {
        nom_e: formulario["nom_e"].value,
        dir_e: formulario["dir_e"].value,
        tel_e: formulario["tel_e"].value,
        fech_nac: formulario["fech_nac"].value,
        cod_e: parseInt(formulario["cod_e"].value)
    };

    console.log(estudiante);

    let uri = "http://127.0.0.1:3000/api/estudiantes";

    try {
        let respuesta = await postData(uri, estudiante);

        let parrafoRespuesta = document.getElementById("respuesta");
        parrafoRespuesta.innerHTML = "Se registró correctamente el estudiante";

        generarLinkDescarga(estudiante); // Generar el enlace de descarga del JSON
    } catch (error) {
        console.error("Error:", error);
        let parrafoRespuesta = document.getElementById("respuesta");
        parrafoRespuesta.innerHTML = "Hubo un error al registrar el estudiante.";
    }
}

async function postData(url, data) {
    try {
        const response = await fetch(url, {
            method: "POST",
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

function generarLinkDescarga(estudiante) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(estudiante));
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.setAttribute("href", dataStr);
    downloadLink.setAttribute("download", "estudiante.json");
    downloadLink.style.display = "block";
    downloadLink.innerHTML = "Descargar JSON";
}
