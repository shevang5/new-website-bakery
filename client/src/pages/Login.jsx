import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { asyncLoginUsers } from '../store/action/userActions'
import { nanoid } from 'nanoid'
// Use a more inviting, high-quality, bakery-specific image
import bakeryHero from '../assets/bakery-hero.jpg'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    data.id = nanoid()
    dispatch(asyncLoginUsers(data))
    console.log(data)
    // Use a better success message or state management here for real apps
    navigate('/products')
  }

  // --- UI Improvements in this section ---

  return (
    // Use a softer background color like a light cream/beige instead of stark white/gray
    <div className="flex min-h-screen w-full bg-amber-50">

      {/* Left Text/Image Side (Bakery Vibe) */}
      <div className="hidden lg:flex w-1/2 relative bg-amber-900 items-center justify-center p-12">
        {/* Use a better background image setup with a subtle overlay */}
        <div className="absolute inset-0">
          {/* Ensure the image is highly relevant (e.g., fresh bread, pastries) */}
          <img
            src={bakeryHero}
            alt="Delicious assortment of fresh bakery goods"
            className="w-full h-full object-cover"
          />
          {/* Subtle dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        <div className="relative z-10 px-12 text-center text-white">
          {/* Use a friendly, artisanal font for the logo/title (simulated with font-serif/cursive if using standard Tailwind) */}
          <h1 className="text-6xl font-extrabold mb-6 tracking-wide font-serif">
            LA Bakery 🥐
          </h1>
          <p className="text-xl text-amber-100 italic">
            "The smell of fresh baking is the smell of home."
          </p>
          <p className="mt-4 text-lg text-gray-200">
            Welcome back! Please login to your account to continue ordering our delightful pastries, artisan breads, and coffee.
          </p>

        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        {/* Use softer shadow and rounded corners. Keep the form background white for focus. */}
        <div className="w-full max-w-sm space-y-10 bg-white p-10 rounded-2xl shadow-2xl">
          <div className="text-center">
            {/* Use the brand color for the main title */}
            <h2 className="text-4xl font-bold text-amber-800">
              Sign In
            </h2>
            <p className="mt-3 text-base text-gray-500">
              Your next treat is just a click away!
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email" // Good for UX
                    required
                    {...register('email')}
                    // Improved focus ring color (to amber) and slightly thicker border
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 text-base"
                    placeholder="you@example.com" // Better placeholder example
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">Email is required</p>}
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password" // Good for UX
                    required
                    {...register('password')}
                    // Same improved styling as email
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 text-base"
                    placeholder="********"
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">Password is required</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                // Larger button with stronger amber color and more pronounced hover
                className="w-full flex justify-center py-3 px-4 rounded-xl text-lg font-bold text-white bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-amber-500/50 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Login to LA Bakery
              </button>
            </div>

            <div className="flex justify-between items-center text-sm">
              {/* Add a Forgot Password link for better UX */}
              <a href="#" className="font-medium text-gray-500 hover:text-amber-600 hover:underline">
                Forgot password?
              </a>

              <span className="text-gray-600">Don't have an account?</span>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <Link
                to="/register"
                // Make the register link more prominent or put it on its own line
                className="font-bold text-lg text-amber-600 hover:text-amber-500 transition duration-200"
              >
                Create an account
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login