import React from "react";

const Team = () => {
  return (
    <section className="bg-gradient-to-b from-amber-50 via-white to-rose-50 py-16 lg:py-28" id="team">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-amber-800 tracking-tight">
            Meet Our Team
          </h2>
          <p className="mt-4 text-base-content/70 text-lg max-w-2xl mx-auto">
            The friendly faces behind Bake & Coffee — dedicated to serving fresh pastries, handcrafted drinks,
            and warm hospitality every day.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Team Member 1 */}
          <div className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-amber-100">
            <div className="overflow-hidden">
              <img
                src="https://scontent.cdninstagram.com/v/t51.82787-15/573597993_18529297783038154_5475863005890745882_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=Mzc2MDIwNTg1NjI1NzQ4MDY5Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEzNjR4OTA4LnNkci5DMyJ9&_nc_ohc=jHA4kMtEl8YQ7kNvwEri3lD&_nc_oc=AdkyobEcIzrHkyhD3tD_aW58n3h5_9o-rYHas36gumgGVdVpW_vZ4GyHzuIuUiHuc2j4qBuJOIGuG5ZFnF9d0PRH&_nc_ad=z-m&_nc_cid=1012&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=9bz99XOW1ZmFEzpxhA9n8A&oh=00_Afg0sC9HFVKz2CnH4jua4rv5MGRl2zx57A3EWUvZHvD-Gw&oe=692C3592"
                alt="Team Member"
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-amber-700">HANG LAM</h3>
              <p className="text-base-content/70">OWNER</p>
              <p className="mt-3 text-base-content/60 text-sm">
                Specializes in handcrafted espresso drinks with a passion for latte art.
              </p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-amber-100">
            <div className="overflow-hidden">
              <img
                src="https://scontent.cdninstagram.com/v/t51.82787-15/573422682_18529297768038154_3333250594448579702_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=Mzc2MDIwNTg1NjU0MjcwODAzNQ%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEzNjR4OTA4LnNkci5DMyJ9&_nc_ohc=Ncl992_x8R0Q7kNvwGHgQpC&_nc_oc=Adl54sEAJhVfPBPti2eXxQrLWyozA-cs7VWsAEdemFTrrmtH4U-lNmo6hU1p3n0HmbqyuW2s6ImNukASTlYwbkhS&_nc_ad=z-m&_nc_cid=1012&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=GiNU-trcnqvnHD1pbN2JJQ&oh=00_AfgX3OmEx0M6o-sVTX9D9FLKKRXVK2o9rbuQxsbmHenkzg&oe=691C29C8"
                alt="Team Member"
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-amber-700">Jason Reed</h3>
              <p className="text-base-content/70">Pastry Chef</p>
              <p className="mt-3 text-base-content/60 text-sm">
                Creator of our fresh-baked croissants, bagels, and signature pastries.
              </p>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-amber-100">
            <div className="overflow-hidden">
              <img
                src="https://scontent.cdninstagram.com/v/t51.82787-15/576012365_18529297840038154_63247589698536070_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=Mzc2MDIwNTg1NjU0Mjc1MjM5Mg%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEzNjR4OTA4LnNkci5DMyJ9&_nc_ohc=mzW-xuAlHa4Q7kNvwH8OahI&_nc_oc=AdnxFi7--wV0OGrDP0LIcA1QCHFK-GBib2SqFBZJ5xgzgKoidfKf076laIM4nWv327pO8cuZYBBosEltdGgSET6q&_nc_ad=z-m&_nc_cid=1012&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=GiNU-trcnqvnHD1pbN2JJQ&oh=00_AfjQtxjEaeQnvskMf37CLeH6l0E9Sv-EcAwxIlxvmDSh8A&oe=691C587F"
                alt="Team Member"
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-amber-700">Emily Johnson</h3>
              <p className="text-base-content/70">Store Manager</p>
              <p className="mt-3 text-base-content/60 text-sm">
                Ensures every customer feels welcome and every visit runs smoothly.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;

