from PyQt5.QtCore import Qt
from PyQt5.QtGui import QImage
from PyQt5.QtWidgets import QLabel, QSizePolicy

import requests
from demoData import *


#async
def getImg(url_image=curv):
    # app = QApplication([])
    image = QImage()
    print('loading image...')
    print(curv)
    image.loadFromData(requests.get(url_image).content)

    image_label = QLabel()
    image = QPixmap(image).scaled(850, 850, Qt.KeepAspectRatio)
    
    image_label.setPixmap(image)
    image_label.resize(60, 5)
    #image_label.show()
    print('fetched image')
    #app.exec_()
    return image_label
