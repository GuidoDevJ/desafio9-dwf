import { User } from "models/user";
export async function updateData(userId: string, body: {}): Promise<void> {
  try {
    let user = new User(userId);
    user.data = {
      ...user.data,
      ...body,
    };
    await user.push();
  } catch (error) {
    return error;
  }
}
export async function updateAdress(userId: string, newAddress): Promise<void> {
  try {
    let user = await getData(userId);
    user.data.address = newAddress;
    await user.push();
  } catch (error) {
    return error;
  }
}

export async function getData(token) {
  try {
    let user = new User(token);
    await user.pull();
    return user.data;
  } catch (error) {
    return error;
  }
}
