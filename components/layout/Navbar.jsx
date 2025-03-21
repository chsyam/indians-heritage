"use client";

import React, { useState, useEffect } from "react";
import styles from "./../../styles/Layout/Navbar.module.css";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Navbar() {
    const [toggleDropdownIndex, setToggleDropdownIndex] = useState(-1);
    const [activeMenuIndex, setActiveMenuIndex] = useState(-1);

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
            name: "About Us",
            link: "/about"
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
                                        <Link href={`${item.link}`} className="">
                                            <div className={`flex items-center gap-[2px] justify-center ${toggleDropdownIndex === index && 'text-[#FFF]'} ${activeMenuIndex === index && 'text-[#FFF] font-semibold'}`}>
                                                {item.name}
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