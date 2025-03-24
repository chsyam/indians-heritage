"use client";

import React, { useEffect, useState } from "react";
import styles from "./../../styles/home/OurBestSellers.module.css";
import products from "@/public/data/products.json";
import ProductCard from "../product/ProductCard";

export default function OurBestSellers() {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        setAllProducts(products);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.bestSellerContainer}>
                <div className="flex justify-between gap-4 items-center flex-wrap">
                    <div className="text-3xl font-medium">
                        Our Best sellers
                    </div>
                    <button className="bg-[#EF5D29] py-2 px-4 rounded-md font-medium tracking-wide text-white cursor-pointer">
                        Start Shopping
                    </button>
                </div>
                <div className={styles.card_section}>
                    {
                        allProducts.slice(0, 3)?.map((product, index) => {
                            return (
                                <ProductCard key={index} productDetails={product} />
                            )
                        })
                    }
                    {
                        allProducts.slice(0, 3)?.map((product, index) => {
                            return (
                                <ProductCard key={index} productDetails={product} />
                            )
                        })
                    }
                    {
                        allProducts.slice(0, 3)?.map((product, index) => {
                            return (
                                <ProductCard key={index} productDetails={product} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}