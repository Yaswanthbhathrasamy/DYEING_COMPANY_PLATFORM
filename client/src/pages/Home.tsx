import { Link } from 'react-router-dom';
import { PublicLayout } from '../layout/PublicLayout';
import { Phone, Mail, MapPin, CheckCircle, Factory, Truck, ShieldCheck, Clock, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        initial: {},
        whileInView: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <PublicLayout>
            {/* Top Bar - Contact Info (common in Indian business sites) */}
            <div className="bg-blue-900 text-white text-sm py-2 px-4 hidden md:block">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex gap-6">
                        <span className="flex items-center gap-2"><Phone size={14} /> +91 98765 43210</span>
                        <span className="flex items-center gap-2"><Mail size={14} /> info@goodwilldyeworks.com</span>
                    </div>
                    <a href="https://maps.app.goo.gl/36KcSyo3EG88bvxu9?g_st=aw" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gray-200">
                        <MapPin size={14} /> Locate Us (Google Maps)
                    </a>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-[600px] w-full">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/photos/slider11.png"
                        alt="Textile Factory"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="relative z-10 h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Premium Textile Dyeing & <br />Processing Services
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl">
                                Government Compliant • Eco-Friendly • Timely Delivery
                            </p>
                            <p className="text-lg mb-8 text-gray-300 max-w-xl">
                                Your trusted partner for bulk fabric processing with state-of-the-art machinery and Zero Liquid Discharge styling.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/register"
                                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-md text-lg transition duration-300 text-center"
                                >
                                    Request a Quote
                                </Link>
                                <Link
                                    to="/login"
                                    className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-4 px-8 rounded-md text-lg transition duration-300 text-center"
                                >
                                    Track Your Order
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Trust Strip */}
            <div className="bg-gray-100 py-8 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                    >
                        {[
                            { icon: ShieldCheck, text: "GST Registered" },
                            { icon: Factory, text: "PCB Approved" },
                            { icon: CheckCircle, text: "ISO Certified" },
                            { icon: Truck, text: "Pan-India Delivery" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center"
                                variants={fadeInUp}
                            >
                                <item.icon className="h-8 w-8 text-blue-800 mb-2" />
                                <span className="font-semibold text-gray-800">{item.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Introduction / About Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <motion.div
                            className="lg:w-1/2"
                            {...fadeInUp}
                        >
                            <img
                                src="/photos/chattogram-bangladesh-december-012023-dyeing-600nw-2517335749.png"
                                alt="Dyeing Process"
                                className="rounded-lg shadow-xl w-full h-auto object-cover"
                            />
                        </motion.div>
                        <motion.div
                            className="lg:w-1/2"
                            {...fadeInUp}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <h2 className="text-blue-900 text-sm font-bold uppercase tracking-wider mb-2">Since 1995</h2>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">Excellence in Fabric Processing</h3>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                We are a leading textile processing unit specializing in dyeing, printing, and finishing of all types of fabrics. With over 25 years of experience, we serve major export houses and domestic brands across India.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center text-gray-700">
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                                    <span>Capacity of 50 Tonnes per day</span>
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                                    <span>Advanced Lab for Color Matching</span>
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                                    <span>Sustainable Chemical Usage</span>
                                </li>
                            </ul>
                            <Link to="/about" className="text-blue-800 font-semibold hover:text-blue-600 flex items-center">
                                Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Services Preview */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
                        <div className="w-16 h-1 bg-orange-500 mx-auto mt-4"></div>
                    </div>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={fadeInUp} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                            <img src="/photos/textile-dyeing-services-500x500.png" alt="Fabric Dyeing" className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Fabric Dyeing</h3>
                                <p className="text-gray-600">High-quality dyeing for cotton, polyester, viscose, and blends with perfect color consistency.</p>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                            <img src="/photos/6117acf0-7cae-11ef-b00e-19f9c8e8df73.jpg.png" alt="Printing" className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Digital & Screen Printing</h3>
                                <p className="text-gray-600">Advanced printing solutions with vibrant colors and sharp details for bulk orders.</p>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                            <img src="/photos/slider11.png" alt="Finishing" className="w-full h-64 object-cover object-right" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Fabric Finishing</h3>
                                <p className="text-gray-600">Softening, compacting, and stenter finishing to ensure perfect fabric feel and dimensions.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="py-16 bg-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-12"
                        {...fadeInUp}
                    >
                        <h2 className="text-3xl font-bold">Why Industry Leaders Trust Us</h2>
                        <p className="mt-4 text-gray-300">We understand the demands of the textile export market.</p>
                    </motion.div>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                    >
                        {[
                            { icon: ShieldCheck, title: "100% Compliant", desc: "Valid PCB, GST, and Factory licenses for hassle-free operations." },
                            { icon: Users, title: "Experienced Team", desc: "A workforce of 200+ skilled technicians and dye-masters." },
                            { icon: Clock, title: "On-Time Delivery", desc: "We strictly adhere to production schedules to meet your export deadlines." },
                            { icon: Truck, title: "Logistics Support", desc: "Own fleet of vehicles for pickup and delivery within the industrial belt." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="text-center p-6 border border-blue-700 rounded-lg bg-blue-800/50"
                                variants={fadeInUp}
                            >
                                <div className="mx-auto bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                    <item.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-300 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Process Flow */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">How We Work</h2>
                        <div className="w-16 h-1 bg-orange-500 mx-auto mt-4"></div>
                    </div>
                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10"
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                        >
                            {[
                                { step: 1, title: 'Request Quote', desc: 'Submit your requirements via our portal.' },
                                { step: 2, title: 'Sample Approval', desc: 'We dye a lab dip for your approval.' },
                                { step: 3, title: 'Bulk Production', desc: 'Processing starts immediately after approval.' },
                                { step: 4, title: 'Quality Check', desc: 'Rigorous testing for rubbing & washing fastness.' },
                                { step: 5, title: 'Dispatch', desc: 'Delivered to your location with tracking.' }
                            ].map((item) => (
                                <motion.div
                                    key={item.step}
                                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center"
                                    variants={fadeInUp}
                                >
                                    <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                                        {item.step}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Footer - Indian Business Style */}
            <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-white text-lg font-bold mb-4">Goodwill Process Dyeworks</h4>
                            <p className="text-sm leading-relaxed mb-4">
                                Your trusted partner for quality textile dyeing and finishing services. Committed to sustainability and excellence.
                            </p>
                            <div className="text-sm">
                                <p className="font-semibold text-white">GSTIN:</p> 5555787GSKBII
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white text-lg font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                                <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
                                <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white text-lg font-bold mb-4">Contact Us</h4>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-3">
                                    <MapPin size={16} className="mt-1 flex-shrink-0" />
                                    <span>
                                        <a href="https://maps.app.goo.gl/36KcSyo3EG88bvxu9?g_st=aw" target="_blank" rel="noopener noreferrer" className="hover:text-white transition underline">
                                            Goodwill Process Dyeworks,<br />
                                            Perundurai Road, Erode/Tirupur,<br />
                                            Tamil Nadu, India.<br />
                                            (Click for Map)
                                        </a>
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone size={16} />
                                    <span>+91 98765 43210</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail size={16} />
                                    <span>info@dyeingcompany.com</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white text-lg font-bold mb-4">Business Hours</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between">
                                    <span>Mon - Sat:</span>
                                    <span>9:00 AM - 7:00 PM</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Sunday:</span>
                                    <span>Holiday</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
                        <p>&copy; {new Date().getFullYear()} Goodwill Process Dyeworks. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </PublicLayout>
    );
};
