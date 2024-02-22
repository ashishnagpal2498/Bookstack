import React from 'react';
import '../stylesheets/contactus.css';

const ContactUs = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email: event.target.email.value,
      phone: event.target.phone.value,
      username: event.target.username.value,
      description: event.target.description.value,
    };

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data saved to MongoDB');
        alert('Thank you for contacting us!');
        event.target.reset();
      } else {
        console.error('Server error');
        alert('There was a problem with your submission. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('There was a network error. Please try again.');
    }
  };

  return (
    <div className="about-container">
      <h1>Contact Us</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisl cursus, rutrum dolor ut, ultrices neque. Suspendisse tortor tortor, laoreet aliquet vehicula vitae, consectetur ut libero. Curabitur sed tempus mauris. Suspendisse eu pulvinar magna. Pellentesque vitae diam quis lorem vulputate placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue tincidunt libero, at vehicula est consequat sit amet. Phasellus nibh lectus, mattis non ex sed, eleifend rhoncus ante. Cras non justo magna. Ut consequat nisi quis euismod efficitur. Aenean varius rhoncus lectus volutpat venenatis. Vivamus eu egestas lacus. Phasellus laoreet massa ac lacus mollis mollis. Phasellus blandit elit vel nibh volutpat suscipit. Proin tincidunt enim in sem dapibus lobortis. Duis ut mattis lorem.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Your Email" name="email" required />
        <input type="text" placeholder="Your Phone" name="phone" />
        <input type="text" placeholder="Your Name" name="username" required />
        <textarea placeholder="Describe your issue" name="description" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
