import React from "react";

const stages = [
    {
        step: 1,
        description: "Select what you want exactly and order your grocery.",
        fileType: 'img',
        url: '/images/store-1.jpg'
    },
    {
        step: 2,
        description: "Once we receive your order, we'll start processing it.",
        fileType: 'img',
        url: '/images/process-1.jpg'
    },
    {
        step: 3,
        description: "We'll carefully package your grocery and notify your order has been shipped.",
        fileType: 'img',
        url: '/images/packing-1.jpg'
    },
    {
        step: 4,
        description: "We deliver Indian groceries New Zealand wide. Your grocery is right at your home.",
        fileType: 'img',
        url: '/images/deliver-1.jpg'
    }
];

export default function HowItWorks() {
    return (
        <div>
            <div className="my-6 text-center text-3xl font-semibold text-[#EF5D29] bg-slate-100 py-6">
                How we Operate?
            </div>
            <div className="flex items-start justify-center gap-[40px] my-[50px] flex-wrap">
                {
                    stages?.map((stage, index) => {
                        return (
                            <div key={index} className="w-[250px]">
                                <div className="text-2xl font-semibold text-[#EF5D29] text-center">
                                    Step {stage.step}
                                </div>
                                <img src={stage.url} alt={stage.step} className="w-[250px] h-[250px] my-2 rounded-2xl" />
                                <div className="text-[18px] font-medium text-center my-2 max-w-[250px]">
                                    {stage.description}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}