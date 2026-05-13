import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../css/contact.scss';

export default function Contact() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const form = useRef();
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const checkFields = () => {
    const first = document.querySelector('#firstname');
    const last = document.querySelector('#lastname');
    const mail = document.querySelector('#email');
    const subject = document.querySelector('#subject');
    const message = document.querySelector('#message');

    const errs = {};

    if (first.value.trim() === '') errs.firstname = 'First name is required.';
    if (last.value.trim() === '') errs.lastname = 'Last name is required.';

    if (mail.value.trim() === '') {
      errs.email = 'E-mail is required.';
    } else if (!emailRegex.test(mail.value.trim())) {
      errs.email = 'Please enter a valid e-mail.';
    }

    if (subject.value.trim() === '') errs.subject = 'Subject is required.';
    if (message.value.trim() === '') errs.message = 'Message is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (checkFields()) {
      setIsSending(true);

      emailjs
        .sendForm(
          'service_cdivafb',
          'template_ffyo9il',
          form.current,
          {
            publicKey: '1_jn_WDFzg5gASEM2',
          },
        )
        .then(
          () => {
            form.current.reset();
            setErrors({});
            setIsSending(false);
            setSent(true);
          },
          () => {
            setStatus('Failed to send. Please try again.');
            setIsSending(false);
          },
        );
    }
  };

  const handleSendAnother = () => {
    setSent(false);
    setStatus('');
  };

  return (
    <div id="contact" className="contact-section">
      <div className="contact-content">
        <h2>GET IN TOUCH</h2>

        {sent ? (
          <div className="contact-success">
            <p className="contact-success-msg">Thank you for your message!<br />I&apos;ll be in touch.</p>
            <button className="contact-another-btn" onClick={handleSendAnother}>
              Send another message
            </button>
          </div>
        ) : (
          <>
            <form className="contact-fields" ref={form} onSubmit={sendEmail}>
              <div className="contact-fields-col">
                <div className="field first">
                  <span>First Name</span>
                  <div className="field-input-wrap">
                    <input id="firstname" type="text" name="firstname" required />
                    {errors.firstname && <p className="field-error">{errors.firstname}</p>}
                  </div>
                </div>
                <div className="field last">
                  <span>Last Name</span>
                  <div className="field-input-wrap">
                    <input id="lastname" type="text" name="lastname" required />
                    {errors.lastname && <p className="field-error">{errors.lastname}</p>}
                  </div>
                </div>
                <div className="field mail">
                  <span>E-mail</span>
                  <div className="field-input-wrap">
                    <input id="email" type="email" name="email" required />
                    {errors.email && <p className="field-error">{errors.email}</p>}
                  </div>
                </div>
              </div>
              <div className="contact-fields-col">
                <div className="field subject">
                  <span>Subject</span>
                  <div className="field-input-wrap">
                    <input id="subject" type="text" name="subject" required />
                    {errors.subject && <p className="field-error">{errors.subject}</p>}
                  </div>
                </div>
                <div className="field msg">
                  <span>Message</span>
                  <div className="field-input-wrap">
                    <textarea id="message" name="message" required />
                    {errors.message && <p className="field-error">{errors.message}</p>}
                  </div>
                </div>
              </div>
            </form>

            <div className="contact-fields-submit">
              <button
                id="submit-btn"
                onClick={sendEmail}
                disabled={isSending}
                style={{ opacity: isSending ? 0.5 : 1 }}
              >
                {isSending ? 'Sending...' : 'Send'}
              </button>
              {status && <p className="contact-send-error">{status}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
