// utils/welcomeEmail.js
const welcomeEmail = (firstName) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to Konectin!</title>
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
      width: 100%;
      background-color: #fff; /* Neutral/200 */
      display: flex;
      justify-content: center;
      gap: 20px;
      }
      .main {
      max-width: 800px;
      width: 100%;
      }
      .header {
      background-color: #26204d;
      color: white;
      /* border-top-right-radius: 24px;
      border-top-left-radius: 24px; */
      border-bottom: 4px solid #8c86b3;
      padding: 19px 40px;
      }
      .content {
      padding: 28px 40px;
      border-left: 1px solid #c3ccd6;
      border-right: 1px solid #c3ccd6;
      color: #191a1f;
      font-family: "Avenir", sans-serif;
      }
      .content-title {
      font-size: 24px;
      font-weight: 900;
      line-height: 120%;
      }
      .heading {
      font-family: "Merriweather", serif;
      }
      .accent {
      color: #fc670b;
      }
      .email {
      font-weight: 700;
      color: #403580;
      }
      a {
      color: #403580;
      }
      .content-body {
      padding-top: 0;
      padding-bottom: 0;
      display: flex;
      flex-direction: column;
      row-gap: 16px;
      }
      .cta {
      display: flex;
      align-items: center;
      justify-content: center;
      }
      .cta-btn {
      color: #fff;
      background-color: #26204d;
      border-radius: 10px;
      padding: 20px 72px;
      text-align: center;
      font-weight: 700;
      font-size: 16px;
      line-height: 120%;
      text-decoration: none;
      font-family: "Satoshi", sans-serif;
      }
      .bold {
      font-weight: 700;
      }
      .extra-bold {
      font-weight: 800;
      }
      .black {
      font-weight: 900;
      }
      .footer {
      border-top: 4px solid #8c86b3;
      /* border-bottom-right-radius: 24px;
      border-bottom-left-radius: 24px; */
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #26204d;
      padding: 32px 40px;
      color: #fff;
      font-family: "Avenir", sans-serif;
      }
      .connect {
      display: flex;
      align-items: center;
      gap: 16px;
      }
      .links {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
      padding-top: 16px;
      padding-bottom: 16px;
      }
      .links a {
      color: #fff;
      }
      .company-links {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      }
      .show {
      display: none;
      }

      .gray {
        background-color: #C3CCD6;
        padding: 1% 3%;
        min-height: 200px;
        text-align: center;
      }
  
      @media only screen and (min-width: 768px) {
      .links {
          flex-direction: row;
          column-gap: 8px;
      }
      .show {
          display: block;
      }
      }
  </style>
  <body>
      <div class="wrapper">
      <div class="main">
          <div class="header">
          <img
              src="https://res.cloudinary.com/konectin-cloud/image/upload/v1706144241/znspp5iz3t64xaz7fzzy.svg"
              alt="Konectin"
          />
          </div>
          <div class="content">
          <div class="content-wrapper">
              <p class="content-title heading" style="margin-top: 0">
              Welcome to <span class="accent">Konectin!</span>
              </p>
              <div class="content-body">
              <div>
                  <p>Dear ${firstName},</p>
                  <p>We're delighted to have you here!! We are dedicated to Empowering Africa's Future. As a new member, you now have access to a wide range of resources and opportunities to advance your career. At Konectin, we're committed to helping you succeed. Whether you're looking for job opportunities, career advice, or professional networking, we are here! Explore our platform, check out our offerings, and don't hesitate to reach out if you have any questions. We're here to support you every step of the way. Welcome to the Konectin community!</p>
              </div>
              <div>
                  <p>Here's why <a href="https://konectin.org/">Konectin </a> is your ultimate career partner:</p>
                  <div class="gray" style="padding-bottom: 30px;">
                    <h3 class="accent">Powerful Resume Builder</h3>
                    <p>Unlock your potential with our state-of-the-art Resume Builder. Craft stunning resumes that stand out and captivate potential employers.</p>
                    <div style="text-align: center;">
                      <a class="cta-btn" href="https://www.konectin.org/resume">Create your Resume Now</a>
                    </div>
                  </div>
                  <h3 style="color: #403580;">Curated Internship Listings</h3>
                  <p>Gain access to a wide range of exclusive internship listings from top companies in your field. Your dream internship is just a click away.</p>
                  <div style="text-align: center;">
                    <a href="https://www.konectin.org/internship" style="color: #fc670b;">https://www.konectin.org/internship</a>
                  </div>
              </div>
              <div>
                <p>Your future begins here, and we're honored to be a part of your journey. Get ready to make your mark in the world of internships!</p>
                <p>Regards,<br><a href="https://konectin.org/">Konectin</a> Team</p>
                <hr style="border: none; border-top: 1px solid #c3ccd6; margin: 20px 0;">
                <p>P.S. Don't forget to complete your profile and try out our <a href="https://www.konectin.org/resume" class="accent">Resume Builder</a>—it's the first step to securing your dream internship!</p>
              </div>
              </div>
          </div>
          </div>
          <div class="footer">
            <div class="connect">
              <p style="font-size: 16px">Connect With Us</p>
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
      </div>
  </body>
  </html>
  `;
};

module.exports = { welcomeEmail };