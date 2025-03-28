"use client";

import React from "react";
import styles from "./../../styles/Layout/Footer.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.footer}>
                <div className={styles.footer_content}>
                    <div className="grow">
                        <div className="my-2 text-[15px]">
                            <img onClick={() => router.push("/")} className="cursor-pointer" src="/images/logo.svg" alt="Logo" width={200} height={200} />
                        </div>
                        <div>
                            Indian Heritage - Taste the Tradition
                        </div>
                    </div>
                    <div className="grow">
                        <div>
                            <div className={styles.block_title}>Support</div>
                            <ul className={styles.footer_links}>
                                <li className="my-2">
                                    <Link href="/contact-us">Contact Us</Link>
                                </li>
                                <li className="my-2">
                                    <Link href="#">Delivery Information</Link>
                                </li>
                                <li className="my-2">
                                    <Link href="#">Privacy Policy</Link>
                                </li>
                                <li className="my-2">
                                    <Link href="#">Terms & Conditions</Link>
                                </li>
                                <li className="my-2">
                                    <Link href="#">Customer Service</Link>
                                </li>
                                <li className="my-2">
                                    <Link href="#">Return Policy</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grow">
                        <div>
                            <div className={styles.block_title}>Information</div>
                            <ul className={styles.footer_links}>
                                <li className="my-2">
                                    <Link href="/watchlist">WatchList</Link>
                                </li>
                                <li className="my-2">
                                    <Link href="#">Newsletter</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grow">
                        <div className={styles.footer_block}>
                            <div className={styles.block_title}>Get In Touch</div>
                            <div>
                                <span>Address: 123 Main Street, Anytown, CA 12345 - USA.</span><br />
                                <span>Tele: (012) 800 456 789-987</span><br />
                                <span>Email:Info@example.com</span><br />
                            </div>
                        </div>
                        <div className={styles.footer_block}>
                            <div className={styles.block_title}>Get In Time</div>
                            <div>
                                <span>Open: 8:00 AM - Close: 18:00 PM</span><br />
                                <span>Saturday - Sunday: Close</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}