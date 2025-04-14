import model from "./model.js";

export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>  model.findOne({ username });
export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
export const updateUser = (username, user) =>  model.updateOne({ username }, { $set: user });
export const deleteUser = (username) => model.deleteOne({ username });
export const findUsersByRole = (role) => model.find({ role });
export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); 
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};
export const findUserByFullName = (firstName, lastName) =>
  model.findOne({ firstName, lastName });

