<template>
	<UModal class="sm:max-w-fit" :ui="{ width: 'sm:max-w-fit max-w-fit' }">
		<div class="w-60 p-5 flex flex-col">
			<b class="font-medium text-2xl">Вы уверены?</b>

			<div class="flex flex-nowrap items-center justify-between gap-5 mt-7">
				<UButton
					class="flex-1 justify-center"
					color="red"
					label="Нет"
					@click="$emit('submit', false)"
				/>
				<UButton
					class="flex-1 justify-center"
					label="Да"
					@click="$emit('submit', true)"
				/>
			</div>
		</div>
	</UModal>
</template>

<script lang="ts" setup>
interface Emit {
	(e: 'submit', value: boolean): void;
}
const $emit = defineEmits<Emit>();
</script>
