const patron = /^(V|E)-\d{8}$/

function obtener() {
    let txt = document.getElementById("caja").value
    let res = patron.test(txt)

    if (res == true) {
        if (txt.substring(0, 1) == "V") {
            alert("Cédula válida, es Venezolano")
        } else {
            alert("Cédula válida, es Extranjero")
        }
    } else {
        if (txt.substring(0, 1) == "") {
            alert("Ingrese datos primero")
        } else {
            alert("Cédula inválida")
        }
    }
}





