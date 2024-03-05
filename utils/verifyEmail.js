const verifyEmail = (first_name, email, otp) => {
  return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Verify Email</title>
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
                      <span class="accent">Verify</span> Your Email
                      </p>
                      <div class="content-body">
                      <div>
                          <p>Hi, ${first_name},</p>
                          <p>
                          Your email address
                          <span class="email extra-bold">${email}</span> has
                          been added to
                          <a href="https://konectin.org/">konectin.org</a>
                          <p>
                              To finish verifying your email address, click the “Verify Email
                              Address” button below.
                          </p>
                          </p>
                      </div>
                      <div class="cta">
                          <a class="cta-btn" href="#">${otp}</a>
                      </div>
                      <div>
                          <p style="margin-bottom: 0">
                          *** Note, the OTP above only works for
                          <span class="bold">10 minutes</span> and can be used only
                          <span class="bold">once</span> ***
                          </p>
                      </div>
                      </div>
                  </div>
                  <hr style="margin-top: 32px" />
                  <div>
                      <p>
                      If you did not create an account, <a href="${process.env.BACKEND_URL}/user/removeEmail?email=${email}">click here</a> to
                      remove this email address
                      </p>
                  </div>
                  <div>
                      <p style="line-height: 150%">
                      Regards, <br />
                      <a href="https://konectin.org/" class="extra-bold">Konectin</a>
                      Team
                      </p>
                  </div>
                  </div>
                  <div class="footer">
                  <div class="connect">
                      <p style="font-size: 16px">Connect With Us</p>
                      <a href="mailto:info@konectin.org"></a>
                      <img
                          src="https://res.cloudinary.com/konectin-cloud/image/upload/v1706144240/wodptjoeokd8yzbhnysn.svg"
                          alt="Connect with konectin via gmail"
                      />
                      </a>
                      <a
                      href="https://web.facebook.com/people/Konectin-Inc/100091305090654/"
                      >
                      <img
                      src="https://res.cloudinary.com/konectin-cloud/image/upload/v1706144240/yghkkxw7x6csyi7lhgjb.svg"
                      alt="Connect with konectin via facebook"
                      />
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
                  <p style="font-size: 16px">Copyright &copy; 2023 Konectin.</p>
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

module.exports = { verifyEmail };
