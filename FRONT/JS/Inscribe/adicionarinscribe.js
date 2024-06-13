async function adicionar() {
    console.log("adicionar function called");
    let formulario = document.forms["adicionarInscripcion"];

    let inscripcion = {
        cod_e: parseInt(formulario["cod_e"].value),
        id_p: parseInt(formulario["id_p"].value),
        cod_a: parseInt(formulario["cod_a"].value),
        grupo: parseInt(formulario["grupo"].value),
        n1: parseFloat(formulario["n1"].value),
        n2: parseFloat(formulario["n2"].value),
        n3: parseFloat(formulario["n3"].value)
    };

    console.log(inscripcion);

    let uri = "http://127.0.0.1:3000/api/inscribe"; // URL correspondiente para la inserción en la tabla Inscribe

    try {
        let respuesta = await postData(uri, inscripcion);

        let parrafoRespuesta = document.getElementById("respuesta");

        parrafoRespuesta.innerHTML = "Se registraron correctamente las notas.";

        generarLinkDescarga(inscripcion); // Llama a la función para generar el enlace de descarga del JSON
    } catch (error) {
        console.error("Error:", error);
        let parrafoRespuesta = document.getElementById("respuesta");
        parrafoRespuesta.innerHTML = "Hubo un error al registrar las notas.";
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

function generarLinkDescarga(inscripcion) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inscripcion));
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.setAttribute("href", dataStr);
    downloadLink.setAttribute("download", "inscribe.json");
    downloadLink.style.display = "block";
    downloadLink.innerHTML = "Descargar JSON";
}
