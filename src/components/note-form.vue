<template>
	<UForm class="p-5 space-y-4" :validate="validate" :state="state" @submit="onSubmit">
		<p class="font-medium text-center">{{ title }}</p>

		<UFormGroup
			v-for="field in formFields"
			:key="field.name"
			:label="field.label"
			:name="field.name"
		>
			<UInput v-model="field.value" />
		</UFormGroup>

		<UButton block type="submit" :label="submitLabel" />
	</UForm>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';

import type { BaseNote, NoteFormFieldSchema } from '@/common/types';

interface Emits {
	(e: 'submit', note: BaseNote): void;
}

interface Props {
	title: string;
	submitLabel: string;
	note?: BaseNote;
}

const $emit = defineEmits<Emits>();
const props = defineProps<Props>();

const formFields = ref<NoteFormFieldSchema[]>([
	{
		name: 'title',
		value: props.note?.title ?? '',
		label: 'Заголовок',
		required: true
	},
	{
		name: 'body',
		value: props.note?.body ?? '',
		label: 'Текст заметки',
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

function validate(values: BaseNote): FormError[] {
	const errors: FormError[] = [];

	formFields.value.forEach((field) => {
		if (!values[field.name] && field.required) {
			errors.push({ path: field.name, message: 'Обязательное поле' });
		}
	});

	return errors;
}

function onSubmit(event: FormSubmitEvent<BaseNote>) {
	$emit('submit', JSON.parse(JSON.stringify(event.data)));
}
</script>
