import gql from 'graphql-tag';



export const DELETE_SHOP = gql`
	mutation DeleteShop ($shopId:ID!) {
	  deleteShop(shopId:$shopId) {
	    _id
	  }
	}
`


export const ADMIN_SAVE_USERPROFILE = gql`
	mutation AdminSaveUserProfile (
		$_id: ID!
		$email: String
		$firstName: String
		$lastName: String
		$roles: [String]
		){
		adminSaveUserProfile (
			_id: $_id
			email: $email
			firstName: $firstName
			lastName: $lastName
			roles:  $roles
		){
			_id
		}
	}
`;



export const CREATE_MALL = gql`
	mutation CreateMall (
	  		$title: String!, 
		  	$description: String!
		    $location: LocationData
		    $shopIds: [ID]
	) {
	  createMall(
	    	title: $title, 
		  	description: $description
		    location: $location
		    shopIds: $shopIds
	  ) {
	    _id
	  }
	}
`




export const ADD_ATTACHMENTS = gql`
	mutation AddAttachments(
	  	$images: [ImageObject], 
	  	$shopId: ID, 
	  	$userId: ID,
	){
	  addAttachments(
	    images: $images, 
	  	shopId: $shopId, 
	  	userId: $userId,
	  ){
	    _id
	  }
	}
`


export const CREATE_SHOP = gql`
	mutation CreateShop( $params: ShopParams ){
	  createShop( params: $params ){
	    _id
	    owner {
	    	_id
	    }
	  }
	}
`
export const SAVE_SHOP = gql`
	mutation SaveShop( 
		$_id: ID!, 
		$params: ShopParams 
	){
	  saveShop( 
	  	_id: $_id, 
	  	params: $params 
	 ){
	    _id
	    owner {
	    	_id
	    }
	  }
	}
`
