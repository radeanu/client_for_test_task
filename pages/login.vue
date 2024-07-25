<template>
	<div>
		<UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
			<UFormGroup label="Email" name="username">
				<UInput v-model="state.username" />
			</UFormGroup>

			<UFormGroup label="Password" name="password">
				<UInput v-model="state.password" type="password" />
			</UFormGroup>

			<p v-if="submitError.length" class="text-red-600">{{ submitError }}</p>

			<UButton type="submit" :disabled="loading.isLoading.value"> Submit </UButton>
		</UForm>
	</div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';

import type { LoginPayload } from '@/common/types';

import useLocalStorage from '@/common/useLocalStorage';
import useApiService from '@/common/useApiService';
import useLoading from '@/common/useLoading';

const storage = useLocalStorage();
const apiService = useApiService();
const loading = useLoading();

const submitError = ref<string>('');
const state = ref({
	username: 'webmaster',
	password: 'webmaster'
});

function validate(state: LoginPayload): FormError[] {
	const errors: FormError[] = [];

	if (!state.username) errors.push({ path: 'email', message: 'Обязательное поле' });
	if (!state.password) errors.push({ path: 'password', message: 'Обязательное поле' });

	return errors;
}

async function onSubmit(event: FormSubmitEvent<LoginPayload>) {
	try {
		loading.start();
		submitError.value = '';
		const res = await apiService.userLogin(event.data);
		storage.setItem('token', res.token);
		await navigateTo('/notes');
	} catch (e) {
		const error = e as { data: { error: string } };
		const message = error?.data?.error ?? 'Ошибка';

		submitError.value = message;
	} finally {
		loading.end();
	}
}
</script>

<style lang="scss" scoped></style>
