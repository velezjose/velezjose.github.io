class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formView: 0,
      forms: props.props,
      formData: {
        'Name': '',
        'Email': '',
        'Password': '',
        'Line 1': '',
        'Line 2': '',
        'City': '',
        'State': '', 
        'Zipcode': '',
        'Credit Card Number': '',
        'Expiration Date': '', 
        'CVV': '', 
        'Billing Zipcode': ''
      }
    };
  }

  postData(event) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/',
      data: this.state.formData,
      dataType: 'text',
      success: () => {
        let formData = Object.assign({}, this.state.formData);
        for (let key in formData) {
          formData[key] = '';
        };
        console.log('success');
        this.setState({ formView: 0, formData });
      }
    });
  }

  handleFormInputValue(event) {
    let formData = Object.assign({}, this.state.formData);
    formData[event.target.name] = event.target.value;
    this.setState({formData});
  }

  changeToNext() {
    this.setState({
      formView:  this.state.formView < 4 ? this.state.formView + 1 : this.state.formView
    });
  }

  changeToPrevious() {
    this.setState({
      formView: this.state.formView > 1 ? this.state.formView - 1 : this.state.formView
    });
  }

  render() {
    return (
      this.state.formView === 0 
      ? 
      <div>
        <h2>Welcome to JJ's Store</h2>
        <p>Click here to check out!</p>
        <button id="next" onClick={this.changeToNext.bind(this)}>Check Out</button>
      </div>
      : 
      (this.state.formView < 4 
      ? 
      <div>
        <h3>Customer Checkout</h3>
          {this.state.forms[this.state.formView].map(formText => 
            (<div>
              <label htmlFor={formText}>{formText}</label>
              <input name={formText} type="text" onChange={this.handleFormInputValue.bind(this)}></input>
            </div>)
          )}
        <button id="previous" onClick={this.changeToPrevious.bind(this)}>Previous</button>
        <button id="next" onClick={this.changeToNext.bind(this)}>Next</button>
      </div>
      : 
      <button onClick={this.postData.bind(this)}>Submit</button>
    ));
  }
}

let forms = {
  1: ['Name', 'Email', 'Password'],
  2: ['Line 1', 'Line 2', 'City', 'State', 'Zipcode'],
  3: ['Credit Card Number', 'Expiration Date', 'CVV', 'Billing Zipcode']
};


ReactDOM.render(
  <App props={forms} />,
  document.getElementById('app')
);