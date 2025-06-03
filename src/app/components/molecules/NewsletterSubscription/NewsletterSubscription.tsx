"use client";
import { useState } from "react";

import Text from "@components/atoms/Text";
import Button from "@components/atoms/Button";

import { emailRegex } from "@constance/regex";

import submitEmailSubscription from "@services/submitEmailSubscription";

import style from "./newsletter-subscription.module.css";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const onClick = async () => {
    if (!emailRegex.test(email)) return;
    submitEmailSubscription(email);
  };
  return (
    <div className={style.Newsletter}>
      <div className={style.Newsletter_container}>
        <div
          className={`${style.Newsletter_title} ${style.Newsletter_content}`}
        >
          <Text text="Get News & Updates" type="h2" priority="heading" />
        </div>
        <div className={`${style.Newsletter_text} ${style.Newsletter_content}`}>
          <Text
            text="Get latest developments and exciting news on how we are shaping the future!"
            type="p"
            priority="normal"
          />
        </div>
        <div className={style.Newsletter_content}>
          <form className={style.Newsletter_email}>
            <input
              placeholder="Your email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              testId="newsletter"
              label="Join The Newsletter"
              priority="secondary"
              onClick={onClick}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
