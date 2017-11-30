import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Shops } from './model';
import { Attachments } from '../Attachment/model';
import { Malls } from '../Mall/model';
//import { createResolver } from 'apollo-resolvers';
import { createError, isInstance } from 'apollo-errors';
import { buildShop, getShopSearchResults } from '../api-helpers';
import { isAuthenticatedResolver, isManagerResolver, isAdminResolver, isOwnerOrAdminResolver } from '../base-resolvers';

export const ShopSchema = [`

type Shop {
	    _id: ID!
	    title: String!, 
	  	description: String!
	  	categories: [String]
	  	image: String
	  	phone: String
	  	phone2: String
	  	website: String
	  	email: String
	  	owner: User,
	  	instagram: String
	  	facebook: String
	  	twitter: String
	  	youtube: String
	  	mallId: String
	  	openDays: [String]
	    location: Address
	    ownerId: String
	    mall: Mall
	    attachments: [Attachment]
	}

type Query {
	    shopById(_id: ID!): Shop,
	    shopsByOwner(string: String, offset: Int): [Shop],
    	shops(
    		string: String, 
    		offset: Int,
    		categories: [String],
    		nearMe: Boolean
    		latitude: String
	  		longitude: String
    	): [Shop],
    	shopExists(
    		string: String, 
    		offset: Int,
    		categories: [String],
    		nearMe: Boolean
    		latitude: String
	  		longitude: String
    	): [Shop],
	  }

input ShopParams {
	title: String!, 
	description: String!
	categories: [String!]
	image: String
	latitude: String
	longitude: String
	location: LocationData
	mallId: String
	phone: String
	phone2: String
	website: String
	email: String
	instagram: String
	facebook: String
	twitter: String
	youtube: String
	ownerId: String
	openDays: [String]
}

type Mutation {
	# deletes a shop 
	# shopId the unique id of the shop 
	deleteShop(shopId: ID!): Shop

	# creates a new shop 
	# title is the shopId title
	# description is the shop content
	# image is the main image for he shop
	createShop( params: ShopParams ): Shop

	# creates a new shop 
	saveShop( _id: ID!, params: ShopParams ): Shop
}

`];

const deleteShop = isOwnerOrAdminResolver.createResolver(
	async (root, { shopId }, context) => {
		// TODO: check if record already exists
		//	check by a regex on title AND a query for lat/lng (maybe within X miles)
		Shops.remove({_id: shopId}, (err, response) => {
			return _id;
		});
	}
);

const createShop = isAuthenticatedResolver.createResolver(
	async (root, { params }, context) => {
		// TODO: check if record already exists
		//	check by a regex on title AND a query for lat/lng (maybe within X miles)
		let shop;
		try {
			shop = await buildShop(params, context.user);
			//shop.ownerId = this.userId
			console.log( shop );
			let docId = Shops.insert(shop);
			if (docId) { return Shops.findOne({_id: docId}); }
		}
		catch(e) {
			return console.log(e);
		}
	}
);

const saveShop = isOwnerOrAdminResolver.createResolver(
	async (root, { params, _id }, context) => {

		// TODO: check if record already exists
		//	check by a regex on title AND a query for lat/lng (maybe within X miles)
		//let shop = await buildShop(args, context.user)
		let dataToUpdate = {
			title: params.title,
			descrption: params.description,
			categories: params.categories,
			image: params.image,
			mallId: params.mallId,
			phone: params.phone,
			phone2: params.phone2,
			website: params.website,
			email: params.email,
			instagram: params.instagram,
			facebook: params.facebook,
			twitter: params.twitter,
			youtube: params.youtube,
			ownerId: params.ownerId
		}
		Shops.update({ _id }, { $set: dataToUpdate }, (err) => {
			if (err) { return console.log(err); }
		});
		let shop = Shops.findOne({ _id });
		return shop;
	}
);

export const ShopResolvers = {
	Query: {
	    shopById: (root, args, context) => Shops.findOne({ _id: args._id }),
	    shopsByOwner: (root, args, context) => {
	    	if (!context.user) { return []; } // if no user exists in context, return an empty array
	    	let query = { ownerId: context.user._id }; //declare the query variable
	    	let options = { limit: 10, sort: { createdAt: -1 } } //set default options
	    	if (args && args.offset) { options.skip = args.offset } //if offset was passed, assign new offset value to query options
	    	if (!args || !args.string) {
	    		return Shops.find(query, options).fetch(); // if no search term exists, just return shops by ownerId
	    	}
	    	let regex = new RegExp( args.string, 'i' ); //create a regex for a fuzzy search
	    	query.title = regex; // if search term exists, add it to the query object 
	    	return Shops.find(query, options).fetch(); // then return the given query
	    },
	    shops: async (root, args, context) => {
	    	let shopsToReturn = await getShopSearchResults(root, args, context);
	    	return shopsToReturn
	    },
	    shopExists: async (root, args, context) => {
	    	// if there are no arguments passed from the AddShopForm, then do not return any possible matches
	    	if (!args || (!args.string && (!args.categories || args.categories.length === 0 ) && !args.nearMe && !args.latitude && !args.longitude) ) {
				return []
			}
	    	let shopsToReturn = await getShopSearchResults(root, args, context);
	    	return shopsToReturn
	    },
  	},
  	Shop: {
  		owner: ({ ownerId }, args, context) => {
  			let user = Meteor.users.findOne({_id: ownerId});
  			if (!user) { return null }
  			return user
  		},
  		mall: ({ mallId }, args, context) => {
  			let mall = Malls.findOne({_id: mallId});
  			if (!mall) { return null }
  			return mall
  		},
  		attachments: ({ _id }, args, context) => {
  			let attachments = Attachments.find({shopId: _id}).fetch();
  			if (!attachments || attachments.length === 0) { return [] }// if attahments does not exist or length of array is 0, just return an empty array
  			return attachments
  		}
  	},
	Mutation: {
		createShop,
		saveShop,
		deleteShop,
	}
};

