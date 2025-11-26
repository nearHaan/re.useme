<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { validateLogin } from '../../utils/validation';

	let errorText = $state('');

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		errorText = '';
		const form = e?.target as HTMLFormElement;
		const formData = new FormData(form);

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const error = validateLogin(email, password);
		if (error) {
			errorText = error;
			return;
		}

		try {
			const response = await fetch(`${PUBLIC_API_BASE_URL}/auth/login`, {
				headers: { 'Content-type': 'application/json' },
				method: 'POST',
				body: JSON.stringify({ email, password })
			});
			const data = await response.json();
			if (!response.ok) {
				errorText = data.error;
				return;
			}
			localStorage.setItem('accessToken', data.accessToken);
			console.log('accessToken: ', data.accessToken);
			goto('/');
		} catch (err: any) {
			errorText = 'Something went wrong';
		}
	};
</script>

<div class="flex h-full">
	<div class="w-full bg-darkerBg max-md:hidden"></div>
	<div class="flex w-full items-center justify-center">
		<form onsubmit={handleSubmit} class="flex w-80 flex-col">
			<h2 class="mb-lg">Login</h2>
			<p class="{errorText.length > 0 ? '' : 'hidden'} p-error mb-xs">{errorText}</p>
			<p class="text-xs">Email</p>
			<input
				name="email"
				type="email"
				placeholder="example@gmail.com"
				class="input-primary mb-sm"
			/>
			<p class="text-xs">Password</p>
			<input name="password" type="password" class="input-primary" />
			<a href="/" class="mt-xs w-full text-right text-text">Forgot Password</a>
			<button class="btn-primary mt-lg">Login</button>
			<p class="my-xs w-full text-center">or</p>
			<button class="btn-secondary mt-sm">Login with Google</button>
			<p class="mt-lg w-full">Do not have an account? <a href="/">Create Account</a></p>
		</form>
	</div>
</div>
