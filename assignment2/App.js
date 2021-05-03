import React from 'react';
import './App.css';

function App() {
  function TableRow(props) {
    return (
      <tr>
        <td>{props.city}</td>
        <td>{props.ustate}</td>
        <td>{props.population}</td>
      </tr>
    );
  }

  class MyApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { sortby: "city", data:
        [{city: "Chicago", ustate: "Illinois", population: 2836658},
        {city: "Houston", ustate: "Texas", population: 2208180},
        {city: "Los Angeles", ustate: "California", population: 3834430},
        {city: "Phoenix", ustate: "Arizona", population: 1552259}]}
    };

    addRow(e) {
      e.preventDefault();
      const form = document.querySelector('form').elements;
      const member = { city: form.city.value, ustate: form.ustate.value, population: form.population.value}
      document.querySelector('form').reset();
      const newData = this.state.data.slice();
      newData.push(member);
      this.setState({ sortby : this.state.sortby, data: newData});
    };

    sort(by) {
      this.setState({...this.state, sortby: by});
    };

    renderTable() {
      const sorting= this.state.sortby;
      const tableSort = this.state.data.sort(function(a,b) {
        if (a[sorting] > b[sorting])
          return 1;
        if (a[sorting] < b[sorting])
          return -1;
        return 0;
      });

      const tableShow = tableSort.map( item =>
        < TableRow 
            city={item.city}
            ustate={item.ustate}
            population={item.population}
            key={item.city}
        />
        );

      return (
        <tbody>
          {tableShow}
        </tbody>
      )
    };

    render() {
      return (
        <div>
        <form onSubmit={(e) => this.addRow(e)}>
          <label htmlFor="city">US City</label>
          <input id="city" name="city" type="text" maxLength="30" required /><br />
          <label htmlFor="ustate">State</label>
          <input id="ustate" name="ustate" type="text" maxLength="30" required /><br />
          <label htmlFor="population">Population</label>
          <input id="population" name="population" type="number" required /><br />
          <input id="submit" type="submit" value="Add to table"/>
        </form>
        <table>
          <thead>
            <tr>
              <th><button onClick={() => this.sort("city")}>City</button></th>
              <th>State</th>
              <th><button onClick={() => this.sort("population")}>Population</button></th>
            </tr>
          </thead>
          {this.renderTable()}
        </table>
        </div>
      )
    }
  };
  
  
  return (
    <div className="App">
      <MyApp />
    </div>
  );
}

export default App;
