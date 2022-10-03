import React from 'react';
import './AboutPage.css';

const AboutPage = (): JSX.Element => {
  return (
    <>
      <h2 className="about-page__greeting">Welcome to Rick and Morty Characters!</h2>
      <p className="about-page__app-description">
        Here you can find information about characters from this universe.
        <br />
        Enjoy!
      </p>
      <p className="about-page__app-info">
        Frontend Developer -{' '}
        <a className="about-page__gihtub-link" href="https://github.com/KosIrina">
          Irina Kosyanchuk
        </a>
        <br />© 2022
      </p>
    </>
  );
};

export default AboutPage;
