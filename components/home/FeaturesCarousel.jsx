"use client";

import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import "./../../styles/home/FeaturesCarousel.css";

export default function FeaturesCarousel() {
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

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [scrollSnaps, setScrollSnaps] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const onDotButtonClick = useCallback((index) => {
        if (emblaApi) emblaApi.scrollTo(index);
        restartAutoplay();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());

        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);

        return () => emblaApi.off('select', onSelect);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi || isHovered) return;

        const autoplayInterval = setInterval(() => {
            emblaApi.scrollNext();
        }, 3000);

        return () => clearInterval(autoplayInterval);
    }, [emblaApi, isHovered]);

    const restartAutoplay = () => {
        setIsHovered(true);
        setTimeout(() => setIsHovered(false), 3000);
    };

    return (
        <div className="features_carousel">
            <div className="embla" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {product_gallary.map((slide, index) => (
                            <div className="embla__slide" key={index}>
                                <Image
                                    src={slide?.url}
                                    width={300}
                                    height={200}
                                    alt={`Slide ${index + 1}`}
                                    className="embla__image"
                                    priority={true}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}