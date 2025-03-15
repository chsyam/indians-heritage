"use client";

import React, { useState, useEffect } from "react";
import styles from "./../../styles/Layout/BreadCrumb.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumb() {
    const pathname = usePathname();
    const [breadCrumb, setBreadCrumb] = useState([]);
    const breadCrumbAlternativeTerms = {
        "about": "About",
        "contact-us": "Contact Us",
        "groceries": "Groceries",
        "pickles": "Pickles",
        "spices": "Spices",
        "others": "Others",
    }
    const ignoredTerms = ["product-category", "product"];

    useEffect(() => {
        const list = pathname?.split("/");
        var temp = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i] === "" && i === 0) {
                temp.push("Home");
            } else if (list[i] !== "" && !ignoredTerms.includes(list[i])) {
                if (breadCrumbAlternativeTerms[list[i]]) {
                    temp.push(breadCrumbAlternativeTerms[list[i]]);
                } else {
                    temp.push(list[i].charAt(0).toUpperCase() + list[i].slice(1));
                }
            }
        }
        setBreadCrumb(temp);
    }, [pathname]);

    return (
        <div className={styles.container}>
            {
                breadCrumb?.length > 1 && (
                    <div className={styles.breadCrumb}>
                        <ul className={styles.breadCrumbContent}>
                            {
                                breadCrumb?.map((item, index) => {
                                    return (
                                        <li key={index} className={`${index === breadCrumb.length - 1 && styles.activePart}`}>
                                            <Link href="/">{item}</Link>
                                            {
                                                index !== breadCrumb.length - 1 && (
                                                    <span className="px-2">{">"}</span>
                                                )
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    );
}