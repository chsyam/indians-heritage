"use client";

import Image from "next/image";
import React from "react";
import styles from "./../../styles/product/ProductCard.module.css";
import { ExternalLink, Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductCard() {
    const router = useRouter();

    return (
        <div className={styles.product_card}>
            <div className={styles.product_image}>
                <Image
                    src={`/images/almonds-1.jpg`}
                    alt={`Almond 1`}
                    width={150}
                    height={150}
                    className="rounded-md"
                />
                <div className={styles.product_options}>
                    <div className="flex justify-start items-center gap-2 text-[18px] cursor-pointer hover:text-[#EF5D29]">
                        <ShoppingCart />
                        <span className="font-medium">Add To Cart</span>
                    </div>
                    <div className="flex justify-start items-center gap-2 flex-nowrap">
                        <div className="cursor-pointer hover:text-[#EF5D29]">
                            <Heart />
                        </div>
                        <div className="cursor-pointer hover:text-[#EF5D29]" onClick={() => router.push("/product/sample")}>
                            <ExternalLink />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-xl font-medium mt-4">
                        Almonds
                    </div>
                    <div className={styles.product_price}>
                        <div className="font-medium text-xl">$ {100?.toFixed(2)}</div>
                        <div className="line-through">$ 700.00</div>
                    </div>
                </div>
            </div>
        </div>
    );
}