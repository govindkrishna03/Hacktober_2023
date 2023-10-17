from PyQt5.QtCore import Qt, QDate
from PyQt5.QtWidgets import QApplication, QWidget, QLineEdit, QVBoxLayout, QCalendarWidget, QLabel, QComboBox,QSizePolicy
from buttons import RoundedButton

class widg():
    def __init__(self):
        self.layout = QVBoxLayout()
        self.layout.setAlignment(Qt.AlignLeft)
        # --------------------------------------------cam selection-----------------------------------------------------
        self.camText = RoundedButton('cam')
        self.camText.setFixedHeight(25)
        self.cam = QComboBox()
        for i in ['FHAZ','RHAZ','MAST','CHEMCAM','MAHLI','MARDI','NAVCAM','PANCAM','MINITES']:
            self.cam.addItem(i)
        # -------------------------------------------date selection-----------------------------------------------------
        self.earthdateText = RoundedButton('earth date')
        self.earthdateText.setFixedHeight(2)
        self.earthdate = QCalendarWidget()  # it's not a bug, it's a feature

        self.earthdate.clicked[QDate].connect(lambda: print(self.earthdate.selectedDate().toPyDate()))  # prints date
        # ------------------------------------------rover selection-----------------------------------------------------
        self.roverText = RoundedButton('rover')
        self.roverText.setFixedHeight(25)
        self.dropdown = QComboBox()
        self.dropdown.addItem("curiosity")
        self.dropdown.addItem("opportunity")
        self.dropdown.addItem("spirit")
        self.dropdown.move(20, 20)
        self.rover = self.dropdown
        self.x = RoundedButton('Fetch')  # fetch button
        self.x.setFixedHeight(25)

        self.params = [self.earthdateText, self.earthdate, self.roverText, self.rover, self.camText, self.cam, self.x]
        self.exclude = [self.earthdateText, self.roverText, self.camText, self.x,self.earthdate]

        self.layout = QVBoxLayout()
        self.layout.setAlignment(Qt.AlignBottom)
        self.x.setFixedHeight(35)
        for i in self.params:
            if i != self.earthdate:
                i.setFixedWidth(300)
            if i != self.x:
                i.setStyleSheet("border-radius: 5px;background-color: #1c2833;color: white;")
            if i not in self.exclude:
                i.setStyleSheet("border-radius: 5px;background-color: #283747;color: white;")
                i.setFixedHeight(30)
            if i == self.earthdate:
                i.setStyleSheet("border-radius: 5px;background-color: #283747;")
                i.setFixedSize(300, 300)
            self.layout.addWidget(i)


if __name__ == "__main__":
    app = QApplication([])
    window = QWidget()
    window.setWindowTitle('Fetch instruction')
    widg = widg()
    window.setLayout(widg.layout)
    window.show()
    app.exec_()
