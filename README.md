Entrega 2 para curso Javascript - Comisión 64790 - Jaimes Natalia

Pagina web para presupuestar costos de impresiones 3D.
Se tienen en consideración datos como:
*Tipo de Filamento
*Cantidad de Filamento a usar
*Precio y Cantidad de Filamento que trae una Bobina

Se puede calcular el costo base y se pueden agregar datos de costos de Electricidad y Mano de Obra:
*En los costos de electricidad se calcula el costo de la energía eléctrica consumida durante la impresión, basado en el consumo de energía de la impresora, el tiempo de impresión y el precio del kWh.
*En los costos de Mano de Obra se calcula el costo de la mano de obra involucrada en la preparación y el postprocesamiento de la impresión, basado en el tiempo y el costo por hora.

La funcionalidad de la pagina web está hecha en Javascript.
En el codigo podemos contemplar una clase (CalculadoraCostos3D) que maneja la logica de los calculos, el almacenamiento y recuperación de datos y parte de la modificación de la interfaz de usuario.
Los usuarios ingrsan los datos en forma de input a traves de un formulario y al cargar datos se pueden ver los primeros resultados de los calculos realizados.
A partir de que informacion cargamos, se pueden ver 4 calculos diferentes:
Calculo Base: Se calcula el peso del filamento usado multiplicado por el precio de la bobina y esto se divide por el peso de la bobina.
Calculo Electrico: Se multiplica el consumo electrico por el precio del KW, se divide por 1000 y eso se multiplica por el tiempo de la impresión. (Opcional)
Calculo de Mano de Obra: El tiempo de la Mano de Obra de preproducción y postproducción se multiplican por sus costes por Hora, se dividen por 60 cada uno y luego se suman. (Opcional) 
Calculo Total: Sumatoria de todos los calculos anteriores. En caso de no cargar algun dato opcional, no se considera en esta suma.

Para seleccionar el tipo de filamento se generó un array de tipos para que desde Javascript podamos generar los elementos options acorde a la cantidad de tipos agregada al array.

Las partes del formulario que son opcionales se encuentran ocultas hasta seleccionar el botón Opcional en cada sección.

Tambien se guardan los datos cargados en la sessionStorage. No me pareció necesario almacenar los datos en el localStorage ya que es una calculadora que se utiliza de forma repetitiva.
Para limpiar los datos se agregó un botón para reiniciar el formulario.