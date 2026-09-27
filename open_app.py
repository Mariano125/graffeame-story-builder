import http.server
import socketserver
import webbrowser
import os
import sys

DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

class ReuseTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

def main():
    os.chdir(DIRECTORY)
    port = 8080
    httpd = None

    while port < 8100:
        try:
            httpd = ReuseTCPServer(("", port), Handler)
            break
        except OSError:
            port += 1

    if not httpd:
        print("No se pudo encontrar un puerto libre entre 8080 y 8100.")
        sys.exit(1)

    url = f"http://localhost:{port}/index.html"
    print(f"Iniciando servidor local para Story Builder @graffeame...")
    print(f"Abriendo {url} en tu navegador...")
    webbrowser.open(url)
    
    print(f"Servidor activo en el puerto {port}. Presioná Ctrl+C para detener.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")

if __name__ == "__main__":
    main()
