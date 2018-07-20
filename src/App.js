import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    cards: [],
    deckId: '123',
    dealingMessage: 'Dealing cards'
  };
  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://deckofcardsapi.com/api/deck/new/shuffle/'
      );
      console.log('shuffle', response);
      this.setState({
        deckId: response.data.deck_id
      });
    } catch (e) {
      this.setState({
        dealingMessage: 'Dealer sucks.'
      });
    }
  }
  drawCard = async () => {
    try {
      if (this.state.cards.length === 52) {
        return <h3>DECK EMPTY</h3>;
      }
      console.log('deal api', this.state.deckId);
      const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`
      );
      this.setState({
        cards: this.state.cards.concat(response.data.cards[0].image)
      });
      console.log('deal card', response);
    } catch (e) {
      this.setState({
        dealingMessage: 'Dealer sucks.'
      });
    }
  };

  render() {
    const cardStack = this.state.cards.map(card => {
      return <img src={card} />;
    });
    console.log('state.cards', this.state.cards);
    console.log('cardstack', cardStack);
    return (
      <div className="App">
        <button onClick={this.drawCard}>Deal a card </button>
        <div>{cardStack}</div>
      </div>
    );
  }
}
export default App;
