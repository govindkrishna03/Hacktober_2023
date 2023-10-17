from PyQt5.QtWidgets import QLineEdit, QWidget, QLabel


def NewText(x=''):
    text = QLineEdit(x)
    text.setStyleSheet("border-radius: 10px;background-color: #17202a;")
    # text.setFixedSize(245, 115)
    print('generated textbox')
    return text
def open_label_window(x):
    global label_window
    label_window = QWidget()
    label_window.setWindowTitle('connecting to server...')
    label = QLabel(x, label_window)
    label.move(125, 50)
    label_window.show()
def close_label_window():
    label_window.close()