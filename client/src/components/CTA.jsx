import React from 'react'

const CTA = () => {
  return (
    <div>
              {/* <!-- CTA Section --> */}
        <div class="bg-base-100 py-8 sm:py-16 lg:py-60">
  <div class="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
    <div class="bg-gradient-to-r from-red-400 via-blue-500 to-yellow-300 p-[1px] rounded-3xl overflow-hidden">
      <div class="bg-base-100 rounded-3xl p-0.5">
        <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl p-8 lg:p-16 relative">
          <div class="flex justify-between gap-8 max-md:flex-col max-sm:items-center max-sm:text-center md:items-center">
            <div class="max-w-xs space-y-4 lg:max-w-lg">
              <h2 class="text-base-content text-xl font-bold md:text-3xl">
                Order Now & Satisfy Your Cravings
              </h2>
              <p class="text-base-content/80">
                Let us bring the flavors you love straight to your door. From classic comfort dishes to chef-curated specials, every bite is made with care and delivered fresh.
              </p>

              {/* <!-- Gradient Button --> */}
              <a
                href="#"
                class="inline-flex items-center gap-2 px-6 py-2 rounded-full text-white font-semibold 
                bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 
                hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-md"
              >
                Read More
                <span class="icon-[tabler--arrow-right]"></span>
              </a>
            </div>

            <img
              src="https://demos.flyonui.com/templates/assets/img/free-landing-page/pizza.png"
              alt="Pizza"
              class="rtl:rotate-y-180 absolute end-0 top-0 h-full max-w-md rounded-br-3xl max-md:hidden"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default CTA
