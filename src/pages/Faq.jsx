import React from 'react'
import { Container, Row, Col } from "reactstrap";
import CommonSection from '../components/UI/CommonSection';

const Faq = () => {
  const FaqData=[{
    question:"Question 1",
    answer:"Answer 1"
  },
  {
    question:"Question 2",
    answer:"Answer 2"
  },
  {
    question:"Question 3",
    answer:"Answer 3"
  },
  {
    question:"Question 4",
    answer:"Answer 4"
  }
]
  return (
    <div>
    <CommonSection title="FAQ"/>
    {FaqData.map((item) => (
              <SingleFaq question={item.question} answer={item.answer}/>
            ))}
    
    </div>
  )
}

function SingleFaq({question, answer}) {
  return (
    <section >
      <Container>
        <Row>
          <Col lg="6" md="6">

            <div>
              <h2 className="section__subtitle">{question}</h2>
              <p className="section__description">{answer}</p>
            </div>
          </Col>
        </Row>
      </Container>

    </section>
  );
}

export default Faq;
