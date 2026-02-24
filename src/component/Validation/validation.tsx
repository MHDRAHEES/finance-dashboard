
export const validateRequired = (value: string, fieldName: string) => {
  if (!value || value.trim() === "") {
    return `${fieldName} is required`;
  }
  return "";
};

export const validateEmail = (email: string) => {
  if (!email) return "Email is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  return "";
};

export const validatePassword = (password: string) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
};

export const validateAmount = (amount: string | number) => {
  if (!amount) return "Amount is required";

  const value = String(amount).trim();
  const amountRegex = /^\d{1,3}(,\d{3})*(\.\d+)?$|^\d+(\.\d+)?$/;

  if (!amountRegex.test(value)) {
    return "Invalid amount format";
  }

  // Remove commas before converting
  const num = Number(value.replace(/,/g, ""));

  if (isNaN(num)) return "Amount must be a number";
  if (num <= 0) return "Amount must be greater than 0";

  return "";
};