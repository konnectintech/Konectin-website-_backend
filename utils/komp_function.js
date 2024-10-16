const connectDatabase = require("../config/database")
const { transporter, sendHtmlEmail } = require("../config/email");
const User = require("../models/user.model");
const Joi = require("joi")

connectDatabase()


function create_subject(name) {
    return `Congratulations, ${name}`
}

function create_content(name) {
    return `
<head>
    <meta name="description" content="You can now unlock your Potential with Konectin Mentorship Program (KOMP)">
</head>
<body>
<p><b>Dear ${name},</b></p>

<p>I hope this email finds you well!</p>

<p>We are thrilled to introduce you to the Konectin Mentorship Program (KOMP), a unique opportunity designed to help you unlock your full potential and achieve your career goals. At Konectin, we understand the challenges faced by young professionals in Africa, and we are here to bridge the gap between ambition and achievement.</p>

<h2>What is KOMP?</h2>

<p>KOMP is a platform where you can connect with experienced mentors from across Africa and various industries. These mentors are carefully selected for their expertise, passion, and commitment to guiding the next generation of professionals.</p>

<h2>Why Join KOMP?</h2>

<ul>
  <li>Personalized Guidance: Get one-on-one mentorship tailored to your career aspirations.</li>
  <li>Industry Insights: Gain valuable knowledge and insights from professionals who have walked the path you aspire to follow.</li>
  <li>Networking Opportunities: Expand your professional network and connect with like-minded individuals.</li>
  <li>Skill Development: Enhance your skills through practical advice and real-world experiences shared by your mentors.</li>
  <li>Free Access: Yes, you read that right! You can join KOMP for free and start benefiting from this amazing opportunity immediately.</li>
</ul>

<h2>How to Join?</h2>

<ol>
  <li>Sign Up: Visit our website Konectin.org to sign up or click here https://forms.gle/AUz6x5C15qyrjtxH7 to register for free.</li>
  <li>Complete Your Profile: Provide some details about your career interests and goals to help us match you with the perfect mentor.</li>
  <li>Get Matched: Our system will connect you with a mentor who fits your profile and career aspirations.</li>
  <li>Start Learning: Begin your mentorship journey and take the first step towards your dream career.</li>
</ol>

<h2>Our Mentors</h2>

<p>We have carefully picked our mentors from across Africa and multiple industries to ensure you receive diverse perspectives and guidance. Whether you're interested in tech, business, arts, or any other field, there's a mentor ready to help you succeed.</p>

<p>Don't miss out on this incredible opportunity to grow, learn, and connect. Join KOMP today and take the first step towards a brighter future!</p>

<p>If you have any questions or need assistance, please feel free to reach out to our team at info@konectin.org.</p>

<p>We are here to help you every step of the way.</p>

<p>Warm regards,</p>

<p><b>OrjiKalu Daniel</b></p>
<p><b>Marketing Manager</b></p>
<p><b>Konectin Inc.</b></p>
<p><b>www.konectin.org</b></p>
`

}

function create_full_mail(name) {
    const subject = create_subject(name)
    const content = create_content(name)
    return {
        subject,
        content
    }
}

// 518
async function send_komp_mail() {
    // const users = await User.find()
    // const users = await User.find({ email: "danielorjikalu102@gmail.com" })
    const users = await User.find()
    emails = []
    counter = 1
    for (let user of users) {
        if (counter <= 1345) {
            console.log(`${counter}/${users.length} already sent`, user.email)
            counter += 1
            continue
        }
        if (user.email == "juann.jande") {
            console.log("Ignore this email", user.email)
            continue
        }
        const { value, error } = Joi.string().email().validate(user.email)
        if (error) {
            console.log(`
                \n######################## Invalid Email ####################################\n${user.email}`)
            continue
        }
        const mail = create_full_mail(user.fullname)
        // const response = { response: "OK" }
        console.log(`
            \n############# Sending Email To ${user.email} #########################
            `)
        const response = await sendHtmlEmail(user.email, mail.subject, mail.content)
        if (response.response.includes("OK")) {
            console.log(`${counter}/${users.length} email(s) sent succesfully ----- ${user.email}`)
            counter += 1
        }

    }
    console.log(`\n\n${counter} emails sent, out of ${users.length}`)
    return null

}


send_komp_mail()