export const min6 = {
  min: 6,
  message: "Ít nhất 6 ký tự",
};
export const max30 = {
  max: 30,
  message: "toi da 30 ky tu",
};

export const requireRule = {
  required: true,
  message: "ban pha nhap thong tin",
};
export const emailType = {
  type: "email",
  message: "email sai dinhj dangj",
};

export const checkPassword = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Nhập lại mật khẩu phải trùng khớp"));
  },
});

export const useNamerule = [min6, max30, requireRule];
export const EmailRule = [min6, max30, requireRule, emailType];
export const PasswordRule = [min6, max30, requireRule];
export const Re_Password = [min6, max30, requireRule, checkPassword];
