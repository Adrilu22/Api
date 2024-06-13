async function adicionar() {
    let formulario = document.forms["adicionarInscripcion"];

    let grupo = parseInt(formulario["grupo"].value);
    if (isNaN(grupo) || grupo <= 0) {
        document.getElementById("respuesta").innerHTML = "El valor de grupo debe ser un número mayor que 0.";
        return;
    }

    let imparte = {
        id_p: parseInt(formulario["id_p"].value),
        cod_a: parseInt(formulario["cod_a"].value),
        grupo: grupo,
        horario: formulario["horario"].value
    };

    let uri = "http://127.0.0.1:3000/api/imparte"; 
    try {
        let respuesta = await postData(uri, imparte);

        // Verifica si la respuesta incluye un identificador para la nueva entrada
        if (respuesta && respuesta.insertId) {
            document.getElementById("respuesta").innerHTML = "Se adicionó correctamente la relación 'Imparte' con el ID: " + respuesta.insertId;
        } else {
            document.getElementById("respuesta").innerHTML = "Se adicionó correctamente la relación 'Imparte'.";
        }
        
        generarLinkDescarga(imparte); 
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("respuesta").innerHTML = "Hubo un error al adicionar la relación 'Imparte'.";
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

function generarLinkDescarga(imparte) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(imparte));
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.setAttribute("href", dataStr);
    downloadLink.setAttribute("download", "imparte.json");
    downloadLink.style.display = "block";
    downloadLink.innerHTML = "Descargar JSON";
}
