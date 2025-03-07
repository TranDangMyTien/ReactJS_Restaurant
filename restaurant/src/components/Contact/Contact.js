import React, { useState } from "react";
import "./Contact.css";
import Swal from "sweetalert2";

export default function Contact() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult("Sending...");
    
    const formData = new FormData(event.target);
    formData.append("access_key", process.env.REACT_APP_WEB3FORMS_KEY);
    
    // Get subject information from dropdown
    const subjectSelect = event.target.elements.subject;
    const subjectText = subjectSelect.options[subjectSelect.selectedIndex].text;
    
    // Add information to both email subject and message content
    formData.append("subject", `New contact from restaurant website - ${subjectText}`);
    
    // Add subject to message content to ensure it displays
    const originalMessage = formData.get("message");
    formData.set("message", `Request type: ${subjectText}\n\n${originalMessage}`);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Sent successfully!",
          text: "Thank you for contacting us! We will respond within 24 hours.",
          icon: "success",
          confirmButtonText: "Close",
          confirmButtonColor: "#28a745",
        });
        event.target.reset();
        setResult("");
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message || "An error occurred while sending the form.",
          icon: "error",
          confirmButtonText: "Try again",
          confirmButtonColor: "#dc3545",
        });
        setResult(data.message || "An error occurred while sending the form.");
      }
    } catch (error) {
      Swal.fire({
        title: "Connection error!",
        text: "Please check your internet connection and try again later.",
        icon: "error",
        confirmButtonText: "Close",
        confirmButtonColor: "#dc3545",
      });
      setResult("An error occurred while sending the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container" id="contact">
      {/* Title section */}
      <div className="contact-header">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-subtitle">
          We are always ready to listen to your feedback and serve you!
        </p>
      </div>

      {/* Introduction section with image */}
      <div className="contact-intro">
        <div className="contact-intro-text">
          <p>
            Bếp Thái Restaurant is a premier dining establishment in Thanh My Loi. 
            With an elegant atmosphere, diverse menu, and professional staff, 
            we are committed to providing you with the finest dining experience.
          </p>
          <p>
            Please contact us for reservations, event planning, or to share your feedback. 
            We look forward to serving you!
          </p>
        </div>
        <div className="contact-intro-image">
          <img 
            src="https://res.cloudinary.com/dvxzmwuat/image/upload/v1740931265/snapedit_1740931151637_athixb.png" 
            alt="Epsilon Restaurant" 
            className="restaurant-image"
          />
        </div>
      </div>

      {/* Main content: form on left, info + map on right */}
      <div className="contact-main-content">
        {/* Contact form on left */}
        <div className="form-container">
          <form onSubmit={onSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name <span className="required">*</span></label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter your full name" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Email <span className="required">*</span></label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email"
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number <span className="required">*</span></label>
              <input 
                type="tel" 
                name="phone" 
                placeholder="Enter your phone number"
                required 
              />
            </div>

            <div className="form-group">
              <label>Subject <span className="required">*</span></label>
              <select name="subject" required>
                <option value="general">General Information</option>
                <option value="reservation">Table Reservation</option>
                <option value="party">Event Planning</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Message <span className="required">*</span></label>
              <textarea 
                name="message" 
                placeholder="Enter your message"
                rows="5" 
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            <span className="result-message">{result}</span>
          </form>
        </div>
        
        {/* Right section: contact info + map */}
        <div className="contact-right-section">
          {/* Contact information */}
          <div className="contact-info-box">
            <h3>Contact Information</h3>
            <ul className="contact-info-list">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>5 Street 87A, Thạnh Mỹ Lợi Ward, District 2, Ho Chi Minh City, Vietnam</span>
              </li>
              <li>
                <i className="fas fa-phone-alt"></i>
                <span>(+84) 123 456 789</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>bepthai.restaurant@gmail.com</span>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <span>Monday - Friday: 10:00 - 22:00</span>
              </li>
              <li>
                <i className="fas fa-calendar"></i>
                <span>Saturday - Sunday: 09:00 - 23:00</span>
              </li>
            </ul>
          </div>
          
          {/* Google Maps */}
          <div className="map-container">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5875141589954!2d106.75433477316933!3d10.766239059385358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317525c7ba6c44b7%3A0xd7685f3ecd2a875!2zNSDEkMaw4budbmcgODdBLCBQaMaw4budbmcgVGjhuqFuaCBN4bu5IEzhu6NpLCBRdeG6rW4gMiwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1740585715736!5m2!1svi!2s"
              width="100%"
              height="300"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}