"use client";

import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import styles from "./../../styles/Layout/ProductSearch.module.css"
import { ExternalLink, Heart, ShoppingCart, X } from 'lucide-react';
import products from "@/public/data/products.json";
import { useRouter } from 'next/navigation';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -60%)',
    width: '45%',
    minWidth: '350px',
    height: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #00879E',
    borderRadius: '4px',
    outline: 'none',
    boxShadow: 24,
    p: "20px",
};

export default function ProductSearch({ openSearchPopup, setOpenSearchPopup }) {
    const router = useRouter();
    const inputRef = useRef(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [watchListItem, setWatchListItem] = useState(-1);

    function handleClose() {
        setSearchTerm("");
        setOpenSearchPopup(false);
    }

    useEffect(() => {
        if (openSearchPopup) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 250);
        }
    }, [openSearchPopup])

    useEffect(() => {
        if (searchTerm) {
            const temp = products.filter((product) => {
                const term = (product?.name || "") + (product?.product_category || "") + (product?.product_description || "");
                return (term || "").toLowerCase().includes(searchTerm.toLowerCase())
            });
            setFilteredProducts(temp);
        } else {
            setFilteredProducts([]);
        }
    }, [searchTerm])

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openSearchPopup}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 250,
                        sx: { backgroundColor: "rgba(0, 0, 0, 0.30)" }
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className={styles.productSearch}>
                            <div className={styles.searchInput}>
                                <input ref={inputRef} placeholder='Search for Products...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                            <div className={styles.close} onClick={handleClose}>
                                <X size={32} />
                            </div>
                        </div>
                        <div className={styles.filteredProductsList}>
                            {
                                filteredProducts.map((product, index) => {
                                    return (
                                        <div key={index} className={styles.product}>
                                            <div className={styles.productImage}>
                                                <img src={product?.product_main_image?.url} alt={product?.name} />
                                            </div>
                                            <div className={styles.productDetails}>
                                                <div className={styles.productName}>
                                                    {product?.product_name}
                                                </div>
                                                <div style={{
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 3,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    fontSize: '14px'
                                                }} className={styles.productDescription}>
                                                    {product?.product_description}
                                                </div>
                                                <div className={styles.product_options}>
                                                    <div className="cursor-pointer hover:text-[#EF5D29]">
                                                        <ShoppingCart />
                                                    </div>
                                                    <div className="flex justify-start items-center gap-3 flex-nowrap">
                                                        <div className="cursor-pointer hover:text-[#EF5D29]" onMouseEnter={() => setWatchListItem(index)} onMouseLeave={() => setWatchListItem(-1)}>
                                                            <Heart fill={`${(watchListItem === index) ? '#EF5D29' : '#FFFFFF'}`} />
                                                        </div>
                                                        <div className="cursor-pointer hover:text-[#EF5D29]" onClick={() => { router.push(`/product/${product?.product_slug}`); handleClose(); }}>
                                                            <ExternalLink />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div >
    );
}