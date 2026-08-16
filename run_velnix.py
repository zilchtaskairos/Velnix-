#!/usr/bin/env python3
"""
𝓥𝓮𝓵𝓷𝓲𝔁 .⋆♱ — One-Click Python Launcher
Runs a local server and automatically opens 𝓥𝓮𝓵𝓷𝓲𝔁 in your Google Chrome / Default Browser!
No complex setups or Node required — pure built-in Python 3.
"""

import os
import sys
import http.server
import socketserver
import webbrowser
import threading
import time

PORT = 8000
DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")

if not os.path.exists(DIRECTORY):
    DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class VelnixHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # SPA Fallback: if requesting a sub-path that doesn't exist as a file, serve index.html
        path = self.translate_path(self.path)
        if not os.path.exists(path) and not '.' in os.path.basename(self.path):
            self.path = '/index.html'
        return super().do_GET()

    def log_message(self, format, *args):
        # Clean terminal logging
        sys.stdout.write(f"[𝓥𝓮𝓵𝓷𝓲𝔁 .⋆♱ Stream] {format % args}\n")

def open_browser():
    time.sleep(1.2)
    url = f"http://localhost:{PORT}"
    print(f"\n========================================================")
    print(f"✨ 𝓥𝓮𝓵𝓷𝓲𝔁 .⋆♱ Anime Streaming is LIVE!")
    print(f"🔗 Direct Browser Link: {url}")
    print(f"========================================================\n")
    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"Could not open browser automatically: {e}")
        print(f"Please open your browser and go to: {url}")

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", PORT), VelnixHandler) as httpd:
            print(f"🚀 Starting 𝓥𝓮𝓵𝓷𝓲𝔁 .⋆♱ local server on port {PORT}...")
            threading.Thread(target=open_browser, daemon=True).start()
            httpd.serve_forever()
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"Port {PORT} in use, trying port 8080...")
            alt_port = 8080
            with socketserver.TCPServer(("", alt_port), VelnixHandler) as httpd:
                print(f"🚀 Starting 𝓥𝓮𝓵𝓷𝓲𝔁 .⋆♱ on port {alt_port}...")
                threading.Thread(target=lambda: webbrowser.open(f"http://localhost:{alt_port}"), daemon=True).start()
                httpd.serve_forever()
        else:
            raise e

if __name__ == "__main__":
    start_server()
