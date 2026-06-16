import urllib.request
from bs4 import BeautifulSoup
import socket
socket.setdefaulttimeout(3)

def check_url(slug):
    url = f'https://fitnessprogramer.com/exercise/{slug}/'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8', errors='ignore')
            soup = BeautifulSoup(html, 'html.parser')
            for img in soup.find_all('img'):
                src = img.get('src')
                if src and src.endswith('.gif'):
                    return f'Found GIF for {slug}: {src}\n'
    except Exception as e:
        return f'Failed {slug}: {e}\n'
    return f'No gif found {slug}\n'

with open('test_output.txt', 'w') as f:
    f.write(check_url('downward-facing-dog'))
    f.write(check_url('downward-dog'))
    f.write(check_url('burpee'))
    f.write(check_url('burpees'))
    f.write(check_url('tricep-dips'))
    f.write(check_url('triceps-dips'))
    f.write(check_url('child-s-pose'))
    f.write(check_url('childs-pose'))
