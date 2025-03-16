"use client";

import React, { useCallback, useEffect, useState } from "react";
import styles from "./../../../styles/product/Product.module.css";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { CircleChevronLeft, CircleChevronRight, Heart, Minus, Plus } from "lucide-react";

export default function Product({ params }) {
    const { slug } = React.use(params);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
    });

    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes())
        }
    }, [emblaApi]);

    const productGallary = [
        {
            type: "image",
            "url": "/images/almonds-1.jpg"
        },
        {
            type: "image",
            "url": "/images/almonds-2.jpg"
        },
        {
            type: "image",
            "url": "/images/almonds-3.jpg"
        },
        {
            type: "image",
            "url": "/images/almonds-4.jpg"
        },
        {
            type: "image",
            "url": "/images/almonds-5.jpg"
        }
    ];

    const [mainImage, setMainImage] = useState(productGallary[0]);
    const [productCount, setProductCount] = useState(1);

    const handleImageClick = (index) => {
        setMainImage(productGallary[index]);
    }

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const handleCountChange = (operation) => {
        if (operation === "minus" && productCount > 1) {
            setProductCount(productCount - 1);
        } else if (operation === "plus") {
            setProductCount(productCount + 1);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.product_container}>
                <div className={styles.product_gallery}>
                    <div className={styles.mainImage}>
                        <Image src={mainImage.url} alt={slug} width="350" height="200" />
                    </div>
                    <div>
                        <div className={styles.embla}>
                            <div className={styles.embla__viewport} ref={emblaRef}>
                                <div className={styles.embla__container}>
                                    {
                                        productGallary.map((image, index) => (
                                            <div key={index} className={styles.embla__slide} onClick={() => handleImageClick(index)}>
                                                <Image
                                                    src={image.url}
                                                    alt={`Almond ${index}`}
                                                    width={100}
                                                    height={100}
                                                    className="rounded-md"
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="flex gap-4 my-4">
                                <button className="embla__prev cursor-pointer" onClick={scrollPrev}>
                                    <CircleChevronLeft size={32} />
                                </button>
                                <button className="embla__next cursor-pointer" onClick={scrollNext}>
                                    <CircleChevronRight size={32} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.product_details}>
                    <div className={styles.product_title}>Humor New Agregado</div>
                    <div className={styles.product_price}>
                        <div className="font-medium text-2xl">$ 550.00</div>
                        <div className="line-through">$ 700.00</div>
                    </div>
                    <div className={styles.product_description}>
                        Almonds are highly nutritious and versatile nuts known for their numerous health benefits. They are rich in healthy fats, protein, fiber, vitamins, and minerals, making them an excellent addition to a balanced diet. Consuming almonds regularly supports heart health by reducing bad cholesterol levels and promoting good cholesterol. They are also beneficial for brain function, skin health, and weight management due to their high antioxidant and fiber content.
                    </div>
                    <div className={styles.product_menu}>
                        <div>
                            <button className="text-black border-2 font-medium hover:bg-[#EF5D29] hover:border-[#EF5D29] hover:text-[#FFFFFF] border-black px-4 py-2 rounded-md cursor-pointer">Add to Cart</button>
                        </div>
                        <div className="cursor-pointer">
                            <Heart size={32} />
                        </div>
                        <div className="flex gap-1">
                            <div onClick={() => handleCountChange("minus")}>
                                <Minus />
                            </div>
                            <input value={productCount} onChange={(e) => setProductCount(e.target.value)} className={styles.productCountInput} type="number" />
                            <div onClick={() => handleCountChange("plus")}>
                                <Plus />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}