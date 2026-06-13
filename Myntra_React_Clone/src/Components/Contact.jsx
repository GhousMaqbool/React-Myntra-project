import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Message stored in MongoDB!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="contact-main">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" placeholder="Your Name" required 
            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" placeholder="Your Email" required 
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <textarea 
            placeholder="Your Message" required 
            value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </main>
  );
};

export default Contact;