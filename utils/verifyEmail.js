const verifyEmail = (first_name, email, otp) => {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Email</title>
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
            background-color: #fff;
        }

        .main {
            margin: 0 auto;
            width: 60%;
            text-align: center;
        }

        .header {
            background-color: #26204d;
            color: white;
            padding: 20px 40px;
        }

        .content {
            padding: 28px 40px;
            border-left: 1px solid #c3ccd6;
            border-right: 1px solid #c3ccd6;
            color: #191a1f;
            /* font-family: "Avenir", sans-serif; */
        }

        .content-title {
            margin-top: 0;
            font-size: 20px;
            font-weight: bold;
            line-height: 0%;
            margin-bottom: 50px;
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


        .cta {
            margin: 50px 0;
        }

        .cta-btn {
            color: #fff;
            background-color: #26204d;
            border-radius: 10px;
            padding: 10px 50px;
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
            background-color: #26204d;
            padding: 32px 40px;
            color: #fff;
            font-family: "Avenir", sans-serif;
            text-align: center;
        }

        .links a {
            color: #fff;
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

            #greeting {
                font-weight: bold;
                font-size: larger;
            }
        }
    </style>
</head>


<body>
    <div class="wrapper">
        <div class="main">
            <div class="header">
                <img src="https://res.cloudinary.com/konectin-cloud/image/upload/v1706144241/znspp5iz3t64xaz7fzzy.png"
                    alt="Konectin" />
            </div>
            <div class="content">
                <div class="content-wrapper">
                    <p class="content-title heading">
                        <span class="accent">Verify</span> Your Email
                    </p>
                    <div class="content-body">
                        <div>
                            <p id="greeting">Hi ${first_name},</p>
                            <p>
                                Your email address
                                <span class="email extra-bold">${email}</span> has
                                been added to <a href="https://konectin.org/">konectin.org</a>
                            </p>

                            <p>
                                To finish verifying your email address, click the “Verify Email
                                Address” button below.
                            </p>
                        </div>
                        <div class="cta">
                            <span class="cta-btn">${otp}</span>
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
                <hr style="margin-top: 10px" />
                <p>
                    If you did not create an account, <a
                        href="${process.env.BACKEND_URL}/user/removeEmail?email=${email}">click here</a> to
                    remove this email address
                </p>

                <p>
                    Regards, <br>
                    <a href="https://konectin.org/" class="extra-bold">Konectin</a> Team
                </p>
            </div>
        </div>
    </div>
</body>

</html>
  `;
};
module.exports = { verifyEmail };
