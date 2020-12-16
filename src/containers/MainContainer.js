import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

    // { "id": 1,
    //   "ticker" :"GOOG",
    //   "name": "Google",
    //   "type": "Tech",
    //   "price": 1194.80
    // },

class MainContainer extends Component {

  state = {
    stocks: [],
    pCollection: [],
    filterTerm: '',
    sortTerm: ''
  }

  componentDidMount(){
    fetch('http://localhost:3000/stocks')
      .then(resp => resp.json())
      .then(items => this.setState({stocks: items}))
  }

  addToPortfolio = (stock) => {
    console.log('AddStock Event:', stock)
    console.log('Stock to Add:', stock)
    this.setState({
      pCollection: [...this.state.pCollection, stock]
    })
  }

  removeFromPortfolio = (stock) => {
    console.log('Stock to Remove:', stock)
    const updatedCollection = this.state.pCollection.filter(s => s.id !== stock.id)
    this.setState({
      pCollection: updatedCollection
    })
  }

  handleFilter = (event) => {
    console.log('handleFilter method fired')
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  // ----------------------------------------------------
  comparePrices = (a, b) => parseFloat(a.price) - parseFloat(b.price)
  compareAlpha = (a, b) => { 
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0; 
  }

  handleSort = (event) => {
    console.log('handleSort method fired')
    this.setState({ sortTerm: event.target.value })
    let sortedCollection = event.target.value === "Alphabetically" ? this.state.stocks.sort(this.compareAlpha) : this.state.stocks.sort(this.comparePrices)
    console.log('sortedCollection:', sortedCollection)
    return this.setState({ 
      stocks: sortedCollection
    })
  }

  render() {
    return (
      <div>
        <SearchBar handleFilter={this.handleFilter} handleSort={this.handleSort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer addToPortfolio={this.addToPortfolio} stocks={this.state.stocks.filter(stock => stock.type.includes(this.state.filterTerm))}/>

            </div>
            <div className="col-4">

              <PortfolioContainer removeFromPortfolio={this.removeFromPortfolio} stocks={this.state.pCollection}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
