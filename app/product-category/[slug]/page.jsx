"use client";

import React, { useEffect, useState } from "react";
import styles from "./../../../styles/categories/Categories.module.css";
import { Grip, TableOfContents } from "lucide-react";
import dynamic from "next/dynamic";
import ProductCard from "@/components/product/ProductCard";
import products from "@/public/data/products.json";

const Select = dynamic(() => import('react-select'), { ssr: false });

export default function ProductCategory({ params }) {
    const { slug } = React.use(params);
    const [title, setTitle] = useState("");
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        try {
            setTitle(slug[0].toUpperCase() + slug.slice(1,).toLowerCase());
        } catch (error) {
            setTitle("");
            console.log(error);
        }

        try {
            const temp = products.filter((item) => item.product_category === slug);
            setProductsList(temp);
        } catch (error) {
            setProductsList([]);
            console.log(error);
        }
    }, [slug])

    const [selectedFilter, setSelectedFilter] = useState({ value: 'Featured', label: 'Featured' });
    const [cardType, setCardType] = useState('grid');

    const handleCardTypeChange = (type) => {
        setCardType(type);
    };

    const filterOptions = [
        { value: 'Featured', label: 'Featured' },
        { value: 'Best Selling', label: 'Best Selling' },
        { value: 'Alphabetically, A-Z', label: 'Alphabetically, A-Z' },
        { value: 'Alphabetically, Z-A', label: 'Alphabetically, Z-A' },
        { value: 'Price, low to high', label: 'Price, low to high' },
        { value: 'Price, high to low', label: 'Price, high to low' },
        { value: 'Date, new to old', label: 'Date, new to old' },
        { value: 'Date, old to new', label: 'Date, old to new' },
    ];

    const handleFilterChange = (selectedOption) => {
        setSelectedFilter(selectedOption);
    };

    return (
        <div className={styles.container}>
            <div className="my-4 text-2xl font-medium">
                {title}
            </div>
            <div className={styles.products_layout}>
                {/* <div className={styles.product_filters}>
                    <div className="my-[20px]">
                        <span className="font-medium text-xl">Availability</span>
                        <ul>
                            <li className="flex justify-start items-center gap-2 my-2">
                                <input className="cursor-pointer h-4 w-4" type="checkbox" name="stock" id="in-stock" /> <span>In stock (31)</span>
                            </li>
                            <li className="flex justify-start items-center gap-2 my-2">
                                <input className="cursor-pointer h-4 w-4" type="checkbox" name="stock" id="out-of-stock" /> <span>Out of stock (2)</span>
                            </li>
                        </ul>
                    </div>
                    <div className="my-[30px]">
                        <span className="font-medium text-xl">Price</span>
                        <ul>
                            <li className="flex justify-start items-center gap-2 my-2">
                                $ <input className="cursor-pointer w-[75px] outline-none py-1 px-1 border-2 border-[#dedede]" type="number" name="stock" id="in-stock" /> <span>From $</span>
                                <input className="cursor-pointer w-[75px] outline-none py-1 px-1 border-2 border-[#dedede]" type="number" name="stock" id="out-of-stock" /> <span>To</span>
                            </li>
                        </ul>
                    </div>
                </div> */}
                <div>
                    <div className={styles.filter_section}>
                        <div className="flex justify-start items-center gap-4 flex-nowrap">
                            <div className={`cursor-pointer hover:text-[#EF5D29] ${cardType === "grid" && 'text-[#EF5D29]'}`} onClick={() => handleCardTypeChange("grid")}>
                                <Grip size={32} strokeWidth={2} />
                            </div>
                            <div className={`cursor-pointer hover:text-[#EF5D29] ${cardType === "list" && 'text-[#EF5D29]'}`} onClick={() => handleCardTypeChange("list")}>
                                <TableOfContents size={32} strokeWidth={2} />
                            </div>
                        </div>
                        <div></div>
                        <div className="flex justify-start items-center gap-4 flex-nowrap font-medium">
                            Sort by <Select
                                placeholder="Select a filter"
                                options={filterOptions}
                                value={selectedFilter}
                                onChange={handleFilterChange}
                                styles={{
                                    control: (baseStyles) => ({
                                        ...baseStyles,
                                        fontSize: '14px',
                                        border: '2px solid #dedede',
                                        fontWeight: 500,
                                        minWidth: '200px'
                                    }),
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.card_section}>
                        {
                            productsList?.map((item, index) => {
                                return (
                                    <ProductCard key={index} productDetails={item} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}