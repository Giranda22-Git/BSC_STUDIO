<template>
<header class="body-font h-full w-full bg-black">
  <div class="container flex flex-row flex-nowrap items-center align-middle text-center p-5 mx-auto md:pl-10">
    <nav class="flex flex-row flex-nowrap mr-auto">
      <a href="#" class="font-normal text-gray-50">BSC STUDIO</a>
    </nav>
		<div class="ml-auto">
		</div>
    <nav class="flex flex-row flex-nowrap ml-auto items-center align-middle text-center">
      <a href="#" class="md:mr-10 mr-2 text-gray-50 text-xs sm:mr-5">Проекты</a>
      <a href="#" class="md:mr-10 mr-2 text-gray-50 text-xs sm:mr-5">Услуги</a>
			<a href="#" class="md:mr-10 mr-2 text-gray-50 text-xs sm:mr-5">О нас</a>
      <a href="">
      <div class="burger border-1 rounded-full border-white flex flex-col justify-center">
          <span class="mx-auto mt-auto mb-1 line border-0 rounded-3xl"></span>
          <span class="mx-auto mb-auto line border-0 rounded-3xl"></span>
      </div>
      </a>
    </nav>
  </div>
</header>
</template>

<style scoped>
.border-1 {
  border-width: 1px;
}
.line {
  background-color: white;
  height: 0.6px;
  width: 50%;
}
.burger {
  width: 20px;
  height: 20px;
}
</style>