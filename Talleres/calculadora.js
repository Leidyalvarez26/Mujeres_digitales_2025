const readline = require("readline"); // Importa el módulo readline para manejar la entrada y salida en la consola

const rl = readline.createInterface({ // Crea una interfaz de lectura y escritura
  input: process.stdin,
  output: process.stdout,
});

const preguntar = (pregunta) => { // Función que devuelve una promesa para manejar preguntas de manera asíncrona
  return new Promise((resolve) => {// Retorna una nueva promesa
    rl.question(pregunta, (respuesta) => resolve(respuesta));// Usa rl.question para hacer la pregunta y resolver la promesa con la respuesta
  });
};

const pedirNumeros = async () => {// Función asíncrona para pedir dos números al usuario
  const num1 = Number(await preguntar("Ingrese el primer número: "));// Convierte la respuesta a número
  if (isNaN(num1)) { // Verifica si la entrada es un número válido
    console.log("❌ Entrada inválida. Por favor ingresa un número válido.");
    return await pedirNumeros(); // Si no es válido, vuelve a pedir los números
  }
  const num2 = Number(await preguntar("Ingrese el segundo número: "));
  if (isNaN(num2)) {
    console.log("❌ Entrada inválida. Por favor ingresa un número válido.");
    return await pedirNumeros();
  }
  return { num1, num2 };
};

const pedirRaiz = async () => {// Función asíncrona para pedir un número para calcular la raíz cuadrada
  const entrada = await preguntar("Ingrese el número para calcular la raíz cuadrada: ");// Pide el número
  const num1 = Number(entrada);

  if (isNaN(num1)) {// Verifica si la entrada es un número válido
    console.log("❌ Entrada inválida. Por favor ingresa un número válido.");
    return await pedirRaiz();
  }

  return num1;
};

const menuCalculadora = async () => {// Función principal que muestra el menú y maneja las operaciones
  console.clear();
  console.log("===== CALCULADORA BÁSICA =====");
  console.log("1. Sumar");
  console.log("2. Restar");
  console.log("3. Multiplicar");
  console.log("4. Dividir");
  console.log("5. Potencia");
  console.log("6. Raíz cuadrada");
  console.log("7. Porcentaje");
  console.log("8. Salir\n");

  const opcion = await preguntar("Selecciona una opción: ");// Pide al usuario que seleccione una opción
  let resultado;

  switch (opcion) {// Maneja las diferentes opciones del menú
    case "1": {// Suma
      const { num1, num2 } = await pedirNumeros();
      resultado = num1 + num2;
      console.log(`✅ Resultado: ${num1} + ${num2} = ${resultado}`);
      break;
    }
    case "2": {// Resta
      const { num1, num2 } = await pedirNumeros();
      resultado = num1 - num2;
      console.log(`✅ Resultado: ${num1} - ${num2} = ${resultado}`);
      break;
    }
    case "3": {// Multiplicación
      const { num1, num2 } = await pedirNumeros();
      resultado = num1 * num2;
      console.log(`✅ Resultado: ${num1} × ${num2} = ${resultado}`);
      break;
    }
    case "4": {// División
      const { num1, num2 } = await pedirNumeros();
      if (num2 === 0) {
        console.log("⚠️ No se puede dividir entre cero.");
      } else {
        resultado = num1 / num2;
        console.log(`✅ Resultado: ${num1} ÷ ${num2} = ${resultado}`);
      }
      break;
    }
    case "5": {// Potencia
      const { num1: base, num2: exponente } = await pedirNumeros();
      resultado = Math.pow(base, exponente);
      console.log(`✅ Resultado: ${base} ^ ${exponente} = ${resultado}`);
      break;
    }
    case "6": {// Raíz cuadrada
      const num1 = await pedirRaiz();// Pide un solo número
      if (num1 < 0) {// Verifica si el número es negativo
        console.log("⚠️ No se puede calcular la raíz cuadrada de un número negativo.");
      } else {
        resultado = Math.sqrt(num1);// Calcula la raíz cuadrada
        console.log(`✅ Resultado: √${num1} = ${resultado.toFixed(2)}`);// Muestra el resultado con dos decimales
      }
      break;
    }
    case "7": {
      const { num1: cantidad, num2: porcentaje } = await pedirNumeros();
      resultado = (cantidad * porcentaje) / 100;
      console.log(`✅ Resultado: ${porcentaje}% de ${cantidad} = ${resultado}`);
      break;
    }
    case "8":// Salir
      console.log("👋 Gracias por usar la calculadora.");
      rl.close();
      return;
    default:// Opción inválida
      console.log("❌ Opción inválida.");
      break;
  }

  await preguntar("\nPresiona ENTER para continuar...");// Espera a que el usuario presione ENTER antes de continuar
  menuCalculadora();
};

menuCalculadora();// Inicia el menú de la calculadora