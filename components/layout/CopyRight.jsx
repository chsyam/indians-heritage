import React from "react";
import styles from "./../../styles/Layout/CopyRight.module.css";
import { InstagramSVG, WhatsappSVG } from "../icons";

export default function CopyRight() {
    return (
        <div className={styles.container}>
            <div className={styles.copyright}>
                <div className={styles.copyright_content}>
                    <div>
                        Copyright &copy;<span>Indians Heritage</span>. All Right Reserved.
                    </div>
                    <div className={styles.copyright_icons}>
                        <div><WhatsappSVG /></div>
                        <div><InstagramSVG /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}