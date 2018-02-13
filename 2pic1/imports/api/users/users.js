import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Users = new Mongo.Collection("users");

export default Users;
