import React,{Component} from 'react';

class Home extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="sk-container">
        <div className="sk-header"></div>
        <div className="sk-inner-wrapper">

          <div className="sk-chart-component-container"></div>
          <div className="sk-chart-list-container">
            <div className="sk-chart-list-header"><div className="sk-stock-search"></div></div>
            <div className="sk-chart-list-odd"></div>
            <div className="sk-chart-list-even"></div>
              <div className="sk-chart-list-odd"></div>
              <div className="sk-chart-list-even"></div>
                <div className="sk-chart-list-odd"></div>
                <div className="sk-chart-list-even"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
