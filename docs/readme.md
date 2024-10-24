# Little Enigma - Docs

## Rotor

**📁 Archivo: [rotor.ts](../source/rotor.ts)**
Los rotores son el nuecleo de nuestra implementación de la Maquina Enigma,
para ello implementamos una clase con la siguiente definición

|Metodo:Tipo      |Descripción                                            |
|-----------------|-------------------------------------------------------|
|NextRotor:Rotor  | Es la representación del siguiente rotor en cadena    |
|BackRotor:Rotor  | Lo mismo que la anterior, pero para el rotor previo   |
|Current: number  | Es el número del salto que el rotor debe de dar       |
|RotorConfig: AbstractRotor | Es la minima expresión de un rotor, es usado|
| | para conocer cuales son las configuraciones de este   |
| | como donde inicia o donde finaliza                    |
|attachRotor(rotor)| Se encarga de conectar ls rotores y enlazarlos |
|sendSignal(rotor)| Se encarga de enviar la señal de movimiento entre los rotores|
|static Encode()| Se encarga de pasar por cada rotor nuestro string|

### Funcionamiento básico

Los rotores trabajan como una cadena, estos se envian datos entre ellos, para lograrlo
se utilizan referencías al siguiente Rotor y al anterior.

Su funcionamiento básico de rotación es que al recivir la
señal de rotación `Rotor->sendSignal(postion: "next" | "back", i: number)`, estos
aumentaran uno o más(`i`), cuando tengan el contador igual o mayor a su limite, estos
se reiniciaran, y enviaran la señal al siguiente rotor conectado y asi se
repetira su ciclo.

```text
+------------+   +----------+   +----------+
|            |<--|          |-->|          |
| Main Rotor |   |  Rotor1  |   |  Rotor2  |
|            |-->|          |<--|          |
+------------+   +----------+   +----------+
Diseño de una cadena de rotores
```

### static Rotor->Encode()

* Params:
  * **rotor: Rotor** Es el rotor principal, el que tiene conectados los demás.
  * **str: string** Es el texto a codificar
* Retorna:
  * **string[]** Es la cadena codificada, esta esta previamente convertida a hexadecimal.

Primero debemos saber que cada palabra tiene su relación con el código Unicode, que es como
los ordenadores interpretan el abecedario, utilizando esto convertimos los caracteres a un 
número lo que es más facil de manipular usando un ordenador.
```text
|-----|    +----+
|  a  | -> | 61 |
|  b  | -> | 62 |
|  c  | -> | 63 |
|  d  | -> | 64 |
+-----+    +----+
```

Para codificar un texto, este primero hay que romperlo en caracteres, para estos
se eligio usar un for que recorra cada caracter del string, y utilizado el contador se le 
aumenta lo que contenga a ese número.

Posteriormente este se guarda en un arreglo con las letras, para añadir complejidad se 
codifican esos números en base 16(__hexadecimal__).

```typescript
"hola" = ["69", "71", "6f", "65"];
```

