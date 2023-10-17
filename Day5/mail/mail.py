import ast
import os
import shutil
import sys

import urllib.request
from textbox import NewText
from PyQt5.QtCore import Qt, QDate
from PyQt5.QtWidgets import QApplication, QWidget, QLineEdit, QVBoxLayout, QCalendarWidget, QLabel, QComboBox,QSizePolicy
from buttons import RoundedButton




def clean_temp(folder='mail/temp'):
    for the_file in os.listdir(folder):
        file_path = os.path.join(folder, the_file)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print(f'could not delete {file_path}: {e}')
def load(link,n):
    global lst
    with urllib.request.urlopen(link)as f:
        image = f.read()
        print('attaching', link)
        with open(f"mail/temp/{n}.jpg", 'wb') as f:
            f.write(image)
            lst.append(f"mail/temp/{n}.jpg")
    # Get the image data as a variable
    #image.save(image_data, format="JPEG")
    #image_data.seek(0)  # no idea why we're setting pointer to beginning of io stream
    #lst.append(image_data.getvalue())

    print('added', link)

def send_mail(recipient, subject, body, attachments = {0:"http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FLB_486615455EDR_F0481570FHAZ00323M_.JPG",1:"http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FLB_486615455EDR_F0481570FHAZ00323M_.JPG",2:"http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FLB_486615455EDR_F0481570FHAZ00323M_.JPG",3:"http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FLB_486615455EDR_F0481570FHAZ00323M_.JPG",4:"http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FLB_486615455EDR_F0481570FHAZ00323M_.JPG",5:"http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FLB_486615455EDR_F0481570FHAZ00323M_.JPG",6:"http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FRB_486615455EDR_F0481570FHAZ00323M_.JPG",7:"http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FRB_486615455EDR_F0481570FHAZ00323M_.JPG",8:"http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FRB_486615455EDR_F0481570FHAZ00323M_.JPG",9:"http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FRB_486615455EDR_F0481570FHAZ00323M_.JPG"}):
    global window
    global lst
    try:
        param = sys.argv[1]
        attachments = ast.literal_eval(param)
    except:
        print('no input parameter, switching to default value')
    ezgmail.init()
    active_threads = []
    n = -1
    print('attaching images...')
    for i in attachments:
        n += 1
        i = thred(load(attachments[i], n))
        active_threads.append(i)
    for i in active_threads:
        i.join()
    attachments = []
    print('sending mail...')
    for i in recipient:
        ezgmail.send(i, subject, body, attachments=lst)
    print('sent mail')
    clean_temp()
    window.close()


class widg():
    def __init__(self):
        self.layout = QVBoxLayout()
        self.layout.setAlignment(Qt.AlignLeft)
        self.layout = QVBoxLayout()
        self.layout.setAlignment(Qt.AlignBottom)
        self.recip = NewText('recipient (x@mail.com, y@mail.com, ...)')
        self.sub = NewText('subject')
        self.bod = NewText('body')
        for i in [self.recip, self.sub, self.bod]:
            self.layout.addWidget(i)
            i.setFixedHeight(35)
        self.bod.setFixedHeight(100)
        self.bod.setAlignment(Qt.AlignTop)
        self.layout.addWidget(self.mail_button)

if __name__ == "__main__":
    app = QApplication([])
    window = QWidget()
    window.setWindowTitle('mail')
    widg = widg()
    widg.mail_button.clicked.connect(lambda: send_mail(widg.recip.text().split(','), widg.sub.text(), widg.bod.text()))
    window.setLayout(widg.layout)
    window.setStyleSheet('background-coor: #283747;color: white;')
    window.show()
    app.exec_()
