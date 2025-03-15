import React from "react";
import styles from "./../../../styles/product/Product.module.css";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Product({ params }) {
    const { slug } = React.use(params);

    return (
        <div className={styles.container}>
            <div className={styles.product_container}>
                <div className={styles.product_gallery}>
                    <div className={styles.mainImage}>
                        <Image src="/images/almonds-1.jpg" alt={slug} width="350" height="200" />
                    </div>
                    <div className={styles.images_carousel}>
                        <div className={styles.shift_left}>
                            <ChevronLeft size={32} />
                        </div>
                        <Image src="/images/almonds-2.jpg" alt={slug} width="350" height="200" />
                        <Image src="/images/almonds-3.jpg" alt={slug} width="350" height="200" />
                        <Image src="/images/almonds-4.jpg" alt={slug} width="350" height="200" />
                        <Image src="/images/almonds-5.jpg" alt={slug} width="350" height="200" />
                        <div className={styles.shift_right}>
                            <ChevronRight size={32} />
                        </div>
                    </div>
                </div>
                <div className={styles.product_description}>
                    <div className={styles.product_title}>Humor New Agregado</div>
                </div>
            </div>
        </div>
    );
}