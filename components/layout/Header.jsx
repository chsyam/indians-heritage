"use client";

import { Heart, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import styles from "./../../styles/Layout/Header.module.css";
import Link from "next/link";

export default function Header() {
    const [watchListHover, setWatchListHover] = useState(false);
    const [cartHover, setCartHover] = useState(false);

    const handleWatchListHovering = () => {
        setWatchListHover(!watchListHover);
    };

    const handleCartHovering = () => {
        setCartHover(!cartHover);
    }

    return (
        <header className={styles.container}>
            <div className={styles.header}>
                <img onClick={() => window.location.href = "/"} className="cursor-pointer" src="/images/logo.svg" alt="Logo" width={100} height={75} />
                <div className="flex items-center justify-start gap-8">
                    <Link className={styles.menuItem} href="/watchlist" onMouseEnter={handleWatchListHovering} onMouseLeave={handleWatchListHovering}>
                        <Heart strokeWidth={2} size={28} color={`${watchListHover ? '#EF5D29' : 'black'}`} />
                        <div>
                            <span>Your</span><br />
                            <span>WatchList</span>
                        </div>
                    </Link>
                    <Link className={styles.menuItem} href="/cart" onMouseEnter={handleCartHovering} onMouseLeave={handleCartHovering}>
                        <ShoppingCart strokeWidth={2} size={28} color={`${cartHover ? '#EF5D29' : 'black'}`} />
                        <div>
                            <span>Cart</span><br />
                            <span className="text-[#EF5D29] font-medium">$ 0.00</span>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}