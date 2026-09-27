@echo off
title Subir Story Builder @graffeame a GitHub
echo.
echo ====================================================
echo  Subiendo Story Builder @graffeame a tu GitHub...
echo ====================================================
echo.
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/Mariano125/graffeame-story-builder.git
git push -u origin main
echo.
if %errorlevel% equ 0 (
    echo ====================================================
    echo  ¡CODIGO SUBIDO CON EXITO A GITHUB! 🎉
    echo ====================================================
) else (
    echo  Ocurrio un error al subir. Revisa la conexion o credenciales.
)
echo.
pause
