async function listar() {
    let id = document.getElementById("cod_a").value; // Corregí "cod_e" por "cod_a" para que coincida con el ID del input en el HTML

    let uri = "http://127.0.0.1:3000/api/asignaturas/" + id; // Corregí la URL según la estructura de tu servidor

    try {
        let respuesta = await getData(uri);

        console.log(respuesta);

        let titulo = document.getElementById("titulo");
        titulo.style.visibility = "visible";

        if (respuesta) {
            let arreglo = [respuesta];
            document.body.appendChild(generateTable(arreglo));
        } else {
            titulo.innerHTML = "No se encontró ninguna asignatura con el ID: " + id;
        }
        generarLinkDescarga(respuesta);
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
            throw new Error("Hubo un problema al obtener los datos de la asignatura.");
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

function generarLinkDescarga(asignatura) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(asignatura));
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.setAttribute("href", dataStr);
    downloadLink.setAttribute("download", "asignatura.json");
    downloadLink.style.display = "block";
    downloadLink.innerHTML = "Descargar JSON";
}

