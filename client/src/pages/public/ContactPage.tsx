import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const ContactPage = () => {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Visit our factory or reach out for inquiries. We are here to help you with your dyeing needs.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    {/* Contact Info */}
                    <div>
                        <h3 className="border-l-4 border-primary-600 pl-6 font-semibold text-gray-900">Factory Address</h3>
                        <address className="mt-3 pl-6 not-italic text-gray-600">
                            <div className="flex gap-x-3 items-center">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <span>
                                    Plot No. 45, SIPCOT Industrial Park,<br />
                                    Perundurai, Erode - 638 052.<br />
                                    Tamil Nadu, India.
                                </span>
                            </div>
                        </address>

                        <h3 className="mt-10 border-l-4 border-primary-600 pl-6 font-semibold text-gray-900">Get in Touch</h3>
                        <div className="mt-3 pl-6 space-y-3 text-gray-600">
                            <div className="flex gap-x-3 items-center">
                                <Phone className="h-5 w-5 text-gray-400" />
                                <a href="tel:+919876543210" className="hover:text-primary-600">+91 98765 43210</a>
                            </div>
                            <div className="flex gap-x-3 items-center">
                                <Mail className="h-5 w-5 text-gray-400" />
                                <a href="mailto:info@dyemaster.in" className="hover:text-primary-600">info@dyemaster.in</a>
                            </div>
                            <div className="flex gap-x-3 items-center">
                                <Clock className="h-5 w-5 text-gray-400" />
                                <span>Mon-Sat: 9:00 AM - 6:00 PM (IST)</span>
                            </div>
                        </div>
                    </div>

                    {/* Simple Form */}
                    <form className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="grid grid-cols-1 gap-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">Name</label>
                                <input type="text" name="name" id="name" className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                                <input type="email" name="email" id="email" className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">Message</label>
                                <textarea name="message" id="message" rows={4} className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                            <button type="button" onClick={() => alert('Message Sent (Demo)')} className="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
