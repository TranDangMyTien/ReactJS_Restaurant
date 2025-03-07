import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Contact.css";

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
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtitle">
        We are always ready to listen to your feedback and serve you!
      </p>

      <div className="contact-info-section">
        <div className="contact-info-item">
          <i className="fas fa-map-marker-alt"></i>
          <div>
            <h4>Address</h4>
            <p>5 Street 87A, Thạnh Mỹ Lợi Ward, District 2, Ho Chi Minh City, Vietnam</p>
          </div>
        </div>
        
        <div className="contact-info-item">
          <i className="fas fa-phone-alt"></i>
          <div>
            <h4>Phone</h4>
            <p>(+84) 123 456 789</p>
          </div>
        </div>
        
        <div className="contact-info-item">
          <i className="fas fa-envelope"></i>
          <div>
            <h4>Email</h4>
            <p>epsilon.restaurant@gmail.com</p>
          </div>
        </div>
        
        <div className="contact-info-item">
          <i className="fas fa-clock"></i>
          <div>
            <h4>Opening Hours</h4>
            <p>Monday - Friday: 10:00 - 22:00</p>
            <p>Saturday - Sunday: 09:00 - 23:00</p>
          </div>
        </div>
      </div>

      <div className="contact-content">
        <div className="form-container">
          <h3 className="form-title">Send Message</h3>
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
          </form>
          <span className="result-message">{result}</span>
        </div>
        
        <div className="map-container">
          <h3 className="map-title">Restaurant Location</h3>
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
  );
}