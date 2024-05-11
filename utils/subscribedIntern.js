const subscribedInternEmail = (intern) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Intern Details</title>
    <style>
        table {
        border-collapse: collapse;
        width: 100%;
        }
        th, td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        color: #000000;
        }
        th {
        background-color: #f1f1f1;
        }
    </style>
    </head>
    <body>
    <h2>Intern Details</h2>
    <table>
        <tbody>
        <tr>
            <th>Full Name</th>
            <td>${intern.fullName}</td>
        </tr>
        <tr>
            <th>Email</th>
            <td>${intern.email}</td>
        </tr>
        <tr>
            <th>Phone Number</th>
            <td>${intern.phoneNumber}</td>
        </tr>
        <tr>
            <th>Country</th>
            <td>${intern.country}</td>
        </tr>
        <tr>
            <th>Gender</th>
            <td>${intern.gender}</td>
        </tr>
        <tr>
            <th>Age Range</th>
            <td>${intern.ageRange}</td>
        </tr>
        <tr>
            <th>Role</th>
            <td>
            ${intern.role.type} - ${intern.role.field}
            </td>
        </tr>
        <tr>
            <th>Resume</th>
            <td>
            ${intern.upload.resumes}
            </td>
        </tr>
        <tr>
            <th>Portfolio</th>
            <td>
            ${intern.upload.portfolio}
            </td>
        </tr>
        </tbody>
    </table>
    </body>
    </html>
    `;
};

module.exports = subscribedInternEmail;
