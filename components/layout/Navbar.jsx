"use client";

import React, { useState, useEffect } from "react";
import styles from "./../../styles/Layout/Navbar.module.css";
import Link from "next/link";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import ProductSearch from "./ProductSearch";

export default function Navbar() {
    const [toggleDropdownIndex, setToggleDropdownIndex] = useState(-1);
    const [activeMenuIndex, setActiveMenuIndex] = useState(-1);
    const [openSearchPopup, setOpenSearchPopup] = useState(false);

    useEffect(() => {
        console.log("openSearchPopup..!", openSearchPopup);
    }, [openSearchPopup])

    const navbarMenuList = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "Shop",
            link: "/shop-all"
        },
        {
            name: "Categories",
            link: "/categories",
            subMenu: [
                {
                    name: "Groceries",
                    link: "/product-category/groceries"
                },
                {
                    name: "Pickles",
                    link: "/product-category/pickles"
                },
                {
                    name: "Spices",
                    link: "/product-category/spices"
                },
                {
                    name: "Dry fruits",
                    link: "/product-category/dryfruits"
                },
                {
                    name: "Others",
                    link: "/product-category/others"
                }
            ]
        },
        {
            name: "Search",
            link: "#",
            icon: <Search />
        },
        {
            name: "Contact Us",
            link: "/contact-us"
        }
    ]

    useEffect(() => {
        navbarMenuList?.forEach((menu, index) => {
            if (window.location.pathname.indexOf(menu.link) > -1) {
                setActiveMenuIndex(index);
            } else {
                menu.subMenu?.forEach((subMenu) => {
                    if (window.location.pathname.indexOf(subMenu.link) > -1) {
                        setActiveMenuIndex(index);
                    }
                });
            }
        });
    }, [activeMenuIndex, toggleDropdownIndex]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                <div className={styles.navLinks}>
                    {
                        navbarMenuList.map((item, index) => {
                            return (
                                <ul key={index}>
                                    <li className={styles.dropdown}
                                        onMouseEnter={() => setToggleDropdownIndex(index)}
                                        onMouseLeave={() => setToggleDropdownIndex(-1)}
                                    >
                                        <Link href={`${item.link}`}>
                                            <div className={`flex items-center gap-[2px] justify-center ${toggleDropdownIndex === index && 'text-[#FFF]'} ${activeMenuIndex === index && 'text-[#FFF] font-semibold'}`}>

                                                {item.name === "Search" ? (
                                                    <div onClick={() => setOpenSearchPopup(true)}>
                                                        {item?.icon}
                                                    </div>
                                                ) : item.name}
                                                {item.subMenu && toggleDropdownIndex !== index && <ChevronDown />}
                                                {item.subMenu && toggleDropdownIndex === index && <ChevronUp />}
                                            </div>
                                        </Link>
                                        {
                                            item.subMenu && (
                                                <div className={styles.dropdownContent}>
                                                    {
                                                        item.subMenu.map((subItem, subIndex) => {
                                                            return (
                                                                <Link key={subIndex} href={`${subItem.link}`}>
                                                                    {subItem.name}
                                                                </Link>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        }
                                        {
                                            openSearchPopup && (
                                                <ProductSearch openSearchPopup={openSearchPopup} setOpenSearchPopup={setOpenSearchPopup} />
                                            )
                                        }
                                    </li>
                                </ul>
                            )
                        })
                    }
                </div>
            </div>
        </nav>
    );
}