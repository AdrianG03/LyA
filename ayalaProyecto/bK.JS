let m_demanda = new Array(5);
let m_asignacion = new Array(5);
let m_necesidades = new Array(5);
let v_recursos = new Array(3);
let v_recursosD = new Array(3);

for (let i = 0; i < m_demanda.length; i++) {
    m_demanda[i] = new Array(3);
    m_asignacion[i] = new Array(3);
    m_necesidades[i] = new Array(3);
}

function rndNum(mayor) {
    return 1 + (Math.floor(Math.random() * mayor));
}

function fillVector(vector, num) {
    for (let i = 0; i < vector.length; i++) {
        vector[i] = rndNum(num);
    }
}

function printVector(vector, name) {
    vectorSrt = '';
    for (let i = 0; i < vector.length; i++) {
        vectorSrt = vectorSrt + ' ' + vector[i];
    }
    vectorSrt = vectorSrt + '\n' + name;
    console.log(vectorSrt);
}

function fillN(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            matriz[i][j] = m_demanda[i][j] - m_asignacion[i][j];
        }

    }
}

function fillD(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            matriz[i][j] = rndNum(v_recursos[j]);

        }

    }
}

function fillA(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            if (m_demanda[i][j] < 4) {
                matriz[i][j] = rndNum(m_demanda[i][j] - 1);
            } else {
                matriz[i][j] = rndNum(4) - 1;
            }
        }

    }
}


function printMatriz(matriz, name) {
    matrizSrt = '';
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            matrizSrt = matrizSrt + matriz[i][j] + " ";
        }
        matrizSrt = matrizSrt + '\n';
    }
    matrizSrt = matrizSrt + name;
    console.log(matrizSrt);
}

function fillVectorD(vector) {
    let acum = 0;
    for (let i = 0; i < vector.length; i++) {
        for (let j = 0; j < m_asignacion.length; j++) {
            acum = acum + m_asignacion[j][i];
        }
        vector[i] = v_recursos[i] - acum;
        acum = 0;
    }
}

function resetFila(matriz, fila) {
    for (let j = 0; j < matriz[0].length; j++) {
        matriz[fila][j] = 0;

    }
}

function vaciado() {
    let verSalida = 0;
    let cont = 0;
    let banFila = 0;
    console.log('Entrada al vaciado con estas matrices');
    for (let x = 0; x < m_necesidades.length; x++) {
        for (let i = 0; i < m_necesidades.length; i++) {
            if (m_necesidades[i][0] != 0 && m_necesidades[i][1] != 0 && m_necesidades[i][2] != 0) {
                for (let j = 0; j < m_necesidades[0].length; j++) {
                    if (m_necesidades[i][j] <= v_recursosD[j]) {
                        cont++;
                        if (cont == 3) {
                            banFila = i;
                        }
                    }

                }
            }

            if (cont == 3) {
                resetFila(m_demanda, banFila);
                resetFila(m_asignacion, banFila);
                fillN(m_necesidades);
                fillVectorD(v_recursosD);
                console.log('-----------------------------------------');
                printMatriz(m_necesidades, 'Matriz Necesidades');
                printVector(v_recursosD, 'Vector de Disponibles');
                verSalida++;
            }
            cont = 0;
        }
    }

    if (verSalida == 5) {
        console.log('====La simulación ha concluido en un estado exitoso====');
    } else {
        console.log('====La simulación ha concluido en un estado no ejecutable====');
    }
}

function run() {
    let flag = 0;
    while (flag == 0) {
        let maxProcess = 10;
        fillVector(v_recursos, maxProcess);
        fillD(m_demanda);
        fillA(m_asignacion);
        fillN(m_necesidades);
        fillVectorD(v_recursosD);
        printMatriz(m_demanda, 'Matriz de Demanda');
        printMatriz(m_asignacion, 'Matriz de Asignación de recursos');
        printMatriz(m_necesidades, 'Matriz de Necesidades');
        printVector(v_recursos, 'Vector de Recursos Totales');
        printVector(v_recursosD, 'Vector de Recursos Disponibles');

        if (v_recursosD[0] < 0 || v_recursosD[1] < 0 || v_recursosD[2] < 0) {
            console.log('El sistema no puede tener solución con los parámetros proporcionados');
        } else {
            flag++;
            vaciado();
        }
    }
}

run();


