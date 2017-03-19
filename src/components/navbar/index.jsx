import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';

import { SearchBar, AuthPage } from '../common';

import { receiveQuery } from '../../actions/query_actions';
import { authenticateUser } from '../../util/oauth_util';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle('hidden');
  }

  toggleAuthPage() {
    // let authPage = document.getElementById('authPage');
    // authPage.classList.toggle('hidden');
    // window.child.loadURL(authenticateUser())
    // window.child.show();
    authenticateUser();
  }

  render() {
    return (
      <div className='navbar'>
        <div className='navbar-left-menu'>
          <i onClick={this.toggleSidebar} className="material-icons">menu</i>
            <img className='youtube-logo' src="./app/assets/Youtube-logo.png"/>
        </div>


        <div className='navbar-center-menu'>
          <SearchBar
            receiveQuery={ this.props.receiveQuery }
            router={ this.props.router } />
        </div>

        <div className='navbar-right-menu'>
          <i className="material-icons">file_upload</i>

          <img className='beads-image' src="./app/assets/ic_more_vert_black_24px.svg"/>
          <a onClick={authenticateUser} style={{cursor: 'pointer'}}>
            <p className="sign-in-text">SIGN IN</p>
          </a>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // your code here...
});

const mapDispatchToProps = dispatch => ({
  receiveQuery: query => dispatch(receiveQuery(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));