import React from 'react';
//antd
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Radio from 'antd/lib/radio';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';
import { withApollo } from 'react-apollo';
import { handleLogin } from '../../../../modules/helpers'

class LoginForm extends React.Component {
	onSubmit = () => {
		let email = "admin@admin.com";
		let password = "password";
		handleLogin(email, password, this.props)
	}
	render(){
		return (
			<div>
				<Button type='primary' onClick={this.onSubmit}>LOGIN</Button>
			</div>
		);
	}
}

export default withApollo(LoginForm);