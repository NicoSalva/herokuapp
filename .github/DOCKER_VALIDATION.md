# Test Automation con GitHub Actions

Este proyecto incluye ejecución automática de tests (Desktop + Mobile) en CI/CD.

## ¿Qué hace el workflow?

El archivo `.github/workflows/docker-tests.yml` ejecuta automáticamente:

1. **Instalación** de dependencias
2. **Tests Desktop** - Navegador completo
3. **Tests Mobile** - Emulación móvil
4. **Generación** de reportes Allure
5. **Upload** de resultados como artifacts

## ¿Cuándo se ejecuta?

- ✅ Cada **push** a `main` o `master`
- ✅ Cada **pull request** a `main` o `master`
- ✅ **Manualmente** desde la pestaña "Actions" en GitHub

## Cómo ver los resultados

1. Ve a tu repositorio en GitHub
2. Click en **"Actions"** (pestaña superior)
3. Selecciona el workflow **"Docker Tests"**
4. Click en el run más reciente
5. Verás:
   - ✅ Si los tests pasaron
   - 📊 Logs de ejecución
   - 📥 Artifacts descargables (reportes Allure)

## Ejecutar manualmente

1. Ve a **Actions** → **Docker Tests**
2. Click en **"Run workflow"** (botón derecho)
3. Selecciona la rama
4. Click **"Run workflow"**

## Descargar reportes

En cada ejecución, encontrarás dos artifacts:
- **allure-results**: Resultados raw de Allure
- **allure-report**: Reporte HTML de Allure

## ¿Por qué GitHub Actions?

- ✅ **Gratis** para repositorios públicos
- ✅ **AMD64 nativo** - Entorno Linux estable
- ✅ **Automatizado** - Se ejecuta automáticamente
- ✅ **Desktop + Mobile** - Ambos ambientes probados
- ✅ **Reportes** - Artifacts descargables

## Nota importante

Este workflow ejecuta los tests en un ambiente Linux AMD64 limpio, validando que todo funciona correctamente en CI/CD. Los tests se ejecutan con Chrome headless (Desktop) y Chrome mobile emulation (Mobile).

