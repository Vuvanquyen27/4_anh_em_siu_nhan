import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
import joblib

class SmartFinanceManager:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        
    def prepare_data(self, transactions_df):
        """Chuẩn bị dữ liệu từ các giao dịch"""
        # Chuyển đổi ngày thành các features
        transactions_df['date'] = pd.to_datetime(transactions_df['date'])
        transactions_df['month'] = transactions_df['date'].dt.month
        transactions_df['day_of_week'] = transactions_df['date'].dt.dayofweek
        
        return transactions_df

    def train_model(self, historical_data):
        """Huấn luyện mô hình dự đoán chi tiêu"""
        # Chuẩn bị features
        features = ['month', 'day_of_week', 'amount', 'category']
        X = historical_data[features]
        y = historical_data['amount']
        
        # Chuyển đổi categorical features
        X = pd.get_dummies(X, columns=['category'])
        
        # Chia dataset
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
        
        # Chuẩn hóa dữ liệu
        X_train_scaled = self.scaler.fit_transform(X_train)
        
        # Huấn luyện mô hình
        self.model.fit(X_train_scaled, y_train)
        
    def predict_expenses(self, future_dates, categories):
        """Dự đoán chi tiêu trong tương lai theo từng danh mục"""
        predictions_by_category = {}
        
        # Store the feature names used during training
        feature_names = None
        if hasattr(self.scaler, 'feature_names_in_'):
            feature_names = self.scaler.feature_names_in_
        
        # Dự đoán cho từng danh mục riêng biệt
        unique_categories = ['Food', 'Transport', 'Shopping', 'Bills']
        for category in unique_categories:
            # Tạo dữ liệu cho danh mục cụ thể
            category_dates = future_dates
            category_data = pd.DataFrame({
                'date': category_dates,
                'category': category,
                'amount': 0
            })
            
            # Chuẩn bị features
            category_data['month'] = pd.to_datetime(category_data['date']).dt.month
            category_data['day_of_week'] = pd.to_datetime(category_data['date']).dt.dayofweek
            
            # Chọn features và mã hóa
            features = ['month', 'day_of_week', 'amount', 'category']
            category_data = category_data[features]
            
            # Create one-hot encoding with all possible categories
            category_dummies = pd.get_dummies(category_data['category'], prefix='category')
            # Add missing category columns if any
            for cat in unique_categories:
                if f'category_{cat}' not in category_dummies.columns:
                    category_dummies[f'category_{cat}'] = 0
                    
            # Combine with other features
            category_data_encoded = pd.concat([
                category_data[['month', 'day_of_week', 'amount']], 
                category_dummies
            ], axis=1)
            
            # Ensure columns are in the same order as during training
            if feature_names is not None:
                category_data_encoded = category_data_encoded.reindex(columns=feature_names, fill_value=0)
            
            # Chuẩn hóa dữ liệu
            category_data_scaled = self.scaler.transform(category_data_encoded)
            
            # Dự đoán
            category_predictions = self.model.predict(category_data_scaled)
            predictions_by_category[category] = category_predictions
        
        return predictions_by_category

    def analyze_spending_patterns(self, transactions_df):
        """Phân tích mẫu chi tiêu chi tiết theo danh mục với AI insights"""
        patterns = {
            'tổng_chi_tiêu': transactions_df['amount'].sum(),
            'chi_tiêu_theo_tháng': transactions_df.groupby('month')['amount'].mean().to_dict(),
            'chi_tiêu_theo_danh_mục': {
                'ăn_uống': transactions_df[transactions_df['category'] == 'Food']['amount'].sum(),
                'đi_lại': transactions_df[transactions_df['category'] == 'Transport']['amount'].sum(),
                'mua_sắm': transactions_df[transactions_df['category'] == 'Shopping']['amount'].sum(),
                'hóa_đơn': transactions_df[transactions_df['category'] == 'Bills']['amount'].sum()
            }
        }

        # Thêm phân tích xu hướng
        patterns['xu_hướng'] = self._analyze_trends(transactions_df)
        
        # Thêm phát hiện bất thường
        patterns['bất_thường'] = self._detect_anomalies(transactions_df)
        
        # Thêm dự đoán rủi ro
        patterns['rủi_ro'] = self._assess_financial_risks(transactions_df)
        
        # Thêm đề xuất tối ưu
        patterns['đề_xuất'] = self._generate_optimization_suggestions(transactions_df)

        return patterns

    def _analyze_trends(self, df):
        """Phân tích xu hướng chi tiêu"""
        trends = {}
        
        # Xu hướng theo thời gian
        monthly_spending = df.groupby('month')['amount'].sum()
        trend_coefficient = np.polyfit(monthly_spending.index, monthly_spending.values, 1)[0]
        
        if trend_coefficient > 0:
            trends['xu_hướng_chung'] = f"🔴 Chi tiêu đang tăng với tốc độ {self.format_currency(trend_coefficient)}/tháng"
        else:
            trends['xu_hướng_chung'] = f"🟢 Chi tiêu đang giảm với tốc độ {self.format_currency(abs(trend_coefficient))}/tháng"

        # Phân tích theo danh mục
        for category in ['Food', 'Transport', 'Shopping', 'Bills']:
            cat_data = df[df['category'] == category]
            if not cat_data.empty:
                monthly_cat = cat_data.groupby('month')['amount'].sum()
                cat_trend = np.polyfit(monthly_cat.index, monthly_cat.values, 1)[0]
                trends[f'xu_hướng_{category}'] = {
                    'hệ_số': cat_trend,
                    'đánh_giá': "Tăng 📈" if cat_trend > 0 else "Giảm 📉"
                }

        return trends

    def _detect_anomalies(self, df):
        """Phát hiện các chi tiêu bất thường"""
        anomalies = {}
        
        # Phát hiện theo phương pháp Z-score
        for category in ['Food', 'Transport', 'Shopping', 'Bills']:
            cat_data = df[df['category'] == category]['amount']
            if not cat_data.empty:
                mean = cat_data.mean()
                std = cat_data.std()
                threshold = 2
                
                anomaly_dates = df[
                    (df['category'] == category) & 
                    (abs(df['amount'] - mean) > threshold * std)
                ]['date'].tolist()
                
                if anomaly_dates:
                    anomalies[category] = {
                        'số_lượng': len(anomaly_dates),
                        'ngày': anomaly_dates,
                        'mức_độ': '⚠️ Cao' if len(anomaly_dates) > 5 else '⚠️ Thấp'
                    }

        return anomalies

    def _assess_financial_risks(self, df):
        """Đánh giá rủi ro tài chính"""
        risks = {}
        
        # Tính toán các chỉ số rủi ro
        monthly_volatility = df.groupby('month')['amount'].std() / df.groupby('month')['amount'].mean()
        risk_score = monthly_volatility.mean() * 100
        
        risks['chỉ_số_rủi_ro'] = {
            'điểm': round(risk_score, 2),
            'đánh_giá': '🔴 Cao' if risk_score > 30 else '🟡 Trung bình' if risk_score > 15 else '🟢 Thấp',
            'giải_thích': f"Độ biến động chi tiêu: {round(risk_score, 2)}%"
        }
        
        # Phân tích tỷ lệ chi tiêu/thu nhập (giả định)
        expense_ratio = df['amount'].sum() / (df['amount'].mean() * 12)  # Giả định thu nhập
        risks['tỷ_lệ_chi_tiêu'] = {
            'giá_trị': round(expense_ratio * 100, 2),
            'đánh_giá': '⚠️ Cao' if expense_ratio > 0.7 else '✅ An toàn'
        }

        return risks

    def _generate_optimization_suggestions(self, df):
        """Tạo đề xuất tối ưu hóa chi tiêu"""
        suggestions = {}
        
        # Phân tích chi tiêu theo danh mục
        category_spending = df.groupby('category')['amount'].sum()
        total_spending = category_spending.sum()
        
        # Tạo đề xuất dựa trên tỷ lệ chi tiêu
        for category, amount in category_spending.items():
            ratio = amount / total_spending
            if ratio > 0.4:
                suggestions[category] = {
                    'mức_độ': '🔴 Cần giảm ngay',
                    'đề_xuất': f"Giảm chi tiêu {category} xuống {self.format_currency(amount * 0.7)} VND/tháng"
                }
            elif ratio > 0.3:
                suggestions[category] = {
                    'mức_độ': '🟡 Cần chú ý',
                    'đề_xuất': f"Cân nhắc giảm chi tiêu {category} xuống {self.format_currency(amount * 0.85)} VND/tháng"
                }
            else:
                suggestions[category] = {
                    'mức_độ': '🟢 Ổn định',
                    'đề_xuất': "Duy trì mức chi tiêu hiện tại"
                }

        return suggestions

    def suggest_budget(self, income, fixed_expenses, savings_goal, custom_ratios=None):
        """Đề xuất ngân sách dựa trên thu nhập và mục tiêu"""
        disposable_income = income - fixed_expenses
        
        # Các mẫu phân bổ ngân sách định sẵn
        budget_templates = {
            '1': {'name': 'Cân bằng (50-30-20)', 'ratios': {'necessities': 0.5, 'wants': 0.3, 'additional_savings': 0.2}},
            '2': {'name': 'Tiết kiệm (60-20-20)', 'ratios': {'necessities': 0.6, 'wants': 0.2, 'additional_savings': 0.2}},
            '3': {'name': 'Tự do (40-40-20)', 'ratios': {'necessities': 0.4, 'wants': 0.4, 'additional_savings': 0.2}},
        }
        
        if custom_ratios:
            ratios = custom_ratios
        else:
            ratios = budget_templates['1']['ratios']  # Mặc định là mẫu cân bằng
            
        recommended_budget = {
            'savings': savings_goal,
            'necessities': disposable_income * ratios['necessities'],
            'wants': disposable_income * ratios['wants'],
            'additional_savings': disposable_income * ratios['additional_savings']
        }
        return recommended_budget, budget_templates

    def format_currency(self, amount):
        """Format số tiền theo định dạng tiền tệ Việt Nam"""
        return "{:,.0f}".format(amount).replace(",", ".")

    def format_input_currency(self, prompt):
        """Xử lý nhập số tiền từ người dùng với định dạng tiền tệ"""
        while True:
            try:
                # Loại bỏ dấu chấm và khoảng trắng từ input
                user_input = input(prompt).replace(".", "").replace(" ", "")
                # Chuyển đổi sang số
                amount = float(user_input)
                # Hiển thị lại số đã format để xác nhận
                formatted = self.format_currency(amount)
                print(f"→ Số tiền: {formatted} VND")
                confirm = input("Xác nhận? (Y/N): ").lower()
                if confirm == 'y' or confirm == '':
                    return amount
            except ValueError:
                print("Vui lòng nhập số hợp lệ!")

    def evaluate_savings(self, total_savings):
        """Đánh giá và đưa ra lời khuyên về tiết kiệm"""
        if total_savings >= 1000000000:  # 1 tỷ VND
            return "\n💎 Chúc mừng! Bạn đã là một nhà tiết kiệm xuất sắc. Hãy tiếp tục phát huy nhé!"
        else:
            gap = 1000000000 - total_savings
            return f"\n💪 Cố gắng lên! Bạn cần tiết kiệm thêm {self.format_currency(gap)} VND nữa để đạt mục tiêu 1 tỷ VND"

