const cardData = {
  title: " Day Card",
  headline: "Happy  Day",
  recipient: "sama kamu",
  message:
    "Selamat Hari Kasih Sayang! Semoga hari ini penuh kehangatan, cinta, dan kebahagiaan yang tak terlupakan.",
};

const injectStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    @import url("https://fonts.googleapis.com/css?family=Poiret+One");

    :root {
      --primary: #d32f2f;
      --contrast: #ffffff;
      --background: #dddddd;
      --message-bg: #333333;
    }

    * {
      box-sizing: border-box;
    }

    body {
      background-color: var(--background);
      font-family: 'Poiret One', 'Segoe UI Light', cursive;
      min-height: 100vh;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    #card {
      width: min(460px, 100%);
      aspect-ratio: 46 / 26;
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 12px;
    }

    .card__title {
      width: 100%;
      text-align: center;
      margin: 0 0 12px;
      font-size: clamp(1.5rem, 3vw, 2rem);
      letter-spacing: 1px;
    }

    .card__message {
      width: 200px;
      height: 200px;
      background-color: var(--message-bg);
      border-radius: 35% 0 35% 0;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      color: var(--contrast);
      font-size: 1.1rem;
      line-height: 1.4;
      margin: 0 -40px;
      z-index: 1;
    }

    .card__message span {
      display: block;
      font-size: 0.9rem;
      margin-top: 8px;
      opacity: 0.8;
    }

    .heart {
      width: 260px;
      height: 260px;
      position: relative;
    }

    .half {
      width: 130px;
      height: 130px;
    }

    .heart .circle {
      height: 130px;
      width: 130px;
      border-radius: 50%;
      background-color: var(--primary);
    }

    .heart .square {
      margin-top: -60px;
      width: 130px;
      height: 130px;
      background-color: var(--primary);
      border-radius: 35% 0 0 0;
    }

    .half--right {
      transform: rotate(-90deg);
      margin-top: -330px;
      margin-left: -200px;
    }

    .heart--secondary {
      margin-top: -60px;
      margin-left: -130px;
    }

    .heart--secondary .circle,
    .heart--secondary .square {
      background-color: var(--contrast);
    }

    .heart--secondary .half--right .square {
      border-bottom: 1px solid #eee;
      margin-top: -61px;
    }

    .heart--primary {
      transform: rotate(180deg);
      animation: closeLeft 2s ease-in-out forwards;
    }

    .heart--secondary {
      animation: closeRight 2s ease-in-out forwards;
    }

    #card:hover .heart--primary {
      animation: openLeft 2s ease-in-out forwards;
    }

    #card:hover .heart--secondary {
      animation: openRight 2s ease-in-out forwards;
    }

    @keyframes closeLeft {
      from { transform: rotateY(0deg) rotate(180deg); }
      to { transform: rotateY(180deg) rotate(180deg); }
    }

    @keyframes openLeft {
      from { transform: rotateY(180deg) rotate(180deg); }
      to { transform: rotateY(0deg) rotate(180deg); }
    }

    @keyframes openRight {
      0% { transform: rotateX(180deg); }
      100% { transform: rotateX(0deg) rotateZ(180deg); }
    }

    @keyframes closeRight {
      from { transform: rotateX(0deg) rotate(180deg); }
      to { transform: rotateX(180deg); }
    }

    @media (max-width: 520px) {
      #card {
        gap: 0;
        transform: scale(0.85);
      }
    }
  `;

  document.head.append(style);
};

const createHalf = (position) => {
  const half = document.createElement("div");
  half.className = `half half--${position}`;

  const circle = document.createElement("div");
  circle.className = "circle";

  const square = document.createElement("div");
  square.className = "square";

  half.append(circle, square);
  return half;
};

const createHeart = (variant) => {
  const heart = document.createElement("div");
  heart.className = `heart heart--${variant}`;
  heart.append(createHalf("left"), createHalf("right"));
  heart.setAttribute("aria-hidden", "true");
  return heart;
};

const createMessage = () => {
  const wrapper = document.createElement("div");
  wrapper.className = "card__message";

  const headline = document.createElement("strong");
  headline.textContent = `${cardData.headline}, ${cardData.recipient}!`;

  const copy = document.createElement("span");
  copy.textContent = cardData.message;

  wrapper.append(headline, copy);
  return wrapper;
};

const renderCard = () => {
  injectStyles();

  const container = document.getElementById("app");
  container.innerHTML = "";

  const card = document.createElement("section");
  card.id = "card";
  card.setAttribute("role", "img");
  card.setAttribute(
    "aria-label",
    `${cardData.headline} untuk ${cardData.recipient}`
  );

  const title = document.createElement("h1");
  title.className = "card__title";
  title.textContent = cardData.title;

  card.append(title, createHeart("primary"), createMessage(), createHeart("secondary"));
  container.append(card);
};

renderCard();

