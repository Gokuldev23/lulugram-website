<script>
	import Icon from "@iconify/svelte";
	import { goto } from "$app/navigation";

	import { agentStore } from "$lib/stores/marketing/agentStore";

	import { validatePassword } from "$lib/js/marketing/utils";
	import { changePassword } from "$lib/js/marketing/api/auth";

	import Card from "$lib/Components/common/Card.svelte";
	import AlertModal from "$lib/Components/common/AlertModal.svelte";
	import SubmitButton from "$lib/Components/common/SubmitButton.svelte";
	import PasswordInput from "$lib/Components/marketing/PasswordInput.svelte";
	import FullLoading from "$lib/Components/common/FullLoading.svelte";
	import FormTitle from "$lib/Components/marketing/FormTitle.svelte";


    let t_change_password = "Change Password"
    let t_current_password = "Current Password"
    let t_new_password = "New Password"
    let t_forgotPass = 'Forgot password?'

    let form = $state({
		currentPassword: '',
		newPassword: '',
	});

    const validations = $derived({
		currentPassword: validatePassword(form.currentPassword),
		newPassword: validatePassword(form.newPassword)
	});

    const formErrors = $derived({
		currentPassword: validations.currentPassword ? null : "Invalid password",
		newPassword: validations.newPassword ? null : "Password Should contains 1 Uppercase, 1 Lowercase , 1 Number and 1 Symbol"
	})

    const formValid = $derived(
		(form.currentPassword && validations.currentPassword) &&
		(form.newPassword && validations.newPassword )
	);

    let a_token = $derived($agentStore.a_token)
    let errorSubmit = $state('')
    let loading = $state(false)


    const handlepasswordChange = async () => {

        let {currentPassword , newPassword } = form

        loading = true
        let result = await changePassword(currentPassword,newPassword,a_token)
        loading = false
        if(result.success){
            let userDetails = result.data
            await goto('/',{ replaceState : true })
        }else{
            errorSubmit = 'Something Went wrong!'
        }
    }

    const closeAlert = () => errorSubmit = ''

</script>
  
<main class="py-20">

    {#if loading}
        <FullLoading/>
    {/if}

    {#if errorSubmit}
        <AlertModal message={errorSubmit} msgTextColor={'red'} handleOnOk={closeAlert}/>
    {/if}

    <Card class="max-w-lg mx-auto">

        <FormTitle title={t_change_password}/>
        
        <form class="space-y-2">
            <PasswordInput label={t_current_password} bind:password={form.currentPassword} errPassword={formErrors.currentPassword} />

            <PasswordInput label={t_new_password} bind:password={form.newPassword} errPassword={formErrors.newPassword}/>

            <a class="my-4 block text-sm ml-1" href="/marketing/auth/forgot-password">{t_forgotPass}</a>

            <SubmitButton disabled={!formValid}/>
        </form>
    </Card>
</main>