def main():
    # Khởi tạo manager
    finance_manager = SmartFinanceManager()
    
    # Ví dụ dữ liệu
    sample_data = {
        'date': pd.date_range(start='2023-01-01', end='2023-12-31', freq='D'),
        'amount': np.random.normal(100000, 50000, 365),
        'category': np.random.choice(['Food', 'Transport', 'Shopping', 'Bills'], 365)
    }
    transactions_df = pd.DataFrame(sample_data)
    
    # Prepare data first
    transactions_df = finance_manager.prepare_data(transactions_df)
    
    # Huấn luyện mô hình
    finance_manager.train_model(transactions_df)
    
    # Phân tích mẫu chi tiêu
    patterns = finance_manager.analyze_spending_patterns(transactions_df)
    print("\nPhân tích chi tiết chi tiêu:")
    print(f"Tổng chi tiêu: {finance_manager.format_currency(patterns['tổng_chi_tiêu'])} VND")
    print("\nChi tiêu theo danh mục:")
    for category, amount in patterns['chi_tiêu_theo_danh_mục'].items():
        print(f"{category}: {finance_manager.format_currency(amount)} VND ({patterns['tỷ_lệ_chi_tiêu'][category]:.1f}%)")
    
    print("\nPhân tích theo ngày trong tuần:")
    days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
    print(f"Ngày chi tiêu nhiều nhất: {days[patterns['phân_tích_theo_ngày']['ngày_chi_tiêu_nhiều_nhất']]}")
    
    # Nhập thông tin ngân sách
    print("\n=== NHẬP THÔNG TIN NGÂN SÁCH ===")
    try:
        income = finance_manager.format_input_currency("Nhập tổng thu nhập hàng tháng (VND): ")
        fixed_expenses = finance_manager.format_input_currency("Nhập chi phí cố định hàng tháng (VND): ")
        savings_goal = finance_manager.format_input_currency("Nhập mục tiêu tiết kiệm hàng tháng (VND): ")
        
        # Hiển thị các mẫu phân bổ ngân sách
        _, templates = finance_manager.suggest_budget(income, fixed_expenses, savings_goal)
        print("\nCác mẫu phân bổ ngân sách:")
        for key, template in templates.items():
            print(f"{key}. {template['name']}")
        print("4. Tự điều chỉnh tỷ lệ")
        
        choice = input("\nChọn mẫu phân bổ ngân sách (1-4): ")
        
        custom_ratios = None
        if choice == '4':
            print("\nNhập tỷ lệ phân bổ (tổng phải bằng 100%):")
            necessities = float(input("Tỷ lệ chi tiêu thiết yếu (%): ")) / 100
            wants = float(input("Tỷ lệ chi tiêu cá nhân (%): ")) / 100
            additional_savings = float(input("Tỷ lệ tiết kiệm thêm (%): ")) / 100
            
            if abs(necessities + wants + additional_savings - 1.0) > 0.01:
                raise ValueError("Tổng tỷ lệ phải bằng 100%")
                
            custom_ratios = {
                'necessities': necessities,
                'wants': wants,
                'additional_savings': additional_savings
            }
        
        # Tính toán và hiển thị ngân sách
        budget, _ = finance_manager.suggest_budget(income, fixed_expenses, savings_goal, custom_ratios)
        print("\n=== ĐỀ XUẤT NGÂN SÁCH ===")
        print(f"Tiết kiệm cố định: {finance_manager.format_currency(budget['savings'])} VND")
        print(f"Chi tiêu thiết yếu: {finance_manager.format_currency(budget['necessities'])} VND")
        print(f"Chi tiêu cá nhân: {finance_manager.format_currency(budget['wants'])} VND")
        print(f"Tiết kiệm thêm: {finance_manager.format_currency(budget['additional_savings'])} VND")
        
        # Tính tổng tiết kiệm
        total_savings = budget['savings'] + budget['additional_savings']
        print(finance_manager.evaluate_savings(total_savings))
        
    except ValueError as e:
        print(f"\nLỗi: {str(e)}")
        print("Vui lòng nhập lại với số liệu hợp lệ.")
    
    # Dự đoán chi tiêu tương lai
    print("\n=== DỰ ĐOÁN CHI TIÊU TƯƠNG LAI ===")
    future_dates = pd.date_range(start='2024-01-01', end='2024-01-31', freq='D')
    categories = ['Food', 'Transport', 'Shopping', 'Bills']
    predictions = finance_manager.predict_expenses(future_dates, categories)
    
    # Hiển thị dự đoán theo từng danh mục
    category_names = {
        'Food': 'Ăn uống',
        'Transport': 'Đi lại',
        'Shopping': 'Mua sắm',
        'Bills': 'Hóa đơn'
    }
    
    print("\nDự đoán chi tiêu trung bình hàng ngày theo danh mục:")
    for category, pred in predictions.items():
        avg_prediction = np.mean(pred)
        print(f"{category_names[category]}: {finance_manager.format_currency(avg_prediction)} VND")
    
    print("\nTổng chi tiêu dự kiến trong tháng theo danh mục:")
    for category, pred in predictions.items():
        total_prediction = np.sum(pred)
        print(f"{category_names[category]}: {finance_manager.format_currency(total_prediction)} VND")
    
    # Tính tổng chi tiêu dự kiến
    total_monthly = sum(np.sum(pred) for pred in predictions.values())
    print(f"\nTổng chi tiêu dự kiến trong tháng: {finance_manager.format_currency(total_monthly)} VND")

if __name__ == "__main__":
    main()
