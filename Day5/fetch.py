import threading

import requests
from api_key import api_key
def thred(func):
    thread = threading.Thread(target=func, args=(10,))
    thread.start()

def linku(key='DEMO_KEY', rover='curiosity', cam='FHAZ', earth_date='2015-6-3'):
    open_label_window('fetching data...')
    lst = dict()
    x = f'https://api.nasa.gov/mars-photos/api/v1/rovers/{rover}/photos?earth_date={earth_date}&api_key={key}'
    print('fetching url...')
    req = requests.get(x)
    data = req.json()
    n = 0  # key to index dictionary like list
    if 'error' in data:
        print(data)
        close_label_window()
    else:
        for i in data['photos']:
            # print(i['camera']['name'])
            if i['camera']['name'] == cam:
                lst[n] = (i['img_src'])
                n += 1
            elif cam == '':
                # print(i['img_src'])
                lst[n] = (i['img_src'])
                n += 1
        print(lst)
        close_label_window()
        return lst


n = 0
from textbox import open_label_window,close_label_window
thred(open_label_window('connecting to database...'))
lst = linku(api_key)
if len(lst) < 1:
    print("no data available")
    lst = ['https://imgs.search.brave.com/2mXF0TjkMLnhUVj_SKlv4p0eHrNK-wrkDjvAkkph4Mk/rs:fit:800:600:1/g:ce/aHR0cDovL2dpZmlt/YWdlLm5ldC93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxNy8wMi9M/b2FkaW5nLUdJRi1J/bWFnZS0yLmdpZg.gif']
curv = lst[n]
close_label_window()
