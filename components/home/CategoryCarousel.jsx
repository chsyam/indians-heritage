"use client";

import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./../../styles/home/CategoryCarousel.css";
import { useRouter } from "next/navigation";

export default function CategoryCarousel() {
    const router = useRouter();

    const product_gallary = [
        {
            "type": "image",
            "imgUrl": "/images/fruits.jpg",
            "category": "fruits"
        },
        {
            "type": "image",
            "imgUrl": "/images/sweets.jpg",
            "category": "sweets"
        },
        {
            "type": "image",
            "imgUrl": "/images/spicies.jpg",
            "category": "spicies"
        },
        {
            "type": "image",
            "imgUrl": "/images/jewellery.jpg",
            "category": "jewellery"
        },
        {
            "type": "image",
            "imgUrl": "/images/pickles.jpg",
            "category": "pickles"
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
                                <div className="embla__slide" key={index} onClick={() => router.push(`/product-category/${slide?.category}`)}>
                                    <Image
                                        src={slide?.imgUrl}
                                        width={300}
                                        height={200}
                                        alt={`Slide ${index + 1}`}
                                        className="embla__image"
                                        priority={true}
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