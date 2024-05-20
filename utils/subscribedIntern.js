// utils/subscribedInternEmail.js
const subscribedInternEmail = (data) => {
    const { firstName, email, role, upload } = data;
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Welcome to Konectin's Internship Program!</title>
      </head>
      <style>
          @import url("https://fonts.cdnfonts.com/css/avenir");
          @import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@900&display=swap");
          @import url("https://fonts.cdnfonts.com/css/satoshi");
  
          body {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-size: 18px;
          }
          .wrapper {
              margin-left: auto;
              margin-right: auto;
              max-width: 800px;
              background-color: #fff;
              border: 1px solid #c3ccd6;
          }
          .header {
              background-color: #26204d;
              color: white;
              padding: 20px;
              border-bottom: 4px solid #8c86b3;
          }
          .content {
              padding: 28px 40px;
              color: #191a1f;
              font-family: "Avenir", sans-serif;
          }
          .accent {
              color: #fc670b;
          }
          .cta-btn {
              display: inline-block;
              color: #fff;
              background-color: #6A5ACD;
              border-radius: 5px;
              padding: 10px 20px;
              text-align: center;
              font-weight: 700;
              font-size: 16px;
              line-height: 120%;
              text-decoration: none;
              font-family: "Satoshi", sans-serif;
              margin-top: 10px;
          }
          .footer {
              border-top: 4px solid #8c86b3;
              background-color: #26204d;
              padding: 20px;
              text-align: center;
              color: white;
              font-family: "Avenir", sans-serif;
              font-size: 12px;
          }
          .connect {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 10px;
              margin-bottom: 20px;
          }
          .connect img {
              width: 30px;
              height: 30px;
          }
          .links {
              display: flex;
              justify-content: center;
              gap: 10px;
              margin-bottom: 10px;
          }
          .links a {
              color: white;
              text-decoration: none;
          }
      </style>
      <body>
          <div class="wrapper">
              <div class="header">
                  <img src="https://res.cloudinary.com/konectin-cloud/image/upload/v1706144241/znspp5iz3t64xaz7fzzy.svg" alt="Konectin">
              </div>
              <div class="content">
                  <h1>Welcome to <span class="accent">Konectin's</span> Internship Program!</h1>
                  <p>Dear ${firstName},</p>
                  <p>Welcome to Konectin's Internship Program! We're excited to have you on board.</p>
                  <p>Our mission is to connect talented individuals like you with amazing internship opportunities that align with your career goals. Our platform is designed to provide you with a seamless experience, from creating your profile to getting matched with the perfect internship. This program is designed to be a stepping stone to your future career. Stay tuned for updates on available internships and don't hesitate to reach out if you have any questions. We're here to support you every step of the way.</p>
                  <p>Welcome to the Konectin community!</p>
                  <p>Best Regards,<br>Konectin Team</p>
                  <div style="margin-top: 20px;">
                      <h3>Learn more about us</h3>
                      <p>Join our community on X.com and LinkedIn for updates, networking opportunities, and more.</p>
                      <a href="https://www.konectin.com/community" class="cta-btn">Join our community</a>
                  </div>
              </div>
              <div class="footer">
                  <div class="connect">
                    <a href="mailto:info@konectin.org">
                    <img src="https://res.cloudinary.com/konectin-cloud/image/upload/v1706144240/wodptjoeokd8yzbhnysn.svg" alt="Connect with konectin via gmail" />
                    </a>
                    <a href="https://web.facebook.com/people/Konectin-Inc/100091305090654/">
                    <img src="https://res.cloudinary.com/konectin-cloud/image/upload/v1706144240/yghkkxw7x6csyi7lhgjb.svg" alt="Connect with konectin via facebook" />
                    </a>
                    <a href="https://www.linkedin.com/company/konectin">
                    <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/linkedin@2x.png" alt="Connect with konectin via LinkedIn" />
                    </a>
                    <a href="https://twitter.com/KonectinInc">
                    <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/twitter@2x.png" alt="Connect with konectin via Twitter" />
                    </a>
                  </div>
                  <div class="links">
                    <div class="company-links">
                    <a href="https://konectin.org/">konectin.org</a>
                    <span>&#8208;</span>
                    <a href="https://konectin.org/terms">Terms of service</a>
                    </div>
                    <span class="show">&#8208;</span>
                    <div class="company-links">
                    <a href="https://konectin.org/policy">Privacy Policy</a>
                    <span>&#8208;</span>
                    <a href="https://konectin.org/faq">FAQ</a>
                    </div>
                  </div>
                  <p style="font-size: 16px">Copyright &copy; 2024 Konectin.</p>
                  <p style="font-size: 16px">
                      651 N Broad Street, Middletown Delaware, USA
                  </p>
              </div>
          </div>
      </body>
      </html>
    `;
  };
  
  module.exports = subscribedInternEmail;
