export const validateEmail = (email: string): string => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email) && email) {
        return "Please enter a valid email address.";
    }
    return '';
};

export const validatePassword = (password: string): string => {
    if (password.length < 8 && password) {
        return "Password must be at least 8 characters long.";
    }
    return '';
};
