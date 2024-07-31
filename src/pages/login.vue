<template>
	<div class="h-full w-full flex justify-center items-center">
		<UForm
			class="w-72 space-y-4"
			:validate="validate"
			:state="state"
			@submit="onSubmit"
		>
			<UFormGroup
				v-for="field in formFields"
				:key="field.name"
				:label="field.label"
				:name="field.name"
			>
				<UInput v-model="field.value" />
			</UFormGroup>

			<p v-if="submitError.length" class="text-red-600">{{ submitError }}</p>

			<UButton
				block
				type="submit"
				:disabled="loading.isLoading.value"
				label="Войти"
			/>
		</UForm>
	</div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';

import { useLoading } from '@/composables';
import { useAuthStore } from '@/stores/auth';
import type { LoginPayload, UserFormFieldSchema } from '@/common/types';

definePageMeta({
	layout: 'login'
});

const loading = useLoading();
const authStore = useAuthStore();

const submitError = ref<string>('');
const formFields = ref<UserFormFieldSchema[]>([
	{
		name: 'username',
		value: 'webmaster',
		label: 'Имя пользователя',
		required: true
	},
	{
		name: 'password',
		value: 'webmaster',
		label: 'Пароль',
		required: true
	}
]);

const state = computed(() => {
	return formFields.value.reduce((acc, curr) => {
		return {
			...acc,
			[curr.name]: curr.value
		};
	}, {});
});

function validate(values: LoginPayload): FormError[] {
	const errors: FormError[] = [];

	formFields.value.forEach((field) => {
		if (!values[field.name] && field.required) {
			errors.push({ path: field.name, message: 'Обязательное поле' });
		}
	});

	return errors;
}

async function onSubmit(event: FormSubmitEvent<LoginPayload>) {
	try {
		loading.start();
		submitError.value = '';

		await authStore.login(event.data);
		await navigateTo('/notes');
	} catch (e) {
		const error = e as { data: { message: string } };
		const message = error?.data?.message ?? 'Ошибка';

		submitError.value = message;
	} finally {
		loading.end();
	}
}
</script>
