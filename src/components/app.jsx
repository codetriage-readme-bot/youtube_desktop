import React                from 'react';
import { connect }          from 'react-redux';
import { withRouter, Link } from 'react-router';
import PropTypes            from 'prop-types';
import { receiveSetting }   from 'actions/setting_actions';
import { propChecker }      from 'helpers';

import Navbar  from './navbar';
import Sidebar from './sidebar';
import Footer  from './footer';


class App extends React.Component {
  constructor(props){
    super(props);
  }

  updateSetting() {
    this.props.receiveSetting({ windowWidth: window.innerWidth });
  }

  componentDidMount() {
    this.updateSetting();
    window.addEventListener('resize', this.updateSetting.bind(this));

    if(this.props.location.pathname === '/search' && !this.props.searchResult.video) {
      this.props.router.replace('/home');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSetting.bind(this));
  }

  render() {
    return(
      <div className="relative-content">
        <Navbar />
        <Sidebar />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}



App.propTypes = {
  setting: propChecker.setting(),
  searchResult: propChecker.searchResult()
};

const mapStateToProps = (state, ownProps) => ({
  setting: state.setting,
  searchResult: state.searchResult
});

const mapDispatchToProps = dispatch => ({
  receiveSetting: setting => dispatch(receiveSetting(setting))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
