<template>
	<div class="flex flex-wrap gap-2">
		<div class="w-full flex justify-between animate-pulse gap-2">
			<USkeleton class="h-6 w-[250px]" :ui="{ background: 'bg-gray-200' }" />

			<div class="flex gap-2">
				<USkeleton class="h-6 w-[50px]" :ui="{ background: 'bg-gray-200' }" />
				<USkeleton class="h-6 w-[50px]" :ui="{ background: 'bg-gray-200' }" />
			</div>
		</div>

		<USkeleton class="h-40 w-full animate-pulse" :ui="{ background: 'bg-gray-200' }" />
	</div>
</template>
