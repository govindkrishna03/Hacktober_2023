from PyQt5.QtWidgets import QPushButton

class RoundedButton(QPushButton):
    def __init__(self, *args):
        super().__init__(*args)
        self.setFixedSize(300, 50)
        self.setStyleSheet("background-color: orange; border-radius: 10px;")


def button_list(img):  # img is the image widget
    print('buttons added')
    button2 = RoundedButton("send image")
    spacer = RoundedButton()
    spacer.setFixedSize(250, 25)
    spacer.setStyleSheet("border-radius: 10px;background-color: #17202a;")
    print('buttons added')

    lst = { "space": spacer, "send": button2}
    return lst

