import { ShieldCheck, Leaf, Factory, Recycle } from 'lucide-react';

export const CompliancePage = () => {
    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Compliance & Sustainability</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        We are committed to ethical manufacturing and environmental stewardship. Our facility operates with strict adherence to Pollution Control Board norms.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
                    <div className="relative lg:order-last lg:col-span-5">
                        <div className="aspect-[3/2] w-full rounded-2xl bg-gray-50 object-cover p-8 flex items-center justify-center border-2 border-dashed border-gray-200">
                            <span className="text-gray-400 font-medium">Certificate Preview Badge</span>
                        </div>
                    </div>
                    <div className="max-w-xl text-base leading-7 text-gray-700 lg:col-span-7">
                        <ul role="list" className="space-y-8 text-gray-600">
                            <li className="flex gap-x-3">
                                <Leaf className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                                <span>
                                    <strong className="font-semibold text-gray-900">Zero Liquid Discharge (ZLD).</strong> We recycle 98% of our water using advanced Reverse Osmosis (RO) and Evaporator systems, ensuring no effluent is discharged into the environment.
                                </span>
                            </li>
                            <li className="flex gap-x-3">
                                <ShieldCheck className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                                <span>
                                    <strong className="font-semibold text-gray-900">OEKO-TEX Standard 100.</strong> All our dyes and auxiliaries are free from harmful substances, making our fabrics safe written for human use.
                                </span>
                            </li>
                            <li className="flex gap-x-3">
                                <Factory className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                                <span>
                                    <strong className="font-semibold text-gray-900">Pollution Control Board Certified.</strong> Fully licensed and compliant with state and central pollution control regulations (Consent to Operate).
                                </span>
                            </li>
                            <li className="flex gap-x-3">
                                <Recycle className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                                <span>
                                    <strong className="font-semibold text-gray-900">Sludge Management.</strong> Solid waste is disposed of through authorized cement industries for co-processing.
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
