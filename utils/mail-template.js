const Default = (title, content, signature) => {
  return `
  
  <!DOCTYPE html>
<html
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  lang="en"
>
  <head>
    <title>${title}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--[if mso
      ]><xml
        ><o:OfficeDocumentSettings
          ><o:PixelsPerInch>96</o:PixelsPerInch
          ><o:AllowPNG /></o:OfficeDocumentSettings></xml
    ><![endif]-->
    <link
      href="https://fonts.googleapis.com/css2?family=Merriweather:wght@100;200;300;400;500;600;700;800;900"
      rel="stylesheet"
      type="text/css"
    />
    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css2?family=Inter&amp;family=Work+Sans:wght@700&amp;display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <!--<![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: inherit;
      }

      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }

      .image_block img + div {
        display: none;
      }

      @media (max-width: 720px) {
        .desktop_hide table.icons-inner,
        .social_block.desktop_hide .social-table {
          display: inline-block !important;
        }

        .icons-inner {
          text-align: center;
        }

        .icons-inner td {
          margin: 0 auto;
        }

        .mobile_hide {
          display: none;
        }

        .row-content {
          width: 100% !important;
        }

        .stack .column {
          width: 100%;
          display: block;
        }

        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0px;
        }

        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }

        .row-2 .column-1 .block-2.paragraph_block td.pad > div,
        .row-2 .column-1 .block-3.paragraph_block td.pad > div,
        .row-2 .column-1 .block-5.paragraph_block td.pad > div,
        .row-2 .column-1 .block-6.paragraph_block td.pad > div,
        .row-3 .column-1 .block-1.paragraph_block td.pad > div,
        .row-3 .column-1 .block-3.paragraph_block td.pad > div,
        .row-3 .column-1 .block-4.paragraph_block td.pad > div,
        .row-3 .column-1 .block-5.paragraph_block td.pad > div {
          font-size: 14px !important;
        }

        .row-2 .column-1 .block-1.heading_block h2 {
          font-size: 20px !important;
        }
      }
    </style>
  </head>

  <body
    style="
      background-color: #f7f7f7;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
  >
    <table
      class="nl-container"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        background-color: #f7f7f7;
      "
    >
      <tbody>
        <tr>
          <td>
            <table
              class="row row-1"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #26204d;
                        border-radius: 0;
                        color: #000;
                        width: 700px;
                        margin: 0 auto;
                      "
                      width="700"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              background-color: #ffffff;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <table
                              class="image_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td class="pad" style="width: 100%">
                                  <div
                                    class="alignment"
                                    align="center"
                                    style="line-height: 10px"
                                  >
                                    <img
                                      src="https://konectin.org/assets/konectin.69e1ce73.svg"
                                      style="
                                        display: block;
                                        height: auto;
                                        border: 0;
                                        max-width: 98px;
                                        width: 100%;
                                      "
                                      width="98"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            ${content}
            <table
              class="row row-3"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-radius: 0 0 20px 20px;
                        color: #000;
                        width: 700px;
                        margin: 0 auto;
                      "
                      width="700"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              background-color: #26204d;
                              padding-bottom: 15px;
                              padding-top: 15px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <table
                              class="paragraph_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #201f42;
                                      direction: ltr;
                                      font-family: Inter, sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 150%;
                                      text-align: center;
                                      mso-line-height-alt: 24px;
                                    "
                                  >
                                    <p style="margin: 0">
                                      <span style="color: #ffffff"
                                        >Connect With Us</span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="social_block block-2"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 10px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    text-align: center;
                                  "
                                >
                                  <div class="alignment" align="center">
                                    <table
                                      class="social-table"
                                      width="144px"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        display: inline-block;
                                      "
                                    >
                                      <tr>
                                        <td style="padding: 0 2px 0 2px">
                                          <a
                                            href="https://web.facebook.com/people/Konectin-Inc/100091305090654/"
                                            target="_blank"
                                            ><img
                                              src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/facebook@2x.png"
                                              width="32"
                                              height="32"
                                              alt="Facebook"
                                              title="facebook"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                        <td style="padding: 0 2px 0 2px">
                                          <a
                                            href="http://www.twitter.com/KonectinInc"
                                            target="_blank"
                                            ><img
                                              src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/twitter@2x.png"
                                              width="32"
                                              height="32"
                                              alt="Twitter"
                                              title="Twitter"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                        <td style="padding: 0 2px 0 2px">
                                          <a
                                            href="https://www.linkedin.com/company/konectin/"
                                            target="_blank"
                                            ><img
                                              src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/linkedin@2x.png"
                                              width="32"
                                              height="32"
                                              alt="LinkedIn"
                                              title="LinkedIn"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                        <td style="padding: 0 2px 0 2px">
                                          <a
                                            href="mailto:info@konectin.org"
                                            target="_blank"
                                            ><img
                                              src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/mail@2x.png"
                                              width="32"
                                              height="32"
                                              alt="E-Mail"
                                              title="E-Mail"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="paragraph_block block-3"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td class="pad" style="padding-bottom: 10px">
                                  <div
                                    style="
                                      color: #201f42;
                                      direction: ltr;
                                      font-family: Inter, sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 180%;
                                      text-align: center;
                                      mso-line-height-alt: 28.8px;
                                    "
                                  >
                                    <p style="margin: 0">
                                      <span style="color: #ffffff"
                                        ><a
                                          href="https://konectin.org/"
                                          target="_blank"
                                          style="
                                            text-decoration: underline;
                                            color: #ffffff;
                                          "
                                          rel="noopener"
                                          >www.konectin.org</a
                                        >
                                        -
                                        <a
                                          href="https://konectin.org/terms"
                                          target="_blank"
                                          style="
                                            text-decoration: underline;
                                            color: #ffffff;
                                          "
                                          rel="noopener"
                                          >Terms of service</a
                                        >
                                        -
                                        <a
                                          href="https://konectin.org/policy"
                                          target="_blank"
                                          style="
                                            text-decoration: underline;
                                            color: #ffffff;
                                          "
                                          rel="noopener"
                                          >Privacy Policy</a
                                        >
                                        -
                                        <a
                                          href="https://konectin.org/faq"
                                          target="_blank"
                                          style="
                                            text-decoration: underline;
                                            color: #ffffff;
                                          "
                                          rel="noopener"
                                          >FAQ</a
                                        ></span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="paragraph_block block-4"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td class="pad" style="padding-bottom: 10px">
                                  <div
                                    style="
                                      color: #201f42;
                                      direction: ltr;
                                      font-family: Inter, sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 180%;
                                      text-align: center;
                                      mso-line-height-alt: 28.8px;
                                    "
                                  >
                                    <p style="margin: 0">
                                      <span style="color: #ffffff"
                                        >Copyright © 2023 Konectin.</span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="paragraph_block block-5"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td class="pad" style="padding-bottom: 10px">
                                  <div
                                    style="
                                      color: #201f42;
                                      direction: ltr;
                                      font-family: Inter, sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 180%;
                                      text-align: center;
                                      mso-line-height-alt: 28.8px;
                                    "
                                  >
                                    <p style="margin: 0">
                                      <span style="color: #ffffff"
                                        >Konectin Address</span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End -->
  </body>
</html>


  `;
};

const template = {
  default: Default,
};

module.exports = { template };
