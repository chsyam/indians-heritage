"use client";

import Image from "next/image";
import React, { useState } from "react";
import styles from "./../../styles/product/ProductCard.module.css";
import { ExternalLink, Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductCard({ productDetails }) {
    const router = useRouter();
    const [watchListItem, setWatchListItem] = useState(false);

    const getDiscountedPrice = () => {
        if (productDetails?.discount_rate === 0) {
            return productDetails?.product_variations[0]?.price?.toFixed(2);
        }
        let discount = parseFloat(productDetails?.product_variations[0]?.price) * parseFloat(productDetails?.discount_rate);
        return (parseFloat(productDetails?.product_variations[0]?.price) - (discount / 100)).toFixed(2);
    }

    return (
        <div className={styles.product_card}>
            <div className={styles.product_image}>
                <Image
                    src={`${productDetails?.product_main_image?.url}`}
                    alt={`${productDetails?.product_name} 1`}
                    width={150}
                    height={150}
                    className="rounded-md"
                />
                <div className={styles.product_options}>
                    <div className="flex justify-start items-center gap-2 text-[18px] cursor-pointer hover:text-[#EF5D29]">
                        <ShoppingCart />
                        <span className="font-medium">Add To Cart</span>
                    </div>
                    <div className="flex justify-start items-center gap-3 flex-nowrap">
                        <div className="cursor-pointer hover:text-[#EF5D29]" onMouseEnter={() => setWatchListItem(true)} onMouseLeave={() => setWatchListItem(false)}>
                            <Heart fill={`${(watchListItem) ? '#EF5D29' : '#FFFFFF'}`} />
                        </div>
                        <div className="cursor-pointer hover:text-[#EF5D29]" onClick={() => router.push(`/product/${productDetails?.product_slug}`)}>
                            <ExternalLink />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-xl font-medium mt-4">
                        {productDetails?.product_name}
                    </div>
                    <div className={styles.product_price}>
                        <div className="font-medium text-xl">
                            $ {getDiscountedPrice()}
                        </div>
                        <div className="line-through font-medium text-[#EF5D29]">
                            $ {productDetails?.product_variations[0]?.price?.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}