'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
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
        'Expiration Data': '',
        'CVV': '',
        'Billing Zipcode': ''
      }
    };
    return _this;
  }

  _createClass(App, [{
    key: 'postData',
    value: function postData(event) {
      var _this2 = this;

      event.preventDefault();

      $.ajax({
        type: 'POST',
        url: '/',
        data: this.state.formData,
        dataType: 'text',
        success: function success() {
          var formData = Object.assign({}, _this2.state.formData);
          for (var key in formData) {
            formData[key] = '';
          };
          console.log('success');
          _this2.setState({ formView: 0, formData: formData });
        }
      });
    }
  }, {
    key: 'handleFormInputValue',
    value: function handleFormInputValue(event) {
      var formData = Object.assign({}, this.state.formData);
      formData[event.target.name] = event.target.value;
      this.setState({ formData: formData });
    }
  }, {
    key: 'changeToNext',
    value: function changeToNext() {
      this.setState({
        formView: this.state.formView < 4 ? this.state.formView + 1 : this.state.formView
      });
    }
  }, {
    key: 'changeToPrevious',
    value: function changeToPrevious() {
      this.setState({
        formView: this.state.formView > 1 ? this.state.formView - 1 : this.state.formView
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return this.state.formView === 0 ? React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          'Welcome to JJ\'s Store'
        ),
        React.createElement(
          'p',
          null,
          'Click here to check out!'
        ),
        React.createElement(
          'button',
          { id: 'next', onClick: this.changeToNext.bind(this) },
          'Check Out'
        )
      ) : this.state.formView < 4 ? React.createElement(
        'div',
        null,
        React.createElement(
          'h3',
          null,
          'Customer Checkout'
        ),
        this.state.forms[this.state.formView].map(function (formText) {
          return React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: formText },
              formText
            ),
            React.createElement('input', { name: formText, type: 'text', onChange: _this3.handleFormInputValue.bind(_this3) })
          );
        }),
        React.createElement(
          'button',
          { id: 'previous', onClick: this.changeToPrevious.bind(this) },
          'Previous'
        ),
        React.createElement(
          'button',
          { id: 'next', onClick: this.changeToNext.bind(this) },
          'Next'
        )
      ) : React.createElement(
        'button',
        { onClick: this.postData.bind(this) },
        'Submit'
      );
    }
  }]);

  return App;
}(React.Component);

var forms = {
  1: ['Name', 'Email', 'Password'],
  2: ['Line 1', 'Line 2', 'City', 'State', 'Zipcode'],
  3: ['Credit Card Number', 'Expiration Data', 'CVV', 'Billing Zipcode']
};

