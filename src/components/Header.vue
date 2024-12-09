<template lang="">
    <div class="navbar bg-base-100 border-b-2">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl">Car Rent</a>
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
                <li><RouterLink to="/">Orders</RouterLink></li>
                <li><RouterLink to="/cars">Cars</RouterLink></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>