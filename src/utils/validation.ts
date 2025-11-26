export function validateLogin(email: string, password: string) {
	const emailRegex = /^[A-Za-z0-9\.-_]+@[A-Za-z]+\.[A-Za-z]{2,4}$/;
	if (!email || !password) {
		return 'All fields are required';
	}
	if (!emailRegex.test(email)) {
		return 'Enter a valid email';
	}
	if (password.length < 8) {
		return 'Password length should be atleast 8 characters';
	}
	return null;
}
