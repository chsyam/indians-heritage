"use client";

import React, { useCallback, useEffect, useState } from "react";
import styles from "./../../../styles/product/Product.module.css";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { CircleChevronLeft, CircleChevronRight, Heart, Minus, Plus } from "lucide-react";
import { InstagramSVG, TwitterSVG, WhatsappSVG } from "@/components/icons";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from '@mui/lab'

export default function Product({ params }) {
    const { slug } = React.use(params);
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const varients = [
        {
            "id": 1,
            "weight": "250g",
            "price": 10,
            "discount": 0,
            "discountedPrice": 10,
        },
        {
            "id": 2,
            "weight": "500g",
            "price": 20,
            "discount": 0,
            "discountedPrice": 20,
        },
        {
            "id": 3,
            "weight": "1kg",
            "price": 30,
            "discount": 0,
            "discountedPrice": 30,
        }
    ]

    const [selectedWeight, setSelectedWeight] = useState(varients[0]);

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

    const handleInputChange = (count) => {
        if (parseInt(count) && parseInt(count) > 0) {
            setProductCount(parseInt(count));
        } else {
            setProductCount(1);
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
                    <div className={styles.product_title}>
                        Almonds
                    </div>
                    <div className={styles.product_price}>
                        <div className="font-medium text-2xl">$ {selectedWeight?.discountedPrice?.toFixed(2)}</div>
                        <div className="line-through">$ 700.00</div>
                    </div>
                    <div className={styles.product_description}>
                        Almonds are highly nutritious and versatile nuts known for their numerous health benefits. They are rich in healthy fats, protein, fiber, vitamins, and minerals, making them an excellent addition to a balanced diet. Consuming almonds regularly supports heart health by reducing bad cholesterol levels and promoting good cholesterol. They are also beneficial for brain function, skin health, and weight management due to their high antioxidant and fiber content.
                    </div>
                    <div className={styles.product_weight}>
                        <div className="font-medium">Weight:</div>
                        <div className="">
                            {
                                varients.map((varient, index) => (
                                    <span key={index} className={`${selectedWeight.id === varient.id && styles.activeVarient}`} onClick={() => setSelectedWeight(varient)}>
                                        {varient.weight}
                                    </span>
                                ))}
                        </div>
                    </div>
                    <div className={styles.product_menu}>
                        <div>
                            <button className="text-black border-2 font-medium hover:bg-[#EF5D29] hover:border-[#EF5D29] hover:text-[#FFFFFF] border-black px-4 py-2 rounded-md cursor-pointer">Add to Cart</button>
                        </div>
                        <div className="cursor-pointer">
                            <Heart size={32} />
                        </div>
                        <div className="flex flex-nowrap border-2 border-black rounded-md">
                            <div onClick={() => handleCountChange("minus")} className="border-r-2 border-black py-2 px-2 cursor-pointer">
                                <Minus />
                            </div>
                            <input value={productCount} onChange={(e) => handleInputChange(e.target.value)} className={styles.productCountInput} type="text" />
                            <div onClick={() => handleCountChange("plus")} className="py-2 px-2 border-l-2 border-black cursor-pointer">
                                <Plus />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 my-[20px]">
                        <div>Tags: </div>
                        <div>
                            <span className="px-1">Almonds,</span>
                            <span className="px-1">Healthy,</span>
                            <span className="px-1">Nutritious</span>
                        </div>
                    </div>
                    <div className="my-[10px] flex justify-start items-center gap-4 flex-wrap">
                        <div className="font-medium">Share: </div>
                        <div className="flex gap-1 flex-nowrap font-medium items-center justify-start bg-[#00AAF0] text-white border-2 border-[#00AAF0] py-2 px-4 rounded-md w-fit cursor-pointer">
                            <TwitterSVG width={24} height={24} fill="#FFF" /> Twitter
                        </div>
                        <div className="flex gap-1 flex-nowrap font-medium items-center justify-start bg-green-600 text-white border-2 border-green-600 py-2 px-4 rounded-md w-fit cursor-pointer">
                            <WhatsappSVG width={24} height={24} /> Whatsapp
                        </div>
                        <div className="flex gap-1 flex-nowrap font-medium items-center justify-start bg-[#ED6944] text-white py-2 px-4 rounded-md w-fit cursor-pointer">
                            <InstagramSVG width={24} height={24} /> Instagram
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b-2 border-[#DEDEDE] my-[40px]">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} centered>
                                <Tab sx={{ fontFamily: "IBM Plex Sans", textTransform: "none", fontSize: '18px', color: '#000', fontWeight: 500 }} label="Description" value="1" />
                                <Tab sx={{ fontFamily: "IBM Plex Sans", textTransform: "none", fontSize: '18px', color: '#000', fontWeight: 500 }} label="Shipping Policy" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel sx={{ fontFamily: "IBM Plex Sans" }} value="1">
                            <div className="my-[15px]">
                                Almonds (Prunus dulcis) are nutrient-rich nuts known for their numerous health benefits. Originating from the Middle East, they are now primarily cultivated in California, USA. They are packed with protein, fiber, healthy fats, vitamin E, and magnesium, supporting heart and brain health.
                                <br />
                                <br />
                                Almonds help lower bad cholesterol (LDL) while boosting good cholesterol (HDL) and regulating blood sugar levels. Their antioxidants protect against oxidative stress, reducing the risk of chronic diseases. Regular consumption aids in weight management, improves digestion, and enhances skin and hair health. They are consumed in various forms, such as raw, roasted, soaked, almond milk, and almond butter. Almonds also strengthen bones, boost immunity, and promote mental well-being by reducing stress.
                                <br />
                                <br />
                                Their low glycemic index makes them a great choice for diabetics. Versatile and delicious, almonds are a staple in healthy diets worldwide.
                            </div>
                        </TabPanel>
                        <TabPanel sx={{ fontFamily: "IBM Plex Sans" }} value="2">
                            <div className="my-[15px]">
                                <div className="my-4 text-xl font-medium">
                                    Shipping policy for our store
                                </div>
                                <div className="my-4">
                                    Orders during peak seasons may take longer to arrive. Please ensure someone is available to receive the package at the provided address. If you receive a damaged product, report it within 48 hours for a replacement.Orders during peak seasons may take longer to arrive. Please ensure someone is available to receive the package at the provided address. If you receive a damaged product, report it within 48 hours for a replacement.
                                </div>
                                <ul className="list-disc my-4 pl-[20px]">
                                    <li>Orders are processed within 1-2 business days (excluding weekends and holidays).</li>
                                    <li>Typically, orders are delivered by the end of the day once shipped.</li>
                                    <li>A tracking number will be provided via email once your order has been shipped.</li>
                                    <li>We currently ship to multiple locations. Please check our service areas before placing an order.</li>
                                    <li>We use reliable carriers to ensure fast and secure delivery.</li>
                                    <li>Shipping fees may vary based on location and selected shipping method.</li>
                                    <li>Unforeseen circumstances such as weather or courier delays may impact delivery times.</li>
                                </ul>
                                <div className="my-4">
                                    Orders during peak seasons may take longer to arrive. Please ensure someone is available to receive the package at the provided address. If you receive a damaged product, report it within 48 hours for a replacement.Orders during peak seasons may take longer to arrive. Please ensure someone is available to receive the package at the provided address. If you receive a damaged product, report it within 48 hours for a replacement.
                                    <br />
                                    <br />
                                    Orders during peak seasons may take longer to arrive. Please ensure someone is available to receive the package at the provided address. If you receive a damaged product, report it within 48 hours for a replacement.Orders during peak seasons may take longer to arrive. Please ensure someone is available to receive the package at the provided address. If you receive a damaged product, report it within 48 hours for a replacement.
                                    <br />
                                    <br />
                                    For any questions or concerns, reach out via email, chat, or phone.
                                </div>
                            </div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
            <div>
                <div className="text-2xl font-medium">
                    Related Products
                </div>
            </div>
        </div>
    );
}