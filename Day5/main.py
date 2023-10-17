import subprocess
import sys
from PyQt5.QtGui import QColor, QPalette
from PyQt5.QtWidget import QApplication, QWidget, QVBoxLayout, QHBoxLayout, QLineEdit, QLabel
from diagbox import widg
from PyQt5.QtCore import Qt
import requests
from PyQt5.QtWidgets import QApplication, QWidget, QHBoxLayout
from PyQt5.QtGui import QImage, QPixmap
from image import getImg
import threading



def open_new_window(lst):
    param = lst
    subprocess.run(["python", 'mail/mail.py', str(lst)])

def thred(func):
    thread = threading.Thread(target=func, args=(10,))
    thread.start()


def next():
    global image_label, text, n, but
    if (n+1) < len(lst):
        n += 1
        print(f'loading image {n}...')
        curv = lst[n]
        img_dat = requests.get(curv).content
        image = QImage()
        image.loadFromData(img_dat)
        print(f'imported image {curv}')
        image_label.setPixmap(QPixmap(image))
        pic = QPixmap(image).scaled(800, 800, Qt.KeepAspectRatio)
        image_label.setPixmap(pic)
        image_label.update()
        text.setText("  "+diag.rover.currentText()+"  "+ diag.cam.currentText()+"  "+ str(diag.earthdate.selectedDate().toPyDate()))
        but.setText(f'img {n+1}/{len(lst)}')


def prev():
    global image_label, text, n, but
    if (n-1) >= 0:
        n -= 1
        print(f'loading image {n}...')
        curv = lst[n]
        img_dat = requests.get(curv).content
        image = QImage()
        image.loadFromData(img_dat)
        print(f'imported image {curv}')
        image_label.setPixmap(QPixmap(image))
        pic = QPixmap(image).scaled(800, 800, Qt.KeepAspectRatio)
        image_label.setPixmap(pic)
        image_label.update()
        text.setText("  "+diag.rover.currentText()+"  "+ diag.cam.currentText()+"  "+ str(diag.earthdate.selectedDate().toPyDate()))
        but.setText(f'img {n+1}/{len(lst)}')


def fetch_apply(key='DEMO_KEY', rover='curiosity', cam='', earth_date='2015-6-3'):
    global lst
    global text
    global curv
    global n
    print(diag.earthdate.selectedDate().toPyDate(), diag.rover.currentText(), diag.cam.currentText())
    fallback_lst = lst
    lst = linku(api_key, diag.rover.currentText(), diag.cam.currentText(), diag.earthdate.selectedDate().toPyDate())
    if len(lst) < 1:
        text.setText("loading image...")
        print("no data available")
        lst = fallback_lst
        text.setText("  no data available")
    else:
        curv = lst[0]
        n -= 1
        next()
        text.setText("  "+diag.rover.currentText()+"  "+ diag.cam.currentText()+"  "+ str(diag.earthdate.selectedDate().toPyDate()))


if __name__ == "_main_":
    app = QApplication([])
    window = QWidget()
    from fetch import *

    # ---------------------------------------------buttons--------------------------------------------------------------
    # prev button
    previ = RoundedButton("<")
    previ.setFixedSize(50, 50)
    previ.clicked.connect(lambda: thred(prev()))
    previ.setStyleSheet("background-color: #283747; border-radius: 10px;")

    # next button
    nekst = RoundedButton(">")
    nekst.setFixedSize(50, 50)
    nekst.clicked.connect(lambda: thred(next()))
    nekst.setStyleSheet("background-color: #283747; border-radius: 10px;")

    # fetch
    but = RoundedButton('')
    but.setStyleSheet("background-color: #283747; border-radius: 10px;")
    but.setFixedHeight(25)

    # the widgets
    sidebar = QVBoxLayout()  # vertical box layout
    image = QVBoxLayout()
    fetchbar = QHBoxLayout()

    # nav = QHBoxLayout
    masterLay = QHBoxLayout()  # master layout (put other layouts in here), Horizontal box layout
    masterMasterLay = QVBoxLayout()
    # ------------------------------------------------------------------------------------------------------------------

    # image placeholder
    image_label = getImg(
        'https://imgs.search.brave.com/2mXF0TjkMLnhUVj_SKlv4p0eHrNK-wrkDjvAkkph4Mk/rs:fit:800:600:1/g:ce/aHR0cDovL2dpZmlt/YWdlLm5ldC93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxNy8wMi9M/b2FkaW5nLUdJRi1J/bWFnZS0yLmdpZg.gif'
    )
    image_label.setStyleSheet("border-radius: 10px;")

    # sidebar
    buttList = button_list(image_label)
    send = buttList['send']
    send.clicked.connect(lambda: open_new_window(lst))
    sidebar.addWidget(send)
    sidebar.setAlignment(Qt.AlignTop)

    # sidebar.addWidget(text)
    diag = widg()
    diag.x.clicked.connect(lambda: fetch_apply())
    sidebar.addLayout(diag.layout)

    # fetch bar
    text = QLabel()
    text.setStyleSheet("border-radius: 10px;background-color: #283747;color: white;")
    but.setStyleSheet("border-radius: 10px;background-color: #283747;color: white;")
    text.setFixedSize(550, 25)
    fetchbar.addWidget(text)

    fetchbar.setAlignment(Qt.AlignLeft)
    fetchbar.addWidget(but)

    # adding image to layout
    image.addWidget(image_label)
    image.addLayout(fetchbar)  # fetchbar, now useless
    image.addStretch()

    # --------------------------------putting together the master layout------------------------------------------------
    sidebar.addLayout(fetchbar)
    sidebar.addLayout(fetchbar)
    masterLay.addLayout(sidebar)
    masterLay.addWidget(previ)  # prev button
    masterLay.addLayout(image)  # image
    masterLay.setAlignment(Qt.AlignHCenter)
    masterMasterLay.addLayout(masterLay)
    # ------------------------------------------------------------------------------------------------------------------

    palette = window.palette()
    palette.setColor(palette.Window,
                     QColor('#17202a'))  # set the titlebar color to dark blue, or at least it's supposed to
    window.setPalette(palette)

    window.setLayout(masterMasterLay)
    window.setStyleSheet("background-color: #17202a;")
    window.show()

    app.exec_()
