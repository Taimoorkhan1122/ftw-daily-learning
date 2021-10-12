import React from 'react';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import StaticPage from '../../containers/StaticPage/StaticPage';
import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';

import css from './FAQpage.module.css';

const FAQpage = () => {
  return (
    <StaticPage 
    title="Frequently Asked Questions"
    schema={{
        "@context":"http://schema.org",
        "@type": "FAQpage",
        "description": "frequently asked questions  in CottageDays marketplace",
        "name": 'Frequently Asked Questions',
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Question 1?",
                "acceptedAnser": {
                    "@type": "Answer",
                    "text": "Answer: Lorem Ipsum Dormit" 
                }
            }
        ]
    }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.mainWrapper}>
          <h1>Frequently Asked Questions</h1>

          <div>
            <h3>Question 1?</h3>
            <p>Answer: Lorem ipsum</p>
          </div>
          <div>
            <h3>Question 2?</h3>
            <p>Answer: Lorem ipsum dorme is ancient placeholder</p>
          </div>
          <div>
            <h3>Question 3?</h3>
            <p>
              Answer: We take care of your payments and security.{' '}
              <br/>
                {' '}
                Plus this is some more additional data that is just placeholder for that I am lazy
                enough to copy from a website.
              
            </p>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default FAQpage;
