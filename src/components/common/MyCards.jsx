import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cardsService from "../../services/cardService";
import PageHeader from "./PageHeader";
import Card from "../common/Card";

const MyCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getCards() {
      const { data } = await cardsService.getAll();

      setCards(data);
    }

    getCards();
  }, []);

  return (
    <>
      <PageHeader
        title='My Cards'
        description='your cards are in the list below'
      />

      <div className='row'>
        <Link to='create-card'>
          <button className='buttons'>Create a New Card</button>
        </Link>
      </div>
      <div className='row cradsWrapper col-xs-12'>
        {!cards.length ? (
          <p>No Card..</p>
        ) : (
          cards.map(card => <Card key={card.id} card={card} />)
        )}
      </div>
    </>
  );
};

export default MyCards;
