/* eslint-disable @next/next/no-img-element */

type GetHtmlProps = {
  title: string;
  DefaultThumb?: boolean;
  date?: string;
  linkURL?: string;
  readTime?: string;
};

export function getHtml({
  linkURL,
  title,
  DefaultThumb,
  date,
  readTime,
}: GetHtmlProps) {
  if (DefaultThumb) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thumbnail</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400@700&display=swap" rel="stylesheet">
      <style>
        * {
          box-sizing: border-box;
        }
        body, html {
          margin: 0;
          font-family: Inter, sans-serif;
          color: #949495;
          background: #151515;
          background-image: radial-gradient(
              circle at 25px 25px,
              #333333 2%,
              transparent 0%
            ),
            radial-gradient(circle at 75px 75px, #333333 2%, transparent 0%);
          background-size: 100px 100px;
          max-height: 100%;
          height: 100%;
          flex: 1;
        }
        .container {
          max-height: 100%;
          height: 100%;
          padding: 4rem;
          justify-content: space-between;
          flex-direction: column;
          max-height: 100%;
          display: flex;
        }
        .titleExtra {
          display: flex;
          flex-direction: column;
        }
        .titleExtra span {
          margin-bottom: 0.8rem;
          font-size: 1.4rem;
        }
        .details {
          display: flex;
          flex-direction: row;
        }
        .title {
          margin: 0;
          color: #e5e7eb;
          font-size: 4.8rem;
          line-height: 1;
        }
        img {
          border-radius: 9999px;
          max-width: 120px;
          max-height: 120px;
          width: 100%;
          height: 100%;
          border: 4px solid #949495;
        }
        .options {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          margin-left: 1rem;
        }
        .profileName {
          margin: 0;
          color: #e5e7eb;
          font-size: 1.8rem;
          line-height: 1;
          font-weight: 600;
        }
        .link {
          margin-top: 0.8rem;
          margin-bottom: 0.8rem;
          font-size: 1.275rem;
          line-height: 1;
          font-weight: 600;
        }
        .profileTwitter {
          margin: 0;
          color: #1d9bf0;
          letter-spacing: 0.025em;
          font-size: 1.275rem;
          line-height: 1;
        }
      </style>
    </head>
      <div class="container" style="width: 1200px;height: 630px;">
        <div class="titleExtra">
          <span>${date}  •  ${readTime}</span>
          <h1 class="title">
            ${title}
          </h1>
        </div>
        <div class="details">
          <img
            src="https://ruandiax.dev/images/ruanHome.webp"
            class="profileImage"
            alt="ruandiax"
          />
          <div class="options">
            <p class="profileName">Ruan Dias - Full Stack Developer</p>
            <p class="link">
              ${linkURL}
            </p>
            <p class="profileTwitter">
              twitter.com/ruandiax
            </p>
          </div>
        </div>
      </div>
    </html>`;
  } else {
    return `<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thumbnail</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400@700&display=swap" rel="stylesheet">
      <style>
        * {
          box-sizing: border-box;
        }

        body,
        html {
          margin: 0;
          font-family: Inter, sans-serif;
          color: #949495;
          background: #151515;
          background-image: radial-gradient(circle at 25px 25px,
              #333333 2%,
              transparent 0%),
            radial-gradient(circle at 75px 75px, #333333 2%, transparent 0%);
          background-size: 100px 100px;
          max-height: 100%;
          height: 100%;
          flex: 1;
        }

        .container {
          max-height: 100%;
          height: 100%;
          padding: 4rem;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          max-height: 100%;
          display: flex;
        }

        .details {
          display: flex;
          flex-direction: row;
        }

        .title {
          margin: 0;
          color: #e5e7eb;
          font-size: 4.8rem;
          line-height: 1;
        }

        .subtitle {
          margin: 2.4rem 0 4.8rem;
          color: #e5e7eb;
          opacity: .96;
          font-size: 2.4rem;
          line-height: 1;
        }

        img {
          border-radius: 9999px;
          max-width: 120px;
          max-height: 120px;
          width: 100%;
          height: 100%;
          border: 4px solid #949495;
          margin: 3.2rem 0 2rem;
        }

        .profileTwitter {
          margin: 0;
          color: #1d9bf0;
          font-weight: 500;
          letter-spacing: 0.032em;
          font-size: 1.275rem;
          line-height: 1;
        }
      </style>
    </head>
    <div class="container" style="width: 1200px;height: 630px;">
      <img src="https://ruandiax.dev/images/ruanHome.webp" class="profileImage" alt="ruandiax" />
      <h1 class="title">
        ruandiax.dev
      </h1>
      <h2 class="subtitle">
        Full Stack Developer
      </h2>
      <p class="profileTwitter">
        twitter.com/ruandiax
      </p>
    </div>
  </html>`;
  }
}
