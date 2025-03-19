"use client";

import React, { useCallback, useEffect, useState } from "react";
import styles from "./../../../styles/product/Product.module.css";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { CircleChevronDown, CircleChevronLeft, CircleChevronRight, Heart, Minus, Plus } from "lucide-react";
import { InstagramSVG, TwitterSVG, WhatsappSVG } from "@/components/icons";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from '@mui/lab'
import ProductCard from "@/components/product/ProductCard";
import products from "@/public/data/products.json";

export default function Product({ params }) {
    const { slug } = React.use(params);
    const [value, setValue] = React.useState('1');
    const [productDetails, setProductDetails] = useState({});
    const [mainImage, setMainImage] = useState({});
    const [productCount, setProductCount] = useState(1);
    const [selectedWeight, setSelectedWeight] = useState({});

    useEffect(() => {
        const product = products.find((item) => item.product_slug === slug);
        setMainImage(product?.product_main_image);
        setSelectedWeight(product?.product_variations[0]);
        setProductDetails(product);
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
    });

    const handleImageClick = (index) => {
        if (productDetails?.product_gallary?.length > index)
            setMainImage(productDetails?.product_gallary[index]);
        else
            setMainImage(productDetails?.product_gallary[0]);
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

    const getDiscountedPrice = (price, discount_rate) => {
        if (discount_rate === 0) {
            return price;
        }
        let discount = parseFloat(price) * parseFloat(discount_rate);
        return (parseFloat(price) - (discount / 100)).toFixed(2);
    }

    return (
        <div className={styles.container}>
            <div className={styles.product_container}>
                <div className={styles.product_gallery}>
                    <div className={styles.mainImage}>
                        {
                            mainImage?.url && (
                                <Image src={mainImage?.url} alt={slug} width="350" height="200" />
                            )
                        }
                    </div>
                    <div>
                        {
                            (productDetails?.product_gallary?.length > 0) && (
                                <div className={styles.embla}>
                                    <div className={styles.embla__viewport} ref={emblaRef}>
                                        <div className={styles.embla__container}>
                                            {
                                                productDetails?.product_gallary?.map((image, index) => (
                                                    <div key={index} className={styles.embla__slide} onClick={() => handleImageClick(index)}>
                                                        <Image
                                                            src={image.url}
                                                            alt={`${image.url} ${index}`}
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
                            )
                        }
                    </div>
                </div>
                <div className={styles.product_details}>
                    <div className={styles.product_title}>
                        {productDetails?.product_name}
                    </div>
                    <div className={styles.product_price}>
                        <div className="font-medium text-2xl">
                            $ {getDiscountedPrice(selectedWeight?.price, productDetails?.discount_rate)}
                        </div>
                        <div className="line-through">
                            $ {selectedWeight?.price?.toFixed(2)}
                        </div>
                    </div>
                    <div className={styles.product_description}>
                        {productDetails?.product_description}
                    </div>
                    <div className={styles.product_weight}>
                        <div className="font-medium">Weight:</div>
                        <div className="">
                            {
                                productDetails?.product_variations?.map((varient, index) => (
                                    <span key={index} className={`${selectedWeight.variant_id === varient.variant_id && styles.activeVarient}`} onClick={() => setSelectedWeight(varient)}>
                                        {varient.weight} {varient.units}
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
                            {
                                productDetails?.product_tags?.map((tag, index) => (
                                    <span key={index} className="px-1">{tag}</span>
                                ))
                            }
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
                <div className={styles.relatedProducts}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
            <div className="w-fit mx-auto">
                <div className="flex flex-col justify-center items-center mt-[40px] cursor-pointer hover:text-[#EF5D29]">
                    <CircleChevronDown strokeWidth={1.5} size={50} />
                    <span className="font-medium text-xl">See All</span>
                </div>
            </div>
        </div>
    );
}