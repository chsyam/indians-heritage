import React from "react";
import styles from "./../../styles/contact-us/ContactUs.module.css";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactUs() {
    return (
        <div>
            <div className={styles.address_block}>
                <div className={styles.contact_us_card_section}>
                    <div className={styles.contact_us_card}>
                        <div className={styles.icon}>
                            <MapPin size={30} />
                        </div>
                        <div className="text-xl">Our Location</div>
                        <div>012 345 678 / 123 456 789</div>
                        <div>info@example.com</div>
                    </div>
                    <div className={styles.contact_us_card}>
                        <div className={styles.icon}>
                            <Phone size={30} />
                        </div>
                        <div className="text-xl">Contact us Anytime</div>
                        <div>Mobile: 012 345 678</div>
                    </div>
                    <div className={styles.contact_us_card}>
                        <div className={styles.icon}>
                            <Mail size={30} />
                        </div>
                        <div className="text-xl">Write Some Words</div>
                        <div>Support24/7@example.com</div>
                        <div>info@example.com</div>
                    </div>
                </div>
            </div >
            <div>
                <form className={styles.form}>
                    <div className={styles.form_element}>
                        <span className="text-2xl">Get In Touch</span>
                    </div>
                    <div className={styles.form_group}>
                        <div className={styles.form_element}>
                            <input type="text" placeholder="Full Name" required />
                        </div>
                        <div className={styles.form_element}>
                            <input type="email" placeholder="Email" required />
                        </div>
                    </div>
                    <div className={styles.form_group}>
                        <div className={styles.form_element}>
                            <input type="text" placeholder="Subject" required />
                        </div>
                    </div>
                    <div className={styles.form_group}>
                        <div className={styles.form_element}>
                            <textarea rows={5} type="text" placeholder="Message / Feedback" required />
                        </div>
                    </div>
                    <div className={styles.form_group}>
                        <button>Send Message</button>
                    </div>
                </form>
            </div>
            <div className="drop-shadow-lg my-12">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d659082.9542008287!2d5.474097004279259!3d49.813462737464135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479545b9ca212147%3A0x64db60f602d392ef!2sLuxembourg!5e0!3m2!1sen!2sin!4v1742997223720!5m2!1sen!2sin" width="90%" height="450" style={{ border: 0, margin: "auto" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
        </div >
    );
}