from flask import Flask, request, jsonify
from flask_cors import CORS
from forecast import SmartFinanceManager
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

finance_manager = SmartFinanceManager()

# Khởi tạo và train model với dữ liệu mẫu
sample_data = {
    'date': pd.date_range(start='2023-01-01', end='2023-12-31', freq='D'),
    'amount': np.random.normal(100000, 50000, 365),
    'category': np.random.choice(['Food', 'Transport', 'Shopping', 'Bills'], 365)
}
transactions_df = pd.DataFrame(sample_data)
transactions_df = finance_manager.prepare_data(transactions_df)
finance_manager.train_model(transactions_df)

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    income = float(data['income'])
    expenses = float(data['expenses'])
    months = int(data['months'])
    
    # Dự đoán chi tiêu tương lai
    future_dates = pd.date_range(start='2024-01-01', periods=months, freq='M')
    predictions = finance_manager.predict_expenses(future_dates, ['Food', 'Transport', 'Shopping', 'Bills'])
    
    # Phân tích mẫu chi tiêu
    patterns = finance_manager.analyze_spending_patterns(transactions_df)
    
    return jsonify({
        'predictions': {k: v.tolist() for k, v in predictions.items()},
        'patterns': patterns
    })

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    patterns = finance_manager.analyze_spending_patterns(transactions_df)
    return jsonify({
        'analysis': patterns,
        'summary': {
            'risk_level': patterns['rủi_ro']['chỉ_số_rủi_ro']['đánh_giá'],
            'trend': patterns['xu_hướng']['xu_hướng_chung'],
            'top_suggestions': [
                suggestion['đề_xuất'] 
                for suggestion in patterns['đề_xuất'].values() 
                if suggestion['mức_độ'] == '🔴 Cần giảm ngay'
            ]
        }
    })

if __name__ == '__main__':
    app.run(debug=True) 