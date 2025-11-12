import React from 'react'

const Hero = () => {
  return (
    <div>
      <section id="home">
          <div className="gap-18  md:pt-45 lg:gap-35 lg:pt-47.5 flex h-full flex-col justify-between bg-[url('/src/components/ui/assets/img/free-layer-blur.png')] bg-cover bg-center bg-no-repeat py-8 pt-28 sm:py-16 md:gap-24 lg:py-24">
            <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 justify-self-center px-4 text-center sm:px-6 lg:px-8">
              <div className="bg-base-200 border-base-content/20 w-fit rounded-full border px-3 py-1">
                <span> Serving Food Lovers Since 2016 ❤️</span>
              </div>
              <h1 className="text-base-content z-1 relative text-5xl font-bold leading-[1.15] max-md:text-2xl md:max-w-3xl">
                <span>
                  Savor Every Bite. Savor
                  <br />
                  Every Moment.
                </span>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="348" height="10" viewBox="0 0 348 10" fill="none" class="-z-1 left-25 absolute -bottom-1.5 max-lg:left-4 max-md:hidden">
                  <path d="M1.85645 8.23715C62.4821 3.49284 119.04 1.88864 180.031 1.88864C225.103 1.88864 275.146 1.32978 319.673 4.85546C328.6 5.24983 336.734 6.33887 346.695 7.60269" stroke="url(#paint0_linear_17052_181397)" stroke-width="2" stroke-linecap="round" />
                  <defs>
                    <linearGradient id="paint0_linear_17052_181397" x1="29.7873" y1="1.85626" x2="45.2975" y2="69.7387" gradientUnits="userSpaceOnUse">
                      <stop stopColor="var(--color-primary)" />
                      <stop offset="1" stopColor="var(--color-primary-content)" />
                    </linearGradient>
                  </defs>
                </svg> */}
              </h1>
              <p className="text-base-content/80 max-w-3xl">Welcome to a dining experience where flavor, freshness, and hospitality come together. Whether it's your first visit or your hundredth, every plate is made to impress.</p>
              <a href="#" className="btn bg-gradient-to-r px-3 py-2 rounded-md from-red-500 to-red-300 hover:from-red-600 hover:to-red-700 text-white border-0 btn-lg">
                Experience the Flavor
                <span className="icon-[tabler--arrow-right] size-5 rtl:rotate-180"></span>
              </a>
            </div>
            <img src="https://demos.flyonui.com/templates/assets/img/free-landing-page/dishes-hero.png" alt="Dishes" className="min-h-67 w-full object-cover" />
            {/* <img src="" alt=""  /> */}
          </div>
        </section>
    </div>
  )
}

export default Hero
