async function adicionar() {
    let formulario = document.forms["adicionarAsignatura"];

    let asignatura = {
        cod_a: parseInt(formulario["cod_a"].value),
        nom_a: formulario["nom_a"].value,
        ih: parseInt(formulario["ih"].value),
        cred: parseInt(formulario["cred"].value)
    };

    console.log(asignatura);

    let uri = "http://127.0.0.1:3000/api/asignaturas";

    try {
        let respuesta = await postData(uri, asignatura);

        let parrafoRespuesta = document.getElementById("respuesta");

        parrafoRespuesta.innerHTML = "Se registró correctamente la asignatura.";

        generarLinkDescarga(asignatura);
    } catch (error) {
        console.error("Error:", error);
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
function generarLinkDescarga(asignatura) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(asignatura));
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.setAttribute("href", dataStr);
    downloadLink.setAttribute("download", "asignatura.json");
    downloadLink.style.display = "block";
    downloadLink.innerHTML = "Descargar JSON";
}
