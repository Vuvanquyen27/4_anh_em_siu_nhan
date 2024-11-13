function FormRegister(){
    return (
        <div className="form-register">
  <form>
          <h2>Form Đăng Ký</h2>
          <label>
            Tài khoản
            <input type="text" name="username" />
          </label>
          <br />
          <label>
            Mật khẩu
            <input type="password" name="password" />
          </label>
          <br />
          <label>
            Email
            <input type="text" name="email" />
          </label>
          <br />
          <label>
            Nhập lại mật khẩu
            <input type="password" name="repeatPassword"/>
          </label>
          <button type="submit">Đăng ký</button>
        </form>
  </div>
    );
}

export default FormRegister