ReactDOM.render(React.createElement(App, { props: forms }), document.getElementById('app'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwic3RhdGUiLCJmb3JtVmlldyIsImZvcm1zIiwiZm9ybURhdGEiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJCIsImFqYXgiLCJ0eXBlIiwidXJsIiwiZGF0YSIsImRhdGFUeXBlIiwic3VjY2VzcyIsIk9iamVjdCIsImFzc2lnbiIsImtleSIsImNvbnNvbGUiLCJsb2ciLCJzZXRTdGF0ZSIsInRhcmdldCIsIm5hbWUiLCJ2YWx1ZSIsImNoYW5nZVRvTmV4dCIsImJpbmQiLCJtYXAiLCJmb3JtVGV4dCIsImhhbmRsZUZvcm1JbnB1dFZhbHVlIiwiY2hhbmdlVG9QcmV2aW91cyIsInBvc3REYXRhIiwiUmVhY3QiLCJDb21wb25lbnQiLCJSZWFjdERPTSIsInJlbmRlciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsRzs7O0FBQ0osZUFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLDBHQUNYQSxLQURXOztBQUdqQixVQUFLQyxLQUFMLEdBQWE7QUFDWEMsZ0JBQVUsQ0FEQztBQUVYQyxhQUFPSCxNQUFNQSxLQUZGO0FBR1hJLGdCQUFVO0FBQ1IsZ0JBQVEsRUFEQTtBQUVSLGlCQUFTLEVBRkQ7QUFHUixvQkFBWSxFQUhKO0FBSVIsa0JBQVUsRUFKRjtBQUtSLGtCQUFVLEVBTEY7QUFNUixnQkFBUSxFQU5BO0FBT1IsaUJBQVMsRUFQRDtBQVFSLG1CQUFXLEVBUkg7QUFTUiw4QkFBc0IsRUFUZDtBQVVSLDJCQUFtQixFQVZYO0FBV1IsZUFBTyxFQVhDO0FBWVIsMkJBQW1CO0FBWlg7QUFIQyxLQUFiO0FBSGlCO0FBcUJsQjs7Ozs2QkFFUUMsSyxFQUFPO0FBQUE7O0FBQ2RBLFlBQU1DLGNBQU47O0FBRUFDLFFBQUVDLElBQUYsQ0FBTztBQUNMQyxjQUFNLE1BREQ7QUFFTEMsYUFBSyxHQUZBO0FBR0xDLGNBQU0sS0FB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QUQsRUFBVyxRQUFYLEVBQXFCLE1BQXJCLEVBQTZCLE9BQTdCLEVBQXNDLFNBQXRDLENBRk87QUFHVixLQUFHLENBQUMsb0JBQUQsRUFBdUIsaUJBQXZCLEVBQTBDLEtBQTFDLEVBQWlELGlCQUFqRDtBQUhPLENBQVo7O0FBT0E2QixTQUFTQyxNQUFULENBQ0Usb0JBQUMsR0FBRCxJQUFLLE9BQU85QixLQUFaLEdBREYsRUFFRStCLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FGRiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBmb3JtVmlldzogMCxcbiAgICAgIGZvcm1zOiBwcm9wcy5wcm9wcyxcbiAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgICdOYW1lJzogJycsXG4gICAgICAgICdFbWFpbCc6ICcnLFxuICAgICAgICAnUGFzc3dvcmQnOiAnJyxcbiAgICAgICAgJ0xpbmUgMSc6ICcnLFxuICAgICAgICAnTGluZSAyJzogJycsXG4gICAgICAgICdDaXR5JzogJycsXG4gICAgICAgICdTdGF0ZSc6ICcnLCBcbiAgICAgICAgJ1ppcGNvZGUnOiAnJyxcbiAgICAgICAgJ0NyZWRpdCBDYXJkIE51bWJlcic6ICcnLFxuICAgICAgICAnRXhwaXJhdGlvbiBEYXRhJzogJycsIFxuICAgICAgICAnQ1ZWJzogJycsIFxuICAgICAgICAnQmlsbGluZyBaaXBjb2RlJzogJydcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcG9zdERhdGEoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgIHVybDogJy8nLFxuICAgICAgZGF0YTogdGhpcy5zdGF0ZS5mb3JtRGF0YSxcbiAgICAgIGRhdGFUeXBlOiAndGV4dCcsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgIGxldCBmb3JtRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUuZm9ybURhdGEpO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZm9ybURhdGEpIHtcbiAgICAgICAgICBmb3JtRGF0YVtrZXldID0gJyc7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb3JtVmlldzogMCwgZm9ybURhdGEgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVGb3JtSW5wdXRWYWx1ZShldmVudCkge1xuICAgIGxldCBmb3JtRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUuZm9ybURhdGEpO1xuICAgIGZvcm1EYXRhW2V2ZW50LnRhcmdldC5uYW1lXSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtmb3JtRGF0YX0pO1xuICB9XG5cbiAgY2hhbmdlVG9OZXh0KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZm9ybVZpZXc6ICB0aGlzLnN0YXRlLmZvcm1WaWV3IDwgNCA/IHRoaXMuc3RhdGUuZm9ybVZpZXcgKyAxIDogdGhpcy5zdGF0ZS5mb3JtVmlld1xuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlVG9QcmV2aW91cygpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGZvcm1WaWV3OiB0aGlzLnN0YXRlLmZvcm1WaWV3ID4gMSA/IHRoaXMuc3RhdGUuZm9ybVZpZXcgLSAxIDogdGhpcy5zdGF0ZS5mb3JtVmlld1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnN0YXRlLmZvcm1WaWV3ID09PSAwIFxuICAgICAgPyBcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMj5XZWxjb21lIHRvIEpKJ3MgU3RvcmU8L2gyPlxuICAgICAgICA8cD5DbGljayBoZXJlIHRvIGNoZWNrIG91dCE8L3A+XG4gICAgICAgIDxidXR0b24gaWQ9XCJuZXh0XCIgb25DbGljaz17dGhpcy5jaGFuZ2VUb05leHQuYmluZCh0aGlzKX0+Q2hlY2sgT3V0PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDogXG4gICAgICAodGhpcy5zdGF0ZS5mb3JtVmlldyA8IDQgXG4gICAgICA/IFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgzPkN1c3RvbWVyIENoZWNrb3V0PC9oMz5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5mb3Jtc1t0aGlzLnN0YXRlLmZvcm1WaWV3XS5tYXAoZm9ybVRleHQgPT4gXG4gICAgICAgICAgICAoPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Zvcm1UZXh0fT57Zm9ybVRleHR9PC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IG5hbWU9e2Zvcm1UZXh0fSB0eXBlPVwidGV4dFwiIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUZvcm1JbnB1dFZhbHVlLmJpbmQodGhpcyl9PjwvaW5wdXQ+XG4gICAgICAgICAgICA8L2Rpdj4pXG4gICAgICAgICAgKX1cbiAgICAgICAgPGJ1dHRvbiBpZD1cInByZXZpb3VzXCIgb25DbGljaz17dGhpcy5jaGFuZ2VUb1ByZXZpb3VzLmJpbmQodGhpcyl9PlByZXZpb3VzPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gaWQ9XCJuZXh0XCIgb25DbGljaz17dGhpcy5jaGFuZ2VUb05leHQuYmluZCh0aGlzKX0+TmV4dDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA6IFxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnBvc3REYXRhLmJpbmQodGhpcyl9PlN1Ym1pdDwvYnV0dG9uPlxuICAgICkpO1xuICB9XG59XG5cbmxldCBmb3JtcyA9IHtcbiAgMTogWydOYW1lJywgJ0VtYWlsJywgJ1Bhc3N3b3JkJ10sXG4gIDI6IFsnTGluZSAxJywgJ0xpbmUgMicsICdDaXR5JywgJ1N0YXRlJywgJ1ppcGNvZGUnXSxcbiAgMzogWydDcmVkaXQgQ2FyZCBOdW1iZXInLCAnRXhwaXJhdGlvbiBEYXRhJywgJ0NWVicsICdCaWxsaW5nIFppcGNvZGUnXVxufTtcblxuXG5SZWFjdERPTS5yZW5kZXIoXG4gIDxBcHAgcHJvcHM9e2Zvcm1zfSAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4pOyJdfQ==