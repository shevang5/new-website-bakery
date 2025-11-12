import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="py-12 px-4 lg:py-60">
      <form onSubmit={handleSubmit} className="flex flex-col items-center text-sm">
        <p className="text-lg text-blue-600 font-medium pb-2">Contact Us</p>
        <h1 className="text-4xl font-semibold text-slate-700 pb-4">Get in touch with us</h1>
        <p className="text-sm text-gray-500 text-center pb-10">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
          Lorem Ipsum has been the industry's standard dummy text.
        </p>
        
        <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
          <div className="w-full">
            <label htmlFor="name" className="text-black/70">Your Name</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
              type="text"
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="email" className="text-black/70">Your Email</label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
              type="email"
              required
            />
          </div>
        </div>

        <div className="mt-6 w-[350px] md:w-[700px]">
          <label htmlFor="message" className="text-black/70">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-indigo-300"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white h-12 w-56 px-4 rounded active:scale-95 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
