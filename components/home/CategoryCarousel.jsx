"use client";

import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./../../styles/home/CategoryCarousel.css";

export default function CategoryCarousel() {
    const product_gallary = [
        {
            "type": "image",
            "url": "/images/almonds-2.jpg"
        },
        {
            "type": "image",
            "url": "/images/almonds-3.jpg"
        },
        {
            "type": "image",
            "url": "/images/almonds-4.jpg"
        },
        {
            "type": "image",
            "url": "/images/almonds-5.jpg"
        }
    ];

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
        containScroll: "trim"
    });

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!emblaApi || isHovered) return;

        const autoplayInterval = setInterval(() => {
            emblaApi.scrollNext();
        }, 3000);

        return () => clearInterval(autoplayInterval);
    }, [emblaApi, isHovered]);

    return (
        <div className="category_carousel">
            <div className="embla" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {
                            product_gallary.map((slide, index) => (
                                <div className="embla__slide" key={index}>
                                    <Image
                                        src={slide?.url}
                                        width={300}
                                        height={200}
                                        alt={`Slide ${index + 1}`}
                                        className="embla__image"
                                    />
                                </div>
                            ))
                        }
                        {
                            product_gallary.map((slide, index) => (
                                <div className="embla__slide" key={index}>
                                    <Image
                                        src={slide?.url}
                                        width={300}
                                        height={200}
                                        alt={`Slide ${index + 1}`}
                                        className="embla__image"
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}