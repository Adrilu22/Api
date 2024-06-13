async function listarTodos() {
    let uri = "http://127.0.0.1:3000/api/asignaturas"; // 
    try {
        let respuesta = await getData(uri);

        console.log(respuesta);

        let titulo = document.getElementById("titulo");
        titulo.style.visibility = "visible";

        if (respuesta && respuesta.length > 0) {
            document.body.appendChild(generateTable(respuesta));
            generarLinkDescarga(respuesta);
        } else {
            titulo.innerHTML = "No se encontraron asignaturas registradas.";
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getData(url) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Hubo un problema al obtener los datos de las asignaturas.");
        }

        const result = await response.json();
        console.log("Respuesta:", result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

// Función para generar la tabla HTML
function generateTable(data) {
    var table = document.createElement("table");

    // Crear encabezado de la tabla
    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");

    // Obtener los nombres de las columnas del primer objeto en el array
    Object.keys(data[0]).forEach(function (key) {
        var th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crear cuerpo de la tabla
    var tbody = document.createElement("tbody");

    // Iterar a través del array y crear una fila para cada objeto
    data.forEach(function (item) {
        var row = document.createElement("tr");

        // Rellenar la fila con datos del objeto actual
        Object.values(item).forEach(function (value) {
            var td = document.createElement("td");
            td.textContent = value;
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    return table;
}

// Función para generar el enlace de descarga del JSON
function generarLinkDescarga(asignatura) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(asignatura));
    const downloadLink = document.createElement('a'); // Creamos el elemento <a> para el enlace de descarga
    downloadLink.setAttribute("href", dataStr);
    downloadLink.setAttribute("download", "asignatura.json");
    downloadLink.innerHTML = "Descargar JSON";
    document.body.appendChild(downloadLink); // Agregamos el enlace al cuerpo del documento
}
