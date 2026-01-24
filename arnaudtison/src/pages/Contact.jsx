import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../css/contact.scss";

export default function Contact() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const form = useRef();
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(""); // Fixed: changed useStatus to useState
    const [isSending, setIsSending] = useState(false);

    const checkFields = () => {
        const first = document.querySelector('#firstname');
        const last = document.querySelector('#lastname');
        const mail = document.querySelector('#email');
        const subject = document.querySelector('#subject');
        const message = document.querySelector('#message');
    
        let errorMsg = []

        if (first.value.trim() === "") {
            errorMsg.push("First Name is required.")
        }

        if (last.value.trim() === "") {
            errorMsg.push("Last Name is required.")
        }

        if (mail.value.trim() === "") {
            errorMsg.push("E-mail is required.")
        } else if (!emailRegex.test(mail.value.trim())) {
            errorMsg.push("Please enter a valid e-mail.")
        }

        if (subject.value.trim() === "") {
            errorMsg.push("Subject is required.")
        }

        if (message.value.trim() === "") {
            errorMsg.push("Message is required.")
        }

        setErrors(errorMsg);
        return errorMsg.length === 0;
    }

    const sendEmail = (e) => {
        e.preventDefault();
 
        // check fields
        if (checkFields()) {
            setIsSending(true);
            setStatus("Sending...");

            emailjs
                .sendForm(
                    "service_cl3k46p",
                    "template_hk38ueo",
                    form.current,
                    {
                        publicKey: "WV9ko1_6JU4YBgLAp",
                    }
                )
                .then(
                    () => {
                        setStatus("Message sent!");
                        form.current.reset(); 
                        setErrors([]);
                        setIsSending(false);
                    },
                    (error) => {
                        setStatus("Failed to send. Please try again.");
                        setIsSending(false);
                    }
                );
        };
    };

    return (
        <div className="contact-section">
            <div className="contact-content">
                <h2>GET IN TOUCH</h2>
                {errors.map((error, index) => (
                    <span key={index}>{error}</span>
                ))}
                
                {/* 1. Changed div to form, added ref and onSubmit (for 'Enter' key support) */}
                <form className="contact-fields" ref={form} onSubmit={sendEmail}>
                    <div className="contact-fields-col">
                        <div className="field first">
                            <span>First Name</span>
                            <input id="firstname" type="text" name="firstname" required />
                        </div>
                        <div className="field last">
                            <span>Last Name</span>
                            <input id="lastname" type="text" name="lastname" required />
                        </div>
                        <div className="field mail">
                            <span>E-mail</span>
                            <input id="email" type="email" name="email" required />
                        </div>
                    </div>
                    <div className="contact-fields-col">
                        <div className="field subject">
                            <span>Subject</span>
                            <input id="subject" type="text" name="subject" required />
                        </div>
                        <div className="field msg">
                            <span>Message</span>
                            <textarea id="message" name="message" required />
                        </div>
                    </div>
                </form>

                <div className="contact-fields-submit">
                    <button 
                        id="submit-btn" 
                        onClick={sendEmail} 
                        disabled={isSending}
                        style={{ opacity: isSending ? 0.5 : 1}}
                    >
                        {isSending ? "Sending..." : "Send"}
                    </button>                    
                    {status && <p style={{marginTop: "10px"}}>{status}</p>}
                </div>
            </div>
        </div>
    );
}