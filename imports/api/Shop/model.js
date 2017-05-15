import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { baseModel, addressSchema} from '../base-model';

//declare collection name and export it
export const Shops = new Mongo.Collection('Shops');

//attach basics via baseModel (createdAt, title, etc.)
Shops.baseModel = baseModel;

Shops.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Shops.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});


Shops.schema = new SimpleSchema({
  title: {
    type: String,
    optional: true,
  },
  description: {
    type: String,
    optional: true,
  },
  location: {
    type: addressSchema,
    optional: true
  },
  category: {
    type: String,
    optional: true,
  },
  image: {
    type: String,
    optional: true,
  },
  schemaVersion: {
    type: Number,
    autoValue: function() {
      // only set on insert
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {
            return 0
        }
    }
  },
});



Shops.attachSchema(Shops.schema);
Shops.attachSchema(Shops.baseModel);