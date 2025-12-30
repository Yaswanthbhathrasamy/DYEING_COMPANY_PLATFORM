import { ArrowDown, Beaker, CheckCircle, Droplet, Sun, Wind } from 'lucide-react';

const steps = [
    {
        name: 'Lab Dip & Matching',
        description: 'Precise color matching using spectrophotometers to achieve Delta E < 1.0.',
        icon: Beaker,
    },
    {
        name: 'Pre-Treatment',
        description: 'Scouring and bleaching to ensure absorbency and whiteness for uniform dyeing.',
        icon: Droplet,
    },
    {
        name: 'Dyeing',
        description: 'Controlled dyeing in soft-flow machines for knitwear or jiggers for wovens.',
        icon: Palette, // Need to import or reuse
    },
    {
        name: 'Washing & Soaping',
        description: 'Multi-stage washing to remove unfixed dyes and ensure superior color fastness.',
        icon: Wind,
    },
    {
        name: 'Finishing & Drying',
        description: 'Stentering for width control and softeners for desired hand-feel.',
        icon: Sun,
    },
    {
        name: 'Quality Inspection',
        description: '100% inspection for defects, color variation, and gsm checking.',
        icon: CheckCircle,
    },
];
import { Palette } from 'lucide-react';

export const ProcessPage = () => {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary-600">Our Technology</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        A perfect blend of science and art
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Our standardized 6-step dyeing process ensures consistency, efficiency, and minimal environmental impact.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.name} className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                        <Icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                                        {index + 1}. {step.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                        <p className="flex-auto">{step.description}</p>
                                    </dd>
                                </div>
                            );
                        })}
                    </dl>
                </div>
            </div>
        </div>
    );
};
