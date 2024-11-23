import cv2
from pyzbar.pyzbar import decode
import tkinter as tk
from tkinter import filedialog
from tkinter import ttk
import os
from pathlib import Path
import pyperclip  # Để sao chép dữ liệu vào clipboard

# Hàm để quét mã QR từ ảnh và lưu kết quả vào file text trong thư mục Downloads
def scan_qr_and_save_to_file(image_path):
    # Đọc ảnh từ đường dẫn người dùng cung cấp
    image = cv2.imread(image_path)

    # Kiểm tra nếu ảnh đọc thành công
    if image is None:
        print("Không thể đọc ảnh từ đường dẫn!")
        return []

    # Quét các mã QR trong ảnh
    qr_codes = decode(image)

    # Nếu không tìm thấy mã QR
    if not qr_codes:
        print("Không tìm thấy mã QR trong ảnh.")
        return []

    # Trả về dữ liệu của các mã QR tìm thấy
    qr_data_list = []
    for obj in qr_codes:
        qr_data = obj.data.decode('utf-8')  # Lấy dữ liệu từ mã QR
        qr_data_list.append(qr_data)
    
    return qr_data_list

# Hàm để chọn ảnh và hiển thị dữ liệu QR vào bảng
def choose_image():
    # Mở hộp thoại để chọn ảnh
    image_path = filedialog.askopenfilename(title="Chọn ảnh", filetypes=[("Image files", "*.jpg;*.jpeg;*.png")])

    # Kiểm tra nếu người dùng đã chọn ảnh
    if not image_path:
        print("Không có ảnh nào được chọn.")
        return

    # Quét mã QR và lấy dữ liệu
    qr_data_list = scan_qr_and_save_to_file(image_path)

    # Nếu có dữ liệu QR, hiển thị trong bảng
    if qr_data_list:
        for qr_data in qr_data_list:
            qr_table.insert('', 'end', values=(qr_data))  # Thêm dữ liệu vào bảng

# Hàm để sao chép dữ liệu QR đã chọn
def copy_to_clipboard():
    selected_item = qr_table.selection()  # Lấy dòng được chọn
    if selected_item:
        qr_data = qr_table.item(selected_item[0], 'values')[0]  # Lấy giá trị trong dòng được chọn
        pyperclip.copy(qr_data)  # Sao chép dữ liệu vào clipboard
        print(f"Đã sao chép: {qr_data}")

# Tạo giao diện tkinter
root = tk.Tk()
root.title("Quét Mã QR")

# Giao diện lựa chọn ảnh
choose_button = tk.Button(root, text="Chọn ảnh", command=choose_image)
choose_button.pack(pady=10)

# Tạo bảng Treeview để hiển thị thông tin QR
qr_table = ttk.Treeview(root, columns=("QR Data",), show="headings")
qr_table.heading("QR Data", text="Dữ liệu QR")
qr_table.pack(pady=10, padx=10, fill="both", expand=True)

# Nút sao chép
copy_button = tk.Button(root, text="Sao chép", command=copy_to_clipboard)
copy_button.pack(pady=10)

# Chạy ứng dụng
root.mainloop()
