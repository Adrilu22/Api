async function getData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      // Manejo de errores de respuesta HTTP que no son 2xx
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    const result = await response.json();
    console.log("Respuesta:", result);
    return result;
  } catch (error) {
    // Manejo de errores de red o fallas en la solicitud
    console.error("Error:", error);
    return null;
  }
}

async function listarTodos() {
  let uri = "http://127.0.0.1:3000/api/profesores";

  let respuesta = await getData(uri);

  // Verifica si la respuesta es null, lo que indica un error
  if (respuesta === null) {
    console.log("Hubo un error al obtener los datos.");
    return;
  }

  // Verifica si la respuesta es un arreglo y tiene elementos
  if (Array.isArray(respuesta) && respuesta.length > 0) {
    console.log("Profesores:", respuesta);
    let titulo = document.getElementById("titulo");
    titulo.style.visibility = "visible";
    let listContainer = document.createElement('div');
    let profesoresList = generateList(respuesta);
    listContainer.appendChild(profesoresList);
    document.body.appendChild(listContainer);
    generarLinkDescarga(respuesta); // Generar el enlace de descarga del JSON
  } else {
    console.log("No hay profesores registrados o la respuesta no es un arreglo.");
  }
}

function generateList(data) {
  let list = document.createElement("ul");

  if (Array.isArray(data) && data.length > 0) {
    data.forEach(function (item) {
      if (item.hasOwnProperty('id_p') && item.hasOwnProperty('nom_p') && item.hasOwnProperty('profesion')) {
        let listItem = document.createElement("li");
        let profesorInfo = `ID: ${item.id_p} - Nombre: ${item.nom_p} - Profesión: ${item.profesion}`;
        listItem.textContent = profesorInfo;
        list.appendChild(listItem);
      } else {
        let errorMessage = document.createElement('li');
        errorMessage.textContent = 'Los datos recibidos no están en el formato esperado.';
        list.appendChild(errorMessage);
        return list;
      }
    });
  } else {
    let noDataMessage = document.createElement('li');
    noDataMessage.textContent = 'No hay profesores registrados.';
    list.appendChild(noDataMessage);
  }

  return list;
}

function generarLinkDescarga(data) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  const downloadLink = document.createElement('a');
  downloadLink.setAttribute("href", dataStr);
  downloadLink.setAttribute("download", "profesores.json");
  downloadLink.innerHTML = "Descargar JSON";
  document.body.appendChild(downloadLink);
}
