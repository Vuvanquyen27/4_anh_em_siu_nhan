from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash

app = Flask(__name__)
CORS(app)

# Cấu hình database (thay thế thông tin kết nối của bạn)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:your_password@localhost/your_database_name'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Thêm model User
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.json
        
        # Kiểm tra dữ liệu đầu vào
        if not all(key in data for key in ['fullName', 'email', 'phone', 'password']):
            return jsonify({'message': 'Thiếu thông tin!'}), 400

        # Kiểm tra email tồn tại
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'message': 'Email đã được sử dụng!'}), 400

        # Tạo user mới
        new_user = User(
            full_name=data['fullName'],
            email=data['email'],
            phone=data['phone'],
            password_hash=generate_password_hash(data['password'])
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({'message': 'Đăng ký thành công!'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 