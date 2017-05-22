import React from 'react';
import { Match } from 'meteor/check';
import _ from 'lodash';
import { browserHistory } from 'react-router'
//
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_USER_DATA } from '../../apollo/queries';
//modules
import { handleLogout, ApolloRoles } from '../../../modules/helpers';
import { LoadingScreen } from '../../components/common';

//antd
import Breadcrumb from 'antd/lib/breadcrumb';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';

// CONSTANTS & DESTRUCTURING
// ====================================
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer } = Layout;





class PublicLayout extends React.Component {
  constructor(props) {
    super(props);
    const { documentElement, body } = document;
    this.updateDimensions = this.updateDimensions.bind(this);
    let screenWidth = window.innerWidth || documentElement.clientWidth || body.clientWidth;
    this.state = {
      width: window.innerWidth || documentElement.clientWidth || body.clientWidth
    };
  }
  updateDimensions() {
      const { documentElement, body } = document;
      this.setState({
        width: window.innerWidth || documentElement.clientWidth || body.clientWidth 
      });
  }
  componentWillReceiveProps({ data }){
    if (!data.loading && data.user && data.user.roles.includes('admin')) {
      return browserHistory.push('/admin');
    }
  }
  componentDidMount() {
    const { loading, user } = this.props.data;

    window.addEventListener("resize", this.updateDimensions);

    if (!loading && user && user.roles && user.roles.includes('admin')) {
      return browserHistory.push('/admin');
    }
    
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  handleClick = (e) => {

    if (e.key === 'logout') { 
      return handleLogout(this.props.client, this);
    } else {
      browserHistory.push(e.key);
      return this.setState({ current: e.key });
    }
    
  }
  render(){

    if (!this.props || !this.props.data || this.props.data.loading) {
      return <LoadingScreen />
    }

    return (
	    <Layout>
        <Header className="header">
          <Menu 
            defaultSelectedKeys={[this.props.location.pathname]} 
            onClick={this.handleClick} 
            mode="horizontal" 
            style={{ lineHeight: '64px' }}
          >
            {!this.props.data || !this.props.data.user && <Menu.Item key="/">Login</Menu.Item>}
            {!this.props.data || !this.props.data.user && <Menu.Item key="/signup">Signup</Menu.Item>}
            {this.props.data && this.props.data.user && <Menu.Item key="logout">Logout</Menu.Item>}
          </Menu>
        </Header>
	      <Content style={{ padding: 0, minHeight: 'calc(100vh - 64px)' }}>
	          {React.cloneElement(this.props.children, {...this.props})}
	      </Content>
	      <Footer>
	      </Footer>
	    </Layout>
	  );
  }
}



export default withApollo(graphql(GET_USER_DATA)(PublicLayout))
