# Bug Reports - Stranger List App

Escribo simple y directo. Estos son los bugs que vi y cómo los cubren los tests.

## BUG 1: Acepta imágenes que no son 320x320
- Esperado: solo 320x320.
- Actual: 100x100 pasa y crea el item.
- Cómo verlo: correr `@bug-detection` en "reject images that are not 320x320px".
- Estado: el test falla hoy (pasa cuando lo arreglen).

## BUG 2: Largo de descripción (>300) debería bloquear
- Esperado: >300 deshabilita Create o rechaza.
- Actual: la app no siempre lo bloquea. En nuestros tests validamos que el botón quede deshabilitado a 350.
- Cómo verlo: `@bug-detection` en "reject descriptions longer than 300 characters".
- Estado: cubierto por test.

## BUG 3: Aspect ratio incorrecto (no cuadrado)
- Esperado: solo cuadrado 320x320.
- Actual: imágenes no cuadradas pueden pasar.
- Cómo verlo: `@bug-detection` en "reject images with wrong aspect ratio".
- Estado: cubierto por test.

Listo. Corto y al pie.
