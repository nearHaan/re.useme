<script>
	import TemplateSubComp from '$lib/components/template-sub-comp.svelte';
</script>

<div class="bg-backgroun flex h-full w-full flex-col p-sm">
	<h3>Personal Info</h3>
	<div class="mt-sm flex grid-cols-2 flex-col gap-x-sm border-2 border-darkerBg p-sm lg:grid">
		<TemplateSubComp title="First Name" type="text" example="Farhaan" />
		<TemplateSubComp title="First Name" type="date" example="Farhaan" />
		<TemplateSubComp title="First Name" type="text-area" example="Farhaan" />
	</div>
	<div class="mt-sm flex items-center justify-between">
		<button class="btn-secondary"> Previous </button>
		<button class="btn-primary"> Next </button>
	</div>
</div>
